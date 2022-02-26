import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";
const dev = process.env.NODE_ENV === "development";

const config = {
  kit: {
    adapter: adapter({
      pages: "docs",
      assets: "docs",
    }),

    paths: {
      base: dev ? "" : "/yuyutsu",
    },
    appDir: "app",
  },
  preprocess: [preprocess({})],
};

export default config;
