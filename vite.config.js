import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // base: 'https://3-Brown-Bryce.github.io/team-BrownBryce-project',  // Replace with your actual GitHub repo name
  base: '/',
});
