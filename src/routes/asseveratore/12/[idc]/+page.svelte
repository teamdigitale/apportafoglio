<script>
    export let data;
    import moment from "moment/min/moment-with-locales";
    moment.locale("it");
</script>

<section class="section is-12 p-2">
    <h1 class="title has-text-info">servizi</h1>
    <table class="table is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
            <tr>
                <th />
                <th>Nome</th>
                <th>Destinazione</th>
                <th>Modalità di migrazione</th>
                <th>Stato avanzamento</th>
                <th>Data attivazione CSP</th>
                <th>Data inizio migrazione</th>
                <th>Data rilascio in esercizio</th>
                <th>Data completamento</th>
            </tr>
        </thead>
        <tbody>
            {#each data.servizi as servizio, index}
                <tr>
                    <td>{index + 1}</td>
                    <td>{servizio.Name}</td>
                    <td>{servizio.Destinazione__c}</td>
                    <td
                        >{servizio.Modalita_di_Migrazione__c +
                            (servizio.Cambio_modalit_migrazione__c
                                ? "(modificata)"
                                : "")}</td
                    >
                    <td>{servizio.Stato_Attivit__c}</td>
                    <td
                        >{moment(
                            servizio.Data_Attivazione_CSP__c,
                            "YYYY-MM-DD"
                        ).format("DD/MM/YYYY")}</td
                    >
                    <td
                        >{moment(
                            servizio.Data_Inizio_Migrazione__c,
                            "YYYY-MM-DD"
                        ).format("DD/MM/YYYY")}</td
                    >
                    <td
                        >{moment(
                            servizio.Data_Rilascio_esercizio__c,
                            "YYYY-MM-DD"
                        ).format("DD/MM/YYYY")}</td
                    >
                    <td
                        >{moment(
                            servizio.Data_di_completamento__c,
                            "YYYY-MM-DD"
                        ).format("DD/MM/YYYY")}</td
                    >
                </tr>
            {/each}
        </tbody>
    </table>
</section>

<section class="section is-12 p-2">
    <h1 class="title has-text-info">conformità</h1>
    <table class="table is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
            <tr>
                <th />
                <th>Nome</th>
                <th>Sistema di origine</th>
                <th>Sistema di destinazione</th>
                <th>Soluzione SaaS adottata</th>
                <th>Scheda ACN</th>
                <th>URL del servizio</th>
                <th>Numero utenti</th>
                <th>Attivo in produzione</th>
                <th>Note su attivazione in produzione</th>
                <th>Dati migrati</th>
                <th>Note su migrazione dati</th>
            </tr>
        </thead>
        <tbody>
            {#each data.servizi as servizio, index}
                <tr>
                    <td>{index + 1}</td>
                    <td>{servizio.Name}</td>
                    <td>{servizio.Sistema_di_origine__c}</td>
                    <td>{servizio.Destinazione_Cloud__c}</td>
                    <td class="is-size-6"
                        >{servizio.Soluzione_SaaS_adottata__c}</td
                    >
                    <td>
                        {#if servizio.Destinazione_Cloud__c === "SaaS"}
                        <a target="_blank" href="{data.fornitoriSaaS.filter(
                            (fs) => fs.Servizio__c === servizio.Id
                        )[0].URL_Fornitore__c}">{data.fornitoriSaaS.filter(
                                (fs) => fs.Servizio__c === servizio.Id
                            )[0].URL_Fornitore__c}</a>
                        
                        {:else if servizio.Destinazione_Cloud__c === "PaaS"}
                        <a target="_blank" href="{data.fornitoriPaaS.filter(
                            (fs) => fs.Servizio__c === servizio.Id
                        )[0].URL_Fornitore__c}">{data.fornitoriPaaS.filter(
                                (fs) => fs.Servizio__c === servizio.Id
                            )[0].URL_Fornitore__c}</a>
                        {:else}
                            n.a.
                        {/if}
                    </td>
                    <td>{servizio.Visibilit_del_servizio__c}</td>
                    <td>{servizio.Numero_utenti__c}</td>
                    <td
                        >{servizio.Attivazione_in_produzione__c
                            ? "SI"
                            : "NO"}</td
                    >
                    <td
                        >{servizio.Attivazione_in_produzione_motivazione__c
                            ? servizio.Attivazione_in_produzione_motivazione__c
                            : "n.d."}</td
                    >
                    <td
                        >{servizio.Completezza_della_migrazione_dei_dati__c
                            ? "SI"
                            : "NO"}</td
                    >
                    <td
                        >{servizio.Completezza_migrazione_dati_motivazione__c
                            ? servizio.Completezza_migrazione_dati_motivazione__c
                            : "n.d."}</td
                    >
                </tr>
            {/each}
        </tbody>
    </table>
</section>
