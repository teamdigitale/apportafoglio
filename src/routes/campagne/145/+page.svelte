<script>
    import Header from "$lib/c/ui/header.svelte";
    import Scorecard from "$lib/c/ui/scorecard.svelte";
    import { onMount } from "svelte";
    import Pagination from "./pagination.svelte";
    import Gauge145 from "./gauge145.svelte";
    import Statuschart from "./statuschart.svelte";
    export let data;

    const stativalidi = ["FINANZIATA"];
    const stativerificaudm = ["IN VERIFICA"];
    const statiinlavorazione = ["PREBOZZA", "BOZZA", "CONCLUSA", "ACCETATTA"];
    const statinonvalidi = [
        "ANNULLATA",
        "NON ACCETTATA",
        "NON AMMESSA",
        "RINUNCIATA",
        "RITIRATA",
        "SCADUTA",
    ];

    let filterStatoCandidatura = "";

    let datiPerTabella = data.platea.filter((p) => {
        return filterStatoCandidatura === ""
            ? true
            : data.candidature.filter((ca) => {
                  return (
                      ca.outfunds__Applying_Organization__r.Id === p.Id &&
                      filterStatoCandidatura === ca.outfunds__Status__c
                  );
              }).length > 0;
    });


    let cc = [];

    let statiCandidature = [];
    let statiProgetto = [];

    let cperpage;

    onMount(() => {
        cc = data.candidature.reduce((accumulator, current) => {
            if (
                !accumulator.find(
                    (item) =>
                        item.outfunds__Applying_Organization__r.Id ===
                            current.outfunds__Applying_Organization__r.Id &&
                        current.id_richiesta_di_candidatura__c >
                            item.id_richiesta_di_candidatura__c
                )
            ) {
                accumulator.push(current);
            }
            return accumulator;
        }, []);
        statiCandidature = Object.values(
            cc.reduce((a, { outfunds__Status__c }) => {
                a[outfunds__Status__c] = a[outfunds__Status__c] || {
                    outfunds__Status__c,
                    count: 0,
                };
                a[outfunds__Status__c].count++;
                return a;
            }, Object.create(null))
        );
        statiProgetto = Object.values(
            cc.reduce((a, { Stato_Progetto__c }) => {
                a[Stato_Progetto__c] = a[Stato_Progetto__c] || {
                    Stato_Progetto__c,
                    count: 0,
                };
                a[Stato_Progetto__c].count++;
                return a;
            }, Object.create(null))
        );

        calcola();
    });

    let numeroFinanziate;
    let numeroNonValide;
    let numeroInlavorazione;
    let numeroInverificaUdm;

    let numeroContrattualizzate;
    let numeroProgettoCompletato;
    let numeroProgettoInVerifica;
    let numeroProgettoDaAvviare;
    let numeroProgettoAvviato;

    function calcola() {
        let hannoUnaCandidatura = 0;
        data.platea.forEach((p) => {
            let hasCandidatura =
                data.candidature.filter(
                    (c) => p.Id === c.outfunds__Applying_Organization__r.Id
                ).length > 0;
            if (hasCandidatura) hannoUnaCandidatura++;
        });

        numeroFinanziate = statiCandidature.filter(
            (s) => s.outfunds__Status__c === "FINANZIATA"
        )[0].count;

        numeroNonValide = statiCandidature
            .filter((s) => statinonvalidi.indexOf(s.outfunds__Status__c) > -1)
            .reduce((accumulator, object) => {
                return accumulator + object.count;
            }, 0);

        numeroInlavorazione = statiCandidature
            .filter(
                (s) => statiinlavorazione.indexOf(s.outfunds__Status__c) > -1
            )
            .reduce((accumulator, object) => {
                return accumulator + object.count;
            }, 0);

        numeroInverificaUdm = statiCandidature
            .filter((s) => stativerificaudm.indexOf(s.outfunds__Status__c) > -1)
            .reduce((accumulator, object) => {
                return accumulator + object.count;
            }, 0);

        numeroContrattualizzate = cc.filter(
            (c) =>
                c.outfunds__Status__c === "FINANZIATA" &&
                c.Stato_contrattualizzazione__c === "Completata"
        ).length;

        numeroProgettoCompletato = cc.filter(
            (c) =>
                c.outfunds__Status__c === "FINANZIATA" &&
                c.Stato_contrattualizzazione__c === "Completata" &&
                c.Stato_Progetto__c === "COMPLETATO"
        ).length;

        numeroProgettoInVerifica = cc.filter(
            (c) =>
                c.outfunds__Status__c === "FINANZIATA" &&
                c.Stato_contrattualizzazione__c === "Completata" &&
                c.Stato_Progetto__c === "IN VERIFICA"
        ).length;

        numeroProgettoDaAvviare = cc.filter(
            (c) =>
                c.outfunds__Status__c === "FINANZIATA" &&
                c.Stato_Progetto__c === "DA AVVIARE"
        ).length;
        numeroProgettoAvviato = cc.filter(
            (c) =>
                c.outfunds__Status__c === "FINANZIATA" &&
                c.Stato_contrattualizzazione__c === "Completata" &&
                c.Stato_Progetto__c === "AVVIATO"
        ).length;
    }

    $: filteredc = cc;

    let regioniPlatea = Object.values(
        data.platea.reduce((a, { Regione__c }) => {
            a[Regione__c] = a[Regione__c] || {
                Regione__c,
                count: 0,
            };
            a[Regione__c].count++;
            return a;
        }, Object.create(null))
    );
