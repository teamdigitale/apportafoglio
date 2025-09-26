<script>
	// @ts-nocheck

	import * as Plot from '@observablehq/plot';
	import * as d3 from 'd3';
	import ObservablePlot from '$lib/c/observable/ObservablePlot.svelte';
	import { formatNumber, percentuale } from '$lib/js/shared.js';

	/**
	 * @type {string | string[]}
	 */
	export let values = [];
	export let colors = [];
	export let title = '';
</script>

<div class="callout">
	<ObservablePlot
		options={{
			title,
			x: {
				percent: false,
				tickFormat: formatNumber
			},
			marks: [
				Plot.barX(
					values,
					Plot.stackX({
						x: (d) => d[1],
						fillOpacity: 0.5,
						stroke: (d) => colors.find((x) => x[0] === d[0])[1],
						strokeOpacity: 1,
						strokeWidth: 0.2,
						inset: 1,
						fill: (d) => colors.find((x) => x[0] === d[0])[1]
					})
				)
			]
		}}
	/>
	<div class="link-list-wrapper">
		<ul class="link-list avatar-group">
			{#each values as v}
				<li>
					<div class="list-item">
						<div class="avatar avatar-red size-sm complementary-3-bg" style="background-color: {colors.find((x) => x[0] === v[0])[1]} !important;">
							<p aria-hidden="true"></p>
						</div>
						<small><b>{v[0]}:</b> {formatNumber(v[1])} ({percentuale(v[1] / d3.sum(values, (d) => d[1]))})</small>
					</div>
				</li>
			{/each}
		</ul>
	</div>

</div>
