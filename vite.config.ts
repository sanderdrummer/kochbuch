import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxFactory: "jsx",
    // https://github.com/vitejs/vite/pull/8674/files
    logOverride: {
      "this-is-undefined-in-esm": "silent",
    },
    jsxInject: `import { jsx } from '@emotion/react'`,
  },
  plugins: [
    reactRefresh({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
});
