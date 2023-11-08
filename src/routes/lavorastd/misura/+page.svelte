<script>
    import FaustInfo from "./faust-info.svelte";

    export let data;

    let enti = data.enti;
    let scenario = "";
    /* SCENARI */
    let contrattualizzare = () => {
        if (scenario == "Devono contrattualizzare") {
            scenario = "";
        } else {
            soloconavvisiaperti = false;
            filterBeneficiari = beneficiariOptions[0];

            filterStatoProgetto = statiProgettoOptions[0];
            filterStatoCandidatura = statoCandidaturaOptions[0];

            filterContrattualizzazione = contrattualizzazioneOptions[0];
            scenario = "Devono contrattualizzare";
        }
    };
    let completare = () => {
        if (scenario == "Devono completare il progetto") {
            scenario = "";
        } else {
            soloconavvisiaperti = false;
            filterBeneficiari = beneficiariOptions[0];

            filterStatoProgetto = statiProgettoOptions[0];
            filterStatoCandidatura = statoCandidaturaOptions[0];
            filterContrattualizzazione = "Completata";
            scenario = "Devono completare il progetto";
        }
    };
    let scenari = [
        { nome: "Devono contrattualizzare", funzione: contrattualizzare },
        { nome: "Devono completare il progetto", funzione: completare },
    ];

    /* ******* */

    let regioniOptions = ["Tutte le regioni"].concat(
        Object.values(
            data.candidature.reduce((a, { Regione__c }) => {
                a[Regione__c] = a[Regione__c] || {
                    Regione__c,
                    count: 0,
                };
                a[Regione__c].count++;
                return a;
            }, Object.create(null))
        )
            .map((x) => x.Regione__c)
            .sort()
    );
    let filterRegioni = "Tutte le regioni";

    let statoCandidaturaOptions = ["Tutti gli stati della candidatura"].concat(
        Object.values(
            data.candidature.reduce((a, { outfunds__Status__c }) => {
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
    let filterStatoCandidatura = "FINANZIATA";

    let statiProgettoOptions = ["Tutti gli stati del progetto"].concat(
        Object.values(
            data.candidature.reduce((a, { Stato_Progetto__c }) => {
                a[Stato_Progetto__c] = a[Stato_Progetto__c] || {
                    Stato_Progetto__c,
                    count: 0,
                };
                a[Stato_Progetto__c].count++;
                return a;
            }, Object.create(null))
        )
            .map((x) => (x.Stato_Progetto__c ? x.Stato_Progetto__c : "n.a."))
            .sort()
    );
    let filterStatoProgetto = "Tutti gli stati del progetto";

    let soloconavvisiaperti = false;
    let mops = calcolaMisureOptions();
    let misureOptions = mops;
    let filterMisure = mops[0]; // soloconavvisiaperti?'Tutte le misure':mops[0];

    function refreshFilters() {
        mops = calcolaMisureOptions();
        misureOptions = mops;
        filterMisure = mops[0]; // soloconavvisiaperti?'Tutte le misure':mops[0];
    }

    function calcolaMisureOptions() {
        let r = Object.values(
            data.misure
                .filter((m) =>
                    soloconavvisiaperti
                        ? m.avvisiAperti && m.avvisiAperti.length > 0
                        : true
                )
                .reduce((a, { Name }) => {
                    a[Name] = a[Name] || {
                        Name,
                        count: 0,
                    };
                    a[Name].count++;
                    return a;
                }, Object.create(null))
        )
            .map((x) => x.Name)
            .sort();

        //if (!soloconavvisiaperti) {
        r = ["Tutte le misure"].concat(r);
        //}

        return r;
    }

    let contrattualizzazioneOptions = ["Contrattualizzazione"].concat(
        Object.values(
            data.candidature.reduce((a, { Stato_contrattualizzazione__c }) => {
                a[Stato_contrattualizzazione__c] = a[
                    Stato_contrattualizzazione__c
                ] || {
                    Stato_contrattualizzazione__c,
                    count: 0,
                };
                a[Stato_contrattualizzazione__c].count++;
                return a;
            }, Object.create(null))
        )
            .map((x) => x.Stato_contrattualizzazione__c)
            .sort()
    );
    let filterContrattualizzazione = "Contrattualizzazione";

    $: beneficiariOptions = ["Tutti i beneficiari"].concat(
        calcolaBeneficiari()
            .filter((item, index, arr) => arr.indexOf(item) === index)
            .sort()
    );
    let filterBeneficiari = "Tutti i beneficiari";

    function calcolaBeneficiari() {
        let res = [];
        for (let z = 0; z < data.avvisi.length; z++) {
            res = res.concat(data.avvisi[z].beneficiari);
        }
        return res;
    }

    $: filteredCandidature = data.candidature
        .filter((x) =>
            filterMisure === "Tutte le misure"
                ? misureOptions.indexOf(x.Misura__c) > -1
                : x.Misura__c === filterMisure
        )
        .filter((x) =>
            filterRegioni === "Tutte le regioni"
                ? true
                : x.Regione__c === filterRegioni
        )
        .filter((x) =>
            filterStatoCandidatura === "Tutti gli stati della candidatura"
                ? true
                : x.outfunds__Status__c === filterStatoCandidatura
        )
        .filter((x) =>
            filterStatoProgetto === "n.a."
                ? !x.Stato_Progetto__c
                : filterStatoProgetto === "Tutti gli stati del progetto"
                ? true
                : x.Stato_Progetto__c === filterStatoProgetto
        )
        .filter((x) =>
            filterContrattualizzazione === "Contrattualizzazione"
                ? true
                : x.Stato_contrattualizzazione__c === filterContrattualizzazione
        )
        .filter((x) =>
            filterBeneficiari === "Tutti i beneficiari"
                ? true
                : data.enti.filter(
                      (e) => e.Id === x.outfunds__Applying_Organization__c
                  )[0].Tipologia_Ente__c === filterBeneficiari
        );
</script>

<section class="hero is-small is-info is-12">
    <div class="hero-body">
        <nav class="level">
            <!-- Left side -->
            <div class="level-left">
                <div class="level-item">
                    <div>
                        <p class="title my-0">Lavora dall'alto (per Misura)</p>
                        <p class="my-1 mx-5 is-size-6">
                            <i
                                >"Più alto vola il gabbiano, e più vede
                                lontano."</i
                            >&nbsp;&nbsp;[Richard Bach]
                        </p>
                    </div>
                </div>
            </div>
            {#if scenario === ""}
                <div class="level-right">
                    <div class="level-item">
                        <p class="is-size-4 has-text-weight-bold mx-3">
                            visualizzati {filteredCandidature.length} su {data
                                .candidature.length}
                        </p>
                    </div>
                </div>
            {/if}
        </nav>
    </div>
</section>

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

                {#each scenari as s}
                    <div class="level-item">
                        <div class="field has-addons">
                            <p class="control">
                                <button
                                    class="button is-danger is-outlined {s.nome ===
                                    scenario
                                        ? 'is-hovered'
                                        : ''}"
                                    on:click={s.funzione}
                                >
                                    <span>{s.nome}</span>
                                </button>
                            </p>
                        </div>
                    </div>
                {/each}
            </div>
        </nav>
    </div>
</section>

{#if scenario == ""}
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

                    <div class="level-item has-text-centered">
                        <div>
                            <div class="field">
                                <input
                                    id="switchSoloAperti"
                                    type="checkbox"
                                    name="switchSoloAperti"
                                    class="switch"
                                    bind:checked={soloconavvisiaperti}
                                    on:change={refreshFilters}
                                />
                                <label for="switchSoloAperti"
                                    >Solo con avvisi aperti</label
                                >
                            </div>
                        </div>
                    </div>

                    <div class="level-item">
                        <div class="control">
                            <div class="select is-primary">
                                <select bind:value={filterMisure}>
                                    {#each misureOptions as item}
                                        <option>{item}</option>
                                    {/each}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="level-item">
                        <div class="control">
                            <div
                                class="select is-primary"
                                id="idfilterpacchetto"
                            >
                                <select bind:value={filterBeneficiari}>
                                    {#each beneficiariOptions as item}
                                        <option>{item}</option>
                                    {/each}
                                </select>
                            </div>
                        </div>
                    </div>

                    <!--
                <div class="level-item">
                    <div class="control">
                        <div class="select is-primary">
                            <select bind:value={filterRegioni}>
                                {#each regioniOptions as item}
                                    <option>{item}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>
                -->
                    <div class="level-item">
                        <div class="control">
                            <div class="select is-primary">
                                <select bind:value={filterStatoCandidatura}>
                                    {#each statoCandidaturaOptions as item}
                                        <option>{item}</option>
                                    {/each}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="level-item">
                        <div class="control">
                            <div class="select is-primary">
                                <select bind:value={filterStatoProgetto}>
                                    {#each statiProgettoOptions as item}
                                        <option>{item}</option>
                                    {/each}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="level-item">
                        <div class="control">
                            <div class="select is-primary">
                                <select bind:value={filterContrattualizzazione}>
                                    {#each contrattualizzazioneOptions as item}
                                        <option>{item}</option>
                                    {/each}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </section>

    <nav class="level my-4">
        <div class="columns">
            <div class="column is-12 has-text-centered">
                <div>
                    <p class="heading">Candidature</p>
                    <p class="title">{filteredCandidature.length}</p>
                </div>
            </div>
            <div class="column is-12 has-text-centered">
                <div>
                    <p class="heading">Valore</p>
                    <p class="title">
                        {Intl.NumberFormat("it-IT", {
                            style: "currency",
                            currency: "EUR",
                        }).format(
                            filteredCandidature.reduce(
                                (sum, c) => sum + c.outfunds__Awarded_Amount__c,
                                0
                            )
                        )}
                    </p>
                </div>
            </div>
        </div>
    </nav>

    <section class="section is-12 p-2">
        <table class="table is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>Misura</th>
                    <th>Regione</th>
                    <th>Ente</th>
                    <th>CUP</th>
                    <th>Valore</th>
                    <th>Stato candidatura</th>
                    <th>Stato progetto</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each filteredCandidature as c}
                    <tr>
                        <td>{c.Codice_CUP__c}</td>
                        <td>{c.Misura__c}</td>
                        <td>{c.Regione__c}</td>
                        <td
                            >{enti.filter(
                                (x) =>
                                    x.Id ===
                                    c.outfunds__Applying_Organization__c
                            )[0].Name}</td
                        >
                        <td
                            >{Intl.NumberFormat("it-IT", {
                                style: "currency",
                                currency: "EUR",
                            }).format(c.outfunds__Awarded_Amount__c)}</td
                        >
                        <td>{c.outfunds__Status__c}</td>
                        <td>{c.Stato_Progetto__c}</td>
                        <td><a href="/candidatura/{c.Id}" target="_blank"><span class="icon"><i class="fas fa-glasses">&nbsp</i></span></a></td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </section>
{:else}
    <FaustInfo enti={data.enti} {scenario} candidature={filteredCandidature} />
{/if}

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
