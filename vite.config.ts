import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    global: 'window', // ← 핵심
  },
  resolve: {
    alias: [
      // lottie-react 내부에서 참조하는 lottie-web을 SVG 전용 빌드로 대체
      { find: 'lottie-web', replacement: 'lottie-web/build/player/lottie_svg.min.js' },
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
});
