import * as server from '../entries/pages/op/scadenze/_page.server.js';

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/op/scadenze/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/op/scadenze/+page.server.js";
export const imports = ["_app/immutable/nodes/16.w0kRlJ-y.js","_app/immutable/chunks/scheduler.AMfUPaqd.js","_app/immutable/chunks/index.sOBxWm11.js","_app/immutable/chunks/each.6w4Ej4nR.js","_app/immutable/chunks/scorecard.n1enKH9c.js","_app/immutable/chunks/cite.ugS6krW8.js","_app/immutable/chunks/moment-with-locales.Tlx9Vr_q.js","_app/immutable/chunks/pagination.sZ4gtyRv.js"];
export const stylesheets = ["_app/immutable/assets/14.ff-ndFDd.css"];
export const fonts = [];
