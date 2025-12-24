import { Card, CardType, Rarity, EffectType, StatusEffectType } from '../../types';

// ============================================
// COMPLETE CARD LIBRARY
// Based on game concept document
// ============================================

// -------------------- COMMON ATTACK CARDS --------------------

export const commonAttackCards: Card[] = [
  {
    id: 'hammer-strike',
    name: 'Hammer Strike',
    type: CardType.Attack,
    rarity: Rarity.Common,
    energyCost: 1,
    description: 'Deal 6 damage.',
    effects: [{ type: EffectType.Damage, value: 6, target: 'enemy' }],
    tags: ['Strike', 'Weapon'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 8 damage.',
      effects: [{ type: EffectType.Damage, value: 8, target: 'enemy' }],
    },
  },
  {
    id: 'forge-smash',
    name: 'Forge Smash',
    type: CardType.Attack,
    rarity: Rarity.Common,
    energyCost: 2,
    description: 'Deal 12 damage.',
    effects: [{ type: EffectType.Damage, value: 12, target: 'enemy' }],
    tags: ['Strike', 'Weapon'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 16 damage.',
      effects: [{ type: EffectType.Damage, value: 16, target: 'enemy' }],
    },
  },
  {
    id: 'spartan-strike',
    name: 'Spartan Strike',
    type: CardType.Attack,
    rarity: Rarity.Common,
    energyCost: 1,
    description: 'Deal 7 damage.',
    effects: [{ type: EffectType.Damage, value: 7, target: 'enemy' }],
    tags: ['Strike', 'Spartan'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 10 damage.',
      effects: [{ type: EffectType.Damage, value: 10, target: 'enemy' }],
    },
  },
  {
    id: 'sword-slash',
    name: 'Sword Slash',
    type: CardType.Attack,
    rarity: Rarity.Common,
    energyCost: 1,
    description: 'Deal 5 damage. Draw 1 card.',
    effects: [
      { type: EffectType.Damage, value: 5, target: 'enemy' },
      { type: EffectType.Draw, value: 1 },
    ],
    tags: ['Strike', 'Weapon'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 7 damage. Draw 1 card.',
      effects: [
        { type: EffectType.Damage, value: 7, target: 'enemy' },
        { type: EffectType.Draw, value: 1 },
      ],
    },
  },
  {
    id: 'spear-thrust',
    name: 'Spear Thrust',
    type: CardType.Attack,
    rarity: Rarity.Common,
    energyCost: 2,
    description: 'Deal 10 damage. If this kills an enemy, gain 2 Energy.',
    effects: [
      { type: EffectType.Damage, value: 10, target: 'enemy' },
      { type: EffectType.GainEnergy, value: 2, condition: { type: 'kills' } },
    ],
    tags: ['Strike', 'Weapon'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 14 damage. If this kills an enemy, gain 2 Energy.',
      effects: [
        { type: EffectType.Damage, value: 14, target: 'enemy' },
        { type: EffectType.GainEnergy, value: 2, condition: { type: 'kills' } },
      ],
    },
  },
  {
    id: 'iron-fist',
    name: 'Iron Fist',
    type: CardType.Attack,
    rarity: Rarity.Common,
    energyCost: 0,
    description: 'Deal 3 damage.',
    effects: [{ type: EffectType.Damage, value: 3, target: 'enemy' }],
    tags: ['Strike'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 5 damage.',
      effects: [{ type: EffectType.Damage, value: 5, target: 'enemy' }],
    },
  },
  {
    id: 'quench-strike',
    name: 'Quench Strike',
    type: CardType.Attack,
    rarity: Rarity.Common,
    energyCost: 2,
    description: 'Deal 9 damage. Gain 4 Block.',
    effects: [
      { type: EffectType.Damage, value: 9, target: 'enemy' },
      { type: EffectType.Block, value: 4 },
    ],
    tags: ['Strike', 'Forge'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 12 damage. Gain 6 Block.',
      effects: [
        { type: EffectType.Damage, value: 12, target: 'enemy' },
        { type: EffectType.Block, value: 6 },
      ],
    },
  },
  {
    id: 'wild-swing',
    name: 'Wild Swing',
    type: CardType.Attack,
    rarity: Rarity.Common,
    energyCost: 1,
    description: 'Deal 5-10 damage randomly.',
    effects: [{ type: EffectType.Damage, value: 7, target: 'enemy' }], // Average of 5-10
    tags: ['Strike', 'Weapon'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 7-14 damage randomly.',
      effects: [{ type: EffectType.Damage, value: 10, target: 'enemy' }], // Average of 7-14
    },
  },
  {
    id: 'twin-strike',
    name: 'Twin Strike',
    type: CardType.Attack,
    rarity: Rarity.Common,
    energyCost: 1,
    description: 'Deal 3 damage twice.',
    effects: [{ type: EffectType.Damage, value: 3, target: 'enemy', times: 2 }],
    tags: ['Strike', 'Weapon'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 5 damage twice.',
      effects: [{ type: EffectType.Damage, value: 5, target: 'enemy', times: 2 }],
    },
  },
];

