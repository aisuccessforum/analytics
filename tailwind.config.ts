import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#EEF0EC',
        surface: '#FFFFFF',
        ink: '#1B2420',
        'ink-soft': '#4B564F',
        petrol: '#0B5D52',
        'petrol-dark': '#08423A',
        brass: '#A9822E',
        border: '#D8DBD3',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-plex-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        prose: '42rem',
      },
    },
  },
  plugins: [],
};

export default config;
