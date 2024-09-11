<script>
	// @ts-nocheck

	import * as Plot from '@observablehq/plot';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	/** @type {Plot.PlotOptions}*/
	export let options;

	export let fixedWidth = false;

	export let width = 400;

	$: hash = JSON.stringify({ ...options, width });

	/** @type {(HTMLElement | SVGElement) & Plot.Plot} */
	let plot;

	function myplot(node) {
		node.removeChild(node.children[0]);
		plot = Plot.plot({ ...options, ...(fixedWidth ? {} : { width }) });
		node.appendChild(plot);
		plot.addEventListener('click', (e) => {
			dispatch('click', { origEvent: e, value: plot.value });
		});
	}
</script>

{#key hash}
	<div bind:clientWidth={width} class="plot">
		<div use:myplot {...$$restProps}><span /></div>
	</div>
{/key}

<style>
	.plot {
		position: relative;
	}
	.plot :global(figure) {
		margin: 0;
	}
	.plot :global(h2) {
		font-size: 22px;
		margin-bottom: 10px;
	}
	.plot :global(h3) {
		font-weight: normal;
		font-size: 14px;
		margin-top: 10px;
	}
	.plot :global(svg) {
		background: transparent !important;
	}
	.plot :global(svg) {
		font-size: 0.7em !important;
	}
</style>
