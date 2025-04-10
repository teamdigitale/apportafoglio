<script>
	// @ts-nocheck

	import * as d3 from 'd3';
	import { regioni } from './limits_IT_regions.js';
	import { aree_geografiche } from './aree.js';
	let width = 800;
	$: height = width;
	const padding = 0.1;
	$: projection = d3
		.geoMercator()
		.fitSize([width * (1 - padding), height * (1 - padding)], regioni);
	$: path = d3.geoPath(projection);

	export let selectedArea = 'ALL';
	export let selectedRegion = '';

	const toggleArea = (/** @type {string} */ area) => {
		if (selectedArea === area) {
			selectedArea = 'ALL';
			selectedRegion = '';
		} else {
			selectedArea = area;
		}
	};

	const toggleRegion = (/** @type {string} */ region) => {
		if (selectedRegion === region) {
			selectedRegion = '';
		} else {
			selectedRegion = region;
		}
	};

	const toggleAreaRegion = (area, region) => {
		if (selectedArea === 'ALL') {
			toggleArea(area);
		} else {
			if (selectedArea === area) {
				toggleRegion(region);
			} else {
				toggleArea(area);
				toggleRegion('');
			}
		}
	};

	const reset = () => {
		toggleRegion('');
		toggleArea('ALL');
	};
</script>

<div class="row">
	<div class="col-12 col-lg-12">
		<div class="card-wrapper my-0 card-space">
			<div class="card card-bg">
				<div class="card-body text-center" bind:clientWidth={width}>
					{#each aree_geografiche as ag}
						{#if selectedArea === 'ALL' || selectedArea === ag.area}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<div
								class="chip chip-simple {selectedArea === '' || selectedArea === ag.area
									? 'chip-primary'
									: ''}"
								on:click={() => toggleArea(ag.area)}
							>
								<span class="chip-label">{ag.area.replaceAll('_', ' ')}</span>
							</div>
						{/if}
					{/each}
					{#if selectedArea !== 'ALL' && selectedArea !== ''}
						{#each aree_geografiche.filter( (ag) => (selectedArea === '' || selectedArea === 'ALL' ? true : ag.area === selectedArea) )[0].regioni as r}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<div
								class="chip chip-simple {selectedRegion === r ? 'chip-primary' : ''}"
								on:click={() => toggleRegion(r)}
							>
								<span class="chip-label">{r}</span>
							</div>
						{/each}
					{/if}

					<!--
                    <svg {width} {height} xmlns="http://www.w3.org/2000/svg">
                        <rect
                            fill-opacity="0"
                            fill="#ffffff"
                            {width}
                            {height}
                            on:click={() => reset()}
                            class="clickable"
                        />
                        <g>
                            {#each regioni.features as regione}
                                <path
                                    class="clickable"
                                    d={path(regione)}
                                    stroke={selectedArea === "ALL" ||
                                    (selectedArea === regione.properties.area &&
                                        selectedRegion === "") ||
                                    selectedRegion ===
                                        regione.properties.reg_name
                                        ? "#0066cc"
                                        : "#666666"}
                                    fill={selectedArea === "ALL" ||
                                    (selectedArea === regione.properties.area &&
                                        selectedRegion === "") ||
                                    selectedRegion ===
                                        regione.properties.reg_name
                                        ? "#0066cc"
                                        : "#666666"}
                                    fill-opacity="0.5"
                                    stroke-opacity="0.8"
                                    on:click={() =>
                                        toggleAreaRegion(
                                            regione.properties.area,
                                            regione.properties.reg_name,
                                        )}
                                    aria-hidden="true"
                                />
                            {/each}
                        </g>
                    </svg>
                -->
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.chip {
		cursor: pointer;
	}

	.card:after {
		content: '';
		display: none;
	}
</style>
