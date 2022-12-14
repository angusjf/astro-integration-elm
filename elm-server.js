import { parseHTML } from "linkedom";
import { XMLHttpRequest } from "xmlhttprequest";

const trueSetTimeout = setTimeout;
const trueRequestAnimationFrame = requestAnimationFrame;

function check(Component) {
  return Component.$$elm;
}

function requestAnimationFrame(callback) {}

function setTimeout(callback, millis) {}

function addEventListener() {}

function addListeners(node) {
  node.addEventListener = addEventListener;

  let parent = { current: node.parentNode };

  if (!Object.getOwnPropertyDescriptor(node, "parentNode")?.set) {
    Object.defineProperty(node, "parentNode", {
      get() {
        return parent.current;
      },
      set(newParent) {
        parent.current = newParent;
      },
    });
  }

  if (!Object.getOwnPropertyDescriptor(node, "value")?.set) {
    let value = { current: node.value };
    Object.defineProperty(node, "value", {
      get() {
        return value.current;
      },
      set(newValue) {
        value.current = newValue;
      },
    });
  }
}

async function renderToStaticMarkup(Component, props, slotted) {
  const dom = parseHTML(
    `<html><head></head><body><div id="app"></div></body></html>`
  );

  const document = dom.window.document;

  global.document.createElementNS = (...args) => {
    const node = document.createElementNS(...args);
    addListeners(node);
    return node;
  };

  global.document.replaceChild = (...args) => {
    const node = document.replaceChild(...args);
    addListeners(node);
    return node;
  };

  global.document.createTextNode = (...args) => {
    const node = document.createTextNode(...args);
    addListeners(node);
    return node;
  };

  global.document.createElement = (...args) => {
    const node = document.createElement(...args);
    addListeners(node);
    return node;
  };

  global.document.createDocumentFragment = (...args) => {
    const node = document.createDocumentFragment(...args);
    addListeners(node);
    return node;
  };

  addListeners(global.document);
  addListeners(document.body);

  global.document.body = document.body;

  global.document.title = document.title;

  global.XMLHttpRequest = XMLHttpRequest;

  global.requestAnimationFrame = requestAnimationFrame;

  global.setTimeout = setTimeout;

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

  global.setTimeout = trueSetTimeout;
  global.requestAnimationFrameout = trueRequestAnimationFrame;

  return {
    html: document.toString(),
  };
}

export default {
  check,
  renderToStaticMarkup,
};
