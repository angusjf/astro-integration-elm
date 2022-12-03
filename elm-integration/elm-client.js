export default (element) => {
  console.log({ element });
  return (Component, props, slotted, { client }) => {
    console.log(element);
    console.log({ Component, props, slotted });
    return;
  };
};