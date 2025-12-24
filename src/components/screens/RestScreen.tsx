import { motion } from 'framer-motion';
import { useState } from 'react';
import { useGameStore } from '../../engine/state/game-store';
import { GAME_CONSTANTS, GamePhase, CardInstance } from '../../types';
import { CardDisplay } from '../cards/CardDisplay';
import { CardUpgradePreview } from '../cards/CardUpgradePreview';

export function RestScreen() {
  const player = useGameStore((state) => state.run?.player);
  const healPlayer = useGameStore((state) => state.healPlayer);
  const upgradeCard = useGameStore((state) => state.upgradeCard);
  const setGamePhase = useGameStore((state) => state.setGamePhase);
  
  const [mode, setMode] = useState<'choose' | 'heal' | 'upgrade' | 'done'>('choose');
  const [selectedCard, setSelectedCard] = useState<CardInstance | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [hasUpgraded, setHasUpgraded] = useState(false);

  if (!player) return null;

  const healAmount = Math.floor(player.maxHp * GAME_CONSTANTS.HEAL_PERCENT_AT_REST);
  const canHeal = player.hp < player.maxHp;
  const upgradeableCards = player.deck.filter(c => !c.upgraded && c.upgradedVersion);

  const handleChooseHeal = () => {
    if (canHeal) {
      healPlayer(healAmount);
    }
    setMode('done');
  };

  const handleChooseUpgrade = () => {
    if (upgradeableCards.length === 0 || hasUpgraded) return;
    setMode('upgrade');
  };

  const handleShowPreview = () => {
    if (!selectedCard) return;
    setShowPreview(true);
  };

  const handleConfirmUpgrade = () => {
    if (!selectedCard || hasUpgraded) return;
    upgradeCard(selectedCard.instanceId);
    setHasUpgraded(true);
    setShowPreview(false);
    setMode('done');
  };

  const handleContinue = () => {
    setGamePhase(GamePhase.Map);
  };

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-b from-hell-obsidian via-green-900/20 to-hell-obsidian">
      {/* Header */}
      <div className="text-center py-6">
        <h1 className="font-greek text-4xl text-divine-gold">Rest Site</h1>
        <p className="text-spartan-marble mt-2">A moment of respite in the darkness...</p>
      </div>

      {/* Current HP */}
      <div className="text-center mb-4">
        <span className="text-spartan-bronze">Forge Integrity: </span>
        <span className="text-white text-xl">{player.hp}/{player.maxHp}</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-8">
        {mode === 'choose' && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-8xl mb-8">🔥</div>
            
            <div className="flex gap-6 justify-center">
              <motion.button
                onClick={handleChooseHeal}
                disabled={!canHeal}
                className={`bg-hell-obsidian/80 border-2 border-green-500 rounded-lg p-8 min-w-[250px] ${
                  !canHeal ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-900/30 cursor-pointer'
                }`}
                whileHover={canHeal ? { scale: 1.05 } : {}}
                whileTap={canHeal ? { scale: 0.95 } : {}}
              >
                <div className="text-6xl mb-4">💚</div>
                <div className="text-2xl font-greek text-green-400 mb-2">Rest</div>
                <div className="text-spartan-marble">
                  Heal {healAmount} HP
                </div>
                <div className="text-spartan-bronze text-sm">
                  ({Math.round(GAME_CONSTANTS.HEAL_PERCENT_AT_REST * 100)}% of max HP)
                </div>
              </motion.button>

              <motion.button
                onClick={handleChooseUpgrade}
                disabled={upgradeableCards.length === 0 || hasUpgraded}
                className={`bg-hell-obsidian/80 border-2 border-card-forge rounded-lg p-8 min-w-[250px] ${
                  upgradeableCards.length === 0 || hasUpgraded ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-900/30 cursor-pointer'
                }`}
                whileHover={upgradeableCards.length > 0 && !hasUpgraded ? { scale: 1.05 } : {}}
                whileTap={upgradeableCards.length > 0 && !hasUpgraded ? { scale: 0.95 } : {}}
              >
                <div className="text-6xl mb-4">🔨</div>
                <div className="text-2xl font-greek text-card-forge mb-2">Forge Upgrade</div>
                <div className="text-spartan-marble">
                  Upgrade 1 card permanently
                </div>
                <div className="text-spartan-bronze text-sm">
                  ({upgradeableCards.length} cards available)
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}

        {mode === 'upgrade' && (
          <motion.div
            className="w-full max-w-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-greek text-divine-gold text-center mb-6">
              Choose a card to upgrade
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-h-[60vh] overflow-y-auto p-4">
              {upgradeableCards.map((card) => (
                <div
                  key={card.instanceId}
                  className={`cursor-pointer transition-transform ${
                    selectedCard?.instanceId === card.instanceId
                      ? 'ring-4 ring-divine-gold scale-105'
                      : 'hover:scale-105'
                  }`}
                  onClick={() => setSelectedCard(card)}
                >
                  <CardDisplay card={card} disabled={false} />
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center mt-6">
              <button
                onClick={handleShowPreview}
                disabled={!selectedCard}
                className="btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Preview Upgrade
              </button>
              <button
                onClick={() => setMode('choose')}
                className="px-8 py-2 bg-hell-red/50 text-white rounded hover:bg-hell-red transition-colors"
              >
                Back
              </button>
            </div>
          </motion.div>
        )}

        {mode === 'done' && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-greek text-divine-gold mb-4">Rest Complete</h2>
            <p className="text-spartan-marble mb-8">The forge is ready to continue.</p>
            
            <motion.button
              onClick={handleContinue}
              className="btn-primary px-12 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Upgrade Preview Modal */}
      {showPreview && selectedCard && (
        <CardUpgradePreview
          card={selectedCard}
          onConfirm={handleConfirmUpgrade}
          onCancel={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}
