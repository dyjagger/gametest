import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  GamePhase,
  PlayerState,
  CardInstance,
  Enemy,
  Artifact,
  Blessing,
  ProgressionState,
  GameSettings,
  CombatState,
  GameMap,
  NodeType,
} from '../../types';
import { GAME_CONSTANTS } from '../../types';
import { createStartingDeck } from '../../data/cards/starting-deck';
import { generateMap } from '../map/map-generator';
import { createSeededRng } from '../../utils/rng';
import { createCombatEnemies } from '../../data/enemies';
import { checkCombatEnd } from '../combat/combat-engine';
import { 
  applyStatusEffectsToDamage, 
  applyStatusEffectsToBlock,
  applyDamageToEnemy,
  addStatusEffect,
} from '../combat/status-effects';

// -------------------- INITIAL STATES --------------------

const initialSettings: GameSettings = {
  masterVolume: 0.8,
  sfxVolume: 0.8,
  musicVolume: 0.6,
  animationSpeed: 'normal',
  screenShake: true,
  confirmEndTurn: false,
};

const initialProgression: ProgressionState = {
  currentAct: 1,
  spartanProgress: [],
  unlockedCards: [],
  unlockedArtifacts: [],
  unlockedSpartans: ['leonidas', 'achilles', 'artemisia', 'brasidas', 'dienekes', 'gorgo'],
  ascensionLevel: 0,
  runsCompleted: 0,
  runsWon: 0,
};

const createInitialPlayerState = (): PlayerState => ({
  hp: GAME_CONSTANTS.STARTING_HP,
  maxHp: GAME_CONSTANTS.STARTING_HP,
  energy: GAME_CONSTANTS.STARTING_ENERGY,
  maxEnergy: GAME_CONSTANTS.STARTING_ENERGY,
  block: 0,
  statusEffects: [],
  deck: createStartingDeck(),
  artifacts: [],
  blessings: [],
  divineFavor: 0,
  adamantShards: 0,
});

// -------------------- STORE INTERFACE --------------------

interface RunState {
  seed: string;
  map: GameMap;
  player: PlayerState;
  combat: CombatState | null;
  visitedSpartans: string[];
  currentEvent: string | null;
}

interface GameStore {
  gamePhase: GamePhase;
  run: RunState | null;
  progression: ProgressionState;
  settings: GameSettings;
  pendingUpgrade: boolean;
  
  setGamePhase: (phase: GamePhase) => void;
  startNewRun: (seed?: string) => void;
  abandonRun: () => void;
  startCombat: (enemies: Enemy[]) => void;
  endCombat: (victory: boolean) => void;
  playCard: (cardInstanceId: string, targetIndex?: number) => void;
  endTurn: () => void;
  drawCards: (count: number) => void;
  dealDamageToPlayer: (amount: number) => void;
  healPlayer: (amount: number) => void;
  addBlock: (amount: number) => void;
  modifyEnergy: (amount: number) => void;
  addCardToDeck: (card: CardInstance) => void;
  removeCardFromDeck: (cardInstanceId: string) => void;
  upgradeCard: (cardInstanceId: string) => void;
  upgradeCardInHand: (cardInstanceId: string) => void;
  cancelUpgrade: () => void;
  addDivineFavor: (amount: number) => void;
  spendDivineFavor: (amount: number) => boolean;
  addAdamantShards: (amount: number) => void;
  spendAdamantShards: (amount: number) => boolean;
  addArtifact: (artifact: Artifact) => void;
  addBlessing: (blessing: any) => void;
  selectNode: (nodeId: string) => void;
  updateSettings: (settings: Partial<GameSettings>) => void;
}

