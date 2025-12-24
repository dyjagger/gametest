import { CardInstance } from '../../types';
import { CardDisplay } from './CardDisplay';

interface CardUpgradePreviewProps {
  card: CardInstance;
  onConfirm: () => void;
  onCancel: () => void;
}

export function CardUpgradePreview({ card, onConfirm, onCancel }: CardUpgradePreviewProps) {
  if (!card.upgradedVersion) return null;

  const upgradedCard: CardInstance = {
    ...card,
    upgraded: true,
    name: card.name + '+',
    description: card.upgradedVersion.description,
    effects: card.upgradedVersion.effects,
    energyCost: card.upgradedVersion.energyCost ?? card.energyCost,
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-hell-obsidian border-4 border-divine-gold rounded-lg p-8 max-w-4xl">
        <h2 className="text-3xl font-greek text-divine-gold text-center mb-6">
          Upgrade Preview
        </h2>
        
        <div className="flex gap-8 items-center justify-center mb-8">
          {/* Current Card */}
          <div className="flex flex-col items-center">
            <div className="text-spartan-bronze mb-2">Current</div>
            <CardDisplay card={card} disabled={false} />
          </div>

          {/* Arrow */}
          <div className="text-6xl text-divine-gold">→</div>

          {/* Upgraded Card */}
          <div className="flex flex-col items-center">
            <div className="text-divine-gold mb-2">Upgraded</div>
            <CardDisplay card={upgradedCard} disabled={false} />
          </div>
        </div>

        {/* Changes Summary */}
        <div className="bg-hell-obsidian/50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-greek text-divine-gold mb-2">Changes:</h3>
          <ul className="text-spartan-marble space-y-1">
            {card.upgradedVersion.energyCost !== undefined && 
             card.upgradedVersion.energyCost !== card.energyCost && (
              <li>• Energy Cost: {card.energyCost} → {card.upgradedVersion.energyCost}</li>
            )}
            <li>• {card.upgradedVersion.description}</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onConfirm}
            className="btn-primary px-12 py-3"
          >
            Upgrade Card
          </button>
          <button
            onClick={onCancel}
            className="px-12 py-3 bg-hell-red/50 text-white rounded hover:bg-hell-red transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
