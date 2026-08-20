import { useLayoutEffect, useRef, useState, type FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, MessageSquare, Send } from 'lucide-react';
import SectionHeading from './SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const EMAIL = 'cisnerosaa25@gmail.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/antony-cisneros-benavides-9118a4324';
const GITHUB_URL = 'https://github.com/antonycisneros';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-block',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '');
    const email = String(data.get('email') ?? '');
    const message = String(data.get('message') ?? '');

    const subject = `Contacto desde el portafolio — ${name}`;
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setStatus('sent');
    form.reset();
    window.setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-28">
      <div className="container-shell">
        <SectionHeading
          index="04"
          title="¿Construimos algo juntos?"
          accent="Escríbeme."
          description="Cuéntame tu idea o proyecto. Respondo en menos de 24 horas."
        />

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="contact-block flex flex-col gap-6">
            <a
              href={`mailto:${EMAIL}`}
              className="glass-card group flex items-center gap-4 p-6 transition-all duration-300 hover:scale-[1.02] hover:border-white/10"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                <Mail className="h-5 w-5 text-neutral-300" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500">
                  Email
                </p>
                <p className="text-sm font-medium text-neutral-200">{EMAIL}</p>
              </div>
            </a>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="glass-card group flex items-center gap-4 p-6 transition-all duration-300 hover:scale-[1.02] hover:border-white/10"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                <Github className="h-5 w-5 text-neutral-300" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500">
                  GitHub
                </p>
                <p className="text-sm font-medium text-neutral-200">
                  @antonycisneros
                </p>
              </div>
            </a>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="glass-card group flex items-center gap-4 p-6 transition-all duration-300 hover:scale-[1.02] hover:border-white/10"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                <Linkedin className="h-5 w-5 text-neutral-300" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500">
                  LinkedIn
                </p>
                <p className="text-sm font-medium text-neutral-200">
                  /in/antony-cisneros-benavides
                </p>
              </div>
            </a>

            <div className="glass-card flex items-center gap-4 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                <MessageSquare className="h-5 w-5 text-neutral-300" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500">
                  Discord
                </p>
                <p className="text-sm font-medium text-neutral-200">
                  antony_cisneros
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="contact-block glass-card flex flex-col gap-5 p-6 md:p-8"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs uppercase tracking-widest text-neutral-500">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Tu nombre"
                className="border-b border-white/10 bg-transparent py-2 text-sm text-neutral-100 placeholder-neutral-600 outline-none transition-colors duration-300 focus:border-white/40"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs uppercase tracking-widest text-neutral-500">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="tu@email.com"
                className="border-b border-white/10 bg-transparent py-2 text-sm text-neutral-100 placeholder-neutral-600 outline-none transition-colors duration-300 focus:border-white/40"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs uppercase tracking-widest text-neutral-500">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Cuéntame sobre tu proyecto..."
                className="resize-none border-b border-white/10 bg-transparent py-2 text-sm text-neutral-100 placeholder-neutral-600 outline-none transition-colors duration-300 focus:border-white/40"
              />
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              <Send className="h-4 w-4" />
              {status === 'sent' ? 'Abriendo tu correo…' : 'Enviar mensaje'}
            </button>

            {status === 'sent' && (
              <p className="text-center text-xs text-emerald-400">
                Se abrió tu cliente de correo con el mensaje listo para enviar.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;