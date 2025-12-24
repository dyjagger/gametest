// ============================================
// FORGE OF THE FALLEN - Core Type Definitions
// ============================================

// -------------------- ENUMS --------------------

export enum CardType {
  Attack = 'attack',
  Defense = 'defense',
  Forge = 'forge',
  Hybrid = 'hybrid',
  Power = 'power',
  Curse = 'curse',
}

export enum Rarity {
  Common = 'common',
  Uncommon = 'uncommon',
  Rare = 'rare',
  Legendary = 'legendary',
}

export enum EffectType {
  Damage = 'damage',
  DamageAll = 'damageAll',
  Block = 'block',
  Draw = 'draw',
  GainEnergy = 'gainEnergy',
  Heal = 'heal',
  ApplyStatus = 'applyStatus',
  RemoveStatus = 'removeStatus',
  UpgradeCard = 'upgradeCard',
  ExhaustCard = 'exhaustCard',
  AddCardToHand = 'addCardToHand',
  AddCardToDeck = 'addCardToDeck',
  RemoveCardFromDeck = 'removeCardFromDeck',
  DiscoverCard = 'discoverCard',
  GainArtifact = 'gainArtifact',
  GainDivineFavor = 'gainDivineFavor',
  GainAdamantShard = 'gainAdamantShard',
  LoseHP = 'loseHP',
  RetainCard = 'retainCard',
  Conditional = 'conditional',
  MultiHit = 'multiHit',
}

export enum StatusEffectType {
  // Buffs
  Strength = 'strength',
  Dexterity = 'dexterity',
  Vigor = 'vigor',
  Energized = 'energized',
  DivineBlessing = 'divineBlessing',
  Sharpened = 'sharpened',
  Fortified = 'fortified',
  Regeneration = 'regeneration',
  Thorns = 'thorns',
  // Debuffs
  Vulnerable = 'vulnerable',
  Weak = 'weak',
  Burn = 'burn',
  BrokenArmor = 'brokenArmor',
  Stunned = 'stunned',
  Marked = 'marked',
  Frail = 'frail',
  Poison = 'poison',
  // Special
  Frozen = 'frozen',
}

export enum IntentType {
  Attack = 'attack',
  Defend = 'defend',
  Buff = 'buff',
  Debuff = 'debuff',
  HeavyAttack = 'heavyAttack',
  AttackDebuff = 'attackDebuff',
  AttackBuff = 'attackBuff',
  Summon = 'summon',
  Heal = 'heal',
  Unknown = 'unknown',
}

export enum GamePhase {
  Menu = 'menu',
  Map = 'map',
  Combat = 'combat',
  Reward = 'reward',
  Shop = 'shop',
  Rest = 'rest',
  Event = 'event',
  SpartanTrade = 'spartanTrade',
  GameOver = 'gameOver',
  Victory = 'victory',
}

export enum NodeType {
  Combat = 'combat',
  EliteCombat = 'eliteCombat',
  Boss = 'boss',
  Rest = 'rest',
  Shop = 'shop',
  Event = 'event',
  ForgeUpgrade = 'forgeUpgrade',
  Shrine = 'shrine',
}

// -------------------- CARD TYPES --------------------

export interface Effect {
  type: EffectType;
  value?: number;
  target?: 'enemy' | 'allEnemies' | 'self' | 'randomEnemy';
  statusEffect?: StatusEffectType;
  duration?: number;
  condition?: EffectCondition;
  cardId?: string;
  times?: number;
}

export interface EffectCondition {
  type: 'belowHp' | 'aboveHp' | 'hasStatus' | 'enemyBelow' | 'cardTypeInHand' | 'firstCardPlayed' | 'kills';
  value?: number;
  statusType?: StatusEffectType;
  cardType?: CardType;
}

export interface CardUpgrade {
  description: string;
  effects: Effect[];
  energyCost?: number;
}

export interface Card {
  id: string;
  name: string;
  type: CardType;
  rarity: Rarity;
  energyCost: number;
  description: string;
  effects: Effect[];
  tags: string[];
  upgraded: boolean;
  upgradedVersion?: CardUpgrade;
  innate?: boolean;
  ethereal?: boolean;
  exhaust?: boolean;
  retain?: boolean;
}

export interface CardInstance extends Card {
  instanceId: string;
  temporaryUpgrade?: boolean;
}

// -------------------- ENEMY TYPES --------------------

export interface Intent {
  type: IntentType;
  value?: number;
  times?: number;
  statusEffect?: StatusEffectType;
  statusDuration?: number;
  summonId?: string;
}

export interface EnemyAbility {
  id: string;
  name: string;
  description: string;
  trigger: 'onDamaged' | 'onTurnStart' | 'onTurnEnd' | 'onDeath' | 'passive';
  effect: Effect;
}

export interface LootTable {
  divineFavor: number;
  adamantShardChance?: number;
  cardReward?: boolean;
  artifactChance?: number;
}

export interface EnemyDefinition {
  id: string;
  name: string;
  maxHp: number;
  pattern: Intent[];
  abilities?: EnemyAbility[];
  loot: LootTable;
  act: number;
  isElite?: boolean;
  isBoss?: boolean;
}

export interface Enemy extends EnemyDefinition {
  instanceId: string;
  hp: number;
  block: number;
  statusEffects: StatusEffect[];
  currentIntentIndex: number;
  currentIntent: Intent;
}

// -------------------- STATUS EFFECTS --------------------

