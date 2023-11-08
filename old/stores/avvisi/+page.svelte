<script>
    export let data;
    import { circInOut } from "svelte/easing";
    import { crossfade, fade } from "svelte/transition";
    import moment from "moment/min/moment-with-locales";
    moment.locale("it");

    const [send, receive] = crossfade({
        fallback(node, params) {
            const style = getComputedStyle(node);
            const transform = style.transform === "none" ? "" : style.transform;

            return {
                duration: 200,
                easing: circInOut,
                css: (t) => `
					opacity: ${t}
				`,
            };
        },
    });


    $: filteredAvvisi = data.avvisi
        .filter((x) => (!soloAperti ? true : x.stato === "PUBBLICATO"))
        .filter((x) =>
            filterMisura == "tutte le misure" ? true : x.misura === filterMisura
        )
        .filter((x) =>
            filterBeneficiario == "tutti i beneficiari" ? true : x.beneficiari.find((element) => element == filterBeneficiario)
        )
        .sort(function (a, b) {
            return new Date(a.data_fine_bando) - new Date(b.data_fine_bando);
        });

        $: misureOptions = Object.values(
        filteredAvvisi.reduce((a, { misura }) => {
            a[misura] = a[misura] || {
                misura,
                count: 0,
            };
            a[misura].count++;
            return a;
        }, Object.create(null))
    )
        .map((x) => x.misura)
        .sort();
    //.slice().unshift('Tuu');

     $: beneficiariOptions = 
        calcolaBeneficiari().filter((item,
        index,arr) => arr.indexOf(item) === index)
    .sort();
    
    function calcolaBeneficiari(){
        let res = [];
        for(let z=0; z<data.avvisi.length; z++){
            res = res.concat(data.avvisi[z].beneficiari);
        }
        return res;
    }
    




    let soloAperti = true;
    let filterMisura = "tutte le misure";
    let filterBeneficiario = "tutti i beneficiari";

 
</script>

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
                        <input
                            id="switchSoloAperti"
                            type="checkbox"
                            name="switchSoloAperti"
                            class="switch"
                            bind:checked={soloAperti}
                        />
                        <label for="switchSoloAperti"
                            >mostra solo avvisi aperti</label
                        >
                    </div>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <div class="field">
                        <div class="control has-icons-left">
                            <div class="select is-primary" id="idfiltermisure">
                                <select bind:value={filterMisura}>
                                    <option>tutte le misure</option>
                                    {#each misureOptions as item}
                                        <option>{item}</option>
                                    {/each}
                                </select>
                            </div>
                            <div class="icon is-small is-left">
                                <i class="fas fa-bullhorn" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <div class="field">
                        <div class="control has-icons-left">
                            <div class="select is-primary" id="idfiltermisure">
                                <select bind:value={filterBeneficiario}>
                                    <option>tutti i beneficiari</option>
                                    {#each beneficiariOptions as item}
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
        </nav>
    </div>
</section>

<section class="section m-1 p-1 is-12">
    <div class="container" transition:fade>
        <div class="columns is-multiline">
            {#each filteredAvvisi as item, index (item)}
                <div
                    class="column is-12"
                    id={item.titolo}
                    in:send={{ key: item.titolo }}
                    out:receive={{ key: item.titolo }}
                >
                    <div class="card has-background-grey-lighter">
                        <header
                            class="card-header {item.stato == 'PUBBLICATO'
                                ? 'has-background-info'
                                : 'has-background-danger'}"
                        >
                            <h1 class="card-header-title is-size-5">
                                {item.titolo}
                            </h1>
                        </header>
                        <div class="card-content">
                            <div class="content">
                                <div class="columns">
                                    <div
                                        class="column is-one-third has-text-weight-bold"
                                    >
                                        misura:
                                    </div>
                                    <div class="column">{item.misura}</div>
                                </div>
                                <div class="columns">
                                    <div
                                        class="column is-one-third has-text-weight-bold"
                                    >
                                        destinatari:
                                    </div>
                                    <div class="column">
                                        <div class="tags">
                                            {#each item.beneficiari as b}
                                            <span class="tag is-dark">{b}</span>
                                            {/each}
                                          </div>

                                    </div>
                                </div>
                                <div class="columns">
                                    <div
                                        class="column is-one-third has-text-weight-bold"
                                    >
                                        data chiusura:
                                    </div>
                                    <div class="column">
                                        {moment(item.data_fine_bando).format(
                                            "DD/MM/YYYY"
                                        )}
                                        <span class="has-text-weight-bold"
                                            >({moment(item.data_fine_bando)
                                                .endOf("day")
                                                .fromNow()})</span
                                        >
                                    </div>
                                </div>
                                <div class="columns">
                                    <div
                                        class="column is-one-third has-text-weight-bold"
                                    >
                                        data apertura:
                                    </div>
                                    <div class="column">
                                        {moment(item.data_inizio_bando).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
