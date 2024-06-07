<script>
    import GeoViewer from "./GeoViewer.svelte";

    let selectedArea = 'ALL';
    let selectedRegion = '';
</script>

<GeoViewer bind:selectedArea bind:selectedRegion  />

