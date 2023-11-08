<script>
    export let title = "";
    export let quote = "";
    export let author = "";
</script>

<section class="hero is-small is-info is-12">
    <div class="hero-body">
        <p class="title my-0">{title}</p>
        {#if quote&&quote!==''}
        <p class="my-1 mx-5 is-size-6">
            <span class="icon is-size-5">
                <i class="fas fa-quote-left" />
            </span><i class="mx-1">{quote}</i><span class="icon is-size-5">
                <i class="fas fa-quote-right" />
            </span><span class="icon is-small mx-3">
                <i class="fas fa-minus" />
            </span><span>[{author}]</span>
        </p>
        {/if}
    </div>
</section>

<style>
</style>