// -------------------- COMMON DEFENSE CARDS --------------------

export const commonDefenseCards: Card[] = [
  {
    id: 'shield-brace',
    name: 'Shield Brace',
    type: CardType.Defense,
    rarity: Rarity.Common,
    energyCost: 1,
    description: 'Gain 5 Block.',
    effects: [{ type: EffectType.Block, value: 5 }],
    tags: ['Block'],
    upgraded: false,
    upgradedVersion: {
      description: 'Gain 8 Block.',
      effects: [{ type: EffectType.Block, value: 8 }],
    },
  },
  {
    id: 'aspis-guard',
    name: 'Aspis Guard',
    type: CardType.Defense,
    rarity: Rarity.Common,
    energyCost: 1,
    description: 'Gain 6 Block.',
    effects: [{ type: EffectType.Block, value: 6 }],
    tags: ['Block', 'Spartan'],
    upgraded: false,
    upgradedVersion: {
      description: 'Gain 9 Block.',
      effects: [{ type: EffectType.Block, value: 9 }],
    },
  },
  {
    id: 'defensive-stance',
    name: 'Defensive Stance',
    type: CardType.Defense,
    rarity: Rarity.Common,
    energyCost: 2,
    description: 'Gain 11 Block.',
    effects: [{ type: EffectType.Block, value: 11 }],
    tags: ['Block'],
    upgraded: false,
    upgradedVersion: {
      description: 'Gain 15 Block.',
      effects: [{ type: EffectType.Block, value: 15 }],
    },
  },
  {
    id: 'step-back',
    name: 'Step Back',
    type: CardType.Defense,
    rarity: Rarity.Common,
    energyCost: 0,
    description: 'Gain 3 Block.',
    effects: [{ type: EffectType.Block, value: 3 }],
    tags: ['Block'],
    upgraded: false,
    upgradedVersion: {
      description: 'Gain 5 Block.',
      effects: [{ type: EffectType.Block, value: 5 }],
    },
  },
  {
    id: 'bronze-guard',
    name: 'Bronze Guard',
    type: CardType.Defense,
    rarity: Rarity.Common,
    energyCost: 2,
    description: 'Gain 9 Block. If you have 3+ Energy, gain 5 extra Block.',
    effects: [{ type: EffectType.Block, value: 9 }],
    tags: ['Block'],
    upgraded: false,
    upgradedVersion: {
      description: 'Gain 12 Block. If you have 3+ Energy, gain 5 extra Block.',
      effects: [{ type: EffectType.Block, value: 12 }],
    },
  },
  {
    id: 'reactive-armor',
    name: 'Reactive Armor',
    type: CardType.Defense,
    rarity: Rarity.Common,
    energyCost: 1,
    description: 'Gain 5 Block. Your next attack deals +2 damage.',
    effects: [{ type: EffectType.Block, value: 5 }],
    tags: ['Block'],
    upgraded: false,
    upgradedVersion: {
      description: 'Gain 7 Block. Your next attack deals +3 damage.',
      effects: [{ type: EffectType.Block, value: 7 }],
    },
  },
  {
    id: 'phalanx-form',
    name: 'Phalanx Form',
    type: CardType.Defense,
    rarity: Rarity.Common,
    energyCost: 3,
    description: 'Gain 20 Block.',
    effects: [{ type: EffectType.Block, value: 20 }],
    tags: ['Block', 'Spartan'],
    upgraded: false,
    upgradedVersion: {
      description: 'Gain 28 Block.',
      effects: [{ type: EffectType.Block, value: 28 }],
    },
  },
];

