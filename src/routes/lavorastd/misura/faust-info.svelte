<script>
    import Gauge from "../../../c/charts/gauge.svelte";
    import moment from "moment/min/moment-with-locales";
    moment.locale("it");

    export let scenario;
    export let candidature;
    export let enti;

    let focusedMisura = "";

    let misure = Object.values(
        candidature.reduce((a, { Misura__c }) => {
            a[Misura__c] = a[Misura__c] || {
                Misura__c,
                count: 0,
            };
            a[Misura__c].count++;
            return a;
        }, Object.create(null))
    )
        .map((x) => x.Misura__c)
        .sort();

    $: cpercontratt = candidature
        .filter(
            (x) =>
                (focusedMisura===''?true:x.Misura__c===focusedMisura) &&
                x.outfunds__Status__c === "FINANZIATA" &&
                x.Stato_contrattualizzazione__c !== "Completata"
        )
        
        .sort(
            (a, b) =>{
                if(a.reqcontr.outfunds__Status__c!='Rejected'&&b.reqcontr.outfunds__Status__c!='Rejected'){return (
                new Date(a.reqcontr.outfunds__Due_Date__c) -
                new Date(b.reqcontr.outfunds__Due_Date__c))
                }else{
                    if(a.reqcontr.outfunds__Status__c!='Rejected'){
                        return -1;
                    }else{
                        return 1;
                    }
                }

            }
        );
        
        

    let togglefocalizza = (m) => {
        if (focusedMisura == "") {
            focusedMisura = m;
        } else {
            focusedMisura = "";
        }
    };


    $: cpercompl = candidature
        .filter(
            (x) =>
                x.outfunds__Status__c === "FINANZIATA"  
                && (focusedMisura===''?true:x.Misura__c===focusedMisura)
                && x.Stato_contrattualizzazione__c === "Completata" &&
                                            ("COMPLETATO" !==
                                                x.Stato_Progetto__c &&
                                                "IN VERIFICA" !==
                                                    x.Stato_Progetto__c &&
                                                "IN LIQUIDAZIONE" !==
                                                    x.Stato_Progetto__c &&
                                                "LIQUIDATO" !==
                                                    x.Stato_Progetto__c)
        ).sort(
            (a, b) =>
                new Date(a.reqcompl.outfunds__Due_Date__c) -
                new Date(b.reqcompl.outfunds__Due_Date__c)
        );




</script>