</script>

<Header title="target 1.4.5 al 31/12/2023" quote="" author="" />



<section class="section is-12 px-0 py-0">
    <div class="hero-body py-0">
        <div class="columns">
            <div class="column is-full has-text-centered">
                <Scorecard
                    score={data.platea.length}
                    label="Platea Comuni"
                    color="primary"
                />
            </div>
        </div>
        <div class="columns">
            <div class="column my-0 py-0 is-full has-text-centered">
                <div>
                    <span class="icon is-small is-left mx-3">
                        <i class="fas fa-arrow-down" />
                    </span>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-2">
                <Scorecard
                    score={numeroFinanziate}
                    label="FINANZIATE"
                    color="success"
                />
            </div>
            <div class="column is-2">
                <Scorecard
                    score={data.platea.filter(
                        (p) =>
                            cc.filter(
                                (c) =>
                                    c.outfunds__Applying_Organization__r.Id ===
                                    p.Id
                            ).length === 0
                    ).length}
                    label="MAI CANDIDATI"
                    color={"grey"}
                />
            </div>
            <div class="column is-2">
                <Scorecard
                    score={numeroNonValide}
                    label="NON VALIDE"
                    color="danger"
                />
            </div>
            <div class="column is-2">
                <Scorecard
                    score={numeroInlavorazione}
                    label="IN LAVORAZIONE"
                    color="grey-light"
                />
            </div>
            <div class="column is-2">
                <Scorecard
                    score={numeroInverificaUdm}
                    label="IN VERIFICA UdM"
                    color="info"
                />
            </div>
        </div>
        <div class="columns">
            <div class="column my-0 py-0 is-2 has-text-centered">
                <div>
                    <span class="icon is-small is-left mx-3">
                        <i class="fas fa-arrow-down" />
                    </span>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-2">
                <Scorecard
                    score={statiProgetto
                        .filter((s) => s.Stato_Progetto__c === "DA AVVIARE")
                        .reduce((accumulator, object) => {
                            return accumulator + object.count;
                        }, 0)}
                    label="DA AVVIARE"
                    color={"grey"}
                />
            </div>
            <div class="column is-2">
                <Scorecard
                    score={statiProgetto
                        .filter((s) => s.Stato_Progetto__c === "AVVIATO")
                        .reduce((accumulator, object) => {
                            return accumulator + object.count;
                        }, 0)}
                    label="AVVIATO"
                    color={"grey-light"}
                />
            </div>
            <div class="column is-2">
                <Scorecard
                    score={statiProgetto
                        .filter((s) => s.Stato_Progetto__c === "COMPLETATO")
                        .reduce((accumulator, object) => {
                            return accumulator + object.count;
                        }, 0)}
                    label="COMPLETATO"
                    color={"info"}
                />
            </div>
            <div class="column is-2">
                <Scorecard
                    score={statiProgetto
                        .filter((s) => s.Stato_Progetto__c === "IN VERIFICA")
                        .reduce((accumulator, object) => {
                            return accumulator + object.count;
                        }, 0)}
                    label="IN VERIFICA"
                    color={"success"}
                />
            </div>
            <div class="column is-2">
                <Scorecard
                    score={statiProgetto
                        .filter((s) => s.Stato_Progetto__c === "LIQUIDATO")
                        .reduce((accumulator, object) => {
                            return accumulator + object.count;
                        }, 0)}
                    label="LIQUIDATO"
                    color={"primary"}
                />
            </div>
        </div>
    </div>
</section>

<section class="section is-12 px-0 py-0" transition:fade>
    <div class="hero-body py-0">
        <div class="table-container">
            <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th />
                        <th>Ente</th>
                        <th>Regione</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th colspan="4"
                            ><Pagination
                                rows={datiPerTabella}
                                perPage={10}
                                bind:trimmedRows={cperpage}
                            /></th
                        >
                    </tr>
                </tfoot>
                <tbody>
                    {#if cperpage}
                        {#each cperpage as c}
                            <tr>
                                <td
                                    ><button
                                        class="button is-small is-outlined is-info"
                                        ><span class="icon is-small"
                                            ><i class="fas fa-glasses" /></span
                                        ></button
                                    ></td
                                >
                                <td>{c.Name}</td>
                                <td>{c.Regione__c}</td>
                                <td
                                    >{data.candidature.filter((ca) => {
                                        return (
                                            ca
                                                .outfunds__Applying_Organization__r
                                                .Id === c.Id
                                        );
                                    }).length}</td
                                >
                            </tr>
                        {/each}
                    {/if}
                </tbody>
            </table>
        </div>
    </div>
</section>
