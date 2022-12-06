// types for 'node-elm-compiler'

declare module "node-elm-compiler" {
  type ElmCompilerOption =
    | "spawn"
    | "cwd"
    | "pathToElm"
    | "help"
    | "output"
    | "report"
    | "debug"
    | "verbose"
    | "processOpts"
    | "docs"
    | "optimize";

  export type ElmCompilerOptions = Partial<Record<ElmCompilerOption, unknown>>;

  export default {
    compileToStringSync: (
      elmSource: string,
      elmCompilerOptions: ElmCompilerOptions
    ) => string,

    compileToString: async (
      filename: string,
      elmCompilerOptions: ElmCompilerOptions
    ) => Promise<string>,
  };
}

declare module "elm-esm" {
  function toESModule(compiledElmOutput: string): string;
}