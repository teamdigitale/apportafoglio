<script>
    import Header from '$lib/c/ui/header.svelte';
    import Misuracard from '$lib/c/ui/misuracard.svelte';

    export let data;

</script>


<Header title="misure" quote="Chi non ha in sé la misura non la troverà mai." author="Henri Frédéric Amiel" />

<section class="section is-12 px-0">
    <div class="columns is-multiline">
        {#each data.misure as misura}
            <div class="column is-half">
                <Misuracard misura={misura}/>
            </div>
        {/each}
    </div>
</section>
