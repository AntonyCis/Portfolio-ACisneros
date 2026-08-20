import { useCallback, useState } from 'react';
import { useLenisGsap } from './hooks/useLenisGsap';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import BentoGrid from './components/BentoGrid';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';

const App = () => {
  const { scrollTo } = useLenisGsap();
  const [loaded, setLoaded] = useState(false);

  const handleLoaded = useCallback(() => setLoaded(true), []);
  const handleNavigate = useCallback(
    (target: string) => {
      scrollTo(target);
    },
    [scrollTo]
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Cursor />
      <ScrollProgress />
      <Preloader onComplete={handleLoaded} />
      <Navbar onNavigate={handleNavigate} />
      <main>
        <Hero start={loaded} onNavigate={handleNavigate} />
        <Marquee />
        <BentoGrid />
        <Projects />
        <Experience />
        <Marquee reverse />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;