// -------------------- COMMON FORGE CARDS --------------------

export const commonForgeCards: Card[] = [
  {
    id: 'temper',
    name: 'Temper',
    type: CardType.Forge,
    rarity: Rarity.Common,
    energyCost: 1,
    description: 'Upgrade a card in hand for this combat.',
    effects: [{ type: EffectType.UpgradeCard }],
    tags: ['Forge'],
    upgraded: false,
    upgradedVersion: {
      description: 'Upgrade a card in hand for this combat.',
      effects: [{ type: EffectType.UpgradeCard }],
      energyCost: 0,
    },
  },
  {
    id: 'bellows-blast',
    name: 'Bellows Blast',
    type: CardType.Forge,
    rarity: Rarity.Common,
    energyCost: 0,
    description: 'Gain 1 Energy.',
    effects: [{ type: EffectType.GainEnergy, value: 1 }],
    tags: ['Forge', 'Fire'],
    upgraded: false,
    upgradedVersion: {
      description: 'Gain 2 Energy.',
      effects: [{ type: EffectType.GainEnergy, value: 2 }],
    },
  },
  {
    id: 'stoke-flames',
    name: 'Stoke Flames',
    type: CardType.Forge,
    rarity: Rarity.Common,
    energyCost: 1,
    description: 'Draw 2 cards.',
    effects: [{ type: EffectType.Draw, value: 2 }],
    tags: ['Forge', 'Fire'],
    upgraded: false,
    upgradedVersion: {
      description: 'Draw 3 cards.',
      effects: [{ type: EffectType.Draw, value: 3 }],
    },
  },
  {
    id: 'sharpen',
    name: 'Sharpen',
    type: CardType.Forge,
    rarity: Rarity.Common,
    energyCost: 1,
    description: 'Your next attack deals +4 damage.',
    effects: [{ type: EffectType.ApplyStatus, statusEffect: StatusEffectType.Vigor, value: 4 }],
    tags: ['Forge', 'Weapon'],
    upgraded: false,
    upgradedVersion: {
      description: 'Your next attack deals +6 damage.',
      effects: [{ type: EffectType.ApplyStatus, statusEffect: StatusEffectType.Vigor, value: 6 }],
    },
  },
  {
    id: 'metal-scraps',
    name: 'Metal Scraps',
    type: CardType.Forge,
    rarity: Rarity.Common,
    energyCost: 0,
    description: 'Gain 3 Block. Exhaust.',
    effects: [{ type: EffectType.Block, value: 3 }],
    tags: ['Forge'],
    upgraded: false,
    exhaust: true,
    upgradedVersion: {
      description: 'Gain 5 Block. Exhaust.',
      effects: [{ type: EffectType.Block, value: 5 }],
    },
  },
  {
    id: 'oil-the-blade',
    name: 'Oil the Blade',
    type: CardType.Forge,
    rarity: Rarity.Common,
    energyCost: 0,
    description: 'Draw 1 card.',
    effects: [{ type: EffectType.Draw, value: 1 }],
    tags: ['Forge', 'Weapon'],
    upgraded: false,
    upgradedVersion: {
      description: 'Draw 2 cards.',
      effects: [{ type: EffectType.Draw, value: 2 }],
    },
  },
];

// -------------------- UNCOMMON ATTACK CARDS --------------------

