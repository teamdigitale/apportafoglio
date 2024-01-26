import { c as create_ssr_component, d as add_attribute, v as validate_component, f as each, e as escape } from "../../../../chunks/ssr.js";
import { C as Cite } from "../../../../chunks/cite.js";
import moment from "moment/min/moment-with-locales.js";
import { P as Pagination } from "../../../../chunks/pagination.js";
const Stackedbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id = "-" } = $$props;
  let { values = [[]] } = $$props;
  let { direction = "vertical" } = $$props;
  let chart;
  let options = {
    chart: {},
    bars: direction,
    isStacked: false
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
    ch.draw(d, ops);
  };
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.values === void 0 && $$bindings.values && values !== void 0)
    $$bindings.values(values);
  if ($$props.direction === void 0 && $$bindings.direction && direction !== void 0)
    $$bindings.direction(direction);
  {
    redraw(chart, values, options);
  }
  return ` <div${add_attribute("id", id, 0)}></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let rangeMin;
  let rangeMax;
  let filteredContatti;
  let result;
  moment.locale("it");
  let { data } = $$props;
  let cperpage;
  let cp = 0;
  function getDatesBetween(startDate, endDate) {
    let currentDate = moment(startDate).clone().startOf("day");
    const dates = [];
    while (currentDate <= endDate) {
      dates.push(moment(new Date(currentDate)).clone().startOf("day"));
      currentDate = currentDate.add(1, "d");
    }
    return dates;
  }
  const rangeOptions = ["Questo mese", "Dal mese scorso", "Questo quarter", "Questo anno", "Sempre"];
  let range = rangeOptions[0];
  let topten = data.contatti.reduce(
    (b, a) => {
      let index = b.findIndex((j) => j.ente === a.Account.Name);
      if (index > -1)
        b[index].count++;
      else
        b.push({ ente: a.Account.Name, count: 1 });
      return b;
    },
    []
  ).sort((a, b) => {
    return Number(a.count) < Number(b.count) ? 1 : Number(a.count) > Number(b.count) ? -1 : 0;
  }).filter((x, index) => index < 10);
  let worstten = data.contatti.reduce(
    (b, a) => {
      let index = b.findIndex((j) => j.ente === a.Account.Name);
      if (index > -1)
        b[index].count++;
      else
        b.push({ ente: a.Account.Name, count: 1 });
      return b;
    },
    []
  ).sort((a, b) => {
    return Number(a.count) < Number(b.count) ? -1 : Number(a.count) > Number(b.count) ? 1 : 0;
  }).filter((x, index) => index < 10);
  let getTopTen = () => {
    const result2 = [["Ente", "Numero contatti"]];
    topten.forEach((e) => {
      result2.push([e.ente, e.count]);
    });
    return result2;
  };
  function getWorstTen() {
    const result2 = [["Ente", "Numero contatti"]];
    worstten.forEach((e) => {
      result2.push([e.ente, e.count]);
    });
    return result2;
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    rangeMin = range === "Questo mese" ? moment().startOf("month").toDate() : range === "Dal mese scorso" ? moment().startOf("month").subtract(1, "months").toDate() : range === "Questo quarter" ? moment().startOf("quarter").toDate() : range === "Questo anno" ? moment().startOf("year").toDate() : moment().startOf("year").subtract(3, "months").toDate();
    rangeMax = moment().toDate();
    getDatesBetween(rangeMin, rangeMax);
    filteredContatti = data.contatti.filter(function(c) {
      return moment(c.CreatedDate).isAfter(moment(rangeMin));
    });
    result = [[]];
    $$rendered = `<div class="container my-4"><h1 data-svelte-h="svelte-pujbj2">Contatti</h1> ${validate_component(Cite, "Cite").$$render(
      $$result,
      {
        text: "Un manager con il cellulare entrò in una cabina telefonica e pianse di nostalgia.",
        author: "Federico Bini"
      },
      {},
      {}
    )}</div> <div class="container"><div class="row"><div class="col-12 col-lg-2" data-svelte-h="svelte-12cegy5"><div data-bs-toggle="sticky" data-bs-stackable="true"><nav class="navbar it-navscroll-wrapper navbar-expand-lg it-bottom-navscroll it-right-side" data-bs-navscroll><button class="custom-navbar-toggler" type="button" aria-controls="navbarNavProgress" aria-expanded="false" aria-label="Toggle navigation" data-bs-toggle="navbarcollapsible" data-bs-target="#navbarNavProgress"><span class="it-list"></span>1. Riepilogo</button> <div class="progress custom-navbar-progressbar"><div class="progress-bar it-navscroll-progressbar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div> <div class="navbar-collapsable" id="navbarNavProgress"><div class="overlay"></div> <button type="button" class="it-back-button btn w-100 text-start"><svg class="icon icon-sm icon-primary align-top"><use href="/svg/sprites.svg#it-chevron-left" xlink:href="/svg/sprites.svg#it-chevron-left"></use></svg> <span>Indietro</span></button> <div class="menu-wrapper"><div class="link-list-wrapper"><h3>sezioni</h3> <div class="progress"><div class="progress-bar it-navscroll-progressbar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div> <ul class="link-list"><li class="nav-item"><a class="nav-link active" href="#riepilogo"><span>1. Riepilogo</span></a></li> <li class="nav-item"><a class="nav-link active" href="#topten"><span>2. I più contattati</span></a></li> <li class="nav-item"><a class="nav-link active" href="#worstten"><span>3. I meno contattati</span></a></li></ul></div></div></div></nav></div></div> <div class="col-12 col-lg-10 it-page-sections-container"><div class="it-page-section my-5" id="riepilogo"><h4 data-svelte-h="svelte-xi05f6">Riepilogo</h4> <p data-svelte-h="svelte-z04b4t">In questa sezione puoi consultare i contatti con gli Enti che hai registrato. Puoi vedere
					i contatti anche in base ad un periodo temporale a tua scelta.</p> <div class="row"><div class="col-12 col-lg-8 my-4"><div class="select-wrapper"><label for="filterRange" data-svelte-h="svelte-944zmh">Periodo</label> <select id="filterRange" name="filterRange">${each(rangeOptions, (a) => {
      return `<option${add_attribute("value", a, 0)}>${escape(a)}</option>`;
    })}</select></div></div> <div class="col-12 col-lg-4 my-4">${escape(moment(rangeMin).format("DD/MM/YYYY"))} - ${escape(moment(rangeMax).format("DD/MM/YYYY"))}</div></div> <div class="row"><div class="col-12 col-lg-12 my-4">${validate_component(Stackedbar, "Stackedbar").$$render(
      $$result,
      {
        values: result,
        id: "contatti",
        direction: "vertical"
      },
      {},
      {}
    )}</div></div> <div class="row"><div class="col-12 col-lg-12 my-4"><div class="table-responsive"><table class="table table-hover table-sm caption-top align-middle"><caption data-svelte-h="svelte-197zmok">Contatti risultanti in base al periodo impostato</caption> <thead data-svelte-h="svelte-ibqf92"><tr><th>Data</th> <th>Ente</th> <th>Tipo</th> <th>Oggetto</th> <th>Descrizione</th></tr></thead> <tbody>${cperpage ? `${each(cperpage, (d) => {
      return `<tr><td><small>${escape(moment(d.CreatedDate).format("DD/MM/YYYY"))}</small></td> <td><small>${escape(d.Account.Name)}</small></td> <td><svg class="icon icon-xs"><use href="${"/svg/sprites.svg#it-" + escape(d.Tipo === "Contatto diretto" ? "telephone" : "calendar", true)}"></use></svg></td> <td><small>${escape(d.Subject ? d.Subject : "n.d.")}</small></td> <td><small>${escape(d.Description ? d.Description : "n.d.")}</small></td> </tr>`;
    })}` : ``}</tbody> <tfoot><tr><th colspan="8">${validate_component(Pagination, "Pagination").$$render(
      $$result,
      {
        rows: filteredContatti,
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
    )}</th></tr></tfoot></table></div></div></div></div> <div class="it-page-section my-5" id="topten"><h4 data-svelte-h="svelte-1cz155r">I dieci più contattati di sempre</h4> <ol>${each(getTopTen(), (a, index) => {
      return `${index > 0 ? `<li>${escape(a[0])}: <strong>${escape(a[1])}</strong></li>` : ``}`;
    })}</ol></div> <div class="it-page-section my-5" id="worstten"><h4 data-svelte-h="svelte-1yywbec">I dieci meno contattati di sempre</h4> <ol>${each(getWorstTen(), (a, index) => {
      return `${index > 0 ? `<li>${escape(a[0])}: <strong>${escape(a[1])}</strong></li>` : ``}`;
    })}</ol></div></div></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
