<script>
    import MediaQuery from "$lib/c/ui/MediaQuery.svelte";
    export let title = "";
    export let quote = "";
    export let author = "";
</script>

<section class="hero is-small is-info is-12">
    <div class="hero-body py-0">
        <MediaQuery query="(max-width: 768px)" let:matches>
            <p
                class="has-text-centered is-size-{matches
                    ? '3'
                    : '2'} my-0 py-0 has-text-weight-bold"
            >
                {title}
            </p>
            {#if quote && quote !== ""}
                <p>
                    <i class="mx-1 is-size-{matches ? '6' : '5'}">"{quote}"</i
                    ><span class="mx-1"> - </span><span
                        class="mx-1 is-size-{matches ? '7' : '6'}"
                        >[{author}]</span
                    >
                </p>
            {/if}
        </MediaQuery>
    </div>
</section>
