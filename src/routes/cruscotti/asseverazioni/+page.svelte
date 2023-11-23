<script>
    import Header from "$lib/c/ui/header.svelte";
    import Scorecard from "$lib/c/ui/scorecard.svelte";
    import Pie from "./pie.svelte";
    import Stackedbar from "./stackedbar.svelte";

    export let data;

    function euro(v) {
        return Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "EUR",
        }).format(v);
    }

    function unit(v) {
        return Intl.NumberFormat("it-IT").format(v);
    }

    $: dataforbars = (status) => {
        let result = [["Regione","Positivo","In lavorazione","Parziale","Negativo"]];
       
        data.tasks.forEach(t => {
            if(filterArea===aree[0]||t.candidatura.outfunds__Applying_Organization__r.Area_geografica__c === filterArea){
                if(!result.some(row => row[0]===t.candidatura.outfunds__Applying_Organization__r.Regione__c)){
                    result.push([t.candidatura.outfunds__Applying_Organization__r.Regione__c,0,0,0,0]);
                }
                if(t.Esito__c==='Positivo'){
                    result.filter(row => row[0] === t.candidatura.outfunds__Applying_Organization__r.Regione__c)[0][1]=result.filter(row => row[0] === t.candidatura.outfunds__Applying_Organization__r.Regione__c)[0][1]+1;
                }
                else if (t.Esito__c==='In lavorazione'){
                    result.filter(row => row[0] === t.candidatura.outfunds__Applying_Organization__r.Regione__c)[0][2]=result.filter(row => row[0] === t.candidatura.outfunds__Applying_Organization__r.Regione__c)[0][2]+1;
                }
                else if (t.Esito__c==='Parziale'){
                    result.filter(row => row[0] === t.candidatura.outfunds__Applying_Organization__r.Regione__c)[0][3]=result.filter(row => row[0] === t.candidatura.outfunds__Applying_Organization__r.Regione__c)[0][3]+1;
                }
                else if (t.Esito__c==='Negativo'){
                    result.filter(row => row[0] === t.candidatura.outfunds__Applying_Organization__r.Regione__c)[0][4]=result.filter(row => row[0] === t.candidatura.outfunds__Applying_Organization__r.Regione__c)[0][4]+1;
                }
            }
        });
        return result;
        /*

       // return [["Area","Valore"],["AA",22],["BB",33]];
        let reduced = [{ Regione__c: "Regione", count: "Numero" , style: { role: "style" } }]
        .concat(
            Object.values(
                data.tasks
                    .filter((t) =>
                        filterArea === aree[0]
                            ? true
                            : t.candidatura.outfunds__Applying_Organization__r
                                  .Area_geografica__c === filterArea
                    ).filter((t) =>
                         t.Esito__c === status
                    )
                    .reduce((b, a) => {
                if (
                    !b[
                        a.candidatura.outfunds__Applying_Organization__r
                            .Regione__c
                    ]
                )
                    b[
                        a.candidatura.outfunds__Applying_Organization__r.Regione__c
                    ] = {
                        Regione__c:
                            a.candidatura.outfunds__Applying_Organization__r
                                .Regione__c,
                        count: 1,
                        style: "color: green"
                    };
                else
                    b[
                        a.candidatura.outfunds__Applying_Organization__r
                            .Regione__c
                    ].count++;
                return b;
            }, {})
            )
        )
        .map((e) => [e.Regione__c, e.count]);

        return reduced;
       */
    }

    $: dataforpie = [{ Esito__c: "Esito", count: "Numero task" }]
        .concat(
            Object.values(
                data.tasks
                    .filter((t) =>
                        filterArea === aree[0]
                            ? true
                            : t.candidatura.outfunds__Applying_Organization__r
                                  .Area_geografica__c === filterArea
                    )

                    .reduce((a, { Esito__c, candidatura }) => {
                        a[Esito__c] = a[Esito__c] || {
                            Esito__c,
                            count: 0,
                        };
                        if (showEuro) {
                            a[Esito__c].count =
                                a[Esito__c].count +
                                candidatura.outfunds__Awarded_Amount__c;
                        } else {
                            a[Esito__c].count++;
                        }
                        return a;
                    }, Object.create(null))
            )
        )
        .map((e) => [e.Esito__c, e.count]);

    let aree = ["Tutte le aree"].concat(
        Object.values(
            data.tasks.reduce((b, a) => {
                if (
                    !b[
                        a.candidatura.outfunds__Applying_Organization__r
                            .Area_geografica__c
                    ]
                )
                    b[
                        a.candidatura.outfunds__Applying_Organization__r.Area_geografica__c
                    ] = {
                        Area_geografica__c:
                            a.candidatura.outfunds__Applying_Organization__r
                                .Area_geografica__c,
                        count: 1,
                    };
                else
                    b[
                        a.candidatura.outfunds__Applying_Organization__r
                            .Area_geografica__c
                    ].count++;
                return b;
            }, {})
        )
            .map((x) => x.Area_geografica__c)
            .sort()
    );

    let filterArea = aree[0];

    let showEuro = false;
