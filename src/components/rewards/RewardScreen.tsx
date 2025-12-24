import { motion } from 'framer-motion';
import { useState } from 'react';
import { useGameStore } from '../../engine/state/game-store';
import { CardDisplay } from '../cards/CardDisplay';
import { getRandomCards } from '../../data/cards/card-library';
import { CardInstance, Rarity, GamePhase } from '../../types';
import { v4 as uuidv4 } from 'uuid';

export function RewardScreen() {
  const addCardToDeck = useGameStore((state) => state.addCardToDeck);
  const addDivineFavor = useGameStore((state) => state.addDivineFavor);
  const addAdamantShards = useGameStore((state) => state.addAdamantShards);
  const setGamePhase = useGameStore((state) => state.setGamePhase);
  const lastCombat = useGameStore((state) => state.run?.combat);
  
  const [cardRewards] = useState(() => {
    // Better rewards for elite combats
    const wasElite = lastCombat?.enemies.some(e => e.isElite) || false;
    
    let cards;
    if (wasElite) {
      // Elite: 1 Rare, 2 Uncommon
      const rare = getRandomCards(1, Rarity.Rare);
      const uncommon = getRandomCards(2, Rarity.Uncommon);
      cards = [...rare, ...uncommon];
    } else {
      // Normal: 2 Common, 1 Uncommon
      const common = getRandomCards(2, Rarity.Common);
      const uncommon = getRandomCards(1, Rarity.Uncommon);
      cards = [...common, ...uncommon];
    }
    
    return cards.map(card => ({
      ...card,
      instanceId: uuidv4(),
    } as CardInstance));
  });
  
  const [selectedCard, setSelectedCard] = useState<CardInstance | null>(null);
  const [rewardsClaimed, setRewardsClaimed] = useState({
    card: false,
    favor: false,
    shards: false,
  });

  // Calculate rewards based on last combat
  const divineFavorReward = 15; // Base reward
  const adamantShardReward = Math.random() < 0.05 ? 1 : 0; // 5% chance

  const handleCardSelect = (card: CardInstance) => {
    if (rewardsClaimed.card) return;
    setSelectedCard(card);
  };

  const handleConfirmCard = () => {
    if (!selectedCard || rewardsClaimed.card) return;
    addCardToDeck(selectedCard);
    setRewardsClaimed({ ...rewardsClaimed, card: true });
  };

  const handleSkipCard = () => {
    setRewardsClaimed({ ...rewardsClaimed, card: true });
  };

  const handleClaimFavor = () => {
    if (rewardsClaimed.favor) return;
    addDivineFavor(divineFavorReward);
    setRewardsClaimed({ ...rewardsClaimed, favor: true });
  };

  const handleClaimShards = () => {
    if (rewardsClaimed.shards || adamantShardReward === 0) return;
    addAdamantShards(adamantShardReward);
    setRewardsClaimed({ ...rewardsClaimed, shards: true });
  };

  const handleContinue = () => {
    // Auto-claim any unclaimed rewards
    if (!rewardsClaimed.favor) {
      addDivineFavor(divineFavorReward);
    }
    if (!rewardsClaimed.shards && adamantShardReward > 0) {
      addAdamantShards(adamantShardReward);
    }
    
    setGamePhase(GamePhase.Map);
  };

  const allRewardsClaimed = rewardsClaimed.card && rewardsClaimed.favor && 
    (adamantShardReward === 0 || rewardsClaimed.shards);

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-b from-hell-obsidian via-divine-gold/10 to-hell-obsidian">
      {/* Header */}
      <div className="text-center py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-greek text-4xl text-divine-gold"
        >
          Victory!
        </motion.h1>
        <p className="text-spartan-marble text-lg mt-2">
          The forge stands strong. Claim your rewards.
        </p>
      </div>

      {/* Rewards Container */}
      <div className="flex-1 overflow-y-auto px-8 py-4">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Card Rewards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-hell-obsidian/80 border-2 border-spartan-bronze rounded-lg p-6"
          >
            <h2 className="font-greek text-2xl text-divine-gold mb-4">
              Choose a Card Reward
            </h2>
            
            {!rewardsClaimed.card ? (
              <>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {cardRewards.map((card) => (
                    <div
                      key={card.instanceId}
                      className={`cursor-pointer transition-transform ${
                        selectedCard?.instanceId === card.instanceId
                          ? 'ring-4 ring-divine-gold scale-105'
                          : 'hover:scale-105'
                      }`}
                      onClick={() => handleCardSelect(card)}
                    >
                      <CardDisplay card={card} disabled={false} />
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleConfirmCard}
                    disabled={!selectedCard}
                    className="btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add to Deck
                  </button>
                  <button
                    onClick={handleSkipCard}
                    className="px-8 py-2 bg-hell-red/50 text-white rounded hover:bg-hell-red transition-colors"
                  >
                    Skip
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center text-spartan-marble py-8">
                ✓ Card reward claimed
              </div>
            )}
          </motion.div>

          {/* Divine Favor Reward */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-hell-obsidian/80 border-2 border-spartan-bronze rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-greek text-2xl text-divine-gold mb-2">
                  Divine Favor
                </h2>
                <p className="text-spartan-marble">
                  Earn {divineFavorReward} Divine Favor for your victory
                </p>
              </div>
              
              {!rewardsClaimed.favor ? (
                <button
                  onClick={handleClaimFavor}
                  className="btn-primary px-8"
                >
                  Claim 💰 {divineFavorReward}
                </button>
              ) : (
                <div className="text-divine-gold text-2xl">✓</div>
              )}
            </div>
          </motion.div>

          {/* Adamant Shard Reward (if available) */}
          {adamantShardReward > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-hell-obsidian/80 border-2 border-divine-gold rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-greek text-2xl text-divine-gold mb-2">
                    Adamant Shard!
                  </h2>
                  <p className="text-spartan-marble">
                    A rare shard of divine metal
                  </p>
                </div>
                
                {!rewardsClaimed.shards ? (
                  <button
                    onClick={handleClaimShards}
                    className="btn-primary px-8 bg-divine-gold/20 border-divine-gold"
                  >
                    Claim 💎 {adamantShardReward}
                  </button>
                ) : (
                  <div className="text-divine-gold text-2xl">✓</div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Continue Button */}
      <div className="p-6 bg-hell-obsidian/90 border-t border-spartan-bronze/30">
        <div className="max-w-6xl mx-auto flex justify-center">
          <motion.button
            onClick={handleContinue}
            className={`btn-primary px-12 text-xl ${
              !allRewardsClaimed ? 'animate-pulse' : ''
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {allRewardsClaimed ? 'Continue to Map' : 'Continue (Auto-claim remaining)'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
