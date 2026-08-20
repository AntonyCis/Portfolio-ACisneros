# Antony Cisneros — Portfolio

Portafolio personal construido como una SPA orientada a mostrar producto: animaciones de nivel editorial, scroll fluido y componentes reutilizables, sin sacrificar performance ni accesibilidad.

**Live:** _agregar URL de despliegue_

## Stack

| Categoría          | Tecnología                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| Framework           | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Build tool          | [Vite 5](https://vitejs.dev/)                                              |
| Estilos             | [Tailwind CSS](https://tailwindcss.com/) (tema custom, sin librerías de UI) |
| Animación           | [GSAP](https://gsap.com/) (ScrollTrigger, SplitText, matchMedia)          |
| Scroll suave        | [Lenis](https://github.com/studio-freight/lenis)                           |
| Iconos              | [Lucide React](https://lucide.dev/)                                        |

No se usan librerías de componentes (MUI, shadcn, etc.) — cada pieza de UI (bento grid, cursor custom, marquee, timeline, magnetic buttons) está escrita a mano para tener control total sobre el detalle de interacción.

## Decisiones técnicas relevantes

- **Animaciones con `gsap.context` + `matchMedia`**: cada componente limpia sus propios tweens al desmontar y respeta `prefers-reduced-motion`, degradando a estados estáticos en vez de desactivar la sección.
- **Cursor custom** solo se activa en dispositivos con puntero fino (`pointer: fine`) y también respeta `prefers-reduced-motion`.
- **Datos separados de la UI**: proyectos, experiencia y stack viven en [`src/data/portfolio.ts`](./src/data/portfolio.ts) como single source of truth tipada.
- **Accesibilidad**: estados de foco visibles (`focus-visible`) en todos los elementos interactivos, texto alternativo para contenido decorativo (`aria-hidden`) con fallback `sr-only` para el texto rotativo del hero.
- **Sin backend**: el formulario de contacto arma un `mailto:` con los datos precargados — cero dependencias de servicios de terceros para un caso de uso tan simple.

## Estructura

```
src/
├── components/     # Componentes de sección y UI (Hero, Projects, Contact, etc.)
├── data/           # Contenido tipado (stack, proyectos, experiencia)
├── hooks/          # Hooks custom (integración Lenis + GSAP ScrollTrigger)
├── index.css       # Tailwind base/components/utilities + estilos globales
└── main.tsx        # Entry point
```

## Correr localmente

```bash
npm install
npm run dev        # servidor de desarrollo (Vite)
npm run build       # build de producción (tsc -b && vite build)
npm run preview     # sirve el build de dist/
npm run typecheck   # chequeo de tipos sin emitir
```

## Contacto

- Email: cisnerosaa25@gmail.com
- GitHub: [@antonycisneros](https://github.com/antonycisneros)
- LinkedIn: [antony-cisneros-benavides](https://www.linkedin.com/in/antony-cisneros-benavides-9118a4324)
