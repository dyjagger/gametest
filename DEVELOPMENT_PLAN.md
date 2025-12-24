# FORGE OF THE FALLEN - Development Plan

## Current Status Assessment

### ✅ Completed Features
- **Core Combat System**: Basic combat loop with turn-based gameplay
- **Card System**: Card playing, energy management, hand/draw/discard/exhaust piles
- **Enemy System**: Enemy display with intents, HP, block, and status effects
- **Map System**: Node-based map with different encounter types
- **UI Components**: Resource bar, card display, enemy display, forge display
- **Pile Viewer**: Modal to view draw/discard/exhaust piles (just added)
- **Enemy Intent Tooltips**: Hover tooltips explaining what enemies will do (just added)
- **Map Path Visualization**: Lines showing traveled path from top to bottom (just added)

### 🚧 Partially Implemented
- **Card Library**: Basic starter deck exists, need full 120+ card library
- **Enemy Roster**: Basic enemies exist, need full 36+ enemy roster with all bosses
- **Status Effects**: System exists but needs full implementation of all effects
- **Artifacts**: System structure exists but needs full artifact library (70+)

### ❌ Not Yet Implemented
- **Spartan Request System**: Core unique mechanic - 12 Spartans with 36 commissions
- **Blessing System**: Permanent buffs from Spartan trades
- **Shop System**: Buy cards, artifacts, remove cards
- **Rest Sites**: Heal or upgrade cards
- **Event System**: Mystery nodes with choices
- **Forge Upgrade Stations**: Spend Adamant Shards for upgrades
- **Shrine System**: Divine blessings and sacrifices
- **Reward Screen**: Post-combat card/artifact selection
- **Meta Progression**: Unlocks between runs
- **Ascension Mode**: Difficulty modifiers
- **Save/Load System**: Persistent game state
- **Audio System**: Music and sound effects
- **Animations**: Card play animations, damage numbers, etc.
- **Tutorial System**: First-time player guidance

---

## Development Roadmap (Prioritized)

### 🎯 PHASE 1: Complete Core Gameplay Loop (4-6 weeks)

#### Week 1-2: Card Library & Balance
**Priority: CRITICAL**
- [ ] Implement all Common Attack cards (10 cards from concept doc)
- [ ] Implement all Common Defense cards (8 cards from concept doc)
- [ ] Implement all Common Forge cards (10 cards from concept doc)
- [ ] Implement Uncommon cards (20 cards - focus on most interesting)
- [ ] Implement at least 5 Rare cards for variety
- [ ] Add 2-3 Legendary cards for excitement
- [ ] **Total Target: 50+ playable cards**
- [ ] Balance testing: energy costs, damage values, block values

**Why Critical**: Players need variety to build interesting decks. Current starter deck gets repetitive quickly.

#### Week 3: Enemy Roster Expansion
**Priority: HIGH**
- [ ] Implement all Act 1 basic enemies (5 enemies from concept doc)
- [ ] Implement Act 1 elite enemies (3 enemies)
- [ ] Implement Act 1 boss: Moloch's Wrath with phase system
- [ ] Add enemy AI patterns (intents cycling correctly)
- [ ] Add enemy abilities (passive effects, triggers)
- [ ] Test difficulty curve for Act 1

**Why High**: Need full Act 1 to be playable end-to-end for testing.

#### Week 4: Reward System
**Priority: CRITICAL**
- [ ] Create Reward Screen UI
- [ ] Implement card reward selection (3 choices)
- [ ] Implement Divine Favor rewards
- [ ] Implement Adamant Shard drops (25% elite, 100% boss)
- [ ] Add "Skip Reward" option
- [ ] Connect rewards to combat victory

**Why Critical**: Without rewards, players can't improve their deck or progress.

#### Week 5: Artifact System
**Priority: HIGH**
- [ ] Implement 10 Common artifacts
- [ ] Implement 10 Uncommon artifacts
- [ ] Implement 5 Rare artifacts
- [ ] Add artifact triggers (onCombatStart, onTurnStart, etc.)
- [ ] Add artifact display in UI
- [ ] Test artifact effects and balance

**Why High**: Artifacts provide run variety and power progression.

#### Week 6: Shop & Rest Sites
**Priority: MEDIUM**
- [ ] Create Shop UI
- [ ] Implement card purchasing (50-100 Favor)
- [ ] Implement artifact purchasing (150-300 Favor)
- [ ] Implement card removal (75 Favor)
- [ ] Create Rest Site UI
- [ ] Implement Heal option (30% max HP)
- [ ] Implement Upgrade option (upgrade 1 card permanently)

**Why Medium**: Important for deck management but not blocking core loop.

---

### 🎯 PHASE 2: Unique Mechanics (4-6 weeks)

#### Week 7-8: Spartan Request System (THE BIG ONE)
**Priority: CRITICAL - THIS IS YOUR UNIQUE SELLING POINT**

