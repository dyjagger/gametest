import { Spartan, SpartanCommission, CardType, Rarity, EffectType } from '../../types';

// ============================================
// SPARTAN DEFINITIONS
// Based on game concept document
// ============================================

// -------------------- LEONIDAS --------------------
export const leonidas: Spartan = {
  id: 'leonidas',
  name: 'Leonidas',
  title: 'King of Sparta',
  description: 'The legendary warrior-king who held Thermopylae. He seeks cards that embody pure martial prowess.',
  portrait: '👑',
  commissions: [
    {
      tier: 1,
      requirement: {
        type: 'cardType',
        cardType: CardType.Attack,
        count: 3,
        minRarity: Rarity.Common,
      },
      reward: {
        type: 'blessing',
        blessing: {
          id: 'leonidas-strength-1',
          name: "Leonidas' Strength",
          description: 'Start each combat with +1 Strength',
          effect: { type: 'startCombatBuff', statusEffect: 'strength', value: 1 },
        },
      },
      description: 'Trade 3 Attack cards for a blessing of strength',
    },
    {
      tier: 2,
      requirement: {
        type: 'cardType',
        cardType: CardType.Attack,
        count: 5,
        minRarity: Rarity.Uncommon,
      },
      reward: {
        type: 'technique',
        cards: [
          {
            id: 'spartan-phalanx',
            name: 'Spartan Phalanx',
            type: CardType.Attack,
            rarity: Rarity.Rare,
            energyCost: 2,
            description: 'Deal 15 damage. Gain 10 Block.',
            effects: [
              { type: EffectType.Damage, value: 15, target: 'enemy' },
              { type: EffectType.Block, value: 10 },
            ],
            tags: ['Strike', 'Spartan', 'Leonidas'],
            upgraded: false,
            upgradedVersion: {
              description: 'Deal 20 damage. Gain 14 Block.',
              effects: [
                { type: EffectType.Damage, value: 20, target: 'enemy' },
                { type: EffectType.Block, value: 14 },
              ],
            },
          },
        ],
      },
      description: 'Trade 5 Uncommon+ Attack cards for Spartan Phalanx technique',
    },
    {
      tier: 3,
      requirement: {
        type: 'cardType',
        cardType: CardType.Attack,
        count: 7,
        minRarity: Rarity.Rare,
      },
      reward: {
        type: 'blessing',
        blessing: {
          id: 'leonidas-wrath',
          name: "Leonidas' Wrath",
          description: 'Your attacks deal +3 damage',
          effect: { type: 'permanentBuff', damageBonus: 3 },
        },
      },
      description: 'Trade 7 Rare+ Attack cards for permanent +3 damage',
    },
  ],
};

// -------------------- ACHILLES --------------------
export const achilles: Spartan = {
  id: 'achilles',
  name: 'Achilles',
  title: 'Hero of Troy',
  description: 'The greatest warrior of the Greek world. He values aggressive, high-damage strategies.',
  portrait: '⚔️',
  commissions: [
    {
      tier: 1,
      requirement: {
        type: 'cardTags',
        tags: ['Strike'],
        count: 4,
      },
      reward: {
        type: 'blessing',
        blessing: {
          id: 'achilles-fury-1',
          name: "Achilles' Fury",
          description: 'Deal 3 damage to a random enemy at the start of your turn',
          effect: { type: 'startTurnDamage', value: 3 },
        },
      },
      description: 'Trade 4 Strike cards for passive damage',
    },
    {
      tier: 2,
      requirement: {
        type: 'cardType',
        cardType: CardType.Attack,
        count: 6,
        minRarity: Rarity.Uncommon,
      },
      reward: {
        type: 'technique',
        cards: [
          {
            id: 'achilles-rage',
            name: "Achilles' Rage",
            type: CardType.Attack,
            rarity: Rarity.Rare,
            energyCost: 1,
            description: 'Deal 8 damage. If this kills an enemy, gain 2 Energy and draw 2 cards.',
            effects: [
              { type: EffectType.Damage, value: 8, target: 'enemy' },
              { type: EffectType.GainEnergy, value: 2, condition: { type: 'kills' } },
              { type: EffectType.Draw, value: 2, condition: { type: 'kills' } },
            ],
            tags: ['Strike', 'Achilles'],
            upgraded: false,
            upgradedVersion: {
              description: 'Deal 12 damage. If this kills an enemy, gain 2 Energy and draw 2 cards.',
              effects: [
                { type: EffectType.Damage, value: 12, target: 'enemy' },
                { type: EffectType.GainEnergy, value: 2, condition: { type: 'kills' } },
                { type: EffectType.Draw, value: 2, condition: { type: 'kills' } },
              ],
            },
          },
        ],
      },
      description: 'Trade 6 Uncommon+ Attack cards for Achilles\' Rage technique',
    },
    {
      tier: 3,
      requirement: {
        type: 'cardType',
        cardType: CardType.Attack,
        count: 8,
        minRarity: Rarity.Rare,
      },
      reward: {
        type: 'blessing',
        blessing: {
          id: 'achilles-invulnerability',
          name: 'Invulnerability',
          description: 'Start each combat with 15 Block',
          effect: { type: 'startCombatBlock', value: 15 },
        },
      },
      description: 'Trade 8 Rare+ Attack cards for starting block',
    },
  ],
};

