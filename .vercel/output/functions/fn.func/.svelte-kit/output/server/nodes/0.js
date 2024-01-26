import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.js";
export const imports = ["_app/immutable/nodes/0.-osJHVy7.js","_app/immutable/chunks/scheduler.AMfUPaqd.js","_app/immutable/chunks/index.sOBxWm11.js","_app/immutable/chunks/stores.LlN5Rc01.js","_app/immutable/chunks/entry.Q3uX91pF.js","_app/immutable/chunks/shared.sqUOs3Mb.js"];
export const stylesheets = ["_app/immutable/assets/0.VbmopGwt.css"];
export const fonts = [];
