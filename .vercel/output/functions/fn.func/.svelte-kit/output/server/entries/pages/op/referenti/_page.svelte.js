import { c as create_ssr_component, e as escape, d as add_attribute, v as validate_component, f as each } from "../../../../chunks/ssr.js";
import { C as Cite } from "../../../../chunks/cite.js";
import moment from "moment/min/moment-with-locales.js";
const css = {
  code: ".fullheight.svelte-alfbgo{min-height:100%;height:100%}",
  map: null
};
const Referentecard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { referente } = $$props;
  moment.locale("it");
  if ($$props.referente === void 0 && $$bindings.referente && referente !== void 0)
    $$bindings.referente(referente);
  $$result.css.add(css);
  return `<div class="row fullheight svelte-alfbgo"><div class="col-12 col-lg-12">  <div class="${[
    "callout callout-highlight " + escape(referente.Stato__c !== "Attivo" ? "danger " : "primary ", true) + " fullheight shadow py-4 px-2 svelte-alfbgo",
    ""
  ].join(" ").trim()}"><div class="clearfix"><div class="categoryicon-top float-start"><svg class="icon icon-primary"><use href="/svg/sprites.svg#it-user"></use></svg> <span class="${"text text-uppercase " + escape(
    referente.Stato__c !== "Attivo" ? "text-danger" : "text-primary",
    true
  )}"><strong>${escape(referente.Name)} ${referente.Stato__c !== "Attivo" ? ` (${escape(referente.Stato__c)})` : ``}</strong></span></div> <div class="chip chip-simple float-end"><svg class="icon icon-xs"><use href="/svg/sprites.svg#it-pa"></use></svg> <span class="chip-label">${escape(referente.portafoglio)}</span></div></div> <div><dl class="row"><dt class="col-sm-3" data-svelte-h="svelte-qy87w1"><small>Ente:</small></dt><dd class="col-sm-9"><small>${escape(referente.Account.Name)}</small> </dd><dt class="col-sm-3" data-svelte-h="svelte-1dhfpn8"><small>Profilo:</small></dt><dd class="col-sm-9"><small>${escape(referente.Profilo__c ? referente.Profilo__c : "Responsabile")}</small> </dd><dt class="col-sm-3" data-svelte-h="svelte-ory9ox"><small>Telefono:</small></dt><dd class="col-sm-9"><small${add_attribute("class", referente.MobilePhone ? "" : "text-muted", 0)}>${escape(referente.MobilePhone ? referente.MobilePhone : "Non disponibile")}</small> </dd><dt class="col-sm-3" data-svelte-h="svelte-1g7kdph"><small>Email:</small></dt><dd class="col-sm-9"><small${add_attribute("class", referente.Email ? "" : "text-muted", 0)}>${escape(referente.Email ? referente.Email : "Non disponibile")}</small> </dd><dt class="col-sm-3" data-svelte-h="svelte-xtriq4"><small>Ultima attività:</small></dt><dd class="col-sm-9"><small${add_attribute("class", referente.LastActivityDate ? "" : "text-muted", 0)}>${escape(referente.LastActivityDate ? moment(referente.LastActivityDate).format("DD/MM/YYYY") : "Non disponibile")} ${referente.LastActivityDate ? `(${escape(referente.LastActivityDate ? moment(referente.LastActivityDate).startOf("day").fromNow() : "")})` : ``}</small> </dd><hr><div class="row"><div class="col-12 col-lg-3 text-center">${referente.MobilePhone ? `<a class="text-success" target="_blank" href="${"https://wa.me/" + escape(referente.MobilePhone, true)}"><svg class="icon icon-success"><use href="/svg/sprites.svg#it-whatsapp"></use></svg></a>` : ``}</div> <div class="col-12 col-lg-3 text-center">${referente.MobilePhone ? `<a class="text-primary" target="_blank" href="${"tel:" + escape(referente.MobilePhone, true)}"><svg class="icon icon-primary"><use href="/svg/sprites.svg#it-telephone"></use></svg></a>` : ``}</div> <div class="col-12 col-lg-3 text-center">${referente.Email ? `<a class="text-primary" target="_blank" href="${"mailto:" + escape(referente.Email, true)}"><svg class="icon icon-primary"><use href="/svg/sprites.svg#it-mail"></use></svg></a>` : ``}</div> <div class="col-12 col-lg-3 text-center"><a class="text-primary" target="_blank" href="${"/api/vcard/" + escape(referente.Id, true)}"><svg class="icon icon-primary"><use href="/svg/sprites.svg#it-download"></use></svg></a></div></div></dl></div></div> </div> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filteredReferenti;
  let { data } = $$props;
  console.log(data);
  let statoReferenteOptions = ["Tutti"].concat(Object.values(data.referenti.reduce(
    (a, { Stato__c }) => {
      a[Stato__c] = a[Stato__c] || { Stato__c, count: 0 };
      a[Stato__c].count++;
      return a;
    },
    /* @__PURE__ */ Object.create(null)
  )).map((x) => x.Stato__c).sort());
  let filterStatoReferente = "Attivo";
  let portafoglioOptions = ["Tutti i portafogli"].concat(Object.values(data.referenti.reduce(
    (a, { portafoglio }) => {
      a[portafoglio] = a[portafoglio] || { portafoglio, count: 0 };
      a[portafoglio].count++;
      return a;
    },
    /* @__PURE__ */ Object.create(null)
  )).map((x) => x.portafoglio).sort());
  let filterNominativoEnte = "";
  let filterNominativoReferente = "";
  let filterTelefonoReferente = "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  filteredReferenti = data.referenti.filter((x) => x.Stato__c === filterStatoReferente).filter(
    (x) => true
  ).filter(
    (x) => true
  ).filter(
    (x) => true
  ).filter(
    (x) => true
  );
  return `<div class="container my-4"><h1 data-svelte-h="svelte-c8cc4k">Referenti</h1> ${validate_component(Cite, "Cite").$$render(
    $$result,
    {
      text: "Le persone cambiano e si dimenticano di\r\n		avvisare gli altri.",
      author: "Lillian Hellman"
    },
    {},
    {}
  )} <div class="row"><div class="col-12 col-lg-6 my-4"><div class="select-wrapper"><label for="filterPortafoglio" data-svelte-h="svelte-5ffups">Portafoglio</label> <select id="filterPortafoglio" name="filterPortafoglio">${each(portafoglioOptions, (a) => {
    return `<option${add_attribute("value", a, 0)}>${escape(a)}</option>`;
  })}</select></div></div> <div class="col-12 col-lg-6 my-4"><div class="select-wrapper"><label for="filterStatoReferente" data-svelte-h="svelte-1p1q7ae">Stato</label> <select id="filterStatoReferente" name="filterStatoReferente">${each(statoReferenteOptions, (te) => {
    return `<option${add_attribute("value", te, 0)}>${escape(te)}</option>`;
  })}</select></div></div> <div class="col-12 col-lg-4 my-4"><div class="form-group"><label class="active" for="filterNominativoEnte" data-svelte-h="svelte-ou1xo">Nome dell&#39;Ente</label> <input type="text" class="form-control" id="filterNominativoEnte" name="filterNominativoEnte" placeholder="Digitare parte del nome dell'Ente"${add_attribute("value", filterNominativoEnte, 0)}></div></div> <div class="col-12 col-lg-4 my-4"><div class="form-group"><label class="active" for="filterNominativoReferente" data-svelte-h="svelte-1iu7fc2">Nominativo del referente</label> <input type="text" class="form-control" id="filterNominativoReferente" name="filterNominativoReferente" placeholder="Digitare parte del nome del referente"${add_attribute("value", filterNominativoReferente, 0)}></div></div> <div class="col-12 col-lg-4 my-4"><div class="form-group"><label class="active" for="filterNominativoReferente" data-svelte-h="svelte-1nfb8nf">Numero di telefono del referente</label> <input type="text" class="form-control" id="filterTelefonoReferente" name="filterTelefonoReferente" placeholder="Digitare parte del numero di telefono"${add_attribute("value", filterTelefonoReferente, 0)}></div></div></div> <div class="row">${each(filteredReferenti, (referente) => {
    return `<div class="col-12 col-lg-6 my-4">${validate_component(Referentecard, "Referentecard").$$render($$result, { referente }, {}, {})} </div>`;
  })}</div></div>`;
});
export {
  Page as default
};
