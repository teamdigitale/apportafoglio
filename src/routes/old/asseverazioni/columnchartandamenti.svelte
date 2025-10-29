<script>
	import { onMount } from 'svelte';
	export let id = '-';
	export let values = [[]];
	export let title;
	export let xlabel;
	export let ylabel;
	export let stacked = false;
	

	let data;
	let chart;

	let options = {
		isStacked: stacked,

		height: 400,
		width: '80%',
		
		hAxis: {
			title: xlabel,
			slantedText: true,
			slantedTextAngle: 30,
			format: 'MM-YYYY',
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
			title: ylabel,
			textStyle: {
				fontSize: 14,
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
		title: title,
		backgroundColor: { fill: 'transparent' },

		legend: { position: "right" },
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
		chart = new window.google.visualization.ColumnChart(ctx);
		redraw(chart, values, google.charts.Bar.convertOptions(options));
	};

	const update = async () => {
		if (window.google === undefined) return;
		const loader = window.google.charts;
		loader.load('current', { packages: ['corechart', 'bar'], language: 'it' });
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
