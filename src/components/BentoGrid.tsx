import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stackGroups } from '../data/portfolio';
import SectionHeading from './SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const spanClasses: Record<string, string> = {
  sm: 'lg:col-span-1',
  lg: 'lg:col-span-2',
};

const BentoGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bento-card',
        { opacity: 0, y: 48, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-28">
      <div className="container-shell">
        <SectionHeading
          index="01"
          title="Stack y herramientas"
          accent="que dominan el craft."
          description="El stack con el que construyo aplicaciones web y móviles de punta a punta, con respaldo en ciberseguridad y sistemas."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stackGroups.map((group) => {
            const Icon = group.icon;
            return (
              <article
                key={group.title}
                className={`bento-card glass-card group relative overflow-hidden p-6 transition-all duration-300 hover:scale-[1.02] hover:border-white/10 hover:shadow-[0_0_50px_rgba(255,255,255,0.05)] ${
                  spanClasses[group.span ?? 'sm']
                }`}
              >
                <div
                  className={`pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br ${group.accent} to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                />

                <div className="relative flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                    <Icon className="h-5 w-5 text-neutral-300" />
                  </div>
                  <span className="font-mono text-[10px] text-neutral-600">
                    [ 0{stackGroups.indexOf(group) + 1} ]
                  </span>
                </div>

                <h3 className="relative mt-5 font-display text-lg font-semibold text-neutral-100">
                  {group.title}
                </h3>
                <p className="relative mt-2 text-sm font-light leading-relaxed text-neutral-500">
                  {group.description}
                </p>

                <div className="relative mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;