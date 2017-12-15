open Webapi.Dom;
exception CannotGetBody;

let applyIfSome = (f: 'a => option('b)) =>
  fun
  | Some(v) => f(v)
  | None => None;

document
  |> Document.addEventListener("DOMContentLoaded", (_) => {
    let div = Document.createElement("div", document);
    Element.setAttribute("id", "main", div);

    let body = document
      |> Document.asHtmlDocument
      |> applyIfSome(HtmlDocument.body);

    switch (body) {
      | Some(body) => Element.appendChild(div, body)
      | None => raise(CannotGetBody)
    };

    ReactDOMRe.renderToElementWithId(<Page message="Hello!" />, "main");
  });
