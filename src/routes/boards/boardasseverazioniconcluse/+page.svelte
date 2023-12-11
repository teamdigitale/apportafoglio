<script>
    import Header from "$lib/c/ui/header.svelte";

    export let data;

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


    let tipologiah = '';    
    let tipologiaf = '';  
    let misurah = '';
    let tipologiaeh = '';
</script>

<Header
    title="Overview tasks di asseverazione tecnica e formale"
    quote="Gestire la qualità è importante perché niente è più così semplice, se davvero lo è mai stato."
    author="Philip B. Crosby"
/>

<section class="section is-12 px-0">
    <div class="columns">
        <div class="column is-full title has-text-centered">Totali</div>
    </div>
    <div class="columns">
        <div class="column isfull">
            <div class="box is-centered">
                <table class="table is-bordered is-fullwidth">
                    <thead>
                        <tr>
                            <th rowspan="2" class="is-vcentered has-text-black"
                                >&nbsp;</th
                            >
                            <th colspan="5" class="has-text-centered is-size-4 {tipologiah}"
                                >Tecnici</th
                            >
                            <th colspan="5" class="has-text-centered is-size-4  {tipologiaf}"
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
                                <tr class=" {misurah===m?'has-background-primary':''}" >
                                    <td
                                        colspan="11"
                                        class="has-text-weight-bold is-size-6 is-vcentered"
                                        >{m}</td
                                    >
                                </tr>

                                {#each sortedData.filter((sd) => sd.misura === m) as t}
                                    {#if t.tecnicipositivi > 0 || t.tecnicinegativi > 0}
                                        <tr class={(tipologiaeh===t.tipologiaente&&misurah===m)?'has-background-info has-text-white':''}>
                                            <td
                                                class="has-text-weight-normal is-size-6 is-vcentered {(tipologiaeh===t.tipologiaente&&misurah===m)?'has-background-info-dark has-text-white':''}"
                                                >{t.tipologiaente}</td
                                            >
                                            <td
                                                class="is-vcentered has-text-centered" on:mouseenter={() => {tipologiaeh=t.tipologiaente; misurah=m; tipologiah = 'has-background-primary';}} on:mouseleave={() => {misurah='';tipologiah = ''}}
                                                >{t.tecnicipositivi}</td
                                            >
                                            <td
                                                class="is-vcentered has-text-centered" on:mouseenter={() => {tipologiaeh=t.tipologiaente; misurah=m; tipologiah = 'has-background-primary';}} on:mouseleave={() => {misurah='';tipologiah = ''}}
                                                >{t.tecnicinegativi}</td
                                            >
                                            <td
                                                class="is-vcentered has-text-centered" on:mouseenter={() => {tipologiaeh=t.tipologiaente; misurah=m; tipologiah = 'has-background-primary';}} on:mouseleave={() => {misurah='';tipologiah = ''}}
                                                >{t.parzialitecnici}</td
                                            >
                                            <td
                                                class="is-vcentered has-text-centered" on:mouseenter={() => {tipologiaeh=t.tipologiaente; misurah=m; tipologiah = 'has-background-primary';}} on:mouseleave={() => {misurah='';tipologiah = ''}}
                                                >{t.numeromediopassaggi}</td
                                            >
                                            <td
                                                class="is-vcentered has-text-centered" on:mouseenter={() => {tipologiaeh=t.tipologiaente; misurah=m; tipologiah = 'has-background-primary';}} on:mouseleave={() => {misurah='';tipologiah = ''}}
                                                >{t.tempomediotecnico}</td
                                            >

                                            <td
                                                class="is-vcentered has-text-centered" on:mouseenter={() => {tipologiaeh=t.tipologiaente; misurah=m; tipologiaf = 'has-background-primary';}} on:mouseleave={() => {misurah='';tipologiaf = ''}}
                                                >{t.formalipositivi}</td
                                            >
                                            <td
                                                class="is-vcentered has-text-centered" on:mouseenter={() => {tipologiaeh=t.tipologiaente; misurah=m; tipologiaf = 'has-background-primary';}} on:mouseleave={() => {misurah='';tipologiaf = ''}}
                                                >{t.formalinegativi}</td
                                            >
                                            <td
                                                class="is-vcentered has-text-centered" on:mouseenter={() => {tipologiaeh=t.tipologiaente; misurah=m; tipologiaf = 'has-background-primary';}} on:mouseleave={() => {misurah='';tipologiaf = ''}}
                                                >{t.parzialiformali}</td
                                            >
                                            <td
                                                class="is-vcentered has-text-centered" on:mouseenter={() => {tipologiaeh=t.tipologiaente; misurah=m; tipologiaf = 'has-background-primary';}} on:mouseleave={() => {misurah='';tipologiaf = ''}}
                                                >{isFinite(t.numeromediopassaggiformali)?t.numeromediopassaggiformali:'n.a.'}</td
                                            >
                                            <td
                                                class="is-vcentered has-text-centered" on:mouseenter={() => {tipologiaeh=t.tipologiaente; misurah=m; tipologiaf = 'has-background-primary';}} on:mouseleave={() => {misurah='';tipologiaf = ''}}
                                                >{isFinite(t.numeromediopassaggiformali)?t.tempomedioformale:'n.a.'}</td
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
