<script>
	// @ts-nocheck

	import * as Plot from '@observablehq/plot';
	import * as d3 from 'd3';
	import ObservablePlot from '$lib/c/observable/ObservablePlot.svelte';
	import { dangerColor, formatNumber, percentuale } from '$lib/js/shared.js';

	export let regioni = [];
	export let risposte = [];
	export let risposteEvidenziate = [];
	export let regione;
	export let mapwidth;
	const margin = 40;

	import moment from 'moment/min/moment-with-locales';
	import { redirect } from '@sveltejs/kit';
	import { scale } from 'svelte/transition';

	export let com;
	moment.locale('it');
	export let view;

	$: viewMode = view;

	$: getOpacity = (s, v) => {
		return 0.5;
	};

	$: geofeatures = (risp) => {
		const res = [];
		risp.forEach((r) => {
			r.geo = com.features.find((c) => c.properties.PRO_COM_T === r.codice_istat_comune);

			if (r.geo && r.stato_compilazione === view) {
				res.push({
					...r.geo,
					completato: r.stato_compilazione === 'Completato',
					maiaperto: r.stato_compilazione === 'Mai aperto'
				});
			}
		});
		return res;
	};

	$: regs = {
		...regioni,
		features: regioni.features.filter((x) =>
			regione === 'Tutte' ? true : x.properties.reg_name === regione
		)
	};
	$: height = mapwidth;
	$: projection = d3.geoConicConformal().fitSize([mapwidth - margin, height - margin], regs);
</script>

<div id="svgmap">
	<ObservablePlot
		options={{
			projection: projection,
			width: mapwidth,
			height: height,
			marginBottom: 30,
			marginTop: 30,
			marginLeft: 30,
			marginRight: 30,
			marks: [
				Plot.geo(regs, {
					stroke: 'lightgrey'
				}),

				Plot.geo(geofeatures(risposteEvidenziate), {
					stroke: dangerColor,
					strokeWidth: 4,
					strokeOpacity: 1,
					fill: dangerColor,
					fillOpacity: 0
				}),

				,
				Plot.geo(geofeatures(risposte), {
					fill: (d) => (d.completato ? '#008055' : d.maiaperto ? '#cc334d' : '#0066cc'),
					stroke: (d) => (d.completato ? '#008055' : d.maiaperto ? '#cc334d' : '#0066cc'),
					fillOpacity: 0.8,
					strokeWidth: 0,
					strokeOpacity: 0,
					title: (d) => d.properties.PRO_COM_T + ' - Comune di ' + d.properties.COMUNE
				})
			]
		}}
	/>
</div>
