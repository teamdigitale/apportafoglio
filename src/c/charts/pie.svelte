<script>
    import { onMount } from "svelte";
    export let id = "-";
    export let values = [[]];

    onMount(async () => {
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawBars);
    });

    function drawBars() {
        var data = google.visualization.arrayToDataTable(values);

        var options = {
        
        };

        var chart = new google.visualization.PieChart(
            document.getElementById(id)
        );

        chart.draw(data, options);
        
    }
</script>

<div class="torta is-full" {id} />

<style>
    .torta {
        height: 400px;
    }
</style>
