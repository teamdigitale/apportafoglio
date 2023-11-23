<script>
    import { onMount } from "svelte";
    export let id = "-";
    export let values = [[]];
    export let direction = "horizontal";

    let chart;

    let options = {
        fontName: "Titillium Web",

        legend: { position: "top", textStyle: { fontName: "Titillium Web" } },
        bars: direction,
        animation: { duration: 2, easing: "linear", startup: true },
        isStacked: false,
        colors: ["#23d160","#209cee","#ffdd57","#ff3860"],
        height:600,
        chartArea: {
        	height:300,
          top:100,
        },
        hAxis: {
            textPosition: 'out',
            slantedText: true,
            slantedTextAngle:45
        },
        stacked: true,
        vAxis: {
          title: 'Numero'
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
        d.addColumn({type: 'string', role: 'annotation'});
        if (!d) return;
        //ch.draw(d, window.google.charts.Bar.convertOptions(ops));
        ch.draw(d, ops);
    };

    const draw = () => {
        if (window.google === undefined) return;
        const ctx = document.getElementById(id);
        if (!ctx) return;
        chart = new window.google.visualization.ColumnChart(ctx);
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
