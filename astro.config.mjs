import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import db from "@astrojs/db";
import node from "@astrojs/node";

import qwikdev from "@qwikdev/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), db(), qwikdev()],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});