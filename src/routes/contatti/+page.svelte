<script>
    // @ts-nocheck

    import Header from "$lib/c/ui/header.svelte";
    import moment from "moment/min/moment-with-locales";
    import Stackedbar from "../../c/charts/stackedbar.svelte";
    import { onMount } from "svelte";
    import Filters from "$lib/c/ui/Filters.svelte";
    moment.locale("it");
    /**
     * @param {Date} startDate
     * @param {Date} endDate
     */
    function getDatesBetween(startDate, endDate) {
        let currentDate = moment(startDate).clone().startOf("day");
        const dates = [];
        while (currentDate <= endDate) {
            dates.push(moment(new Date(currentDate)).clone().startOf("day"));
            currentDate = currentDate.add(1, "d");
        }
        return dates;
    }

    // @ts-ignore
    export let data;

    const rangeOptions = [
        "Questo mese",
        "Dal mese scorso",
        "Questo quarter",
        "Questo anno",
        "Sempre",
    ];
    let range = rangeOptions[0];

    $: rangeMin =
        range === "Questo mese"
            ? moment().startOf("month").toDate()
            : range === "Dal mese scorso"
            ? moment().startOf("month").subtract(1, "months").toDate()
            : range === "Questo quarter"
            ? moment().startOf("quarter").toDate()
            : range === "Questo anno"
            ? moment().startOf("year").toDate()
            : moment().startOf("year").subtract(3, "months").toDate();

    $: rangeMax = moment().toDate();

    $: dates = getDatesBetween(rangeMin, rangeMax);

    $: filteredContatti = data.contatti.filter(function (c) {
        return moment(c.CreatedDate).isAfter(moment(rangeMin));
        /*
            return moment(c.ActivityDate,"YYYY-MM-DD").clone().toDate().getDate() >= new Date(rangeMin).getDate()  &&
            moment(c.ActivityDate,"YYYY-MM-DD").clone().toDate().getDate() <= new Date(rangeMax).getDate() ;
            */
    });

    $: result = [[]];

    $: cdataforchart = () => {
        // @ts-ignore
        result = [["Data", "Numero contatti"]];
        dates.forEach((d) => {
            result.push([
                moment(d).format("DD/MM/YYYY"),
                filteredContatti.filter(
                    (c) =>
                        moment(c.CreatedDate)
                            .startOf("day")
                            .toDate()
                            .getDate() ===
                        moment(d).startOf("day").toDate().getDate()
                ).length,
            ]);
        });
    };

    onMount(async () => {
        cdataforchart();
    });


    let topten = data.contatti
        .reduce((b, a) => {
            let index = b.findIndex((j) => j.ente === a.Account.Name);
            if (index > -1) b[index].count++;
            else b.push({ ente: a.Account.Name, count: 1 });
            return b;
        }, [])
        .sort((a, b) => {
            return Number(a.count) < Number(b.count)
                ? 1
                : Number(a.count) > Number(b.count)
                ? -1
                : 0;
        })
        .filter((x, index) => index < 10);


    let worstten = data.contatti
        .reduce((b, a) => {
            let index = b.findIndex((j) => j.ente === a.Account.Name);
            if (index > -1) b[index].count++;
            else b.push({ ente: a.Account.Name, count: 1 });
            return b;
        }, [])
        .sort((a, b) => {
            return Number(a.count) < Number(b.count)
                ? -1
                : Number(a.count) > Number(b.count)
                ? 1
                : 0;
        })
        .filter((x, index) => index < 10);


    let getTopTen = () => {
        const result = [["Ente", "Numero contatti"]];
        topten.forEach((e) => {
            result.push([e.ente, e.count]);
        });
        return result;
    };

    function getWorstTen() {
        const result = [["Ente", "Numero contatti"]];
        worstten.forEach((e) => {
            result.push([e.ente, e.count]);
        });
        return result;
    }

    let showtop10 = false;
    let showworst10 = false;

    const toggletop10 = () => {
        showtop10 = !showtop10;
    };
    const toggleworst10 = () => {
        showworst10 = !showworst10;
    };