export const uncommonAttackCards: Card[] = [
  {
    id: 'molten-strike',
    name: 'Molten Strike',
    type: CardType.Attack,
    rarity: Rarity.Uncommon,
    energyCost: 2,
    description: 'Deal 13 damage. Apply 2 Burn.',
    effects: [
      { type: EffectType.Damage, value: 13, target: 'enemy' },
      { type: EffectType.ApplyStatus, statusEffect: StatusEffectType.Burn, value: 2, target: 'enemy' },
    ],
    tags: ['Strike', 'Fire'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 17 damage. Apply 3 Burn.',
      effects: [
        { type: EffectType.Damage, value: 17, target: 'enemy' },
        { type: EffectType.ApplyStatus, statusEffect: StatusEffectType.Burn, value: 3, target: 'enemy' },
      ],
    },
  },
  {
    id: 'execute',
    name: 'Execute',
    type: CardType.Attack,
    rarity: Rarity.Uncommon,
    energyCost: 2,
    description: 'Deal 18 damage only to enemies below 50% HP.',
    effects: [
      { type: EffectType.Damage, value: 18, target: 'enemy', condition: { type: 'enemyBelow', value: 50 } },
    ],
    tags: ['Strike'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 25 damage only to enemies below 50% HP.',
      effects: [
        { type: EffectType.Damage, value: 25, target: 'enemy', condition: { type: 'enemyBelow', value: 50 } },
      ],
    },
  },
  {
    id: 'whirlwind',
    name: 'Whirlwind',
    type: CardType.Attack,
    rarity: Rarity.Uncommon,
    energyCost: 1,
    description: 'Deal 8 damage to ALL enemies.',
    effects: [{ type: EffectType.DamageAll, value: 8 }],
    tags: ['Strike', 'Weapon'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 10 damage to ALL enemies.',
      effects: [{ type: EffectType.DamageAll, value: 10 }],
    },
  },
  {
    id: 'precision-strike',
    name: 'Precision Strike',
    type: CardType.Attack,
    rarity: Rarity.Uncommon,
    energyCost: 2,
    description: 'Deal 16 damage. Cannot be blocked.',
    effects: [{ type: EffectType.Damage, value: 16, target: 'enemy' }],
    tags: ['Strike', 'Weapon'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 22 damage. Cannot be blocked.',
      effects: [{ type: EffectType.Damage, value: 22, target: 'enemy' }],
    },
  },
  {
    id: 'blessed-blade',
    name: 'Blessed Blade',
    type: CardType.Attack,
    rarity: Rarity.Uncommon,
    energyCost: 2,
    description: 'Deal 10 damage. If this kills an enemy, draw 2 cards and gain 1 Energy.',
    effects: [
      { type: EffectType.Damage, value: 10, target: 'enemy' },
      { type: EffectType.Draw, value: 2, condition: { type: 'kills' } },
      { type: EffectType.GainEnergy, value: 1, condition: { type: 'kills' } },
    ],
    tags: ['Strike', 'Divine', 'Weapon'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 14 damage. If this kills an enemy, draw 2 cards and gain 1 Energy.',
      effects: [
        { type: EffectType.Damage, value: 14, target: 'enemy' },
        { type: EffectType.Draw, value: 2, condition: { type: 'kills' } },
        { type: EffectType.GainEnergy, value: 1, condition: { type: 'kills' } },
      ],
    },
  },
  {
    id: 'spartan-fury',
    name: 'Spartan Fury',
    type: CardType.Attack,
    rarity: Rarity.Uncommon,
    energyCost: 1,
    description: 'Deal 5 damage. +2 damage for each attack played this turn.',
    effects: [{ type: EffectType.Damage, value: 5, target: 'enemy' }],
    tags: ['Strike', 'Spartan'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 7 damage. +2 damage for each attack played this turn.',
      effects: [{ type: EffectType.Damage, value: 7, target: 'enemy' }],
    },
  },
  {
    id: 'crushing-blow',
    name: 'Crushing Blow',
    type: CardType.Attack,
    rarity: Rarity.Uncommon,
    energyCost: 2,
    description: 'Deal 15 damage. Enemy loses 2 Block.',
    effects: [
      { type: EffectType.Damage, value: 15, target: 'enemy' },
      { type: EffectType.ApplyStatus, statusEffect: StatusEffectType.BrokenArmor, value: 2, target: 'enemy' },
    ],
    tags: ['Strike', 'Weapon'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 20 damage. Enemy loses 3 Block.',
      effects: [
        { type: EffectType.Damage, value: 20, target: 'enemy' },
        { type: EffectType.ApplyStatus, statusEffect: StatusEffectType.BrokenArmor, value: 3, target: 'enemy' },
      ],
    },
  },
  {
    id: 'dual-wield',
    name: 'Dual Wield',
    type: CardType.Attack,
    rarity: Rarity.Uncommon,
    energyCost: 2,
    description: 'Deal 8 damage twice.',
    effects: [{ type: EffectType.Damage, value: 8, target: 'enemy', times: 2 }],
    tags: ['Strike', 'Weapon'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 11 damage twice.',
      effects: [{ type: EffectType.Damage, value: 11, target: 'enemy', times: 2 }],
    },
  },
  {
    id: 'adamant-strike',
    name: 'Adamant Strike',
    type: CardType.Attack,
    rarity: Rarity.Uncommon,
    energyCost: 3,
    description: 'Deal 25 damage.',
    effects: [{ type: EffectType.Damage, value: 25, target: 'enemy' }],
    tags: ['Strike', 'Weapon'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 35 damage.',
      effects: [{ type: EffectType.Damage, value: 35, target: 'enemy' }],
    },
  },
];

