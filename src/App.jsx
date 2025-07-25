import Flags from './components/flags/Flags';
import Hero from './components/hero/Hero';
import StickyBar from './components/sticky-bar/StickyBar';
import Footer from './components/footer/Footer';
import GameOver from './components/game-over/GameOver';
import './App.css';
import { useContext } from 'react';
import { GameContext } from './context/GameContext';
import { GameStatus } from './utils/helpers';

function App() {
  const { gameStatus } = useContext(GameContext);
  return (
    <>
      <Hero />
      <StickyBar />
      <Flags />
      {gameStatus === GameStatus.ENDED && <GameOver />}
      <Footer />
    </>
  );
}

export default App;
