<script>
    import Header from "$lib/c/ui/header.svelte";

    export let data;
    let nameFilter = "";

    $: filteredData = data.sobjects.sobjects.filter((o) =>
        nameFilter === "" ? true : o.name.includes(nameFilter)
    );
</script>

<Header title="objects" quote="" author="" />

<!--
<a href="/sfinfo/objects">objects</a>
-->

<section class="hero is-small is-primary is-12">
    <div class="hero-body m-1 p-1">
        <nav class="level">
            <!-- Left side -->
            <div class="level-left">
                <div class="level-item">
                    <span class="icon is-small is-left">
                        <i class="fas fa-filter" />
                    </span>
                    <span>filtri</span>
                    <span class="icon is-small is-left mx-3">
                        <i class="fas fa-arrow-right" />
                    </span>
                </div>
                <div class="level-item">
                    <div class="field">
                        <div class="control has-icons-left">
                            <input
                                class="input is-primary"
                                type="text"
                                placeholder="name"
                                bind:value={nameFilter}
                            />
                            <div class="icon is-small is-left">
                                <i class="fas fa-list" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</section>

<section class="section is-12 px-0">
    <div class="columns is-multiline">
        {#each filteredData as item}
            <div class="column is-one-quarter">
                <div class="card">
                    <header>
                        <p class="card-header-title has-background-info">
                            <span>{item.name}</span>
                            <span class="mx-3"><a class="has-text-primary" href="/sfinfo/objects/{item.name}">view</a></span>
                        </p>
                    </header>
                    <div class="card-content">
                        {#each Object.keys(item) as key}
                            <p class="is-size-7">
                                <span class="has-text-weight-bold mx-2"
                                    >{key}</span
                                ><span>{item[key]}</span>
                            </p>
                        {/each}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</section>
