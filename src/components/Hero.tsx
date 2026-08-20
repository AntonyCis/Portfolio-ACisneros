import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ArrowDown, Mail } from 'lucide-react';
import Magnetic from './Magnetic';
import ScrambleText from './ScrambleText';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface HeroProps {
  onNavigate: (target: string) => void;
  start: boolean;
}

const NAME = 'Antony Cisneros';

const ROTATING = ['rápido.', 'tipográfico.', 'kinético.', 'escalable.'];

const SUBTITLE_STATIC = 'Full Stack Developer';

const HERO_SELECTORS = [
  '.hero-title',
  '.hero-subtitle',
  '.hero-desc',
  '.hero-actions',
  '.hero-scroll',
];

const Hero = ({ onNavigate, start }: HeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!start) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(HERO_SELECTORS, { opacity: 1, y: 0, rotateX: 0, yPercent: 0 });
        gsap.utils.toArray<HTMLElement>('.rotating-word').forEach((word, i) => {
          gsap.set(word, { yPercent: i === 0 ? 0 : 110 });
        });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const words = gsap.utils.toArray<HTMLElement>('.rotating-word');

        const rotation = gsap.timeline({ repeat: -1, paused: true });

        rotation.fromTo(
          words[0],
          { yPercent: 110 },
          { yPercent: 0, duration: 0.8, ease: 'power4.out' },
          0
        );
        rotation.to(words[0], { yPercent: -110, duration: 0.8, ease: 'power3.in' }, '+=1.8');

        for (let i = 1; i < words.length; i++) {
          rotation.fromTo(
            words[i],
            { yPercent: 110 },
            { yPercent: 0, duration: 0.8, ease: 'power4.out' },
            '>-0.35'
          );
          rotation.to(words[i], { yPercent: -110, duration: 0.8, ease: 'power3.in' }, '+=1.8');
        }

        const split = SplitText.create('.hero-title', { type: 'words,chars' });
        const chars = split.chars;

        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.fromTo(
          chars,
          { yPercent: 110, rotateX: -55, opacity: 0 },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            transformPerspective: 600,
            duration: 1,
            stagger: 0.025,
            delay: 0.1,
          }
        )
          .fromTo(
            '.hero-subtitle',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7 },
            '-=0.5'
          )
          .add(() => rotation.play(0), '-=0.4')
          .fromTo(
            '.hero-desc',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7 },
            '-=0.5'
          )
          .fromTo(
            '.hero-actions',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7 },
            '-=0.4'
          )
          .fromTo(
            '.hero-scroll',
            { opacity: 0 },
            { opacity: 1, duration: 0.6 },
            '-=0.2'
          );

        const scrollTrigger = {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        } as const;

        gsap.to('.hero-content', {
          yPercent: -10,
          opacity: 0,
          ease: 'none',
          scrollTrigger,
        });

        gsap.to('.hero-scroll', {
          opacity: 0,
          ease: 'none',
          scrollTrigger,
        });

        return () => split.revert();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [start]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.06),transparent_55%)]" />

      <div className="hero-content container-shell w-full py-24">
        <h1 className="hero-title font-display text-[clamp(2.75rem,12vw,12rem)] font-bold leading-[0.92] tracking-tight text-neutral-100">
          {NAME}
        </h1>

        <div className="hero-subtitle mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-lg font-light text-neutral-300 opacity-0 sm:text-2xl">
          <ScrambleText
            text={SUBTITLE_STATIC}
            delay={1500}
            className="text-neutral-300"
          />
          <span>—</span>
          <span
            className="relative inline-grid h-[1.35em] overflow-hidden"
            aria-hidden="true"
          >
            {ROTATING.map((word) => (
              <span
                key={word}
                className="rotating-word col-start-1 row-start-1 whitespace-nowrap will-change-transform"
              >
                {word}
              </span>
            ))}
          </span>
          <span className="sr-only">
            {SUBTITLE_STATIC} {ROTATING.join(' ')}
          </span>
        </div>

        <p className="hero-desc mt-6 max-w-xl text-base font-light leading-relaxed text-neutral-500 opacity-0 sm:text-lg">
          Construyo software web y móvil con decisiones de arquitectura sólidas
          y microinteracciones de nivel{' '}
          <em className="font-serif text-lg italic text-neutral-300">premium</em>.
          <span className="mt-2 block font-mono text-xs uppercase tracking-[0.25em] text-neutral-600">
            Quito, Ecuador — EPN · ESFOT
          </span>
        </p>

        <div className="hero-actions mt-10 flex flex-col items-start gap-4 opacity-0 sm:flex-row">
          <Magnetic>
            <button
              onClick={() => onNavigate('#contact')}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              <Mail className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-6" />
              Get in touch
            </button>
          </Magnetic>
          <Magnetic>
            <button
              onClick={() => onNavigate('#work')}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-neutral-200 transition-all duration-300 hover:scale-[1.03] hover:border-white/25 hover:bg-white/5"
            >
              View work
            </button>
          </Magnetic>
        </div>
      </div>

      <button
        onClick={() => onNavigate('#about')}
        className="hero-scroll group absolute bottom-8 left-6 flex items-center gap-2 text-neutral-500 opacity-0 transition-colors duration-300 hover:text-neutral-300 md:left-10"
        aria-label="Scroll down"
      >
        <ArrowDown className="h-4 w-4 animate-bounce" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
      </button>
    </section>
  );
};

export default Hero;