<script>
    import MediaQuery from "$lib/c/ui/MediaQuery.svelte";

    // @ts-nocheck

    import Scores from "./scores.svelte";
    import moment from "moment/min/moment-with-locales";
    import Pagination from "../campagne/145/pagination.svelte";
    import { sineIn } from "svelte/easing";
    moment.locale("it");
    export let records;
    let cperpage;

    const stileriga = (r) => {
        if (
            moment(r.outfunds__Due_Date__c, "YYYY-MM-DD").isBefore(
                moment().add(7, "days"),
            )
        ) {
            return "danger";
        } else if (
            moment(r.outfunds__Due_Date__c, "YYYY-MM-DD").isBefore(
                moment().add(30, "days"),
            ) &&
            moment(r.outfunds__Due_Date__c, "YYYY-MM-DD").isAfter(
                moment().add(7, "days"),
            )
        ) {
            return "info";
        } else {
            return "success";
        }
    };
</script>

<div class="columns">
    <div class="column has-text-centered">
        <Scores
            score="{records.length} scadenze"
            color="primary"
            ><p>
                {records.filter(
                    (r) =>
                        r.RecordType.Name === "Contrattualizzazione Fornitore",
                ).length} contrattualizzazioni
            </p>
            <p>
                {records.filter(
                    (r) => r.RecordType.Name === "Completamento Attività",
                ).length} completamenti attività
            </p>
        </Scores>
    </div>
</div>
<div class="columns">
    <div class="column has-text-centered">
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
                        moment(s.outfunds__Due_Date__c, "YYYY-MM-DD").isBefore(
                            moment().add(7, "days"),
                        ),
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
                        moment(s.outfunds__Due_Date__c, "YYYY-MM-DD").isBefore(
                            moment().add(7, "days"),
                        ),
                    )
                    .filter(
                        (r) => r.RecordType.Name === "Completamento Attività",
                    ).length} completamenti attività
            </p>
        </Scores>
    </div>
    <div class="column has-text-centered">
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
                        (r) => r.RecordType.Name === "Completamento Attività",
                    ).length} completamenti attività
            </p>
        </Scores>
    </div>
    <div class="column has-text-centered">
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
                        moment(s.outfunds__Due_Date__c, "YYYY-MM-DD").isAfter(
                            moment().add(30, "days"),
                        ),
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
                        moment(s.outfunds__Due_Date__c, "YYYY-MM-DD").isAfter(
                            moment().add(30, "days"),
                        ),
                    )
                    .filter(
                        (r) => r.RecordType.Name === "Completamento Attività",
                    ).length} completamenti attività
            </p>
        </Scores>
    </div>
</div>
<div class="columns">
    <div class="column has-text-centered">
        <MediaQuery query="(max-width: 768px)" let:matches>
            <div class="table-container">
                <table
                    class="table is-striped is-narrow is-hoverable is-fullwidth"
                >
                    <thead>
                        <tr class="has-text-left">
                            <th />
                            <th>Ente</th>
                            <th>Avviso</th>
                            <th>Tipologia</th>
                            <th>Scadenza</th>
                            <th>Richiesta Variazione</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th colspan="8"
                                ><Pagination
                                    rows={records}
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
                                    class="has-text-left has-text-{stileriga(
                                        c,
                                    )}"
                                >
                                <td
                                ><a
                                    href="/candidatura/{c.outfunds__Funding_Request__r.Id}"
                                    target="_blank"
                                    ><span class="icon"
                                        ><i class="fas fa-glasses">&nbsp</i
                                        ></span
                                    ></a
                                ></td
                            >
                                    <td
                                        >{c.outfunds__Funding_Request__r
                                            .outfunds__Applying_Organization__r
                                            .Name}</td
                                    >
                                    <td>
                                        {c.outfunds__Funding_Request__r.outfunds__FundingProgram__r.Name}
                                    </td>
                                    <td>
                                        {c.RecordType.Name}
                                    </td>
                                    <td
                                        >{moment(
                                            c.outfunds__Due_Date__c,
                                            "YYYY-MM-DD",
                                        ).format("DD/MM/YYYY")}</td
                                    >
                                    <td>
                                        {#if c.rv && c.rv.length>0}
                                        SI - {c.rv[0].Giorni_richiesti__c} giorni
                                        {:else}
                                        NO
                                        {/if}
                                    </td>
                                </tr>
                            {/each}
                        {/if}
                    </tbody>
                </table>
            </div>
        </MediaQuery>
    </div>
</div>
