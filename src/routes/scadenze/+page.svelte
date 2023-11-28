<script>
    // @ts-nocheck
    import { fade } from "svelte/transition";
    import Filters from "$lib/c/ui/Filters.svelte";
    import Header from "$lib/c/ui/header.svelte";
    import Scadenze from "./scadenze.svelte";
    import Richiestavariazione from "./richiestavariazione.svelte";
    export let data;
    let mostraContr = true;
    let mostraCompl = true;

    let scenarioBohr = "";

    const setScenario = (s) => {
        if (s === scenarioBohr) {
            scenarioBohr = "";
        } else {
            scenarioBohr = s;
        }
    };

</script>

<Header
    title="scadenze"
    quote="Le scadenze sono positive. Ti aiutano a organizzare il tuo tempo. Ti aiutano a fissare delle priorità. Ti fanno fare le cose anche quando non ne hai voglia."
    author="Harvey Mackay"
/>

<Filters>
    <div class="level-item">
        <div class="control">
            <div class="field">
                <input
                    id="switchContr"
                    type="checkbox"
                    name="switchContr"
                    class="switch is-info"
                    bind:checked={mostraContr}
                />
                <label for="switchContr">Mostra contrattualizzazioni</label>
            </div>
        </div>
    </div>
    <div class="level-item">
        <div class="control">
            <div class="field">
                <input
                    id="switchCompl"
                    type="checkbox"
                    name="switchCompl"
                    class="switch is-info"
                    bind:checked={mostraCompl}
                />
                <label for="switchCompl">Mostra completamenti</label>
            </div>
        </div>
    </div>
</Filters>

{#if data.scadenze.filter(s => {return (s.rv.length>0 && Number(s.rv[0].Giorni_richiesti__c) >= 90)}).length>0}

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
                                >Bohr consiglia</span
                            >
                        </p>
                    </div>
                </div>

                <div class="level-item">
                    <div class="field has-addons">
                        <p class="control">
                            {#if scenarioBohr === "proroghe90"}
                                <button
                                    class="button is-danger is-outlined is-link"
                                    on:click={() => setScenario("proroghe90")}
                                    class:has-background-green={scenarioBohr ===
                                        "proroghe90"}
                                >
                                    <span>Ho visto, grazie</span>
                                </button>
                            {:else}
                                <button
                                    class="button is-danger is-outlined is-link"
                                    on:click={() => setScenario("proroghe90")}
                                    class:has-background-green={scenarioBohr ===
                                        "proroghe90"}
                                >
                                    <span
                                        >Richieste di proroga in corso maggiori
                                        di 90 giorni</span
                                    >
                                </button>
                            {/if}
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</section>
{/if}

{#if scenarioBohr === ""}
    <section class="section is-12 px-0 py-1" transition:fade>
        <div class="hero-body py-0">
            <div class="columns">
                <div class="column has-text-centered">
                    <Scadenze 
                        records={data.scadenze.filter(
                            (f) =>
                                (mostraContr
                                    ? f.RecordType.Name ===
                                      "Contrattualizzazione Fornitore"
                                    : false) ||
                                (mostraCompl
                                    ? f.RecordType.Name ===
                                      "Completamento Attività"
                                    : false),
                        )}
                    ></Scadenze>
                </div>
            </div>
        </div>
    </section>
{/if}
{#if scenarioBohr === "proroghe90"}
    <section class="section is-12 px-0 py-1" transition:fade>
        <div class="hero-body py-1">
            <div class="columns is-multiline">
                {#each data.scadenze.filter(s => {return (s.rv.length>0 && Number(s.rv[0].Giorni_richiesti__c) >= 90)}) as s}
                    <div class="column is-half has-text-left">
                        <Richiestavariazione scadenza={s} idu={data.idusf}></Richiestavariazione>
                    </div>
                {/each}
            </div>
        </div>
    </section>
{/if}
