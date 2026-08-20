import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const NAME = 'ANTONY CISNEROS';
const NAME_CHARS = NAME.split('');

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: reduce)', () => {
      onComplete();
      setHidden(true);
    });

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const chars = gsap.utils.toArray<HTMLElement>('.preloader-char');

        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.fromTo(
          chars,
          { yPercent: 120, rotateX: -45 },
          {
            yPercent: 0,
            rotateX: 0,
            transformPerspective: 600,
            duration: 0.8,
            stagger: 0.045,
          }
        )
          .fromTo(
            '.preloader-progress',
            { scaleX: 0 },
            { scaleX: 1, duration: 0.9, ease: 'power2.inOut' },
            '-=0.5'
          )
          .add(() => onComplete(), '-=0.25')
          .to(rootRef.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '<')
          .add(() => setHidden(true));
      }, rootRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      className="preloader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base"
    >
      <div className="flex overflow-hidden">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-neutral-500">
          Full Stack Developer
        </p>
      </div>

      <h1 className="mt-6 font-display text-[clamp(2.5rem,9vw,7.5rem)] font-bold leading-[0.95] tracking-tight text-neutral-100">
        {NAME_CHARS.map((char, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
          >
            <span className="preloader-char inline-block will-change-transform">
              {char === ' ' ? '\u00A0' : char}
            </span>
          </span>
        ))}
      </h1>

      <div className="preloader-progress mt-12 h-px w-52 origin-left scale-x-0 bg-gradient-to-r from-white to-neutral-600" />
    </div>
  );
};

export default Preloader;