export interface StatusEffect {
  type: StatusEffectType;
  stacks: number;
  duration?: number;
}

// -------------------- ARTIFACT TYPES --------------------

export interface ArtifactEffect {
  trigger: 'onCombatStart' | 'onTurnStart' | 'onTurnEnd' | 'onCardPlayed' | 'onDamageDealt' | 'onDamageTaken' | 'onHeal' | 'onEnemyKill' | 'passive';
  effect: Effect;
  condition?: EffectCondition;
}

export interface Artifact {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  effects: ArtifactEffect[];
}

// -------------------- SPARTAN TYPES --------------------

export interface CommissionRequirement {
  type: 'cardCount' | 'cardType' | 'cardRarity' | 'cardTags' | 'specificCard' | 'energyCostTotal' | 'upgraded';
  count?: number;
  cardType?: string;
  minRarity?: string;
  tags?: string[];
  cardId?: string;
}

export interface Blessing {
  id: string;
  name: string;
  description: string;
  effect: any; // Flexible effect structure
}

export interface SpartanCommission {
  tier: 1 | 2 | 3;
  requirement: CommissionRequirement;
  reward: {
    type: 'blessing' | 'technique';
    blessing?: Blessing;
    cards?: Card[];
  };
  description: string;
}

export interface Commission {
  tier: 1 | 2 | 3;
  description: string;
  requirements: CommissionRequirement[];
  adamantCost?: number;
}

export interface Technique {
  cardId: string;
}

export interface CommissionReward {
  blessing: Blessing;
  technique: Technique;
  divineFavor: number;
}

export interface Spartan {
  id: string;
  name: string;
  title: string;
  description?: string;
  archetype?: string;
  portrait?: string;
  commissions: SpartanCommission[] | {
    tier1: Commission;
    tier2: Commission;
    tier3: Commission;
  };
  rewards?: {
    tier1: CommissionReward;
    tier2: CommissionReward;
    tier3: CommissionReward;
  };
}

export interface SpartanProgress {
  spartanId: string;
  currentTier: 0 | 1 | 2 | 3;
  blessingsEarned: string[];
}

// -------------------- MAP TYPES --------------------

export interface MapNode {
  id: string;
  type: NodeType;
  row: number;
  column: number;
  connections: string[];
  visited: boolean;
  available: boolean;
  enemyIds?: string[];
  eventId?: string;
}

export interface GameMap {
  act: number;
  nodes: MapNode[];
  currentNodeId: string | null;
  bossNodeId: string;
}

// -------------------- GAME STATE TYPES --------------------

export interface PlayerState {
  hp: number;
  maxHp: number;
  energy: number;
  maxEnergy: number;
  block: number;
  deck: CardInstance[];
  artifacts: Artifact[];
  blessings: Blessing[];
  divineFavor: number;
  adamantShards: number;
  statusEffects: StatusEffect[];
}

export interface CombatState {
  active: boolean;
  turn: number;
  phase: 'playerTurn' | 'enemyTurn' | 'animating';
  enemies: Enemy[];
  hand: CardInstance[];
  drawPile: CardInstance[];
  discardPile: CardInstance[];
  exhaustPile: CardInstance[];
  cardsPlayedThisTurn: number;
  energySpentThisTurn: number;
  damageDealtThisTurn: number;
}

export interface ProgressionState {
  currentAct: number;
  spartanProgress: SpartanProgress[];
  unlockedCards: string[];
  unlockedArtifacts: string[];
  unlockedSpartans: string[];
  ascensionLevel: number;
  runsCompleted: number;
  runsWon: number;
}

export interface RunState {
  seed: string;
  map: GameMap;
  player: PlayerState;
  combat: CombatState | null;
  visitedSpartans: string[];
  currentEvent: string | null;
}

export interface GameState {
  gamePhase: GamePhase;
  run: RunState | null;
  progression: ProgressionState;
  settings: GameSettings;
}

export interface GameSettings {
  masterVolume: number;
  sfxVolume: number;
  musicVolume: number;
  animationSpeed: 'slow' | 'normal' | 'fast';
  screenShake: boolean;
  confirmEndTurn: boolean;
}

// -------------------- EVENT TYPES --------------------

export interface EventChoice {
  id: string;
  text: string;
  effects: Effect[];
  requirements?: {
    type: 'hp' | 'divineFavor' | 'adamantShards' | 'hasCard' | 'hasArtifact';
    value: number;
    cardId?: string;
    artifactId?: string;
  };
}

export interface GameEvent {
  id: string;
  name: string;
  description: string;
  choices: EventChoice[];
}

// -------------------- CONSTANTS --------------------

export const GAME_CONSTANTS = {
  STARTING_HP: 80,
  STARTING_ENERGY: 3,
  STARTING_DECK_SIZE: 20,
  HAND_SIZE: 5,
  MAX_HAND_SIZE: 10,
  MAX_ENERGY: 10,
  CARD_REWARD_CHOICES: 3,
  ELITE_ADAMANT_CHANCE: 0.25,
  BOSS_ADAMANT_GUARANTEED: true,
  HEAL_PERCENT_AT_REST: 0.3,
  SHOP_CARD_COST_MIN: 50,
  SHOP_CARD_COST_MAX: 100,
  SHOP_ARTIFACT_COST_MIN: 150,
  SHOP_ARTIFACT_COST_MAX: 300,
  SHOP_REMOVE_COST: 75,
} as const;