// -------------------- UNCOMMON DEFENSE CARDS --------------------

export const uncommonDefenseCards: Card[] = [
  {
    id: 'fortress',
    name: 'Fortress',
    type: CardType.Defense,
    rarity: Rarity.Uncommon,
    energyCost: 2,
    description: "Gain 12 Block. Block doesn't decay at end of turn.",
    effects: [
      { type: EffectType.Block, value: 12 },
      { type: EffectType.ApplyStatus, statusEffect: StatusEffectType.Fortified, value: 1 },
    ],
    tags: ['Block'],
    upgraded: false,
    upgradedVersion: {
      description: "Gain 16 Block. Block doesn't decay at end of turn.",
      effects: [
        { type: EffectType.Block, value: 16 },
        { type: EffectType.ApplyStatus, statusEffect: StatusEffectType.Fortified, value: 1 },
      ],
    },
  },
  {
    id: 'divine-shield',
    name: 'Divine Shield',
    type: CardType.Defense,
    rarity: Rarity.Uncommon,
    energyCost: 3,
    description: 'Gain 18 Block. Heal 5 HP.',
    effects: [
      { type: EffectType.Block, value: 18 },
      { type: EffectType.Heal, value: 5 },
    ],
    tags: ['Block', 'Divine'],
    upgraded: false,
    upgradedVersion: {
      description: 'Gain 24 Block. Heal 8 HP.',
      effects: [
        { type: EffectType.Block, value: 24 },
        { type: EffectType.Heal, value: 8 },
      ],
    },
  },
  {
    id: 'counter',
    name: 'Counter',
    type: CardType.Defense,
    rarity: Rarity.Uncommon,
    energyCost: 1,
    description: 'Gain 7 Block. When attacked, deal 5 damage back.',
    effects: [{ type: EffectType.Block, value: 7 }],
    tags: ['Block'],
    upgraded: false,
    upgradedVersion: {
      description: 'Gain 10 Block. When attacked, deal 8 damage back.',
      effects: [{ type: EffectType.Block, value: 10 }],
    },
  },
  {
    id: 'second-wind',
    name: 'Second Wind',
    type: CardType.Defense,
    rarity: Rarity.Uncommon,
    energyCost: 1,
    description: 'Gain 6 Block. Draw 1 card.',
    effects: [
      { type: EffectType.Block, value: 6 },
      { type: EffectType.Draw, value: 1 },
    ],
    tags: ['Block'],
    upgraded: false,
    upgradedVersion: {
      description: 'Gain 9 Block. Draw 2 cards.',
      effects: [
        { type: EffectType.Block, value: 9 },
        { type: EffectType.Draw, value: 2 },
      ],
    },
  },
];

