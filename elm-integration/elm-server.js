import { JSDOM } from "jsdom";

function check(Component) {
  return Component.$$elm;
}

async function renderToStaticMarkup(Component, props, slotted) {
  const dom = new JSDOM(`<html><head></head><body><div id="app"></div></body></html>`);
  const document = dom.window.document;

  global.document.createElementNS = (...x) => {
    return document.createElementNS(...x)
  };
  
  global.document.replaceChild = (...x) => {
    return document.replaceChild(...x);
  };

  global.document.createTextNode = (...x) =>{
    return document.createTextNode(...x);
  };

  global.document.createElement = (...x) => {
    return document.createElement(...x);
  };

  Component.init({
    node: document.getElementById('app')
  });

  return {
    html: dom.serialize()
  };
}

export default {
  check,
  renderToStaticMarkup,
};
