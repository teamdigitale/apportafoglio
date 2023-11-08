<script>
    import Header from "$lib/c/ui/header.svelte";
    import Pagination from "./pagination.svelte";
    import { fade } from 'svelte/transition';
    export let data;
    import moment from "moment/min/moment-with-locales";
    moment.locale("it");

    let filterMisure = "";
    let serviziDisattivati = false;
    let cperpage;

    let selectedServizio = "";
    const selectServizio = (s) => {
        if (selectedServizio !== "") {
            selectedServizio = "";
        } else {
            selectedServizio = s;
        }
    };

    let filterNomeServizio = '';

    let optionsTipologieEnte = ["Tutte le tipologie enti"].concat(
        Object.values(
            data.anagraficaClusters.reduce((a, { Tipologia_Ente__c }) => {
                a[Tipologia_Ente__c] = a[Tipologia_Ente__c] || {
                    Tipologia_Ente__c,
                    count: 0,
                };
                a[Tipologia_Ente__c].count++;
                return a;
            }, Object.create(null))
        )
            .map((x) => x.Tipologia_Ente__c)
            .sort()
    );
    let filterTipologiaEnte = optionsTipologieEnte[0];

    $: filterServizi = () => {
        let result = [];
        if (selectedServizio !== "") {
            result.push(
                data.anagraficaServizi.filter(
                    (s) => s.Id === selectedServizio
                )[0]
            );
        } else {
            let clusters = data.anagraficaClusters.filter(
                (c) =>
                    (filterMisure === ""
                        ? true
                        : c.Misura__c === filterMisure) &&
                    (filterTipologiaEnte === optionsTipologieEnte[0]
                        ? true
                        : c.Tipologia_Ente__c === filterTipologiaEnte)
            );
            for (let z = 0; z < clusters.length; z++) {
                let cataloghi = data.anagraficaCatalogo.filter(
                    (ac) => ac.Cluster__c === clusters[z].Id
                );
                for (let y = 0; y < cataloghi.length; y++) {
                    let servizi = data.anagraficaServizi.filter(
                        (as) => as.Id === cataloghi[y].Anagrafica_Servizi__c
                    );
                    for (let x = 0; x < servizi.length; x++) {
                        if (
                            result.filter((r) => r.Id === servizi[x].Id)
                                .length === 0
                        ) {
                            result.push(servizi[x]);
                        }
                    }
                }
            }

            if (serviziDisattivati) {
                result = result.filter((r) => r.Data_di_disattivazione__c);
            }
        }
        if(filterNomeServizio!==''){
            result = result.filter(r => r.Name.toUpperCase().includes(filterNomeServizio.toUpperCase()));
        }
        return result;
    };

    $: filterCandidature = () =>{
        let result = [];
        if(selectedServizio!==''){
            result = data.candidature.filter(c=>c.Servizio__r.Anagrafica_Servizi__r.Id===selectedServizio);
            
        }else{
            result = data.candidature;
        }
        return result;
    }

    $: filteredServizi = filterServizi();

    $: filteredCandidature = filterCandidature();
</script>

<Header
    title="servizi"
    quote="Il principio non è vendere una cosa, ma il servizio, la funzione."
    author="Gianroberto Casaleggio"
