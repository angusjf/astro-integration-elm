⚠️ Warning: This is under construction!

# astro-integration-elm (@astrojs/elm candidate) 🌳

This **[Astro integration](https://docs.astro.build/en/guides/integrations-guide/)** enables server-side rendering and client-side hydration for your [Elm](https://elm-lang.org/) components.

## Installation

First, install the `astro-integration-elm` package:

```sh
npm install astro-integration-elm
```

Most package managers will install associated peer dependencies as well. Still, if you see a "Cannot find package 'svelte'" (or similar) warning when you start up Astro, you'll need to install Elm:

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

## Elm integration

Astro `props` map very neatly onto Elm `flags`, and an Astro component (or island) is a good fit for an Elm `element`.

__`------------- index.astro ------------- `__
```jsx
---
import Counter from "../components/Counter.elm";
---
<html>
  <body>
    <main>
      <h1>Astro and Elm:</h1>
      <Counter client:load count={99} />
    </main>
  </body>
</html>

<style>
  :root {
    font-family: Helvetica, Arial, sans-serif;
  }

  main {
    margin: auto;
    padding: 1em;
    max-width: 60ch;
  }
</style>
```


__`------------- Counter.elm ------------- `__
```elm
module Counter exposing (main)

import Browser
import Html exposing (button, div, text)
import Html.Events exposing (onClick)
import Json.Decode as D

main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }

init : D.Value -> ( Model, Cmd msg )
init flags =
    ( Result.withDefault 0 <| D.decodeValue flagsDecoder flags
    , Cmd.none
    )

flagsDecoder : D.Decoder Int
flagsDecoder =
        (D.field "count" D.int)

type Msg = Inc | Dec

update msg count =
    case msg of
        Inc -> (count + 1, Cmd.none)
        Dec -> (count - 1, Cmd.none)

view count =
    div
      [ text <| toString count
      , button [ onClick Inc ] [ text "+" ]
      , button [ onClick Dec ] [ text "-" ]
      ]
```

### Advanced: Using `ports`

Elm's ports are a great way to use web APIs that aren't available in Elm.

However, Astro [doesn't allow passing functions to hybrid props](https://guide.elm-lang.org/interop/ports.html).

The (less than ideal) solution I offer is to use the `unsafeSetup` prop.

**This is highly dangerous!**

```jsx
<Test
  client:load
  // CALLED UNSAFE FOR A REASON: Please read the docs before use.
  unsafeSetup={`(app) => {
    var socket = new WebSocket('wss://echo.websocket.org')

    app.ports.sendMessage.subscribe(function(message) {
        socket.send(message);
    })

    socket.addEventListener("message", (event) => {
        app.ports.messageReceiver.send(event.data);
    })
  }`}
/>
```

Here we can establish an (incoming and outgoing) websocket connection to the server with the `unsafeSetup` function.

The `unsafeSetup` function is evaluated **in the client's browser** with `eval`.

This can be a **huge security vulnerability**. Do not allow interpolate user-generated, external or unescaped content into the `unsafeSetup` prop.

🚨 I repeat - **do not** put anything except trusted code in this string.