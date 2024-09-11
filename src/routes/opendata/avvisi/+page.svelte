<script>
	// @ts-nocheck

	export let data;
	import ObservablePlot from '$lib/c/observable/ObservablePlot.svelte';
	import * as d3 from 'd3';
	import * as Plot from '@observablehq/plot';

	let minDate = d3.min(data.avvisi, (d) => d.apertura);
	let maxDate = d3.max(data.avvisi, (d) => d.chiusura);
	let midDate = new Date(d3.median([minDate, maxDate]));
	let misure = d3
		.flatGroup(data.avvisi, (d) => d.misura)
		.map((x) => ({ misura: x[0], numero_avvisi: x[1].length }))
		.sort((a, b) => (b.misura < a.misura ? 1 : -1));
	let width;
</script>

<div class="container my-4">
	<h1>Avvisi PA2026</h1>
	<div bind:clientWidth={width}>
		<h3>Overview</h3>
		<ObservablePlot
			options={ {
                width: width,
                marginLeft: 100,
                //marginBottom: 200,
                x: {label: "Misura"  },
                y: {grid: true, label: "Data apertura", tickFormat:  (x) => x.toLocaleDateString("it-IT"), nice: true},
                color: {legend: true},
                marks: [  
                  Plot.dot(data.avvisi, Plot.dodgeX("middle", { fx: "misura", y: "apertura", fill: "stato", r: "valore",title: (d) => `Avviso: ${d.avviso}\nValore: ${d.valore}\nBeneficiari: ${d.beneficiari}`})),
                  Plot.axisFx({ anchor:  "bottom" , tickRotate: 0, label: "Misura", labelAnchor: "center", fontVariant: "strong", marginBottom: 80, lineWidth: 8, fontWeight: "bold"}),
                  //Plot.ruleY([d3.min(avvisi,(d) => d.apertura)])
                ]
              }}
		/>
	</div>

	<div bind:clientWidth={width}>
		<h3>Timeline</h3>
		<ObservablePlot
			options={{
				marginLeft: 400,
				marginRight: 50,
				axis: null,
				width: width,
				x: {
					axis: 'top',
					grid: true,
					tickFormat: (x) => x.toLocaleDateString('it-IT'),
					nice: true
				},
				marks: [
					//Plot.frame(),
					Plot.ruleX([new Date()], { stroke: '#5D7083', strokeOpacity: 0.5 }),
					Plot.barX(data.avvisi, {
						x1: 'apertura',
						x2: 'chiusura',
						y: 'avviso',
						sort: { y: 'x1' },
						fill: (d) => (d.stato === 'PUBBLICATO' ? '#008055' : '#cc334d'),
						fillOpacity: 0.5,
						stroke: (d) => (d.stato === 'PUBBLICATO' ? '#008055' : '#cc334d'),
						strokeWidth: 0.5,
						rx: 2
						//fy: "misura",
					}),

					Plot.text(data.avvisi, {
						x: (d) => d.apertura,
						y: 'avviso',
						text: 'avviso',
						textAnchor: 'end',
						dx: -3
						//fy: "misura"
					})
				]
			}}
		/>
	</div>
</div>
