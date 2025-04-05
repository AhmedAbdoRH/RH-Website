import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // لا تحتاج عادةً إلى assetsInclude للصور المستوردة في المكونات
  // assetsInclude: ['src/assets/logo.png'],
});
