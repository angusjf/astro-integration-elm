import { AstroIntegration } from "astro";
import * as elm from 'node-elm-compiler';
import { toESModule } from 'elm-esm';

export default function (): AstroIntegration {
  return {
    name: "elm",
    hooks: {
      "astro:config:setup": ({ addRenderer, updateConfig, addPageExtension }) => {
        addPageExtension('.elm');
        addRenderer({
          name: "elm",
          serverEntrypoint: "./elm-integration/elm-server.js",
          clientEntrypoint: "./elm-integration/elm-client.js",
        });
        updateConfig({
          vite: { plugins: [elmPlugin({debug: false, optimize: false})] }
        });
      },
    },
  };
}

const elmPlugin = (_) => {
  let MINE = {
    name: 'elm',
    enforce: 'pre',
    api: {},
    async load(id, _) {
      if (!id.endsWith('.elm')) return;
      const out = toESModule(elm.compileToStringSync(id, {}));
      console.log("___________ ->", id)
      return `
      try {
        global.document = {}
      } catch (e) {}
      ${out}      
      export default {
        $$elm: true,
        ...Elm[Object.keys(Elm)[0]]
      }
      `
    }
  };

  return MINE;
}