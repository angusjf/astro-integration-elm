module Test exposing (main)

import Browser
import Debug exposing (toString)
import Html exposing (button, div, ol, span, text)
import Html.Attributes exposing (class, style)
import Html.Events exposing (onClick)


main =
    Browser.sandbox
        { init = 9
        , view = view
        , update = update
        }


type Msg
    = Inc
    | Dec


update msg n =
    case msg of
        Inc ->
            n + 1

        Dec ->
            n - 1


view n =
    div []
        [ ol [] <| List.map listItem data
        , text <| toString n
        , button [ onClick Inc ] [ text "+" ]
        , button [ onClick Dec ] [ text "-" ]
        ]


data =
    [ "astro", "islands", "architecture" ]


listItem : String -> Html.Html msg
listItem s =
    Html.li
        [ style "font-weight" "bold" ]
        [ Html.text s ]