**Week 7: Foundation**
- [ ] Create Spartan data structure (12 Spartans from concept doc)
- [ ] Create Commission requirement system
- [ ] Create Blessing system (permanent buffs)
- [ ] Create Technique system (add cards to deck)
- [ ] Build Spartan Trade UI
  - [ ] Spartan portrait and dialogue
  - [ ] Commission requirements display
  - [ ] Deck viewer with card selection
  - [ ] Reward preview
  - [ ] Confirm/Decline buttons

**Week 8: Implementation**
- [ ] Implement Leonidas (Tier 1-3 commissions)
- [ ] Implement Achilles (Tier 1-3 commissions)
- [ ] Implement Artemisia (Tier 1-3 commissions)
- [ ] Implement Brasidas (Tier 1-3 commissions)
- [ ] Add Spartan visit logic (50% chance at rest sites)
- [ ] Add tier progression tracking
- [ ] Test trade balance (is it worth giving up cards?)

**Remaining 8 Spartans**: Implement in Phase 3

**Why Critical**: This is what makes your game unique. Without this, it's just another Slay the Spire clone.

#### Week 9: Status Effects & Combat Polish
**Priority: HIGH**
- [ ] Implement all buff effects (Strength, Dexterity, Vigor, etc.)
- [ ] Implement all debuff effects (Vulnerable, Weak, Burn, etc.)
- [ ] Add status effect icons and tooltips
- [ ] Add damage number animations
- [ ] Add screen shake on hits
- [ ] Polish combat flow and timing

#### Week 10: Event System
**Priority: MEDIUM**
- [ ] Create Event UI
- [ ] Implement 5-10 events from concept doc
  - [ ] The Cursed Anvil
  - [ ] The Wounded Spartan
  - [ ] The Demon Merchant
  - [ ] The Sacred Spring
  - [ ] The Oracle's Vision
- [ ] Add event outcomes and effects
- [ ] Connect events to mystery nodes

---

### 🎯 PHASE 3: Content Expansion (4-6 weeks)

#### Week 11-12: Acts 2-4 Enemies
**Priority: HIGH**
- [ ] Act 2 enemies (5 basic, 3 elite, 1 boss: Pyros)
- [ ] Act 3 enemies (5 basic, 3 elite, 1 boss: Khione)
- [ ] Act 4 enemies (5 basic, 3 elite, 1 boss: Moloch)
- [ ] Boss phase transitions
- [ ] Boss special mechanics
- [ ] Balance difficulty curve across acts

#### Week 13: Remaining Spartans
**Priority: MEDIUM**
- [ ] Implement Dienekes (Tier 1-3)
- [ ] Implement Gorgo (Tier 1-3)
- [ ] Implement Aristodemus (Tier 1-3)
- [ ] Implement Eurytus (Tier 1-3)
- [ ] Implement Pantites (Tier 1-3)
- [ ] Implement Dieneces II (Tier 1-3)
- [ ] Implement Alpheus (Tier 1-3)
- [ ] Implement Megistias (Tier 1-3)

#### Week 14: Remaining Cards & Artifacts
**Priority: MEDIUM**
- [ ] Complete card library to 120+ cards
- [ ] Complete artifact library to 70+ artifacts
- [ ] Add all Legendary cards
- [ ] Add curse cards
- [ ] Balance pass on all cards

#### Week 15-16: Polish & Special Systems
**Priority: LOW**
- [ ] Forge Upgrade Stations (spend Adamant Shards)
- [ ] Shrine system (sacrifices and blessings)
- [ ] Battlefront path selection (after Act bosses)
- [ ] Victory/Defeat screens
- [ ] Game over handling

---

### 🎯 PHASE 4: Meta Progression & Replayability (3-4 weeks)

#### Week 17: Save System & Meta Progression
**Priority: HIGH**
- [ ] Implement save/load system
- [ ] Add unlock system (cards, artifacts, Spartans)
- [ ] Add progression tracking (runs completed, wins, etc.)
- [ ] Add statistics tracking
- [ ] Implement Act completion unlocks

#### Week 18: Ascension Mode
**Priority: MEDIUM**
- [ ] Implement Ascension levels 1-10
- [ ] Add difficulty modifiers
- [ ] Add Ascension selection UI
- [ ] Balance Ascension difficulty

#### Week 19: Quality of Life
**Priority: MEDIUM**
- [ ] Add settings menu (volume, animation speed, etc.)
- [ ] Add deck viewer (view full deck anytime)
- [ ] Add run statistics screen
- [ ] Add card/artifact collection viewer
- [ ] Add undo button (once per turn)
- [ ] Add fast mode (speed up animations)

#### Week 20: Audio & Visual Polish
**Priority: LOW**
- [ ] Add background music (menu, combat, boss)
- [ ] Add sound effects (card play, attacks, etc.)
- [ ] Add particle effects (fire, sparks, divine light)
- [ ] Polish animations
- [ ] Add screen transitions