// -------------------- UNCOMMON FORGE CARDS --------------------

export const uncommonForgeCards: Card[] = [
  {
    id: 'master-craft',
    name: 'Master Craft',
    type: CardType.Forge,
    rarity: Rarity.Uncommon,
    energyCost: 2,
    description: 'Upgrade all attacks in hand for this combat.',
    effects: [{ type: EffectType.UpgradeCard }],
    tags: ['Forge'],
    upgraded: false,
    upgradedVersion: {
      description: 'Upgrade all attacks in hand for this combat.',
      effects: [{ type: EffectType.UpgradeCard }],
      energyCost: 1,
    },
  },
  {
    id: 'inferno',
    name: 'Inferno',
    type: CardType.Forge,
    rarity: Rarity.Uncommon,
    energyCost: 2,
    description: 'Gain 3 Energy. Take 5 damage.',
    effects: [
      { type: EffectType.GainEnergy, value: 3 },
      { type: EffectType.LoseHP, value: 5 },
    ],
    tags: ['Forge', 'Fire'],
    upgraded: false,
    upgradedVersion: {
      description: 'Gain 4 Energy. Take 3 damage.',
      effects: [
        { type: EffectType.GainEnergy, value: 4 },
        { type: EffectType.LoseHP, value: 3 },
      ],
    },
  },
  {
    id: 'heat-wave',
    name: 'Heat Wave',
    type: CardType.Forge,
    rarity: Rarity.Uncommon,
    energyCost: 2,
    description: 'Deal 8 damage to ALL enemies.',
    effects: [{ type: EffectType.DamageAll, value: 8 }],
    tags: ['Forge', 'Fire', 'Strike'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 12 damage to ALL enemies.',
      effects: [{ type: EffectType.DamageAll, value: 12 }],
    },
  },
  {
    id: 'battle-trance',
    name: 'Battle Trance',
    type: CardType.Forge,
    rarity: Rarity.Uncommon,
    energyCost: 0,
    description: 'Draw 3 cards. Discard 1 card.',
    effects: [{ type: EffectType.Draw, value: 3 }],
    tags: ['Forge'],
    upgraded: false,
    upgradedVersion: {
      description: 'Draw 4 cards. Discard 1 card.',
      effects: [{ type: EffectType.Draw, value: 4 }],
    },
  },
];

// -------------------- RARE ATTACK CARDS --------------------

