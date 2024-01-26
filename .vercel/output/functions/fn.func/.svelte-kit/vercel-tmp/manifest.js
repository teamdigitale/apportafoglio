export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["bootstrap-italia/assets/upload-drag-drop-icon.svg","bootstrap-italia/bootstrap-italia.esm.js","bootstrap-italia/bootstrap-italia.esm.js.map","bootstrap-italia/css/bootstrap-italia.min.css","bootstrap-italia/css/bootstrap-italia.min.css.map","bootstrap-italia/fonts/Lora/lora-v20-latin-ext_latin-700.eot","bootstrap-italia/fonts/Lora/lora-v20-latin-ext_latin-700.svg","bootstrap-italia/fonts/Lora/lora-v20-latin-ext_latin-700.ttf","bootstrap-italia/fonts/Lora/lora-v20-latin-ext_latin-700.woff","bootstrap-italia/fonts/Lora/lora-v20-latin-ext_latin-700.woff2","bootstrap-italia/fonts/Lora/lora-v20-latin-ext_latin-700italic.eot","bootstrap-italia/fonts/Lora/lora-v20-latin-ext_latin-700italic.svg","bootstrap-italia/fonts/Lora/lora-v20-latin-ext_latin-700italic.ttf","bootstrap-italia/fonts/Lora/lora-v20-latin-ext_latin-700italic.woff","bootstrap-italia/fonts/Lora/lora-v20-latin-ext_latin-700italic.woff2","bootstrap-italia/fonts/Lora/lora-v20-latin-ext_latin-italic.eot","bootstrap-italia/fonts/Lora/lora-v20-latin-ext_latin-italic.svg","bootstrap-italia/fonts/Lora/lora-v20-latin-ext_latin-italic.ttf","bootstrap-italia/fonts/Lora/lora-v20-latin-ext_latin-italic.woff","bootstrap-italia/fonts/Lora/lora-v20-latin-ext_latin-italic.woff2","bootstrap-italia/fonts/Lora/lora-v20-latin-ext_latin-regular.eot","bootstrap-italia/fonts/Lora/lora-v20-latin-ext_latin-regular.svg","bootstrap-italia/fonts/Lora/lora-v20-latin-ext_latin-regular.ttf","bootstrap-italia/fonts/Lora/lora-v20-latin-ext_latin-regular.woff","bootstrap-italia/fonts/Lora/lora-v20-latin-ext_latin-regular.woff2","bootstrap-italia/fonts/Lora/OFL.txt","bootstrap-italia/fonts/Roboto_Mono/LICENSE.txt","bootstrap-italia/fonts/Roboto_Mono/roboto-mono-v13-latin-ext_latin-700.eot","bootstrap-italia/fonts/Roboto_Mono/roboto-mono-v13-latin-ext_latin-700.svg","bootstrap-italia/fonts/Roboto_Mono/roboto-mono-v13-latin-ext_latin-700.ttf","bootstrap-italia/fonts/Roboto_Mono/roboto-mono-v13-latin-ext_latin-700.woff","bootstrap-italia/fonts/Roboto_Mono/roboto-mono-v13-latin-ext_latin-700.woff2","bootstrap-italia/fonts/Roboto_Mono/roboto-mono-v13-latin-ext_latin-700italic.eot","bootstrap-italia/fonts/Roboto_Mono/roboto-mono-v13-latin-ext_latin-700italic.svg","bootstrap-italia/fonts/Roboto_Mono/roboto-mono-v13-latin-ext_latin-700italic.ttf","bootstrap-italia/fonts/Roboto_Mono/roboto-mono-v13-latin-ext_latin-700italic.woff","bootstrap-italia/fonts/Roboto_Mono/roboto-mono-v13-latin-ext_latin-700italic.woff2","bootstrap-italia/fonts/Roboto_Mono/roboto-mono-v13-latin-ext_latin-italic.eot","bootstrap-italia/fonts/Roboto_Mono/roboto-mono-v13-latin-ext_latin-italic.svg","bootstrap-italia/fonts/Roboto_Mono/roboto-mono-v13-latin-ext_latin-italic.ttf","bootstrap-italia/fonts/Roboto_Mono/roboto-mono-v13-latin-ext_latin-italic.woff","bootstrap-italia/fonts/Roboto_Mono/roboto-mono-v13-latin-ext_latin-italic.woff2","bootstrap-italia/fonts/Roboto_Mono/roboto-mono-v13-latin-ext_latin-regular.eot","bootstrap-italia/fonts/Roboto_Mono/roboto-mono-v13-latin-ext_latin-regular.svg","bootstrap-italia/fonts/Roboto_Mono/roboto-mono-v13-latin-ext_latin-regular.ttf","bootstrap-italia/fonts/Roboto_Mono/roboto-mono-v13-latin-ext_latin-regular.woff","bootstrap-italia/fonts/Roboto_Mono/roboto-mono-v13-latin-ext_latin-regular.woff2","bootstrap-italia/fonts/Titillium_Web/OFL.txt","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-300.eot","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-300.svg","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-300.ttf","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-300.woff","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-300.woff2","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-300italic.eot","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-300italic.svg","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-300italic.ttf","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-300italic.woff","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-300italic.woff2","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-600.eot","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-600.svg","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-600.ttf","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-600.woff","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-600.woff2","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-600italic.eot","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-600italic.svg","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-600italic.ttf","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-600italic.woff","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-600italic.woff2","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-700.eot","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-700.svg","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-700.ttf","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-700.woff","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-700.woff2","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-700italic.eot","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-700italic.svg","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-700italic.ttf","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-700italic.woff","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-700italic.woff2","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-italic.eot","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-italic.svg","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-italic.ttf","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-italic.woff","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-italic.woff2","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-regular.eot","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-regular.svg","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-regular.ttf","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-regular.woff","bootstrap-italia/fonts/Titillium_Web/titillium-web-v10-latin-ext_latin-regular.woff2","bootstrap-italia/js/bootstrap-italia.bundle.min.js","bootstrap-italia/js/bootstrap-italia.min.js","bootstrap-italia/plugins/accept-overlay.js","bootstrap-italia/plugins/accept-overlay.js.map","bootstrap-italia/plugins/accordion.js","bootstrap-italia/plugins/accordion.js.map","bootstrap-italia/plugins/alert.js","bootstrap-italia/plugins/alert.js.map","bootstrap-italia/plugins/backToTop.js","bootstrap-italia/plugins/backToTop.js.map","bootstrap-italia/plugins/button.js","bootstrap-italia/plugins/button.js.map","bootstrap-italia/plugins/carousel-bi.js","bootstrap-italia/plugins/carousel-bi.js.map","bootstrap-italia/plugins/carousel.js","bootstrap-italia/plugins/carousel.js.map","bootstrap-italia/plugins/collapse.js","bootstrap-italia/plugins/collapse.js.map","bootstrap-italia/plugins/cookiebar.js","bootstrap-italia/plugins/cookiebar.js.map","bootstrap-italia/plugins/dimmer.js","bootstrap-italia/plugins/dimmer.js.map","bootstrap-italia/plugins/dropdown.js","bootstrap-italia/plugins/dropdown.js.map","bootstrap-italia/plugins/fonts-loader.js","bootstrap-italia/plugins/fonts-loader.js.map","bootstrap-italia/plugins/form-validate.js","bootstrap-italia/plugins/form-validate.js.map","bootstrap-italia/plugins/forward.js","bootstrap-italia/plugins/forward.js.map","bootstrap-italia/plugins/header-sticky.js","bootstrap-italia/plugins/header-sticky.js.map","bootstrap-italia/plugins/history-back.js","bootstrap-italia/plugins/history-back.js.map","bootstrap-italia/plugins/init.js","bootstrap-italia/plugins/init.js.map","bootstrap-italia/plugins/input-label.js","bootstrap-italia/plugins/input-label.js.map","bootstrap-italia/plugins/input-number.js","bootstrap-italia/plugins/input-number.js.map","bootstrap-italia/plugins/input-password.js","bootstrap-italia/plugins/input-password.js.map","bootstrap-italia/plugins/input-search-autocomplete.js","bootstrap-italia/plugins/input-search-autocomplete.js.map","bootstrap-italia/plugins/input.js","bootstrap-italia/plugins/input.js.map","bootstrap-italia/plugins/list.js","bootstrap-italia/plugins/list.js.map","bootstrap-italia/plugins/masonry.js","bootstrap-italia/plugins/masonry.js.map","bootstrap-italia/plugins/modal.js","bootstrap-italia/plugins/modal.js.map","bootstrap-italia/plugins/navbar-collapsible.js","bootstrap-italia/plugins/navbar-collapsible.js.map","bootstrap-italia/plugins/navscroll.js","bootstrap-italia/plugins/navscroll.js.map","bootstrap-italia/plugins/notification.js","bootstrap-italia/plugins/notification.js.map","bootstrap-italia/plugins/offcanvas.js","bootstrap-italia/plugins/offcanvas.js.map","bootstrap-italia/plugins/popover.js","bootstrap-italia/plugins/popover.js.map","bootstrap-italia/plugins/progress-donut.js","bootstrap-italia/plugins/progress-donut.js.map","bootstrap-italia/plugins/scrollspy.js","bootstrap-italia/plugins/scrollspy.js.map","bootstrap-italia/plugins/select-autocomplete.js","bootstrap-italia/plugins/select-autocomplete.js.map","bootstrap-italia/plugins/sticky.js","bootstrap-italia/plugins/sticky.js.map","bootstrap-italia/plugins/tab.js","bootstrap-italia/plugins/tab.js.map","bootstrap-italia/plugins/toast.js","bootstrap-italia/plugins/toast.js.map","bootstrap-italia/plugins/tooltip.js","bootstrap-italia/plugins/tooltip.js.map","bootstrap-italia/plugins/track-focus.js","bootstrap-italia/plugins/track-focus.js.map","bootstrap-italia/plugins/transfer.js","bootstrap-italia/plugins/transfer.js.map","bootstrap-italia/plugins/upload-dragdrop.js","bootstrap-italia/plugins/upload-dragdrop.js.map","bootstrap-italia/plugins/util/cookies.js","bootstrap-italia/plugins/util/cookies.js.map","bootstrap-italia/plugins/util/device.js","bootstrap-italia/plugins/util/device.js.map","bootstrap-italia/plugins/util/dom.js","bootstrap-italia/plugins/util/dom.js.map","bootstrap-italia/plugins/util/observer.js","bootstrap-italia/plugins/util/observer.js.map","bootstrap-italia/plugins/util/on-document-scroll.js","bootstrap-italia/plugins/util/on-document-scroll.js.map","bootstrap-italia/plugins/util/pageScroll.js","bootstrap-italia/plugins/util/pageScroll.js.map","bootstrap-italia/plugins/util/tween.js","bootstrap-italia/plugins/util/tween.js.map","bootstrap-italia/plugins/util/youtube-video.js","bootstrap-italia/plugins/util/youtube-video.js.map","bootstrap-italia/plugins/videoplayer.js","bootstrap-italia/plugins/videoplayer.js.map","bootstrap-italia/svg/sprites.svg","bootstrap-italia/version.js","bootstrap-italia/version.js.map","favicon.png","img/buildings.jpg","img/monitor.jpg","img/opendata.jpg","svg/building.svg","svg/sprites.svg","vids/wait0.mp4","vids/wait1.mp4","vids/wait2.mp4","vids/wait3.mp4","vids/wait4.mp4","vids/wait5.mp4"]),
	mimeTypes: {".svg":"image/svg+xml",".js":"text/javascript",".map":"application/json",".css":"text/css",".ttf":"font/ttf",".woff":"font/woff",".woff2":"font/woff2",".txt":"text/plain",".png":"image/png",".jpg":"image/jpeg",".mp4":"video/mp4"},
	_: {
		client: {"start":"_app/immutable/entry/start.xljj_n3I.js","app":"_app/immutable/entry/app.mWCOf984.js","imports":["_app/immutable/entry/start.xljj_n3I.js","_app/immutable/chunks/entry.Q3uX91pF.js","_app/immutable/chunks/scheduler.AMfUPaqd.js","_app/immutable/entry/app.mWCOf984.js","_app/immutable/chunks/scheduler.AMfUPaqd.js","_app/immutable/chunks/index.sOBxWm11.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js')),
			__memo(() => import('../output/server/nodes/7.js')),
			__memo(() => import('../output/server/nodes/8.js')),
			__memo(() => import('../output/server/nodes/9.js')),
			__memo(() => import('../output/server/nodes/10.js')),
			__memo(() => import('../output/server/nodes/11.js')),
			__memo(() => import('../output/server/nodes/12.js')),
			__memo(() => import('../output/server/nodes/13.js')),
			__memo(() => import('../output/server/nodes/14.js')),
			__memo(() => import('../output/server/nodes/15.js')),
			__memo(() => import('../output/server/nodes/16.js')),
			__memo(() => import('../output/server/nodes/17.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/accesso",
				pattern: /^\/accesso\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/file/[id]",
				pattern: /^\/api\/file\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/file/_id_/_server.js'))
			},
			{
				id: "/api/img/[url]",
				pattern: /^\/api\/img\/([^/]+?)\/?$/,
				params: [{"name":"url","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/img/_url_/_server.js'))
			},
			{
				id: "/api/vcard/[id]",
				pattern: /^\/api\/vcard\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/vcard/_id_/_server.js'))
			},
			{
				id: "/cruscotti/fornitori",
				pattern: /^\/cruscotti\/fornitori\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/cruscotti/generale",
				pattern: /^\/cruscotti\/generale\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/monitoraggio/asseverazioni",
				pattern: /^\/monitoraggio\/asseverazioni\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/monitoraggio/avvisi",
				pattern: /^\/monitoraggio\/avvisi\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/monitoraggio/crono",
				pattern: /^\/monitoraggio\/crono\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/monitoraggio/risorse",
				pattern: /^\/monitoraggio\/risorse\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/monitoraggio/target",
				pattern: /^\/monitoraggio\/target\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/opendata",
				pattern: /^\/opendata\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/op/avvisi",
				pattern: /^\/op\/avvisi\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/op/candidatura/[id]",
				pattern: /^\/op\/candidatura\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/op/contatti",
				pattern: /^\/op\/contatti\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/op/enti",
				pattern: /^\/op\/enti\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/op/referenti",
				pattern: /^\/op\/referenti\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/op/scadenze",
				pattern: /^\/op\/scadenze\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
