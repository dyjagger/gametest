import { motion } from 'framer-motion';
import { useState } from 'react';
import { useGameStore } from '../../engine/state/game-store';
import { GamePhase, CardInstance, Spartan, SpartanCommission } from '../../types';
import { CardDisplay } from '../cards/CardDisplay';
import { ALL_SPARTANS, meetsCommissionRequirements } from '../../data/spartans/spartan-definitions';

export function SpartanTradeScreen() {
  const player = useGameStore((state) => state.run?.player);
  const setGamePhase = useGameStore((state) => state.setGamePhase);
  const removeCardFromDeck = useGameStore((state) => state.removeCardFromDeck);
  const addCardToDeck = useGameStore((state) => state.addCardToDeck);
  const addBlessing = useGameStore((state) => state.addBlessing);

  const [selectedSpartan, setSelectedSpartan] = useState<Spartan | null>(null);
  const [selectedCommission, setSelectedCommission] = useState<SpartanCommission | null>(null);
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());
  const [completedCommissions, setCompletedCommissions] = useState<Set<string>>(new Set());

  if (!player) return null;

  const handleSelectSpartan = (spartan: Spartan) => {
    setSelectedSpartan(spartan);
    setSelectedCommission(null);
    setSelectedCards(new Set());
  };

  const handleSelectCommission = (commission: SpartanCommission) => {
    setSelectedCommission(commission);
    setSelectedCards(new Set());
  };

  const handleToggleCard = (cardId: string) => {
    const newSelected = new Set(selectedCards);
    if (newSelected.has(cardId)) {
      newSelected.delete(cardId);
    } else {
      newSelected.add(cardId);
    }
    setSelectedCards(newSelected);
  };

  const handleCompleteCommission = () => {
    if (!selectedCommission || !selectedSpartan) return;

    const requiredCount = selectedCommission.requirement.count || 0;
    if (selectedCards.size !== requiredCount) return;

    // Remove selected cards from deck
    selectedCards.forEach(cardId => {
      removeCardFromDeck(cardId);
    });

    // Add reward based on type
    if (selectedCommission.reward.type === 'blessing' && selectedCommission.reward.blessing) {
      addBlessing(selectedCommission.reward.blessing);
    } else if (selectedCommission.reward.type === 'technique' && selectedCommission.reward.cards) {
      selectedCommission.reward.cards.forEach(card => {
        addCardToDeck({
          ...card,
          instanceId: crypto.randomUUID(),
        } as CardInstance);
      });
    }

    // Mark commission as completed
    const commissionKey = `${selectedSpartan.id}-tier${selectedCommission.tier}`;
    setCompletedCommissions(new Set(completedCommissions).add(commissionKey));

    // Reset selection
    setSelectedCards(new Set());
    setSelectedCommission(null);
  };

  const handleLeave = () => {
    setGamePhase(GamePhase.Map);
  };

  const getAvailableCards = () => {
    if (!selectedCommission) return [];
    const result = meetsCommissionRequirements(selectedCommission, player.deck);
    return result.availableCards;
  };

  const availableCards = getAvailableCards();
  const canComplete = selectedCommission && 
    selectedCards.size === (selectedCommission.requirement.count || 0);

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-b from-hell-obsidian via-spartan-bronze/10 to-hell-obsidian">
      {/* Header */}
      <div className="text-center py-4">
        <h1 className="font-greek text-4xl text-divine-gold">Hall of Heroes</h1>
        <p className="text-spartan-marble mt-2">
          Trade cards with legendary Spartans for powerful blessings and techniques
        </p>
      </div>

      {/* Resources */}
      <div className="flex justify-center gap-8 mb-4">
        <div className="text-center">
          <span className="text-divine-gold text-2xl">💰</span>
          <span className="text-white text-xl ml-2">{player.divineFavor}</span>
          <span className="text-spartan-bronze text-sm ml-1">Divine Favor</span>
        </div>
        <div className="text-center">
          <span className="text-divine-gold text-2xl">💎</span>
          <span className="text-white text-xl ml-2">{player.adamantShards}</span>
          <span className="text-spartan-bronze text-sm ml-1">Adamant Shards</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex gap-4 px-4">
        {/* Spartan Selection */}
        <div className="w-64 flex flex-col gap-2 overflow-y-auto">
          <h2 className="font-greek text-xl text-divine-gold mb-2">Spartans</h2>
          {ALL_SPARTANS.map((spartan) => (
            <motion.button
              key={spartan.id}
              onClick={() => handleSelectSpartan(spartan)}
              className={`p-4 rounded-lg border-2 text-left transition-colors ${
                selectedSpartan?.id === spartan.id
                  ? 'bg-spartan-bronze/30 border-spartan-bronze'
                  : 'bg-hell-obsidian/80 border-spartan-bronze/50 hover:border-spartan-bronze'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-4xl mb-2">{spartan.portrait}</div>
              <div className="font-greek text-lg text-divine-gold">{spartan.name}</div>
              <div className="text-xs text-spartan-bronze">{spartan.title}</div>
            </motion.button>
          ))}
        </div>

        {/* Commission Details */}
        {selectedSpartan && (
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
            {/* Spartan Info */}
            <div className="bg-hell-obsidian/80 border-2 border-spartan-bronze rounded-lg p-4">
              <div className="flex items-center gap-4 mb-2">
                <div className="text-6xl">{selectedSpartan.portrait}</div>
                <div>
                  <h2 className="font-greek text-2xl text-divine-gold">{selectedSpartan.name}</h2>
                  <p className="text-spartan-bronze">{selectedSpartan.title}</p>
                </div>
              </div>
              <p className="text-spartan-marble text-sm">{selectedSpartan.description}</p>
            </div>

            {/* Commissions */}
            <div className="grid grid-cols-1 gap-3">
              {Array.isArray(selectedSpartan.commissions) && selectedSpartan.commissions.map((commission) => {
                const commissionKey = `${selectedSpartan.id}-tier${commission.tier}`;
                const isCompleted = completedCommissions.has(commissionKey);
                const result = meetsCommissionRequirements(commission, player.deck);
                const canAfford = result.meets;

                return (
                  <motion.button
                    key={commissionKey}
                    onClick={() => !isCompleted && handleSelectCommission(commission)}
                    disabled={isCompleted}
                    className={`p-4 rounded-lg border-2 text-left transition-colors ${
                      isCompleted
                        ? 'bg-green-900/30 border-green-700 opacity-60 cursor-not-allowed'
                        : selectedCommission?.tier === commission.tier
                        ? 'bg-divine-gold/20 border-divine-gold'
                        : canAfford
                        ? 'bg-hell-obsidian/80 border-spartan-bronze/50 hover:border-divine-gold'
                        : 'bg-hell-obsidian/80 border-gray-700 opacity-50'
                    }`}
                    whileHover={!isCompleted ? { scale: 1.01 } : {}}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-greek text-lg text-divine-gold">
                        Tier {commission.tier} Commission
                      </div>
                      {isCompleted && <span className="text-green-500 text-xl">✓</span>}
                    </div>
                    <p className="text-spartan-marble text-sm mb-2">{commission.description}</p>
                    
                    {/* Reward Preview */}
                    <div className="bg-hell-obsidian/50 rounded p-2 mt-2">
                      <div className="text-xs text-spartan-bronze mb-1">Reward:</div>
                      {commission.reward.type === 'blessing' && commission.reward.blessing && (
                        <div>
                          <div className="text-divine-gold font-bold text-sm">
                            {commission.reward.blessing.name}
                          </div>
                          <div className="text-spartan-marble text-xs">
                            {commission.reward.blessing.description}
                          </div>
                        </div>
                      )}
                      {commission.reward.type === 'technique' && commission.reward.cards && (
                        <div>
                          <div className="text-card-forge font-bold text-sm">
                            {commission.reward.cards[0].name}
                          </div>
                          <div className="text-spartan-marble text-xs">
                            {commission.reward.cards[0].description}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-spartan-bronze mt-2">
                      Available: {result.availableCards.length} / {commission.requirement.count || 0}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Card Selection */}
        {selectedCommission && (
          <div className="w-96 flex flex-col bg-hell-obsidian/80 border-2 border-divine-gold rounded-lg p-4">
            <h3 className="font-greek text-xl text-divine-gold mb-2">
              Select Cards ({selectedCards.size} / {selectedCommission.requirement.count || 0})
            </h3>
            <p className="text-spartan-bronze text-sm mb-4">
              {selectedCommission.description}
            </p>

            <div className="flex-1 overflow-y-auto grid grid-cols-2 gap-2 mb-4">
              {availableCards.map((card) => (
                <div
                  key={card.instanceId}
                  className={`cursor-pointer transition-transform ${
                    selectedCards.has(card.instanceId)
                      ? 'ring-4 ring-divine-gold scale-95'
                      : 'hover:scale-105'
                  }`}
                  onClick={() => handleToggleCard(card.instanceId)}
                >
                  <CardDisplay card={card} disabled={false} />
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCompleteCommission}
                disabled={!canComplete}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete Trade
              </button>
              <button
                onClick={() => {
                  setSelectedCommission(null);
                  setSelectedCards(new Set());
                }}
                className="px-4 py-2 bg-hell-red/50 text-white rounded hover:bg-hell-red transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Leave Button */}
      <div className="flex justify-center py-4 bg-hell-obsidian/90 border-t border-spartan-bronze/30">
        <motion.button
          onClick={handleLeave}
          className="btn-primary px-12 py-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Return to Map
        </motion.button>
      </div>
    </div>
  );
}
