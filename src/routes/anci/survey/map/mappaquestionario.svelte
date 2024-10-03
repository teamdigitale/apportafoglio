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
	export let entiNonCompilato;
	const margin = 40;

	import moment from 'moment/min/moment-with-locales';
	import { redirect } from '@sveltejs/kit';
	import { scale } from 'svelte/transition';
	import DettaglioComune from './DettaglioComune.svelte';

	import geocomuni from './Limiti01012024_g.json';
	import nomi_istat_anci from "./nomi_istat_anci.json";
	moment.locale('it');

	
	const compareComuni = (comanci,comsf) => {
    
    if(comanci===comsf) return true;
    const ia = nomi_istat_anci.find(x => x.nome_sf===comsf);
    if(ia){
        if(ia.nome_istat===comanci.replaceAll("Comune di ","")){
            return true;
        }
    }
    return false;
    
}

	$: geofeatures = (risp) => {
		const res = [];
		risp.forEach((r) => {
			if (r.geo) {
				res.push({...r.geo[0], completato: (r.surveyanci&&r.surveyanci.completato)?true:false});
				
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
	const seleziona = (event) => {
		comuneSelezionato = event.target.textContent;
	};
	$: risposta = risposte.find((y) => y.nome === comuneSelezionato);
</script>

{#if risposta}
	<DettaglioComune {risposta} mapwidth={200} />
{:else if (comuneSelezionato&&comuneSelezionato.length<200)}
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
					stroke: '#0066cc'
				}),
				/*
				Plot.geo(
					geocomuni.features
					
					, {
					stroke: 'grey',
					strokeWidth: 0.2,
					fill: 'grey',
					fillOpacity: 0.2,
					title: (d) => 'Comune di ' + d.properties.COMUNE
				}),
				*/

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
						fillOpacity: 1
						//C
						/*
						target: '_blank',
						href: (d) =>
							'/anci/survey/rispostaente/' +
							risposte.find((y) => y.nome === 'Comune di ' + d.properties.name).pa2026.id
							*/
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
						//risposte.find((x) => x.nome === 'Comune di ' + d.properties.name)&&risposte.find((x) => x.nome === 'Comune di ' + d.properties.name).surveyanci
						//compareComuni
						d.completato
								? '#008055'
								: '#0066cc',
						stroke: (d) =>
						//risposte.find((x) => x.nome === 'Comune di ' + d.properties.name)&&risposte.find((x) => x.nome === 'Comune di ' + d.properties.name).surveyanci
						d.completato
								? '#008055'
								: '#0066cc',
						fillOpacity: 0.5,
						strokeOpacity: 1,
						title: (d) => 'Comune di ' + d.properties.name
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
