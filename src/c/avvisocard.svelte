<script>
    export let avviso;
    import moment from "moment/min/moment-with-locales";
    moment.locale("it");
</script>

<div class="card bm--card-equal-height has-background-grey-lighter">
    <header
        class={avviso.outfunds__Status__c === "PUBBLICATO"
            ? "has-background-info"
            : "has-background-danger"}
    >
        <p class="card-header-title">
            {avviso.Name}
        </p>
    </header>
    <div class="card-content">
        {#if avviso.beneficiari}
            <div class="tags">
                {#each avviso.beneficiari as b}
                    <span class="tag is-dark">{b}</span>
                {/each}
            </div>
        {/if}
        <p>
            <span class="has-text-weight-bold mx-2">Stato:</span><span
                class="{avviso.outfunds__Status__c === 'PUBBLICATO'
                    ? 'has-text-info'
                    : 'has-text-danger'} has-text-weight-bold"
                >{avviso.outfunds__Status__c}</span
            >
        </p>
        {#if avviso.Pacchetto__c}
            <p>
                <span class="has-text-weight-bold mx-2">Pacchetto:</span><span
                    >{avviso.Pacchetto__c}</span
                >
            </p>
        {/if}

        <p>
            <span class="has-text-weight-bold mx-2">Data termine:</span><span
                >{moment(avviso.outfunds__End_Date__c).format(
                    "DD/MM/YYYY"
                )}</span
            >
            {#if avviso.outfunds__Status__c === "PUBBLICATO"}
                <span class="has-text-weight-bold has-text-danger"
                    >({moment(avviso.outfunds__End_Date__c)
                        .endOf("day")
                        .fromNow()})</span
                >
            {/if}
        </p>
        <p>
            <span class="has-text-weight-bold mx-2">Data avvio:</span><span
                >{moment(avviso.outfunds__Start_Date__c).format(
                    "DD/MM/YYYY"
                )}</span
            >
        </p>
        <p>
            <span class="has-text-weight-bold mx-2">Valore:</span><span
                >{Intl.NumberFormat("it-IT", {
                    style: "currency",
                    currency: "EUR",
                }).format(avviso.outfunds__Total_Program_Amount__c)}</span
            >
        </p>
        <p>
            <span class="has-text-weight-bold mx-2">Fondi disponibili:</span
            ><span
                >{Intl.NumberFormat("it-IT", {
                    style: "currency",
                    currency: "EUR",
                }).format(avviso.Fondi_disponibili__c)}</span
            >
        </p>
        <p>
            <span class="has-text-weight-bold mx-2">Oggetto:</span><span
                >{avviso.Oggetto_Avviso__c}</span
            >
        </p>
    </div>
</div>

<style>
    .bm--card-equal-height {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .bm--card-equal-height .card-footer {
        margin-top: auto;
    }
</style>
