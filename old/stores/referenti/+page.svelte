<script>
    //import moment from "moment/min/moment-with-locales";

    import { onDestroy } from 'svelte';
    //moment.locale("it");

    export let data;




    const maxElements = 20;

    let statoReferenteOptions = ["Tutti"].concat(
        Object.values(
            data.referenti.reduce((a, { Stato__c }) => {
                a[Stato__c] = a[Stato__c] || {
                    Stato__c,
                    count: 0,
                };
                a[Stato__c].count++;
                return a;
            }, Object.create(null))
        )
            .map((x) => x.Stato__c)
            .sort()
    );

    let filterStatoReferente = "Attivo";
    let filterNominativo = "";
    let filterEnte = "";

    $: filteredReferentiHidden = data.referenti
        .filter((x) =>
            filterStatoReferente === "Tutti"
                ? true
                : x.Stato__c === filterStatoReferente
        )
        .filter((x) =>
            filterNominativo == ""
                ? true
                : x.Name.toLowerCase().includes(filterNominativo.toLowerCase())
        )
        .filter((x) =>
            filterEnte == ""
                ? true
                : x.nominativoEnte
                      .toLowerCase()
                      .includes(filterEnte.toLowerCase())
        );

    $: filteredReferenti = filteredReferentiHidden.slice(0, maxElements);

</script>

<section class="hero is-small is-info is-12">
    <div class="hero-body">
        <p class="title">Referenti</p>
        <p class="subtitle">
            {#if maxElements < filteredReferentiHidden.length}
                Visualizzati {maxElements} referenti su {filteredReferentiHidden.length};
                agire sui filtri di ricerca per individuare il referente
                desiderato.
            {:else}
                trovati {filteredReferentiHidden.length} referenti.
            {/if}
        </p>
    </div>
</section>
<section class="hero is-small is-primary is-12">
    <div class="hero-body">
        <nav class="level">
            <div class="level-item">
                <p class="subtitle">
                    <span class="icon is-small is-left mx-2">
                        <i class="fas fa-filter" />
                    </span>
                    <span>Filtri</span>
                </p>
            </div>
            <div class="level-item">
                <div class="control">
                    <div class="select is-primary" id="idfiltermisure">
                        <select bind:value={filterStatoReferente}>
                            {#each statoReferenteOptions as item}
                                <option>{item}</option>
                            {/each}
                        </select>
                    </div>
                </div>
            </div>
            <div class="level-item">
                <div class="control">
                    <div class="field">
                        <div class="control has-icons">
                            <input
                                class="input is-primary"
                                type="text"
                                placeholder="nome del referente"
                                bind:value={filterNominativo}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="level-item">
                <div class="control">
                    <div class="field">
                        <div class="control has-icons">
                            <input
                                class="input is-primary"
                                type="text"
                                placeholder="nome dell'ente"
                                bind:value={filterEnte}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</section>
<section class="section is-12">
    <div class="columns is-multiline is-mobile">
        {#each filteredReferenti as referente}
            <div class="column is-full">
                <div
                    class="card bm--card-equal-height has-background-grey-lighter"
                >
                    <header
                        class="card-header {referente.Stato__c !== 'Attivo'
                            ? 'has-background-danger'
                            : 'has-background-info'}"
                    >
                        <p class="card-header-title is-uppercase">
                            {referente.Name}
                        </p>
                    </header>
                    <div class="card-content">
                        <p>
                            <span class="icon is-small is-left mx-2">
                                <i class="fas fa-building" />
                            </span>
                            <span class="has-text-weight-bold">Ente:&nbsp;</span
                            ><span>{referente.nominativoEnte}</span>
                        </p>
                        <p>
                            <span class="icon is-small is-left mx-2">
                                <i class="fas fa-phone" />
                            </span>
                            <span class="has-text-weight-bold"
                                >Telefono:&nbsp;</span
                            ><span
                                class={referente.MobilePhone
                                    ? ""
                                    : "has-text-grey"}
                                >{referente.MobilePhone
                                    ? referente.MobilePhone
                                    : "Non disponibile"}</span
                            >
                        </p>

                        <p>
                            <span class="icon is-small is-left mx-2">
                                <i class="fas fa-envelope" />
                            </span><span class="has-text-weight-bold"
                                >Email:&nbsp;</span
                            ><span
                                class={referente.Email ? "" : "has-text-grey"}
                                >{referente.Email
                                    ? referente.Email
                                    : "Non disponibile"}</span
                            >
                        </p>
                        <p>
                            <span class="icon is-small is-left mx-2">
                                <i class="fas fa-business-time" />
                            </span><span class="has-text-weight-bold"
                                >Data ultima attività:&nbsp;</span
                            ><span
                                class={referente.LastActivityDate
                                    ? ""
                                    : "has-text-grey"}
                                >{referente.LastActivityDate
                                    ? referente.LastActivityDate
                                    : "Non disponibile"}</span
                            >
                        </p>
                    </div>
                    <footer class="card-footer">
                        <p class="card-footer-item is-size-6">
                            <span class="has-text-weight-bold"
                                >Profilo:&nbsp;
                            </span><span
                                class={referente.Profilo__c
                                    ? ""
                                    : "has-text-grey"}
                                >{referente.Profilo__c
                                    ? referente.Profilo__c
                                    : "Non disponibile"}</span
                            >
                        </p>

                        <p class="card-footer-item is-size-6">
                            <span class="has-text-weight-bold"
                                >Stato:&nbsp;</span
                            ><span
                                class={referente.Stato__c === "Revocato"
                                    ? "has-text-weight-bold has-text-danger"
                                    : referente.Stato__c !== "Attivo"
                                    ? "has-text-weight-bold has-text-danger"
                                    : ""}
                            >
                                {referente.Stato__c}
                            </span>
                        </p>
                    </footer>
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
