import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base: './'` keeps asset URLs relative, so the build works on GitHub Pages.
export default defineConfig({
  plugins: [react()],
  base: './',
});