</script>

<Header title="cruscotto asseverazioni" />

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
                        <div class="field">
                            <input
                                id="switchUnit"
                                type="checkbox"
                                name="switchUnit"
                                class="switch is-info"
                                bind:checked={showEuro}
                            />
                            <label for="switchUnit">Mostra EURO</label>
                        </div>
                    </div>
                </div>

                <div class="level-item">
                    <div class="control">
                        <div class="select is-primary" id="idfiltroarea">
                            <select bind:value={filterArea}>
                                {#each aree as item}
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

<section class="section is-12 px-0 py-0">
    <div class="hero-body py-0">
        <div class="columns">
            <div class="column is-3 has-text-centered">
                <Scorecard
                    score={dataforpie.filter((t) => t[0] === "Positivo")
                        .length > 0
                        ? showEuro
                            ? euro(
                                  dataforpie.filter(
                                      (t) => t[0] === "Positivo"
                                  )[0][1]
                              )
                            : unit(
                                  dataforpie.filter(
                                      (t) => t[0] === "Positivo"
                                  )[0][1]
                              )
                        : showEuro
                        ? euro(0)
                        : 0}
                    label="Positivo"
                    color="success"
                />
            </div>
            <div class="column is-3 has-text-centered">
                <Scorecard
                    score={dataforpie.filter((t) => t[0] === "In lavorazione")
                        .length > 0
                        ? showEuro
                            ? euro(
                                  dataforpie.filter(
                                      (t) => t[0] === "In lavorazione"
                                  )[0][1]
                              )
                            : unit(
                                  dataforpie.filter(
                                      (t) => t[0] === "In lavorazione"
                                  )[0][1]
                              )
                        : showEuro
                        ? euro(0)
                        : 0}
                    label="In lavorazione"
                    color="info"
                />
            </div>
            <div class="column is-3 has-text-centered">
                <Scorecard
                    score={dataforpie.filter((t) => t[0] === "Parziale")
                        .length > 0
                        ? showEuro
                            ? euro(
                                  dataforpie.filter(
                                      (t) => t[0] === "Parziale"
                                  )[0][1]
                              )
                            : unit(
                                  dataforpie.filter(
                                      (t) => t[0] === "Parziale"
                                  )[0][1]
                              )
                        : showEuro
                        ? euro(0)
                        : 0}
                    label="Parziale"
                    color="warning"
                />
            </div>
            <div class="column is-3 has-text-centered">
                <Scorecard
                    score={dataforpie.filter((t) => t[0] === "Negativo")
                        .length > 0
                        ? showEuro
                            ? euro(
                                  dataforpie.filter(
                                      (t) => t[0] === "Negativo"
                                  )[0][1]
                              )
                            : unit(
                                  dataforpie.filter(
                                      (t) => t[0] === "Negativo"
                                  )[0][1]
                              )
                        : showEuro
                        ? euro(0)
                        : 0}
                    label="Negativo"
                    color="danger"
                />
            </div>
        </div>
    </div>
</section>

<section class="hero is.large is-12 px-0 py-0">
    <div class="hero-body py-0">
        <div class="columns">
            <div class="column is-full has-text-centered">
                <Stackedbar
                    id="chart-positivo"
                    values={dataforbars("Positivo")}
                />
            </div>
        </div>
    </div>
</section>
