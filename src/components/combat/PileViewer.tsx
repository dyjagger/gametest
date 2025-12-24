import { motion, AnimatePresence } from 'framer-motion';
import { CardInstance } from '../../types';
import { CardDisplay } from '../cards/CardDisplay';

interface PileViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pileType: 'draw' | 'discard' | 'exhaust';
  cards: CardInstance[];
}

export function PileViewer({ isOpen, onClose, pileType, cards }: PileViewerProps) {
  const titles = {
    draw: 'Draw Pile',
    discard: 'Discard Pile',
    exhaust: 'Exhaust Pile',
  };

  const icons = {
    draw: '📚',
    discard: '🗑️',
    exhaust: '💀',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-8"
            onClick={onClose}
          >
            <div
              className="bg-hell-obsidian border-2 border-spartan-bronze rounded-lg max-w-6xl w-full max-h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-spartan-bronze/30">
                <h2 className="text-2xl font-greek text-divine-gold flex items-center gap-2">
                  <span>{icons[pileType]}</span>
                  {titles[pileType]} ({cards.length} cards)
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-hell-red/30 rounded transition-colors text-spartan-marble text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* Cards Grid */}
              <div className="flex-1 overflow-y-auto p-6">
                {cards.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-spartan-bronze text-lg">
                    No cards in {titles[pileType].toLowerCase()}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {cards.map((card) => (
                      <div key={card.instanceId} className="flex justify-center">
                        <CardDisplay card={card} disabled={true} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-spartan-bronze/30 text-center">
                <button
                  onClick={onClose}
                  className="btn-primary px-6"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
