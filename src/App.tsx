import { useGameStore } from './engine/state/game-store';
import { MainMenu } from './components/ui/MainMenu';
import { CombatScreen } from './components/combat/CombatScreen';
import { MapScreen } from './components/map/MapScreen';
import { RestScreen } from './components/screens/RestScreen';
import { ShopScreen } from './components/screens/ShopScreen';
import { EventScreen } from './components/screens/EventScreen';
import { RewardScreen } from './components/rewards/RewardScreen';
import { SpartanTradeScreen } from './components/spartans/SpartanTradeScreen';
import { GameOverScreen } from './components/screens/GameOverScreen';

function App() {
  const gamePhase = useGameStore((state) => state.gamePhase);

  return (
    <div className="h-screen w-screen bg-hell-obsidian overflow-hidden">
      {gamePhase === 'menu' && <MainMenu />}
      {gamePhase === 'map' && <MapScreen />}
      {gamePhase === 'combat' && <CombatScreen />}
      {gamePhase === 'rest' && <RestScreen />}
      {gamePhase === 'shop' && <ShopScreen />}
      {gamePhase === 'event' && <EventScreen />}
      {gamePhase === 'reward' && <RewardScreen />}
      {gamePhase === 'spartanTrade' && <SpartanTradeScreen />}
      {gamePhase === 'gameOver' && <GameOverScreen />}
    </div>
  );
}

export default App;
