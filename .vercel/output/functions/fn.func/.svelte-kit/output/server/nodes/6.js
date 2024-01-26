import * as server from '../entries/pages/monitoraggio/asseverazioni/_page.server.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/monitoraggio/asseverazioni/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/monitoraggio/asseverazioni/+page.server.js";
export const imports = ["_app/immutable/nodes/6.aT_WRnxW.js","_app/immutable/chunks/scheduler.AMfUPaqd.js","_app/immutable/chunks/index.sOBxWm11.js","_app/immutable/chunks/each.6w4Ej4nR.js","_app/immutable/chunks/cite.ugS6krW8.js","_app/immutable/chunks/globals.0cDDIVm6.js"];
export const stylesheets = ["_app/immutable/assets/6.355jqxwC.css"];
export const fonts = [];
