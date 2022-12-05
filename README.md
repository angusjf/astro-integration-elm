⚠️ Warning: This is under construction!

# astro-integration-elm (@astrojs/elm candidate) 🌳

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

__`astro.config.mjs`__

```js
import elm from 'astro-integration-elm';

export default {
  // ...
  integrations: [elm()],
}
```

## Getting started

To use your first Elm component in Astro, head to our [UI framework documentation](https://docs.astro.build/en/core-concepts/framework-components/). You'll explore:
- 📦 how framework components are loaded,
- 💧 client-side hydration options, and
- 🤝 opportunities to mix and nest frameworks together

## First Steps

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

## Next Steps
➡️ For some more interesting examples, see the [guide in the docs](docs/guide.md).