import { c as create_ssr_component, e as escape, f as each, v as validate_component, d as add_attribute } from "../../../../chunks/ssr.js";
import { S as Scorecard } from "../../../../chunks/scorecard.js";
import { C as Cite } from "../../../../chunks/cite.js";
import moment from "moment/min/moment-with-locales.js";
import { P as Pagination } from "../../../../chunks/pagination.js";
const css = {
  code: ".fullheight.svelte-alfbgo{min-height:100%;height:100%}",
  map: null
};
const Richiestavariazionecard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { scadenza } = $$props;
  let { idu } = $$props;
  moment.locale("it");
  if ($$props.scadenza === void 0 && $$bindings.scadenza && scadenza !== void 0)
    $$bindings.scadenza(scadenza);
  if ($$props.idu === void 0 && $$bindings.idu && idu !== void 0)
    $$bindings.idu(idu);
  $$result.css.add(css);
  return `<div class="row fullheight svelte-alfbgo"><div class="col-12 col-lg-12">  <div class="${[
    "callout primary fullheight shadow py-4 px-2 svelte-alfbgo",
    ""
  ].join(" ").trim()}"><div class="clearfix"><div class="categoryicon-top float-start"><svg class="icon icon-primary"><use href="/svg/sprites.svg#it-pa"></use></svg> <span class="text text-primary"><strong>${escape(scadenza.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Name)}</strong></span></div> <div class="chip chip-simple float-end"><svg class="icon icon-xs"><use href="/svg/sprites.svg#it-calendar"></use></svg> <span class="chip-label">${escape(scadenza.RecordType.Name)}</span></div></div> <div><dl class="row"><dt class="col-sm-4" data-svelte-h="svelte-14tw0nq"><small>Avviso:</small></dt><dd class="col-sm-8"><small>${escape(scadenza.outfunds__Funding_Request__r.outfunds__FundingProgram__r.Name)}</small> </dd><dt class="col-sm-4" data-svelte-h="svelte-11ce65k"><small>Richiesta:</small></dt><dd class="col-sm-8"><small>${escape(scadenza.rv[0].Description)}</small> </dd><dt class="col-sm-4" data-svelte-h="svelte-i3mm0s"><small>Data richiesta:</small></dt><dd class="col-sm-8"><small>${escape(moment(scadenza.rv[0].Data_richiesta__c, "YYYY-MM-DD").format("DD/MM/YYYY"))}</small> </dd><dt class="col-sm-4" data-svelte-h="svelte-lv8k9p"><small>Data scadenza:</small></dt><dd class="col-sm-8"><small><span>${escape(moment(scadenza.rv[0].Data_scadenza_iniziale__c, "YYYY-MM-DD").format("DD/MM/YYYY"))} <span class="text-danger">(${escape(moment(scadenza.rv[0].Data_scadenza_iniziale__c, "YYYY-MM-DD").add(1, "days").startOf("day").fromNow())})</span></span></small> </dd><dt class="col-sm-4" data-svelte-h="svelte-ldp2ns"><small>Giorni richiesti:</small></dt><dd class="col-sm-8"><small>${escape(scadenza.rv[0].Giorni_richiesti__c)}</small></dd></dl> ${scadenza.rv[0].comm && scadenza.rv[0].comm.length > 0 ? `<hr> ${each(scadenza.rv[0].comm, (message) => {
    return `${message.InsertedById === idu ? `<dl class="row"><dt class="col-sm-4"><small>Il giorno ${escape(moment(message.CreatedDate).format("DD/MM/YYYY"))} hai scritto:</small></dt><dd class="col-sm-8"><small><!-- HTML_TAG_START -->${message.Body}<!-- HTML_TAG_END --></small> </dd></dl>` : `<dl class="row"><dt class="col-sm-4"><small>Il giorno ${escape(moment(message.CreatedDate).format("DD/MM/YYYY"))} è stato inserito questo commento:</small></dt><dd class="col-sm-8"><small><!-- HTML_TAG_START -->${message.Body}<!-- HTML_TAG_END --></small> </dd></dl>`}`;
  })}` : ``} ${(!scadenza.rv[0].comm || scadenza.rv[0].comm.length === 0 || scadenza.rv[0].comm.filter((c) => c.InsertedById === idu).length === 0) && Number(scadenza.rv[0].Giorni_richiesti__c) >= 90 ? `<div class="alert alert-primary" role="alert" data-svelte-h="svelte-1bhxpj5">Non hai ancora inserito commenti. Procedi inserendo su SalesForce il tuo parere relativamente alla
                    richiesta di proroga dell&#39;Ente.</div>` : ``}</div></div> </div> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let contrattualizzazioni;
  let contrattualizzazioni7;
  let contrattualizzazioni30;
  let contrattualizzazionip30;
  let completamenti;
  let completamenti7;
  let completamenti30;
  let completamentip30;
  let richiestedivariazione;
  let richiestedivariazione90;
  let richiestedivariazioneno90;
  moment.locale("it");
  let { data } = $$props;
  let cperpagecontr;
  let cpcontr = 0;
  let cperpagecompl;
  let cpcompl = 0;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    contrattualizzazioni = data.scadenze.filter((f) => f.RecordType.Name === "Contrattualizzazione Fornitore");
    contrattualizzazioni7 = contrattualizzazioni.filter((s) => moment(s.outfunds__Due_Date__c, "YYYY-MM-DD").isBefore(moment().add(7, "days")));
    contrattualizzazioni30 = contrattualizzazioni.filter((s) => moment(s.outfunds__Due_Date__c, "YYYY-MM-DD").isBefore(moment().add(30, "days")) && moment(s.outfunds__Due_Date__c, "YYYY-MM-DD").isAfter(moment().add(7, "days")));
    contrattualizzazionip30 = contrattualizzazioni.filter((s) => moment(s.outfunds__Due_Date__c, "YYYY-MM-DD").isAfter(moment().add(30, "days")));
    completamenti = data.scadenze.filter((f) => f.RecordType.Name === "Completamento Attività");
    completamenti7 = completamenti.filter((s) => moment(s.outfunds__Due_Date__c, "YYYY-MM-DD").isBefore(moment().add(7, "days")));
    completamenti30 = completamenti.filter((s) => moment(s.outfunds__Due_Date__c, "YYYY-MM-DD").isBefore(moment().add(30, "days")) && moment(s.outfunds__Due_Date__c, "YYYY-MM-DD").isAfter(moment().add(7, "days")));
    completamentip30 = completamenti.filter((s) => moment(s.outfunds__Due_Date__c, "YYYY-MM-DD").isAfter(moment().add(30, "days")));
    richiestedivariazione = data.scadenze.filter((s) => {
      return s.rv.length > 0;
    });
    richiestedivariazione90 = data.scadenze.filter((s) => {
      return s.rv.length > 0 && Number(s.rv[0].Giorni_richiesti__c) >= 90;
    });
    richiestedivariazioneno90 = data.scadenze.filter((s) => {
      return s.rv.length > 0 && Number(s.rv[0].Giorni_richiesti__c) < 90;
    });
    $$rendered = `<div class="container my-4"><h1 data-svelte-h="svelte-1ss0cv1">Scadenze</h1> ${validate_component(Cite, "Cite").$$render(
      $$result,
      {
        text: "Le scadenze sono positive. Ti aiutano a organizzare il tuo tempo. Ti aiutano a fissare delle priorità. Ti fanno fare le cose anche quando non ne hai voglia.",
        author: "Harvey Mackay"
      },
      {},
      {}
    )}</div> <div class="container"><div class="row"><div class="col-12 col-lg-2" data-svelte-h="svelte-zmckl"><div data-bs-toggle="sticky" data-bs-stackable="true"><nav class="navbar it-navscroll-wrapper navbar-expand-lg it-bottom-navscroll it-right-side" data-bs-navscroll><button class="custom-navbar-toggler" type="button" aria-controls="navbarNavProgress" aria-expanded="false" aria-label="Toggle navigation" data-bs-toggle="navbarcollapsible" data-bs-target="#navbarNavProgress"><span class="it-list"></span>1. Riepilogo</button> <div class="progress custom-navbar-progressbar"><div class="progress-bar it-navscroll-progressbar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div> <div class="navbar-collapsable" id="navbarNavProgress"><div class="overlay"></div> <button type="button" class="it-back-button btn w-100 text-start"><svg class="icon icon-sm icon-primary align-top"><use href="/svg/sprites.svg#it-chevron-left" xlink:href="/svg/sprites.svg#it-chevron-left"></use></svg> <span>Indietro</span></button> <div class="menu-wrapper"><div class="link-list-wrapper"><h3>sezioni</h3> <div class="progress"><div class="progress-bar it-navscroll-progressbar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div> <ul class="link-list"><li class="nav-item"><a class="nav-link active" href="#riepilogoscadenze"><span>1. Riepilogo</span></a> <ul class="link-list"><li class="nav-link"><a class="nav-link" href="#scadenzecontrattualizzazioni"><span>1.1 Scadenze contrattualizzazione</span></a></li> <li class="nav-link"><a class="nav-link" href="#scadenzecompletamenti"><span>1.2 Scadenze completamento attività</span></a></li> <li class="nav-link"><a class="nav-link" href="#proroghe90giorni"><span>1.3 Richieste di proroga in corso</span></a></li></ul></li></ul></div></div></div></nav></div></div> <div class="col-12 col-lg-10 it-page-sections-container"><div class="it-page-section my-5" id="riepilogoscadenze" data-svelte-h="svelte-1ytt8ux"><h4>Riepilogo</h4> <p>In questa sezione potrai consultare tutte le scadenze dei cronoprogrammi relative alle
					candidature appartenenti al tuo portafoglio. Potrai inoltre vedere le <strong>richieste di variazione di cronoprogramma con numero di giorni maggiore di 90 ed ancora
						in corso</strong>; per queste richieste è necssario il tuo parere affinche Unità di Missione possa
					procedere con la valutazione.</p> <p>Per avere una visione globale del tuo portafoglio, consulta la pagina <a href="/cruscotti/generale">Cruscotto generale</a></p></div> <div class="it-page-section my-5" id="scadenzecontrattualizzazioni"><h4 data-svelte-h="svelte-1qp8hrx">Scadenze contrattualizzazione</h4> <p>Nel tuo portafoglio sono presenti <strong>${escape(contrattualizzazioni.length)} candidature in fase di contrattualizzazione fornitore.</strong></p> <div class="row my-4"><div class="col-12 col-lg-4">${validate_component(Scorecard, "Scorecard").$$render(
      $$result,
      {
        bgcolor: "danger",
        textcolor: "white",
        title: contrattualizzazioni7.length,
        text: "contrattualizzazioni entro 7 giorni"
      },
      {},
      {}
    )}</div> <div class="col-12 col-lg-4">${validate_component(Scorecard, "Scorecard").$$render(
      $$result,
      {
        bgcolor: "warning",
        textcolor: "white",
        title: contrattualizzazioni30.length,
        text: "contrattualizzazioni entro 30 giorni"
      },
      {},
      {}
    )}</div> <div class="col-12 col-lg-4">${validate_component(Scorecard, "Scorecard").$$render(
      $$result,
      {
        bgcolor: "primary",
        textcolor: "white",
        title: contrattualizzazionip30.length,
        text: "contrattualizzazioni a più di 30 giorni"
      },
      {},
      {}
    )}</div></div> <div class="container my-4"><div class="table-responsive"><table class="table table-hover table-sm caption-top align-middle"><caption data-svelte-h="svelte-1100al9">Scadenze contrattualizzazione</caption> <thead data-svelte-h="svelte-1foz0qh"><tr><th>Ente</th> <th>Avviso</th> <th>Scadenza</th> <th>Richiesta Variazione</th> <th></th></tr></thead> <tbody>${cperpagecontr ? `${each(cperpagecontr, (c) => {
      return `<tr${add_attribute(
        "class",
        moment(c.outfunds__Due_Date__c, "YYYY-MM-DD").isBefore(moment().add(7, "days")) ? "text-danger" : moment(c.outfunds__Due_Date__c, "YYYY-MM-DD").isAfter(moment().add(30, "days")) ? "text-primary" : "text-warning",
        0
      )}><td><small>${escape(c.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Name)}</small></td> <td><small>${escape(c.outfunds__Funding_Request__r.outfunds__FundingProgram__r.Name)}</small></td> <td><small>${escape(moment(c.outfunds__Due_Date__c, "YYYY-MM-DD").format("DD/MM/YYYY"))}</small></td> <td><small>${c.rv && c.rv.length > 0 ? `
														SI - ${escape(c.rv[0].Giorni_richiesti__c)} giorni
													` : `
														NO
													`}</small></td> <td><a href="${"/op/candidatura/" + escape(c.outfunds__Funding_Request__r.Id, true)}" target="_blank"><svg class="icon icon-sm icon-primary"><use href="/svg/sprites.svg#it-zoom-in"></use></svg> </a></td> </tr>`;
    })}` : ``}</tbody> <tfoot><tr><th colspan="5">${validate_component(Pagination, "Pagination").$$render(
      $$result,
      {
        rows: contrattualizzazioni,
        perPage: 10,
        cp: cpcontr,
        trimmedRows: cperpagecontr
      },
      {
        cp: ($$value) => {
          cpcontr = $$value;
          $$settled = false;
        },
        trimmedRows: ($$value) => {
          cperpagecontr = $$value;
          $$settled = false;
        }
      },
      {}
    )}</th></tr></tfoot></table></div></div></div> <div class="it-page-section my-5" id="scadenzecompletamenti"><h4 data-svelte-h="svelte-1y3ockm">Scadenze completamento attività</h4> <p>Nel tuo portafoglio sono presenti <strong>${escape(completamenti.length)} candidature in fase di realizzazione.</strong></p> <div class="row my-4"><div class="col-12 col-lg-4">${validate_component(Scorecard, "Scorecard").$$render(
      $$result,
      {
        bgcolor: "danger",
        textcolor: "white",
        title: completamenti7.length,
        text: "completamenti attività entro 7 giorni"
      },
      {},
      {}
    )}</div> <div class="col-12 col-lg-4">${validate_component(Scorecard, "Scorecard").$$render(
      $$result,
      {
        bgcolor: "warning",
        textcolor: "white",
        title: completamenti30.length,
        text: "completamenti attività entro 30 giorni"
      },
      {},
      {}
    )}</div> <div class="col-12 col-lg-4">${validate_component(Scorecard, "Scorecard").$$render(
      $$result,
      {
        bgcolor: "primary",
        textcolor: "white",
        title: completamentip30.length,
        text: "completamenti attività a più di 30 giorni"
      },
      {},
      {}
    )}</div></div> <div class="container my-4"><div class="table-responsive"><table class="table table-hover table-sm caption-top align-middle"><caption data-svelte-h="svelte-13hpazz">Scadenze completamento</caption> <thead data-svelte-h="svelte-1foz0qh"><tr><th>Ente</th> <th>Avviso</th> <th>Scadenza</th> <th>Richiesta Variazione</th> <th></th></tr></thead> <tbody>${cperpagecompl ? `${each(cperpagecompl, (c) => {
      return `<tr${add_attribute(
        "class",
        moment(c.outfunds__Due_Date__c, "YYYY-MM-DD").isBefore(moment().add(7, "days")) ? "text-danger" : moment(c.outfunds__Due_Date__c, "YYYY-MM-DD").isAfter(moment().add(30, "days")) ? "text-primary" : "text-warning",
        0
      )}><td><small>${escape(c.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Name)}</small></td> <td><small>${escape(c.outfunds__Funding_Request__r.outfunds__FundingProgram__r.Name)}</small></td> <td><small>${escape(moment(c.outfunds__Due_Date__c, "YYYY-MM-DD").format("DD/MM/YYYY"))}</small></td> <td><small>${c.rv && c.rv.length > 0 ? `
														SI - ${escape(c.rv[0].Giorni_richiesti__c)} giorni
													` : `
														NO
													`}</small></td> <td><a href="${"/op/candidatura/" + escape(c.outfunds__Funding_Request__r.Id, true)}" target="_blank"><svg class="icon icon-sm icon-primary"><use href="/svg/sprites.svg#it-zoom-in"></use></svg> </a></td> </tr>`;
    })}` : ``}</tbody> <tfoot><tr><th colspan="5">${validate_component(Pagination, "Pagination").$$render(
      $$result,
      {
        rows: completamenti,
        perPage: 10,
        cp: cpcompl,
        trimmedRows: cperpagecompl
      },
      {
        cp: ($$value) => {
          cpcompl = $$value;
          $$settled = false;
        },
        trimmedRows: ($$value) => {
          cperpagecompl = $$value;
          $$settled = false;
        }
      },
      {}
    )}</th></tr></tfoot></table></div></div></div> <div class="it-page-section my-5" id="proroghe90giorni"><h4 data-svelte-h="svelte-nv31l0">Richieste di proroga in corso</h4> ${richiestedivariazione.length === 0 ? `<div class="alert alert-success" role="alert" data-svelte-h="svelte-1bd02eh">Non ci sono richieste di proroga in corso</div>` : `${richiestedivariazione90.length === 0 ? `<div class="alert alert-success" role="alert" data-svelte-h="svelte-ijairb">Non hai richieste di proroga per le quali è necessario un parere dell&#39;Account Manager.</div>` : `<div class="alert alert-danger" role="alert">Nel tuo portafoglio sono presenti ${escape(richiestedivariazione90.length)} richieste di proroga
							per le quali è necessario un parere dell&#39;Account Manager.</div> <div class="row my-4">${each(richiestedivariazione90, (s) => {
      return `<div class="col-12 col-lg-6">${validate_component(Richiestavariazionecard, "Richiestavariazionecard").$$render($$result, { idu: data.idusf, scadenza: s }, {}, {})} </div>`;
    })}</div>`} ${richiestedivariazioneno90.length === 0 ? `<div class="alert alert-success" role="alert" data-svelte-h="svelte-1pdutp2">Non hai richieste di proroga</div>` : `<div class="alert alert-danger" role="alert">Nel tuo portafoglio sono presenti ${escape(richiestedivariazioneno90.length)} richieste di proroga
							in corso.</div> <div class="row my-4">${each(richiestedivariazioneno90, (s) => {
      return `<div class="col-12 col-lg-6">${validate_component(Richiestavariazionecard, "Richiestavariazionecard").$$render($$result, { idu: data.idusf, scadenza: s }, {}, {})} </div>`;
    })}</div>`}`}</div></div></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
