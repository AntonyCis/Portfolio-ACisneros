import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { projects } from '../data/portfolio';
import SectionHeading from './SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 64 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.utils.toArray<HTMLElement>('.project-visual-inner').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('.project-card'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="py-28">
      <div className="container-shell">
        <SectionHeading
          index="02"
          title="Proyectos destacados"
          accent="en producción."
          description="Una selección de productos en los que apliqué decisiones de arquitectura, rendimiento y diseño."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="project-card glass-card group flex flex-col overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-white/10"
            >
              <div className="relative h-56 overflow-hidden border-b border-white/5">
                <div
                  className={`project-visual-inner absolute inset-x-0 -top-8 h-[120%] bg-gradient-to-br ${project.gradient}`}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-2xl font-semibold tracking-tight text-white/90">
                    {project.title}
                  </span>
                </div>
                {project.github || project.demo ? (
                  <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} on GitHub`}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-transform duration-300 hover:scale-110"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} live demo`}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 hover:scale-110"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-xs text-neutral-500">
                    {project.meta}
                  </span>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} — abrir sitio`}
                      className="text-neutral-600 transition-colors duration-300 hover:text-white"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <h3 className="font-display text-xl font-semibold text-neutral-100">
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors duration-300 hover:text-white"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>

                <p className="mt-2 flex-1 text-sm font-light leading-relaxed text-neutral-400">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs text-neutral-500 transition-colors duration-300 hover:text-neutral-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;