</script>

<Header
    title="contatti"
    quote="Un manager con il cellulare entrò in una cabina telefonica e pianse di nostalgia."
    author="Federico Bini"
/>

<Filters>
    <div class="level-item">
        <div class="control">
            <div class="select is-primary" id="idfilterstatoavviso">
                <select
                    bind:value={range}
                    on:change={cdataforchart}
                >
                    {#each rangeOptions as item}
                        <option>{item}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>
    <div class="level-item">
        <div>
            <span class="has-text-weight-bold">
                {moment(rangeMin).format("DD/MM/YYYY")} - {moment(
                    rangeMax
                ).format("DD/MM/YYYY")}</span
            >
        </div>
    </div>
</Filters>


<section class="hero is-small is-warning is-12">
    <div class="hero-body m-1 p-1">
        <nav class="level">
            <!-- Left side -->
            <div class="level-left">
                <div class="level-item">
                    <div>
                        <p
                            class="is-size-6 has-text-weight-bold has-text-danger"
                        >
                            <span class="icon is-small">
                                <i class="fas fa-user-graduate" />
                            </span>

                            <span class="is-size-6 mx-0 px-0"
                                >Bohr consiglia:</span
                            >
                        </p>
                    </div>
                </div>

                <div class="level-item">
                    <div class="field has-addons">
                        <p class="control">
                            <button
                                class="button is-danger is-outlined {showtop10
                                    ? 'is-hovered'
                                    : ''}"
                                on:click={toggletop10}
                            >
                                <span>Mostra i più contattati</span>
                            </button>
                        </p>
                    </div>
                </div>
                <div class="level-item">
                    <div class="field has-addons">
                        <p class="control">
                            <button
                                class="button is-danger is-outlined {showworst10
                                    ? 'is-hovered'
                                    : ''}"
                                on:click={toggleworst10}
                            >
                                <span>Mostra i meno contattati</span>
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</section>

{#if !showtop10 && !showworst10}
    <section class="section is-12 p-2 is-full">
        <Stackedbar values={result} id="contatti" direction="vertical" />
    </section>
{/if}

{#if showtop10}
    <section class="section is-12 p-2 is-full my">
        <div class="hero-body m-1 p-1 py-3">
            <p class="title has-text-info">i 10 più contattati di sempre</p>
            <Stackedbar
                values={getTopTen()}
                id="topten"
                direction="horizontal"
            />
        </div>
    </section>
{/if}

{#if showworst10}
    <section class="section is-12 p-2 is-full">
        <div class="hero-body m-1 p-1">
            <p class="title has-text-danger">i 10 meno contattati di sempre</p>

            <Stackedbar
                values={getWorstTen()}
                id="worstten"
                direction="horizontal"
            />
        </div>
    </section>
{/if}

<section class="section is-12 p-2">
    <div class="table-container">
    <table class="table is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
            <tr>
                <th />
                <th>Data</th>
                <th>Ente</th>
                <th>Tipo</th>
                <th>Oggetto</th>
                <th>Descrizione</th>
            </tr>
        </thead>
        <tbody>
            {#each filteredContatti as d, index}
                <tr>
                    <td>{index + 1}</td>
                    <td>{moment(d.CreatedDate).format("DD/MM/YYYY")}</td>
                    <td>{d.Account.Name}</td>
                    <td><span class="icon"><i class="fas fa-{d.Tipo==='Contatto diretto'?'phone':'handshake'} "></i></span><br/>
                        <!--
                        <span class="is-size-7">{d.Tipo}</span>
                        -->
                    </td>
                    <td>{d.Subject ? d.Subject : "n.d."}</td>
                    <td>{d.Description ? d.Description : "n.d."}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
</section>
