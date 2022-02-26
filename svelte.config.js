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
  },
  preprocess: [preprocess({})],
};

export default config;
