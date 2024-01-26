import { c as create_ssr_component, d as add_attribute, v as validate_component, f as each, e as escape } from "../../../../chunks/ssr.js";
import { C as Cite } from "../../../../chunks/cite.js";
const Columnchartandamenti = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id = "-" } = $$props;
  let { values = [[]] } = $$props;
  let { title } = $$props;
  let { xlabel } = $$props;
  let { ylabel } = $$props;
  let { stacked = false } = $$props;
  let chart;
  let options = {
    isStacked: stacked,
    height: 400,
    width: "80%",
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
    legend: { position: "right" }
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
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  console.log(data);
  let sortedData = data.data.sort((a, b) => a.misura > b.misura ? 1 : b.misura > a.misura ? -1 : a.tipologiaente > b.tipologiaente ? 1 : b.tipologiaente > a.tipologiaente ? -1 : 0);
  let misure = Object.values(sortedData.reduce(
    (a, { misura }) => {
      a[misura] = a[misura] || { misura, count: 0 };
      a[misura].count++;
      return a;
    },
    /* @__PURE__ */ Object.create(null)
  )).map((x) => x.misura).sort();
  let misurah = "";
  let tipologiaeh = "";
  let datesRange = calcolaRange(new Date(2022, 5, 1), new Date(2026, 11, 31));
  function datiAndamentiTecniciPositivi(misura) {
    let result = [["Mese"]];
    let vv = data.data.filter((d) => d.misura === misura);
    vv.forEach((e) => {
      result[0].push(e.tipologiaente);
    });
    datesRange.forEach((e, i) => {
      let row = [e.getFullYear() + "/" + (e.getMonth() + 1)].concat(Array(vv.length).fill(0));
      result.push(row);
      vv.forEach((vals, j) => {
        let item = vals.andamentotecnicipositivi.filter((r) => r.anno === e.getFullYear() && r.mese === e.getMonth() + 1);
        if (item.length === 0) {
          result[i + 1][j + 1] = 0;
        } else {
          result[i + 1][j + 1] = item[0].tecnicipositivi;
        }
      });
    });
    return result;
  }
  function calcolaNumeroMedioPerMese(misura) {
    let vv = data.data.filter((d) => d.misura === misura);
    let somma = 0;
    let numeroMesi = 0;
    datesRange.forEach((e, i) => {
      let esiste = false;
      vv.forEach((vals, j) => {
        let item = vals.andamentotecnicipositivi.filter((r) => r.anno === e.getFullYear() && r.mese === e.getMonth() + 1);
        if (item.length !== 0) {
          esiste = true;
          somma = somma + item[0].tecnicipositivi;
        }
      });
      if (esiste)
        numeroMesi++;
    });
    return [Math.round(somma / numeroMesi), somma, numeroMesi];
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="container my-4"><h1 data-svelte-h="svelte-wkc2xj">Board asseverazioni</h1> ${validate_component(Cite, "Cite").$$render(
    $$result,
    {
      text: "Gestire la qualità è importante perché niente è più così semplice, se davvero lo è mai stato.",
      author: "Philip B. Crosby"
    },
    {},
    {}
  )}</div> <div class="container"><div class="row"><div class="col-12 col-lg-2" data-svelte-h="svelte-e0qm2d"><div data-bs-toggle="sticky" data-bs-stackable="true"><nav class="navbar it-navscroll-wrapper navbar-expand-lg it-bottom-navscroll it-right-side" data-bs-navscroll><button class="custom-navbar-toggler" type="button" aria-controls="navbarNavProgress" aria-expanded="false" aria-label="Toggle navigation" data-bs-toggle="navbarcollapsible" data-bs-target="#navbarNavProgress"><span class="it-list"></span>1. Riepilogo</button> <div class="progress custom-navbar-progressbar"><div class="progress-bar it-navscroll-progressbar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div> <div class="navbar-collapsable" id="navbarNavProgress"><div class="overlay"></div> <button type="button" class="it-back-button btn w-100 text-start"><svg class="icon icon-sm icon-primary align-top"><use href="/svg/sprites.svg#it-chevron-left" xlink:href="/svg/sprites.svg#it-chevron-left"></use></svg> <span>Indietro</span></button> <div class="menu-wrapper"><div class="link-list-wrapper"><h3>sezioni</h3> <div class="progress"><div class="progress-bar it-navscroll-progressbar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div> <ul class="link-list"><li class="nav-item"><a class="nav-link active" href="#asseverazioni"><span>1. Statistiche asseverazioni</span></a> <ul class="link-list"><li class="nav-link"><a class="nav-link" href="#asseverazionitecniche"><span>1.1 Asseverazioni tecniche</span></a></li> <li class="nav-link"><a class="nav-link" href="#asseverazioniformali"><span>1.2 Asseverazioni formali</span></a></li> <li class="nav-link"><a class="nav-link" href="#tempimedicompletamento"><span>1.3 Tempi medi completamento</span></a></li> <li class="nav-link"><a class="nav-link" href="#distribuzioneneltempotecnici"><span>1.4 Andamento nel tempo dei task tecnici positivi</span></a></li></ul></li></ul></div></div></div></nav></div></div> <div class="col-12 col-lg-10 it-page-sections-container"><div class="it-page-section my-5" id="asseverazioni" data-svelte-h="svelte-1ro5dku"><h4>Statistiche asseverazioni</h4> <p>In questa sezione è possibile consultare dei dati statistici relativi ai task di
					asseverazione, <strong>tecnici e formali</strong>, in relazione alle misure e ai
					beneficiari. In particolare, per ognuna delle due tipologie di task, sono mostrate le
					seguenti informazioni, per ogni misura e per ogni beneficiario:</p> <ul><li><strong class="text-success">Positivi</strong>: numero di task di asseverazioni conclusi
						con esito positivo</li> <li><strong class="text-danger">Negativi</strong>: numero di task di asseverazioni conclusi
						con esito negativo</li> <li><strong class="text-secondary">Parziali</strong>: numero di task di asseverazioni
						conclusi con esito parziale</li> <li><strong>Passaggi medi</strong>: numero medio di &quot;passaggi&quot; necessario a chiudere una
						asseverazione positiva, cioè il numero medio di task lavorati per candidatura</li> <li><strong>Tempo medio</strong>: il tempo medio (espresso in giorni solari) necessario a
						chiudere una asseverazione positiva</li></ul> <div class="alert alert-primary" role="alert">Le informazioni sono relative al numero di task, non al numero di candidature.</div> <div class="alert alert-warning" role="alert">Il tempo medio è calcolato considerando il tempo intercorrente tra il completamento del
					progetto da parte dell&#39;Ente e la chiusura del task di asseverazione. Tale tempo include
					quindi, oltre al tempo di lavorazione del task, anche il tempo di assegnazione e presa in
					carico dello stesso.</div></div> <div class="it-page-section my-5" id="asseverazionitecniche"><h5 data-svelte-h="svelte-61mghw">Asseverazioni tecniche</h5> <p data-svelte-h="svelte-1o9ppc1">Nella seguente tabella sono riportati i dati sopra descritti per i <strong>task di asseverazione tecnica</strong>. Utilizzare il menu a tendina nella cella in alto a sinistra per scegliere se
					visualizzare i dati totali o i dati relativi agli ultimi 30 giorni.</p> <div class="table-responsive"><table class="table table-hover table-sm align-middle"><thead><tr><th class="text-center"><div class="select-wrapper"><label for="filterTecnici" data-svelte-h="svelte-1vib9gc">Seleziona il periodo</label> <select id="filterTecnici" name="filterTecnici"><option value="Totali" data-svelte-h="svelte-15wfb9l">Sempre</option><option value="30gg" data-svelte-h="svelte-3e1hba">Ultimi 30 giorni</option></select></div></th> <th class="text-center text-success" data-svelte-h="svelte-y8qwvz">Positivi<br><span class="is-size-7 has-text-weight-normal">(#)</span></th> <th class="text-center text-danger" data-svelte-h="svelte-1f3cbi1">Negativi<br><span class="is-size-7 has-text-weight-normal">(#)</span></th> <th class="text-center text-secondary" data-svelte-h="svelte-a6dg2v">Parziali<br><span class="is-size-7 has-text-weight-normal">(#)</span></th> <th class="text-center" data-svelte-h="svelte-q8yy3v">Passaggi medi<br><span class="is-size-7 has-text-weight-normal">(tasks/candidatura)<br></span></th> <th class="text-center" data-svelte-h="svelte-12er94r">Tempo medio<br><span class="is-size-7 has-text-weight-normal">(gg)<br></span></th> </tr></thead> <tbody>${each(misure, (m) => {
    return `${sortedData.filter((sd) => sd.misura === m).reduce((a, c) => a + c.tecnicipositivi + c.tecnicinegativi, 0) != 0 ? `<tr class="${"" + escape(misurah === m ? "analogue-2-bg" : "", true)}"><td colspan="12" class="fw-bold is-size-6">${escape(m)}</td></tr> ${each(sortedData.filter((sd) => sd.misura === m), (t, index) => {
      return `${t.tecnicipositivi > 0 || t.tecnicinegativi > 0 ? `<tr${add_attribute(
        "class",
        tipologiaeh === t.tipologiaente && misurah === m ? "has-background-info has-text-white" : "",
        0
      )}><td class="${"has-text-weight-normal is-size-6 " + escape(
        tipologiaeh === t.tipologiaente && misurah === m ? "has-background-info-dark has-text-white" : "",
        true
      )}">${escape(t.tipologiaente)}</td> <td class="text-center small">${`${escape(t.tecnicipositivi)}`}</td> <td class="text-center small">${`${escape(t.tecnicinegativi)}`}</td> <td class="text-center small">${`${escape(t.parzialitecnici)}`}</td> <td class="text-center small">${`${escape(isFinite(t.numeromediopassaggi) && !isNaN(t.numeromediopassaggi) ? t.numeromediopassaggi : "n.a.")}`}</td> <td class="text-center small">${`${escape(isFinite(t.tempomediotecnico) && !isNaN(t.tempomediotecnico) ? t.tempomediotecnico : "n.a.")}`}</td>  </tr>` : ``}`;
    })}` : ``}`;
  })}</tbody></table></div></div>  <div class="it-page-section my-5" id="asseverazioniformali"><h5 data-svelte-h="svelte-1ndxrix">Asseverazioni formali</h5> <p data-svelte-h="svelte-1pvjgy">Nella seguente tabella sono riportati i dati sopra descritti per i <strong>task di asseverazione formale</strong>. Utilizzare il menu a tendina nella cella in alto a sinistra per scegliere se
					visualizzare i dati totali o i dati relativi agli ultimi 30 giorni.</p> <div class="table-responsive"><table class="table table-hover table-sm align-middle"><thead><tr><th class="text-center"><div class="select-wrapper"><label for="filterFormali" data-svelte-h="svelte-10ns2l">Seleziona il periodo</label> <select id="filterFormali" name="filterFormali"><option value="Totali" data-svelte-h="svelte-15wfb9l">Sempre</option><option value="30gg" data-svelte-h="svelte-3e1hba">Ultimi 30 giorni</option></select></div></th> <th class="text-center text-success" data-svelte-h="svelte-y8qwvz">Positivi<br><span class="is-size-7 has-text-weight-normal">(#)</span></th> <th class="text-center text-danger" data-svelte-h="svelte-1f3cbi1">Negativi<br><span class="is-size-7 has-text-weight-normal">(#)</span></th> <th class="text-center text-secondary" data-svelte-h="svelte-a6dg2v">Parziali<br><span class="is-size-7 has-text-weight-normal">(#)</span></th> <th class="text-center" data-svelte-h="svelte-q8yy3v">Passaggi medi<br><span class="is-size-7 has-text-weight-normal">(tasks/candidatura)<br></span></th> <th class="text-center" data-svelte-h="svelte-12er94r">Tempo medio<br><span class="is-size-7 has-text-weight-normal">(gg)<br></span></th></tr></thead> <tbody>${each(misure, (m) => {
    return `${sortedData.filter((sd) => sd.misura === m).reduce((a, c) => a + c.formalipositivi + c.formalinegativi, 0) != 0 ? `<tr class="${"" + escape(misurah === m ? "analogue-2-bg" : "", true)}"><td colspan="11" class="fw-bold is-size-6">${escape(m)}</td></tr> ${each(sortedData.filter((sd) => sd.misura === m), (t) => {
      return `${t.formalipositivi > 0 || t.formalinegativi > 0 ? `<tr${add_attribute(
        "class",
        tipologiaeh === t.tipologiaente && misurah === m ? "has-background-info has-text-white" : "",
        0
      )}><td class="${"has-text-weight-normal is-size-6 " + escape(
        tipologiaeh === t.tipologiaente && misurah === m ? "has-background-info-dark has-text-white" : "",
        true
      )}">${escape(t.tipologiaente)}</td> <td class="text-center small">${`${escape(t.formalipositivi)}`}</td> <td class="text-center small">${`${escape(t.formalinegativi)}`}</td> <td class="text-center small">${`${escape(t.parzialiformali)}`}</td> <td class="text-center small">${`${escape(isFinite(t.numeromediopassaggiformali) && !isNaN(t.numeromediopassaggiformali) ? t.numeromediopassaggiformali : "n.a.")}`}</td> <td class="text-center small">${`${escape(isFinite(t.tempomedioformale) && !isNaN(t.tempomedioformale) ? t.tempomedioformale : "n.a.")}`}</td> </tr>` : ``}`;
    })}` : ``}`;
  })}</tbody></table></div></div>  <div class="it-page-section my-5" id="tempimedicompletamento"><h5 data-svelte-h="svelte-ux5dsg">Tempi medi di completamento attività</h5> <p data-svelte-h="svelte-lxs433">Nella seguente tabella sono riportati i tempi medi di <strong>completamento attività</strong>. Utilizzare il menu a tendina nella cella in alto a sinistra per scegliere se
					visualizzare i dati totali o i dati relativi agli ultimi 30 giorni.</p> <div class="alert alert-primary" role="alert" data-svelte-h="svelte-ckcqwz">Il tempo medio è calcolato considerando il tempo intercorrente tra il completamento del
					progetto da parte dell&#39;Ente e la data di contrattualizzazione.</div> <div class="alert alert-primary" role="alert" data-svelte-h="svelte-qvgmdq">La data di contrattualizzazione considerata è quella inserita dall&#39;Ente, che potrebbe non
					coincidere con la data effettiva di firma del contratto.</div> <div class="alert alert-warning" role="alert" data-svelte-h="svelte-1aved6d">In alcuni casi la data di completamento è antecedente alla data di contrattualizzazione
					(vedi nota precedente); in questi casi il tempo di completamento è considerato pari a 0.</div> <div class="table-responsive"><table class="table table-hover table-sm align-middle"><thead><tr><th class="text-center"><div class="select-wrapper"><label for="filtermedicompletamento" data-svelte-h="svelte-1e72okm">Seleziona il periodo</label> <select id="filtermedicompletamento" name="filtermedicompletamento"><option value="Totali" data-svelte-h="svelte-15wfb9l">Sempre</option><option value="30gg" data-svelte-h="svelte-3e1hba">Ultimi 30 giorni</option></select></div></th> <th class="text-center" data-svelte-h="svelte-1wx7o30">Tempo medio di completamento<br><span class="is-size-7 has-text-weight-normal">(gg)<br></span></th></tr></thead> <tbody>${each(misure, (m) => {
    return `${sortedData.filter((sd) => sd.misura === m).reduce(
      (a, c) => a + (c.tempomediocompletamento ? c.tempotempomediocompletamento : 0),
      0
    ) != 0 ? `<tr class="${"" + escape(misurah === m ? "analogue-2-bg" : "", true)}"><td colspan="11" class="fw-bold is-size-6">${escape(m)}</td></tr> ${each(sortedData.filter((sd) => sd.misura === m), (t) => {
      return `${t.tempomediocompletamento > 0 ? `<tr${add_attribute(
        "class",
        tipologiaeh === t.tipologiaente && misurah === m ? "has-background-info has-text-white" : "",
        0
      )}><td class="${"has-text-weight-normal is-size-6 " + escape(
        tipologiaeh === t.tipologiaente && misurah === m ? "has-background-info-dark has-text-white" : "",
        true
      )}">${escape(t.tipologiaente)}</td> <td class="text-center small">${`${escape(isFinite(t.tempomediocompletamento) && !isNaN(t.tempomediocompletamento) ? t.tempomediocompletamento : "n.a.")}`}</td> </tr>` : ``}`;
    })}` : ``}`;
  })}</tbody></table></div></div> <div class="it-page-section my-5" id="distribuzioneneltempotecnici"><h5 data-svelte-h="svelte-do6oih">Distribuzione nel tempo dei task positivi</h5> <p data-svelte-h="svelte-1kc8g2q">Per ogni misura viene riportata la distribuzione mensile dei <strong>Task Tecnici con esito positivo</strong>, il totale e la media per mese</p> ${each(misure, (m) => {
    return `${sortedData.filter((sd) => sd.misura === m).reduce((a, c) => a + c.tecnicipositivi + c.tecnicinegativi, 0) != 0 ? `<hr> <h6>${escape(m)}</h6> <p>Totali: <strong>${escape(calcolaNumeroMedioPerMese(m)[1])}</strong><br>
							Numero medio per mese: <strong>${escape(calcolaNumeroMedioPerMese(m)[0])}</strong></p> <p>${validate_component(Columnchartandamenti, "Columnchartandamenti").$$render(
      $$result,
      {
        id: "chart-" + m,
        values: datiAndamentiTecniciPositivi(m),
        title: "Distribuzione esiti positivi",
        xlabel: "Mesi",
        ylabel: "Numero di esiti positivi",
        stacked: true
      },
      {},
      {}
    )} </p>` : ``}`;
  })}</div></div></div> </div>`;
});
export {
  Page as default
};
