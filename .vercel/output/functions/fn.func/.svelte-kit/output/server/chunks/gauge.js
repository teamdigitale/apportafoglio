import { c as create_ssr_component, d as add_attribute } from "./ssr.js";
const css = {
  code: ".isgauge.svelte-ib6foy{display:flex;flex-flow:row wrap;justify-content:center;align-items:center;text-align:center}",
  map: null
};
const Gauge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id = "-s" } = $$props;
  let { pvalue = 0 } = $$props;
  let { label = "%" } = $$props;
  let { values } = $$props;
  let chart;
  let options = {
    fontName: "Titillium Web",
    redFrom: 0,
    redTo: 40,
    yellowFrom: 40,
    yellowTo: 90,
    greenFrom: 90,
    greenTo: 100,
    minorTicks: 2,
    max: 100,
    animation: { easing: "out", duration: 500 },
    majorTicks: ["0", "25", "50", "75", "100"]
  };
  const getValidCharData = (d, isFirtsRowLabels) => {
    if (window.google === void 0 || !values)
      return;
    const g = window.google;
    if (Array.isArray(d)) {
      return g.visualization.arrayToDataTable(d, isFirtsRowLabels);
    }
    if (typeof d !== "object")
      return;
    return new g.visualization.DataTable(values);
  };
  const redraw = (ch, dd, ops) => {
    if (!ch || !dd)
      return;
    const d = getValidCharData(dd);
    if (!d)
      return;
    const formatter = new google.visualization.NumberFormat({ suffix: "%", pattern: "#" });
    formatter.format(d, 1);
    ch.draw(d, ops);
  };
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.pvalue === void 0 && $$bindings.pvalue && pvalue !== void 0)
    $$bindings.pvalue(pvalue);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.values === void 0 && $$bindings.values && values !== void 0)
    $$bindings.values(values);
  $$result.css.add(css);
  {
    redraw(chart, values, options);
  }
  return ` <div${add_attribute("id", id, 0)} class="isgauge svelte-ib6foy"></div>`;
});
export {
  Gauge as G
};
