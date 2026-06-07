import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  // One output module per source file so consumers tree-shake naturally
  // (replaces Rollup's preserveModules).
  unbundle: true,
});
