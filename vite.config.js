import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    build: {
      minify: isProduction,
      sourcemap: !isProduction,
    },
    plugins: [react()],
  };
});