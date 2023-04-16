import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';


export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@projects': path.resolve(__dirname, 'src/projects'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
    },
  },
  
})
