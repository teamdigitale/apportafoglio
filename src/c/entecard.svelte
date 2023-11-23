<script>
    export let ente;
</script>

<div class="card bm--card-equal-height has-background-grey-lighter">
    <header
        class="card-header {ente.Active__c && ente.Active__c == 1
            ? "has-background-info"
            : "has-background-danger"}"
    >
        <nav class="level">
            <!-- Left side -->
            <div class="level-left">
                <div class="level-item">
                    <p class="card-header-title">
                        {ente.Name}
                    </p>
                </div>
            </div>
        </nav>
    </header>
    <div class="card-content">
        <p>
            <span class="has-text-weight-bold mx-2">Portafoglio:</span
            >{#if ente.portafoglio === "Asseveratore"}
                <span class="icon is-small is-left">
                    <i class="fas fa-user-shield" />
                </span>
            {:else}
                <span class="icon is-small is-left">
                    <i class="fas fa-user-tie" />
                </span>
            {/if}

            <span class="mx-2">{ente.portafoglio}</span>
        </p>
        <p>
            <span class="has-text-weight-bold mx-2">Tipologia ente:</span><span
                >{ente.Tipologia_Ente__c}</span
            >
        </p>
        <p>
            <span class="has-text-weight-bold mx-2">Regione:</span><span
                >{ente.Regione__c}</span
            >
        </p>
        <p>
            <span class="has-text-weight-bold mx-2">Provincia:</span><span
                >{ente.ShippingState}</span
            >
        </p>
        <p>
            <span class="has-text-weight-bold mx-2">Comune:</span><span
                >{ente.ShippingCity}</span
            >
        </p>
        <p>
            <span class="has-text-weight-bold mx-2">Indirizzo:</span><span
                >{ente.ShippingStreet}</span
            >
        </p>

        <p>
            <span class="has-text-weight-bold mx-2">PEC:</span><span
                ><a href="mailto:{ente.PEC__c}">{ente.PEC__c}</a></span
            >
        </p>
        <!--
                        <p>
                            <span class="has-text-weight-bold mx-2"
                                >WWW:</span
                            ><span>{ente.Website}</span>
                        </p>
                        -->
        <p>
            <span class="has-text-weight-bold mx-2">Responsabile:</span><span
                class="is-uppercase"
                >{ente.Nome_responsabile__c}
                {ente.Cognome_responsabile__c} ({ente.Titolo_responsabile__c})</span
            >
        </p>
    </div>
    <!--
                    <footer class="card-footer">
                        <p class="card-footer-item is-size-6">
                            <span>
                                <a href="/plain/avvisi/{misura.Id}"
                                    >Avvisi relativi</a
                                >
                            </span>
                        </p>
                    </footer>
                    -->
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
