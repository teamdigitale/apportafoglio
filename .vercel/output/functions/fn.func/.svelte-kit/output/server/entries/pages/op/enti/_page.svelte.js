import { c as create_ssr_component, e as escape, v as validate_component, f as each, d as add_attribute } from "../../../../chunks/ssr.js";
import { C as Cite } from "../../../../chunks/cite.js";
import moment from "moment/min/moment-with-locales.js";
const css = {
  code: ".fullheight.svelte-alfbgo{min-height:100%;height:100%}",
  map: null
};
const Entecard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { ente } = $$props;
  moment.locale("it");
  if ($$props.ente === void 0 && $$bindings.ente && ente !== void 0)
    $$bindings.ente(ente);
  $$result.css.add(css);
  return `<div class="row fullheight svelte-alfbgo"><div class="col-12 col-lg-12">  <div class="${[
    "callout callout-highlight " + escape(!ente.Active__c ? "danger " : "primary ", true) + " fullheight shadow py-4 px-2 svelte-alfbgo",
    ""
  ].join(" ").trim()}"><div class="clearfix"><div class="categoryicon-top float-start"><svg class="icon icon-primary"><use href="/svg/sprites.svg#it-pa"></use></svg> <span class="${"text " + escape(!ente.Active__c ? "text-danger" : "text-primary", true)}"><strong>${escape(ente.Name)}</strong></span></div> <div class="chip chip-simple float-end"><svg class="icon icon-xs"><use href="/svg/sprites.svg#it-pa"></use></svg> <span class="chip-label">${escape(ente.portafoglio)}</span></div></div> <div><dl class="row"><dt class="col-sm-4" data-svelte-h="svelte-1rkktt0"><small>Tipologia Ente:</small></dt><dd class="col-sm-8"><small>${escape(ente.Tipologia_Ente__c)}</small> </dd><dt class="col-sm-4" data-svelte-h="svelte-332fcn"><small>Regione:</small></dt><dd class="col-sm-8"><small>${escape(ente.Regione__c)}</small> </dd><dt class="col-sm-4" data-svelte-h="svelte-px2603"><small>Provincia:</small></dt><dd class="col-sm-8"><small>${escape(ente.ShippingState)}</small> </dd><dt class="col-sm-4" data-svelte-h="svelte-cofdqz"><small>Comune:</small></dt><dd class="col-sm-8"><small>${escape(ente.ShippingCity)}</small> </dd><dt class="col-sm-4" data-svelte-h="svelte-p5q2gs"><small>Indirizzo:</small></dt><dd class="col-sm-8"><small>${escape(ente.ShippingCity)}</small> </dd><dt class="col-sm-4" data-svelte-h="svelte-17328z2"><small>PEC:</small></dt><dd class="col-sm-8"><small><a href="${"mailto:" + escape(ente.PEC__c, true)}">${escape(ente.PEC__c)}</a></small> </dd><dt class="col-sm-4" data-svelte-h="svelte-1cea7gv"><small>Responsabile:</small></dt><dd class="col-sm-8"><small>${escape(ente.Nome_responsabile__c)} ${escape(ente.Cognome_responsabile__c)} (${escape(ente.Titolo_responsabile__c)})</small></dd></dl></div></div> </div> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredEnti;
  let { data } = $$props;
  let tipologiaEnteOptions = ["Tutte le tipologie"].concat(Object.values(data.enti.reduce(
    (a, { Tipologia_Ente__c }) => {
      a[Tipologia_Ente__c] = a[Tipologia_Ente__c] || { Tipologia_Ente__c, count: 0 };
      a[Tipologia_Ente__c].count++;
      return a;
    },
    /* @__PURE__ */ Object.create(null)
  )).map((x) => x.Tipologia_Ente__c).sort());
  let regioneOptions = ["Tutte le regioni"].concat(Object.values(data.enti.reduce(
    (a, { Regione__c }) => {
      a[Regione__c] = a[Regione__c] || { Regione__c, count: 0 };
      a[Regione__c].count++;
      return a;
    },
    /* @__PURE__ */ Object.create(null)
  )).map((x) => x.Regione__c).sort());
  let portafoglioOptions = ["Tutti i portafogli"].concat(Object.values(data.enti.reduce(
    (a, { portafoglio }) => {
      a[portafoglio] = a[portafoglio] || { portafoglio, count: 0 };
      a[portafoglio].count++;
      return a;
    },
    /* @__PURE__ */ Object.create(null)
  )).map((x) => x.portafoglio).sort());
  let filterNominativoEnte = "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  filteredEnti = data.enti.filter(
    (x) => true
  ).filter(
    (x) => true
  ).filter(
    (x) => true
  ).filter(
    (x) => true
  ).filter((x) => x.Active__c == 1);
  return `<div class="container my-4"><h1 data-svelte-h="svelte-i1exm0">Enti</h1> ${validate_component(Cite, "Cite").$$render(
    $$result,
    {
      text: "Con la massa degli oggetti cresce ... il regno\r\n	degli enti estranei a cui l'uomo è soggiogato.",
      author: "Guy Debord"
    },
    {},
    {}
  )} <div class="row"><div class="col-12 col-lg-3 my-4"><div class="select-wrapper"><label for="filterPortafoglio" data-svelte-h="svelte-5ffups">Portafoglio</label> <select id="filterPortafoglio" name="filterPortafoglio">${each(portafoglioOptions, (a) => {
    return `<option${add_attribute("value", a, 0)}>${escape(a)}</option>`;
  })}</select></div></div> <div class="col-12 col-lg-3 my-4"><div class="select-wrapper"><label for="filterTipologiaEnte" data-svelte-h="svelte-ensj50">Tipologia</label> <select id="filterTipologiaEnte" name="filterTipologiaEnte">${each(tipologiaEnteOptions, (te) => {
    return `<option${add_attribute("value", te, 0)}>${escape(te)}</option>`;
  })}</select></div></div> <div class="col-12 col-lg-3 my-4"><div class="select-wrapper"><label for="filterRegione" data-svelte-h="svelte-fm5r96">Regione</label> <select id="filterRegione" name="filterRegione">${each(regioneOptions, (p) => {
    return `<option${add_attribute("value", p, 0)}>${escape(p)}</option>`;
  })}</select></div></div> <div class="col-12 col-lg-3 my-4"><div class="form-group"><label class="active" for="filterNominativoEnte" data-svelte-h="svelte-ou1xo">Nome dell&#39;Ente</label> <input type="text" class="form-control" id="filterNominativoEnte" name="filterNominativoEnte" placeholder="Digitare parte del nome dell'Ente"${add_attribute("value", filterNominativoEnte, 0)}></div></div></div> <div class="row">${each(filteredEnti, (ente) => {
    return `<div class="col-12 col-lg-6 my-4">${validate_component(Entecard, "Entecard").$$render($$result, { ente }, {}, {})} </div>`;
  })}</div></div>`;
});
export {
  Page as default
};
