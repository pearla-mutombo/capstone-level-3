import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { repoRoot } from "./config/repoRoot.js";

export default defineConfig({
  plugins: [react()],
  base: repoRoot,
})
