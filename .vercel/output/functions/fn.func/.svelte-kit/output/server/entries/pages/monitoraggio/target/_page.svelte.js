import { c as create_ssr_component, e as escape, v as validate_component } from "../../../../chunks/ssr.js";
import { C as Cite } from "../../../../chunks/cite.js";
import moment from "moment/min/moment-with-locales.js";
import { G as Gauge } from "../../../../chunks/gauge.js";
import { f as formatNumber } from "../../../../chunks/shared.js";
const Target1_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  moment.locale("it");
  let { target } = $$props;
  let { values } = $$props;
  let totale = values.reduce((a, { c }) => a = parseInt(a) + parseInt(c), 0);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  if ($$props.values === void 0 && $$bindings.values && values !== void 0)
    $$bindings.values(values);
  return `<div class="it-page-section my-5" id="target1_2"><div class="row"><div class="col-12 col-lg-12"><h6>${escape(target.misura)}: ${escape(target.trimestre)}</h6></div> <div class="col-12 col-lg-3">${validate_component(Gauge, "Gauge").$$render(
    $$result,
    {
      id: "contr-" + target.id,
      values: [
        ["Label", "Value"],
        ["", Math.round(totale / target.valore_obiettivo * 100)]
      ],
      label: target.misura
    },
    {},
    {}
  )}</div> <div class="col-12 col-lg-9"><div><p>Data di scadenza: <strong>${escape(moment(target.data, "YYYY-MM-DD").format("DD/MM/YYYY"))}</strong></p> <p>Valore obiettivo: <strong>${escape(formatNumber(target.valore_obiettivo))}</strong></p> <p>Valore alla data: <strong>${escape(formatNumber(totale))}</strong></p></div></div></div></div>`;
});
const Target1_4_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  moment.locale("it");
  let { target } = $$props;
  let { values } = $$props;
  let { platea } = $$props;
  let totale = values.reduce((a, { c }) => a = parseInt(a) + parseInt(c), 0);
  let entiInPlatea = platea.reduce((a, { c }) => a = parseInt(a) + parseInt(c), 0);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  if ($$props.values === void 0 && $$bindings.values && values !== void 0)
    $$bindings.values(values);
  if ($$props.platea === void 0 && $$bindings.platea && platea !== void 0)
    $$bindings.platea(platea);
  return `<div class="it-page-section my-5" id="target1_2"><div class="row"><div class="col-12 col-lg-12"><h6>${escape(target.misura)}: ${escape(target.trimestre)}</h6></div> <div class="col-12 col-lg-3">${validate_component(Gauge, "Gauge").$$render(
    $$result,
    {
      id: "contr-" + target.id,
      values: [
        ["Label", "Value"],
        [
          "",
          Math.round(Math.round(totale / entiInPlatea * 100) / target.valore_obiettivo * 100)
        ]
      ],
      label: target.misura
    },
    {},
    {}
  )}</div> <div class="col-12 col-lg-9"><div><p>Data di scadenza: <strong>${escape(moment(target.data, "YYYY-MM-DD").format("DD/MM/YYYY"))}</strong></p> <p>Valore obiettivo: <strong>${escape(formatNumber(target.valore_obiettivo))}%</strong></p> <p>Platea: <strong>${escape(formatNumber(entiInPlatea))}</strong></p> <p>Valore assoluto alla data: <strong>${escape(formatNumber(totale))}</strong></p> <p>Valore % alla data: <strong>${escape(Math.round(totale / entiInPlatea * 100))}%</strong></p></div></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  console.log(data);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="container my-4"><h1 data-svelte-h="svelte-1ev8bg9">Board target</h1> ${validate_component(Cite, "Cite").$$render(
    $$result,
    {
      text: "Se vuoi una vita felice devi dedicarla a un obiettivo, non a delle persone o a delle cose.",
      author: "Albert Einstein"
    },
    {},
    {}
  )}</div> <div class="container"><div class="row"><div class="col-12 col-lg-2" data-svelte-h="svelte-18jvh9o"><div data-bs-toggle="sticky" data-bs-stackable="true"><nav class="navbar it-navscroll-wrapper navbar-expand-lg it-bottom-navscroll it-right-side" data-bs-navscroll><button class="custom-navbar-toggler" type="button" aria-controls="navbarNavProgress" aria-expanded="false" aria-label="Toggle navigation" data-bs-toggle="navbarcollapsible" data-bs-target="#navbarNavProgress"><span class="it-list"></span>1. Monitoraggio target</button> <div class="progress custom-navbar-progressbar"><div class="progress-bar it-navscroll-progressbar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div> <div class="navbar-collapsable" id="navbarNavProgress"><div class="overlay"></div> <button type="button" class="it-back-button btn w-100 text-start"><svg class="icon icon-sm icon-primary align-top"><use href="/svg/sprites.svg#it-chevron-left" xlink:href="/svg/sprites.svg#it-chevron-left"></use></svg> <span>Indietro</span></button> <div class="menu-wrapper"><div class="link-list-wrapper"><h3>sezioni</h3> <div class="progress"><div class="progress-bar it-navscroll-progressbar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div> <ul class="link-list"><li class="nav-item"><a class="nav-link active" href="#riepilogo"><span>Monitoraggio target</span></a> <ul class="link-list"><li class="nav-link"><a class="nav-link" href="#target1_2"><span>Target 1.2</span></a></li> <li class="nav-link"><a class="nav-link" href="#target1_4_1"><span>Target 1.4.1</span></a></li></ul></li></ul></div></div></div></nav></div></div> <div class="col-12 col-lg-10 it-page-sections-container"><div class="it-page-section my-5" id="riepilogo" data-svelte-h="svelte-wqne2"><h4>Monitoraggio dei target</h4></div> <div class="it-page-section my-5" id="target1_2"><h5 data-svelte-h="svelte-1g9vrdu">Target 1.2</h5> <p data-svelte-h="svelte-10d5ufo">Nam dapibus libero vitae nunc placerat pretium. Praesent sed suscipit augue. Integer
					ultrices interdum consequat. Phasellus nisl lacus, bibendum quis consectetur a,
					ullamcorper non ipsum.</p> <div class="col-12 col-lg-10 it-page-sections-container">${validate_component(Target1_2, "Target1_2").$$render(
    $$result,
    {
      target: data.t.targets.filter((t) => t.id === "targetM1C1_139")[0],
      values: data.targetM1C1_139
    },
    {},
    {}
  )} ${validate_component(Target1_2, "Target1_2").$$render(
    $$result,
    {
      target: data.t.targets.filter((t) => t.id === "targetM1C1_147")[0],
      values: data.targetM1C1_147
    },
    {},
    {}
  )}</div></div> <div class="it-page-section my-5" id="target1_4_1"><h5 data-svelte-h="svelte-1cunfj1">Target 1.4.1</h5> <p data-svelte-h="svelte-10d5ufo">Nam dapibus libero vitae nunc placerat pretium. Praesent sed suscipit augue. Integer
					ultrices interdum consequat. Phasellus nisl lacus, bibendum quis consectetur a,
					ullamcorper non ipsum.</p> <div class="col-12 col-lg-10 it-page-sections-container">${validate_component(Target1_4_1, "Target1_4_1").$$render(
    $$result,
    {
      target: data.t.targets.filter((t) => t.id === "targetM1C1_140")[0],
      values: data.targetM1C1_140,
      platea: data.platee.filter((p) => p.tipologia_ente === "Comuni" || p.tipologia_ente === "Scuole")
    },
    {},
    {}
  )} ${validate_component(Target1_4_1, "Target1_4_1").$$render(
    $$result,
    {
      target: data.t.targets.filter((t) => t.id === "targetM1C1_148")[0],
      values: data.targetM1C1_148,
      platea: data.platee.filter((p) => p.tipologia_ente === "Comuni" || p.tipologia_ente === "Scuole")
    },
    {},
    {}
  )}</div></div></div></div></div>`;
});
export {
  Page as default
};
