<script>
	import { onMount } from 'svelte';
	export let id = '-s';
	export let values;
	export let w = 100;
	export let h = 100;

	onMount(async () => {
		await update();
	});

	let chart;

	let options = {
		fontName: 'Titillium Web',
		redFrom: 0,
		redTo: 40,
		yellowFrom: 40,
		yellowTo: 80,
		greenFrom: 80,
		greenTo: 100,
		minorTicks: 5,
		max: 100,
		animation: { easing: 'out', duration: 500 },
		majorTicks: ['0', '20', '40', '60','80', '100'],
		width: w, height: h
	};

	const getValidCharData = (d, isFirtsRowLabels) => {
		if (window.google === undefined || !values) return;
		const g = window.google;
		if (Array.isArray(d)) {
			return g.visualization.arrayToDataTable(d, isFirtsRowLabels);
		}
		if (typeof d !== 'object') return;
		return new g.visualization.DataTable(values);
	};

	const redraw = (ch, dd, ops) => {
		if (!ch || !dd) return;
		const d = getValidCharData(dd);
		if (!d) return;
		const formatter = new google.visualization.NumberFormat({
			suffix: '%',
			pattern: '#'
		});
		formatter.format(d, 1);
		ch.draw(d, ops);
	};

	const draw = () => {
		if (window.google === undefined) return;
		const ctx = document.getElementById(id);
		if (!ctx) return;
		chart = new google.visualization.Gauge(ctx);
		redraw(chart, values, options);
	};

	const update = async () => {
		if (window.google === undefined) return;
		const loader = window.google.charts;
		loader.load('current', { packages: ['gauge'], language: 'it' });
		loader.setOnLoadCallback(draw);
	};

	$: redraw(chart, values, options);

	let onResizeEnd;
	const resized = () => {
		clearTimeout(onResizeEnd);
		onResizeEnd = setTimeout(() => {
			redraw(chart, values, options);
		}, 100);
	};
</script>

<svelte:window on:resize={resized} />

<div {id} class="isgauge" />

<style>
	.isgauge {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
</style>
