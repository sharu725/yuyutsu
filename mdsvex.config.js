import { defineMDSveXConfig as defineConfig } from "mdsvex";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const path_to_layout = join(__dirname, "./src/lib/layouts");

const config = defineConfig({
  extensions: [".svelte.md", ".md", ".svx"],

  smartypants: {
    dashes: "oldschool",
  },

  remarkPlugins: [],
  rehypePlugins: [],

  layout: {
    default: path_to_layout + "/default.svelte",
    page: path_to_layout + "/page.svelte",
    post: path_to_layout + "/post.svelte",
  },
});

export default config;
