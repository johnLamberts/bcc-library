import { defineConfig } from "vite";
import { createRequire } from "node:module";

import tsconfigPaths from "vite-tsconfig-paths";
const require = createRequire(import.meta.url);

import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    ckeditor5({ theme: require.resolve("@ckeditor/ckeditor5-theme-lark") }),
  ],
  optimizeDeps: {
    /**
     * This is required only because we use "npm link" for
     * testing purposes. See `dependencies` in `package.json`.
     */
    include: ["@ckeditor/ckeditor5-react"],
  },
});
