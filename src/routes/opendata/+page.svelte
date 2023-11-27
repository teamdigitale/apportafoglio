<script>
    import Header from "$lib/c/ui/header.svelte";
    import Scorecard from "$lib/c/ui/scorecard.svelte";
    import MediaQuery from "$lib/c/ui/MediaQuery.svelte";
    import Pagination from "../campagne/145/pagination.svelte";
    import Recorddetail from "./recorddetail.svelte";
    export let data;

    import { fade } from "svelte/transition";
    import Filters from "$lib/c/ui/Filters.svelte";

    let candidature = data.finanziate;

    let selectedRecord;

    const dettagli = (c) => {
        selectedRecord = c;
    };

    let cperpage;

    function calcolaMisureOptions() {
        const res = [];
        candidature.forEach((c) => {
            if (res.indexOf(c.avviso.misura) === -1) {
                res.push(c.avviso.misura);
            }
        });
        return res;
    }

    let misureOptions = ["Tutte le misure"].concat(
        calcolaMisureOptions().sort(),
    );
    let filterMisura = misureOptions[0];

    let tipologiaEnteOptions = ["Tutte le tipologie di ente"].concat(
        Object.values(
            candidature.reduce((a, { tipologia_ente }) => {
                a[tipologia_ente] = a[tipologia_ente] || {
                    tipologia_ente,
                    count: 0,
                };
                a[tipologia_ente].count++;
                return a;
            }, Object.create(null)),
        )
            .map((x) => x.tipologia_ente)
            .sort(),
    );
    let filterTipologiaEnte = tipologiaEnteOptions[0];

    let statiOptions = ["Tutti gli stati"].concat(
        Object.values(
            candidature.reduce((a, { stato_candidatura }) => {
                a[stato_candidatura] = a[stato_candidatura] || {
                    stato_candidatura,
                    count: 0,
                };
                a[stato_candidatura].count++;
                return a;
            }, Object.create(null)),
        )
            .map((x) => x.stato_candidatura)
            .sort(),
    );
    let filterStatoCandidatura = statiOptions[0];

    let regioneOptions = ["Tutte le regioni"].concat(
        Object.values(
            candidature.reduce((a, { regione }) => {
                a[regione] = a[regione] || {
                    regione,
                    count: 0,
                };
                a[regione].count++;
                return a;
            }, Object.create(null)),
        )
            .map((x) => x.regione)
            .sort(),
    );
    let filterRegione = regioneOptions[0];

    let provinceOptions = ["Tutte le province"].concat(
        Object.values(
            candidature
                .filter((c) =>
                    filterRegione !== regioneOptions[0]
                        ? c.regione === filterRegione
                        : true,
                )
                .reduce((a, { provincia }) => {
                    a[provincia] = a[provincia] || {
                        provincia,
                        count: 0,
                    };
                    a[provincia].count++;
                    return a;
                }, Object.create(null)),
        )
            .map((x) => x.provincia)
            .sort(),
    );
    let filterProvincia = provinceOptions[0];

    let filterEnte = "";

    $: cc = candidature
        .filter((c) =>
            filterStatoCandidatura !== statiOptions[0]
                ? c.stato_candidatura === filterStatoCandidatura
                : true,
        )
        .filter((c) =>
            filterEnte !== ""
                ? c.ente.toUpperCase().includes(filterEnte.toUpperCase())
                : true,
        )
        .filter((c) =>
            filterMisura !== misureOptions[0]
                ? c.avviso.misura === filterMisura
                : true,
        )
        .filter((c) =>
            filterTipologiaEnte !== tipologiaEnteOptions[0]
                ? c.tipologia_ente === filterTipologiaEnte
                : true,
        )
        .filter((c) =>
            filterRegione !== regioneOptions[0]
                ? c.regione === filterRegione
                : true,
        )
        .filter((c) =>
            filterProvincia !== provinceOptions[0]
                ? c.provincia === filterProvincia
                : true,
        );

    $: fonditotali = cc.reduce(function (a, b) {
        return a + b.importo_finanziamento;
    }, 0);

    $: fondiAssegnati = cc
        .filter((f) => f.stato_candidatura === "A")
        .reduce(function (a, b) {
            return a + b.importo_finanziamento;
        }, 0);

    $: fondiLiquidati = cc
        .filter((f) => f.stato_candidatura === "E")
        .reduce(function (a, b) {
            return a + b.importo_finanziamento;
        }, 0);

    $: fondiRinunciati = cc
        .filter((f) => f.stato_candidatura === "R")
        .reduce(function (a, b) {
            return a + b.importo_finanziamento;
        }, 0);

    function euro(v) {
        return Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "EUR",
        }).format(v);
    }

    function stilePerStato(s) {
        if (s === "A") {
            return "info";
        } else if (s === "E") {
            return "success";
        } else if (s === "R") {
            return "danger";
        } else {
            return "black";
        }
    }

    function labelPerStato(s) {
        if (s === "A") {
            return "Assegnato";
        } else if (s === "E") {
            return "Erogato";
        } else if (s === "R") {
            return "Rinunciato";
        } else {
            return "Tutti gli stati";
        }
    }

    let showFilters = false;
    const toggleShowFilters = () => {
        showFilters = !showFilters;
    };
