import { AstroIntegration } from "astro";
import * as elm from 'node-elm-compiler';
import { toESModule } from 'elm-esm';

// from 'node-elm-compiler'
type ElmCompilerOption = 
  | 'spawn'
  | 'cwd'
  | 'pathToElm'
  | 'help'
  | 'output'
  | 'report'
  | 'debug'
  | 'verbose'
  | 'processOpts'
  | 'docs'
  | 'optimize'

type CompilerOptions = Partial<Record<ElmCompilerOption, unknown>>

export default function (): AstroIntegration {
  return {
    name: "elm-astro-integration",
    hooks: {
      "astro:server:setup": (options) => {
        options.server.middlewares.use((req, res, next) => {
          if (req.originalUrl.endsWith('.elm')) {
            const filename = (req.originalUrl as string).replace("/@fs", "")
            const compiled = compile(filename)
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/javascript')
            res.end(compiled)
          } else {
            next()
          }
        })
      },
      "astro:config:setup": ({ addRenderer, updateConfig }) => {
        addRenderer({
          name: "elm-astro-integration",
          serverEntrypoint: "./elm-integration/elm-server.js",
          clientEntrypoint: "./elm-integration/elm-client.js",
        });
        updateConfig({
          vite: { plugins: [elmPlugin] }
        });
      },
    },
  };
}

const elmPlugin = {
  name: 'vite-plugin-elm',
  transform(code, id, _: unknown) {
    if (!id.endsWith('.elm')) return;
    return compile(id)
  }
}

function compile(filename) {
    const out = toESModule(elm.compileToStringSync(filename, {}));
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