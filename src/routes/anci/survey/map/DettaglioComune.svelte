<script>
	// @ts-nocheck

	import ObservablePlot from '$lib/c/observable/ObservablePlot.svelte';
	import { dangerColor, percentuale, warningColor } from '$lib/js/shared';
	import * as Plot from '@observablehq/plot';
	import * as d3 from 'd3';
	import * as turf from '@turf/turf';
	import moment from 'moment/min/moment-with-locales';
	moment.locale('it');

	export let risposta;
	export let mapwidth;
	export let margin = 30;


	$: {
		risposta.geooriginal = turf.transformScale(risposta.geo[0], 0.5);
		//risposta.chull = turf.polygonToLine(turf.bboxPolygon(turf.bbox(risposta.geooriginal)));

		//risposta.chullwarning =  turf.transformScale(risposta.chull,(1+2*Number(risposta.surveyanci.livelloWarning)));
		//risposta.chullalert =  turf.transformScale(risposta.chull,(1+2*Number(risposta.surveyanci.livelloWarning+risposta.surveyanci.livelloAlert)));
	}

	$: projection = d3
		.geoConicConformal()
		.fitSize([mapwidth - margin, mapwidth - margin], risposta.geo[0]);
	
</script>

<div class="alert alert-info" role="alert">
	<strong>{risposta.nome}, provincia di {risposta.geo[0].properties.prov_name}</strong>
	<hr />
	<div class="row">
		<div class="col col-12 col-lg-8">
			{#if risposta.surveyanci.completato}
				<p>
					Data inivio risposta: <b
						>{moment(risposta.surveyanci.data_invio, 'YYYY-MM-DD HH:mm:ss')
							.add(2, 'hours')
							.calendar()
							.toLocaleLowerCase()}</b
					>
				</p>
				<p>
					Livello warning: <b class="text-warning"
						>{percentuale(risposta.surveyanci.livelloWarning)}</b
					>
				</p>
				<p>
					Livello alert: <b class="text-danger">{percentuale(risposta.surveyanci.livelloAlert)}</b>
				</p>
				<p>
					<a href="/anci/survey/rispostaente/{risposta.pa2026.id}" target="_blank"
						>Vedi questionario
						<svg class="icon icon-sm icon-primary me-2"
							><use href="/svg/sprites.svg#it-file"></use></svg
						></a
					>
				</p>
			{:else}
				<p>
					<p><b>Data inzio compilazione: {moment(risposta.surveyanci.data_apertura, 'YYYY-MM-DD HH:mm:ss')
                        .add(2, 'hours')
                        .calendar()
                        .toLocaleLowerCase()}</b></p>
					{#if risposta.surveyanci.nomeReferente && risposta.surveyanci.nomeReferente.trim() !== ''}
						<p>
							Nominativo: <b class="text-info">{risposta.surveyanci.nomeReferente}</b>
						</p>
						{#if risposta.surveyanci.ruoloReferente && risposta.surveyanci.ruoloReferente !== ''}
							<p>
								Ruolo: <b class="text-info">{risposta.surveyanci.ruoloReferente}</b>
							</p>
						{/if}
						{#if risposta.surveyanci.telefonoReferente && risposta.surveyanci.telefonoReferente !== ''}
							<p>
								Telefono: <b class="text-info">{risposta.surveyanci.telefonoReferente}</b>
							</p>
						{/if}
					{/if}
				
			{/if}
		</div>
		<div class="col col-12 col-lg-4" bind:clientWidth={mapwidth}>
			<ObservablePlot
				options={{
					projection: projection,
					width: mapwidth,
					//height: mapwidth,
					marginBottom: margin,
					marginTop: margin,
					marginLeft: margin,
					marginRight: margin,
					marks: [
						/*
                        Plot.geo(risposta.chullalert, {
							fill: dangerColor,
							stroke: 'none',
                            fillOpacity: 0.5
							//title: (d) => 'Comune di ' + d.properties.name
						}),
						

                        Plot.geo(risposta.chullwarning, {
							fill: warningColor,
							stroke: 'none',
                            fillOpacity: 0.5
							//title: (d) => 'Comune di ' + d.properties.name
						}),

                        Plot.geo(risposta.chull, {
							fill: 'white',
							stroke: 'grey',
							strokeOpacity: 1,
                            strokeWidth: 0.5,
							//title: (d) => 'Comune di ' + d.properties.name
						}),
                        */

						Plot.geo(risposta.geooriginal, {
							fill: (d) => (risposta.surveyanci.completato ? '#008055' : '#0066cc'),
							stroke: (d) => (risposta.surveyanci.completato ? '#008055' : '#0066cc'),
							fillOpacity: 0.5,
							strokeOpacity: 1,
							title: (d) => 'Comune di ' + d.properties.name
						}),
						Plot.dot(
							risposta.geooriginal,
							Plot.centroid({
								r: 2,
								fill: 'black',
								fillOpacity: 1
							})
						)
					]
				}}
			/>
		</div>
	</div>
</div>

<div></div>

<div></div>
