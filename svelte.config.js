import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-auto";

const config = {
  kit: {
    adapter: adapter(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
  },
  preprocess: [preprocess({})],
};

export default config;
