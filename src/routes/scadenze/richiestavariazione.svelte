<script>
    // @ts-nocheck

    export let scadenza;
    export let idu;
    import moment from "moment/min/moment-with-locales";
    moment.locale("it");
</script>

<div class="card bm--card-equal-height has-background-grey-lighter">
    <header class="card-header has-background-info">
        <nav class="level">
            <!-- Left side -->
            <div class="level-left">
                <div class="level-item">
                    <p class="card-header-title">
                        {scadenza.outfunds__Funding_Request__r
                            .outfunds__Applying_Organization__r.Name}
                    </p>
                </div>
            </div>
        </nav>
    </header>
    <div class="card-content">
        <p>
            <span class="has-text-weight-bold mx-1 is-size-6">Tipo:</span><span
                class="is-size-6">{scadenza.RecordType.Name}</span
            >
        </p>

        <p>
            <span class="has-text-weight-bold mx-1 is-size-6">Avviso:</span
            ><span class="is-size-6"
                >{scadenza.outfunds__Funding_Request__r
                    .outfunds__FundingProgram__r.Name}</span
            >
        </p>
        <p>
            <span class="has-text-weight-bold mx-1 is-size-6">Richiesta:</span
            ><span class="is-size-6 has-text-info has-text-weight-bold"
                >{scadenza.rv[0].Description}</span
            >
        </p>
        <p>
            <span class="has-text-weight-bold mx-1 is-size-6"
                >Data richiesta:</span
            ><span class="is-size-6"
                >{moment(scadenza.rv[0].Data_richiesta__c, "YYYY-MM-DD").format(
                    "DD/MM/YYYY",
                )}</span
            >
        </p>
        <p>
            <span class="has-text-weight-bold mx-1 is-size-6"
                >Data scadenza:</span
            ><span class="is-size-6"
                >{moment(
                    scadenza.rv[0].Data_scadenza_iniziale__c,
                    "YYYY-MM-DD",
                ).format("DD/MM/YYYY")}
                <span class="has-text-danger"
                    >({moment(
                        scadenza.rv[0].Data_scadenza_iniziale__c,
                        "YYYY-MM-DD",
                    )
                        .add(1, "days")
                        .startOf("day")
                        .fromNow()})</span
                ></span
            >
        </p>
        <p>
            <span class="has-text-weight-bold mx-1 is-size-6"
                >Giorni richiesti:</span
            ><span class="is-size-6">{scadenza.rv[0].Giorni_richiesti__c}</span>
        </p>
        <p >
            {#if scadenza.rv[0].comm && scadenza.rv[0].comm.length > 0}
                {#each scadenza.rv[0].comm as message}
                    {#if message.InsertedById === idu}
                        <div
                            class="notification is-success mx-2 my-2 is-size-6"
                        >
                            <p class="has-text-weight-bold">
                                Il giorno {moment(message.CreatedDate).format(
                                    "DD/MM/YYYY",
                                )} hai scritto:
                            </p>
                            <p class="is-italic">{@html message.Body}</p>
                        </div>
                    {:else}
                        <div class="notification is-info mx-2 my-2 is-size-6">
                            <p class="has-text-weight-bold">
                                Il giorno {moment(message.CreatedDate).format(
                                    "DD/MM/YYYY",
                                )} è stato inserito questo commento:
                            </p>
                            <p>{@html message.Body}</p>
                        </div>
                    {/if}
                {/each}
            {/if}
        </p>
            {#if !scadenza.rv[0].comm || scadenza.rv[0].comm.length === 0 || scadenza.rv[0].comm.filter((c) => c.InsertedById === idu).length === 0}
            <footer class="card-footer">
                
            <div class="card-footer-item notification is-danger is-size-6 my-2">
                    <p class="has-text-weight-bold">
                        Non hai ancora inserito commenti
                    </p>
                    <p>
                        Procedi inserendo su SalesForce il tuo parere relativamente alla
                        richiesta di proroga dell'Ente
                    </p>
                </div>
                </footer>
            {/if}
        
    </div>
</div>

<style>
    .bm--card-equal-height {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
</style>
