<script>
    import Header from "$lib/c/ui/header.svelte";
    export let data;

    let solofinanziate = true;

    $: calcola = () => {
        let aa = data.misure;
        for (let z = 0; z < data.misure.length; z++) {
            aa[z].conteggioFornitori = [];
            aa[z].valoreFornitori = [];
            
            for (let y = 0; y < aa[z].avvisi.length; y++) {
                let ccc = solofinanziate
                    ? aa[z].avvisi[y].candidature.filter(
                          (x) => x.outfunds__Status__c === "FINANZIATA"
                      )
                    : aa[z].avvisi[y].candidature;
                for (let x = 0; x < ccc.length; x++) {
                    if (ccc[x].fornitori && ccc[x].fornitori.length > 0) {
                        for (let w = 0; w < ccc[x].fornitori.length; w++) {
                            let cc = aa[z].conteggioFornitori.filter(
                                (a) =>
                                    a.nome ===
                                    ccc[x].fornitori[w]
                                        .Denominazione_Soggetto_Realizzatore__c
                            );

                            if (cc && cc.length > 0) {
                                aa[z].conteggioFornitori.filter(
                                    (a) =>
                                        a.nome ===
                                        ccc[x].fornitori[w]
                                            .Denominazione_Soggetto_Realizzatore__c
                                )[0].count =
                                    aa[z].conteggioFornitori.filter(
                                        (a) =>
                                            a.nome ===
                                            ccc[x].fornitori[w]
                                                .Denominazione_Soggetto_Realizzatore__c
                                    )[0].count + 1;
                            } else {
                                aa[z].conteggioFornitori.push({
                                    nome: ccc[x].fornitori[w]
                                        .Denominazione_Soggetto_Realizzatore__c,
                                    count: 1,
                                });
                            }
                            let ss = aa[z].valoreFornitori.filter(
                                (a) =>
                                    a.nome ===
                                    ccc[x].fornitori[w]
                                        .Denominazione_Soggetto_Realizzatore__c
                            );
                            if (ss && ss.length > 0) {
                                aa[z].valoreFornitori.filter(
                                    (a) =>
                                        a.nome ===
                                        ccc[x].fornitori[w]
                                            .Denominazione_Soggetto_Realizzatore__c
                                )[0].value =
                                    aa[z].valoreFornitori.filter(
                                        (a) =>
                                            a.nome ===
                                            ccc[x].fornitori[w]
                                                .Denominazione_Soggetto_Realizzatore__c
                                    )[0].value +
                                    ccc[x].outfunds__Awarded_Amount__c;
                            } else {
                                aa[z].valoreFornitori.push({
                                    nome: ccc[x].fornitori[w]
                                        .Denominazione_Soggetto_Realizzatore__c,
                                    value: ccc[x].outfunds__Awarded_Amount__c,
                                });
                            }
                        }
                    }
                }
            }
            
            aa[z].conteggioFornitori = aa[z].conteggioFornitori.sort((a, b) => {
                return b.count - a.count;
            });
            aa[z].valoreFornitori = aa[z].valoreFornitori.sort((a, b) => {
                return b.value - a.value;
            });
            
        }
          return aa;
    };

    $: calcolaCandidature = () => {
        let aa = data.misure;
        let result = [];
        for (let z = 0; z < data.misure.length; z++) {
            for (let y = 0; y < aa[z].avvisi.length; y++) {
                let ccc = solofinanziate
                    ? aa[z].avvisi[y].candidature.filter(
                          (x) => x.outfunds__Status__c === "FINANZIATA"
                      )
                    : aa[z].avvisi[y].candidature;
                result = result.concat(ccc);
            }
        }
        return result;
    };

    $: items = calcola();

    $: cand = calcolaCandidature();


</script>

<Header
    title="soggetti attuatori"
    quote="Sembra sempre impossibile fino a quando non è fatto."
    author="Nelson Mandela"
/>

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

                <div class="level-item has-text-centered">
                    <div>
                        <div class="field">
                            <input
                                id="switchsolocomuni"
                                type="checkbox"
                                name="switchsolocomuni"
                                class="switch"
                                bind:checked={solofinanziate}
                            />
                            <label for="switchsolocomuni">Solo FINANZIATE</label
                            >
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</section>

<section class="section is-12 px-0">
    <div class="columns is-multiline">
        {#each items.filter( (m) => m.avvisi.filter((a) => a.candidature.length > 0) ) as misura}
            {#if misura.conteggioFornitori.length > 0}
                <div class="column is-one-quarter">
                    <div
                        class="card bm--card-equal-height has-background-grey-lighter"
                    >
                        <header class="has-background-info">
                            <p class="card-header-title">
                                {misura.Name}
                            </p>
                        </header>
                        <div class="card-content">
                            <p class="is-5 has-text-weight-bold">
                                Top 3 per numero candidature
                            </p>
                            {#each misura.conteggioFornitori.filter((x, index) => index < 3) as cf}
                                <div class="tags has-addons">
                                    <span class="tag is-dark is-small"
                                        >{cf.nome}</span
                                    >
                                    <span class="tag is-info is-small"
                                        >{cf.count}</span
                                    >
                                </div>
                            {/each}

                            <p class="is-5 has-text-weight-bold">
                                Top 3 per valore candidature
                            </p>

                            {#each misura.valoreFornitori.filter((x, index) => index < 3) as vf}
                                <div class="tags has-addons">
                                    <span class="tag is-dark is-small"
                                        >{vf.nome}</span
                                    >
                                    <span class="tag is-info is-small"
                                        >{Intl.NumberFormat("it-IT", {
                                            style: "currency",
                                            currency: "EUR",
                                        }).format(vf.value)}</span
                                    >
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            {/if}
        {/each}
    </div>
</section>

<section class="section is-12 p-2">
    <table class="table is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
            <tr>
                <th>Misura</th>
                <th>Ente</th>
                <th>CUP</th>
                <th class=" is-vcentered">Valore</th>
                <th>Stato candidatura</th>
                <th>Stato progetto</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {#each cand as c}
                <tr>
                    <td>{c.Misura__c}</td>
                    <td>{data.enti.filter(e=> e.Id===c.outfunds__Applying_Organization__c)[0].Name}</td>
                    <td>{c.Codice_CUP__c}</td>
                    <td class="is-vcentered">
                        {Intl.NumberFormat("it-IT", {
                            style: "currency",
                            currency: "EUR",
                        }).format(c.outfunds__Awarded_Amount__c)}
                    </td>
                    <td>{c.outfunds__Status__c}</td>
                    <td>{c.Stato_Progetto__c}</td>
                    <td><a href="/candidatura/{c.Id}" target="_blank"><span class="icon"><i class="fas fa-glasses">&nbsp</i></span></a></td>
                </tr>
            {/each}
        </tbody>
    </table>
</section>

<style>
    .bm--card-equal-height {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

</style>