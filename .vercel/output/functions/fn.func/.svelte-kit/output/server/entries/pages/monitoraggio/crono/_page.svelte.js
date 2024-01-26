import { c as create_ssr_component, d as add_attribute, f as each, e as escape, v as validate_component } from "../../../../chunks/ssr.js";
import moment from "moment/min/moment-with-locales.js";
const Columnchart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id = "-" } = $$props;
  let { values = [[]] } = $$props;
  let { title } = $$props;
  let { xlabel } = $$props;
  let { ylabel } = $$props;
  let { stacked = false } = $$props;
  let chart;
  let options = {
    isStacked: stacked,
    chartArea: { top: 10, height: "50%" },
    height: 400,
    hAxis: {
      title: xlabel,
      slantedText: true,
      slantedTextAngle: 30,
      format: "MM-YYYY",
      textStyle: {
        fontSize: 12,
        color: "#000000",
        bold: false,
        italic: false,
        fontName: "Titillium Web"
      },
      titleTextStyle: {
        fontSize: 14,
        color: "#000000",
        bold: false,
        italic: false,
        fontName: "Titillium Web"
      }
    },
    vAxis: {
      title: ylabel,
      textStyle: {
        fontSize: 14,
        color: "#000000",
        bold: false,
        italic: false,
        fontName: "Titillium Web"
      },
      titleTextStyle: {
        fontSize: 14,
        color: "#000000",
        bold: false,
        italic: false,
        fontName: "Titillium Web"
      }
    },
    title,
    backgroundColor: { fill: "transparent" },
    legend: {
      position: "bottom",
      textStyle: {
        fontSize: 12,
        color: "#000000",
        bold: false,
        italic: false,
        fontName: "Titillium Web"
      }
    }
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
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.xlabel === void 0 && $$bindings.xlabel && xlabel !== void 0)
    $$bindings.xlabel(xlabel);
  if ($$props.ylabel === void 0 && $$bindings.ylabel && ylabel !== void 0)
    $$bindings.ylabel(ylabel);
  if ($$props.stacked === void 0 && $$bindings.stacked && stacked !== void 0)
    $$bindings.stacked(stacked);
  {
    redraw(chart, values, options);
  }
  return ` <div${add_attribute("id", id, 0)}></div>`;
});
const Combochart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id = "-" } = $$props;
  let { values = [[]] } = $$props;
  let { title } = $$props;
  let { xlabel } = $$props;
  let { ylabel } = $$props;
  let { stacked = false } = $$props;
  let chart;
  let options = {
    isStacked: stacked,
    chartArea: { top: 10, height: "50%" },
    height: 400,
    seriesType: "bars",
    series: { 2: { type: "steppedArea" } },
    hAxis: {
      title: xlabel,
      slantedText: true,
      slantedTextAngle: 30,
      format: "MM-YYYY",
      textStyle: {
        fontSize: 12,
        color: "#000000",
        bold: false,
        italic: false,
        fontName: "Titillium Web"
      },
      titleTextStyle: {
        fontSize: 14,
        color: "#000000",
        bold: false,
        italic: false,
        fontName: "Titillium Web"
      }
    },
    vAxis: {
      title: ylabel,
      textStyle: {
        fontSize: 14,
        color: "#000000",
        bold: false,
        italic: false,
        fontName: "Titillium Web"
      },
      titleTextStyle: {
        fontSize: 14,
        color: "#000000",
        bold: false,
        italic: false,
        fontName: "Titillium Web"
      }
    },
    title,
    backgroundColor: { fill: "transparent" },
    legend: {
      position: "bottom",
      textStyle: {
        fontSize: 12,
        color: "#000000",
        bold: false,
        italic: false,
        fontName: "Titillium Web"
      }
    }
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
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.xlabel === void 0 && $$bindings.xlabel && xlabel !== void 0)
    $$bindings.xlabel(xlabel);
  if ($$props.ylabel === void 0 && $$bindings.ylabel && ylabel !== void 0)
    $$bindings.ylabel(ylabel);
  if ($$props.stacked === void 0 && $$bindings.stacked && stacked !== void 0)
    $$bindings.stacked(stacked);
  {
    redraw(chart, values, options);
  }
  return ` <div${add_attribute("id", id, 0)}></div>`;
});
function calcolaRange(s, e) {
  const d = [];
  let current = new Date(s.getFullYear(), s.getMonth(), 1);
  current.setHours(0);
  current.setMinutes(0);
  current.setSeconds(0);
  current.setMilliseconds(0);
  while (current < e) {
    let lastDayOfMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0);
    lastDayOfMonth.setHours(23);
    lastDayOfMonth.setMinutes(59);
    lastDayOfMonth.setSeconds(59);
    lastDayOfMonth.setMilliseconds(999);
    d.push(lastDayOfMonth);
    current.setDate(lastDayOfMonth.getDate() + 1);
    current.setHours(0);
    current.setMinutes(0);
    current.setSeconds(0);
    current.setMilliseconds(0);
  }
  return d;
}
function getQuarter(d) {
  d = d || /* @__PURE__ */ new Date();
  var m = Math.floor(d.getMonth() / 3) + 1;
  return m > 4 ? m - 4 : m;
}
function calcolaQuarters(s, e) {
  const d = [];
  let current = new Date(s.getFullYear(), s.getMonth(), 1);
  current.setHours(0);
  current.setMinutes(0);
  current.setSeconds(0);
  current.setMilliseconds(0);
  while (current < e) {
    const q = getQuarter(new Date(current));
    const y = new Date(current).getFullYear();
    const quarter = "Q-" + y + "-" + q;
    if (d.indexOf(quarter) === -1) {
      d.push(quarter);
    }
    current.setDate(current.getDate() + 1);
    current.setHours(0);
    current.setMinutes(0);
    current.setSeconds(0);
    current.setMilliseconds(0);
  }
  return d;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredScadenze;
  let getDataScadenze;
  let getDataScadenzeQuarters;
  let filteredEnti;
  let numeroTarget;
  let getQuartersBucket;
  let positivi;
  let inlavorazione;
  let mancantiAltarget;
  let getQuartersBucketMax;
  let { data } = $$props;
  moment.locale("it");
  console.log(data);
  let misure = ["Tutte le misure"].concat(Object.values(data.scadenze.reduce(
    (a, m) => {
      a[m.outfunds__Funding_Request__r.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name] = a[m.outfunds__Funding_Request__r.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name] || {
        misura: m.outfunds__Funding_Request__r.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name,
        count: 0
      };
      a[m.outfunds__Funding_Request__r.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name].count++;
      return a;
    },
    /* @__PURE__ */ Object.create(null)
  )).map((x) => x.misura).sort());
  let tipiente = ["Tutte le tipologie"].concat(Object.values(data.scadenze.reduce(
    (a, m) => {
      a[m.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Tipologia_Ente__c] = a[m.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Tipologia_Ente__c] || {
        tipoente: m.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Tipologia_Ente__c,
        count: 0
      };
      a[m.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Tipologia_Ente__c].count++;
      return a;
    },
    /* @__PURE__ */ Object.create(null)
  )).map((x) => x.tipoente).sort());
  let filterMisure = misure[0];
  let filterTipoEnte = tipiente[0];
  let datesRange = calcolaRange(/* @__PURE__ */ new Date(), new Date(2026, 11, 31));
  let quartersRange = calcolaQuarters(/* @__PURE__ */ new Date(), new Date(2026, 11, 31));
  let dataTarget = "2026-12-31";
  let percentualeTarget = 80;
  let percentualeSicurezzaBucket = 10;
  let quartersBuffer = "2";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  filteredScadenze = data.scadenze.filter((s) => filterMisure === misure[0] ? true : s.outfunds__Funding_Request__r.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name === filterMisure).filter((s) => filterTipoEnte === tipiente[0] ? true : s.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Tipologia_Ente__c === filterTipoEnte);
  getDataScadenze = () => {
    const res = [["Mese", "# contrattualizzate", "# da contrattualizzare"]];
    datesRange.forEach((d) => {
      const numero = filteredScadenze.filter((f) => f.tipologia === "Contrattualizzati" && d.getFullYear() === new Date(f.outfunds__Due_Date__c).getFullYear() && d.getMonth() === new Date(f.outfunds__Due_Date__c).getMonth()).reduce((acc, c) => acc + 1, 0);
      const numeroDaContr = filteredScadenze.filter((f) => f.tipologia === "Da contrattualizzare" && d.getFullYear() === new Date(f.outfunds__Due_Date__c).getFullYear() && d.getMonth() === new Date(f.outfunds__Due_Date__c).getMonth()).reduce((acc, c) => acc + 1, 0);
      res.push([d, numero, numeroDaContr]);
    });
    return res;
  };
  getDataScadenzeQuarters = () => {
    const res = [["Quarter", "# contrattualizzate", "# da contrattualizzare"]];
    quartersRange.forEach((d) => {
      const numero = filteredScadenze.filter((f) => f.tipologia === "Contrattualizzati" && d === f.quarter).reduce((acc, c) => acc + 1, 0);
      const numerocontr = filteredScadenze.filter((f) => f.tipologia === "Da contrattualizzare" && d === f.quarter).reduce((acc, c) => acc + 1, 0);
      res.push([d, numero, numerocontr]);
    });
    return res;
  };
  filteredEnti = data.enti.filter((e) => filterTipoEnte === tipiente[0] ? true : e.Tipologia_Ente__c === filterTipoEnte);
  numeroTarget = Math.round(filteredEnti.length * percentualeTarget / 100);
  getQuartersBucket = () => {
    const q = calcolaQuarters(/* @__PURE__ */ new Date(), new Date(dataTarget));
    const res = q.splice(1, q.length);
    for (let x = 0; x < Number(quartersBuffer); x++) {
      res.pop();
    }
    return res;
  };
  positivi = data.positivi.filter((p) => p.Ultimo_Esito_Conformit_Tecnica__c === "Positivo" && (filterTipoEnte === tipiente[0] ? true : p.outfunds__Applying_Organization__r.Tipologia_Ente__c === filterTipoEnte) && (filterMisure === misure[0] ? true : p.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name === filterMisure));
  inlavorazione = data.positivi.filter((p) => p.Ultimo_Esito_Conformit_Tecnica__c !== "Positivo" && p.outfunds__Status__c === "FINANZIATA" && (filterTipoEnte === tipiente[0] ? true : p.outfunds__Applying_Organization__r.Tipologia_Ente__c === filterTipoEnte) && (filterMisure === misure[0] ? true : p.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name === filterMisure));
  mancantiAltarget = numeroTarget - positivi.length;
  getQuartersBucketMax = () => {
    const qnominali = getDataScadenzeQuarters();
    qnominali[0].push("Capienza massima");
    const q = getQuartersBucket();
    {
      for (let z = 1; z < qnominali.length; z++) {
        qnominali[z].push(0);
        for (let y = 0; y < q.length; y++) {
          if (q[y] === qnominali[z][0]) {
            qnominali[z][3] = Math.round(mancantiAltarget / q.length * (1 + percentualeSicurezzaBucket / 100));
          }
        }
      }
    }
    return qnominali;
  };
  return `<div class="container"><div class="row"><div class="col-12 col-lg-2"><div data-bs-toggle="sticky" data-bs-stackable="true" class="bg-white border-end px-2"><h6 class="text-primary" data-svelte-h="svelte-8lzqye">Dimensione di analisi</h6> <div class="row my-4"><div class="col-12 col-lg-12 my-4"><div class="select-wrapper"><label for="filterMisura" data-svelte-h="svelte-1ptkplo">Misura</label> <select id="filterMisura" name="filterMisura">${each(misure, (m) => {
    return `<option${add_attribute("value", m, 0)}>${escape(m)}</option>`;
  })}</select></div></div> <div class="col-12 col-lg-12 my-4"><div class="select-wrapper"><label for="filterTipoEnte" data-svelte-h="svelte-cwkc38">Tipologia ente</label> <select id="filterTipoEnte" name="filterTipoEnte">${each(tipiente, (t) => {
    return `<option${add_attribute("value", t, 0)}>${escape(t)}</option>`;
  })}</select></div></div></div> <h6 class="text-primary mt-y-5" data-svelte-h="svelte-ci62x4">Impostazione del target</h6> <div class="col-12 col-lg-12 my-4"><div class="form-group"><label for="percentualePlatea" class="input-number-label active">% platea totale (${escape(filteredEnti.length)} enti)</label> <div class="input-group input-numbers input-number-percentage"><span class="input-group-text fw-semibold" data-svelte-h="svelte-p26svp">%</span> <input type="number" class="form-control" data-bs-input id="percentualePlatea" name="percentualePlatea" min="0" max="100" step="10"${add_attribute("value", percentualeTarget, 0)}></div></div></div> <div class="col-12 col-lg-12 my-4"><div class="form-group"><label class="active" for="dateStandard" data-svelte-h="svelte-jsirnr">Data target</label> <input type="date" id="dateStandard" name="dataTarget"${add_attribute("value", dataTarget, 0)}></div></div> <h6 class="text-primary mt-y-5" data-svelte-h="svelte-r7dfy4">Impostazioni dello scenario di calcolo</h6> <div class="col-12 col-lg-12 my-4"><div class="select-wrapper"><label for="quartersBuffer" data-svelte-h="svelte-dq1yt6">Quarters buffer</label> <select id="quartersBuffer" name="quartersBuffer"><option value="0" data-svelte-h="svelte-2amafi">0</option><option value="1" data-svelte-h="svelte-s3mayk">1</option><option value="2" data-svelte-h="svelte-1qn7u32">2</option><option value="3" data-svelte-h="svelte-ngoftk">3</option><option value="4" data-svelte-h="svelte-1pdmwum">4</option></select></div></div> <div class="col-12 col-lg-12 my-4"><div class="select-wrapper"><label for="filterModalitaBucket" data-svelte-h="svelte-dhe4sx">Modalità di distribuzione</label> <select id="filterModalitaBucket" name="filterModalitaBucket"><option value="Costante" data-svelte-h="svelte-10knjtu">Costante</option><option value="m25" data-svelte-h="svelte-1mpts6s">Decrescente (25%)</option><option value="m50" data-svelte-h="svelte-1lnd68s">Decrescente (50%)</option><option value="m75" data-svelte-h="svelte-nrakz6">Decrescente (75%)</option><option value="p25" data-svelte-h="svelte-ii8v8g">Crescente (25%)</option><option value="p50" data-svelte-h="svelte-3bspnc">Crescente (50%)</option><option value="p75" data-svelte-h="svelte-1d3f7ze">Crescente (75%)</option></select></div></div> <div class="col-12 col-lg-12 my-4"><div class="form-group"><label for="percentualeSicurezzaBucket" class="input-number-label active" data-svelte-h="svelte-qq8ftl">% di sicurezza bucket</label> <div class="input-group input-numbers input-number-percentage"><span class="input-group-text fw-semibold" data-svelte-h="svelte-p26svp">%</span> <input type="number" class="form-control" data-bs-input id="percentualeSicurezzaBucket" name="percentualeSicurezzaBucket" min="0" max="100" step="1"${add_attribute("value", percentualeSicurezzaBucket, 0)}></div></div></div></div></div> <div class="col-12 col-lg-10"><div class="row">${filterMisure === misure[0] ? `<div class="alert alert-info" role="alert" data-svelte-h="svelte-1lowob2"><p>Selezionare una misura dal pannello a sinistra</p></div>` : `<div class="col-12 col-lg-12 my-4"><h4 class="h4" data-svelte-h="svelte-r8t1s4">Situazione attuale</h4> <p data-svelte-h="svelte-ddfatc">Distribuzione della previsione di completamento attività per mese</p> ${validate_component(Columnchart, "Columnchart").$$render(
    $$result,
    {
      id: "scadenzebar",
      values: getDataScadenze(),
      titleColor: "primary",
      title: "Distribuzione attuale delle date di completamento",
      xlabel: "Mesi",
      ylabel: "Numero di candidature",
      stacked: "true"
    },
    {},
    {}
  )} <p data-svelte-h="svelte-14t42j1">Distribuzione della previsione di completamento attività per quarter (&quot;Q-<i>anno</i>-<i>numero_quarter</i>&quot;)</p> ${validate_component(Columnchart, "Columnchart").$$render(
    $$result,
    {
      id: "scadenzebarquarters",
      values: getDataScadenzeQuarters(),
      titleColor: "primary",
      title: "Distribuzione attuale delle date di completamento",
      xlabel: "Quarters",
      ylabel: "Numero di candidature",
      stacked: "true"
    },
    {},
    {}
  )}</div> <div class="col-12 col-lg-12"><div class="row"><div class="col-12 col-lg-12"><p class="text-primary">Numero di Enti target: <strong>${escape(numeroTarget)}</strong></p></div></div></div> <div class="col-12 col-lg-12 my-4"><h4 class="h4" data-svelte-h="svelte-smcllj">Scenario di calcolo</h4> <p>Totale positivi ad ora: <strong class="text-success">${escape(positivi.length)}</strong></p> <p>Numero candidature mancanti al target: <strong class="text-danger">${escape(mancantiAltarget)}</strong></p> <p>Totale in lavorazione ad ora: <strong class="text-primary">${escape(inlavorazione.length)}</strong></p> ${inlavorazione.length + positivi.length < mancantiAltarget ? `<div class="alert alert-danger" role="alert">Il numero di candidature in lavorazione e positive (<strong>${escape(inlavorazione.length + positivi.length)}</strong>) non è sufficiente al raggiungimento del target.</div>` : `<div class="alert alert-success" role="alert">Il numero di candidature in lavorazione e positive (<strong>${escape(inlavorazione.length + positivi.length)}</strong>) è sufficiente al raggiungimento del target.</div>`} <p>Numero di buckets disponibili: <strong class="text-primary">${escape(getQuartersBucket().length)}</strong></p> <p>Totale capienza buckets: <strong class="text-primary">${escape(getQuartersBucketMax().slice(1).reduce((partialSum, a) => partialSum + a[2] + a[1], 0))}</strong></p> <div class="row"><div class="col-12 col-lg-12 my-4">${validate_component(Combochart, "Combochart").$$render(
    $$result,
    {
      id: "bucketbarquarters",
      values: getQuartersBucketMax(),
      titleColor: "primary",
      title: "Distribuzione capienza bucket",
      xlabel: "Quarters",
      ylabel: "Numero di candidature",
      stacked: "true"
    },
    {},
    {}
  )}</div></div> <div class="table-responsive"><table class="table table-hover table-sm align-middle"><thead data-svelte-h="svelte-sm98ed"><tr><th class="text-center">Bucket<br><span class="is-size-7 has-text-weight-normal">(quarter)</span></th> <th class="text-center">Selezionabile<br></th> <th class="text-center">Capienza<br><span class="is-size-7 has-text-weight-normal">(contatore 1)</span></th> <th class="text-center">Disponbilità<br><span class="is-size-7 has-text-weight-normal">(contatore 2)</span></th> <th class="text-center">Occupazione<br><span class="is-size-7 has-text-weight-normal"></span></th></tr></thead> <tbody>${each(getQuartersBucketMax().slice(1), (q) => {
    return `<tr><td class="text-center"><small>${escape(q[0])}</small></td> <td class="text-center"><small><strong>${escape(q[3] === 0 ? "NO" : "SI")}</strong></small></td> <td class="text-center"><small><strong>${escape(q[3] === 0 ? "n.a." : q[3])}</strong></small></td> <td class="${"text-center " + escape(
      q[3] === 0 ? "" : q[3] - q[2] - q[1] <= 0 ? "text-danger" : "text-success",
      true
    )}"><small><strong>${escape(q[3] === 0 ? "n.a." : q[3] - q[2] - q[1] <= 0 ? 0 : q[3] - q[2] - q[1])}</strong></small></td> <td class="text-center"><small><strong>${escape(q[1] + q[2])}</strong></small></td> </tr>`;
  })}</tbody></table></div></div>`}</div></div></div></div>`;
});
export {
  Page as default
};
