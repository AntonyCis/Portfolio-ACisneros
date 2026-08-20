import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../data/portfolio';
import SectionHeading from './SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.timeline-item',
        { opacity: 0, x: -32 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );

      gsap.fromTo(
        '.timeline-line-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: '.timeline-track',
            start: 'top 75%',
            end: 'bottom 55%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-28">
      <div className="container-shell">
        <SectionHeading
          index="03"
          title="Experiencia & trayectoria"
          accent="hasta hoy."
          description="Un recorrido por los equipos, productos y retos que me han formado como desarrollador."
        />

        <div className="timeline-track relative ml-4 border-l border-white/10 md:ml-8">
          <div className="timeline-line-fill absolute -left-px top-0 h-full w-px origin-top bg-gradient-to-b from-white via-neutral-400 to-neutral-700" />

          <div className="flex flex-col gap-14">
            {experience.map((item) => (
              <div key={`${item.role}-${item.period}`} className="relative pl-10 md:pl-16">
                <span className="absolute left-0 top-1 h-3 w-3 -translate-x-1/2 rounded-full border border-white/30 bg-base" />

                <div className="timeline-item">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-semibold text-neutral-100">
                      {item.role}
                    </h3>
                    <span className="font-mono text-xs text-neutral-500">
                      {item.period}
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-medium text-neutral-400">
                    {item.company}
                  </p>

                  <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-neutral-500">
                    {item.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.stack.map((tech) => (
                      <span key={tech} className="pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;