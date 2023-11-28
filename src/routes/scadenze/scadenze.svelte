<script>
    // @ts-nocheck

    import MediaQuery from "$lib/c/ui/MediaQuery.svelte";

    // @ts-nocheck

    import Scores from "./scores.svelte";
    import moment from "moment/min/moment-with-locales";
    import Pagination from "./pagination.svelte";
    import Tablerow from "./tablerow.svelte";
    moment.locale("it");
    export let records;
    let cperpage;
    let focused = "";
    const setFocused = (f) => {
        if (focused === "") {
            focused = f;
        } else {
            if (focused === f) {
                focused = "";
            } else {
                //do nothing
            }
        }
    };

    $: filteredRecords = () => {
        if (focused === "") {
            return records;
        } else if (focused === "7gg") {
            return records.filter((s) =>
                moment(s.outfunds__Due_Date__c, "YYYY-MM-DD").isBefore(
                    moment().add(7, "days"),
                ),
            );
        } else if (focused === "30gg") {
            return records.filter(
                (s) =>
                    moment(s.outfunds__Due_Date__c, "YYYY-MM-DD").isBefore(
                        moment().add(30, "days"),
                    ) &&
                    moment(s.outfunds__Due_Date__c, "YYYY-MM-DD").isAfter(
                        moment().add(7, "days"),
                    ),
            );
        } else if (focused === "p30gg") {
            return records.filter((s) =>
                moment(s.outfunds__Due_Date__c, "YYYY-MM-DD").isAfter(
                    moment().add(30, "days"),
                ),
            );
        } else {
            return records;
        }
    };
</script>

<div class="columns">
    {#if focused === "" || focused === "7gg"}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            class="column has-text-centered ispoint"
            on:click={() => setFocused("7gg")}
        >
            <Scores
                score="{records.filter((s) =>
                    moment(s.outfunds__Due_Date__c, 'YYYY-MM-DD').isBefore(
                        moment().add(7, 'days'),
                    ),
                ).length} entro 7 giorni"
                color="danger"
            >
                <p>
                    {records
                        .filter((s) =>
                            moment(
                                s.outfunds__Due_Date__c,
                                "YYYY-MM-DD",
                            ).isBefore(moment().add(7, "days")),
                        )
                        .filter(
                            (r) =>
                                r.RecordType.Name ===
                                "Contrattualizzazione Fornitore",
                        ).length} contrattualizzazioni
                </p>
                <p>
                    {records
                        .filter((s) =>
                            moment(
                                s.outfunds__Due_Date__c,
                                "YYYY-MM-DD",
                            ).isBefore(moment().add(7, "days")),
                        )
                        .filter(
                            (r) =>
                                r.RecordType.Name === "Completamento Attività",
                        ).length} completamenti attività
                </p>
            </Scores>
        </div>
    {/if}
    {#if focused === "" || focused === "30gg"}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            class="column has-text-centered ispoint"
            on:click={() => setFocused("30gg")}
        >
            <Scores
                score="{records.filter(
                    (s) =>
                        moment(s.outfunds__Due_Date__c, 'YYYY-MM-DD').isBefore(
                            moment().add(30, 'days'),
                        ) &&
                        moment(s.outfunds__Due_Date__c, 'YYYY-MM-DD').isAfter(
                            moment().add(7, 'days'),
                        ),
                ).length} entro 30 giorni"
                color="info"
            >
                <p>
                    {records
                        .filter(
                            (s) =>
                                moment(
                                    s.outfunds__Due_Date__c,
                                    "YYYY-MM-DD",
                                ).isBefore(moment().add(30, "days")) &&
                                moment(
                                    s.outfunds__Due_Date__c,
                                    "YYYY-MM-DD",
                                ).isAfter(moment().add(7, "days")),
                        )
                        .filter(
                            (r) =>
                                r.RecordType.Name ===
                                "Contrattualizzazione Fornitore",
                        ).length} contrattualizzazioni
                </p>
                <p>
                    {records
                        .filter(
                            (s) =>
                                moment(
                                    s.outfunds__Due_Date__c,
                                    "YYYY-MM-DD",
                                ).isBefore(moment().add(30, "days")) &&
                                moment(
                                    s.outfunds__Due_Date__c,
                                    "YYYY-MM-DD",
                                ).isAfter(moment().add(7, "days")),
                        )
                        .filter(
                            (r) =>
                                r.RecordType.Name === "Completamento Attività",
                        ).length} completamenti attività
                </p>
            </Scores>
        </div>
    {/if}
    {#if focused === "" || focused === "p30gg"}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            class="column has-text-centered ispoint"
            on:click={() => setFocused("p30gg")}
        >
            <Scores
                score="{records.filter((s) =>
                    moment(s.outfunds__Due_Date__c, 'YYYY-MM-DD').isAfter(
                        moment().add(30, 'days'),
                    ),
                ).length} tra più di 30 giorni"
                color="success"
            >
                <p>
                    {records
                        .filter((s) =>
                            moment(
                                s.outfunds__Due_Date__c,
                                "YYYY-MM-DD",
                            ).isAfter(moment().add(30, "days")),
                        )
                        .filter(
                            (r) =>
                                r.RecordType.Name ===
                                "Contrattualizzazione Fornitore",
                        ).length} contrattualizzazioni
                </p>
                <p>
                    {records
                        .filter((s) =>
                            moment(
                                s.outfunds__Due_Date__c,
                                "YYYY-MM-DD",
                            ).isAfter(moment().add(30, "days")),
                        )
                        .filter(
                            (r) =>
                                r.RecordType.Name === "Completamento Attività",
                        ).length} completamenti attività
                </p>
            </Scores>
        </div>
    {/if}
</div>
<div class="columns">
    <div class="column has-text-centered">
        <MediaQuery query="(max-width: 768px)" let:matches>
            <div class="table-container">
                <table class="table is-hoverable is-narrow is-fullwidth">
                    <thead>
                        <tr class="has-text-left">
                            <th>Ente</th>
                            <th>Avviso</th>
                            <th>Tipologia</th>
                            <th>Scadenza</th>
                            <th>Richiesta Variazione</th>
                            <th />
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th colspan="8"
                                ><Pagination
                                    rows={filteredRecords()}
                                    perPage={10}
                                    bind:trimmedRows={cperpage}
                                /></th
                            >
                        </tr>
                    </tfoot>
                    <tbody>
                        {#if cperpage}
                            {#each cperpage as c}
                                <Tablerow {c} />
                            {/each}
                        {/if}
                    </tbody>
                </table>
            </div>
        </MediaQuery>
    </div>
</div>

<style>
    
</style>
