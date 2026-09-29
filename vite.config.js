import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    host: true,
    watch: {
      ignored: [
        '**/videos/**',
        '**/*.crdownload',
        '**/*.mp4',
        '**/New folder/**',
        '**/dist/**',
        '**/.git/**'
      ]
    }
  }
});
