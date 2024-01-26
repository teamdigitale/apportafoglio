import * as server from '../entries/pages/cruscotti/fornitori/_page.server.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/cruscotti/fornitori/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/cruscotti/fornitori/+page.server.js";
export const imports = ["_app/immutable/nodes/4.aY0YkG5X.js","_app/immutable/chunks/scheduler.AMfUPaqd.js","_app/immutable/chunks/index.sOBxWm11.js","_app/immutable/chunks/each.6w4Ej4nR.js","_app/immutable/chunks/cite.ugS6krW8.js","_app/immutable/chunks/shared.sqUOs3Mb.js","_app/immutable/chunks/moment-with-locales.Tlx9Vr_q.js","_app/immutable/chunks/pagination.sZ4gtyRv.js","_app/immutable/chunks/globals.0cDDIVm6.js"];
export const stylesheets = ["_app/immutable/assets/14.ff-ndFDd.css"];
export const fonts = [];
