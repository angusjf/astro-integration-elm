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
    // console.log('createTextNode', x)
    let e = document.createTextNode(...x);
    return e;
  };

  global.document.createElement = (...x) => {
    // console.log(x);
    let e = document.createElement(...x);
    // console.log(e);
    return e;
  };

  Component.init({
    node: document.getElementById('app')
  });

  const html = dom.serialize()

  return {
    html
  };
}

export default {
  check,
  renderToStaticMarkup,
};
