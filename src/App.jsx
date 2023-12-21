import Flags from './components/flags/Flags';
import Hero from './components/hero/Hero';
import StickyBar from './components/sticky-bar/StickyBar';
import './App.css';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
      <Hero />
      <StickyBar />
      <Flags />
      <Footer />
    </>
  );
}

export default App;
