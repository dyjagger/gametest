import { motion } from 'framer-motion';
import { useGameStore } from '../../engine/state/game-store';

export function MainMenu() {
  const startNewRun = useGameStore((state) => state.startNewRun);
  const progression = useGameStore((state) => state.progression);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-hell-obsidian via-hell-red/20 to-hell-obsidian" />
      
      {/* Animated ember particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-hell-ember rounded-full"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: '100%',
              opacity: 0.8 
            }}
            animate={{ 
              y: '-10%',
              opacity: 0 
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeOut'
            }}
          />
        ))}
      </div>

      {/* Title */}
      <motion.div
        className="relative z-10 text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-greek text-6xl md:text-8xl text-divine-gold mb-4 tracking-wider"
            style={{ textShadow: '0 0 30px rgba(255, 215, 0, 0.5)' }}>
          FORGE
        </h1>
        <h2 className="font-greek text-3xl md:text-5xl text-spartan-marble tracking-widest">
          OF THE FALLEN
        </h2>
        <p className="mt-4 text-spartan-bronze text-sm tracking-wide">
          A Deck-Building Roguelike
        </p>
      </motion.div>

      {/* Menu buttons */}
      <motion.div
        className="relative z-10 flex flex-col gap-4 w-64"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <button
          onClick={() => startNewRun()}
          className="btn-primary text-lg"
        >
          New Run
        </button>
        
        <button
          className="btn-primary text-lg opacity-50 cursor-not-allowed"
          disabled
        >
          Continue
        </button>
        
        <button
          className="btn-primary text-lg opacity-50 cursor-not-allowed"
          disabled
        >
          Collection
        </button>
        
        <button
          className="btn-primary text-lg opacity-50 cursor-not-allowed"
          disabled
        >
          Spartans
        </button>
        
        <button
          className="btn-primary text-lg opacity-50 cursor-not-allowed"
          disabled
        >
          Settings
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="absolute bottom-8 left-8 text-spartan-bronze text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>Runs: {progression.runsCompleted}</p>
        <p>Wins: {progression.runsWon}</p>
        <p>Ascension: {progression.ascensionLevel}</p>
      </motion.div>

      {/* Version */}
      <motion.div
        className="absolute bottom-8 right-8 text-spartan-bronze text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="text-right">
          <div className="text-divine-gold font-bold">v0.2.0</div>
          <div className="text-xs text-gray-500">Phase 1 & 2 Complete</div>
        </div>
      </motion.div>
    </div>
  );
}
