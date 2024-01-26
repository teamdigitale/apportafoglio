import { c as create_ssr_component, v as validate_component, f as each, d as add_attribute, e as escape } from "../../../chunks/ssr.js";
import { C as Cite } from "../../../chunks/cite.js";
import { P as Pagination } from "../../../chunks/pagination.js";
import { S as Scorecard } from "../../../chunks/scorecard.js";
import { e as euro } from "../../../chunks/shared.js";
import "moment/min/moment-with-locales.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cc;
  let fonditotali;
  let fondiAssegnati;
  let fondiLiquidati;
  let fondiRinunciati;
  let { data } = $$props;
  let candidature = data.finanziate;
  let cperpage;
  let cp = 0;
  function calcolaMisureOptions() {
    const res = [];
    candidature.forEach((c) => {
      if (res.indexOf(c.avviso.misura) === -1) {
        res.push(c.avviso.misura);
      }
    });
    return res;
  }
  let tipologiaEnteOptions = ["Tutte le tipologie di ente"].concat(Object.values(candidature.reduce(
    (a, { tipologia_ente }) => {
      a[tipologia_ente] = a[tipologia_ente] || { tipologia_ente, count: 0 };
      a[tipologia_ente].count++;
      return a;
    },
    /* @__PURE__ */ Object.create(null)
  )).map((x) => x.tipologia_ente).sort());
  let filterTipologiaEnte = tipologiaEnteOptions[0];
  let misureOptions = ["Tutte le misure"].concat(calcolaMisureOptions().sort());
  let filterMisura = misureOptions[0];
  let regioneOptions = ["Tutte le regioni"].concat(Object.values(candidature.reduce(
    (a, { regione }) => {
      a[regione] = a[regione] || { regione, count: 0 };
      a[regione].count++;
      return a;
    },
    /* @__PURE__ */ Object.create(null)
  )).map((x) => x.regione).sort());
  let filterRegione = regioneOptions[0];
  let provinceOptions = ["Tutte le province"].concat(Object.values(candidature.filter((c) => filterRegione !== regioneOptions[0] ? c.regione === filterRegione : true).reduce(
    (a, { provincia }) => {
      a[provincia] = a[provincia] || { provincia, count: 0 };
      a[provincia].count++;
      return a;
    },
    /* @__PURE__ */ Object.create(null)
  )).map((x) => x.provincia).sort());
  let filterProvincia = provinceOptions[0];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    cc = candidature.filter((c) => filterTipologiaEnte !== tipologiaEnteOptions[0] ? c.tipologia_ente === filterTipologiaEnte : true).filter((c) => filterMisura !== misureOptions[0] ? c.avviso.misura === filterMisura : true).filter((c) => filterRegione !== regioneOptions[0] ? c.regione === filterRegione : true).filter((c) => filterProvincia !== provinceOptions[0] ? c.provincia === filterProvincia : true);
    fonditotali = cc.reduce(
      function(a, b) {
        return a + b.importo_finanziamento;
      },
      0
    );
    fondiAssegnati = cc.filter((f) => f.stato_candidatura === "A").reduce(
      function(a, b) {
        return a + b.importo_finanziamento;
      },
      0
    );
    fondiLiquidati = cc.filter((f) => f.stato_candidatura === "E").reduce(
      function(a, b) {
        return a + b.importo_finanziamento;
      },
      0
    );
    fondiRinunciati = cc.filter((f) => f.stato_candidatura === "R").reduce(
      function(a, b) {
        return a + b.importo_finanziamento;
      },
      0
    );
    $$rendered = `<div class="container my-4"><h1 data-svelte-h="svelte-1pmf11y">Open Data</h1> ${validate_component(Cite, "Cite").$$render(
      $$result,
      {
        text: "Se torturi i numeri abbastanza a lungo, confesseranno qualsiasi cosa.",
        author: "Gregg Easterbrook"
      },
      {},
      {}
    )} <div class="row"><div class="col-12 col-lg-3 my-4"><div class="select-wrapper"><label for="filterMisura" data-svelte-h="svelte-1vpfvao">Misure</label> <select id="filterMisura" name="filterMisura">${each(misureOptions, (m) => {
      return `<option${add_attribute("value", m, 0)}>${escape(m)}</option>`;
    })}</select></div></div> <div class="col-12 col-lg-3 my-4"><div class="select-wrapper"><label for="filterTipologiaEnte" data-svelte-h="svelte-hvvg5g">Tipologie ente</label> <select id="filterTipologiaEnte" name="filterTipologiaEnte">${each(tipologiaEnteOptions, (te) => {
      return `<option${add_attribute("value", te, 0)}>${escape(te)}</option>`;
    })}</select></div></div> <div class="col-12 col-lg-3 my-4"><div class="select-wrapper"><label for="filterRegione" data-svelte-h="svelte-h5lvom">Regioni</label> <select id="filterRegione" name="filterRegione">${each(regioneOptions, (r) => {
      return `<option${add_attribute("value", r, 0)}>${escape(r)}</option>`;
    })}</select></div></div> <div class="col-12 col-lg-3 my-4"><div class="select-wrapper"><label for="filterProvincia" data-svelte-h="svelte-1ehw1xp">Province</label> <select id="filterProvincia" name="filterProvincia">${each(provinceOptions, (p) => {
      return `<option${add_attribute("value", p, 0)}>${escape(p)}</option>`;
    })}</select></div></div></div> <div class="row"><div class="col-12 col-lg-3 my-4">${validate_component(Scorecard, "Scorecard").$$render(
      $$result,
      {
        title: euro(fonditotali),
        text: "Valore candidature",
        bgcolor: "secondary",
        textcolor: "white"
      },
      {},
      {}
    )}</div> <div class="col-12 col-lg-3 my-4">${validate_component(Scorecard, "Scorecard").$$render(
      $$result,
      {
        title: euro(fondiAssegnati),
        text: "Fondi assegnati",
        bgcolor: "primary",
        textcolor: "white"
      },
      {},
      {}
    )}</div> <div class="col-12 col-lg-3 my-4">${validate_component(Scorecard, "Scorecard").$$render(
      $$result,
      {
        title: euro(fondiLiquidati),
        text: "Fondi liquidati",
        bgcolor: "success",
        textcolor: "white"
      },
      {},
      {}
    )}</div> <div class="col-12 col-lg-3 my-4">${validate_component(Scorecard, "Scorecard").$$render(
      $$result,
      {
        title: euro(fondiRinunciati),
        text: "Fondi rinunciati",
        bgcolor: "danger",
        textcolor: "white"
      },
      {},
      {}
    )}</div></div></div> ${`<div class="container my-4"><div class="table-responsive"><table class="table table-hover table-sm caption-top align-middle"><caption data-svelte-h="svelte-vu476l">Candidature risultanti in base ai filtri impostati</caption> <thead data-svelte-h="svelte-881j1v"><tr><th></th> <th>Tipologia ente</th> <th>Ente</th> <th>Regione</th> <th>Provincia</th> <th>Misura</th> <th>Stato</th> <th>Importo</th></tr></thead> <tbody>${cperpage ? `${each(cperpage, (c) => {
      return `<tr><td><button class="btn btn-s btn-icon" data-svelte-h="svelte-1tai0td"><span class="rounded-icon"><svg class="icon icon-primary"><use href="/svg/sprites.svg#it-zoom-in"></use></svg></span> </button></td> <td><small>${escape(c.tipologia_ente)}</small></td> <td><small>${escape(c.ente)}</small></td> <td><small>${escape(c.regione)}</small></td> <td><small>${escape(c.provincia)}</small></td> <td><small>${escape(c.avviso.misura)}</small></td> <td><small>${escape(c.stato_candidatura === "A" ? "ASSEGNATO" : c.stato_candidatura === "E" ? "EROGATO" : "RINUNCIATO")}</small></td> <td><small>${escape(euro(c.importo_finanziamento))}</small></td> </tr>`;
    })}` : ``}</tbody> <tfoot><tr><th colspan="8">${validate_component(Pagination, "Pagination").$$render(
      $$result,
      {
        rows: cc,
        perPage: 10,
        cp,
        trimmedRows: cperpage
      },
      {
        cp: ($$value) => {
          cp = $$value;
          $$settled = false;
        },
        trimmedRows: ($$value) => {
          cperpage = $$value;
          $$settled = false;
        }
      },
      {}
    )}</th></tr></tfoot></table></div></div>`}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
