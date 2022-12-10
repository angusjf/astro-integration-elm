import { parseHTML } from "linkedom";
import { XMLHttpRequest } from "xmlhttprequest";

function check(Component) {
  return Component.$$elm;
}

async function renderToStaticMarkup(Component, props, slotted) {
  const dom = parseHTML(
    `<html><head></head><body><div id="app"></div></body></html>`
  );

  const document = dom.window.document;

  global.document.createElementNS = (...args) => {
    return document.createElementNS(...args);
  };

  global.document.replaceChild = (...args) => {
    return document.replaceChild(...args);
  };

  global.document.createTextNode = (...args) => {
    return document.createTextNode(...args);
  };

  global.document.createElement = (...args) => {
    return document.createElement(...args);
  };

  global.document.createDocumentFragment = (...args) => {
    return document.createDocumentFragment(...args);
  };

  global.document.body = document.body;

  global.document.title = document.title;

  global.XMLHttpRequest = XMLHttpRequest;

  props.server = true;

  try {
    Component.init({
      node: document.getElementById("app"),
      flags: props,
    });
  } catch (e) {
    // we allow `init` to fail, as the problem could be something that only
    // happens on the server, and it will occur in the client's browser
    console.error("Error server rending Elm component:");
    console.error(e);
  }

  return {
    html: document.toString(),
  };
}

export default {
  check,
  renderToStaticMarkup,
};
