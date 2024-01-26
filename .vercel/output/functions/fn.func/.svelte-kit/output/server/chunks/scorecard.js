import { c as create_ssr_component, e as escape } from "./ssr.js";
const Scorecard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { text = "" } = $$props;
  let { textcolor = "" } = $$props;
  let { bgcolor = "" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.textcolor === void 0 && $$bindings.textcolor && textcolor !== void 0)
    $$bindings.textcolor(textcolor);
  if ($$props.bgcolor === void 0 && $$bindings.bgcolor && bgcolor !== void 0)
    $$bindings.bgcolor(bgcolor);
  return `<div class="card-wrapper"><div class="${"card no-after shadow rounded bg-" + escape(bgcolor, true)}"><div class="card-body"><h3 class="${"card-title h4 text-" + escape(textcolor, true)}">${escape(title)}</h3> <p class="${"card-text text-" + escape(textcolor, true)}">${escape(text)}</p></div></div></div>`;
});
export {
  Scorecard as S
};
