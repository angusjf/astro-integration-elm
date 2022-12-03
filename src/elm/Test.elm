module Test exposing (main)

import Html exposing (ol, span, text)
import Html.Attributes exposing (class, style)


main =
    ol [] <| List.map listItem data


data =
    [ "astro", "islands", "architecture" ]


listItem : String -> Html.Html msg
listItem s =
    Html.li
        [ style "font-weight" "bold" ]
        [ Html.text s ]
