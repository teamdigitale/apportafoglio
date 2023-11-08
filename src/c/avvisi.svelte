<script>
    export let avvisi;
    export let misure;
    export let lastUpdated;
    export let pMisura;
    import moment from "moment/min/moment-with-locales";
    moment.locale("it");
    import { circInOut } from "svelte/easing";
    import { crossfade, fade } from "svelte/transition";

    const [send, receive] = crossfade({
        fallback(node, params) {
            const style = getComputedStyle(node);
            const transform = style.transform === "none" ? "" : style.transform;

            return {
                duration: 300,
                easing: circInOut,
                css: (t) => `
					opacity: ${t}
				`,
            };
        },
    });

    let statoAvvisoOptions = ["Tutti gli stati"].concat(
        Object.values(
            avvisi.reduce((a, { outfunds__Status__c }) => {
                a[outfunds__Status__c] = a[outfunds__Status__c] || {
                    outfunds__Status__c,
                    count: 0,
                };
                a[outfunds__Status__c].count++;
                return a;
            }, Object.create(null))
        )
            .map((x) => x.outfunds__Status__c)
            .sort()
    );
    let filterStatoAvviso = "Tutti gli stati";

    let misuraOptions = misure.map((el) => {
        return {
            idmisura: el.Id,
            misura: el.Name
        };
    });

    let filterMisura = "Tutte le misure";

    let pacchettoOptions = ["Tutti i pacchetti"].concat(
        Object.values(
            avvisi.reduce((a, { Pacchetto__c }) => {
                a[Pacchetto__c] = a[Pacchetto__c] || {
                    Pacchetto__c,
                    count: 0,
                };
                a[Pacchetto__c].count++;
                return a;
            }, Object.create(null))
        )
            .map((x) => x.Pacchetto__c)
            .filter((v) => (v ? true : false))
            .sort()
    );
    let filterPacchetto = "Tutti i pacchetti";

    $: filteredAvvisi = avvisi
        .filter((x) =>
            filterStatoAvviso == "Tutti gli stati"
                ? true
                : x.outfunds__Status__c === filterStatoAvviso
        )
        .filter((x) =>
            filterMisura == "Tutte le misure"
                ? true
                : x.outfunds__Parent_Funding_Program__c === filterMisura
        )
        .filter((x) =>
            filterMisura.startsWith("1.4.3") ||
            filterMisura === "Tutte le misure"
                ? filterPacchetto == "Tutti i pacchetti"
                    ? true
                    : x.Pacchetto__c === filterPacchetto
                : true
        );
</script>

<section class="hero is-small is-info is-12">
    <div class="hero-body">
        <p class="title my-0">Avvisi</p>
        <p class="my-1 mx-5 is-size-6">
            <i>"Ente avvisato, mezzo salvato"</i>&nbsp;&nbsp;[Anonimo]
        </p>
    </div>
</section>

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
                    <div class="control">
                        <div class="select is-primary" id="idfilterstatoavviso">
                            <select bind:value={filterStatoAvviso}>
                                {#each statoAvvisoOptions as item}
                                    <option>{item}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>

                <div class="level-item">
                    <div class="control">
                        <div class="select is-primary" id="idfiltermisura">
                            <select bind:value={filterMisura}>
                                {#each misuraOptions as item}
                                    <option
                                        value={item.idmisura}
                                        >{item.misura}</option
                                    >
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>
                {#if filterMisura.startsWith("1.4.3") || filterMisura === "Tutte le misure"}
                    <div class="level-item">
                        <div class="control">
                            <div
                                class="select is-primary"
                                id="idfilterpacchetto"
                            >
                                <select bind:value={filterPacchetto}>
                                    {#each pacchettoOptions as item}
                                        <option>{item}</option>
                                    {/each}
                                </select>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        </nav>
    </div>
</section>

<section class="section is-12 px-0">
    <div class="columns is-multiline">
        {#each filteredAvvisi as avviso}
            <div
                class="column is-half"
                id={avviso.Id}
                in:send={{ key: avviso.Id }}
                out:receive={{ key: avviso.Id }}
            >
                <div
                    class="card bm--card-equal-height has-background-grey-lighter"
                >
                    <header
                        class={avviso.outfunds__Status__c === "PUBBLICATO"
                            ? "has-background-info"
                            : "has-background-danger"}
                    >
                        <p class="card-header-title">
                            {avviso.Name}
                        </p>
                    </header>
                    <div class="card-content">
                        <p>
                            <span class="has-text-weight-bold mx-2">Stato:</span
                            ><span
                                class="{avviso.outfunds__Status__c ===
                                'PUBBLICATO'
                                    ? 'has-text-info'
                                    : 'has-text-danger'} has-text-weight-bold"
                                >{avviso.outfunds__Status__c}</span
                            >
                        </p>
                        {#if avviso.Pacchetto__c}
                            <p>
                                <span class="has-text-weight-bold mx-2"
                                    >Pacchetto:</span
                                ><span>{avviso.Pacchetto__c}</span>
                            </p>
                        {/if}
                        <p>
                            <span class="has-text-weight-bold mx-2"
                                >Data termine:</span
                            ><span
                                >{moment(avviso.outfunds__End_Date__c).format(
                                    "DD/MM/YYYY"
                                )}</span
                            >
                            {#if avviso.outfunds__Status__c === "PUBBLICATO"}
                                <span
                                    class="has-text-weight-bold has-text-danger"
                                    >({moment(avviso.outfunds__End_Date__c)
                                        .endOf("day")
                                        .fromNow()})</span
                                >
                            {/if}
                        </p>
                        <p>
                            <span class="has-text-weight-bold mx-2"
                                >Data avvio:</span
                            ><span
                                >{moment(avviso.outfunds__Start_Date__c).format(
                                    "DD/MM/YYYY"
                                )}</span
                            >
                        </p>
                        <p>
                            <span class="has-text-weight-bold mx-2"
                                >Valore:</span
                            ><span
                                >{Intl.NumberFormat("it-IT", {
                                    style: "currency",
                                    currency: "EUR",
                                }).format(
                                    avviso.outfunds__Total_Program_Amount__c
                                )}</span
                            >
                        </p>
                        <p>
                            <span class="has-text-weight-bold mx-2"
                                >Fondi disponibili:</span
                            ><span
                                >{Intl.NumberFormat("it-IT", {
                                    style: "currency",
                                    currency: "EUR",
                                }).format(avviso.Fondi_disponibili__c)}</span
                            >
                        </p>

                        <p>
                            <span class="has-text-weight-bold mx-2"
                                >Oggetto:</span
                            ><span>{avviso.Oggetto_Avviso__c}</span>
                        </p>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</section>

<style>
    .bm--card-equal-height {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .bm--card-equal-height .card-footer {
        margin-top: auto;
    }
</style>
