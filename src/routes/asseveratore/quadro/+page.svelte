<script>
    import Scorecardasseverazioni from "../../../c/scorecardasseverazioni.svelte";
    import moment from "moment/min/moment-with-locales";
    moment.locale("it");

    

    /** @type {import('./$types').PageData} */
    export let data;

    let untaskperente = false;

    let solovalide = true;

    let misuraOptions = ["Tutte le misure"].concat(
        Object.values(
            data.misure.reduce((a, { Name }) => {
                a[Name] = a[Name] || {
                    Name,
                    count: 0,
                };
                a[Name].count++;
                return a;
            }, Object.create(null))
        )
            .map((x) => x.Name)
            .sort()
    );
    let filterMisura = "Tutte le misure";

    let esitoOptions = ["Tutti gli esiti"].concat(
        Object.values(
            data.taskasseverazione.reduce((a, { Esito__c }) => {
                a[Esito__c] = a[Esito__c] || {
                    Esito__c,
                    count: 0,
                };
                a[Esito__c].count++;
                return a;
            }, Object.create(null))
        )
            .map((x) => x.Esito__c)
            .sort()
    );
    let filterEsito = "Tutti gli esiti";

    let pacchettoOptions = ["Tutti i pacchetti"].concat(
        Object.values(
            data.taskasseverazione.reduce((a, { pacchetto }) => {
                a[pacchetto] = a[pacchetto] || {
                    pacchetto,
                    count: 0,
                };
                a[pacchetto].count++;
                return a;
            }, Object.create(null))
        )
            .map((x) => x.pacchetto)
            .filter((v) => (v ? true : false))
            .sort()
    );
    let filterPacchetto = "Tutti i pacchetti";

    $: filterTasks = () => {
        let filtered = [];
        if (untaskperente) {
            filtered = data.taskasseverazione.reduce((total, e) => {
                const found = total.find(
                    (el) =>
                        el.EnteLookup__c === e.EnteLookup__c &&
                        el.misura === e.misura
                );
                if (!found) {
                    total.push(e);
                } else {
                    const index = total.findIndex((i) => {
                        return (
                            i.EnteLookup__c === e.EnteLookup__c &&
                            i.misura === e.misura &&
                            i.CreatedDate < e.CreatedDate
                        );
                    });
                    if (index > -1) {
                        total.splice(index, 1);
                        total.push(e);
                    }
                }
                return total;
            }, []);


        } else {
            filtered.push(...data.taskasseverazione);
        }

        /*
        if(solovalide){
            filtered = filtered.filter(x=> data.candidatureAsseverazione.filter(c=>c.id===x.WhatId)[0].outfunds__Status__c==='FINANZIATA');
        }
        */

        return filtered
            .filter((x) =>
                filterMisura == "Tutte le misure"
                    ? true
                    : x.misura === filterMisura
            )
            .filter((x) =>
                filterEsito == "Tutti gli esiti"
                    ? true
                    : x.Esito__c === filterEsito
            )
            .filter((x) =>
                filterMisura.startsWith("1.4.3") ||
                filterMisura === "Tutte le misure"
                    ? filterPacchetto == "Tutti i pacchetti"
                        ? true
                        : x.pacchetto === filterPacchetto
                    : true
            )
            .sort((a, b) => b.CreatedDate - a.CreatedDate);
    };

    $: filteredTasks = filterTasks();

    let aggregatoCandidatureMisure = Object.values(
        data.taskasseverazione.reduce((a, { misura }) => {
            a[misura] = a[misura] || {
                misura,
                count: 0,
            };
            a[misura].count++;
            return a;
        }, Object.create(null))
    ).filter((x) => x.misura);
</script>

<section class="hero is-small is-info is-12">
    <div class="hero-body">
        <p class="title my-0">Quadro asseverazioni</p>
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
                </div>
                <div class="level-item">
                    <div class="control">
                        <div class="select is-primary" id="idfiltermisura">
                            <select bind:value={filterMisura}>
                                {#each misuraOptions as item}
                                    <option>{item}</option>
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
                <div class="level-item">
                    <div class="control">
                        <div class="select is-primary" id="idfilteresito">
                            <select bind:value={filterEsito}>
                                {#each esitoOptions as item}
                                    <option>{item}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="level-item">
                    <div class="control">
                        <div class="field">
                            <input
                                id="switchSoloUnTaskPerEnte"
                                type="checkbox"
                                name="switchSoloUnTaskPerEnte"
                                class="switch is-info"
                                bind:checked={untaskperente}
                            />
                            <label for="switchSoloUnTaskPerEnte"
                                >Mostra solo un task per ente</label
                            >
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</section>

<section class="section is-12 py-2 px-0">
    <div class="columns is-multiline  m-1">
        {#each aggregatoCandidatureMisure as scorecard}
            <Scorecardasseverazioni
                misura={scorecard.misura}
                tasks={filteredTasks.filter(
                    (x) => x.misura === scorecard.misura
                )}
            />
        {/each}
    </div>
</section>

<section class="section is-12 p-2">
    <table class="table is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
            <tr>
                <th></th>
                <th>Misura</th>
                <th>Pacchetto</th>
                <th>Stato candidatura</th>
                <th>Esito</th>
                <th>Ente</th>
                <th><abbr title="Data creazione">Dt creazione</abbr></th>
                <th
                    ><abbr title="Data chiusura asseverazione">Dt chiusura</abbr
                    ></th
                >
                <th
                    ><abbr title="Giorni rimanenti cronoprogramma"
                        >Gg rimanenti</abbr
                    ></th
                >
                <th>

                </th>
            </tr>
        </thead>
        <tbody>
            {#each filteredTasks as task,index}
                <tr class="{data.candidatureAsseverazione.filter(c=> c.Id===task.WhatId)[0].outfunds__Status__c!=='FINANZIATA'?'has-background-danger':''}">
                    <td>{index+1}</td>
                    <td>{task.misura}</td>
                    <td
                        >{task.misuraAll.Pacchetto__c
                            ? task.misuraAll.Pacchetto__c
                            : "n.a."}</td
                    >
                    <td>{data.candidatureAsseverazione.filter(c=> c.Id===task.WhatId)[0].outfunds__Status__c}</td>
                    <td>{task.Esito__c}</td>
                    <td class="{data.enti.filter(
                        (x) => x.Id === task.EnteLookup__c
                    )[0]?'':'has-text-danger'}"
                        >
                        {data.enti.filter(
                            (x) => x.Id === task.EnteLookup__c
                        )[0]?data.enti.filter(
                            (x) => x.Id === task.EnteLookup__c
                        )[0].Name:'Non disponibile. Probabile ri-assegnazione ente ad altro asseveratore'}
                        </td
                    >
                    <td>{moment(task.CreatedDate).format("DD/MM/YYYY")}</td>
                    <td
                        >{task.Esito__c === "Positivo"
                            ? moment(task.Data_fine_Asseverazione__c).format(
                                  "DD/MM/YYYY"
                              )
                            : "n.a."}</td
                    >
                    <td
                        >{task.Esito__c === "Positivo"
                            ? "n.a."
                            : task.Esito__c === "Parziale"
                            ? moment(task.candidatura.Data_conclusione__c).diff(
                                  moment(),
                                  "day"
                              )
                            : task.GiorniRimanentiCronoprogramma__c}</td
                    >
                    <td
                    ><a href="/candidatura/{task.WhatId+'°ass'}" target="_blank"
                        ><span class="icon"
                            ><i class="fas fa-glasses">&nbsp</i></span
                        ></a
                    ></td
                >
                </tr>
            {/each}
        </tbody>
    </table>
</section>
