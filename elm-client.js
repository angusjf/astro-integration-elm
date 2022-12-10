export default (target) => {
  return (Component, { unsafeSetup, ...props }) => {
    if (!target.hasAttribute("ssr")) return;

    props.server = false;

    const app = Component.init({
      node: target,
      flags: props,
    });

    if (unsafeSetup) {
      eval(unsafeSetup)(app);
    }
  };
};
