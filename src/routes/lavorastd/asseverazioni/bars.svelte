<script>
    import { onMount } from "svelte";
    export let id = "-";
    export let values = [[]];
    export let direction = "vertical";

    let chart;

    let options = {
        chart: {},
        bars: direction,
        isStacked: true,
        backgroundColor: { fill: "transparent" },
        chartArea: {
            backgroundColor: {
                fill: "transparent",
            },
        },

        series: {
            0: { color: "#33CC99" },
            1: { color: "#0099FF" },
            2: { color: "#FF3366" },
            3: { color: "grey" },
        },
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
 
        ch.draw(d, google.charts.Bar.convertOptions(ops));
    };

    const draw = () => {
        if (window.google === undefined) return;
        const ctx = document.getElementById(id);
        if (!ctx) return;
        chart = new window.google.charts.Bar(ctx);
        redraw(chart, values, options);
    };

    const update = async () => {
        if (window.google === undefined) return;
        const loader = window.google.charts;
        loader.load("current", { packages: ["bar"] });
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
