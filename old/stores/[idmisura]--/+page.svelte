<script>
    import Avvisi from '../../../../c/avvisi.svelte';
    export let data;
</script>

<Avvisi avvisi={data.avvisi} lastUpdated={data.lastUpdated} misure={data.misure} pMisura={data.pMisura}/>
