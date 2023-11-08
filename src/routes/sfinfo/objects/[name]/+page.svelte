<script>
    import Header from "$lib/c/ui/header.svelte";

    export let data;
 
</script>

<Header title="object" quote="" author="" />

<section class="section is-12 px-0">
    <div class="columns is-multiline">
        <div class="column is-full">
            <div class="card">
                <header>
                    <p class="card-header-title has-background-info">
                        {data.name}
                    </p>
                </header>
                <div class="card-content">
                    {#each data.sobject.fields as key}
                        <p class="is-size-5 my-2">
                            <span class="has-text-weight-bold mx-2 is-size-5">{key.name}</span
                            >{#each Object.keys(key) as k}
                                <span class="mx-2  is-size-7">
                                    <b>{k}</b> - 
                                    {key[k]}
                                </span>
                            {/each}
                        </p>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</section>
