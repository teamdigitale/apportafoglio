<script>
    // @ts-nocheck

    import * as d3 from "d3";
    import { regioni } from "./limits_IT_regions.js";
    import { aree_geografiche } from "./aree.js";
    let width = 300;
    $: height = width;
    const padding = 0.1;
    $: projection = d3
        .geoMercator()
        .fitSize([width * (1 - padding), height * (1 - padding)], regioni);
    $: path = d3.geoPath(projection);

    export let selectedArea = "ALL";
    export let selectedRegion = "";

</script>

<div class="row">
    <div class="col-12 col-lg-12">
        <div class="card-wrapper my-0 card-space">
            <div class="card card-bg">
                <div class="card-body text-center" bind:clientWidth={width}>
                    
                    <svg {width} {height} xmlns="http://www.w3.org/2000/svg">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <rect
                            fill-opacity="0"
                            fill="#ffffff"
                            {width}
                            {height}
                        />
                        <g>
                            {#each regioni.features as regione}
                                <path
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
                                    
                                    aria-hidden="true"
                                />
                            {/each}
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .card:after {
    content: "";
    display: none;
}
</style>
