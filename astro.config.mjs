import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import vue from "@astrojs/vue";
import rehypePrettyCode from "rehype-pretty-code";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
const prettyCodeOptions = {
  theme: 'one-dark-pro',
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{
        type: "text",
        value: " "
      }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word"];
  },
  tokensMap: {}
};


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), vue(), mdx(), react()],
  markdown: {
    extendDefaultPlugins: true,
    syntaxHighlight: false,
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]]
  }
});