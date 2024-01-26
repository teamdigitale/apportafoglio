import { c as create_ssr_component, d as add_attribute, e as escape, v as validate_component } from "../../chunks/ssr.js";
const Linkcard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { text = "" } = $$props;
  let { img = "" } = $$props;
  let { altimg = "" } = $$props;
  let { link = "" } = $$props;
  let { linktext = "" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.img === void 0 && $$bindings.img && img !== void 0)
    $$bindings.img(img);
  if ($$props.altimg === void 0 && $$bindings.altimg && altimg !== void 0)
    $$bindings.altimg(altimg);
  if ($$props.link === void 0 && $$bindings.link && link !== void 0)
    $$bindings.link(link);
  if ($$props.linktext === void 0 && $$bindings.linktext && linktext !== void 0)
    $$bindings.linktext(linktext);
  return `<div class="card-wrapper"><div class="card card-img no-after rounded shadow"><div class="img-responsive-wrapper"><div class="img-responsive img-responsive-panoramic"><figure class="img-wrapper"><img${add_attribute("src", img, 0)}${add_attribute("title", altimg, 0)}${add_attribute("alt", altimg, 0)}></figure></div></div> <div class="card-body"><h3 class="card-title">${escape(title)}</h3> <p class="card-text">${escape(text)}</p> <div class="it-card-footer"><a class="btn btn-primary btn-sm"${add_attribute("href", link, 0)}>${escape(linktext)}</a></div></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="container"><div class="row"><div class="col-12 col-lg-6 my-4">${validate_component(Linkcard, "Linkcard").$$render(
    $$result,
    {
      altimg: "open data",
      img: "/img/opendata.jpg",
      link: "/opendata",
      linktext: "Fammi vedere",
      text: "Consulta gli Open Data liberamente",
      title: "Open Data"
    },
    {},
    {}
  )}</div> <div class="col-12 col-lg-6 my-4">${validate_component(Linkcard, "Linkcard").$$render(
    $$result,
    {
      altimg: "portafoglio",
      img: "/img/buildings.jpg",
      link: "/accesso",
      linktext: "Voglio accedere",
      text: "Consulta i dati con le tue credenziali",
      title: "Il tuo portafoglio"
    },
    {},
    {}
  )}</div> <div class="col-12 col-lg-6 my-4">${validate_component(Linkcard, "Linkcard").$$render(
    $$result,
    {
      altimg: "moniotraggio",
      img: "/img/monitor.jpg",
      link: "/monitoraggio",
      linktext: "Voglio accedere",
      text: "Verifica gli andamenti",
      title: "Monitoraggio"
    },
    {},
    {}
  )}</div></div></div>`;
});
export {
  Page as default
};
