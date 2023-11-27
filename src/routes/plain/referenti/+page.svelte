<script>
    export let data;
    import Filters from "$lib/c/ui/Filters.svelte";
    import Referentecard from "../../../c/referentecard.svelte";
    import moment from "moment/min/moment-with-locales";
    moment.locale("it");

    const max = 500;
    let statoReferenteOptions = ["Tutti"].concat(
        Object.values(
            data.referenti.reduce((a, { Stato__c }) => {
                a[Stato__c] = a[Stato__c] || {
                    Stato__c,
                    count: 0,
                };
                a[Stato__c].count++;
                return a;
            }, Object.create(null)),
        )
            .map((x) => x.Stato__c)
            .sort(),
    );
    let filterStatoReferente = "Attivo";

    let portafoglioOptions = ["Tutti i portafogli"].concat(
        Object.values(
            data.referenti.reduce((a, { portafoglio }) => {
                a[portafoglio] = a[portafoglio] || {
                    portafoglio,
                    count: 0,
                };
                a[portafoglio].count++;
                return a;
            }, Object.create(null)),
        )
            .map((x) => x.portafoglio)
            .sort(),
    );
    let filterPortafoglio = "Tutti i portafogli";

    let filterNominativoEnte = "";
    let filterNominativoReferente = "";
    let filterTelefonoReferente = "";

    $: filteredReferenti = data.referenti
        .filter((x) =>
            filterStatoReferente === "Tutti"
                ? true
                : x.Stato__c === filterStatoReferente,
        )
        .filter((x) =>
            filterPortafoglio == "Tutti i portafogli"
                ? true
                : x.portafoglio === filterPortafoglio,
        )
        .filter((x) =>
            filterNominativoEnte == ""
                ? true
                : x.ente.Name.toLowerCase().includes(
                      filterNominativoEnte.toLowerCase(),
                  ),
        )
        .filter((x) =>
            filterNominativoReferente == ""
                ? true
                : x.Name.toLowerCase().includes(
                      filterNominativoReferente.toLowerCase(),
                  ),
        )
        .filter((x) =>
            filterTelefonoReferente == ""
                ? true
                : x.MobilePhone
                  ? x.MobilePhone.includes(filterTelefonoReferente)
                  : false,
        )
        .slice(0, max);
</script>

<section class="hero is-small is-info is-12">
    <div class="hero-body">
        <nav class="level">
            <!-- Left side -->
            <div class="level-left">
                <div class="level-item">
                    <div>
                        <p class="title my-0">Referenti</p>
                        <p class="my-1 mx-5 is-size-6">
                            <i
                                >"Le persone cambiano e si dimenticano di
                                avvisare gli altri."</i
                            >&nbsp;&nbsp;[Lillian Hellman]
                        </p>
                    </div>
                </div>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <form
                        method="POST"
                        action="?/reload"
                        class="has-text-right"
                    >
                        <p class="is-size-4 has-text-weight-bold mx-3">
                            visualizzati {filteredReferenti.length} su {data
                                .referenti.length}
                        </p>
                    </form>
                </div>
            </div>
        </nav>
    </div>
</section>

<Filters>
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

    <div class="level-item">
        <div class="field">
            <div class="control has-icons-left">
                <input
                    class="input is-primary"
                    type="text"
                    placeholder="nome del referente"
                    bind:value={filterNominativoReferente}
                />
                <div class="icon is-small is-left">
                    <i class="fas fa-user" />
                </div>
            </div>
        </div>
    </div>

    <div class="level-item">
        <div class="field">
            <div class="control has-icons-left">
                <input
                    class="input is-primary"
                    type="text"
                    placeholder="telefono del referente"
                    bind:value={filterTelefonoReferente}
                />
                <div class="icon is-small is-left">
                    <i class="fas fa-phone" />
                </div>
            </div>
        </div>
    </div>
</Filters>

<section class="section is-12 px-0">
    <div class="columns is-multiline">
        {#each filteredReferenti as referente}
            <div class="column is-one-third">
                <Referentecard {referente} />
            </div>
        {/each}
    </div>
</section>
