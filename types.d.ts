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

  declare const _default: {
    compileToStringSync: (
      elmSource: string,
      elmCompilerOptions: ElmCompilerOptions
    ) => string;

    compileToString: (
      filename: string,
      elmCompilerOptions: ElmCompilerOptions
    ) => Promise<string>;
  };

  export default _default;
}

declare module "elm-esm" {
  function toESModule(compiledElmOutput: string): string;
}
