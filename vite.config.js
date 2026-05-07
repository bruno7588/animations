import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        successAnimation: resolve(__dirname, 'demos/success-animation.html'),
        medallionAnimation: resolve(__dirname, 'demos/medallion-animation.html'),
      },
    },
  },
});
