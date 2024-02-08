<script>
	// @ts-nocheck

	import { makeFriendly, nFormatter, percentuale } from '$lib/js/shared';

	// @ts-nocheck

	export let baseColor = 'black';
	const minTransparency = 0.2;
	export let labels = [];
	export let values = [];
	export let d;
	export let height = 600;
	export let id;
	export let startline;
	export let endline;
	export let gendre;
	export let popolazione = 0;

	$: calcolaPercentages = () => {
		let tot = values.reduce(function (a, b) {
			return a + b;
		});
		const res = [];
		let sum = values[0] / tot;
		res.push(sum);
		values.forEach((v, index) => {
			if (index < values.length - 2) {
				sum = sum + v / tot;
				res.push(sum);
			}
		});
		res.push(1);
		return res;
	};

	$: percentages = calcolaPercentages();

	$: calcolaOpacities = () => {
		const res = [];
		const fraction = (0.9 - minTransparency) / percentages.length;
		let p = Number(minTransparency);
		for (let z = 1; z < percentages.length; z++) {
			res.push(p);
			p = p + fraction;
		}
		res.push(0.9);
		return res;
	};

	$: opacities = calcolaOpacities();

	$: calcolaLines = () => {
		const padding = 10;
		const res = [];

		let previous = 0;
		values.forEach((e, i) => {
			i === 0 ? 0 : (previous = percentages[i - 1]);
			res.push({
				x1: startline,
				y1: percentages[i] * (height - 2 * padding) - ((percentages[i] - previous) * height) / 2,
				x2: endline,
				y2: percentages[i] * (height - 2 * padding) - ((percentages[i] - previous) * height) / 2
			});
		});

		return res;
	};

	$: lines = calcolaLines();
</script>

<defs>
	<linearGradient id={'fillgradient' + id} x1="0" x2="0" y1="0" y2="1">
		<stop offset="0%" stop-color={baseColor} stop-opacity={minTransparency} />
		<stop offset="0" stop-color={baseColor} stop-opacity={minTransparency} />
		{#each percentages as p, index}
			<stop
				offset={percentuale(p).replaceAll(',', '.')}
				stop-color={baseColor}
				stop-opacity={opacities[index]}
			/>
			{#if index < percentages.length - 1}
				<stop
					offset={percentuale(p).replaceAll(',', '.')}
					stop-color={baseColor}
					stop-opacity={opacities[index + 1]}
				/>
			{/if}
		{/each}
		<stop offset="100%" stop-color={baseColor} stop-opacity="0.9" />
	</linearGradient>
</defs>

<g>
	{#each lines as l, i}
		{#if gendre === 'w'}
			<line stroke={baseColor} class="legend" x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
			<text class="theader" x={l.x1} y={l.y1}><tspan x={l.x1} y={l.y1 - 5}>{labels[i]}</tspan></text
			>
		{:else}
			<line stroke={baseColor} class="legend" x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
			<text class="theader" x={l.x2 - 100} y={l.y1}
				><tspan x={l.x2 - 120} y={l.y1 - 5}>{labels[i]}</tspan></text
			>
		{/if}
	{/each}
</g>

<g style="display:inline" id="g-people-item" fill="url(#{'fillgradient' + id})">
	<path class="figurepath" {d} />
</g>

<g>
{popolazione}
	{#if gendre === 'w'}
		<text class="population" x={180} y={height / 2 - 15}>{makeFriendly(popolazione)}</text>
    {:else}
        <text class="population" x={390} y={height / 2 - 15}>{makeFriendly(popolazione)}</text>
	{/if}
</g>

<style>
	.figurepath {
		stroke-opacity: 1;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 1px;
		stroke: black;
	}

	.theader {
		font-size: 1rem;
		font-family: 'Titillium Web';
		fill: #000000;
		fill-opacity: 1;
		stroke: none;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.population {
		font-size: 30px;
		font-family: 'Titillium Web';
		fill: #000000;
		fill-opacity: 1;
		stroke: none;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.legend {
		stroke-width: 1px;
		stroke-opacity: 1;
		stroke-dasharray: 5, 5;
	}
</style>
