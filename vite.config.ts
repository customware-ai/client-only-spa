import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";

/**
 * The Rolldown Babel plugin ships a stricter declaration than the README
 * example implies, so the options are typed through the plugin signature here.
 */
const reactCompilerBabelOptions = {
  parserOpts: {
    plugins: ["jsx", "typescript"],
  },
  presets: [reactCompilerPreset()],
} as Parameters<typeof babel>[0];

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    react(),
    /**
     * `reactCompilerPreset()` already wires the React Compiler with the
     * Rolldown-aware file filter expected by `@vitejs/plugin-react` v6.
     * Keeping an extra raw Babel plugin here makes Babel parse React Router's
     * virtual `*.tsx?__react-router-*` modules directly, which breaks on type
     * imports during Vite 8 builds.
     */
    babel(reactCompilerBabelOptions),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
