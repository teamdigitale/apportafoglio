<script>
    import Assinforowcell from "./assinforowcell.svelte";

    export let misure;
    export let sortedData;
    export let trenta=false;
</script>

<div class="box">
    <table class="table is-bordered">
        <thead class="">
            <tr>
                <th rowspan="2" class="is-vcentered has-text-black">&nbsp;</th>
                <th
                    colspan="4"
                    class="has-text-centered has-text-white has-background-link-dark"
                    >Tecnici</th
                >
                <th
                    colspan="4"
                    class="has-text-centered has-text-white has-background-warning-dark"
                    >Formali</th
                >
            </tr>
            <tr>
                <th
                    class="has-text-centered has-text-white has-background-link-dark"
                    >Positivi<br /><span class="is-size-7"
                        >#<br /><span class="has-text-weight-normal"
                            >gg medi</span
                        ></span
                    ></th
                >
                <th
                    class="has-text-centered has-text-white has-background-link-dark"
                    >Parziali<br /><span class="is-size-7"
                        >#<br /><span class="has-text-weight-normal"
                            >gg medi</span
                        ></span
                    ></th
                >
                <th
                    class="has-text-centered has-text-white has-background-link-dark"
                    >Negativi<br /><span class="is-size-7"
                        >#<br /><span class="has-text-weight-normal"
                            >gg medi</span
                        ></span
                    ></th
                >
                {#if !trenta}
                <th
                    class="is-vcentered has-text-centered has-text-white has-background-link-dark"
                    >Passaggi medi<br /><span
                        class="is-size-7 has-text-weight-normal"
                        >tasks/candidatura<br /></span
                    ></th
                >
                {/if}
                <th
                    class="has-text-centered has-text-white has-background-warning-dark"
                    >Positivi<br /><span class="is-size-7"
                        >#<br /><span class="has-text-weight-normal"
                            >gg medi</span
                        ></span
                    ></th
                >
                <th
                    class="has-text-centered has-text-white has-background-warning-dark"
                    >Parziali<br /><span class="is-size-7"
                        >#<br /><span class="has-text-weight-normal"
                            >gg medi</span
                        ></span
                    ></th
                >
                <th
                    class="has-text-centered has-text-white has-background-warning-dark"
                    >Negativi<br /><span class="is-size-7"
                        >#<br /><span class="has-text-weight-normal"
                            >gg medi</span
                        ></span
                    ></th
                >
                {#if !trenta}

                <th
                    class="is-vcentered has-text-centered has-text-white has-background-warning-dark"
                    >Passaggi medi<br /><span
                        class="is-size-7 has-text-weight-normal"
                        >tasks/candidatura<br /></span
                    ></th
                >
                {/if}
            </tr>
        </thead>
        <tbody>
            {#each misure as m}
                <tr class="has-background-grey-light">
                    <td
                        colspan="9"
                        class="has-text-weight-bold is-size-7 is-vcentered"
                        >{m}</td
                    >
                </tr>
                {#each sortedData.filter((sd) => sd.misura === m) as t}
                    {#if t.tecnicimedi > 0 || t.formalimedi > 0}
                        <tr>
                            <td class=" is-vcentered">{t.tipologiaente}</td>
                            <Assinforowcell
                                {t}
                                esito="Positivo"
                                tipo={trenta?"tecnici30":"tecnici"}
                                textcolor="link-dark"
                            />
                            <Assinforowcell
                                {t}
                                esito="Parziale"
                                tipo={trenta?"tecnici30":"tecnici"}
                                textcolor="link-dark"
                            />
                            <Assinforowcell
                                {t}
                                esito="Negativo"
                                tipo={trenta?"tecnici30":"tecnici"}
                                textcolor="link-dark"
                            />
                            {#if !trenta}
                            <td
                                class="has-text-centered is-vcentered has-text-link-dark"
                                >{Math.round(trenta?t.tecnicimedi30:t.tecnicimedi * 100) / 100}</td
                            >
                            {/if}
                            <Assinforowcell
                                {t}
                                esito="Positivo"
                                tipo={trenta?"formali30":"formali"}
                                textcolor="warning-dark"
                            />
                            <Assinforowcell
                                {t}
                                esito="Parziale"
                                tipo={trenta?"formali30":"formali"}
                                textcolor="warning-dark"
                            />
                            <Assinforowcell
                                {t}
                                esito="Negativo"
                                tipo={trenta?"formali30":"formali"}
                                textcolor="warning-dark"
                            />
                            {#if !trenta}
                            <td
                                class="has-text-centered is-vcentered has-text-warning-dark"
                                >{Math.round(trenta?t.formalimedi30:t.formalimedi * 100) / 100}</td
                            >
                            {/if}
                        </tr>
                    {/if}
                {/each}
            {/each}
        </tbody>
    </table>
</div>
