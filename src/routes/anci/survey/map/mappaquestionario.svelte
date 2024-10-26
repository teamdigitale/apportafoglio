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
	import DettaglioComune from './DettaglioComune.svelte';

	import com from './comuni_def_2.json';
	moment.locale('it');
	export let view;

	$: viewMode = view;

	$: getOpacity = (s, v) => {
		return 0.5;
	};

	$: geofeatures = (risp) => {
		const res = [];
		risp.forEach((r) => {
			r.geo = com.features.find((c) => c.properties.PRO_COM_T === r.pa2026.istat);
			
			if (r.geo) {
				res.push({
					...r.geo,
					completato: r.surveyanci.completato,
					maiaperto: !r.surveyanci.aperto
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

	const raggioWarning = (d) => {
		const baseradius = regione === 'Tutte' ? 6 : 20;

		return (
			baseradius *
			2 *
			(1 +
				risposte.find((y) => y.nome === 'Comune di ' + d.properties.name).surveyanci.livelloAlert)
		);
	};

	let comuneSelezionato;
	let istatSelezionato;
	const seleziona = (event) => {
		comuneSelezionato = event.target.textContent.substring(9);
		istatSelezionato = event.target.textContent.substring(0,6)
	};
	$: risposta = risposte.find((y) => y.pa2026.istat === istatSelezionato);
</script>

{#if risposta}
	<DettaglioComune {risposta}  />
{:else if comuneSelezionato && comuneSelezionato.length < 200}
	<div class="alert alert-warning" role="alert">
		<p>Il <b>{comuneSelezionato}</b> non ha ancora iniziato a compilare il questionario</p>
		<p></p>
	</div>
{/if}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id="svgmap" on:click={seleziona}>
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
				/*
				Plot.dot(
					geofeatures(risposte),
					Plot.centroid({
						r: 1,
						fill: 'black',
						fillOpacity: 1
						
					})
				),
				*/

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
							//risposte.find((x) => x.nome === 'Comune di ' + d.properties.name)&&risposte.find((x) => x.nome === 'Comune di ' + d.properties.name).surveyanci
							//compareComuni
							d.completato ? '#008055' : d.maiaperto ? '#cc334d' : '#0066cc',
						stroke: (d) => (d.completato ? '#008055' : d.maiaperto ? '#cc334d' : '#0066cc'),
						fillOpacity: 0.8,
						strokeWidth: 0,
						strokeOpacity: 0,
						title: (d) => d.properties.PRO_COM_T+' - Comune di ' + d.properties.COMUNE
						/*
						title: (d) =>d.properties.name
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
								*/
						//C
						/*
						target: '_blank',
						href: (d) =>
							'/anci/survey/rispostaente/' +
							risposte.find((y) => y.nome === 'Comune di ' + d.properties.name).pa2026.id
							*/
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
