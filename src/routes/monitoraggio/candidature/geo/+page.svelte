<script>
    import GeoSelector from "./GeoSelector.svelte";

    let selectedArea = 'ALL';
    let selectedRegion = '';
</script>

<GeoSelector bind:selectedArea bind:selectedRegion  />

