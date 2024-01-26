import * as server from '../entries/pages/cruscotti/generale/_page.server.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/cruscotti/generale/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/cruscotti/generale/+page.server.js";
export const imports = ["_app/immutable/nodes/5.kPnPb8_F.js","_app/immutable/chunks/scheduler.AMfUPaqd.js","_app/immutable/chunks/index.sOBxWm11.js","_app/immutable/chunks/each.6w4Ej4nR.js","_app/immutable/chunks/pagination.sZ4gtyRv.js","_app/immutable/chunks/shared.sqUOs3Mb.js","_app/immutable/chunks/gauge.QtKUN8I1.js","_app/immutable/chunks/globals.0cDDIVm6.js","_app/immutable/chunks/cite.ugS6krW8.js"];
export const stylesheets = ["_app/immutable/assets/gauge.j8Gg9VlI.css"];
export const fonts = [];
