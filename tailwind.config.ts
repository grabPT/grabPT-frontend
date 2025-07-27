import scrollbarHide from 'tailwind-scrollbar-hide';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [scrollbarHide],
};

export default config;
