import { defineMDSveXConfig as defineConfig } from "mdsvex";

const config = defineConfig({
  extensions: [".svelte.md", ".md", ".svx"],

  smartypants: {
    dashes: "oldschool",
  },

  remarkPlugins: [],
  rehypePlugins: [],
  layout: {
    default: "src/lib/layouts/default.svelte",
    page: "src/lib/layouts/page.svelte",
    post: "src/lib/layouts/post.svelte",
  },
});

export default config;
