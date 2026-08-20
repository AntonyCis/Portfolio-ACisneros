import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CursorProps {
  dotColor?: string;
  ringColor?: string;
}

const Cursor = ({ dotColor = '#ffffff', ringColor = 'rgba(255,255,255,0.25)' }: CursorProps) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setEnabled(true);
  }, []);

  useLayoutEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add('cursor-custom');
    gsap.set([dot, ring], { opacity: 0 });

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });

    let hasMoved = false;

    const onMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, input, textarea, select, [role="button"]')) {
        gsap.to(ring, { scale: 1.7, borderColor: 'rgba(255,255,255,0.55)', backgroundColor: 'rgba(255,255,255,0.06)', duration: 0.3 });
        gsap.to(dot, { scale: 0.35, duration: 0.3 });
      }
    };

    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, input, textarea, select, [role="button"]')) {
        gsap.to(ring, { scale: 1, borderColor: ringColor, backgroundColor: 'rgba(255,255,255,0)', duration: 0.3 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.documentElement.classList.remove('cursor-custom');
    };
  }, [enabled, ringColor]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-8 w-8 -ml-4 -mt-4 rounded-full border"
        style={{ borderColor: ringColor, willChange: 'transform' }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 -ml-[3px] -mt-[3px] rounded-full"
        style={{ backgroundColor: dotColor, willChange: 'transform' }}
      />
    </>
  );
};

export default Cursor;