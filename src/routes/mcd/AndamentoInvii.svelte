<script>
	// @ts-nocheck

	import * as Plot from '@observablehq/plot';
	import * as d3 from 'd3';
	import ObservablePlot from '$lib/c/observable/ObservablePlot.svelte';
	import { formatNumber, percentuale, primaryColor } from '$lib/js/shared.js';
    import moment from 'moment/min/moment-with-locales';
	moment.locale('it');

	export let values;


	$: completatiPerData = d3
		.flatGroup(
			values,
			(d) => d.data_completamento.substring(0, 10),
			(d) => d.tipologia
		)
		.map((x) => ({ giorno: x[0], tipo: x[1], numero: x[2].length }));

	$: getDataforChartInvii = (d) => {
		d.sort((a, b) => new Date(a.giorno) - new Date(b.giorno));
		const res = [];
		let sum = 0;
		d.forEach((x) => {
			sum = sum + x.numero;
			res.push({ ...x, giorno: new Date(x.giorno), numeroCumulato: sum });
		});
		return d3.sort(res, (d) => d.giorno);
	};

	
</script>
{#if completatiPerData.length>0}
<div class="callout">
	<ObservablePlot
		options={{
			title: "Andamento questionari compilati",
			marginRight: 30,
			y: { label: 'Numero risposte inviate', grid: true, tickFormat: formatNumber },
			x: {
				domain: [
					d3.min(getDataforChartInvii(completatiPerData), (d) => d.giorno),
					d3.max(getDataforChartInvii(completatiPerData), (d) => d.giorno)
				],
				nice: true,
                label: null,
                tickFormat: (d) => moment(d).format("DD/MM/YYYY"),
				ticks: 3,
				nice: true
			},
            height: 300,
			marks: [
				Plot.lineY(getDataforChartInvii(completatiPerData), { x: 'giorno', y: 'numeroCumulato', stroke: primaryColor }),
				Plot.dot(
					getDataforChartInvii(completatiPerData),
					Plot.pointerX({ x: 'giorno', y: 'numeroCumulato', stroke: 'red' })
				),
				Plot.ruleX(
					getDataforChartInvii(completatiPerData),
					Plot.pointerX({ x: 'giorno', py: 'numeroCumulato', stroke: 'red' })
				),
				Plot.ruleY([0]),
				Plot.tip(
					getDataforChartInvii(completatiPerData),
					Plot.pointerX({
						x: 'giorno',
						y: 'numeroCumulato',
						title: (d) => [moment(d.giorno).format("DD/MM/YYYY"), 'Questionari inviati: ' + d.numeroCumulato].join('\n\n')
					})
				)
			]
		}}
	/>
</div>
{:else}
<div></div>
{/if}
