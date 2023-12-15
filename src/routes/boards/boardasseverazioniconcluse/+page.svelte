<script>
    import Header from "$lib/c/ui/header.svelte";

    export let data;

    console.log(data);

    let sortedData = data.data.sort((a, b) =>
        a.misura > b.misura
            ? 1
            : b.misura > a.misura
              ? -1
              : a.tipologiaente > b.tipologiaente
                ? 1
                : b.tipologiaente > a.tipologiaente
                  ? -1
                  : 0,
    );

    let misure = Object.values(
        sortedData.reduce((a, { misura }) => {
            a[misura] = a[misura] || {
                misura,
                count: 0,
            };
            a[misura].count++;
            return a;
        }, Object.create(null)),
    )
        .map((x) => x.misura)
        .sort();

    let tipologiah = "";
    let tipologiaf = "";
    let misurah = "";
    let tipologiaeh = "";

    let tipologiahr = "";
    let tipologiafr = "";
    let misurahr = "";
    let tipologiaehr = "";
</script>

<Header
    title="Overview tasks di asseverazione tecnica e formale"
    quote="Gestire la qualità è importante perché niente è più così semplice, se davvero lo è mai stato."
    author="Philip B. Crosby"
/>

<section class="section is-12 px-0">
    <div class="columns is-multiline">
        <div class="column is-12">
            <div class="box is-centered">
                <table class="table is-bordered is-fullwidth">
                    <thead>
                        <tr>
                            <th
                                rowspan="2"
                                class="is-vcentered has-text-black has-text-centered"
                                ><span class="has-text-weight-normal"
                                    >TOTALI</span
                                >
                                /
                                <span class="is-italic">ROLLING 30gg </span></th
                            >
                            <th
                                colspan="5"
                                class="has-text-centered is-size-4 {tipologiah}"
                                >Tecnici</th
                            >

                        </tr>
                        <tr>
                            <th
                                class="has-text-centered has-text-white has-background-success"
                                >Positivi<br /><span
                                    class="is-size-7 has-text-weight-normal"
                                    >(#)</span
                                ></th
                            >
                            <th
                                class="has-text-centered has-text-white has-background-danger"
                                >Negativi<br /><span
                                    class="is-size-7 has-text-weight-normal"
                                    >(#)</span
                                ></th
                            >
                            <th
                                class="has-text-centered has-text-white has-background-grey"
                                >Parziali<br /><span
                                    class="is-size-7 has-text-weight-normal"
                                    >(#)</span
                                ></th
                            >
                            <th class="is-vcentered has-text-centered"
                                >Passaggi medi<br /><span
                                    class="is-size-7 has-text-weight-normal"
                                    >(tasks/candidatura)<br /></span
                                ></th
                            >
                            <th class="is-vcentered has-text-centered"
                                >Tempo medio<br /><span
                                    class="is-size-7 has-text-weight-normal"
                                    >(gg)<br /></span
                                ></th
                            >
                            
                        </tr>
                    </thead>
                    <tbody>
                        {#each misure as m}
                            {#if sortedData
                                .filter((sd) => sd.misura === m)
                                .reduce((a, c) => a + c.tecnicipositivi + c.tecnicinegativi, 0) != 0}
                                <tr
                                    class=" {misurah === m
                                        ? 'has-background-primary'
                                        : ''}"
                                >
                                    <td
                                        colspan="11"
                                        class="has-text-weight-bold is-size-6 is-vcentered"
                                        >{m}</td
                                    >
                                </tr>

                                {#each sortedData.filter((sd) => sd.misura === m) as t}
                                    {#if t.tecnicipositivi > 0 || t.tecnicinegativi > 0}
                                        <tr
                                            class={tipologiaeh ===
                                                t.tipologiaente && misurah === m
                                                ? "has-background-info has-text-white"
                                                : ""}
                                        >
                                            <td
                                                class="has-text-weight-normal is-size-6 is-vcentered {tipologiaeh ===
                                                    t.tipologiaente &&
                                                misurah === m
                                                    ? 'has-background-info-dark has-text-white'
                                                    : ''}">{t.tipologiaente}</td
                                            >
                                            <td
                                                class="is-vcentered has-text-centered"
                                                on:mouseenter={() => {
                                                    tipologiaeh =
                                                        t.tipologiaente;
                                                    misurah = m;
                                                    tipologiah =
                                                        "has-background-primary";
                                                }}
                                                on:mouseleave={() => {
                                                    misurah = "";
                                                    tipologiah = "";
                                                }}
                                                >{t.tecnicipositivi} /
                                                <span
                                                    class="has-text-weight-bold"
                                                    >{t.tecnicipositivirolling}</span
                                                ></td
                                            >
                                            <td
                                                class="is-vcentered has-text-centered"
                                                on:mouseenter={() => {
                                                    tipologiaeh =
                                                        t.tipologiaente;
                                                    misurah = m;
                                                    tipologiah =
                                                        "has-background-primary";
                                                }}
                                                on:mouseleave={() => {
                                                    misurah = "";
                                                    tipologiah = "";
                                                }}
                                                >{t.tecnicinegativi} /
                                                <span
                                                    class="has-text-weight-bold"
                                                    >{t.tecnicinegativirolling}</span
                                                ></td
                                            >
                                            <td
                                                class="is-vcentered has-text-centered"
                                                on:mouseenter={() => {
                                                    tipologiaeh =
                                                        t.tipologiaente;
                                                    misurah = m;
                                                    tipologiah =
                                                        "has-background-primary";
                                                }}
                                                on:mouseleave={() => {
                                                    misurah = "";
                                                    tipologiah = "";
                                                }}
                                                >{t.parzialitecnici} /
                                                <span
                                                    class="has-text-weight-bold"
                                                    >{t.parzialitecnicirolling}</span
                                                ></td
                                            >
                                            <td
                                                class="is-vcentered has-text-centered"
                                                on:mouseenter={() => {
                                                    tipologiaeh =
                                                        t.tipologiaente;
                                                    misurah = m;
                                                    tipologiah =
                                                        "has-background-primary";
                                                }}
                                                on:mouseleave={() => {
                                                    misurah = "";
                                                    tipologiah = "";
                                                }}
                                                >{isFinite(
                                                    t.numeromediopassaggi,
                                                ) &&
                                                !isNaN(t.numeromediopassaggi)
                                                    ? t.numeromediopassaggi
                                                    : "n.a."} /
                                                <span
                                                    class="has-text-weight-bold"
                                                    >{isFinite(
                                                        t.numeromediopassaggirolling,
                                                    ) &&
                                                    !isNaN(
                                                        t.numeromediopassaggirolling,
                                                    )
                                                        ? t.numeromediopassaggirolling
                                                        : "n.a."}</span
                                                ></td
                                            >
                                            <td
                                                class="is-vcentered has-text-centered"
                                                on:mouseenter={() => {
                                                    tipologiaeh =
                                                        t.tipologiaente;
                                                    misurah = m;
                                                    tipologiah =
                                                        "has-background-primary";
                                                }}
                                                on:mouseleave={() => {
                                                    misurah = "";
                                                    tipologiah = "";
                                                }}
                                                >{isFinite(
                                                    t.tempomediotecnico,
                                                ) && !isNaN(t.tempomediotecnico)
                                                    ? t.tempomediotecnico
                                                    : "n.a."} /
                                                <span
                                                    class="has-text-weight-bold"
                                                    >{isFinite(
                                                        t.tempomediotecnicorolling,
                                                    ) &&
                                                    !isNaN(
                                                        t.tempomediotecnicorolling,
                                                    )
                                                        ? t.tempomediotecnicorolling
                                                        : "n.a."}</span
                                                ></td
                                            >

                                           
                                        </tr>
                                    {/if}
                                {/each}
                            {/if}
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>

<section class="section is-12 px-0">
    <div class="columns is-multiline">
        <div class="column is-12">
            <div class="box is-centered">
                <table class="table is-bordered is-fullwidth">
                    <thead>
                        <tr>
                            <th
                                rowspan="2"
                                class="is-vcentered has-text-black has-text-centered"
                                ><span class="has-text-weight-normal"
                                    >TOTALI</span
                                >
                                /
                                <span class="is-italic">ROLLING 30gg </span></th
                            >

                            <th
                                colspan="5"
                                class="has-text-centered is-size-4 {tipologiaf}"
                                >Formali</th
                            >
                        </tr>
                        <tr>
                            <th
                                class="has-text-centered has-text-white has-background-success"
                                >Positivi<br /><span
                                    class="is-size-7 has-text-weight-normal"
                                    >(#)</span
                                ></th
                            >
                            <th
                                class="has-text-centered has-text-white has-background-danger"
                                >Negativi<br /><span
                                    class="is-size-7 has-text-weight-normal"
                                    >(#)</span
                                ></th
                            >
                            <th
                                class="has-text-centered has-text-white has-background-grey"
                                >Parziali<br /><span
                                    class="is-size-7 has-text-weight-normal"
                                    >(#)</span
                                ></th
                            >
                            <th class="is-vcentered has-text-centered"
                                >Passaggi medi<br /><span
                                    class="is-size-7 has-text-weight-normal"
                                    >(tasks/candidatura)<br /></span
                                ></th
                            >
                            <th class="is-vcentered has-text-centered"
                                >Tempo medio<br /><span
                                    class="is-size-7 has-text-weight-normal"
                                    >(gg)<br /></span
                                ></th
                            >
                        </tr>
                    </thead>
                    <tbody>
                        {#each misure as m}
                            {#if sortedData
                                .filter((sd) => sd.misura === m)
                                .reduce((a, c) => a + c.formalipositivi + c.formalinegativi, 0) != 0}
                                <tr
                                    class=" {misurah === m
                                        ? 'has-background-primary'
                                        : ''}"
                                >
                                    <td
                                        colspan="11"
                                        class="has-text-weight-bold is-size-6 is-vcentered"
                                        >{m}</td
                                    >
                                </tr>

                                {#each sortedData.filter((sd) => sd.misura === m) as t}
                                    {#if t.formalipositivi > 0 || t.formalinegativi > 0}
                                        <tr
                                            class={tipologiaeh ===
                                                t.tipologiaente && misurah === m
                                                ? "has-background-info has-text-white"
                                                : ""}
                                        >
                                            <td
                                                class="has-text-weight-normal is-size-6 is-vcentered {tipologiaeh ===
                                                    t.tipologiaente &&
                                                misurah === m
                                                    ? 'has-background-info-dark has-text-white'
                                                    : ''}">{t.tipologiaente}</td
                                            >

                                            <td
                                                class="is-vcentered has-text-centered"
                                                on:mouseenter={() => {
                                                    tipologiaeh =
                                                        t.tipologiaente;
                                                    misurah = m;
                                                    tipologiaf =
                                                        "has-background-primary";
                                                }}
                                                on:mouseleave={() => {
                                                    misurah = "";
                                                    tipologiaf = "";
                                                }}
                                                >{t.formalipositivi} /
                                                <span
                                                    class="has-text-weight-bold"
                                                    >{t.formalipositivirolling}</span
                                                ></td
                                            >
                                            <td
                                                class="is-vcentered has-text-centered"
                                                on:mouseenter={() => {
                                                    tipologiaeh =
                                                        t.tipologiaente;
                                                    misurah = m;
                                                    tipologiaf =
                                                        "has-background-primary";
                                                }}
                                                on:mouseleave={() => {
                                                    misurah = "";
                                                    tipologiaf = "";
                                                }}
                                                >{t.formalinegativi} /
                                                <span
                                                    class="has-text-weight-bold"
                                                    >{t.formalinegativirolling}</span
                                                ></td
                                            >
                                            <td
                                                class="is-vcentered has-text-centered"
                                                on:mouseenter={() => {
                                                    tipologiaeh =
                                                        t.tipologiaente;
                                                    misurah = m;
                                                    tipologiaf =
                                                        "has-background-primary";
                                                }}
                                                on:mouseleave={() => {
                                                    misurah = "";
                                                    tipologiaf = "";
                                                }}
                                                >{t.parzialiformali} /
                                                <span
                                                    class="has-text-weight-bold"
                                                    >{t.parzialiformalirolling}</span
                                                ></td
                                            >
                                            <td
                                                class="is-vcentered has-text-centered"
                                                on:mouseenter={() => {
                                                    tipologiaeh =
                                                        t.tipologiaente;
                                                    misurah = m;
                                                    tipologiaf =
                                                        "has-background-primary";
                                                }}
                                                on:mouseleave={() => {
                                                    misurah = "";
                                                    tipologiaf = "";
                                                }}
                                            >
                                                {isFinite(
                                                    t.numeromediopassaggiformali,
                                                ) &&
                                                !isNaN(
                                                    t.numeromediopassaggiformali,
                                                )
                                                    ? t.numeromediopassaggiformali
                                                    : "n.a."} /
                                                <span
                                                    class="has-text-weight-bold"
                                                    >{isFinite(
                                                        t.numeromediopassaggiformalirolling,
                                                    ) &&
                                                    !isNaN(
                                                        t.numeromediopassaggiformalirolling,
                                                    )
                                                        ? t.numeromediopassaggiformalirolling
                                                        : "n.a."}</span
                                                ></td
                                            >
                                            <td
                                                class="is-vcentered has-text-centered"
                                                on:mouseenter={() => {
                                                    tipologiaeh =
                                                        t.tipologiaente;
                                                    misurah = m;
                                                    tipologiaf =
                                                        "has-background-primary";
                                                }}
                                                on:mouseleave={() => {
                                                    misurah = "";
                                                    tipologiaf = "";
                                                }}
                                                >{isFinite(
                                                    t.tempomedioformale,
                                                ) && !isNaN(t.tempomedioformale)
                                                    ? t.tempomedioformale
                                                    : "n.a."} /
                                                <span
                                                    class="has-text-weight-bold"
                                                    >{isFinite(
                                                        t.tempomedioformalerolling,
                                                    ) &&
                                                    !isNaN(
                                                        t.tempomedioformalerolling,
                                                    )
                                                        ? t.tempomedioformalerolling
                                                        : "n.a."}</span
                                                ></td
                                            >
                                        </tr>
                                    {/if}
                                {/each}
                            {/if}
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>
