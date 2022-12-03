import { JSDOM } from "jsdom";
// import * as jsdom from "jsdom";

function check(Component) {
  return true;
}

async function renderToStaticMarkup(Component, props, slotted) {
  const dom = new JSDOM(`<div id="app"></div>`);
  const document = dom.window.document;

  global.document.createElementNS = (...x) => {
    return document.createElementNS(...x)
  };
  global.document.replaceChild = document.replaceChild;
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
  }

  Component[Object.keys(Component)[0]].init({
    node: document.getElementById('app')
  });

  return { html: dom.serialize() };
}

export default {
  check,
  renderToStaticMarkup,
};
