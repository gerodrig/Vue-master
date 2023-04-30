import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@projects': path.resolve(__dirname, 'src/projects'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@helpers': path.resolve(__dirname, 'src/helpers'),
    '@api': path.resolve(__dirname, '/src/api'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@layouts': path.resolve(__dirname, 'src/layouts'),
    '@views': path.resolve(__dirname, 'src/views'),
    '@store': path.resolve(__dirname, 'src/store'),
  },
}
});
