⚠️ Warning: This is under construction! Package still yet to be published

# astro-integration-elm 🌳

This **[Astro integration](https://docs.astro.build/en/guides/integrations-guide/)** enables server-side rendering and client-side hydration for your [Elm](https://elm-lang.org/) components.

## Installation

First, install the `astro-integration-elm` package:

```sh
npm install astro-integration-elm
```

Most package managers will install associated peer dependencies as well. Still, if you see a "Cannot find package 'elm'" (or similar) warning when you start up Astro, you'll need to install Elm:

```sh
npm install elm
```

Now, apply this integration to your `astro.config.*` file using the `integrations` property:

_astro.config.mjs_

```diff
+import elm from "astro-integration-elm";

export default {
  // ...
+ integrations: [elm()],
};
```

Finally, run `elm init` to create an `elm.json`, and change `source-directories` to reflect the directories you plan to put your Elm components in.

```bash
npx elm init
```

_elm.json_

```diff
  "source-directories": [
+   "src"
-   "src/components"
  ],
```

(If you're using `git` you should probably also add the `elm-stuff` folder to your `.gitignore`)

## An example Elm component

_src/pages/index.astro_

```jsx
---
import Hello from "../components/Hello.elm";
---

<html>
  <body>
    <Hello /> from Astro and Elm!
  </body>
</html>
```

_src/components/Hello.elm_

```elm
module Hello exposing (main)

import Html

main = Html.text "Hello world"
```

Now start up the dev server...

```
npm run astro dev
```

... and you should see your server side rendered Elm! 🥳

## Next steps

### Learn Astro

To learn the Astro's concepts, head to the [UI framework documentation](https://docs.astro.build/en/core-concepts/framework-components/). You'll explore:

- 📦 how framework components are loaded,
- 💧 client-side hydration options, and
- 🤝 opportunities to mix and nest frameworks together

### Learn Elm

If you're not already familiar with Elm, a great place to start is the [Official Guide](https://guide.elm-lang.org).

### More about the Elm Astro Integration

➡️ For some more interesting examples of `astro-integration-elm`, see the [guide in the docs](docs/guide.md) or check out the [announcement post on my blog](https://www.angusjf.com/elm-astro).
