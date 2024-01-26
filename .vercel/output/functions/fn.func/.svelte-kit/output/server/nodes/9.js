import * as server from '../entries/pages/monitoraggio/risorse/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/monitoraggio/risorse/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/monitoraggio/risorse/+page.server.js";
export const imports = ["_app/immutable/nodes/9.Aid9QcQ2.js","_app/immutable/chunks/scheduler.AMfUPaqd.js","_app/immutable/chunks/index.sOBxWm11.js","_app/immutable/chunks/each.6w4Ej4nR.js","_app/immutable/chunks/globals.0cDDIVm6.js","_app/immutable/chunks/cite.ugS6krW8.js","_app/immutable/chunks/scorecard.n1enKH9c.js","_app/immutable/chunks/shared.sqUOs3Mb.js","_app/immutable/chunks/moment-with-locales.Tlx9Vr_q.js"];
export const stylesheets = [];
export const fonts = [];
