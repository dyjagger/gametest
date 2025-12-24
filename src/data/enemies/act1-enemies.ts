import { EnemyDefinition, IntentType, StatusEffectType, EffectType } from '../../types';

// Act 1 Basic Enemies
export const impSwarm: EnemyDefinition = {
  id: 'imp-swarm',
  name: 'Imp Swarm',
  maxHp: 12,
  act: 1,
  pattern: [
    { type: IntentType.Attack, value: 4, times: 2 },
    { type: IntentType.Attack, value: 4, times: 2 },
    { type: IntentType.Defend, value: 6 },
  ],
  loot: { divineFavor: 10 },
};

export const lostSoul: EnemyDefinition = {
  id: 'lost-soul',
  name: 'Lost Soul',
  maxHp: 18,
  act: 1,
  pattern: [
    { type: IntentType.Attack, value: 6 },
    { type: IntentType.Debuff, statusEffect: StatusEffectType.Weak, statusDuration: 2 },
    { type: IntentType.Attack, value: 8 },
  ],
  loot: { divineFavor: 12 },
};

export const hellHound: EnemyDefinition = {
  id: 'hell-hound',
  name: 'Hell Hound',
  maxHp: 18,
  act: 1,
  pattern: [
    { type: IntentType.Attack, value: 7 },
    { type: IntentType.Attack, value: 7 },
    { type: IntentType.Buff, statusEffect: StatusEffectType.Strength, value: 2 },
  ],
  loot: { divineFavor: 15 },
};

export const tormentedSoul: EnemyDefinition = {
  id: 'tormented-soul',
  name: 'Tormented Soul',
  maxHp: 15,
  act: 1,
  pattern: [
    { type: IntentType.AttackDebuff, value: 5, statusEffect: StatusEffectType.Weak, statusDuration: 2 },
    { type: IntentType.Attack, value: 6 },
    { type: IntentType.Defend, value: 8 },
  ],
  loot: { divineFavor: 12 },
};

export const flameSprite: EnemyDefinition = {
  id: 'flame-sprite',
  name: 'Flame Sprite',
  maxHp: 10,
  act: 1,
  pattern: [
    { type: IntentType.AttackDebuff, value: 6, statusEffect: StatusEffectType.Burn, statusDuration: 2 },
    { type: IntentType.AttackDebuff, value: 6, statusEffect: StatusEffectType.Burn, statusDuration: 2 },
    { type: IntentType.AttackDebuff, value: 6, statusEffect: StatusEffectType.Burn, statusDuration: 2 },
  ],
  loot: { divineFavor: 10 },
};

export const boneWarrior: EnemyDefinition = {
  id: 'bone-warrior',
  name: 'Bone Warrior',
  maxHp: 22,
  act: 1,
  pattern: [
    { type: IntentType.Defend, value: 10 },
    { type: IntentType.Attack, value: 9 },
    { type: IntentType.Attack, value: 9 },
  ],
  loot: { divineFavor: 18 },
};

// Act 1 Elite Enemies
export const forgeBreaker: EnemyDefinition = {
  id: 'forge-breaker',
  name: 'Forge Breaker',
  maxHp: 45,
  act: 1,
  isElite: true,
  pattern: [
    { type: IntentType.HeavyAttack, value: 12 }, // Targets forge HP
    { type: IntentType.Attack, value: 8 },
    { type: IntentType.Buff, statusEffect: StatusEffectType.Strength, value: 3 },
  ],
  loot: { divineFavor: 50, adamantShardChance: 0.25, cardReward: true },
};

export const weaponEater: EnemyDefinition = {
  id: 'weapon-eater',
  name: 'Weapon Eater',
  maxHp: 40,
  act: 1,
  isElite: true,
  pattern: [
    { type: IntentType.Debuff, statusEffect: StatusEffectType.Weak, statusDuration: 3 }, // Represents stealing
    { type: IntentType.Attack, value: 10 },
    { type: IntentType.Defend, value: 15 },
  ],
  loot: { divineFavor: 60, adamantShardChance: 0.25, cardReward: true },
};

export const corruptedHoplite: EnemyDefinition = {
  id: 'corrupted-hoplite',
  name: 'Corrupted Hoplite',
  maxHp: 50,
  act: 1,
  isElite: true,
  pattern: [
    { type: IntentType.Defend, value: 20 },
    { type: IntentType.Attack, value: 15 },
    { type: IntentType.HeavyAttack, value: 25 },
  ],
  loot: { divineFavor: 70, adamantShardChance: 0.25, cardReward: true },
};

// Act 1 Boss - Moloch's Wrath
export const molochsWrath: EnemyDefinition = {
  id: 'molochs-wrath',
  name: "Moloch's Wrath",
  maxHp: 150,
  act: 1,
  isBoss: true,
  pattern: [
    { type: IntentType.Buff, statusEffect: StatusEffectType.Strength, value: 5 },
    { type: IntentType.HeavyAttack, value: 20 },
    { type: IntentType.AttackDebuff, value: 15, statusEffect: StatusEffectType.Vulnerable, statusDuration: 2 },
    { type: IntentType.Defend, value: 25 },
    // Phase 2 starts at 75 HP
  ],
  abilities: [
    {
      id: 'demon-general',
      name: 'Demon General',
      description: 'Enters Phase 2 at 75 HP with increased strength',
      trigger: 'passive',
      effect: { type: EffectType.Damage, value: 0 },
    },
  ],
  loot: { divineFavor: 150, adamantShardChance: 1.0, cardReward: true, artifactChance: 1.0 },
};

// Helper to get random enemies for combat
export const ACT1_BASIC_ENEMIES = [impSwarm, lostSoul, hellHound, tormentedSoul, flameSprite, boneWarrior];
export const ACT1_ELITE_ENEMIES = [forgeBreaker, weaponEater, corruptedHoplite];
export const ACT1_BOSS_ENEMIES = [molochsWrath];
