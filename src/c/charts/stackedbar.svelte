<script>
    import { onMount } from "svelte";
    export let id = "-";
    export let values = [[]];
    export let direction = "vertical";

    let data;
    let chart;

    let options = {
        chart: {
        },
        bars: direction, 
        isStacked: false,
    };

    onMount(async () => {
        await update();
    });

    let drawBars = ()=> {
        chart = new google.charts.Bar(document.getElementById(id));
        data = google.visualization.arrayToDataTable(values);
        chart.draw(data, google.charts.Bar.convertOptions(options));
    }

    const getValidCharData= (d,isFirtsRowLabels) =>{
        if(window.google===undefined || ! values)return;
        const g = window.google;
        if(Array.isArray(d)){
            return g.visualization.arrayToDataTable(d,isFirtsRowLabels);
        }
        if(typeof d !== 'object') return;
        return new g.visualization.DataTable(values);
        
    }

    const redraw = (ch,dd,ops) => {
        if(!ch || ! dd) return;
        const d = getValidCharData(dd);
        if(!d) return;
        ch.draw(d,ops);
    }

    const draw = ()=>{
        if(window.google===undefined)return;
        const ctx = document.getElementById(id);
        if(!ctx)return;
        chart = new window.google.charts.Bar(ctx);
        redraw(chart,values,options);
    }

    const update = async ()=>{
        if(window.google===undefined)return;
        const loader = window.google.charts;
        loader.load("current", { packages: ["bar"] });
        loader.setOnLoadCallback(draw);
    }

    $: redraw(chart,values,options);

    let onResizeEnd;
    const resized = () =>{
        clearTimeout(onResizeEnd);
        onResizeEnd = setTimeout(()=>{
            redraw(chart,values,options);
        },100);
    }

</script>

<svelte:window on:resize={resized}/>

<div {id} />
