import { c as create_ssr_component, e as escape, d as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
const Usercard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { utente } = $$props;
  let { tipo } = $$props;
  if ($$props.utente === void 0 && $$bindings.utente && utente !== void 0)
    $$bindings.utente(utente);
  if ($$props.tipo === void 0 && $$bindings.tipo && tipo !== void 0)
    $$bindings.tipo(tipo);
  return `<div class="row my-8"><div class="col-12 col-lg-12"> <div class="card-wrapper card-space"><div class="card rounded shadow border-bottom-card"><div class="card-body"><div class="head-tags"><p class="card-tag">${escape(tipo === "primario" ? "Utente primario" : "Utente asseveratore")}</p></div> <div class="avatar-wrapper avatar-extra-text"><div class="avatar size-xxl"><img${add_attribute("src", "/api/img/" + encodeURIComponent(utente.FullPhotoUrl), 0)}${add_attribute("alt", utente.Name, 0)} aria-hidden="true"></div> <div class="extra-text"><h4>${escape(utente.Name)}</h4> <h6>${escape(utente.Title ? utente.Title : "")}</h6></div></div> <div class="it-card-footer" data-svelte-h="svelte-15bm73a"><button class="btn btn-info btn-xs btn-icon ms-1"><span>Fammi usicre</span> <svg class="icon icon-white ms-1"><use href="/svg/sprites.svg#it-logout"></use></svg></button></div></div></div></div> </div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="container my-4">${!data.loggedstandard ? `<form method="POST" action="?/loginstandard" data-svelte-h="svelte-32lbnx"><h2>Utente principale</h2> <div class="my-5"><div class="row"><div class="form-group col-md-4"><label for="emailstandard" class="active">Email</label> <input type="email" class="form-control" id="emailstandard" name="emailstandard" placeholder="inserisci il tuo indirizzo email" value=""></div> <div class="form-group col-md-4"><label for="passwordstandard" class="active">Password</label> <input type="password" data-bs-input class="form-control input-password" id="passwordstandard" name="passwordstandard" placeholder="inserisci la tua password" value=""> <span class="password-icon" aria-hidden="true"><svg class="password-icon-visible icon icon-sm"><use href="/svg/sprites.svg#it-password-visible"></use></svg> <svg class="password-icon-invisible icon icon-sm d-none"><use href="/svg/sprites.svg#it-password-invisible"></use></svg></span></div> <div class="form-group col-md-4"><label for="tokenstandard" class="active">Token</label> <input type="password" data-bs-input class="form-control input-password" id="tokenstandard" name="tokenstandard" placeholder="inserisci il tuo token" value=""> <span class="password-icon" aria-hidden="true"><svg class="password-icon-visible icon icon-sm"><use href="/svg/sprites.svg#it-password-visible"></use></svg> <svg class="password-icon-invisible icon icon-sm d-none"><use href="/svg/sprites.svg#it-password-invisible"></use></svg></span></div></div> <div class="row mt-4"><div class="form-group col text-center"><button type="button" class="btn btn-outline-primary">Ho cambiato idea</button> <button type="submit" class="btn btn-primary">Confermo i dati</button></div></div></div></form>` : `<form method="POST" action="?/logoutstandard">${validate_component(Usercard, "Usercard").$$render(
    $$result,
    {
      utente: data.utentestandard,
      tipo: "primario"
    },
    {},
    {}
  )}</form>`} ${!data.loggedasseveratore ? `<form method="POST" action="?/loginasseveratore" data-svelte-h="svelte-1r01tkw"><h2>Utente asseveratore</h2> <div class="my-5"><div class="row"><div class="form-group col-md-4"><label for="emailasseveratore" class="active">Email</label> <input type="email" class="form-control" id="emailasseveratore" name="emailasseveratore" placeholder="inserisci il tuo indirizzo email" value=""></div> <div class="form-group col-md-4"><label for="passwordasseveratore" class="active">Password</label> <input type="password" data-bs-input class="form-control input-password" id="passwordasseveratore" name="passwordasseveratore" placeholder="inserisci la tua password" value=""> <span class="password-icon" aria-hidden="true"><svg class="password-icon-visible icon icon-sm"><use href="/svg/sprites.svg#it-password-visible"></use></svg> <svg class="password-icon-invisible icon icon-sm d-none"><use href="/svg/sprites.svg#it-password-invisible"></use></svg></span></div> <div class="form-group col-md-4"><label for="tokenasseveratore" class="active">Token</label> <input type="password" data-bs-input class="form-control input-password" id="tokenasseveratore" name="tokenasseveratore" placeholder="inserisci il tuo token" value=""> <span class="password-icon" aria-hidden="true"><svg class="password-icon-visible icon icon-sm"><use href="/svg/sprites.svg#it-password-visible"></use></svg> <svg class="password-icon-invisible icon icon-sm d-none"><use href="/svg/sprites.svg#it-password-invisible"></use></svg></span></div></div> <div class="row mt-4"><div class="form-group col text-center"><button type="button" class="btn btn-outline-primary">Ho cambiato idea</button> <button type="submit" class="btn btn-primary">Confermo i dati</button></div></div></div></form>` : `<form method="POST" action="?/logoutasseveratore">${validate_component(Usercard, "Usercard").$$render(
    $$result,
    {
      utente: data.utenteasseveratore,
      tipo: "asseveratore"
    },
    {},
    {}
  )}</form>`}</div>`;
});
export {
  Page as default
};
