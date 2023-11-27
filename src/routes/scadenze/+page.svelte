<script>
    // @ts-nocheck

    import Filters from "$lib/c/ui/Filters.svelte";
    import Header from "$lib/c/ui/header.svelte";
    import Scadenze from "./scadenze.svelte";
    export let data;
    let mostraContr = true;
    let mostraCompl = true;
    console.log(data);
</script>

<Header
    title="scadenze"
    quote="Le scadenze sono positive. Ti aiutano a organizzare il tuo tempo. Ti aiutano a fissare delle priorità. Ti fanno fare le cose anche quando non ne hai voglia."
    author="Harvey Mackay"
/>

<Filters>
    <div class="level-item">
        <div class="control">
            <div class="field">
                <input
                    id="switchContr"
                    type="checkbox"
                    name="switchContr"
                    class="switch is-info"
                    bind:checked={mostraContr}
                />
                <label for="switchContr">Mostra contrattualizzazioni</label>
            </div>
        </div>
    </div>
    <div class="level-item">
        <div class="control">
            <div class="field">
                <input
                    id="switchCompl"
                    type="checkbox"
                    name="switchCompl"
                    class="switch is-info"
                    bind:checked={mostraCompl}
                />
                <label for="switchCompl">Mostra completamenti</label>
            </div>
        </div>
    </div>
</Filters>

<section class="section is-12 px-0 py-1">
    <div class="hero-body py-0">
        <div class="columns">
            <div class="column has-text-centered">
                <Scadenze
                    records={data.scadenze.filter(
                        (f) =>
                            (mostraContr
                                ? f.RecordType.Name ===
                                  "Contrattualizzazione Fornitore"
                                : false) ||
                            (mostraCompl
                                ? f.RecordType.Name === "Completamento Attività"
                                : false),
                    )}
                ></Scadenze>
            </div>
        </div>
    </div>
</section>
