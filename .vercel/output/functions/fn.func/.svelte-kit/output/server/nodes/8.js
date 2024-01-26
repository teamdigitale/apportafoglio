import * as server from '../entries/pages/monitoraggio/crono/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/monitoraggio/crono/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/monitoraggio/crono/+page.server.js";
export const imports = ["_app/immutable/nodes/8.N-aN6JRG.js","_app/immutable/chunks/scheduler.AMfUPaqd.js","_app/immutable/chunks/index.sOBxWm11.js","_app/immutable/chunks/each.6w4Ej4nR.js","_app/immutable/chunks/globals.0cDDIVm6.js","_app/immutable/chunks/moment-with-locales.Tlx9Vr_q.js"];
export const stylesheets = [];
export const fonts = [];
