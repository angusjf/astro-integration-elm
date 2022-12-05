export default (target) => {
  return (Component, { unsafeSetup, ...props }) => {
    if (!target.hasAttribute('ssr')) return;

    const app = Component.init({
      node: target,
      flags: props
    })

    if (unsafeSetup) {
      eval(unsafeSetup)(app);
    }
  };
};