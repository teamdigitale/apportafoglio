import { c as create_ssr_component, e as escape } from "./ssr.js";
const Pagination = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let totalRows;
  let currentPage;
  let totalPages;
  let start;
  let end;
  let { rows } = $$props;
  let { perPage } = $$props;
  let { trimmedRows } = $$props;
  let { cp } = $$props;
  if ($$props.rows === void 0 && $$bindings.rows && rows !== void 0)
    $$bindings.rows(rows);
  if ($$props.perPage === void 0 && $$bindings.perPage && perPage !== void 0)
    $$bindings.perPage(perPage);
  if ($$props.trimmedRows === void 0 && $$bindings.trimmedRows && trimmedRows !== void 0)
    $$bindings.trimmedRows(trimmedRows);
  if ($$props.cp === void 0 && $$bindings.cp && cp !== void 0)
    $$bindings.cp(cp);
  totalRows = rows.length;
  currentPage = cp;
  totalPages = Math.ceil(totalRows / perPage);
  start = currentPage * perPage;
  end = currentPage === totalPages - 1 ? totalRows - 1 : start + perPage - 1;
  trimmedRows = rows.slice(start, end + 1);
  return `${totalRows && totalRows > perPage ? `<nav class="pagination-wrapper justify-content-center pagination-total" aria-label="Esempio di navigazione simple mode"><ul class="pagination"><li class="page-item disabled"><button class="btn btn-xs btn-icon" ${(currentPage === 0 ? true : false) ? "disabled" : ""}><span class="rounded-icon" data-svelte-h="svelte-u2w2ez"><svg class="icon icon-secondary"><use href="/svg/sprites.svg#it-chevron-left"></use></svg></span> <span data-svelte-h="svelte-1bsq54x">pagina precedente</span></button></li> <li class="page-item"><span class="page-link">${escape(currentPage + 1)}</span></li> <li class="page-item" data-svelte-h="svelte-1fhax1b"><span class="page-link">/</span></li> <li class="page-item"><span class="page-link">${escape(totalPages)}</span></li> <li class="page-item"><button class="btn btn-xs btn-icon" ${(currentPage === totalPages - 1 ? true : false) ? "disabled" : ""}><span class="rounded-icon" data-svelte-h="svelte-1manfa3"><svg class="icon icon-secondary"><use href="/svg/sprites.svg#it-chevron-right"></use></svg></span> <span data-svelte-h="svelte-1bf8kv5">pagina successiva</span></button></li></ul> <p>stai visualizzando gli elementi da ${escape(start + 1)} a ${escape(end + 1)} su un totale di ${escape(totalRows)} elementi</p></nav>` : ``}`;
});
export {
  Pagination as P
};
