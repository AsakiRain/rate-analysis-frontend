import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.ts', '.tsx', '.jsx']
  },
  base: '/',
  mode: 'development',
  server: {
    port: 4000,
    open: true
  }
});
