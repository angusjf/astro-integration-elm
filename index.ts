import { AstroIntegration } from "astro";
import { ElmCompilerOptions, compileToStringSync } from "node-elm-compiler";
import { toESModule } from "elm-esm";
import { Connect, Plugin } from "vite";

export default (
  elmCompilerOptions: ElmCompilerOptions = {}
): AstroIntegration => ({
  name: "elm-astro-integration",
  hooks: {
    "astro:server:setup": (options) => {
      options.server.middlewares.use(devServerMiddleware(elmCompilerOptions));
    },
    "astro:config:setup": ({ addRenderer, updateConfig }) => {
      addRenderer({
        name: "elm-astro-integration",
        serverEntrypoint: "elm-astro-integration/elm-server.js",
        clientEntrypoint: "elm-astro-integration/elm-client.js",
      });
      updateConfig({
        vite: { plugins: [elmPlugin(elmCompilerOptions)] },
      });
    },
  },
});

const elmPlugin = (elmCompilerOptions: ElmCompilerOptions): Plugin => ({
  name: "vite-plugin-elm",
  transform(code, id, _: unknown) {
    if (!id.endsWith(".elm")) return;
    return compile(id, elmCompilerOptions);
  },
});

const devServerMiddleware =
  (elmCompilerOptions: ElmCompilerOptions): Connect.NextHandleFunction =>
  (req, res, next) => {
    if (req.originalUrl?.endsWith(".elm")) {
      const filename = (req.originalUrl as string).replace("/@fs", "");
      const compiled = compile(filename, elmCompilerOptions);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/javascript");
      res.end(compiled);
    } else {
      next();
    }
  };

const compile = (filename: string, options: ElmCompilerOptions): string => {
  const out = toESModule(compileToStringSync(filename, options));
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
    `;
};
