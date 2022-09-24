// import { JSDOM } from "jsdom";
// import * as jsdom from "jsdom";

function check(Component) {
  return true;
}

async function renderToStaticMarkup(Component, props, slotted) {
  let html = "";

  const node = {};
  node.appendChild = (n) => {
    // console.log("appendChild", n);
  };
  node.replaceChild = (a, b) => {
    // console.log("replaceChild", { a, b });
    html += `<${a.element} class="${a.className}">${"Elm"}</span>`;
    return node;
  };
  node.parentNode = node;

  global.document.createTextNode = (text) => {
    // console.log({ textNode });
    // html += textNode;
    return { ...node, text };
  };

  global.document.createElement = (element) => {
    // console.log({ element });
    // html += `<${element}>`;
    return { ...node, element };
  };

  Component[Object.keys(Component)[0]].init({ node });

  return { html };
}

export default {
  check,
  renderToStaticMarkup,
};
