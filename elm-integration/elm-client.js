export default (target) => {
  console.log({ target });
  return (Component, { setup: unsafeSetup, ...props }, slotted, { client }) => {
    console.log({ Component, props, slotted });

    if (!target.hasAttribute('ssr')) return;

    const app = Component.init({
      node: target,
      flags: props
    })

    eval(unsafeSetup)(app);

    // new Component({
    //   target,
    //   props: {
    //     ...props,
    //     $$slots: slots,
    //     $$scope: { ctx: [] },
    //   },
    //   hydrate: client !== 'only',
    //   $$inline: true,
    // });
    // // return "UHHH WHAT THOUGH";
		// const slots = {};
		// for (const [key, value] of Object.entries(slotted)) {
		// 	slots[key] = createSlotDefinition(key, value);
		// }
		// try {
		// } catch (e) {}
  };
};