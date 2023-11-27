<script>
    let showFilters = false;
    const toggleShowFilters = () => {
        showFilters = !showFilters;
    };
</script>

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
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    {#if showFilters}
                        <span
                            class="icon is-small is-left mx-3 is-clickable"
                            on:click={toggleShowFilters}
                        >
                            <i class="fas fa-minus-circle" />
                        </span>
                    {:else}
                        <span
                            class="icon is-small is-left mx-3 is-clickable"
                            on:click={toggleShowFilters}
                        >
                            <i class="fas fa-plus-circle" />
                        </span>
                    {/if}
                </div>
                {#if showFilters}
                    <slot />
                {/if}
            </div>
        </nav>
    </div>
</section>

