import { useEffect, useRef, useState } from 'react';
import Magnetic from './Magnetic';

const LINKS = [
  { label: 'Inicio', target: '#home' },
  { label: 'Stack', target: '#about' },
  { label: 'Proyectos', target: '#work' },
  { label: 'Experiencia', target: '#experience' },
  { label: 'Contacto', target: '#contact' },
];

interface NavbarProps {
  onNavigate: (target: string) => void;
}

const Navbar = ({ onNavigate }: NavbarProps) => {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/5 bg-base/70 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-shell flex items-center justify-between py-4">
        <button
          onClick={() => onNavigate('#home')}
          className="font-display text-sm font-semibold tracking-tight text-neutral-100"
        >
          AC<span className="text-neutral-500">.</span>
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.target}>
              <button
                onClick={() => onNavigate(link.target)}
                className="text-sm font-medium text-neutral-400 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <Magnetic strength={0.3}>
          <a
            href="mailto:cisnerosaa25@gmail.com"
            className="inline-block rounded-full border border-white/10 px-4 py-1.5 text-xs font-medium text-neutral-200 transition-all duration-300 hover:border-white/25 hover:bg-white/5"
          >
            Hablemos
          </a>
        </Magnetic>
      </nav>
    </header>
  );
};

export default Navbar;