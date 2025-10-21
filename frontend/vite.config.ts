import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils' : path.resolve(__dirname, './src/utils'),
      '@public': path.resolve(__dirname, './public'),
    },
    // Add this extensions array
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  }
});