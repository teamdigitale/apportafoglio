<script>
    // @ts-nocheck
    export let data;
    import moment from "moment/min/moment-with-locales";
    moment.locale("it");
    import { onMount } from "svelte";
    import Pie from "../../../c/charts/pie.svelte";
    import Accordion from "../../../c/accordion.svelte";

    let solocomuni = false;

    $: avvisif = data.avvisiappio.filter((a) =>
        !solocomuni ? true : a.beneficiari.indexOf("COMUNI") > -1
    );

    $: advf = data.adv.filter((a) =>
        !solocomuni
            ? true
            : a.outfunds__Applying_Organization__r.Tipologia_Ente__c ===
              "Comuni"
    );

    $: ids = Object.values(
            advf.reduce((a, { Id }) => {
                a[Id] = a[
                    Id
                ] || {
                    Id,
                    count: 0,
                };
                a[Id].count++;
                return a;
            }, Object.create(null))
        ).map(z => z.Id);

    $: datigrafico = data.datigrafico.filter((a) =>
        !solocomuni
            ? true
            : a.outfunds__Applying_Organization__r.Tipologia_Ente__c ===
              "Comuni"
    );

    function removeTime(date = new Date()) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    const getDaysArray = function (start, end) {
        for (
            var arr = [], dt = new Date(start);
            dt <= new Date(end);
            dt.setDate(dt.getDate() + 1)
        ) {
            arr.push(new Date(dt));
        }
        return arr;
    };

    function calcolaDatiGraficoLinee() {
        let result = [["Giorno", "FINANZIATE"]];
        let days = getDaysArray(avvisif[0].outfunds__Start_Date__c, new Date());
        days.forEach((d) => {
            let dd = moment(d).format("MM/YYYY");
            result.push([
                moment(d).format("MM/YYYY"),
                datigrafico.filter(
                    (dg) => moment(dg.LastModifiedDate).format("MM/YYYY") === dd
                )
                    ? datigrafico.filter(
                          (dg) =>
                              moment(dg.LastModifiedDate).format("MM/YYYY") ===
                              dd
                      ).length
                    : 0,
            ]);
        });
    }

    function calcolaDatiGraficoTorta() {
        let esiti = Object.values(
            advf.reduce((a, { Esito_campagna_duplicato_143_appIO__c }) => {
                a[Esito_campagna_duplicato_143_appIO__c] = a[
                    Esito_campagna_duplicato_143_appIO__c
                ] || {
                    Esito_campagna_duplicato_143_appIO__c,
                    count: 0,
                };
                a[Esito_campagna_duplicato_143_appIO__c].count++;
                return a;
            }, Object.create(null))
        );
        let data = [["Esito verifica", "Numero candidature"]];
        esiti.forEach((a) => {
            data.push([
                a.Esito_campagna_duplicato_143_appIO__c
                    ? a.Esito_campagna_duplicato_143_appIO__c
                    : "Validi",
                a.count ? a.count : 0,
            ]);
        });
        return data;
    }

    

    onMount(async () => {console.log(data.rdm.filter( (r) => advf.filter((a) => r.Progetto_da_modificare__c === a.Id ) && r.outfunds__Status__c==='In valutazione' ))});
</script>

<section class="hero is-small is-info is-12">
    <div class="hero-body">
        <p class="title my-0">Campagna qualità app IO</p>
        <p class="my-1 mx-5 is-size-6">
            <i
                >"Qualità significa fare le cose bene quando nessuno ti sta
                guardando."</i
            >&nbsp;&nbsp;[Henry Ford]
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

                <div class="level-item has-text-centered">
                    <div>
                        <div class="field">
                            <input
                                id="switchsolocomuni"
                                type="checkbox"
                                name="switchsolocomuni"
                                class="switch"
                                bind:checked={solocomuni}
                            />
                            <label for="switchsolocomuni">Solo Comuni</label>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</section>

