import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/team-BrownBryce-project/',  // Replace with your actual GitHub repo name
});
