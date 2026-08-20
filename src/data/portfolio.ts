import {
  Database,
  Cloud,
  Smartphone,
  ShieldCheck,
  Layers,
  type LucideIcon,
} from 'lucide-react';

export interface StackGroup {
  icon: LucideIcon;
  title: string;
  description: string;
  skills: string[];
  span?: 'sm' | 'lg' | 'tall';
  accent?: string;
}

export const stackGroups: StackGroup[] = [
  {
    icon: Smartphone,
    title: 'Frontend & Mobile',
    description:
      'Interfaces rápidas, tipográficas y animadas, en web y dispositivos móviles con enfoque en microinteracciones.',
    skills: [
      'React',
      'React Native',
      'Expo',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Bootstrap',
    ],
    span: 'lg',
    accent: 'from-sky-500/20',
  },
  {
    icon: Database,
    title: 'Backend & Bases de Datos',
    description:
      'APIs robustas, lógica de negocio, persistencia e integración de modelos de IA.',
    skills: ['Node.js', 'Express', 'PHP', 'MongoDB', 'MySQL', 'SQL Server', 'Integración LLM'],
    span: 'lg',
    accent: 'from-emerald-500/20',
  },
  {
    icon: Cloud,
    title: 'DevOps & Entorno',
    description: 'Entornos reproducibles y despliegues sin fricción.',
    skills: ['Git', 'GitHub', 'Docker', 'Linux', 'Bash'],
    span: 'sm',
    accent: 'from-amber-500/20',
  },
  {
    icon: ShieldCheck,
    title: 'Ciberseguridad & Sistemas',
    description:
      'Seguridad informática, auditoría de redes y administración de sistemas críticos.',
    skills: ['Auditoría de redes', 'Seguridad informática', 'Administración de sistemas'],
    span: 'sm',
    accent: 'from-rose-500/20',
  },
  {
    icon: Layers,
    title: 'Arquitectura & Calidad',
    description:
      'Código limpio, componentes modulares y patrones que escalan con el producto.',
    skills: ['Clean Code', 'REST', 'Metodologías ágiles', 'Testing'],
    span: 'sm',
    accent: 'from-violet-500/20',
  },
];

export interface Project {
  title: string;
  meta: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  gradient: string;
}

export const projects: Project[] = [
  {
    title: 'AndiCod',
    meta: 'Startup propia — Co-fundador',
    description:
      'Diseño y desarrollo web para negocios. Junto a mi hermano fundamos AndiCod: landing pages, webs corporativas, e-commerce y desarrollo a medida, con una propuesta clara que convierte visitas en oportunidades.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    demo: 'https://andicod.com',
    gradient: 'from-cyan-500/30 via-sky-600/10 to-transparent',
  },
  {
    title: 'AI Job Interview Simulator',
    meta: 'Proyecto de Integración Curricular',
    description:
      'Sistema web inteligente para simular entrevistas laborales técnicas. Interactúa en tiempo real simulando un reclutador y ofrece retroalimentación automatizada sobre desempeño técnico y habilidades blandas mediante IA.',
    tags: ['React', 'Node.js', 'MongoDB', 'LLM API'],
    github: 'https://github.com/antonycisneros',
    gradient: 'from-sky-500/30 via-blue-600/10 to-transparent',
  },
  {
    title: 'CV-CREATOR',
    meta: 'App móvil nativa',
    description:
      'Aplicación móvil moderna orientada a la creación y personalización de currículums profesionales de manera rápida y dinámica desde dispositivos móviles.',
    tags: ['React Native', 'Expo', 'Tailwind'],
    github: 'https://github.com/antonycisneros',
    gradient: 'from-emerald-500/30 via-teal-600/10 to-transparent',
  },
  {
    title: 'Polimaps',
    meta: 'Optimización web',
    description:
      'Aplicación web enfocada en optimización de rendimiento y renderizado, mejorando métricas críticas de Core Web Vitals como el Largest Contentful Paint (LCP).',
    tags: ['JavaScript', 'CSS3', 'Firebase'],
    github: 'https://github.com/antonycisneros',
    gradient: 'from-amber-500/30 via-orange-600/10 to-transparent',
  },
  {
    title: 'Sistema de Gestión de Citas',
    meta: 'Sistema empresarial',
    description:
      'CRUD de nivel empresarial para la automatización, control y agendamiento de citas de clientes, optimizado para soportar flujos intensivos de datos.',
    tags: ['PHP', 'MySQL', 'JavaScript'],
    github: 'https://github.com/antonycisneros',
    gradient: 'from-violet-500/30 via-purple-600/10 to-transparent',
  },
];

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  stack: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: 'Co-fundador — Desarrollador Full Stack',
    company: 'AndiCod',
    period: '2026 — Presente',
    description:
      'Fundé con mi hermano una startup de diseño y desarrollo web para negocios. Lideré el proceso completo: estrategia, diseño, desarrollo y publicación de la página, desde los planes hasta la arquitectura de contenido.',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'SEO', 'E-commerce'],
  },
  {
    role: 'Practicante — Seguridad Informática',
    company: 'Empresa Eléctrica Quito (EEQ)',
    period: '2025 — 2026',
    description:
      'Prácticas preprofesionales fortaleciendo habilidades en seguridad informática, auditoría de redes y gestión de sistemas críticos.',
    stack: ['Ciberseguridad', 'Auditoría de redes', 'Linux'],
  },
  {
    role: 'Desarrollador Full Stack',
    company: 'Proyectos académicos y personales',
    period: '2023 — Presente',
    description:
      'Diseño y desarrollo de aplicaciones web y móviles de punta a punta, incluyendo el proyecto de integración curricular AI Job Interview Simulator con integración de modelos de IA.',
    stack: ['React', 'React Native', 'Node.js', 'MongoDB'],
  },
  {
    role: 'Estudiante de Desarrollo de Software',
    company: 'EPN — ESFOT',
    period: '2022 — Presente',
    description:
      'Formación en desarrollo full stack y móvil con respaldo en ciberseguridad y administración de sistemas, en Quito, Ecuador.',
    stack: ['Frontend', 'Mobile', 'Ciberseguridad', 'IA/LLMs'],
  },
];