// -------------------- ARTEMISIA --------------------
export const artemisia: Spartan = {
  id: 'artemisia',
  name: 'Artemisia',
  title: 'Naval Commander',
  description: 'A brilliant tactician who values defensive strategies and careful planning.',
  portrait: '🛡️',
  commissions: [
    {
      tier: 1,
      requirement: {
        type: 'cardType',
        cardType: CardType.Defense,
        count: 4,
      },
      reward: {
        type: 'blessing',
        blessing: {
          id: 'artemisia-defense-1',
          name: "Artemisia's Defense",
          description: 'Start each combat with +2 Dexterity',
          effect: { type: 'startCombatBuff', statusEffect: 'dexterity', value: 2 },
        },
      },
      description: 'Trade 4 Defense cards for dexterity blessing',
    },
    {
      tier: 2,
      requirement: {
        type: 'cardType',
        cardType: CardType.Defense,
        count: 6,
        minRarity: Rarity.Uncommon,
      },
      reward: {
        type: 'technique',
        cards: [
          {
            id: 'tactical-retreat',
            name: 'Tactical Retreat',
            type: CardType.Defense,
            rarity: Rarity.Rare,
            energyCost: 1,
            description: 'Gain 12 Block. Draw 2 cards.',
            effects: [
              { type: EffectType.Block, value: 12 },
              { type: EffectType.Draw, value: 2 },
            ],
            tags: ['Block', 'Artemisia'],
            upgraded: false,
            upgradedVersion: {
              description: 'Gain 16 Block. Draw 3 cards.',
              effects: [
                { type: EffectType.Block, value: 16 },
                { type: EffectType.Draw, value: 3 },
              ],
            },
          },
        ],
      },
      description: 'Trade 6 Uncommon+ Defense cards for Tactical Retreat technique',
    },
    {
      tier: 3,
      requirement: {
        type: 'cardType',
        cardType: CardType.Defense,
        count: 8,
        minRarity: Rarity.Rare,
      },
      reward: {
        type: 'blessing',
        blessing: {
          id: 'artemisia-fortification',
          name: 'Fortification',
          description: 'Your Block cards give +2 additional Block',
          effect: { type: 'permanentBuff', blockBonus: 2 },
        },
      },
      description: 'Trade 8 Rare+ Defense cards for permanent +2 block',
    },
  ],
};

// -------------------- BRASIDAS --------------------
export const brasidas: Spartan = {
  id: 'brasidas',
  name: 'Brasidas',
  title: 'Master Strategist',
  description: 'A cunning general who appreciates the art of the forge and hybrid strategies.',
  portrait: '🔨',
  commissions: [
    {
      tier: 1,
      requirement: {
        type: 'cardType',
        cardType: CardType.Forge,
        count: 4,
      },
      reward: {
        type: 'blessing',
        blessing: {
          id: 'brasidas-efficiency-1',
          name: "Brasidas' Efficiency",
          description: 'Start each combat with +1 Energy',
          effect: { type: 'startCombatEnergy', value: 1 },
        },
      },
      description: 'Trade 4 Forge cards for bonus starting energy',
    },
    {
      tier: 2,
      requirement: {
        type: 'cardType',
        cardType: CardType.Forge,
        count: 6,
        minRarity: Rarity.Uncommon,
      },
      reward: {
        type: 'technique',
        cards: [
          {
            id: 'strategic-forge',
            name: 'Strategic Forge',
            type: CardType.Forge,
            rarity: Rarity.Rare,
            energyCost: 2,
            description: 'Draw 3 cards. Upgrade a random card in hand for this combat.',
            effects: [
              { type: EffectType.Draw, value: 3 },
              { type: EffectType.UpgradeCard },
            ],
            tags: ['Forge', 'Brasidas'],
            upgraded: false,
            upgradedVersion: {
              description: 'Draw 4 cards. Upgrade a random card in hand for this combat.',
              effects: [
                { type: EffectType.Draw, value: 4 },
                { type: EffectType.UpgradeCard },
              ],
            },
          },
        ],
      },
      description: 'Trade 6 Uncommon+ Forge cards for Strategic Forge technique',
    },
    {
      tier: 3,
      requirement: {
        type: 'cardType',
        cardType: CardType.Forge,
        count: 8,
        minRarity: Rarity.Rare,
      },
      reward: {
        type: 'blessing',
        blessing: {
          id: 'brasidas-mastery',
          name: 'Forge Mastery',
          description: 'Draw 1 additional card at the start of each turn',
          effect: { type: 'drawPerTurn', value: 1 },
        },
      },
      description: 'Trade 8 Rare+ Forge cards for extra card draw',
    },
  ],
};

// Export all Spartans
export const ALL_SPARTANS: Spartan[] = [
  leonidas,
  achilles,
  artemisia,
  brasidas,
];

// Helper function to get Spartan by ID
export function getSpartanById(id: string): Spartan | undefined {
  return ALL_SPARTANS.find(s => s.id === id);
}

// Helper function to check if player meets commission requirements
export function meetsCommissionRequirements(
  commission: SpartanCommission,
  playerDeck: any[]
): { meets: boolean; availableCards: any[] } {
  const req = commission.requirement;
  let availableCards: any[] = [];

  switch (req.type) {
    case 'cardType':
      availableCards = playerDeck.filter(card => {
        const typeMatches = card.type === req.cardType;
        const rarityMatches = !req.minRarity || 
          getRarityValue(card.rarity) >= getRarityValue(req.minRarity);
        return typeMatches && rarityMatches;
      });
      return {
        meets: availableCards.length >= (req.count || 0),
        availableCards,
      };

    case 'cardTags':
      availableCards = playerDeck.filter(card => {
        return req.tags?.some(tag => card.tags?.includes(tag));
      });
      return {
        meets: availableCards.length >= (req.count || 0),
        availableCards,
      };

    default:
      return { meets: false, availableCards: [] };
  }
}

function getRarityValue(rarity: string): number {
  const values: Record<string, number> = {
    common: 1,
    uncommon: 2,
    rare: 3,
    legendary: 4,
  };
  return values[rarity.toLowerCase()] || 0;
}
