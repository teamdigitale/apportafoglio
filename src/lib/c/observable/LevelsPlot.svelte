<script>
	import * as Plot from '@observablehq/plot';
	import * as d3 from 'd3';
	import ObservablePlot from './ObservablePlot.svelte';
	export let defaultColor = '#888888';
	export let barHeight = 50;
	/**
	 * @type {string | string[]}
	 */
	export let levels = [];
	/**
	 * @type {string | string[]}
	 */
	export let levelsColors = [];
	export let wrapLabels = false;
	export let marginLeft = 100;
	export let marginRight = 50;
	export let marginBottom = 50;
	/**
	 * @type {string | string[]}
	 */
	export let values = [];
	export let inset = 3;

	export let textLength = 10;
	

	
	const labelToNumber = (/** @type {string} */ l) => {
		return levels.indexOf(l);
	};
	const numberToLabel = (/** @type {number} */ n) => {
		return levels[n];
	};

	const splitText = (t,tl) => {
		
		if (t) {

			const words = t.split(' ');
			
			if (words.length === 1) {
				
				return t;
			}
			const res = [];
			let s = '';
			words.forEach((w) => {
				s = s + ' ' + w;
				if (s.length > tl) {
					res.push(s);
					s = '';
				}
			});
			if (s !== '') res.push(s);
			
			return res.join('\n');
		} else {
			return '';
		}
	};
</script>

<div class="plot">
	<ObservablePlot
		options={{
			height: barHeight * values.length + 50,
			marginLeft: marginLeft,
			marginRight: marginRight,
			marginBottom: marginBottom,
			marginTop: 0,
			inset: 10,
			x: {
				tickFormat: (d) => (wrapLabels ? splitText(numberToLabel(d),10) : numberToLabel(d)),
				tickSize: 8,
				ticks: levels.map(x => labelToNumber(x))
			},
			y: {
				tickFormat: (d) => (wrapLabels ? splitText(d,textLength) : numberToLabel(d))
			},
			marks: [
				Plot.barX(values, {
					x: (d) => labelToNumber(levels[levels.length - 1]),
					y: (d) => d.name,
					sort: { y: 'y', reverse: false },
					fill: defaultColor,
					fillOpacity: 0.2,
					stroke: defaultColor,
					strokeOpacity: 0,
					inset: 0
				}),
				Plot.barX(values, {
					x: (d) => labelToNumber(d.level),
					y: (d) => d.name,
					sort: { y: 'y', reverse: false },
					fill: (d) => levelsColors[labelToNumber(d.level)],
					fillOpacity: 0.8,
					stroke: (d) => levelsColors[labelToNumber(d.level)],
					strokeOpacity: 1,
					insetBottom: 2 * inset,
					insetTop: 2 * inset,
					insetLeft: inset,
					insetRight: inset,
					r: inset,
					tip: true,
					title: (d) => d.name + `: ` + d.level
				})
			]
		}}
	/>
</div>

<style>
	.plot {
	}
</style>
