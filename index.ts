import { AstroIntegration } from "astro";
import type { ElmCompilerOptions } from "node-elm-compiler";
import nodeElm from "node-elm-compiler";
import { toESModule } from "elm-esm";
import { Connect, Plugin } from "vite";

const { compileToString } = nodeElm;

export default (
  elmCompilerOptions: ElmCompilerOptions = {}
): AstroIntegration => ({
  name: "astro-integration-elm",
  hooks: {
    "astro:server:setup": (options) => {
      options.server.middlewares.use(devServerMiddleware(elmCompilerOptions));
    },
    "astro:config:setup": ({ command, addRenderer, updateConfig }) => {
      if (
        command !== "dev" &&
        !elmCompilerOptions.debug &&
        elmCompilerOptions.optimize === undefined
      ) {
        elmCompilerOptions.optimize = true;
      }
      addRenderer({
        name: "astro-integration-elm",
        serverEntrypoint: "astro-integration-elm/elm-server.js",
        clientEntrypoint: "astro-integration-elm/elm-client.js",
      });
      updateConfig({
        vite: { plugins: [elmPlugin(elmCompilerOptions)] },
      });
    },
  },
});

const elmPlugin = (elmCompilerOptions: ElmCompilerOptions): Plugin => ({
  name: "vite-plugin-elm",
  async transform(code, id, options) {
    if (!id.endsWith(".elm")) return;
    return compile(id, elmCompilerOptions);
  },
});

const devServerMiddleware =
  (elmCompilerOptions: ElmCompilerOptions): Connect.NextHandleFunction =>
  async (req, res, next) => {
    if (req.originalUrl?.endsWith(".elm")) {
      const filename = req.originalUrl.replace("/@fs", "");
      const compiled = await compile(filename, elmCompilerOptions);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/javascript");
      res.end(compiled);
    } else {
      next();
    }
  };

const compile = async (
  filename: string,
  options: ElmCompilerOptions
): Promise<string> => {
  const compiled = await compileToString(filename, options);
  const esModule = toESModule(compiled);
  return `
    try {
      global.document = {}
      global.XMLHttpRequest = {}
    } catch (e) {}
    ${esModule}      
    export default {
      $$elm: true,
      ...Elm[Object.keys(Elm)[0]]
    }
    `;
};