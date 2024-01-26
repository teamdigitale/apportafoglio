import * as server from '../entries/pages/op/referenti/_page.server.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/op/referenti/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/op/referenti/+page.server.js";
export const imports = ["_app/immutable/nodes/15.Tb-XlYHL.js","_app/immutable/chunks/scheduler.AMfUPaqd.js","_app/immutable/chunks/index.sOBxWm11.js","_app/immutable/chunks/each.6w4Ej4nR.js","_app/immutable/chunks/cite.ugS6krW8.js","_app/immutable/chunks/moment-with-locales.Tlx9Vr_q.js"];
export const stylesheets = ["_app/immutable/assets/14.ff-ndFDd.css"];
export const fonts = [];
