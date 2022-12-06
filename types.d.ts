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

  function compileToStringSync(
    elmSource: string,
    elmCompilerOptions: ElmCompilerOptions
  ): string;
}

declare module "elm-esm" {
  function toESModule(compiledElmOutput: string): string;
}