{#if scenario === "Devono contrattualizzare"}
    <section class="section is-12 px-0">
        <div class="columns is-multiline">
            {#each misure.filter( (x) => (focusedMisura == "" ? true : x === focusedMisura) ) as m}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div
                    class="have-pointer column {focusedMisura == ''
                        ? 'is-one-third'
                        : 'is-full'}"
                    on:click={togglefocalizza(m)}
                >
                    <p>
                        <Gauge
                            title={m}
                            label=""
                            valueLabel="Contrattualizzazioni eseguite"
                            maxvalueLabel="su un totale di"
                            maxvalue={candidature
                                .filter((x) => x.Misura__c === m)
                                .filter(
                                    (x) =>
                                        x.outfunds__Status__c === "FINANZIATA"
                                ).length}
                            value={(candidature
                                .filter((x) => x.Misura__c === m)
                                .filter(
                                    (x) =>
                                        x.outfunds__Status__c ===
                                            "FINANZIATA" &&
                                        x.Stato_contrattualizzazione__c ===
                                            "Completata"
                                ).length)}
                            pvalue={Math.round(
                                (candidature
                                    .filter((x) => x.Misura__c === m)
                                    .filter(
                                        (x) =>
                                            x.outfunds__Status__c ===
                                                "FINANZIATA" &&
                                            x.Stato_contrattualizzazione__c ===
                                                "Completata"
                                    ).length /
                                    candidature
                                        .filter((x) => x.Misura__c === m)
                                        .filter(
                                            (x) =>
                                                x.outfunds__Status__c ===
                                                "FINANZIATA"
                                        ).length) *
                                    100
                            )}
                        >
                            <span slot="moreinfo">
                                {#if candidature
                                    .filter((x) => x.Misura__c === m)
                                    .filter((x) => x.reqcontr && x.reqcontr.Urgenza__c).length > 0}
                                    <p class="subtitle is-6 has-text-danger">
                                        Da fare urgentemente
                                    </p>
                                    <p class="title is-4 has-text-danger">
                                        {candidature
                                            .filter((x) => x.Misura__c === m && (focusedMisura == "" ? true : x.Misura__c == focusedMisura) )
                                            .filter(
                                                (x) =>
                                                    x.reqcontr &&
                                                    x.reqcontr.Urgenza__c
                                            ).length}
                                    </p>
                                {/if}

                                {#if candidature
                                    .filter((x) => x.Misura__c === m)
                                    .filter((x) => x.reqcontr && new Date(x.reqcontr.outfunds__Due_Date__c).getDate() - new Date().getDate() - 1 < 30).length > 0}
                                    <p class="subtitle is-6 has-text-info">
                                        Da fare entro 30 giorni
                                    </p>
                                    <p class="title is-4 has-text-info">
                                        {candidature
                                            .filter((x) => x.Misura__c === m)
                                            .filter(
                                                (x) =>
                                                    x.reqcontr &&
                                                    new Date(
                                                        x.reqcontr.outfunds__Due_Date__c
                                                    ).getDate() -
                                                        new Date().getDate() -
                                                        1 <
                                                        30
                                            ).length}
                                    </p>
                                {/if}

                                {#if candidature
                                    .filter((x) => x.Misura__c === m)
                                    .filter((x) => x.reqcontr && x.reqcontr.outfunds__Status__c =='Rejected').length>0}
                                    <p class="subtitle is-6 has-text-grey">
                                        Scadute
                                    </p>
                                    <p class="title is-4 has-text-grey">
                                        {candidature
                                            .filter((x) => x.Misura__c === m)
                                            .filter(
                                                (x) =>
                                                x.reqcontr && x.reqcontr.outfunds__Status__c =='Rejected'
                                            ).length}
                                    </p>
                                {/if}

                            </span>
                        </Gauge>
                    </p>
                </div>
            {/each}
        </div>
    </section>

    <section class="section is-12 p-2">
        <table class="table is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>Urgente</th>
                    <th>Misura</th>
                    <th>Ente</th>
                    <th>CUP</th>
                    <th>Scadenza</th>
                    <th>Richiesta variazione cronoprogramma</th>
                    <th>GG richiesti</th>
                    <th>Approvazione automatica</th>
                    <th>Stato</th>
                    <th>Motivazione rifiuto</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each cpercontratt.filter( (x) => (focusedMisura == "" ? true : x.Misura__c == focusedMisura) ) as c}
                    <tr>
                        <td>
                            {#if c.reqcontr && c.reqcontr.Urgenza__c}
                                <span class="icon is-small has-text-danger">
                                    <i class="fas fa-exclamation" />
                                </span>
                            {:else}{/if}
                        </td>
                        <td>{c.Misura__c}</td>
                        
                        <td
                            >{enti.filter(
                                (x) =>
                                    x.Id ===
                                    c.outfunds__Applying_Organization__c
                            )[0].Name}</td
                        >
                        <td>{c.Codice_CUP__c}</td>
                        <td
                            class={c.reqcontr && c.reqcontr.Urgenza__c
                                ? "has-text-danger has-text-weight-bold"
                                : ""}
                            >{c.reqcontr
                                ? moment(
                                      c.reqcontr.outfunds__Due_Date__c
                                  ).format("DD/MM/YYYY") +
                                  " (" +
                                  moment(c.reqcontr.outfunds__Due_Date__c)
                                      .startOf("day")
                                      .fromNow() +
                                  ")"
                                : "n.d."}</td
                        >
                        <td
                            class={c.reqcontr && c.reqcontr.Urgenza__c 
                                ? "has-text-danger has-text-weight-bold"
                                : ""}
                            >  {c.reqcontr  && c.reqcontr.task && c.reqcontr.task?"SI":"NO"
                                }</td
                        >

                        
                        
                        <td>{c.reqcontr  && c.reqcontr.task && c.reqcontr.task &&c.reqcontr.task.Giorni_richiesti__c?c.reqcontr.task.Giorni_richiesti__c:"n.d."
                        }</td>
                        
                        
                        <td>{c.reqcontr  && c.reqcontr.task && c.reqcontr.task &&c.reqcontr.task.Approvazione_Automatica__c?"SI":"NO"
                        }</td>
<td>{c.reqcontr  && c.reqcontr.task && c.reqcontr.task &&c.reqcontr.task.Status?c.reqcontr.task.Status:"n.d."
}</td>
<td>{c.reqcontr  && c.reqcontr.task && c.reqcontr.task &&c.reqcontr.task.Motivazione_Rifiuto__c?c.reqcontr.task.Motivazione_Rifiuto__c:"n.d."
}</td>
<td><a href="/candidatura/{c.Id}" target="_blank"><span class="icon"><i class="fas fa-glasses">&nbsp</i></span></a></td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </section>
{:else if scenario === "Devono completare il progetto"}
    <section class="section is-12 px-0">
        <div class="columns is-multiline">
            {#each misure.filter( (x) => (focusedMisura == "" ? true : x === focusedMisura) ) as m}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div
                    class="have-pointer column {focusedMisura == ''
                        ? 'is-one-third'
                        : 'is-full'}"
                    on:click={togglefocalizza(m)}
                >
                    <p>
                        <Gauge
                            title={m}
                            label=""
                            valueLabel="Progetti completati"
                            maxvalueLabel="su un totale di progetti"
                            maxvalue={candidature
                                .filter((x) => x.Misura__c === m)
                                .filter(
                                    (x) =>
                                        x.outfunds__Status__c === "FINANZIATA"
                                ).length}
                            value={candidature
                                .filter((x) => x.Misura__c === m)
                                .filter(
                                    (x) =>
                                        x.outfunds__Status__c ===
                                            "FINANZIATA" && x.Stato_contrattualizzazione__c === "Completata" &&
                                        ("COMPLETATO" === x.Stato_Progetto__c ||
                                            "IN VERIFICA" ===
                                                x.Stato_Progetto__c ||
                                            "IN LIQUIDAZIONE" ===
                                                x.Stato_Progetto__c ||
                                            "LIQUIDATO" === x.Stato_Progetto__c)
                                ).length}
                            pvalue={Math.round(
                                (candidature
                                    .filter((x) => x.Misura__c === m)
                                    .filter(
                                        (x) =>
                                            x.outfunds__Status__c ===
                                                "FINANZIATA" && x.Stato_contrattualizzazione__c === "Completata" &&
                                            ("COMPLETATO" ===
                                                x.Stato_Progetto__c ||
                                                "IN VERIFICA" ===
                                                    x.Stato_Progetto__c ||
                                                "IN LIQUIDAZIONE" ===
                                                    x.Stato_Progetto__c ||
                                                "LIQUIDATO" ===
                                                    x.Stato_Progetto__c)
                                    ).length /
                                    candidature
                                        .filter((x) => x.Misura__c === m)
                                        .filter(
                                            (x) =>
                                                x.outfunds__Status__c ===
                                                "FINANZIATA"
                                        ).length) *
                                    100
                            )}
                        >
                            <span slot="moreinfo">
                                {#if candidature
                                    .filter((x) => x.Misura__c === m)
                                    .filter((x) => x.reqcompl && x.reqcompl.Urgenza__c).length > 0}
                                    <p class="subtitle is-6 has-text-danger">
                                        Da fare urgentemente
                                    </p>
                                    <p class="title is-4 has-text-danger">
                                        {candidature
                                            .filter((x) => x.Misura__c === m && (focusedMisura == "" ? true : x.Misura__c == focusedMisura) )
                                            .filter(
                                                (x) =>
                                                    x.reqcompl &&
                                                    x.reqcompl.Urgenza__c  && new Date(x.reqcompl.outfunds__Due_Date__c).getDate() > new Date().getDate()
                                            ).length}
                                    </p>
                                {/if}

                                {#if candidature
                                    .filter((x) => x.Misura__c === m)
                                    .filter((x) => x.reqcompl && new Date(x.reqcompl.outfunds__Due_Date__c).getDate() - new Date().getDate() - 1 < 30).length > 0}
                                    <p class="subtitle is-6 has-text-info">
                                        Da fare entro 30 giorni
                                    </p>
                                    <p class="title is-4 has-text-info">
                                        {candidature
                                            .filter((x) => x.Misura__c === m)
                                            .filter(
                                                (x) =>
                                                    x.reqcompl &&
                                                    new Date(
                                                        x.reqcompl.outfunds__Due_Date__c
                                                    ).getDate() -
                                                        new Date().getDate() -
                                                        1 <
                                                        30
                                            ).length}
                                    </p>
                                {/if}
                            </span>
                        </Gauge>
                    </p>
                </div>
            {/each}
        </div>
    </section>
    <section class="section is-12 p-2">
        <table class="table is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>Urgente</th>
                    <th>Misura</th>
                    <th>Ente</th>
                    <th>CUP</th>
                    <th>Scadenza</th>
                    <th>Richiesta variazione cronoprogramma</th>
                    <th>GG richiesti</th>
                    <th>Approvazione automatica</th>
                    <th>Stato</th>
                    <th>Motivazione rifiuto</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each cpercompl.filter( (x) => (focusedMisura == "" ? true : x.Misura__c == focusedMisura) ) as c}
                    <tr>
                        <td>
                            {#if c.reqcompl && c.reqcompl.Urgenza__c}
                                <span class="icon is-small has-text-danger">
                                    <i class="fas fa-exclamation" />
                                </span>
                            {:else}{/if}
                        </td>
                        <td>{c.Misura__c}</td>
                        <td
                            >{enti.filter(
                                (x) =>
                                    x.Id ===
                                    c.outfunds__Applying_Organization__c
                            )[0].Name}</td
                        >
                        <td>{c.Codice_CUP__c}</td>
                        <td
                            class={c.reqcompl && c.reqcompl.Urgenza__c
                                ? "has-text-danger has-text-weight-bold"
                                : ""}
                            >{c.reqcompl
                                ? moment(
                                      c.reqcompl.outfunds__Due_Date__c
                                  ).format("DD/MM/YYYY") +
                                  " (" +
                                  moment(c.reqcompl.outfunds__Due_Date__c)
                                      .startOf("day")
                                      .fromNow() +
                                  ")"
                                : "n.d."}</td
                        >
                        <td
                            class={c.reqcompl && c.reqcompl.Urgenza__c 
                                ? "has-text-danger has-text-weight-bold"
                                : ""}
                            >  {c.reqcompl  && c.reqcompl.task && c.reqcompl.task?"SI":"NO"
                                }</td
                        >

                        
                        
                        <td>{c.reqcompl  && c.reqcompl.task && c.reqcompl.task &&c.reqcompl.task.Giorni_richiesti__c?c.reqcompl.task.Giorni_richiesti__c:"n.d."
                        }</td>
                        
                        
                        <td>{c.reqcompl  && c.reqcompl.task && c.reqcompl.task &&c.reqcompl.task.Approvazione_Automatica__c?"SI":"NO"
                        }</td>
<td>{c.reqcompl  && c.reqcompl.task && c.reqcompl.task &&c.reqcompl.task.Status?c.reqcompl.task.Status:"n.d."
}</td>
<td>{c.reqcompl  && c.reqcompl.task && c.reqcompl.task &&c.reqcompl.task.Motivazione_Rifiuto__c?c.reqcompl.task.Motivazione_Rifiuto__c:"n.d."
}</td>
                        
<td><a href="/candidatura/{c.Id}" target="_blank"><span class="icon"><i class="fas fa-glasses">&nbsp</i></span></a></td>

                        
                    </tr>
                {/each}
            </tbody>
        </table>
    </section>
{/if}

<style>
    .have-pointer:hover {
        cursor: pointer;
    }
    .bm--card-equal-height {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .bm--card-equal-height .card-footer {
        margin-top: auto;
    }
</style>
