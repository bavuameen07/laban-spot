import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { fontFamily: { sans: ['var(--font-jakarta)', 'sans-serif'] }, colors: { laban: { blue: '#073fd8', deep: '#0638c3', bright: '#087ff2', sky: '#4196ff', cream: '#ffedca' } } } },
  plugins: [],
} satisfies Config;