<section class="hero is-small is-12">
    <div class="hero-body">
        <ul class="steps is-balanced">
            {#each avvisif as avviso, index}
                <li
                    class="steps-segment {index === avvisif.length - 1
                        ? 'is-dashed is-active'
                        : ''}"
                >
                    <span
                        class="steps-marker has-tooltip-arrow {avviso.outfunds__Status__c ===
                        'PUBBLICATO'
                            ? 'has-tooltip-success is-success'
                            : 'has-tooltip-danger is-danger'}"
                        data-tooltip={avviso.outfunds__Status__c}
                    >
                        <span class="icon">
                            <i
                                class="fas fa-lock{avviso.outfunds__Status__c ===
                                'PUBBLICATO'
                                    ? '-open'
                                    : ''}"
                            />
                        </span>
                    </span>
                    <div class="steps-content has-text-left">
                        <p>
                            <b>Data avvio: </b>{moment(
                                avviso.outfunds__Start_Date__c
                            ).format("DD/MM/YYYY")}
                        </p>
                        <p>
                            <b>Data termine: </b>{moment(
                                avviso.outfunds__End_Date__c
                            ).format("DD/MM/YYYY")}
                        </p>
                        <p><b>Beneficiari: </b></p>

                        {#each avviso.beneficiari as b}
                            <p class="is-size-7"><b>{b}</b></p>
                            <div class="field is-grouped is-grouped-multiline">
                                <div class="control">
                                    <div class="tags has-addons">
                                        <span class="tag is-info"
                                            >PLATEA: {data.platee.filter(
                                                (p) =>
                                                    p.idavviso === avviso.Id &&
                                                    p.beneficiario.toUpperCase() ===
                                                        b.toUpperCase()
                                            )[0].plateapotenziale}</span
                                        >
                                        <span class="tag is-success"
                                            >FATTE: {data.platee.filter(
                                                (p) =>
                                                    p.idavviso === avviso.Id &&
                                                    p.beneficiario.toUpperCase() ===
                                                        b.toUpperCase()
                                            )[0].valide}</span
                                        >
                                    </div>
                                </div>
                            </div>
                        {/each}

                        <!--
                        <Stackedbar id="chart-{avviso.Id}" values="{calcolaDatiPerBars(avviso.Id)}" />
                        -->
                    </div>
                </li>
            {/each}
            <li class="steps-segment">
                <span class="steps-marker is-hollow" />
            </li>
        </ul>
    </div>
</section>

<section class="hero is-small is-12">
    <div class="hero-body">
        <h1 class="title is-title-4">Esito analisi dei servizi</h1>
        <Pie values={calcolaDatiGraficoTorta()} id="appio" />
    </div>
</section>

<section class="hero is-small is-12 is-infimy-5">
    <div class="hero-body my-0 py-0">
        <div class="my-3">
            <h1 class="title is-title-6">Su {advf.length} candidature</h1>
        </div>
        {#if advf.filter((a) => (a.Risposta_PEC_143_appIO__c ? true : false))}
            <h2 class="subtitle is-title-5 has-text-danger">
                Hanno inviato "Allegato 2": <b
                    >{advf.filter((a) =>
                        a.Risposta_PEC_143_appIO__c ? true : false
                    ).length}</b
                >
            </h2>
        {/if}
        {#if data.rdm.filter( (r) => ids.indexOf(r.Progetto_da_modificare__c)>-1 )}
            <h2 class="subtitle is-title-5 has-text-info">
                Hanno fatto richiesta di modifica: <b
                    >{data.rdm.filter( (r) => ids.indexOf(r.Progetto_da_modificare__c)>-1 ).length}</b>, di cui:
                
            </h2>

            {#if data.rdm.filter( (r) => (r.outfunds__Status__c==='In valutazione'||r.outfunds__Status__c==='Submitted') && ids.indexOf(r.Progetto_da_modificare__c)>-1 ).length>0}
                <h2 class="subtitle is-title-6 has-text-info">
                    Sono in valutazione: <b
                        >{data.rdm.filter( (r) => (r.outfunds__Status__c==='In valutazione'||r.outfunds__Status__c==='Submitted') && ids.indexOf(r.Progetto_da_modificare__c)>-1 ).length}</b
                    >
                </h2>
            {/if}
            {#if data.rdm.filter( (r) => (r.outfunds__Status__c==='Approvata'||r.outfunds__Status__c==='Close')  && ids.indexOf(r.Progetto_da_modificare__c)>-1 ).length>0 }
                <h2 class="subtitle is-title-6 has-text-success">
                    Sono approvate: <b
                        >{data.rdm.filter( (r) => (r.outfunds__Status__c==='Approvata'||r.outfunds__Status__c==='Close') && ids.indexOf(r.Progetto_da_modificare__c)>-1 ).length}</b
                    >
                </h2>
            {/if}
            {#if data.rdm.filter( (r) => r.outfunds__Status__c==='Rigettata' && ids.indexOf(r.Progetto_da_modificare__c)>-1 ).length>0 }
                <h2 class="subtitle is-title-6 has-text-danger">
                    Sono rigettate: <b
                        >{data.rdm.filter( (r) => r.outfunds__Status__c==='Rigettata' && ids.indexOf(r.Progetto_da_modificare__c)>-1 ).length}</b
                    >
                </h2>
            {/if}
        {/if}
    </div>
</section>

<section class="hero is-small is-12 is-success my-5" />

<section class="section is-12 p-2">
    <table class="table is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
            <tr>    
                <th></th>
                <th class="is-vcentered">Ente</th>
                <th class="is-vcentered">Tipologie Ente</th>
                <th class="is-vcentered">Regione</th>
                <th class="is-vcentered">CUP</th>
                <th class="is-vcentered">Data invio</th>
                <th class="is-vcentered">Esito analisi servizi</th>
                <th class="is-vcentered">Allegato 2</th>
                <th class="is-vcentered">Richiesta modifica</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {#each advf as c,index}
                <tr>
                    <td>{index+1}</td>
                    <td>{c.outfunds__Applying_Organization__r.Name}</td>
                    <td
                        >{c.outfunds__Applying_Organization__r
                            .Tipologia_Ente__c}</td
                    >
                    <td>{c.Regione__c}</td>
                    <td>{c.Codice_CUP__c}</td>
                    <td
                        >{moment(c.Data_invio_candidatura__c).format(
                            "DD/MM/YYYY"
                        )}</td
                    >
                    <td
                        class="has-text-weight-bold {c.Esito_campagna_duplicato_143_appIO__c
                            ? 'has-text-danger'
                            : 'has-text-success'}"
                        >{c.Esito_campagna_duplicato_143_appIO__c
                            ? c.Esito_campagna_duplicato_143_appIO__c
                            : "Validi"}</td
                    >
                    <td>{c.Risposta_PEC_143_appIO__c ? "SI" : "NO"}</td>

                    <td>
                        {data.rdm.filter(r => r.Progetto_da_modificare__c===c.Id).length>0?data.rdm.filter(r => r.Progetto_da_modificare__c===c.Id)[0].outfunds__Status__c
                        :'Non fatta'}
                    </td>
                    <td
                    ><a href="/candidatura/{c.Id}" target="_blank"
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
