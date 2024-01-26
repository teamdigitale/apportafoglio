import * as universal from '../entries/pages/opendata/_page.js';

export const index = 17;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/opendata/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/opendata/+page.js";
export const imports = ["_app/immutable/nodes/17.Mr4x-HJu.js","_app/immutable/chunks/scheduler.AMfUPaqd.js","_app/immutable/chunks/index.sOBxWm11.js","_app/immutable/chunks/each.6w4Ej4nR.js","_app/immutable/chunks/cite.ugS6krW8.js","_app/immutable/chunks/pagination.sZ4gtyRv.js","_app/immutable/chunks/scorecard.n1enKH9c.js","_app/immutable/chunks/shared.sqUOs3Mb.js","_app/immutable/chunks/moment-with-locales.Tlx9Vr_q.js"];
export const stylesheets = [];
export const fonts = [];
