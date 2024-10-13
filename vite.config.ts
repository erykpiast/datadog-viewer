import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "src/icons/*",
          dest: "icons",
        },
        {
          src: "src/index.*",
          dest: "src",
        },
        {
          src: "manifest.json",
          dest: ".",
        },
      ],
    }),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: "src/panel.html",
    },
  },
});
