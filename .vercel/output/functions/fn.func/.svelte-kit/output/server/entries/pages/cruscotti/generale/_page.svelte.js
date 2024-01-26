import { c as create_ssr_component, v as validate_component, d as add_attribute, f as each, e as escape } from "../../../../chunks/ssr.js";
import { P as Pagination } from "../../../../chunks/pagination.js";
import { e as euro } from "../../../../chunks/shared.js";
import { G as Gauge } from "../../../../chunks/gauge.js";
import { C as Cite } from "../../../../chunks/cite.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let beneficiariOptions;
  let filteredCandidature;
  let candidature;
  let { data } = $$props;
  ["Tutte le regioni"].concat(Object.values(data.candidature.reduce(
    (a, { Regione__c }) => {
      a[Regione__c] = a[Regione__c] || { Regione__c, count: 0 };
      a[Regione__c].count++;
      return a;
    },
    /* @__PURE__ */ Object.create(null)
  )).map((x) => x.Regione__c).sort());
  let statoCandidaturaOptions = ["Tutti gli stati della candidatura"].concat(Object.values(data.candidature.reduce(
    (a, { outfunds__Status__c }) => {
      a[outfunds__Status__c] = a[outfunds__Status__c] || { outfunds__Status__c, count: 0 };
      a[outfunds__Status__c].count++;
      return a;
    },
    /* @__PURE__ */ Object.create(null)
  )).map((x) => x.outfunds__Status__c).sort());
  let filterStatoCandidatura = "FINANZIATA";
  let statiProgettoOptions = ["Tutti gli stati del progetto"].concat(Object.values(data.candidature.reduce(
    (a, { Stato_Progetto__c }) => {
      a[Stato_Progetto__c] = a[Stato_Progetto__c] || { Stato_Progetto__c, count: 0 };
      a[Stato_Progetto__c].count++;
      return a;
    },
    /* @__PURE__ */ Object.create(null)
  )).map((x) => x.Stato_Progetto__c ? x.Stato_Progetto__c : "n.a.").sort());
  let soloconavvisiaperti = false;
  let mops = calcolaMisureOptions();
  let misureOptions = mops;
  let filterMisure = mops[0];
  function calcolaMisureOptions() {
    let r = Object.values(data.misure.filter((m) => true).reduce(
      (a, { Name }) => {
        a[Name] = a[Name] || { Name, count: 0 };
        a[Name].count++;
        return a;
      },
      /* @__PURE__ */ Object.create(null)
    )).map((x) => x.Name).sort();
    r = ["Tutte le misure"].concat(r);
    return r;
  }
  let contrattualizzazioneOptions = ["Contrattualizzazione"].concat(Object.values(data.candidature.reduce(
    (a, { Stato_contrattualizzazione__c }) => {
      a[Stato_contrattualizzazione__c] = a[Stato_contrattualizzazione__c] || { Stato_contrattualizzazione__c, count: 0 };
      a[Stato_contrattualizzazione__c].count++;
      return a;
    },
    /* @__PURE__ */ Object.create(null)
  )).map((x) => x.Stato_contrattualizzazione__c).sort());
  function calcolaBeneficiari() {
    let res = [];
    for (let z = 0; z < data.avvisi.length; z++) {
      res = res.concat(data.avvisi[z].beneficiari);
    }
    return res;
  }
  let cperpage;
  let cp = 0;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    beneficiariOptions = ["Tutti i beneficiari"].concat(calcolaBeneficiari().filter((item, index, arr) => arr.indexOf(item) === index).sort());
    filteredCandidature = data.candidature.filter((x) => filterMisure === "Tutte le misure" ? misureOptions.indexOf(x.Misura__c) > -1 : x.Misura__c === filterMisure).filter(
      (x) => true
    ).filter((x) => x.outfunds__Status__c === filterStatoCandidatura).filter(
      (x) => true
    ).filter(
      (x) => true
    ).filter(
      (x) => true
    );
    candidature = data.candidature;
    $$rendered = `<div class="container my-4"><h1 data-svelte-h="svelte-1b6nj93">Cruscotto generale</h1> ${validate_component(Cite, "Cite").$$render(
      $$result,
      {
        text: "Più alto vola il gabbiano, e più vede lontano.",
        author: "Richard Bach"
      },
      {},
      {}
    )}</div> <div class="container"><div class="row"><div class="col-12 col-lg-2" data-svelte-h="svelte-dtoofn"><div data-bs-toggle="sticky" data-bs-stackable="true"><nav class="navbar it-navscroll-wrapper navbar-expand-lg it-bottom-navscroll it-right-side" data-bs-navscroll><button class="custom-navbar-toggler" type="button" aria-controls="navbarNavProgress" aria-expanded="false" aria-label="Toggle navigation" data-bs-toggle="navbarcollapsible" data-bs-target="#navbarNavProgress"><span class="it-list"></span>1. Riepilogo</button> <div class="progress custom-navbar-progressbar"><div class="progress-bar it-navscroll-progressbar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div> <div class="navbar-collapsable" id="navbarNavProgress"><div class="overlay"></div> <button type="button" class="it-back-button btn w-100 text-start"><svg class="icon icon-sm icon-primary align-top"><use href="/svg/sprites.svg#it-chevron-left" xlink:href="/svg/sprites.svg#it-chevron-left"></use></svg> <span>Indietro</span></button> <div class="menu-wrapper"><div class="link-list-wrapper"><h3>sezioni</h3> <div class="progress"><div class="progress-bar it-navscroll-progressbar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div> <ul class="link-list"><li class="nav-item"><a class="nav-link active" href="#riepilogo"><span>1. Riepilogo</span></a> <a class="nav-link" href="#contrattualizzazione"><span>2. Contrattualizzazione</span></a> <a class="nav-link" href="#realizzazione"><span>3. Completamento attività</span></a> <a class="nav-link active" href="#candidature"><span>4. Candidature</span></a></li></ul></div></div></div></nav></div></div> <div class="col-12 col-lg-10 it-page-sections-container"><div class="it-page-section my-5" id="riepilogo" data-svelte-h="svelte-rfreue"><h4>Riepilogo</h4> <p>In questa sezione hai una visione generale del tuo portafoglio, con particolare attenzione
					alle fasi di <strong>contrattualizzazione</strong> e <strong>completamento</strong> delle attività.</p> <p>Puoi utilizzare i filtri di ricerca per identificare specificare candidature, visibili
					nell&#39;apposita tabella nella sezione <a href="#candidature">4. Candidature.</a></p> <div class="alert alert-primary" role="alert">Per le sezioni <a href="#contrattualizzazione">2. Contrattualizzazione</a> e
					<a href="#realizzazione">3. Completamento attività</a> il solo filtro attivo è quello della
					misura.</div> <p>Per avere dettagli sulle scadenze dei cronoprogrammi e sulle eventuali richieste di
					variazione, consulta la pagina <a href="/op/scadenze">Scadenze</a></p></div> <div class="sticky-top bg-white"><div class="row my-6"><div class="col-12 col-lg-4 my-4"><div class="form-check"><div class="toggles"><label for="soloAperti">Solo con avvisi aperti
									<input type="checkbox" id="soloAperti"${add_attribute("checked", soloconavvisiaperti, 1)}> <span class="lever"></span></label></div></div></div> <div class="col-12 col-lg-4 my-4"><div class="select-wrapper"><label for="filterMisura" data-svelte-h="svelte-1vpfvao">Misure</label> <select id="filterMisura" name="filterMisura">${each(misureOptions, (m) => {
      return `<option${add_attribute("value", m, 0)}>${escape(m)}</option>`;
    })}</select></div></div> <div class="col-12 col-lg-4 my-4"><div class="select-wrapper"><label for="filterBeneficiari" data-svelte-h="svelte-yv7jwy">Beneficiari</label> <select id="filterBeneficiari" name="filterBeneficiari">${each(beneficiariOptions, (m) => {
      return `<option${add_attribute("value", m, 0)}>${escape(m)}</option>`;
    })}</select></div></div> <div class="col-12 col-lg-4 my-4"><div class="select-wrapper"><label for="filterStatoCandidatura" data-svelte-h="svelte-xpuu0o">Stato candidatura</label> <select id="filterStatoCandidatura" name="filterStatoCandidatura">${each(statoCandidaturaOptions, (m) => {
      return `<option${add_attribute("value", m, 0)}>${escape(m)}</option>`;
    })}</select></div></div> <div class="col-12 col-lg-4 my-4"><div class="select-wrapper"><label for="filterStatoProgetto" data-svelte-h="svelte-1grgkua">Stato progetto</label> <select id="filterStatoProgetto" name="filterStatoProgetto">${each(statiProgettoOptions, (m) => {
      return `<option${add_attribute("value", m, 0)}>${escape(m)}</option>`;
    })}</select></div></div> <div class="col-12 col-lg-4 my-4"><div class="select-wrapper"><label for="filterContrattualizzazione" data-svelte-h="svelte-1jmobn4">Contrattualizzazione</label> <select id="filterContrattualizzazione" name="filterContrattualizzazione">${each(contrattualizzazioneOptions, (m) => {
      return `<option${add_attribute("value", m, 0)}>${escape(m)}</option>`;
    })}</select></div></div></div> <hr></div> <div class="it-page-section my-5" id="contrattualizzazione"><h4 data-svelte-h="svelte-1rennu0">Contrattualizzazione</h4> <div class="row">${each(
      data.misure.filter((x) => filterMisure === misureOptions[0] ? true : x.Name === filterMisure),
      (m) => {
        return `${candidature.filter((x) => x.Misura__c === m.Name).length > 0 ? `<div class="col-12 col-lg-4 my-4"><p>${escape(m.Name)}</p> ${validate_component(Gauge, "Gauge").$$render(
          $$result,
          {
            id: "contr-" + m.Id,
            values: [
              ["Label", "Value"],
              [
                "",
                Math.round(candidature.filter((x) => x.Misura__c === m.Name).filter((x) => x.outfunds__Status__c === "FINANZIATA" && x.Stato_contrattualizzazione__c === "Completata").length / candidature.filter((x) => x.Misura__c === m.Name).filter((x) => x.outfunds__Status__c === "FINANZIATA").length * 100)
              ]
            ],
            label: m.Name
          },
          {},
          {}
        )} </div>` : ``}`;
      }
    )}</div></div> <div class="it-page-section my-5" id="realizzazione"><h4 data-svelte-h="svelte-1bp5cpl">Completamento attività</h4> <div class="row">${each(
      data.misure.filter((x) => filterMisure === misureOptions[0] ? true : x.Name === filterMisure),
      (m) => {
        return `${candidature.filter((x) => x.Misura__c === m.Name).length > 0 ? `<div class="col-12 col-lg-4 my-4"><p>${escape(m.Name)}</p> ${validate_component(Gauge, "Gauge").$$render(
          $$result,
          {
            id: "compl-" + m.Id,
            values: [
              ["Label", "Value"],
              [
                "",
                Math.round(candidature.filter((x) => x.Misura__c === m.Name).filter((x) => x.outfunds__Status__c === "FINANZIATA" && x.Stato_contrattualizzazione__c === "Completata" && ("COMPLETATO" === x.Stato_Progetto__c || "IN VERIFICA" === x.Stato_Progetto__c || "IN LIQUIDAZIONE" === x.Stato_Progetto__c || "LIQUIDATO" === x.Stato_Progetto__c)).length / candidature.filter((x) => x.Misura__c === m.Name).filter((x) => x.outfunds__Status__c === "FINANZIATA").length * 100)
              ]
            ],
            label: m.Name
          },
          {},
          {}
        )} </div>` : ``}`;
      }
    )}</div></div> <div class="it-page-section my-5" id="candidature"><h4 data-svelte-h="svelte-1cdtdy2">Candidature</h4> <div class="row"><div class="col-12 col-lg-12 my-4"><div class="container my-4"><div class="table-responsive"><table class="table table-hover table-sm caption-top align-middle"><caption data-svelte-h="svelte-vu476l">Candidature risultanti in base ai filtri impostati</caption> <thead data-svelte-h="svelte-13cndjl"><tr><th>Misura</th> <th>Regione</th> <th>Ente</th> <th>Valore</th> <th>Stato candidatura</th> <th>Stato progetto</th> <th></th></tr></thead> <tbody>${cperpage ? `${each(cperpage, (c) => {
      return `<tr><td><small>${escape(c.Misura__c)}</small></td> <td><small>${escape(c.Regione__c)}</small></td> <td><small>${escape(data.enti.filter((x) => x.Id === c.outfunds__Applying_Organization__c)[0].Name)}</small></td> <td><small>${escape(euro(c.outfunds__Awarded_Amount__c))}</small></td> <td><small>${escape(c.outfunds__Status__c)}</small></td> <td><small>${escape(c.Stato_Progetto__c)}</small></td> <td><a href="${"/op/candidatura/" + escape(c.Id, true)}" target="_blank"><svg class="icon icon-sm icon-primary"><use href="/svg/sprites.svg#it-zoom-in"></use></svg> </a></td> </tr>`;
    })}` : ``}</tbody> <tfoot><tr><th colspan="7">${validate_component(Pagination, "Pagination").$$render(
      $$result,
      {
        rows: filteredCandidature,
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
    )}</th></tr></tfoot></table></div></div></div></div></div></div></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
