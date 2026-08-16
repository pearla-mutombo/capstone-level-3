import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import { repoRoot } from "./config/repoRoot.js";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  base: repoRoot,

  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});

// Note: I configured Vite with my GitHub Pages base path so my React
// application knows where it is deployed. I also configured a development
//  proxy so API requests from my React frontend can communicate with my
// local Express server without having to put the localhost server address
// throughout my components.