// -------------------- STORE IMPLEMENTATION --------------------

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      gamePhase: 'menu' as GamePhase,
      run: null,
      progression: initialProgression,
      settings: initialSettings,
      pendingUpgrade: false,

      setGamePhase: (phase: GamePhase) => set({ gamePhase: phase }),

      startNewRun: (seed?: string) => {
        const runSeed = seed || Date.now().toString();
        const rng = createSeededRng(runSeed);
        
        set({
          run: {
            seed: runSeed,
            map: generateMap(1, rng),
            player: createInitialPlayerState(),
            combat: null,
            visitedSpartans: [],
            currentEvent: null,
          },
          gamePhase: 'map' as GamePhase,
        });
      },

      abandonRun: () => set({ run: null, gamePhase: 'menu' as GamePhase }),

      startCombat: (enemies: Enemy[]) => {
        const state = get();
        if (!state.run) return;
        
        const player = state.run.player;
        const shuffledDeck = [...player.deck].sort(() => Math.random() - 0.5);
        
        const combat: CombatState = {
          active: true,
          turn: 1,
          phase: 'playerTurn',
          enemies,
          hand: [],
          drawPile: shuffledDeck,
          discardPile: [],
          exhaustPile: [],
          cardsPlayedThisTurn: 0,
          energySpentThisTurn: 0,
          damageDealtThisTurn: 0,
        };
        
        set({
          run: {
            ...state.run,
            player: { ...player, energy: player.maxEnergy, block: 0 },
            combat,
          },
          gamePhase: 'combat' as GamePhase,
        });
        
        get().drawCards(GAME_CONSTANTS.HAND_SIZE);
      },

      endCombat: (victory: boolean) => {
        const state = get();
        if (!state.run) return;
        
        set({
          run: { ...state.run, combat: null },
          gamePhase: victory ? ('reward' as GamePhase) : ('gameOver' as GamePhase),
          progression: victory 
            ? state.progression 
            : { ...state.progression, runsCompleted: state.progression.runsCompleted + 1 },
        });
      },

      playCard: (cardInstanceId: string, targetIndex?: number) => {
        const state = get();
        if (!state.run?.combat) return;
        
        const combat = state.run.combat;
        const cardIndex = combat.hand.findIndex((c: CardInstance) => c.instanceId === cardInstanceId);
        if (cardIndex === -1) return;
        
        const card = combat.hand[cardIndex];
        if (card.energyCost > state.run.player.energy) return;
        
        console.log('[Combat] Playing card:', card.name, 'Effects:', card.effects);
        
        // Process card effects
        let newEnemies = [...combat.enemies];
        let newPlayerBlock = state.run.player.block;
        let newPlayerHp = state.run.player.hp;
        let newEnergy = state.run.player.energy - card.energyCost;
        let cardsToDraw = 0;
        
        let newPlayerStatusEffects = [...state.run.player.statusEffects];
        
        for (const effect of card.effects) {
          const times = effect.times || 1;
          const effectType = effect.type as string;
          const effectValue = effect.value ?? 0;
          
          for (let t = 0; t < times; t++) {
            switch (effectType) {
              case 'damage': {
                const baseDamage = effectValue;
                if (effect.target === 'allEnemies') {
                  newEnemies = newEnemies.map(enemy => {
                    if (enemy.hp <= 0) return enemy;
                    const result = applyDamageToEnemy(enemy, baseDamage, newPlayerStatusEffects);
                    return { ...enemy, hp: result.newHp, block: result.newBlock };
                  });
                } else {
                  const idx = targetIndex ?? 0;
                  if (newEnemies[idx] && newEnemies[idx].hp > 0) {
                    const result = applyDamageToEnemy(newEnemies[idx], baseDamage, newPlayerStatusEffects);
                    newEnemies[idx] = { ...newEnemies[idx], hp: result.newHp, block: result.newBlock };
                  }
                }
                break;
              }
              case 'block': {
                const blockAmount = applyStatusEffectsToBlock(effectValue, newPlayerStatusEffects);
                newPlayerBlock += blockAmount;
                break;
              }
              case 'applyStatus': {
                if (effect.statusEffect) {
                  if (effect.target === 'self') {
                    newPlayerStatusEffects = addStatusEffect(
                      newPlayerStatusEffects,
                      effect.statusEffect,
                      effectValue,
                      effect.duration
                    );
                  } else {
                    const idx = targetIndex ?? 0;
                    if (newEnemies[idx]) {
                      newEnemies[idx] = {
                        ...newEnemies[idx],
                        statusEffects: addStatusEffect(
                          newEnemies[idx].statusEffects,
                          effect.statusEffect,
                          effectValue,
                          effect.duration
                        ),
                      };
                    }
                  }
                }
                break;
              }
              case 'heal':
                newPlayerHp = Math.min(state.run.player.maxHp, newPlayerHp + effectValue);
                break;
              case 'draw':
                cardsToDraw += effectValue;
                break;
              case 'gainEnergy':
                newEnergy += effectValue;
                break;
              case 'upgradeCard':
                // Set flag to trigger upgrade selection UI
                // This will be handled by the combat screen
                set({ pendingUpgrade: true });
                break;
            }
          }
        }
        
        // Remove card from hand
        const newHand = [...combat.hand];
        newHand.splice(cardIndex, 1);
        
        const newPile = card.exhaust 
          ? { exhaustPile: [...combat.exhaustPile, card], discardPile: combat.discardPile }
          : { exhaustPile: combat.exhaustPile, discardPile: [...combat.discardPile, card] };
        
        console.log('[Combat] Before update - Enemy HP:', combat.enemies.map(e => e.hp));
        console.log('[Combat] After effects - Enemy HP:', newEnemies.map(e => e.hp));
        console.log('[Combat] Player block:', newPlayerBlock, 'Energy:', newEnergy);
        
        set({
          run: {
            ...state.run,
            player: { 
              ...state.run.player, 
              energy: newEnergy,
              block: newPlayerBlock,
              hp: newPlayerHp,
              statusEffects: newPlayerStatusEffects,
            },
            combat: {
              ...combat,
              enemies: newEnemies,
              hand: newHand,
              ...newPile,
              cardsPlayedThisTurn: combat.cardsPlayedThisTurn + 1,
              energySpentThisTurn: combat.energySpentThisTurn + card.energyCost,
            },
          },
        });
        
        console.log('[Combat] State updated, card played:', card.name);
        
        // Draw cards if needed
        if (cardsToDraw > 0) {
          get().drawCards(cardsToDraw);
        }
        
        // Check for victory
        const updatedState = get();
        if (updatedState.run?.combat) {
          const result = checkCombatEnd(updatedState.run.combat.enemies, updatedState.run.player.hp);
          if (result === 'victory') {
            get().endCombat(true);
          }
        }
      },

      endTurn: () => {
        const state = get();
        if (!state.run?.combat) return;
        
        const combat = state.run.combat;
        const retainedCards = combat.hand.filter((c: CardInstance) => c.retain);
        const discardedCards = combat.hand.filter((c: CardInstance) => !c.retain);
        
        // Process enemy turn - each enemy attacks based on their intent
        let playerHp = state.run.player.hp;
        let playerBlock = state.run.player.block;
        
        const updatedEnemies = combat.enemies.map(enemy => {
          if (enemy.hp <= 0) return enemy;
          
          const intent = enemy.currentIntent;
          if (!intent) return enemy;
          
          const intentValue = intent.value ?? 0;
          const intentType = intent.type as string;
          
          // Process enemy intent
          switch (intentType) {
            case 'attack':
            case 'heavyAttack': {
              const times = intent.times || 1;
              for (let t = 0; t < times; t++) {
                let damage = intentValue;
                if (playerBlock > 0) {
                  const blocked = Math.min(playerBlock, damage);
                  playerBlock -= blocked;
                  damage -= blocked;
                }
                playerHp = Math.max(0, playerHp - damage);
              }
              break;
            }
            case 'attackDebuff':
            case 'attackBuff': {
              let damage = intentValue;
              if (playerBlock > 0) {
                const blocked = Math.min(playerBlock, damage);
                playerBlock -= blocked;
                damage -= blocked;
              }
              playerHp = Math.max(0, playerHp - damage);
              break;
            }
            case 'defend': {
              const nextIndex = (enemy.currentIntentIndex + 1) % enemy.pattern.length;
              return { 
                ...enemy, 
                block: enemy.block + intentValue,
                currentIntentIndex: nextIndex,
                currentIntent: enemy.pattern[nextIndex],
              };
            }
          }
          
          // Advance to next intent
          const nextIndex = (enemy.currentIntentIndex + 1) % enemy.pattern.length;
          return {
            ...enemy,
            currentIntentIndex: nextIndex,
            currentIntent: enemy.pattern[nextIndex],
          };
        });
        
        // Reset enemy block at start of player turn
        const enemiesWithResetBlock = updatedEnemies.map(e => ({ ...e, block: 0 }));
        
        set({
          run: {
            ...state.run,
            player: { 
              ...state.run.player, 
              hp: playerHp,
              energy: state.run.player.maxEnergy, 
              block: 0, // Player block resets
            },
            combat: {
              ...combat,
              enemies: enemiesWithResetBlock,
              hand: retainedCards,
              discardPile: [...combat.discardPile, ...discardedCards],
              turn: combat.turn + 1,
              phase: 'playerTurn',
              cardsPlayedThisTurn: 0,
              energySpentThisTurn: 0,
              damageDealtThisTurn: 0,
            },
          },
        });
        
        // Check for defeat
        if (playerHp <= 0) {
          get().endCombat(false);
          return;
        }
        
        get().drawCards(GAME_CONSTANTS.HAND_SIZE);
      },

      drawCards: (count: number) => {
        const state = get();
        if (!state.run?.combat) return;
        
        let combat = { ...state.run.combat };
        let drawPile = [...combat.drawPile];
        let discardPile = [...combat.discardPile];
        const hand = [...combat.hand];
        
        for (let i = 0; i < count; i++) {
          if (hand.length >= GAME_CONSTANTS.MAX_HAND_SIZE) break;
          
          if (drawPile.length === 0) {
            if (discardPile.length === 0) break;
            drawPile = [...discardPile].sort(() => Math.random() - 0.5);
            discardPile = [];
          }
          
          const card = drawPile.pop();
          if (card) hand.push(card);
        }
        
        set({
          run: {
            ...state.run,
            combat: { ...combat, hand, drawPile, discardPile },
          },
        });
      },

      dealDamageToPlayer: (amount: number) => {
        const state = get();
        if (!state.run) return;
        
        const player = state.run.player;
        let damage = amount;
        let newBlock = player.block;
        
        if (newBlock > 0) {
          const blocked = Math.min(newBlock, damage);
          newBlock -= blocked;
          damage -= blocked;
        }
        
        const newHp = Math.max(0, player.hp - damage);
        
        set({
          run: {
            ...state.run,
            player: { ...player, hp: newHp, block: newBlock },
          },
        });
        
        if (newHp <= 0) get().endCombat(false);
      },

      healPlayer: (amount: number) => {
        const state = get();
        if (!state.run) return;
        
        set({
          run: {
            ...state.run,
            player: {
              ...state.run.player,
              hp: Math.min(state.run.player.maxHp, state.run.player.hp + amount),
            },
          },
        });
      },

      addBlock: (amount: number) => {
        const state = get();
        if (!state.run) return;
        
        set({
          run: {
            ...state.run,
            player: { ...state.run.player, block: state.run.player.block + amount },
          },
        });
      },

      modifyEnergy: (amount: number) => {
        const state = get();
        if (!state.run) return;
        
        set({
          run: {
            ...state.run,
            player: {
              ...state.run.player,
              energy: Math.max(0, Math.min(GAME_CONSTANTS.MAX_ENERGY, state.run.player.energy + amount)),
            },
          },
        });
      },

      addCardToDeck: (card: CardInstance) => {
        const state = get();
        if (!state.run) return;
        
        set({
          run: {
            ...state.run,
            player: { ...state.run.player, deck: [...state.run.player.deck, card] },
          },
        });
      },

      removeCardFromDeck: (cardInstanceId: string) => {
        const state = get();
        if (!state.run) return;
        
        set({
          run: {
            ...state.run,
            player: {
              ...state.run.player,
              deck: state.run.player.deck.filter((c: CardInstance) => c.instanceId !== cardInstanceId),
            },
          },
        });
      },

      upgradeCard: (cardInstanceId: string) => {
        const state = get();
        if (!state.run) return;
        
        const newDeck = state.run.player.deck.map((card: CardInstance) => {
          if (card.instanceId === cardInstanceId && !card.upgraded && card.upgradedVersion) {
            return {
              ...card,
              upgraded: true,
              name: card.name + '+',
              description: card.upgradedVersion.description,
              effects: card.upgradedVersion.effects,
              energyCost: card.upgradedVersion.energyCost ?? card.energyCost,
            };
          }
          return card;
        });
        
        set({
          run: {
            ...state.run,
            player: { ...state.run.player, deck: newDeck },
          },
        });
      },

      upgradeCardInHand: (cardInstanceId: string) => {
        const state = get();
        if (!state.run?.combat) return;
        
        const cardIndex = state.run.combat.hand.findIndex(c => c.instanceId === cardInstanceId);
        if (cardIndex === -1) return;
        
        const card = state.run.combat.hand[cardIndex];
        if (!card.upgradedVersion || card.upgraded) return;
        
        const upgradedCard: CardInstance = {
          ...card,
          ...card.upgradedVersion,
          upgraded: true,
        };
        
        const newHand = [...state.run.combat.hand];
        newHand[cardIndex] = upgradedCard;
        
        set({
          run: {
            ...state.run,
            combat: {
              ...state.run.combat,
              hand: newHand,
            },
          },
          pendingUpgrade: false, // Automatically cancel upgrade mode after upgrading one card
        });
      },

      addBlessing: (blessing: any) => {
        const state = get();
        if (!state.run) return;
        
        set({
          run: {
            ...state.run,
            player: {
              ...state.run.player,
              blessings: [...state.run.player.blessings, blessing],
            },
          },
        });
      },

      cancelUpgrade: () => {
        set({ pendingUpgrade: false });
      },

      addDivineFavor: (amount: number) => {
        const state = get();
        if (!state.run) return;
        
        set({
          run: {
            ...state.run,
            player: { ...state.run.player, divineFavor: state.run.player.divineFavor + amount },
          },
        });
      },

      spendDivineFavor: (amount: number) => {
        const state = get();
        if (!state.run || state.run.player.divineFavor < amount) return false;
        
        set({
          run: {
            ...state.run,
            player: { ...state.run.player, divineFavor: state.run.player.divineFavor - amount },
          },
        });
        return true;
      },

      addAdamantShards: (amount: number) => {
        const state = get();
        if (!state.run) return;
        
        set({
          run: {
            ...state.run,
            player: { ...state.run.player, adamantShards: state.run.player.adamantShards + amount },
          },
        });
      },

      spendAdamantShards: (amount: number) => {
        const state = get();
        if (!state.run || state.run.player.adamantShards < amount) return false;
        
        set({
          run: {
            ...state.run,
            player: { ...state.run.player, adamantShards: state.run.player.adamantShards - amount },
          },
        });
        return true;
      },

      addArtifact: (artifact: Artifact) => {
        const state = get();
        if (!state.run) return;
        
        set({
          run: {
            ...state.run,
            player: { ...state.run.player, artifacts: [...state.run.player.artifacts, artifact] },
          },
        });
      },

      selectNode: (nodeId: string) => {
        const state = get();
        if (!state.run) return;
        
        const nodeIndex = state.run.map.nodes.findIndex(n => n.id === nodeId);
        if (nodeIndex === -1) return;
        
        const node = state.run.map.nodes[nodeIndex];
        if (!node.available || node.visited) return;
        
        // Mark clicked node as visited and update available nodes
        const newNodes = state.run.map.nodes.map((n, i) => {
          // Mark the selected node as visited
          if (i === nodeIndex) {
            return { ...n, visited: true, available: false };
          }
          
          // Disable other nodes in the same row (can't go to multiple nodes in same row)
          if (n.row === node.row && n.available && !n.visited) {
            return { ...n, available: false };
          }
          
          // Make all connected nodes available (this is key - don't check if already available)
          if (node.connections.includes(n.id) && !n.visited) {
            return { ...n, available: true };
          }
          
          // Keep all other nodes as they are
          return n;
        });
        
        set({
          run: {
            ...state.run,
            map: { ...state.run.map, nodes: newNodes, currentNodeId: nodeId },
          },
        });
        
        // Trigger node-specific events based on node type
        const nodeType = node.type as NodeType;
        const act = state.run.map.act;
        
        switch (nodeType) {
          case 'combat':
            get().startCombat(createCombatEnemies(act, false, false));
            break;
          case 'eliteCombat':
            get().startCombat(createCombatEnemies(act, true, false));
            break;
          case 'boss':
            get().startCombat(createCombatEnemies(act, false, true));
            break;
          case 'rest':
            set({ gamePhase: 'rest' as GamePhase });
            break;
          case 'shop':
            set({ gamePhase: 'shop' as GamePhase });
            break;
          case 'event':
            set({ gamePhase: 'event' as GamePhase });
            break;
          case 'forgeUpgrade':
            set({ gamePhase: 'event' as GamePhase }); // Use event screen for now
            break;
          case 'shrine':
            set({ gamePhase: 'spartanTrade' as GamePhase });
            break;
          default:
            console.log(`Unknown node type: ${nodeType}`);
        }
      },

      updateSettings: (newSettings: Partial<GameSettings>) => {
        const state = get();
        set({ settings: { ...state.settings, ...newSettings } });
      },
    }),
    {
      name: 'forge-of-the-fallen-save',
      partialize: (state) => ({
        run: state.run,
        progression: state.progression,
        settings: state.settings,
      }),
    }
  )
);
