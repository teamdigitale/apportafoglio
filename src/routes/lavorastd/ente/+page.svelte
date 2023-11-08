<script>
    // @ts-nocheck

    import AutoComplete from "simple-svelte-autocomplete";
    import moment from "moment/min/moment-with-locales";
    import InfoCard from "./info-card.svelte";
    moment.locale("it");

    const stativalidi = ["ACCETTATA", "FINANZIATA", "IN VERIFICA"];
    const statiinlavorazione = ["PREBOZZA", "BOZZA", "CONCLUSA"];
    const statinonvalidi = [
        "ANNULLATA",
        "NON ACCETTATA",
        "NON AMMESSA",
        "RINUNCIATA",
        "RITIRATA",
        "SCADUTA",
    ];

    let filterEnti = "";
    let highlightedEnte;
    let selectedEnte;
    export let data;

    $: entif = data.enti
        .filter((e) => {
            if (!filterEnti || filterEnti === "") {
                return true;
            } else {
                if (e.Name.toUpperCase().includes(filterEnti.toUpperCase())) {
                    return true;
                } else {
                    return false;
                }
            }
        })
        .sort((a, b) => {
            if (a.Name < b.Name) {
                return -1;
            }
            if (a.Name > b.Name) {
                return 1;
            }
            return 0;
        });

    $: misuref = data.misure.sort((a, b) => {
        if (a.Name < b.Name) {
            return -1;
        }
        if (a.Name > b.Name) {
            return 1;
        }
        return 0;
    });


    $: infomisura = (idmisura,idente) => {
        if(!idente||idente===''){
            idente= selectedEnte.Id;
        }
        let result = {
            messaggio: "",
            candidature: [],
            color: "grey-dark",
            misura: data.misure.filter((m) => m.Id === idmisura)[0].Name,
            esistenzaavvisi: false,
            avvisiaperti: false,
        };
        let avvisi = data.avvisi.filter(
            (a) => a.outfunds__Parent_Funding_Program__c === idmisura
        );
        let avvisiaperti = false;
        let esistenzaavvisi = false;

        if (avvisi.length === 0) {
            result.messaggio = "Non ci sono avvisi per questa misura";
        } else {
            /*
            if (
                avvisi.filter((a) => a.outfunds__Status__c === "PUBBLICATO")
                    .length === 0
            ) {
                avvisiaperti = true;
            }
            */
            let ente = data.enti.filter((e) => e.Id === idente);
            for (let z = 0; z < avvisi.length; z++) {
                if (
                    avvisi[z].beneficiari.indexOf(
                        ente[0].Tipologia_Ente__c.toUpperCase()
                    ) > -1
                ) {
                    esistenzaavvisi = true;
                    break;
                }
            }
            if (!esistenzaavvisi) {
                result.messaggio =
                    "Non sono stati pubblicati avvisi per enti ti tipologia: " +
                    ente[0].Tipologia_Ente__c.toUpperCase();
                result.color = "grey";
            } else {
                let cc = [];
                for (let z = 0; z < avvisi.length; z++) {
                    cc = cc.concat(
                        data.candidature.filter(
                            (c) =>
                                c.outfunds__FundingProgram__c ===
                                    avvisi[z].Id &&
                                idente ===
                                    c.outfunds__Applying_Organization__c
                        )
                    );
                }
                if (cc.length === 0) {
                    if (
                        avvisi.filter(
                            (a) => a.outfunds__Status__c === "PUBBLICATO"
                        ).length === 0
                    ) {
                        
                        (result.messaggio =
                            "L'ente NON si è mai candidato per questa misura MA non ci sono avvisi aperti"),
                            (result.color = "danger");
                    } else {
                        avvisiaperti = true;
                        (result.messaggio =
                            "L'ente NON si è mai candidato per questa misura E ci sono avvisi aperti"),
                            (result.color = "danger");
                    }
                } else {
                    cc = cc.sort(
                        (a, b) => b.id_richiesta_di_candidatura__c-a.id_richiesta_di_candidatura__c
                            /*new Date(b.LastModifiedDate).getDate() -
                            new Date(a.LastModifiedDate).getDate()*/
                    );
                    result.candidature = cc;
                    if (stativalidi.indexOf(cc[0].outfunds__Status__c) > -1) {
                        result.messaggio =
                            "L'ente ha una candidatura valida per questa misura";
                        result.color = "info";
                    } else {
                        if (
                            avvisi.filter(
                                (a) => a.outfunds__Status__c === "PUBBLICATO"
                            ).length === 0
                        ) {
                            
                            (result.messaggio =
                                "L'ente NON ha una candidatura valida per questa misura e NON ci sono avvisi aperti"),
                                (result.color = "grey");
                        } else {
                            avvisiaperti = true;
                            (result.messaggio =
                                "L'ente NON ha una candidatura valida per questa misura MA ci sono avvisi aperti"),
                                (result.color = "danger");
                        }
                    }
                }
            }
        }

        result.avvisiaperti = avvisiaperti;

        return result;
    };
</script>

<section class="hero is-small is-info is-12">
    <div class="hero-body">
        <nav class="level">
            <!-- Left side -->
            <div class="level-left">
                <div class="level-item">
                    <div>
                        <p class="title my-0">
                            Lavora a media quota (per Ente)
                        </p>
                        <p class="my-1 mx-5 is-size-6">
                            <i
                                >"E a volte se si vola basso è solo per
                                sopportare meglio il peso delle proprie nuvole."</i
                            >&nbsp;&nbsp;[Anonimo]
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</section>

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

                <div class="level-item">
                    <div class="control">
                        <div>
                            <AutoComplete
                                items={data.enti}
                                bind:value={filterEnti}
                                labelFieldName="Name"
                                valueFieldName="Name"
                                bind:selectedItem={selectedEnte}
                                bind:highlightedItem={highlightedEnte}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</section>

{#if filterEnti && filterEnti !== ""}
    <section class="section is-12 px-0">
        <div class="columns is-multiline">
            {#each misuref as misura}
                <div class="column is-half">
                    <InfoCard infomisura={infomisura(misura.Id,null)} />
                </div>
            {/each}
        </div>
    </section>
{/if}

<section class="section is-12 p-2">
    <table class="table is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
            <tr>
                <th class=" is-vcentered">Ente</th>
                {#each misuref as misura}
                    <th class="has-text-centered is-vcentered">{misura.Name}</th
                    >
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each entif as ente}
                <tr>
                    <td class="is-size-6 is-vcentered">
                        <p class="is-size-6 is-vcentered">{ente.Name}</p>
                        <p class="is-size-7 is-vcentered has-text-weight-bold">
                            {ente.Tipologia_Ente__c} - {ente.Regione__c}
                        </p>
                    </td>
                    {#each misuref as misura}
                        <td
                            class="has-text-centered is-vcentered m-0 is-size-7 has-text-weight-bold"
                        >
                            <p>
                               {infomisura(misura.Id,ente.Id).messaggio}
                            </p>
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</section>
