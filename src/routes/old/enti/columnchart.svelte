<script>


	// @ts-nocheck

	import { onMount } from 'svelte';
	export let id = '-';
	export let values = [[]];
	export let stacked;
	export let legendPosition;

	let chart;

	let options = {
		isStacked: stacked,
		height: 500,
		width: '100%',

		hAxis: {
			textStyle: {
				fontSize: 12,
				color: '#000000',
				bold: false,
				italic: false,
				fontName: 'Titillium Web'
			},
			titleTextStyle: {
				fontSize: 14,
				color: '#000000',
				bold: false,
				italic: false,
				fontName: 'Titillium Web'
			}
		},
		vAxis: {
			textStyle: {
				fontSize: 12,
				color: '#000000',
				bold: false,
				italic: false,
				fontName: 'Titillium Web'
			},
			titleTextStyle: {
				fontSize: 14,
				color: '#000000',
				bold: false,
				italic: false,
				fontName: 'Titillium Web'
			}
		},
		backgroundColor: { fill: 'transparent' },
		bars: 'horizontal',
		legend: { position: ''+legendPosition, maxLines: 10},
		chartArea: {
			bottom: 20,
			width: '60%',
			height: '100%'
		}
	};
	onMount(async () => {
		await update();
		redraw(chart, values, options);
	});

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
		ch.draw(d, ops);
	};

	const draw = () => {
		if (window.google === undefined) return;
		const ctx = document.getElementById(id);
		if (!ctx) return;
		chart = new window.google.visualization.BarChart(ctx);
		redraw(chart, values, options);
	};

	const update = async () => {
		if (window.google === undefined) return;
		const loader = window.google.charts;
		loader.load('current', { packages: ['corechart'], language: 'it' });
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

<div {id} />