export const rareAttackCards: Card[] = [
  {
    id: 'olympian-wrath',
    name: 'Olympian Wrath',
    type: CardType.Attack,
    rarity: Rarity.Rare,
    energyCost: 3,
    description: 'Deal 18 damage. If lethal, draw 3 cards and gain 2 Energy.',
    effects: [
      { type: EffectType.Damage, value: 18, target: 'enemy' },
      { type: EffectType.Draw, value: 3, condition: { type: 'kills' } },
      { type: EffectType.GainEnergy, value: 2, condition: { type: 'kills' } },
    ],
    tags: ['Strike', 'Divine'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 25 damage. If lethal, draw 3 cards and gain 2 Energy.',
      effects: [
        { type: EffectType.Damage, value: 25, target: 'enemy' },
        { type: EffectType.Draw, value: 3, condition: { type: 'kills' } },
        { type: EffectType.GainEnergy, value: 2, condition: { type: 'kills' } },
      ],
    },
  },
  {
    id: 'phalanx-breaker',
    name: 'Phalanx Breaker',
    type: CardType.Attack,
    rarity: Rarity.Rare,
    energyCost: 3,
    description: 'Remove all enemy Block, then deal 22 damage.',
    effects: [{ type: EffectType.Damage, value: 22, target: 'enemy' }],
    tags: ['Strike', 'Spartan', 'Weapon'],
    upgraded: false,
    upgradedVersion: {
      description: 'Remove all enemy Block, then deal 30 damage.',
      effects: [{ type: EffectType.Damage, value: 30, target: 'enemy' }],
    },
  },
  {
    id: 'blade-dance',
    name: 'Blade Dance',
    type: CardType.Attack,
    rarity: Rarity.Rare,
    energyCost: 2,
    description: 'Deal 7 damage 3 times. Draw 1 card.',
    effects: [
      { type: EffectType.Damage, value: 7, target: 'enemy', times: 3 },
      { type: EffectType.Draw, value: 1 },
    ],
    tags: ['Strike', 'Weapon'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 10 damage 3 times. Draw 1 card.',
      effects: [
        { type: EffectType.Damage, value: 10, target: 'enemy', times: 3 },
        { type: EffectType.Draw, value: 1 },
      ],
    },
  },
  {
    id: 'volcanic-eruption',
    name: 'Volcanic Eruption',
    type: CardType.Attack,
    rarity: Rarity.Rare,
    energyCost: 3,
    description: 'Deal 25 damage to ALL enemies. Apply 3 Burn to all.',
    effects: [
      { type: EffectType.DamageAll, value: 25 },
      { type: EffectType.ApplyStatus, statusEffect: StatusEffectType.Burn, value: 3, target: 'allEnemies' },
    ],
    tags: ['Strike', 'Fire'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 35 damage to ALL enemies. Apply 5 Burn to all.',
      effects: [
        { type: EffectType.DamageAll, value: 35 },
        { type: EffectType.ApplyStatus, statusEffect: StatusEffectType.Burn, value: 5, target: 'allEnemies' },
      ],
    },
  },
  {
    id: 'divine-smite',
    name: 'Divine Smite',
    type: CardType.Attack,
    rarity: Rarity.Rare,
    energyCost: 3,
    description: 'Deal 30 damage. Heal HP equal to damage dealt.',
    effects: [
      { type: EffectType.Damage, value: 30, target: 'enemy' },
      { type: EffectType.Heal, value: 30 },
    ],
    tags: ['Strike', 'Divine'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 40 damage. Heal HP equal to damage dealt.',
      effects: [
        { type: EffectType.Damage, value: 40, target: 'enemy' },
        { type: EffectType.Heal, value: 40 },
      ],
    },
  },
];

// -------------------- HYBRID CARDS --------------------

export const hybridCards: Card[] = [
  {
    id: 'combat-forge',
    name: 'Combat Forge',
    type: CardType.Hybrid,
    rarity: Rarity.Common,
    energyCost: 2,
    description: 'Deal 8 damage. Draw 1 card.',
    effects: [
      { type: EffectType.Damage, value: 8, target: 'enemy' },
      { type: EffectType.Draw, value: 1 },
    ],
    tags: ['Strike', 'Forge'],
    upgraded: false,
    upgradedVersion: {
      description: 'Deal 11 damage. Draw 1 card.',
      effects: [
        { type: EffectType.Damage, value: 11, target: 'enemy' },
        { type: EffectType.Draw, value: 1 },
      ],
    },
  },
];

// -------------------- AGGREGATE ALL CARDS --------------------

export const allCards: Card[] = [
  ...commonAttackCards,
  ...commonDefenseCards,
  ...commonForgeCards,
  ...uncommonAttackCards,
  ...uncommonDefenseCards,
  ...uncommonForgeCards,
  ...rareAttackCards,
  ...hybridCards,
];

// Helper function to get cards by rarity
export function getCardsByRarity(rarity: Rarity): Card[] {
  return allCards.filter(card => card.rarity === rarity);
}

// Helper function to get cards by type
export function getCardsByType(type: CardType): Card[] {
  return allCards.filter(card => card.type === type);
}

// Helper function to get random cards
export function getRandomCards(count: number, rarity?: Rarity): Card[] {
  const pool = rarity ? getCardsByRarity(rarity) : allCards;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
