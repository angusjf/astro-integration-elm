import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import elmIntegration from "./elm-integration";

// https://astro.build/config
export default defineConfig({
  integrations: [elmIntegration()
    // , vue()
  ],
});