---

## 🎮 IMMEDIATE NEXT STEPS (This Week)

Based on the concept doc and current state, here's what to focus on RIGHT NOW:

### 1. **Expand Card Library** (Days 1-3)
Start with these high-impact cards:
- **Molten Strike** (Uncommon Attack): 2 energy, 13 damage, apply 2 Burn
- **Execute** (Uncommon Attack): 2 energy, 18 damage only to enemies below 50% HP
- **Fortress** (Uncommon Defense): 2 energy, 12 block that doesn't decay
- **Master Craft** (Uncommon Forge): 2 energy, upgrade all attacks in hand for this combat
- **Olympian Wrath** (Rare Attack): 3 energy, 18 damage, if lethal draw 3 and gain 2 energy

**Why**: These add interesting decisions and combos to gameplay immediately.

### 2. **Complete Act 1 Enemy Roster** (Days 4-5)
- Add Hell Hound, Tormented Soul, Flame Sprite, Bone Warrior
- Add Forge Breaker, Weapon Eater, Corrupted Hoplite (elites)
- Implement Moloch's Wrath boss with 2 phases

**Why**: Need full Act 1 to test complete run experience.

### 3. **Implement Reward Screen** (Days 6-7)
- Card selection UI
- Divine Favor rewards
- Adamant Shard drops
- Connect to combat victory

**Why**: Without this, players can't progress or improve their deck.

---

## 🎯 SUCCESS METRICS

### Phase 1 Complete When:
- ✅ Can play through full Act 1 (15 nodes + boss)
- ✅ 50+ cards available
- ✅ Rewards working (cards, favor, shards)
- ✅ Shop and rest sites functional
- ✅ 20+ artifacts available
- ✅ Run takes 20-30 minutes

### Phase 2 Complete When:
- ✅ Spartan system fully functional (at least 4 Spartans)
- ✅ Can trade cards for blessings
- ✅ Status effects all working
- ✅ Events add variety
- ✅ Combat feels polished

### Phase 3 Complete When:
- ✅ All 4 Acts playable
- ✅ All 12 Spartans implemented
- ✅ 120+ cards available
- ✅ 70+ artifacts available
- ✅ Full run takes 45-90 minutes
- ✅ Multiple viable strategies exist

### Phase 4 Complete When:
- ✅ Meta progression working
- ✅ Unlocks provide long-term goals
- ✅ Ascension mode adds challenge
- ✅ Game is polished and bug-free
- ✅ Ready for public beta testing

---

## 🚨 CRITICAL PATH DEPENDENCIES

```
Card Library (50+) ──┐
                     ├──> Reward Screen ──> Full Act 1 Playthrough
Enemy Roster (Act 1) ┘

Full Act 1 ──> Spartan System ──> Acts 2-4 ──> Meta Progression ──> Beta Release
```

**DO NOT** work on Acts 2-4 until Act 1 is fully playable and balanced.
**DO NOT** work on meta progression until core gameplay loop is fun.
**DO NOT** work on polish until all core systems are implemented.

---

## 📊 ESTIMATED TIMELINE

- **Phase 1**: 6 weeks (Core Loop)
- **Phase 2**: 6 weeks (Unique Mechanics)
- **Phase 3**: 6 weeks (Content Expansion)
- **Phase 4**: 4 weeks (Meta & Polish)

**Total: 22 weeks (~5.5 months) to Beta Release**

Add 4-8 weeks for Steam port = **6-7.5 months to Steam Launch**

---

## 🎨 DESIGN PRIORITIES

1. **Make Spartan trades feel meaningful** - This is your unique mechanic
2. **Ensure multiple viable strategies** - Aggro, control, forge-focused
3. **Balance risk/reward** - Elite paths should be tempting but dangerous
4. **Keep runs 45-90 minutes** - Respect player time
5. **Make every decision matter** - No autopilot gameplay

---

## 🐛 KNOWN ISSUES TO FIX

- [ ] Map path lines may not calculate positions perfectly (needs testing)
- [ ] Pile viewer needs better card layout for large piles
- [ ] Enemy intent tooltips need better positioning on screen edges
- [ ] Need to implement card upgrade system (currently just flag)
- [ ] Need to implement status effect duration tracking
- [ ] Need to implement enemy pattern cycling
- [ ] Need to implement block decay at end of turn

---

## 📝 NOTES

- Focus on **Act 1 completeness** before expanding to other acts
- The **Spartan system** is what makes this game unique - prioritize it
- Don't get distracted by polish until core systems work
- Test balance frequently - card games live or die by balance
- Get external playtesters as soon as Act 1 is complete

---

**Last Updated**: December 23, 2024
**Current Phase**: Phase 1 - Core Gameplay Loop
**Next Milestone**: 50+ Card Library + Full Act 1 Enemy Roster
