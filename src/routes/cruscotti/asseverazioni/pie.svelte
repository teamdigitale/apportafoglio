<script>
    import { onMount } from "svelte";
    export let id = "-";
    export let values = [[]];

    let chart;
    let slices = [];

    let options = {
        backgroundColor: { fill: "transparent" },
        legend: { position: "right" },
        fontName: "Titillium Web",
        height: 400,
        sliceVisibilityThreshold: 0,
        slices: slices,
        chartArea: {left:20,top: 20,width:"100%",height:"100%"}
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
        slices = [];
        for (var i = 0; i < dd.length; i++) {
            if (dd[i][0] === "Parziale") slices.push({ color: "#FF3366" });
            if (dd[i][0] === "Positivo") slices.push({ color: "#33CC99" });
            if (dd[i][0] === "In lavorazione") slices.push({ color: "#0099FF" });
            if (dd[i][0] === "Negativo") slices.push({ color: "grey" });
        }
        ops.slices = slices;
        ch.draw(d, ops);
    };

    const draw = () => {
        if (window.google === undefined) return;
        const ctx = document.getElementById(id);
        if (!ctx) return;
        chart = new window.google.visualization.PieChart(ctx);

        redraw(chart, values, options);
    };

    const update = async () => {
        if (window.google === undefined) return;
        const loader = window.google.charts;
        loader.load("current", { packages: ["corechart"] });
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
