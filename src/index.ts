import { AstroIntegration } from "astro";
import * as elm from 'node-elm-compiler';
import { toESModule } from 'elm-esm';

export default function (): AstroIntegration {
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
          vite: { plugins: [elmPlugin()] }
        });
      },
    },
  };
}

function elmPlugin(compilerOptions = {}) {
  return {
    name: 'elm',
    enforce: 'pre',
    api: {},
    async load(id, _) {
      if (!id.endsWith('.elm')) return;

      const out = toESModule(elm.compileToStringSync(id, compilerOptions));

      return `
      try {
        global.document = {}
        global.XMLHttpRequest = {}
      } catch (e) {}
      ${out}      
      export default {
        $$elm: true,
        ...Elm[Object.keys(Elm)[0]]
      }
      `
    }
  };
}