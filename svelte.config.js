import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";
const dev = process.env.NODE_ENV === "development";

const config = {
  extensions: [".svelte", ...mdsvexConfig.extensions],

  kit: {
    adapter: adapter({
      pages: "docs",
      assets: "docs",
    }),
    // Enable below line and change /yuyutsu to /<your-repo-name> to host the site on github pages
    // paths: {
    //   base: dev ? "" : "/yuyutsu",
    // },
    appDir: "app",
  },

  preprocess: [preprocess({}), mdsvex(mdsvexConfig)],
};

export default config;
