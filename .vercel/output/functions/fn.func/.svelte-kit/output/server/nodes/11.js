import * as server from '../entries/pages/op/avvisi/_page.server.js';

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/op/avvisi/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/op/avvisi/+page.server.js";
export const imports = ["_app/immutable/nodes/11.3GsTPm1J.js","_app/immutable/chunks/scheduler.AMfUPaqd.js","_app/immutable/chunks/index.sOBxWm11.js","_app/immutable/chunks/each.6w4Ej4nR.js","_app/immutable/chunks/cite.ugS6krW8.js","_app/immutable/chunks/shared.sqUOs3Mb.js","_app/immutable/chunks/moment-with-locales.Tlx9Vr_q.js"];
export const stylesheets = ["_app/immutable/assets/11.UfIOtK0L.css"];
export const fonts = [];
