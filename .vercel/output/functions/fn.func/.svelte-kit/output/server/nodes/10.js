import * as server from '../entries/pages/monitoraggio/target/_page.server.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/monitoraggio/target/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/monitoraggio/target/+page.server.js";
export const imports = ["_app/immutable/nodes/10.SRwA1z-3.js","_app/immutable/chunks/scheduler.AMfUPaqd.js","_app/immutable/chunks/index.sOBxWm11.js","_app/immutable/chunks/cite.ugS6krW8.js","_app/immutable/chunks/moment-with-locales.Tlx9Vr_q.js","_app/immutable/chunks/gauge.QtKUN8I1.js","_app/immutable/chunks/globals.0cDDIVm6.js","_app/immutable/chunks/shared.sqUOs3Mb.js"];
export const stylesheets = ["_app/immutable/assets/gauge.j8Gg9VlI.css"];
export const fonts = [];
