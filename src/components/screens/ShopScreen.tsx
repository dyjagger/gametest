import { motion } from 'framer-motion';
import { useState } from 'react';
import { useGameStore } from '../../engine/state/game-store';
import { GamePhase, CardInstance, Rarity } from '../../types';
import { CardDisplay } from '../cards/CardDisplay';
import { getRandomCards } from '../../data/cards/card-library';
import { v4 as uuidv4 } from 'uuid';

const CARD_PRICES = {
  [Rarity.Common]: 50,
  [Rarity.Uncommon]: 75,
  [Rarity.Rare]: 150,
  [Rarity.Legendary]: 300,
};

const REMOVE_CARD_PRICE = 75;

export function ShopScreen() {
  const player = useGameStore((state) => state.run?.player);
  const addCardToDeck = useGameStore((state) => state.addCardToDeck);
  const removeCardFromDeck = useGameStore((state) => state.removeCardFromDeck);
  const spendDivineFavor = useGameStore((state) => state.spendDivineFavor);
  const setGamePhase = useGameStore((state) => state.setGamePhase);

  const [shopCards] = useState(() => {
    // Generate 5 random cards for sale (mix of rarities)
    const cards: CardInstance[] = [];
    
    // 3 common cards
    const commons = getRandomCards(3, Rarity.Common);
    cards.push(...commons.map(c => ({ ...c, instanceId: uuidv4() } as CardInstance)));
    
    // 2 uncommon cards
    const uncommons = getRandomCards(2, Rarity.Uncommon);
    cards.push(...uncommons.map(c => ({ ...c, instanceId: uuidv4() } as CardInstance)));
    
    return cards;
  });

  const [purchasedCards, setPurchasedCards] = useState<Set<string>>(new Set());
  const [removeMode, setRemoveMode] = useState(false);

  if (!player) return null;

  const handleBuyCard = (card: CardInstance) => {
    const price = CARD_PRICES[card.rarity];
    if (player.divineFavor >= price && !purchasedCards.has(card.instanceId)) {
      if (spendDivineFavor(price)) {
        addCardToDeck(card);
        setPurchasedCards(new Set(purchasedCards).add(card.instanceId));
      }
    }
  };

  const handleRemoveCard = (card: CardInstance) => {
    if (player.divineFavor >= REMOVE_CARD_PRICE) {
      if (spendDivineFavor(REMOVE_CARD_PRICE)) {
        removeCardFromDeck(card.instanceId);
        setRemoveMode(false);
      }
    }
  };

  const handleLeave = () => {
    setGamePhase(GamePhase.Map);
  };

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-b from-hell-obsidian via-divine-gold/10 to-hell-obsidian">
      {/* Header */}
      <div className="text-center py-4">
        <h1 className="font-greek text-4xl text-divine-gold">Merchant's Haven</h1>
        <p className="text-spartan-marble mt-2">Trade your Divine Favor for powerful items</p>
      </div>

      {/* Resources */}
      <div className="flex justify-center gap-8 mb-4">
        <div className="text-center">
          <span className="text-divine-gold text-2xl">💰</span>
          <span className="text-white text-xl ml-2">{player.divineFavor}</span>
          <span className="text-spartan-bronze text-sm ml-1">Divine Favor</span>
        </div>
      </div>

      {/* Shop Content */}
      <div className="flex-1 overflow-y-auto px-8 py-4">
        {!removeMode ? (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-greek text-divine-gold mb-4 text-center">
              Cards for Sale
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {shopCards.map((card) => {
                const price = CARD_PRICES[card.rarity];
                const canAfford = player.divineFavor >= price;
                const isPurchased = purchasedCards.has(card.instanceId);
                
                return (
                  <div key={card.instanceId} className="relative">
                    <CardDisplay card={card} disabled={!canAfford || isPurchased} />
                    
                    <div className="mt-2 text-center">
                      {!isPurchased ? (
                        <button
                          onClick={() => handleBuyCard(card)}
                          disabled={!canAfford}
                          className={`px-4 py-2 rounded ${
                            canAfford
                              ? 'bg-divine-gold/20 border border-divine-gold text-divine-gold hover:bg-divine-gold/30'
                              : 'bg-gray-700 border border-gray-600 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          💰 {price}
                        </button>
                      ) : (
                        <div className="text-green-500 font-bold">✓ Purchased</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Card Removal Service */}
            <div className="bg-hell-obsidian/80 border-2 border-hell-red rounded-lg p-6 text-center">
              <h3 className="text-xl font-greek text-hell-ember mb-2">Card Removal Service</h3>
              <p className="text-spartan-marble mb-4">
                Remove unwanted cards from your deck permanently
              </p>
              <button
                onClick={() => setRemoveMode(true)}
                disabled={player.divineFavor < REMOVE_CARD_PRICE}
                className={`px-6 py-3 rounded ${
                  player.divineFavor >= REMOVE_CARD_PRICE
                    ? 'bg-hell-red/50 border border-hell-red text-white hover:bg-hell-red'
                    : 'bg-gray-700 border border-gray-600 text-gray-500 cursor-not-allowed'
                }`}
              >
                Remove Card (💰 {REMOVE_CARD_PRICE})
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-greek text-hell-ember mb-4 text-center">
              Choose a card to remove
            </h2>
            <p className="text-center text-spartan-bronze mb-6">
              This card will be permanently removed from your deck
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-h-[60vh] overflow-y-auto p-4">
              {player.deck.map((card) => (
                <div
                  key={card.instanceId}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => handleRemoveCard(card)}
                >
                  <CardDisplay card={card} disabled={false} />
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => setRemoveMode(false)}
                className="px-8 py-2 bg-hell-red/50 text-white rounded hover:bg-hell-red transition-colors"
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
          Leave Shop
        </motion.button>
      </div>
    </div>
  );
}
