<script>
    import Header from "$lib/c/ui/header.svelte";
    import Cardass from "./cardass.svelte";
    import Cardassmisura from "./cardassmisura.svelte";
    import moment from "moment/min/moment-with-locales";
    moment.locale("it");

    export let data;

    let spaccatoPerMisura = false;
    let untaskperente = false;

    let misureOptions = ["Tutte le misure"].concat(
        Object.values(
            data.candidature.reduce((a, { Misura__c }) => {
                a[Misura__c] = a[Misura__c] || {
                    Misura__c,
                    count: 0,
                };
                a[Misura__c].count++;
                return a;
            }, Object.create(null))
        )
            .map((x) => x.Misura__c)
            .sort()
    );
    let filterMisura = misureOptions[0];

    let esitoOptions = [
        "Tutti gli esiti",
        "Positivo",
        "In lavorazione",
        "Parziale",
        "Negativo",
    ];
    let filterEsito = esitoOptions[0];

    $: filteredCandidature = data.candidature.filter((c) =>
        filterMisura === misureOptions[0] ? true : c.Misura__c === filterMisura
    );

    $: filteredTasksAssTecnica = () => {

        let filtered = [];
        if (untaskperente) {
            filtered = data.taskAssTecnica.reduce((total, e) => {
                const found = total.find(
                    (el) =>
                        el.WhatId === e.WhatId
                );
                if (!found) {
                    total.push(e);
                } else {
                    const index = total.findIndex((i) => {
                        return (
                            i.WhatId === e.WhatId &&
                            
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
            filtered.push(...data.taskAssTecnica);
        }



        let res = filtered.filter((t) =>
            filterEsito === "Tutti gli esiti"
                ? true
                : filterEsito === t.Esito__c
        );



        res = res.filter((r) => {
            return (
                filteredCandidature.filter((c) => c.Id === r.WhatId).length > 0
            );
        });
        return res;
    };

    $: filteredTasksAssFormale = () => {

        let filtered = [];
        if (untaskperente) {
            filtered = data.taskAssFormale.reduce((total, e) => {
                const found = total.find(
                    (el) =>
                        el.WhatId === e.WhatId
                );
                if (!found) {
                    total.push(e);
                } else {
                    const index = total.findIndex((i) => {
                        return (
                            i.WhatId === e.WhatId &&
                            
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
            filtered.push(...data.taskAssFormale);
        }


        let res = filtered.filter((t) =>
            filterEsito === "Tutti gli esiti"
                ? true
                : filterEsito === t.Esito__c
        );



        res = res.filter((r) => {
            return (
                filteredCandidature.filter((c) => c.Id === r.WhatId).length > 0
            );
        });
        return res;
    };



    $: filterTasksTecniciPerMisura = (m) => {
        let filtered = [];
        if (untaskperente) {
            filtered = data.taskAssTecnica.reduce((total, e) => {
                const found = total.find(
                    (el) =>
                        el.WhatId === e.WhatId
                );
                if (!found) {
                    total.push(e);
                } else {
                    const index = total.findIndex((i) => {
                        return (
                            i.WhatId === e.WhatId &&
                            
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
            filtered.push(...data.taskAssTecnica);
        }

        return filtered.filter(
            (t) =>
                data.candidature
                    .filter((c) => c.Misura__c === m)
                    .filter((c) => c.Id === t.WhatId).length > 0
        );
    };

    $: filterTasksFormaliPerMisura = (m) => {

        let filtered = [];
        if (untaskperente) {
            filtered = data.taskAssFormale.reduce((total, e) => {
                const found = total.find(
                    (el) =>
                        el.WhatId === e.WhatId
                );
                if (!found) {
                    total.push(e);
                } else {
                    const index = total.findIndex((i) => {
                        return (
                            i.WhatId === e.WhatId &&
                            
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
            filtered.push(...data.taskAssFormale);
        }

        return filtered.filter(
            (t) =>
                data.candidature
                    .filter((c) => c.Misura__c === m)
                    .filter((c) => c.Id === t.WhatId).length > 0
        );
    };
</script>

<Header
    title="asseverazioni"
    quote="Tutte le ispezioni condotte allo scopo di individuare difetti sono uno spreco e una perdita di tempo. Le ispezioni vanno fatte per prevenire i difetti."
    author="Taiichi Ohno"
/>
<section class="hero is-small is-primary is-12">
    <div class="hero-body m-1 p-1">
        <nav class="level">
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
                                id="switchsoloultimoesito"
                                type="checkbox"
                                name="switchsoloultimoesito"
                                class="switch"
                                bind:checked={untaskperente}
                            />
                            <label for="switchsoloultimoesito"
                                >Solo ultimo esito per candidatura</label
                            >
                        </div>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <div class="field">
                            <input
                                id="switchsolocomuni"
                                type="checkbox"
                                name="switchsolocomuni"
                                class="switch"
                                bind:checked={spaccatoPerMisura}
                            />
                            <label for="switchsolocomuni"
                                >Spaccato per Misura</label
                            >
                        </div>
                    </div>
                </div>
                <div class="level-item">
                    <div class="control">
                        <div class="select is-primary" id="idfiltromisura">
                            <select bind:value={filterMisura}>
                                {#each misureOptions as item}
                                    <option>{item}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="level-item">
                    <div class="control">
                        <div class="select is-primary" id="idfiltromisura">
                            <select bind:value={filterEsito}>
                                {#each esitoOptions as item}
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

{#if !spaccatoPerMisura}
    <section class="section is-12 px-0">
        <div class="columns is-multiline">
            <div class="column is-half">
                <Cardass
                    tipoTask="Controlli Conformità Tecnica"
                    tasks={filteredTasksAssTecnica()}
                />
            </div>
            <div class="column is-half">
                <Cardass
                    tipoTask="Controlli Asseverazione Formale"
                    tasks={filteredTasksAssFormale()}
                />
            </div>
        </div>
    </section>
{:else}
    <section class="section is-12 px-0">
        <div class="columns is-multiline">
            {#each misureOptions.filter( (m) => (filterMisura === misureOptions[0] ? true : m === filterMisura) ) as misura, index}
                {#if misura !== "Tutte le misure"}
                    <div class="column is-half">
                        <Cardassmisura
                            {misura}
                            tasksTecnici={filterTasksTecniciPerMisura(misura)}
                            tasksFormali={filterTasksFormaliPerMisura(misura)}
                        />
                    </div>
                {/if}
            {/each}
        </div>
    </section>
{/if}

<section class="section is-12 p-2">
    <div class="columns is-multiline">
        <div class="column is-half">
            <section
                class="hero is-primary is-info is-size-5 has-text-centered"
            >
                Asseverazioni tecniche
            </section>
            <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th>Misura</th>
                        <th>Pacchetto</th>
                        <th>Stato candidatura</th>
                        <th>Esito</th>
                        <th>Data esito</th>
                        <th>Ente</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {#each filteredTasksAssTecnica() as t}
                        <tr>
                            <td
                                >{data.candidature.filter(
                                    (c) => c.Id === t.WhatId
                                )[0].Misura__c}</td
                            >
                            <td
                                >{data.avvisi.filter(
                                    (a) =>
                                        a.Id ===
                                        data.candidature.filter(
                                            (c) => c.Id === t.WhatId
                                        )[0].outfunds__FundingProgram__c
                                )[0].Pacchetto__c
                                    ? data.avvisi.filter(
                                          (a) =>
                                              a.Id ===
                                              data.candidature.filter(
                                                  (c) => c.Id === t.WhatId
                                              )[0].outfunds__FundingProgram__c
                                      )[0].Pacchetto__c
                                    : "n.a."}</td
                            >
                            <td
                                >{data.candidature.filter(
                                    (c) => c.Id === t.WhatId
                                )[0].outfunds__Status__c}</td
                            >
                            <td>{t.Esito__c}</td>
                            <td
                                >{t.Data_fine_Asseverazione__c
                                    ? moment(
                                          t.Data_fine_Asseverazione__c
                                      ).format("DD/MM/YYYY")
                                    : "n.a."}</td
                            >
                            <td>{data.enti.filter(e => data.candidature.filter(c=>c.Id === t.WhatId)[0].outfunds__Applying_Organization__c===e.Id)[0].Name}</td>

                            <td
                                ><a
                                    href="/candidatura/{data.candidature.filter(
                                        (c) => c.Id === t.WhatId
                                    )[0].Id}"
                                    target="_blank"
                                    ><span class="icon"
                                        ><i class="fas fa-glasses">&nbsp</i
                                        ></span
                                    ></a
                                ></td
                            >
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        <div class="column is-half">
            <section
                class="hero is-primary is-info is-size-5 has-text-centered"
            >
                Asseverazioni formali
            </section>
            <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th>Misura</th>
                        <th>Pacchetto</th>
                        <th>Stato candidatura</th>
                        <th>Esito</th>
                        <th>Data esito</th>
                        <th>Ente</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {#each filteredTasksAssFormale() as t}
                        <tr>
                            <td
                                >{data.candidature.filter(
                                    (c) => c.Id === t.WhatId
                                )[0].Misura__c}</td
                            >
                            <td
                                >{data.avvisi.filter(
                                    (a) =>
                                        a.Id ===
                                        data.candidature.filter(
                                            (c) => c.Id === t.WhatId
                                        )[0].outfunds__FundingProgram__c
                                )[0].Pacchetto__c
                                    ? data.avvisi.filter(
                                          (a) =>
                                              a.Id ===
                                              data.candidature.filter(
                                                  (c) => c.Id === t.WhatId
                                              )[0].outfunds__FundingProgram__c
                                      )[0].Pacchetto__c
                                    : "n.a."}</td
                            >
                            <td
                                >{data.candidature.filter(
                                    (c) => c.Id === t.WhatId
                                )[0].outfunds__Status__c}</td
                            >
                            <td>{t.Esito__c}</td>
                            <td
                                >{t.Data_fine_Asseverazione__c
                                    ? moment(
                                          t.Data_fine_Asseverazione__c
                                      ).format("DD/MM/YYYY")
                                    : "n.a."}</td
                            >
                            <td>{data.enti.filter(e => data.candidature.filter(c=>c.Id === t.WhatId)[0].outfunds__Applying_Organization__c===e.Id)[0].Name}</td>

                            <td
                                ><a
                                    href="/candidatura/{data.candidature.filter(
                                        (c) => c.Id === t.WhatId
                                    )[0].Id}"
                                    target="_blank"
                                    ><span class="icon"
                                        ><i class="fas fa-glasses">&nbsp</i
                                        ></span
                                    ></a
                                ></td
                            >
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</section>
