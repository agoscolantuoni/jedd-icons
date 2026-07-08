import { fileURLToPath } from "node:url";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import mdx from "fumadocs-mdx/vite";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    mdx(),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        // Prerender only the explicit entry pages; don't spider every
        // discovered link (which would statically generate all icon routes).
        crawlLinks: false,
      },
    }),
    react(),
  ],
  resolve: {
    tsconfigPaths: true,
    alias: {
      // Explicit alias so `@/*` resolves everywhere, including from MDX
      // virtual modules where the tsconfigPaths resolver doesn't apply.
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      tslib: "tslib/tslib.es6.js",
    },
  },
});
