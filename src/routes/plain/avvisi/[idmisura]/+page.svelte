<script>
    import Header from "$lib/c/ui/header.svelte";
    import Avvisi from "../../../../c/avvisi.svelte";
    import Avvisocard from "../../../../c/avvisocard.svelte";
    export let data;
    let statoAvvisoOptions = ["Tutti gli stati"].concat(
        Object.values(
            data.avvisi.reduce((a, { outfunds__Status__c }) => {
                a[outfunds__Status__c] = a[outfunds__Status__c] || {
                    outfunds__Status__c,
                    count: 0,
                };
                a[outfunds__Status__c].count++;
                return a;
            }, Object.create(null))
        )
            .map((x) => x.outfunds__Status__c)
            .sort()
    );
    let filterStatoAvviso = "Tutti gli stati";

    let pacchettoOptions = ["Tutti i pacchetti"].concat(
        Object.values(
            data.avvisi.reduce((a, { Pacchetto__c }) => {
                a[Pacchetto__c] = a[Pacchetto__c] || {
                    Pacchetto__c,
                    count: 0,
                };
                a[Pacchetto__c].count++;
                return a;
            }, Object.create(null))
        )
            .map((x) => x.Pacchetto__c)
            .filter((v) => (v ? true : false))
            .sort()
    );
    let filterPacchetto = "Tutti i pacchetti";

    $: beneficiariOptions = ["Tutti i beneficiari"].concat(
        calcolaBeneficiari()
            .filter((item, index, arr) => arr.indexOf(item) === index)
            .sort()
    );
    let filterBeneficiari = "Tutti i beneficiari";

    function calcolaBeneficiari() {
        let res = [];
        for (let z = 0; z < data.avvisi.length; z++) {
            res = res.concat(data.avvisi[z].beneficiari);
        }
        return res;
    }

    $: filteredAvvisi = data.avvisi
        .filter((x) =>
            filterStatoAvviso === "Tutti gli stati"
                ? true
                : x.outfunds__Status__c === filterStatoAvviso
        )
        .filter((x) =>
            filterPacchetto === "Tutti i pacchetti"
                ? true
                : x.Pacchetto__c === filterPacchetto
        )
        .filter((x) =>
            filterBeneficiari === "Tutti i beneficiari"
                ? true
                : x.beneficiari.indexOf(filterBeneficiari) > -1
        );
</script>

<Header title="avvisi della misura: {data.misure[0].Name}" quote="Ente avvisato, mezzo salvato." author="Anonimo" />

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

                <div class="level-item">
                    <div class="control">
                        <div class="select is-primary" id="idfilterstatoavviso">
                            <select bind:value={filterStatoAvviso}>
                                {#each statoAvvisoOptions as item}
                                    <option>{item}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>

                <div class="level-item">
                    <div class="control">
                        <div class="select is-primary" id="idfilterpacchetto">
                            <select bind:value={filterPacchetto}>
                                {#each pacchettoOptions as item}
                                    <option>{item}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>

                <div class="level-item">
                    <div class="control">
                        <div class="select is-primary" id="idfilterpacchetto">
                            <select bind:value={filterBeneficiari}>
                                {#each beneficiariOptions as item}
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

<section class="section is-12 px-0">
    <div class="columns is-multiline">
        {#each filteredAvvisi as avviso}
            <div class="column is-half">
                <Avvisocard {avviso} />
            </div>
        {/each}
    </div>
</section>
