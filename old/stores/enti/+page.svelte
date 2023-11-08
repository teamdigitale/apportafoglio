<script>
    import numeral from "numeral";
    if (!numeral.localeData()) {
        numeral.register("locale", "it", {
            delimiters: {
                thousands: ".",
                decimal: ",",
            },
            abbreviations: {
                thousand: "k",
                million: "m",
                billion: "b",
                trillion: "t",
            },
            ordinal: function (number) {
                return "°";
            },
            currency: {
                symbol: "€",
            },
        });
    }
    numeral.locale("it");

    export let data;

    let filterTipologiaEnte = "tutte le tipologie";
    let filterNome = "";

    $: filteredEntiStandard = data.entistandard
        .filter((x) =>
            filterTipologiaEnte == "tutte le tipologie"
                ? true
                : x.Tipologia_Ente__c === filterTipologiaEnte
        )
        .filter((x) =>
            filterNome == ""
                ? true
                : x.Name.toLowerCase().includes(filterNome.toLowerCase()) 
        )
        .sort(function (a, b) {
            return b.Name - a.Name;
        })
        .slice(0, 10);
</script>

<section class="section m-1 p-1 is-12">
    <div class="container">
        <div class="columns">
            <div class="column">
                <div class="card has-background-grey-lighter">
                    <div class="card-content">
                        <p class="title">
                            {#if data.entistandard}
                            {data.entistandard.length}
                            {:else}
                                0
                            {/if}
                        </p>
                        <p class="subtitle">
                            enti a portafoglio standard {data.qualificaStandard}
                        </p>
                        <div class="field is-grouped is-grouped-multiline">
                            {#each data.tipologieEntiStandard as item}
                                <div class="control">
                                    <div class="tags has-addons">
                                        <span class="tag is-dark"
                                            >{item.Tipologia_Ente__c}</span
                                        >
                                        <span class="tag is-info"
                                            >{item.count}</span
                                        >
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="card has-background-grey-lighter">
                    <div class="card-content">
                        <p class="title">
                            {#if data.entiasseveratore}
                                {data.entiasseveratore.length}
                            {:else}
                                0
                            {/if}
                        </p>
                        <p class="subtitle">enti a portafoglio asseveratore</p>
                        <div class="field is-grouped is-grouped-multiline">
                            {#each data.tipologieEntiAsseveratore as item}
                                <div class="control">
                                    <div class="tags has-addons">
                                        <span class="tag is-dark"
                                            >{item.Tipologia_Ente__c}</span
                                        >
                                        <span class="tag is-info"
                                            >{item.count}</span
                                        >
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="hero is-small is-info">
    <div class="hero-body">
        <p class="title">Enti standard</p>
        <p class="subtitle">
            Visualizzati 12 su {data.entistandard.length}; agire sui filtri di
            ricerca per individuare l'ente desiderato.
        </p>
    </div>
</section>
<section class="section m-1 p-1">
    <div class="notification is-primary is-light m-1 p-1">
        <nav class="level">
            <div class="level-item">
                <div>
                    <span class="icon is-small is-left">
                        <i class="fas fa-filter" />
                    </span>
                    <span>filtri</span>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <div class="field">
                        <div class="control has-icons-left">
                            <div class="select is-primary" id="idfiltermisure">
                                <select bind:value={filterTipologiaEnte}>
                                    <option>tutte le tipologie</option>
                                    {#each data.tipologieEntiStandard.map((x) => x.Tipologia_Ente__c) as item}
                                        <option>{item}</option>
                                    {/each}
                                </select>
                            </div>
                            <div class="icon is-small is-left">
                                <i class="fas fa-building" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <div class="field">
                        <div class="control has-icons-left">
                            <input class="input is-primary" type="text" placeholder="nome dell'ente" bind:value={filterNome}>
                            <div class="icon is-small is-left">
                                <i class="fas fa-building" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            

        </nav>
    </div>
</section>
<section class="section m-1 p-1 is-12">
    <div class="container">
        <div class="columns is-multiline is-mobile">
            {#each filteredEntiStandard as item}
                <div class="column is-half">
                    <div class="card has-background-grey-lighter">
                        <div class="card-content">
                            <p class="subtitle is-5">
                                {item.Name}
                            </p>
                            <p class="subtitle is-6">
                                {item.Tipologia_Ente__c}
                            </p>
                            <p class="subtitle is-7">
                                {item.Regione__c} - {item.ShippingState} - {item.ShippingCity}
                            </p>
                        </div>
                    </div>
                    <p />
                </div>
            {/each}
        </div>
    </div>
</section>
