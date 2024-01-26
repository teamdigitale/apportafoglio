import * as server from '../entries/pages/accesso/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/accesso/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/accesso/+page.server.js";
export const imports = ["_app/immutable/nodes/3.B4Epzzsx.js","_app/immutable/chunks/scheduler.AMfUPaqd.js","_app/immutable/chunks/index.sOBxWm11.js"];
export const stylesheets = [];
export const fonts = [];
