import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambleText from './ScrambleText';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  index: string;
  total?: string;
  title: string;
  accent?: string;
  description?: string;
}

const SectionHeading = ({
  index,
  total = '04',
  title,
  accent,
  description,
}: SectionHeadingProps) => {
  const headingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.section-title-word', { yPercent: 0 });
        gsap.set('.section-title-em', { opacity: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.section-title-word',
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.8,
            ease: 'power4.out',
            stagger: 0.07,
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
            },
          }
        );

        if (accent) {
          gsap.fromTo(
            '.section-title-em',
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              delay: 0.2,
              scrollTrigger: {
                trigger: headingRef.current,
                start: 'top 85%',
              },
            }
          );
        }
      });
    }, headingRef);

    return () => ctx.revert();
  }, [accent]);

  const words = title.split(' ');

  return (
    <div ref={headingRef} className="mb-14">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500">
        <ScrambleText text={`[ ${index} — ${total} ]`} startOnView />
      </p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-neutral-100 sm:text-5xl">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom"
          >
            <span className="section-title-word inline-block will-change-transform">
              {word}
            </span>
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
        {accent && (
          <em className="section-title-em font-serif font-normal italic text-neutral-400">
            {' '}
            {accent}
          </em>
        )}
      </h2>
      {description && (
        <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-neutral-400">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;