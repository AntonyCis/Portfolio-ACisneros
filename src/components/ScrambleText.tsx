import { useCallback, useEffect, useRef } from 'react';

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>{}[]/\\|';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  startOnView?: boolean;
}

const ScrambleText = ({
  text,
  className,
  delay = 0,
  startOnView = false,
}: ScrambleTextProps) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  const play = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const totalFrames = Math.max(12, Math.round(text.length * 2.4));
    let frame = 0;

    const interval = window.setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      let out = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ' || i / text.length < progress) {
          out += text[i];
        } else {
          out += CHARSET[Math.floor(Math.random() * CHARSET.length)];
        }
      }
      if (spanRef.current) spanRef.current.textContent = out;
      if (frame >= totalFrames) window.clearInterval(interval);
    }, 30);
  }, [text]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timeout: ReturnType<typeof setTimeout> | undefined;
    let observer: IntersectionObserver | undefined;

    if (startOnView) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            observer?.disconnect();
            play();
          }
        },
        { threshold: 0.5 }
      );
      if (spanRef.current) observer.observe(spanRef.current);
    } else {
      timeout = window.setTimeout(play, delay);
    }

    return () => {
      if (timeout) window.clearTimeout(timeout);
      observer?.disconnect();
      if (spanRef.current) spanRef.current.textContent = text;
    };
  }, [play, text, delay, startOnView]);

  return (
    <span ref={spanRef} className={className}>
      {text}
    </span>
  );
};

export default ScrambleText;