</script>

<Header
    title="open data"
    quote="Se torturi i numeri abbastanza a lungo, confesseranno qualsiasi cosa."
    author="Gregg Easterbrook"
/>

<Filters>
    <div class="level-item">
        <div class="control">
            <div class="select is-primary">
                <select
                    name="filterMisura"
                    bind:value={filterStatoCandidatura}
                >
                    {#each statiOptions as s}
                        <option
                            value={s}
                            class="has-text-{stilePerStato(
                                s,
                            )} {s === 'E'
                                ? 'has-text-weight-bold'
                                : ''}"
                            >{labelPerStato(s)}</option
                        >
                    {/each}
                </select>
            </div>
        </div>
    </div>
    <div class="level-item">
        <div class="control">
            <div class="select is-primary">
                <select
                    name="filterMisura"
                    bind:value={filterMisura}
                >
                    {#each misureOptions as m}
                        <option>{m}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>
    <div class="level-item">
        <div class="control">
            <div class="select is-primary">
                <select
                    name="filterTipologiaEnte"
                    bind:value={filterTipologiaEnte}
                >
                    {#each tipologiaEnteOptions as te}
                        <option>{te}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>
    <div class="level-item">
        <div class="control">
            <div class="select is-primary">
                <select
                    name="filterRegione"
                    bind:value={filterRegione}
                >
                    {#each regioneOptions as r}
                        <option>{r}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>
    <div class="level-item">
        <div class="control">
            <div class="select is-primary">
                <select
                    name="filterProvincia"
                    bind:value={filterProvincia}
                >
                    {#each provinceOptions as p}
                        <option>{p}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>
    <div class="level-item">
        <div class="control">
            <div>
                <input
                    class="input"
                    type="text"
                    placeholder="Nome ente"
                    name="filterEnte"
                    bind:value={filterEnte}
                />
            </div>
        </div>
    </div>
</Filters>



<section class="section is-12 px-0 py-0">
    <div class="hero-body py-0">
        <nav class="level">
            <div>
                <Scorecard
                    score={euro(fonditotali)}
                    label="Valore candidature"
                    color="primary"
                />
            </div>
            <div>
                <Scorecard
                    score={euro(fondiAssegnati)}
                    label="Fondi assegnati"
                    color="info"
                />
            </div>
            <div>
                <Scorecard
                    score={euro(fondiLiquidati)}
                    label="Fondi liquidati"
                    color="success"
                />
            </div>
            <div>
                <Scorecard
                    score={euro(fondiRinunciati)}
                    label="Fondi rinunciati"
                    color="danger"
                />
            </div>
        </nav>
    </div>
</section>

{#if selectedRecord}
    <section class="section is-12 px-0 py-0" transition:fade>
        <div class="hero-body py-0">
            <Recorddetail bind:record={selectedRecord} />
        </div>
    </section>
{:else}
    <MediaQuery query="(max-width: 768px)" let:matches>
        <section class="section is-12 px-0 py-0" transition:fade>
            <div class="hero-body py-0">
                <div class="table-container">
                    <table
                        class="table is-striped is-narrow is-hoverable is-fullwidth"
                    >
                        <thead>
                            <tr>
                                <th />
                                <th>Tipologia ente</th>
                                <th>Ente</th>
                                {#if !matches}
                                    <th>Regione</th>
                                    <th>Provincia</th>
                                    <th>Misura</th>
                                    <th>Stato</th>
                                {/if}
                                <th>Importo</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th colspan="8"
                                    ><Pagination
                                        rows={cc}
                                        perPage={10}
                                        bind:trimmedRows={cperpage}
                                    /></th
                                >
                            </tr>
                        </tfoot>
                        <tbody>
                            {#if cperpage}
                                {#each cperpage as c}
                                    <tr
                                        class="has-text-{stilePerStato(
                                            c.stato_candidatura,
                                        )} {c.stato_candidatura === 'E'
                                            ? 'has-text-weight-bold'
                                            : ''}"
                                    >
                                        <td
                                            ><button
                                                class="button is-small is-outlined is-info"
                                                on:click={dettagli(c)}
                                                ><span class="icon is-small"
                                                    ><i
                                                        class="fas fa-glasses"
                                                    /></span
                                                ></button
                                            ></td
                                        >
                                        <td>{c.tipologia_ente}</td>
                                        <td>{c.ente}</td>
                                        {#if !matches}
                                            <td>{c.regione}</td>
                                            <td>{c.provincia}</td>
                                            <td>{c.avviso.misura}</td>
                                            <td
                                                >{c.stato_candidatura === "A"
                                                    ? "ASSEGNATO"
                                                    : c.stato_candidatura ===
                                                        "E"
                                                      ? "EROGATO"
                                                      : "RINUNCIATO"}</td
                                            >
                                        {/if}
                                        <td>{euro(c.importo_finanziamento)}</td>
                                    </tr>
                                {/each}
                            {/if}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </MediaQuery>
{/if}
