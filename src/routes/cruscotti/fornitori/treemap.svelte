<script>
	import { euro } from "$lib/js/shared";
    import { onMount } from "svelte";
    export let id = "-";
    export let values = [[]];

    let chart;

    function showFullTooltip(row, size, value) {


  
    return '<div class="bg-white py-2 px-4 shadow rounded">' +
           '<span><svg class="icon icon-primary"><use href="/svg/sprites.svg#it-info-circle"></use></svg><br/></span>'+

           'Numero candidature: <strong>' + size + '</strong><br>' +
           'Valore candidature: <strong>' + euro(values[row+1][3]) + '</strong><br>' +
	   
           ' </div>';
  }

    $: options = {
        highlightOnMouseOver: true,
        headerHeight: 15,
        showScale: true,
        height: 500,
        useWeightedAverageForAggregation: true,
        generateTooltip: showFullTooltip,
        titleTextStyle: {
				fontSize: 14,
				color: '#000000',
				bold: false,
				italic: false,
				fontName: 'Titillium Web'
			}

    };

    onMount(async () => {
        await update();
    });

    const getValidCharData = (d, isFirtsRowLabels) => {
        if (window.google === undefined || !values) return;
        const g = window.google;
        if (Array.isArray(d)) {
            return g.visualization.arrayToDataTable(d, isFirtsRowLabels);
        }
        if (typeof d !== "object") return;
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
        chart = new google.visualization.TreeMap(ctx);
        redraw(chart, values, options);
    };

    const update = async () => {
        if (window.google === undefined) return;
        const loader = window.google.charts;
        loader.load("current", { packages: ["treemap"], language: "it" });
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


