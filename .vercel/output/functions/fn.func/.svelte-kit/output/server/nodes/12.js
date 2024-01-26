import * as server from '../entries/pages/op/candidatura/_id_/_page.server.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/op/candidatura/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/op/candidatura/[id]/+page.server.js";
export const imports = ["_app/immutable/nodes/12.gB9L0GmQ.js","_app/immutable/chunks/scheduler.AMfUPaqd.js","_app/immutable/chunks/index.sOBxWm11.js","_app/immutable/chunks/each.6w4Ej4nR.js","_app/immutable/chunks/cite.ugS6krW8.js","_app/immutable/chunks/moment-with-locales.Tlx9Vr_q.js","_app/immutable/chunks/shared.sqUOs3Mb.js"];
export const stylesheets = [];
export const fonts = [];
