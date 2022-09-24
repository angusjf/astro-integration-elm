import { AstroIntegration } from "astro";
import elmPlugin from "vite-plugin-elm";

const viteConfiguration = { plugins: [elmPlugin()] };

export default function (): AstroIntegration {
  // @ts-ignore
  global.document = {};
  return {
    name: "elm",
    hooks: {
      "astro:config:setup": ({ addRenderer, updateConfig }) => {
        addRenderer({
          name: "elm",
          serverEntrypoint: "./elm-integration/elm-server.js",
          clientEntrypoint: "./elm-integration/elm-client.js",
        });
        updateConfig({
          vite: viteConfiguration,
        });
      },
    },
  };
}
