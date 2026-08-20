import { useCallback, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const DEFAULT_ITEMS = [
  'Full Stack Developer',
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Tailwind CSS',
  'GSAP',
  'Lenis',
];

interface MarqueeProps {
  items?: string[];
  reverse?: boolean;
}

const Marquee = ({ items = DEFAULT_ITEMS, reverse = false }: MarqueeProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const pause = useCallback(() => tweenRef.current?.pause(), []);
  const play = useCallback(() => tweenRef.current?.play(), []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(trackRef.current, { xPercent: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tween = gsap.fromTo(
          trackRef.current,
          { xPercent: reverse ? -50 : 0 },
          {
            xPercent: reverse ? 0 : -50,
            duration: 24,
            ease: 'none',
            repeat: -1,
          }
        );
        tweenRef.current = tween;
      });
    }, rootRef);

    return () => {
      tweenRef.current = null;
      ctx.revert();
    };
  }, [reverse]);

  const row = (ariaHidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {items.map((item) => (
        <span
          key={item}
          className="group/item relative z-10 flex cursor-pointer items-center whitespace-nowrap px-6 text-xs font-medium uppercase tracking-[0.3em] text-neutral-600 transition-all duration-300 hover:scale-125 hover:text-white hover:[text-shadow:0_0_20px_rgba(255,255,255,0.35)]"
        >
          {item}
          <span className="ml-6 font-serif text-sm italic text-neutral-700 transition-colors duration-300 group-hover/item:text-white">
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={rootRef}
      className="select-none overflow-hidden border-y border-white/5 py-6"
      onMouseEnter={pause}
      onMouseLeave={play}
      onFocus={pause}
      onBlur={play}
    >
      <div ref={trackRef} className="flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
};

export default Marquee;