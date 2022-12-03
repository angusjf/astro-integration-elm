import { defineConfig } from "astro/config";
import elmIntegration from "./elm-integration";

// https://astro.build/config
export default defineConfig({
  integrations: [elmIntegration()],
});
