<script>
    export let key = "";
    export let value = "";
    let highlighted = false;

</script>

<div class="columns is-multiline py-0">
    <div class="column is-narrow py-0" role="definition" on:mouseenter={() => highlighted=true} on:mouseleave={()=> highlighted=false}>
        <strong>{key}:</strong>
    </div>
    <div class="column is-narrow value py-0">
        <span class="value" class:has-text-weight-bold={highlighted} class:pl-2={highlighted}>{value}</span>
    </div>
</div>

<style>
    .value {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
