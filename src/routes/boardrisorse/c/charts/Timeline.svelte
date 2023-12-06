<script>
    import { onMount } from "svelte";
    export let id = "-";
    export let values = [[]];
    export let title = "";

    let chart;

    let options = {
        title: title,
        backgroundColor: "#ffffffff",
        fontName: "Titillium Web",
        timeline: {
            singleColor: "#48c78e",
            rowLabelStyle: { fontName: "Titillium Web" },
            barLabelStyle: { fontName: "Titillium Web" },
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
        ch.draw(d, ops);
    };

    const draw = () => {
        if (window.google === undefined) return;
        const ctx = document.getElementById(id);
        if (!ctx) return;
        chart = new google.visualization.Timeline(ctx);
        redraw(chart, values, options);
    };

    const update = async () => {
        if (window.google === undefined) return;
        const loader = window.google.charts;
        loader.load("current", { packages: ["timeline"], language: "it" });
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
