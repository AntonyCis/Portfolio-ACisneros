import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-block',
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="border-t border-white/5 py-10"
    >
      <div className="container-shell footer-block flex flex-col items-center justify-between gap-6 md:flex-row">
        <p className="font-display text-sm font-semibold text-neutral-100">
          AC<span className="text-neutral-500">.</span>
        </p>

        <p className="text-xs font-light text-neutral-500">
          © {new Date().getFullYear()} Antony Cisneros. Diseñado y construido
          con React, GSAP y Lenis.
        </p>

        <div className="flex items-center gap-4">
          {[
            { href: 'https://github.com/antonycisneros', icon: Github, label: 'GitHub' },
            { href: 'https://www.linkedin.com/in/antony-cisneros-benavides-9118a4324', icon: Linkedin, label: 'LinkedIn' },
            { href: 'mailto:cisnerosaa25@gmail.com', icon: Mail, label: 'Email' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-neutral-500 transition-all duration-300 hover:scale-110 hover:text-neutral-200"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;