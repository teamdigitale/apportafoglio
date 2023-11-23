<script>
    export let misura;
    import moment from "moment/min/moment-with-locales";
    moment.locale("it");
</script>

<div class="card bm--card-equal-height has-background-grey-lighter">
    <header class="card-header has-background-info">
        <p class="card-header-title">
            {misura.Name}
        </p>
    </header>
    <div class="card-content">
        <p>
            <span class="has-text-weight-bold mx-2">Stato:</span><span
                >{misura.outfunds__Status__c}</span
            >
        </p>
        <p>
            <span class="has-text-weight-bold mx-2">Data avvio:</span><span
                >{moment(misura.outfunds__Start_Date__c,'YYYY-MM-DD').format('DD/MM/YYYY')}</span
            >
        </p>
        <p>
            <span class="has-text-weight-bold mx-2">Data termine:</span><span
                >{moment(misura.outfunds__End_Date__c,'YYYY-MM-DD').format('DD/MM/YYYY')}</span
            >
        </p>
        <p>
            <span class="has-text-weight-bold mx-2">Valore:</span><span>
                {misura.outfunds__Total_Program_Amount__c
                    ? Intl.NumberFormat("it-IT", {
                          style: "currency",
                          currency: "EUR",
                      }).format(misura.outfunds__Total_Program_Amount__c)
                    : "Non applicabile. Fare riferimento alle misure di pertinenza."}
            </span>
        </p>
    </div>

    <footer class="card-footer">
        <p class="card-footer-item is-size-6">
            <span>
                <a href="/plain/avvisi/{misura.Id}">Avvisi relativi</a>
            </span>
        </p>
    </footer>
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
