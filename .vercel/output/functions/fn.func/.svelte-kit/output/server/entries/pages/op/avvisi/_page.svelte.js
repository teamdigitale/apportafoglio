import { c as create_ssr_component, e as escape, f as each, v as validate_component, d as add_attribute } from "../../../../chunks/ssr.js";
import { C as Cite } from "../../../../chunks/cite.js";
import { e as euro } from "../../../../chunks/shared.js";
import moment from "moment/min/moment-with-locales.js";
const css = {
  code: ".fullheight.svelte-p8gt3c{min-height:100%;height:100%}",
  map: null
};
const Avvisocard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { avviso } = $$props;
  moment.locale("it");
  if ($$props.avviso === void 0 && $$bindings.avviso && avviso !== void 0)
    $$bindings.avviso(avviso);
  $$result.css.add(css);
  return `<div class="row fullheight svelte-p8gt3c"><div class="col-12 col-lg-12">  <div class="${[
    "callout callout-highlight " + escape(
      avviso.outfunds__Status__c === "TERMINATO" ? "danger " : "success ",
      true
    ) + " fullheight shadow py-4 px-2 svelte-p8gt3c",
    ""
  ].join(" ").trim()}"><div class="categoryicon-top"><svg class="${"icon " + escape(
    avviso.outfunds__Status__c === "TERMINATO" ? "icon-danger " : "icon-success ",
    true
  )}"><use href="${"/svg/sprites.svg#it-" + escape(
    avviso.outfunds__Status__c === "TERMINATO" ? "locked" : "unlocked",
    true
  )}"></use></svg> <span class="${"text " + escape(
    avviso.outfunds__Status__c === "TERMINATO" ? "text-danger" : "text-success",
    true
  )}"><strong>${escape(avviso.outfunds__Status__c)}</strong></span></div> <p>${each(avviso.beneficiari, (b) => {
    return `<div class="chip chip-simple"><span class="chip-label">${escape(b)}</span> </div>`;
  })}</p> <div><h6>${escape(avviso.Name)}</h6> <dl class="row"><dt class="col-sm-4" data-svelte-h="svelte-1ltagda"><small>Data termine:</small></dt><dd class="col-sm-8"><small>${escape(moment(avviso.outfunds__End_Date__c).format("DD/MM/YYYY"))} ${avviso.outfunds__Status__c === "PUBBLICATO" ? `<span class="text-danger"><strong>(${escape(moment(avviso.outfunds__End_Date__c).endOf("day").fromNow())})</strong></span>` : ``}</small> </dd><dt class="col-sm-4" data-svelte-h="svelte-10lb5mx"><small>Data avvio:</small></dt><dd class="col-sm-8"><small>${escape(moment(avviso.outfunds__Start_Date__c).format("DD/MM/YYYY"))}</small> </dd><dt class="col-sm-4" data-svelte-h="svelte-1nlgt67"><small>Valore:</small></dt><dd class="col-sm-8"><small><strong>${escape(euro(avviso.outfunds__Total_Program_Amount__c))}</strong></small> </dd><dt class="col-sm-4" data-svelte-h="svelte-1p5bf8k"><small>Fondi disponibili:</small></dt><dd class="col-sm-8"><small><strong>${escape(euro(avviso.Fondi_disponibili__c))}</strong></small> </dd><dt class="col-sm-4" data-svelte-h="svelte-1dnuleb"><small>Oggetto:</small></dt><dd class="col-sm-8"><small>${escape(avviso.Oggetto_Avviso__c)}</small></dd></dl></div></div> </div> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let beneficiariOptions;
  let filteredAvvisi;
  let { data } = $$props;
  let misuraOptions = [{ idmisura: "", misura: "Tutte le misure" }].concat(data.misure.map((el) => {
    return { idmisura: el.Id, misura: el.Name };
  }));
  let statoAvvisoOptions = ["Tutti gli stati"].concat(Object.values(data.avvisi.reduce(
    (a, { outfunds__Status__c }) => {
      a[outfunds__Status__c] = a[outfunds__Status__c] || { outfunds__Status__c, count: 0 };
      a[outfunds__Status__c].count++;
      return a;
    },
    /* @__PURE__ */ Object.create(null)
  )).map((x) => x.outfunds__Status__c).sort());
  let pacchettoOptions = ["Tutti i pacchetti"].concat(Object.values(data.avvisi.reduce(
    (a, { Pacchetto__c }) => {
      a[Pacchetto__c] = a[Pacchetto__c] || { Pacchetto__c, count: 0 };
      a[Pacchetto__c].count++;
      return a;
    },
    /* @__PURE__ */ Object.create(null)
  )).map((x) => x.Pacchetto__c).filter((v) => v ? true : false).sort());
  function calcolaBeneficiari() {
    let res = [];
    for (let z = 0; z < data.avvisi.length; z++) {
      res = res.concat(data.avvisi[z].beneficiari);
    }
    return res;
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  beneficiariOptions = ["Tutti i beneficiari"].concat(calcolaBeneficiari().filter((item, index, arr) => arr.indexOf(item) === index).sort());
  filteredAvvisi = data.avvisi.filter(
    (x) => true
  ).filter(
    (x) => true
  ).filter(
    (x) => true
  ).filter(
    (x) => true
  );
  return `<div class="container my-4"><h1 data-svelte-h="svelte-176co76">Avvisi</h1> ${validate_component(Cite, "Cite").$$render(
    $$result,
    {
      text: "Ente avvisato, mezzo salvato.",
      author: "Anonimo"
    },
    {},
    {}
  )} <div class="row"><div class="col-12 col-lg-3 my-4"><div class="select-wrapper"><label for="filterStatoAvviso" data-svelte-h="svelte-1q7v3xy">Stato avviso</label> <select id="filterStatoAvviso" name="filterStatoAvviso">${each(statoAvvisoOptions, (a) => {
    return `<option${add_attribute("value", a, 0)}>${escape(a)}</option>`;
  })}</select></div></div> <div class="col-12 col-lg-3 my-4"><div class="select-wrapper"><label for="filterMisura" data-svelte-h="svelte-1ptkplo">Misura</label> <select id="filterMisura" name="filterMisura">${each(misuraOptions, (m) => {
    return `<option${add_attribute("value", m.idmisura, 0)}>${escape(m.misura)}</option>`;
  })}</select></div> </div><div class="col-12 col-lg-3 my-4"><div class="select-wrapper"><label for="filterPacchetto" data-svelte-h="svelte-1c2tajm">Pacchetto</label> <select id="filterPacchetto" name="filterPacchetto">${each(pacchettoOptions, (p) => {
    return `<option${add_attribute("value", p, 0)}>${escape(p)}</option>`;
  })}</select></div> </div><div class="col-12 col-lg-3 my-4"><div class="select-wrapper"><label for="filterBeneficiari" data-svelte-h="svelte-yv7jwy">Beneficiari</label> <select id="filterBeneficiari" name="filterBeneficiari">${each(beneficiariOptions, (b) => {
    return `<option${add_attribute("value", b, 0)}>${escape(b)}</option>`;
  })}</select></div></div></div> <div class="row">${each(filteredAvvisi, (avviso) => {
    return `<div class="col-12 col-lg-4 my-4">${validate_component(Avvisocard, "Avvisocard").$$render($$result, { avviso }, {}, {})} </div>`;
  })}</div></div>`;
});
export {
  Page as default
};
