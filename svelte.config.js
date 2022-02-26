import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";
const dev = process.env.NODE_ENV === 'development';

const config = {
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: null,
      precompress: false,
    }),

    paths: {
      base: dev ? "" : "/yuyutsu",
    },
    // If you are not using a .nojekyll file, change your appDir to something not starting with an underscore.
    // For example, instead of '_app', use 'app_', 'internal', etc.
    appDir: "internal",
  },
  preprocess: [preprocess({})],
};

export default config;
