import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/components/index.js"),
      name: "vite-test-lib",
      fileName: (format) => {
        const isESM = "es" === format;
        return isESM ? `vite-test-lib.mjs` : `vite-test-lib.${format}.js`;
      },
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
