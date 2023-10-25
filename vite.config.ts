import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vitejs.dev/config/

const pageNames = ["page2"];

const getPageHTML = (rootDir: string, pageName: string) => resolve(rootDir, `${pageName}.html`);

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  server: {
    open: true,
  },
  build: {
    assetsDir: "",
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        ...pageNames.reduce((inputConfig: { [key: string]: string }, name) => {
          // eslint-disable-next-line no-param-reassign
          inputConfig[`${name}`] = getPageHTML(__dirname, name);
          return inputConfig;
        }, {}),
      },
      output: {
        assetFileNames: (fileData) => {
          const { name } = fileData;
          const extType = name.split(".").at(-1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/[name]-[hash][extname]`;
          }
          return `[name]/[name]-[hash][extname]`;
        },
        entryFileNames: "[name]/[name]-[hash].js",
      },
    },
  },
});
