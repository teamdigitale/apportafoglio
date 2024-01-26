import { c as create_ssr_component, v as validate_component, f as each, d as add_attribute, e as escape } from "../../../../chunks/ssr.js";
import { C as Cite } from "../../../../chunks/cite.js";
import { e as euro } from "../../../../chunks/shared.js";
import moment from "moment/min/moment-with-locales.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredAvvisi;
  let calcolaBeneficiari;
  let beneficiariOptions;
  let calcolaPlatea;
  let filteredAvvisiTimeLine;
  moment.locale("it");
  let { data } = $$props;
  let selectedBeneficiario = "Tutti i beneficiari";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  data.misure.filter((m) => true);
  filteredAvvisi = data.avvisi.filter(
    (a) => true
  );
  calcolaBeneficiari = () => {
    const res = [];
    filteredAvvisi.forEach((a) => {
      a.beneficiari.forEach((b) => {
        if (res.indexOf(b.beneficiario) === -1) {
          res.push(b.beneficiario);
        }
      });
    });
    return res;
  };
  beneficiariOptions = ["Tutti i beneficiari"].concat(calcolaBeneficiari());
  filteredAvvisiTimeLine = filteredAvvisi.filter((a) => selectedBeneficiario === beneficiariOptions[0] ? true : a.beneficiari.filter((b) => b.beneficiario === selectedBeneficiario).length > 0);
  calcolaPlatea = () => {
    const res = [];
    if (selectedBeneficiario !== beneficiariOptions[0]) {
      let sumok = 0;
      filteredAvvisiTimeLine.reverse().forEach((a, index) => {
        if (index === 0) {
          res.push({
            id: a.Id,
            platea: a.beneficiari.filter((b) => b.beneficiario === selectedBeneficiario)[0].platea_generale
          });
          sumok = sumok + a.beneficiari.filter((b) => b.beneficiario === selectedBeneficiario)[0].ok;
        } else {
          res.push({
            id: a.Id,
            platea: a.beneficiari.filter((b) => b.beneficiario === selectedBeneficiario)[0].platea_generale - sumok
          });
          sumok = sumok + a.beneficiari.filter((b) => b.beneficiario === selectedBeneficiario)[0].ok;
        }
      });
    }
    return res;
  };
  calcolaPlatea();
  return `<div class="container my-4"><h1 data-svelte-h="svelte-1pmmfi2">Board avvisi</h1> ${validate_component(Cite, "Cite").$$render(
    $$result,
    {
      text: "Se volete conoscere il valore del denaro cercate di farvene prestare.",
      author: "Benjamin Franklin"
    },
    {},
    {}
  )}</div> <div class="container"><div class="row"><div class="col-12 col-lg-2" data-svelte-h="svelte-1o02b5z"><div data-bs-toggle="sticky" data-bs-stackable="true"><nav class="navbar it-navscroll-wrapper navbar-expand-lg it-bottom-navscroll it-right-side" data-bs-navscroll><button class="custom-navbar-toggler" type="button" aria-controls="navbarNavProgress" aria-expanded="false" aria-label="Toggle navigation" data-bs-toggle="navbarcollapsible" data-bs-target="#navbarNavProgress"><span class="it-list"></span>1. Riepilogo</button> <div class="progress custom-navbar-progressbar"><div class="progress-bar it-navscroll-progressbar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div> <div class="navbar-collapsable" id="navbarNavProgress"><div class="overlay"></div> <button type="button" class="it-back-button btn w-100 text-start"><svg class="icon icon-sm icon-primary align-top"><use href="/svg/sprites.svg#it-chevron-left" xlink:href="/svg/sprites.svg#it-chevron-left"></use></svg> <span>Indietro</span></button> <div class="menu-wrapper"><div class="link-list-wrapper"><h3>sezioni</h3> <div class="progress"><div class="progress-bar it-navscroll-progressbar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div> <ul class="link-list"><li class="nav-item"><a class="nav-link active" href="#storiaavvisi"><span>1. Storico degli avvisi</span></a></li></ul></div></div></div></nav></div></div> <div class="col-12 col-lg-10 it-page-sections-container"><div class="it-page-section my-5" id="storiaavvisi"><h4 data-svelte-h="svelte-r7chok">Storico degli avvisi</h4> <div class="col-12 col-lg-12 my-4"><div class="select-wrapper"><label for="filterMisura" data-svelte-h="svelte-1vpfvao">Misure</label> <select id="filterMisura" name="filterMisura"><option value="" data-svelte-h="svelte-xhsy7s">Tutte le misure</option>${each(data.misure, (m) => {
    return `<option${add_attribute("value", m.Id, 0)}>${escape(m.Name)}</option>`;
  })}</select></div></div> <div class="col-12 col-lg-12 my-4"><div class="select-wrapper"><label for="selectedBeneficiario" data-svelte-h="svelte-190ohpm">Beneficiari</label> <select id="selectedBeneficiario" name="selectedBeneficiario">${each(beneficiariOptions, (b) => {
    return `<option${add_attribute("value", b, 0)}>${escape(b)}</option>`;
  })}</select></div></div> ${`<div class="it-timeline-wrapper"><div class="row">${each(filteredAvvisiTimeLine, (avviso) => {
    return `<div class="col-12"><div class="timeline-element"><div class="${"it-pin-wrapper " + escape(
      avviso.outfunds__Status__c === "PUBBLICATO" ? "it-now" : "it-evidence",
      true
    )}"><div class="pin-icon" data-svelte-h="svelte-19okyb3"><svg class="icon"><use href="/svg/sprites.svg#it-horn"></use></svg></div> <div class="pin-text"><span>${escape(moment(avviso.outfunds__Start_Date__c, "YYYY-MM-DD").format("MMM YYYY"))} - ${escape(moment(avviso.outfunds__End_Date__c, "YYYY-MM-DD").format("MMM YYYY"))}</span></div></div> <div class="card-wrapper"><div class="card"><div class="card-body"><h5 class="card-title">${escape(avviso.Name)}</h5> <div>${each(avviso.beneficiari, (b) => {
      return `<div class="chip chip-simple"><span class="chip-label">${escape(b.beneficiario)}</span> </div>`;
    })}</div> <div>Dotazione finanziaria: <strong>${escape(euro(avviso.Misura_Padre_1__c ? avviso.Total_Program_Amount_Padre_1__c : avviso.Misura_Padre_2__c ? avviso.Total_Program_Amount_Padre_2__c : avviso.outfunds__Total_Program_Amount__c))}</strong></div> <div>${each(avviso.beneficiari, (b) => {
      return `<hr>
                                                Beneficiario: <strong>${escape(b.beneficiario)}</strong><br> ${``}
                                                Candidature OK: <strong>${escape(b.ok)}</strong><br>`;
    })}</div> </div></div> </div></div> </div>`;
  })}</div></div>`}</div></div></div></div>`;
});
export {
  Page as default
};
