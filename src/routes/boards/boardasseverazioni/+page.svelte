<script>
    import Header from "$lib/c/ui/header.svelte";
    import Assinforiepilogo from "./assinforiepilogo.svelte";

    export let data;

    let sortedData = data.data
        .filter((d) => d.tecnici.length > 0 || d.formali.length > 0)
        .sort((a, b) =>
            a.misura > b.misura
                ? 1
                : b.misura > a.misura
                  ? -1
                  : a.tipologiaente > b.tipologiaente
                    ? 1
                    : b.tipologiaente > a.tipologiaente
                      ? -1
                      : 0,
        );

    let misure = Object.values(
        sortedData.reduce((a, { misura }) => {
            a[misura] = a[misura] || {
                misura,
                count: 0,
            };
            a[misura].count++;
            return a;
        }, Object.create(null)),
    )
        .map((x) => x.misura)
        .sort();
</script>

<Header title="Overview task asseverazione" quote="Gestire la qualità è importante perché niente è più così semplice, se davvero lo è mai stato." author="Philip B. Crosby" />

<section class="section is-12 px-0">
    <div class="columns is-multiline">
        {#each misure as m}
            <div class="column is-half">
                <div
                    class="card bm--card-equal-height has-background-grey-lighter"
                >
                    <header class="card-header has-background-info">
                        <p class="card-header-title">
                            {m}
                        </p>
                    </header>
                    <div class="card-content">
                        {#each sortedData.filter((sd) => sd.misura === m) as t}
                            {#if t.tecnici.length > 0 || t.formali.length > 0}
                                <Assinforiepilogo {t} />
                            {/if}
                        {/each}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</section>

<style>
</style>
