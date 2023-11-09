<script>
    import Header from "$lib/c/ui/header.svelte";

    export let data;
</script>

<Header
    title="Bohr consiglia"
    quote="La vera domanda è: quando redigeremo una carta dei diritti sull'intelligenza artificiale? In cosa consisterà? E chi potrà deciderlo?"
    author="Gray Scott"
/>

<section class="hero is-small is-warning is-12">
    <div class="hero-body m-1 p-1">
        <nav class="level">
            <!-- Left side -->
            <div class="level-left">
                <div class="level-item">
                    <div>
                        <p
                            class="is-size-6 has-text-weight-bold has-text-danger"
                        >
                            <span class="icon is-small">
                                <i class="fas fa-user-graduate" />
                            </span>

                            <span class="is-size-6 mx-0 px-0"
                                >Bohr consiglia:</span
                            >
                        </p>
                    </div>
                </div>

                {#each data.scenari as s}
                    <div class="level-item">
                        <div class="field has-addons">
                            <p class="control">
                                <a class="has-text-danger" href={s.url}>{s.nome}</a>
                            </p>
                        </div>
                    </div>
                {/each}
            </div>
        </nav>
    </div>
</section>

<slot />
