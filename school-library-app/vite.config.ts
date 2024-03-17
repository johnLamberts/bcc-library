import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths()],
  optimizeDeps: {
    /**
     * This is required only because we use "npm link" for
     * testing purposes. See `dependencies` in `package.json`.
     */
    include: ["@ckeditor/ckeditor5-react"],
  },
});
