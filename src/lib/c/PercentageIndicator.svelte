<script>
    import * as d3 from "d3";
    export let value = 0;
    let size = 100;
    let padding = size * 0.1;

    let x = Math.cos((2 * Math.PI * value) / 100);
    let y = Math.sin((2 * Math.PI * value) / 100);

    const colorScale = d3
        .scaleLinear()
        .domain([0, 1])
        .range(["#cc334d", "#008055"]);
</script>

<div class="text-center percindicator mx-4 my-4" bind:clientWidth={size}>
    <svg
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-1.2 -1.2 2.4 2.4"
        
    >
    <g style="transform: rotate(-0.25turn); scale({size})">
        <circle cx="0" cy="0" r="1" style="stroke-width: {0 / size}; stroke: {colorScale(value/100)}; fill: {colorScale(value/100)}; fill-opacity: 0.25;"/>
    </g>
        <g style="transform: rotate(-0.25turn); scale({size})">
            <path
                d="M {Math.cos((2 * Math.PI * 0) / 100)} {Math.sin(
                    (2 * Math.PI * 0) / 100,
                )} A 1 1 0 {value / 100 > 0.5 ? 1 : 0} 1 {x} {y} L 0 0 Z"
                class="{value/100<0.5?'fillslice':''}"
                style="stroke-width: {5 / size}; stroke: {colorScale(value/100)}; fill: {colorScale(value/100)}; fill-opacity: 0.75;"
                
            />
        </g>
    </svg>
</div>

<style>



@keyframes pulsered {
	0% {
		opacity: 0.8;
		transform: scale(0.8);
	}

	50% {
		opacity: 1;
		transform: scale(1.0);
	}

    100% {
		opacity: 0.8;
		transform: scale(0.8);
	}

}

.fillslice {
    animation: pulsered 2s ease-in-out infinite;
}

</style>

