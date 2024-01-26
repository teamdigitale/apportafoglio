import * as server from '../entries/pages/op/contatti/_page.server.js';

export const index = 13;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/op/contatti/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/op/contatti/+page.server.js";
export const imports = ["_app/immutable/nodes/13.0HWu6NaN.js","_app/immutable/chunks/scheduler.AMfUPaqd.js","_app/immutable/chunks/index.sOBxWm11.js","_app/immutable/chunks/each.6w4Ej4nR.js","_app/immutable/chunks/cite.ugS6krW8.js","_app/immutable/chunks/moment-with-locales.Tlx9Vr_q.js","_app/immutable/chunks/globals.0cDDIVm6.js","_app/immutable/chunks/pagination.sZ4gtyRv.js"];
export const stylesheets = [];
export const fonts = [];
