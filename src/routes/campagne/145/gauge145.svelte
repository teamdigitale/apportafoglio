<script>
    import { onMount } from 'svelte';
    export let pvalue = 0;
    export let label = "%";
    export let title = "";
    export let maxvalue =0;
    export let value =0;
    export let maxvalueLabel = '';
    export let valueLabel = '';

    onMount(async () => {
        google.charts.load("current", { packages: ["gauge"] });
        google.charts.setOnLoadCallback(drawChart);
	});


    function drawChart() {
        var formatter = new google.visualization.NumberFormat({
            suffix: "%",
            pattern: "#",
        });

        var data = google.visualization.arrayToDataTable([
            ["Label", "Value"],
            [label, pvalue],
        ]);

        var options = {
            redFrom: 0,
            redTo: 33,
            yellowFrom: 33,
            yellowTo: 90,
            greenFrom: 90,
            greenTo: 100,
            minorTicks: 2,
            max: 100,
            animation: { easing: "out" },
            majorTicks: ['0','25','50','75','100']
        };

        var chart = new google.visualization.Gauge(
            document.getElementById('chart'+title)
        );
        formatter.format(data, 1);
        chart.draw(data, options);
    }
</script>

<div class="card bm--card-equal-height has-background-grey-lighter m-2">
    <header class="has-background-info">
        <p class="card-header-title">
            {title}
        </p>
    </header>
    <div class="card-content">
        <div class="media">
          <div class="media-left">
            <div id={'chart'+title} />
          </div>
          <div class="media-content">
            <p class="subtitle is-6">{valueLabel}</p>
            <p class="title is-4">{value}</p>
            <p class="subtitle is-6">{maxvalueLabel}</p>
            <p class="title is-4">{maxvalue}</p>
            <slot name="moreinfo" />
          </div>
        </div>

      </div>
    <div class="card-content">
        
    </div>
</div>

<style>
    .bm--card-equal-height {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .bm--card-equal-height .card-footer {
        margin-top: auto;
    }
</style>