import { motion } from 'framer-motion';
import { useState } from 'react';
import { useGameStore } from '../../engine/state/game-store';
import { CardDisplay } from '../cards/CardDisplay';
import { EnemyDisplay } from './EnemyDisplay';
import { ForgeDisplay } from './ForgeDisplay';
import { ResourceBar } from '../ui/ResourceBar';
import { PileViewer } from './PileViewer';
import { CardType } from '../../types';

export function CombatScreen() {
  const combat = useGameStore((state) => state.run?.combat);
  const player = useGameStore((state) => state.run?.player);
  const endTurn = useGameStore((state) => state.endTurn);
  const playCard = useGameStore((state) => state.playCard);
  const pendingUpgrade = useGameStore((state) => state.pendingUpgrade);
  const upgradeCardInHand = useGameStore((state) => state.upgradeCardInHand);
  const cancelUpgrade = useGameStore((state) => state.cancelUpgrade);
  
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isTargeting, setIsTargeting] = useState(false);
  const [pileViewerOpen, setPileViewerOpen] = useState<'draw' | 'discard' | 'exhaust' | null>(null);

  if (!combat || !player) {
    return <div className="h-full flex items-center justify-center text-white">Loading combat...</div>;
  }

  // Get living enemies for targeting
  const livingEnemies = combat.enemies.filter(e => e.hp > 0);
  
  // Check if selected card needs a target
  const selectedCard = selectedCardId ? combat.hand.find(c => c.instanceId === selectedCardId) : null;
  
  // Get upgradeable cards in hand
  const upgradeableCards = combat.hand.filter(c => !c.upgraded && c.upgradedVersion);

  const handleCardClick = (cardInstanceId: string) => {
    const card = combat.hand.find(c => c.instanceId === cardInstanceId);
    if (!card || card.energyCost > player.energy) return;
    
    // If card needs a target and there are multiple living enemies, enter targeting mode
    if ((card.type === CardType.Attack || card.type === CardType.Hybrid) && livingEnemies.length > 1) {
      setSelectedCardId(cardInstanceId);
      setIsTargeting(true);
    } else {
      // Play card immediately (target first living enemy for attacks)
      const targetIndex = livingEnemies.length > 0 
        ? combat.enemies.findIndex(e => e.hp > 0) 
        : 0;
      playCard(cardInstanceId, targetIndex);
      setSelectedCardId(null);
      setIsTargeting(false);
    }
  };

  const handleEnemyClick = (enemyIndex: number) => {
    if (isTargeting && selectedCardId) {
      playCard(selectedCardId, enemyIndex);
      setSelectedCardId(null);
      setIsTargeting(false);
    }
  };

  const cancelTargeting = () => {
    setSelectedCardId(null);
    setIsTargeting(false);
  };

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-b from-hell-obsidian to-hell-red/30">
      {/* Top Resource Bar */}
      <ResourceBar />

      {/* Targeting Mode Indicator */}
      {isTargeting && (
        <div className="bg-divine-gold/20 text-divine-gold text-center py-2 border-b border-divine-gold/50">
          Select a target for {selectedCard?.name} 
          <button onClick={cancelTargeting} className="ml-4 text-sm underline hover:text-white">
            Cancel
          </button>
        </div>
      )}

      {/* Upgrade Mode Indicator */}
      {pendingUpgrade && (
        <div className="bg-card-forge/20 text-card-forge text-center py-2 border-b border-card-forge/50">
          Select a card to upgrade {upgradeableCards.length === 0 && '(No upgradeable cards in hand!)'}
          <button onClick={cancelUpgrade} className="ml-4 text-sm underline hover:text-white">
            Cancel
          </button>
        </div>
      )}

      {/* Enemy Area - only show living enemies */}
      <div className="flex-1 flex items-center justify-center gap-8 p-4">
        {combat.enemies.map((enemy, index) => (
          enemy.hp > 0 && (
            <EnemyDisplay 
              key={enemy.instanceId} 
              enemy={enemy} 
              index={index}
              isTargetable={isTargeting}
              onSelect={() => handleEnemyClick(index)}
            />
          )
        ))}
      </div>

      {/* Battlefield - Forge Display */}
      <div className="flex items-center justify-center py-4">
        <ForgeDisplay hp={player.hp} maxHp={player.maxHp} block={player.block} />
      </div>

      {/* Bottom UI - Energy, Piles, End Turn */}
      <div className="flex items-center justify-between px-8 py-2 bg-hell-obsidian/80 border-t border-spartan-bronze/30">
        {/* Energy */}
        <div className="flex items-center gap-2">
          <span className="text-divine-gold text-2xl font-bold">⚡</span>
          <span className="text-white text-xl">
            {player.energy}/{player.maxEnergy}
          </span>
        </div>

        {/* Card Piles */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setPileViewerOpen('draw')}
            className="text-center hover:bg-hell-red/20 px-3 py-2 rounded transition-colors cursor-pointer"
          >
            <div className="text-spartan-bronze text-sm">Draw</div>
            <div className="text-white text-lg">📚 {combat.drawPile.length}</div>
          </button>
          <button 
            onClick={() => setPileViewerOpen('discard')}
            className="text-center hover:bg-hell-red/20 px-3 py-2 rounded transition-colors cursor-pointer"
          >
            <div className="text-spartan-bronze text-sm">Discard</div>
            <div className="text-white text-lg">🗑️ {combat.discardPile.length}</div>
          </button>
          <button 
            onClick={() => setPileViewerOpen('exhaust')}
            className="text-center hover:bg-hell-red/20 px-3 py-2 rounded transition-colors cursor-pointer"
          >
            <div className="text-spartan-bronze text-sm">Exhaust</div>
            <div className="text-white text-lg">💀 {combat.exhaustPile.length}</div>
          </button>
        </div>

        {/* End Turn Button */}
        <motion.button
          onClick={endTurn}
          className="btn-primary px-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          End Turn
        </motion.button>
      </div>

      {/* Hand */}
      <div className="h-48 bg-hell-obsidian/90 border-t-2 border-spartan-bronze flex items-center justify-center gap-2 px-4 overflow-x-auto">
        {combat.hand.map((card, index) => {
          // Determine if card is clickable based on current mode
          const canUpgrade = pendingUpgrade && !card.upgraded && !!card.upgradedVersion;
          const isDisabled = pendingUpgrade ? !canUpgrade : card.energyCost > player.energy;
          
          const handleClick = () => {
            if (pendingUpgrade && canUpgrade) {
              upgradeCardInHand(card.instanceId);
            } else if (!pendingUpgrade) {
              handleCardClick(card.instanceId);
            }
          };
          
          return (
            <motion.div
              key={card.instanceId}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <CardDisplay
                card={card}
                onClick={handleClick}
                disabled={isDisabled}
                selected={selectedCardId === card.instanceId || canUpgrade}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Pile Viewer Modal */}
      <PileViewer
        isOpen={pileViewerOpen !== null}
        onClose={() => setPileViewerOpen(null)}
        pileType={pileViewerOpen || 'draw'}
        cards={
          pileViewerOpen === 'draw' ? combat.drawPile :
          pileViewerOpen === 'discard' ? combat.discardPile :
          combat.exhaustPile
        }
      />
    </div>
  );
}