/>

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
                        <div class="field">
                            <input
                                id="switchSoloDeprecati"
                                type="checkbox"
                                name="switchSoloDeprecati"
                                class="switch is-info"
                                bind:checked={serviziDisattivati}
                            />
                            <label for="switchSoloDeprecati"
                                >Mostra solo servizi deprecati</label
                            >
                        </div>
                    </div>
                </div>
                <div class="level-item">
                    <div class="control">
                        <div class="select is-primary" id="idfiltermisura">
                            <select bind:value={filterMisure}>
                                {#each [{ Id: "", Name: "Tutte le misure" }].concat(data.anagraficaMisure) as item}
                                    <option value={item.Id}>{item.Name}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="level-item">
                    <div class="field">
                        <div class="control">
                            <input
                                class="input is-primary"
                                type="text"
                                placeholder="nome del servizio"
                                bind:value={filterNomeServizio}
                            />
                        </div>
                    </div>
                </div>
                <!--
                <div class="level-item">
                    <div class="control">
                        <div class="select is-primary" id="idfiltertipologia">
                            <select bind:value={filterTipologiaEnte}>
                                {#each optionsTipologieEnte as item}
                                    <option value={item}>{item}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>
                -->
            </div>
        </nav>
    </div>
</section>
<section class="section is-12 px-0 py-0" transition:fade>
    <div class="hero-body py-0">
        <h1 class="title has-text-info">servizi</h1>
        <div class="table-container">
            <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th>Misura</th>
                        <th>Tipologia Ente</th>
                        <th>Categoria</th>
                        <th>Nome</th>
                        <th>Descrizione</th>
                        <th>Codice Tassonomico</th>
                        <th>Data di disattivazione</th>
                        <th>Normativa</th>
                        <th>Servizio a pagamento</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th colspan="9"
                            ><Pagination
                                rows={filteredServizi}
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
                                on:click={selectServizio(c.Id)}
                                class={c.Data_di_disattivazione__c
                                    ? "has-text-danger"
                                    : ""} style="cursor: pointer"
                            >
                                <td
                                    >{data.anagraficaMisure.filter(
                                        (m) =>
                                            m.Id ===
                                            data.anagraficaClusters.filter(
                                                (clu) =>
                                                    clu.Id ===
                                                    data.anagraficaCatalogo.filter(
                                                        (ac) =>
                                                            ac.Anagrafica_Servizi__c ===
                                                            c.Id
                                                    )[0].Cluster__c
                                            )[0].Misura__c
                                    ).length > 0
                                        ? data.anagraficaMisure.filter(
                                              (m) =>
                                                  m.Id ===
                                                  data.anagraficaClusters.filter(
                                                      (clu) =>
                                                          clu.Id ===
                                                          data.anagraficaCatalogo.filter(
                                                              (ac) =>
                                                                  ac.Anagrafica_Servizi__c ===
                                                                  c.Id
                                                          )[0].Cluster__c
                                                  )[0].Misura__c
                                          )[0].Name
                                        : "n.d."}</td
                                >
                                <td
                                    >{data.anagraficaClusters.filter(
                                        (clu) =>
                                            clu.Id ===
                                            data.anagraficaCatalogo.filter(
                                                (ac) =>
                                                    ac.Anagrafica_Servizi__c ===
                                                    c.Id
                                            )[0].Cluster__c
                                    )[0].Tipologia_Ente__c}</td
                                >

                                <td
                                    >{c.Categoria__c
                                        ? c.Categoria__c
                                        : "n.d."}</td
                                >
                                <td>{c.Name ? c.Name : "n.d."}</td>
                                <td
                                    >{c.Descrizione__c
                                        ? c.Descrizione__c
                                        : "n.d."}</td
                                >
                                <td
                                    >{c.Codice_Tassonomico__c
                                        ? c.Codice_Tassonomico__c
                                        : "n.d."}</td
                                >
                                <td
                                    class={c.Data_di_disattivazione__c
                                        ? "has-text-weight-bold"
                                        : ""}
                                    >{c.Data_di_disattivazione__c
                                        ? moment(
                                              c.Data_di_disattivazione__c,
                                              "YYYY-MM-DD"
                                          ).format("DD/MM/YYYY")
                                        : "n.d."}</td
                                >

                                <td
                                    >{c.Normativa_di_riferimento__c
                                        ? c.Normativa_di_riferimento__c
                                        : "n.d."}</td
                                >
                                <td
                                    >{c.Servizio_a_pagamento__c
                                        ? "SI"
                                        : "NO"}</td
                                >
                            </tr>
                        {/each}
                    {/if}
                </tbody>
            </table>
        </div>
    </div>
</section>

{#if selectedServizio!==''}
<section class="section is-12 px-0 py-0 my-3" transition:fade>
    <div class="hero-body py-0">
        <h1 class="title has-text-info">candidature</h1>
        <div class="table-container">
            <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th>Misura</th>
                        <th>Ente</th>
                        <th>Regione</th>
                        <th>Stato</th>
                        <th>CUP</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {#each filteredCandidature as c,index}
                    <!-- Candidatura__r.Id, Candidatura__r.outfunds__Status__c,  , Candidatura__r.Codice_CUP__c -->
                        <tr>
                            <td>{c.Candidatura__r.Misura__c}</td>
                            <td>{c.Candidatura__r.outfunds__Applying_Organization__r.Name}</td>
                            <td>{c.Candidatura__r.Regione__c}</td>
                            <td>{c.Candidatura__r.outfunds__Status__c}</td>
                            <td>{c.Candidatura__r.Codice_CUP__c}</td>
                            <td><a href="/candidatura/{c.Candidatura__r.Id}" target="_blank"><span class="icon"><i class="fas fa-glasses">&nbsp</i></span></a></td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div></div></section> 
    
{/if}
