<script>
    export let data;
    import Entecard from "../../../c/entecard.svelte";
    import moment from "moment/min/moment-with-locales";
    moment.locale("it");

    const max = 500;

    let soloattivi = true;

    let tipologiaEnteOptions = ["Tutte le tipologie"].concat(
        Object.values(
            data.enti.reduce((a, { Tipologia_Ente__c }) => {
                a[Tipologia_Ente__c] = a[Tipologia_Ente__c] || {
                    Tipologia_Ente__c,
                    count: 0,
                };
                a[Tipologia_Ente__c].count++;
                return a;
            }, Object.create(null))
        )
            .map((x) => x.Tipologia_Ente__c)
            .sort()
    );
    let filterTipologiaEnte = "Tutte le tipologie";

    let regioneOptions = ["Tutte le regioni"].concat(
        Object.values(
            data.enti.reduce((a, { Regione__c }) => {
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
    let filterRegione = "Tutte le regioni";

    let portafoglioOptions = ["Tutti i portafogli"].concat(
        Object.values(
            data.enti.reduce((a, { portafoglio }) => {
                a[portafoglio] = a[portafoglio] || {
                    portafoglio,
                    count: 0,
                };
                a[portafoglio].count++;
                return a;
            }, Object.create(null))
        )
            .map((x) => x.portafoglio)
            .sort()
    );
    let filterPortafoglio = "Tutti i portafogli";

    let filterNominativoEnte = "";

    $: filteredEnti = data.enti
        .filter((x) =>
            filterPortafoglio == "Tutti i portafogli"
                ? true
                : x.portafoglio === filterPortafoglio
        )
        .filter((x) =>
            filterTipologiaEnte == "Tutte le tipologie"
                ? true
                : x.Tipologia_Ente__c === filterTipologiaEnte
        )
        .filter((x) =>
            filterRegione == "Tutte le regioni"
                ? true
                : x.Regione__c === filterRegione
        )
        .filter((x) =>
            filterNominativoEnte == ""
                ? true
                : x.Name.toLowerCase().includes(
                      filterNominativoEnte.toLowerCase()
                  )
        )
        .filter((x) => (!soloattivi ? true : x.Active__c == 1))
        .slice(0, max);
</script>

<section class="hero is-small is-info is-12">
    <div class="hero-body">
        <nav class="level">
            <!-- Left side -->
            <div class="level-left">
                <div class="level-item">
                    <div>
                    <p class="title my-0">Enti</p>
                    <p class="my-1 mx-5 is-size-6"><i>"Con la massa degli oggetti cresce ... il regno degli enti estranei a cui l'uomo è soggiogato"</i>&nbsp;&nbsp;[Guy Debord]</p>
                </div>
                </div>
            </div>
            <div class="level-right">
                <div class="level-item">

                        <p class="is-size-4 has-text-weight-bold mx-3">
                            visualizzati {filteredEnti.length} su {data.enti
                                .length}
                        </p>

                </div>
            </div>
        </nav>
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
                        <div class="field">
                            <input
                                id="switchSoloUnTaskPerEnte"
                                type="checkbox"
                                name="switchSoloUnTaskPerEnte"
                                class="switch is-info"
                                bind:checked={soloattivi}
                            />
                            <label for="switchSoloUnTaskPerEnte"
                                >Mostra solo enti attivi</label
                            >
                        </div>
                    </div>
                </div>
                <div class="level-item">
                    <div class="control">
                        <div class="select is-primary" id="idfilterstatoavviso">
                            <select bind:value={filterPortafoglio}>
                                {#each portafoglioOptions as item}
                                    <option>{item}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="level-item">
                    <div class="control">
                        <div class="select is-primary" id="idfilterstatoavviso">
                            <select bind:value={filterTipologiaEnte}>
                                {#each tipologiaEnteOptions as item}
                                    <option>{item}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>

                <div class="level-item">
                    <div class="control">
                        <div class="select is-primary" id="idfilterstatoavviso">
                            <select bind:value={filterRegione}>
                                {#each regioneOptions as item}
                                    <option>{item}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>

                <div class="level-item">
                    <div class="field">
                        <div class="control has-icons-left">
                            <input
                                class="input is-primary"
                                type="text"
                                placeholder="nome dell'ente"
                                bind:value={filterNominativoEnte}
                            />
                            <div class="icon is-small is-left">
                                <i class="fas fa-building" />
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
        {#each filteredEnti as ente}
            <div class="column is-half">
                <Entecard {ente} />
            </div>
        {/each}
    </div>
</section>
