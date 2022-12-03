module Test exposing (main)

import Browser
import Debug exposing (toString)
import Html exposing (button, div, h2, ol, text)
import Html.Attributes exposing (style)
import Html.Events exposing (onClick)
import Json.Decode as D
import Json.Encode as E


type alias Model =
    { name : String
    , count : Int
    }


main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }


init : D.Value -> ( Model, Cmd msg )
init flags =
    ( Result.withDefault
        { name = "", count = 0 }
      <|
        D.decodeValue
            flagsDecoder
            (Debug.log (E.encode 2 flags)
                flags
            )
    , Cmd.none
    )


flagsDecoder : D.Decoder Model
flagsDecoder =
    D.map2
        Model
        (D.field "name" D.string)
        (D.field "count" D.int)


type Msg
    = Inc
    | Dec


update msg model =
    case msg of
        Inc ->
            ( { model | count = model.count + 1 }
            , Cmd.none
            )

        Dec ->
            ( { model | count = model.count - 1 }
            , Cmd.none
            )


view { name, count } =
    div []
        [ ol [] <| List.map listItem data
        , h2 [] [ text ("Hello, " ++ name ++ "!") ]
        , text <| toString count
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
