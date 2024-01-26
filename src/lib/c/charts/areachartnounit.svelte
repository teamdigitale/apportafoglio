<script>
    import { onMount } from "svelte";
    export let id = "-";
    export let values = [[]];
    export let title = "";
    export let colors = [];
    export let maxvalue = undefined;
    export let stacked = false;
    export let titleColor;
    export let legend = 'top';

    let chart;

    $: options = {
        isStacked: stacked,
        explorer: {keepInBounds: true, maxZoomOut: 1},
        title: title,
        legend: {position: legend, maxLines: 10},
        
        animation: {
            duration: 500,
            easing: "out",
        },
        backgroundColor: {fill: "transparent"},
        colors: colors,
        fontName: "Titillium Web",
        hAxis: { format: "MMM yyyy" },
        titleTextStyle: { color: titleColor?titleColor:colors[0] }
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
        chart = new google.visualization.AreaChart(ctx);
        redraw(chart, values, options);
    };

    const update = async () => {
        if (window.google === undefined) return;
        const loader = window.google.charts;
        loader.load("current", { packages: ["corechart"], language: "it" });
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


