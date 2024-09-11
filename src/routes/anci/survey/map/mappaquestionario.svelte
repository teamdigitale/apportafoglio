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
	moment.locale('it');

	$: geofeatures = (risp) => {
		const res = [];
		risp.forEach((r) => {
			if (r.geo) {
				res.push(r.geo[0]);
				//res.push({...r.geo[0],properties: {...r.properties}});
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

	const raggioWarning = (d) => {

		const baseradius = regione === 'Tutte' ? 6 : 20;


		return (
			baseradius *
			2 *
			(1 +
				risposte.find((y) => y.nome === 'Comune di ' + d.properties.name).surveyanci.livelloAlert)
		);
	};
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
					stroke: '#0066cc'
				}),

				Plot.geo(geofeatures(risposteEvidenziate), {
					stroke: dangerColor,
					strokeWidth: 4,
					strokeOpacity: 1,
					fill: dangerColor,
					fillOpacity: 0
				}),

				Plot.dot(
					geofeatures(risposte),
					Plot.centroid({
						r: 1,
						fill: 'black',
						fillOpacity: 1,
						href: (d) =>
							'/anci/survey/rispostaente/' +
							risposte.find((y) => y.nome === 'Comune di ' + d.properties.name).pa2026.id
					})
				),

				,
				/*
				Plot.dot(
					geofeatures(risposte).filter(
						(x) =>
							risposte.find((y) => y.nome === 'Comune di ' + x.properties.name).surveyanci
								.completato
					),
					Plot.centroid({
						r: regione === 'Tutte' ? 5 : 15,
						symbol: 'square',
						fill: '#995c00',
						stroke: '#995c00',
						fillOpacity: 0,
						strokeOpacity: 1,
                        href: (d) => '/anci/survey/ente/'+risposte.find((y) => y.nome === 'Comune di ' + d.properties.name).pa2026.id
					})
				),
                */

				Plot.geo(
					geofeatures(risposte),
					{
						fill: (d) =>
							risposte.find((x) => x.nome === 'Comune di ' + d.properties.name).surveyanci
								.completato
								? '#008055'
								: '#0066cc',
						stroke: (d) =>
							risposte.find((x) => x.nome === 'Comune di ' + d.properties.name).surveyanci
								.completato
								? '#008055'
								: '#0066cc',
						fillOpacity: 0.5,
						strokeOpacity: 1,
						title: (d) =>
							risposte.find((y) => y.nome === 'Comune di ' + d.properties.name).surveyanci
								.completato
								? [
										String.fromCodePoint(0x1f3e2) + '\tComune di ' + d.properties.name,
										String.fromCodePoint(0x1f4c5) +
											'Data invio: ' +
											moment(
												risposte.find((y) => y.nome === 'Comune di ' + d.properties.name).surveyanci
													.data_invio,
												'YYYY-MM-DD HH:mm:ss'
											)
												.add(2, 'hours')
												.calendar()
												.toLocaleLowerCase(),
										String.fromCodePoint(0x26a0) +
											'Livello warning: ' +
											percentuale(
												risposte.find((y) => y.nome === 'Comune di ' + d.properties.name).surveyanci
													.livelloWarning
											),
										String.fromCodePoint(0x2757) +
											'Livello alert: ' +
											percentuale(
												risposte.find((y) => y.nome === 'Comune di ' + d.properties.name).surveyanci
													.livelloAlert
											)
									].join('\r\n')
								: String.fromCodePoint(0x1f3e2) + '\tComune di ' + d.properties.name,
						href: (d) =>
							'/anci/survey/rispostaente/' +
							risposte.find((y) => y.nome === 'Comune di ' + d.properties.name).pa2026.id
					}
					/*Plot.centroid({
						r: regione === 'Tutte' ? 3 : 10,
						fill: (d) =>
							risposte.find((x) => x.nome === 'Comune di ' + d.properties.name).surveyanci
								.completato
								? '#008055'
								: '#0066cc',
						stroke: (d) =>
							risposte.find((x) => x.nome === 'Comune di ' + d.properties.name).surveyanci
								.completato
								? '#008055'
								: '#0066cc',
						fillOpacity: 0.5,
						strokeOpacity: 1,
						title: (d) =>
							risposte.find((y) => y.nome === 'Comune di ' + d.properties.name).surveyanci
								.completato
								? [
										String.fromCodePoint(0x1f3e2) + '\tComune di ' + d.properties.name,
										String.fromCodePoint(0x1f4c5) +
											'Data invio: ' +
											moment(
												risposte.find((y) => y.nome === 'Comune di ' + d.properties.name).surveyanci
													.data_invio,
												'YYYY-MM-DD HH:mm:ss'
											)
												.add(2, 'hours')
												.calendar()
												.toLocaleLowerCase(),
										String.fromCodePoint(0x26a0) +
											'Livello warning: ' +
											percentuale(
												risposte.find((y) => y.nome === 'Comune di ' + d.properties.name).surveyanci
													.livelloWarning
											),
										String.fromCodePoint(0x2757) +
											'Livello alert: ' +
											percentuale(
												risposte.find((y) => y.nome === 'Comune di ' + d.properties.name).surveyanci
													.livelloAlert
											)
									].join('\r\n')
								: String.fromCodePoint(0x1f3e2) + '\tComune di ' + d.properties.name,
						href: (d) =>
							'/anci/survey/rispostaente/' +
							risposte.find((y) => y.nome === 'Comune di ' + d.properties.name).pa2026.id
					})*/
				)
				/*
				Plot.dot(
					geofeatures(risposteEvidenziate),
					Plot.centroid({
						r: (d) => {
							return Number((1 + Math.random()) * 30);
						},
						fill: '#eba4af',
						stroke: '#eba4af',
						fillOpacity: 0.5,
						strokeOpacity: 1,
						href: (d) =>
							'/anci/survey/rispostaente/' +
							risposteEvidenziate.find((y) => y.nome === 'Comune di ' + d.properties.name).pa2026.id
					})
				),
				*/
			]
		}}
	/>
</div>
