import { StatusEffect, StatusEffectType, Enemy } from '../../types';

// Apply status effects to damage calculations
export function applyStatusEffectsToDamage(baseDamage: number, playerEffects: StatusEffect[]): number {
  let damage = baseDamage;
  
  // Apply Strength (increases damage)
  const strength = playerEffects.find(e => e.type === StatusEffectType.Strength);
  if (strength) {
    damage += strength.stacks;
  }
  
  // Apply Weak (reduces damage by 25%)
  const weak = playerEffects.find(e => e.type === StatusEffectType.Weak);
  if (weak) {
    damage = Math.floor(damage * 0.75);
  }
  
  return Math.max(0, damage);
}

// Apply status effects to block calculations
export function applyStatusEffectsToBlock(baseBlock: number, playerEffects: StatusEffect[]): number {
  let block = baseBlock;
  
  // Apply Dexterity (increases block)
  const dexterity = playerEffects.find(e => e.type === StatusEffectType.Dexterity);
  if (dexterity) {
    block += dexterity.stacks;
  }
  
  // Apply Frail (reduces block by 25%)
  const frail = playerEffects.find(e => e.type === StatusEffectType.Frail);
  if (frail) {
    block = Math.floor(block * 0.75);
  }
  
  return Math.max(0, block);
}

// Apply status effects at start of turn
export function applyStartOfTurnEffects(
  player: { hp: number; maxHp: number; statusEffects: StatusEffect[] },
  enemies: Enemy[]
): { playerDamage: number; updatedEnemies: Enemy[] } {
  let playerDamage = 0;
  
  // Apply Poison to player
  const poison = player.statusEffects.find(e => e.type === StatusEffectType.Poison);
  if (poison) {
    playerDamage += poison.stacks;
  }
  
  // Apply Regeneration to player (handled separately as healing)
  
  // Apply status effects to enemies
  const updatedEnemies = enemies.map(enemy => {
    let newHp = enemy.hp;
    
    // Apply Poison
    const enemyPoison = enemy.statusEffects.find(e => e.type === StatusEffectType.Poison);
    if (enemyPoison) {
      newHp -= enemyPoison.stacks;
    }
    
    // Apply Burn
    const burn = enemy.statusEffects.find(e => e.type === StatusEffectType.Burn);
    if (burn) {
      newHp -= burn.stacks;
    }
    
    return { ...enemy, hp: Math.max(0, newHp) };
  });
  
  return { playerDamage, updatedEnemies };
}

// Apply status effects at end of turn (reduce durations)
export function reduceStatusEffectDurations(effects: StatusEffect[]): StatusEffect[] {
  return effects
    .map(effect => {
      if (effect.duration !== undefined) {
        return { ...effect, duration: effect.duration - 1 };
      }
      return effect;
    })
    .filter(effect => effect.duration === undefined || effect.duration > 0);
}

// Add or update a status effect
export function addStatusEffect(
  effects: StatusEffect[],
  type: StatusEffectType,
  stacks: number,
  duration?: number
): StatusEffect[] {
  const existing = effects.find(e => e.type === type);
  
  if (existing) {
    // Update existing effect
    return effects.map(e => {
      if (e.type === type) {
        return {
          ...e,
          stacks: e.stacks + stacks,
          duration: duration !== undefined ? Math.max(e.duration || 0, duration) : e.duration,
        };
      }
      return e;
    });
  } else {
    // Add new effect
    return [...effects, { type, stacks, duration }];
  }
}

// Apply damage to enemy with armor consideration
export function applyDamageToEnemy(
  enemy: Enemy,
  damage: number,
  playerEffects: StatusEffect[]
): { newHp: number; newBlock: number; actualDamage: number } {
  let actualDamage = applyStatusEffectsToDamage(damage, playerEffects);
  
  // Apply Vulnerable (enemy takes 50% more damage)
  const vulnerable = enemy.statusEffects.find(e => e.type === StatusEffectType.Vulnerable);
  if (vulnerable) {
    actualDamage = Math.floor(actualDamage * 1.5);
  }
  
  let newBlock = enemy.block;
  let remainingDamage = actualDamage;
  
  // Block absorbs damage first
  if (newBlock > 0) {
    const blocked = Math.min(newBlock, remainingDamage);
    newBlock -= blocked;
    remainingDamage -= blocked;
  }
  
  const newHp = Math.max(0, enemy.hp - remainingDamage);
  
  return { newHp, newBlock, actualDamage };
}

// Calculate enemy damage with status effects
export function calculateEnemyDamage(baseDamage: number, enemyEffects: StatusEffect[]): number {
  let damage = baseDamage;
  
  // Apply Strength
  const strength = enemyEffects.find(e => e.type === StatusEffectType.Strength);
  if (strength) {
    damage += strength.stacks;
  }
  
  // Apply Weak
  const weak = enemyEffects.find(e => e.type === StatusEffectType.Weak);
  if (weak) {
    damage = Math.floor(damage * 0.75);
  }
  
  return Math.max(0, damage);
}
