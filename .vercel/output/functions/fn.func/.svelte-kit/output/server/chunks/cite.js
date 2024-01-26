import { c as create_ssr_component, e as escape, d as add_attribute } from "./ssr.js";
const Cite = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { text = "" } = $$props;
  let { author = "" } = $$props;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.author === void 0 && $$bindings.author && author !== void 0)
    $$bindings.author(author);
  return `<blockquote class="blockquote blockquote-card text-end"><p class="mb-0 mt-0">${escape(text)}</p> <footer class="blockquote-footer"><cite${add_attribute("title", author, 0)}>${escape(author)}</cite></footer></blockquote>`;
});
export {
  Cite as C
};
