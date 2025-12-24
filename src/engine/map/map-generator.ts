import { GameMap, MapNode, NodeType } from '../../types';
import { RNG, randomInt, randomElement, chance } from '../../utils/rng';

// Slay the Spire style map: 7 rows, 7 columns, with branching paths
const MAP_CONFIG = {
  columns: 7,      // Fixed width
  rows: 15,        // Number of floors before boss
  pathCount: 6,    // Number of starting paths
};

// Node type weights by row position (early, mid, late)
function getNodeTypeForRow(row: number, totalRows: number, rng: RNG): NodeType {
  const progress = row / totalRows;
  
  // First row is always combat
  if (row === 0) return NodeType.Combat;
  
  // Last row before boss is always rest
  if (row === totalRows - 1) return NodeType.Rest;
  
  // Row before rest is often elite
  if (row === totalRows - 2 && chance(0.5, rng)) return NodeType.EliteCombat;
  
  // Generate weighted random type based on progress
  const roll = rng();
  
  if (progress < 0.3) {
    // Early game: mostly combat, some events
    if (roll < 0.6) return NodeType.Combat;
    if (roll < 0.8) return NodeType.Event;
    if (roll < 0.9) return NodeType.Shop;
    return NodeType.ForgeUpgrade;
  } else if (progress < 0.7) {
    // Mid game: mix of everything
    if (roll < 0.35) return NodeType.Combat;
    if (roll < 0.5) return NodeType.Event;
    if (roll < 0.65) return NodeType.EliteCombat;
    if (roll < 0.75) return NodeType.Shop;
    if (roll < 0.85) return NodeType.Rest;
    if (roll < 0.92) return NodeType.ForgeUpgrade;
    return NodeType.Shrine; // Spartan Trade
  } else {
    // Late game: harder encounters, more rest/shop
    if (roll < 0.3) return NodeType.Combat;
    if (roll < 0.5) return NodeType.EliteCombat;
    if (roll < 0.65) return NodeType.Rest;
    if (roll < 0.8) return NodeType.Shop;
    if (roll < 0.9) return NodeType.Event;
    return NodeType.Shrine; // Spartan Trade
  }
}

export function generateMap(act: number, rng: RNG): GameMap {
  const { columns, rows, pathCount } = MAP_CONFIG;
  const nodes: MapNode[] = [];
  const grid: (MapNode | null)[][] = [];
  
  // Initialize empty grid
  for (let row = 0; row <= rows; row++) {
    grid[row] = new Array(columns).fill(null);
  }
  
  // Create starting positions (spread across columns)
  const startPositions: number[] = [];
  const spacing = Math.floor(columns / pathCount);
  for (let i = 0; i < pathCount; i++) {
    const col = Math.min(i * spacing + randomInt(0, 1, rng), columns - 1);
    if (!startPositions.includes(col)) {
      startPositions.push(col);
    }
  }
  
  // Ensure we have at least 3 starting positions
  while (startPositions.length < 3) {
    const col = randomInt(0, columns - 1, rng);
    if (!startPositions.includes(col)) {
      startPositions.push(col);
    }
  }
  
  // Create paths from each starting position
  const paths: number[][] = []; // Each path is array of column positions per row
  
  for (const startCol of startPositions) {
    const path: number[] = [startCol];
    let currentCol = startCol;
    
    for (let row = 1; row < rows; row++) {
      // Determine possible next columns (can move left, straight, or right)
      const possibleCols: number[] = [];
      if (currentCol > 0) possibleCols.push(currentCol - 1);
      possibleCols.push(currentCol);
      if (currentCol < columns - 1) possibleCols.push(currentCol + 1);
      
      // Pick next column with slight bias toward center
      const nextCol = randomElement(possibleCols, rng) ?? currentCol;
      path.push(nextCol);
      currentCol = nextCol;
    }
    
    // All paths converge to boss (center column)
    path.push(Math.floor(columns / 2));
    paths.push(path);
  }
  
  // Create nodes at path positions
  for (let row = 0; row <= rows; row++) {
    const columnsInRow = new Set<number>();
    
    // Collect all columns that have paths at this row
    for (const path of paths) {
      columnsInRow.add(path[row]);
    }
    
    // Create nodes for each column
    for (const col of columnsInRow) {
      const nodeType = row === rows 
        ? NodeType.Boss 
        : getNodeTypeForRow(row, rows, rng);
      
      const node: MapNode = {
        id: `node-${row}-${col}`,
        type: nodeType,
        row,
        column: col,
        connections: [],
        visited: false,
        available: row === 0,
      };
      
      grid[row][col] = node;
      nodes.push(node);
    }
  }
  
  // Create connections based on paths
  for (const path of paths) {
    for (let row = 0; row < rows; row++) {
      const fromCol = path[row];
      const toCol = path[row + 1];
      
      const fromNode = grid[row][fromCol];
      const toNode = grid[row + 1][toCol];
      
      if (fromNode && toNode && !fromNode.connections.includes(toNode.id)) {
        fromNode.connections.push(toNode.id);
      }
    }
  }
  
  // Add some cross-connections for variety (connect adjacent nodes in same row to next row)
  for (let row = 0; row < rows; row++) {
    const rowNodes = nodes.filter(n => n.row === row);
    const nextRowNodes = nodes.filter(n => n.row === row + 1);
    
    for (const node of rowNodes) {
      // Find adjacent nodes in next row that we could connect to
      for (const nextNode of nextRowNodes) {
        const colDiff = Math.abs(node.column - nextNode.column);
        // Can connect if adjacent column and not already connected
        if (colDiff <= 1 && !node.connections.includes(nextNode.id)) {
          // 30% chance to add extra connection
          if (chance(0.3, rng)) {
            node.connections.push(nextNode.id);
          }
        }
      }
    }
  }
  
  // Find boss node
  const bossNode = nodes.find(n => n.type === NodeType.Boss);
  
  return {
    act,
    nodes,
    currentNodeId: null,
    bossNodeId: bossNode?.id || nodes[nodes.length - 1].id,
  };
}

export function getAvailableNodes(map: GameMap): MapNode[] {
  return map.nodes.filter(n => n.available && !n.visited);
}

export function getNodeById(map: GameMap, nodeId: string): MapNode | undefined {
  return map.nodes.find(n => n.id === nodeId);
}
