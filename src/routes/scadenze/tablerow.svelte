<script>
    export let c;
    import moment from "moment/min/moment-with-locales";
    moment.locale("it");

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

    let selected = false;

    const select = () => {
        selected = true;
    };
    const deselect = () => {
        selected = false;
    };
</script>

<tr
    class="has-text-left"
    class:is-selected={selected}
    on:mouseenter={select}
    on:mouseleave={deselect}
>
    <td
        >{c.outfunds__Funding_Request__r.outfunds__Applying_Organization__r
            .Name}</td
    >
    <td>
        {c.outfunds__Funding_Request__r.outfunds__FundingProgram__r.Name}
    </td>
    <td>
        {c.RecordType.Name}
    </td>
    <td>{moment(c.outfunds__Due_Date__c, "YYYY-MM-DD").format("DD/MM/YYYY")}</td
    >
    <td>
        {#if c.rv && c.rv.length > 0}
            SI - {c.rv[0].Giorni_richiesti__c} giorni
            {#if Number(c.rv[0].Giorni_richiesti__c) >= 90}
                --{c.rv[0].comm.length}
            {/if}
        {:else}
            NO
        {/if}
    </td>
    <td
        ><a
            href="/candidatura/{c.outfunds__Funding_Request__r.Id}"
            target="_blank"
            ><span class="icon has-text-{stileriga(c)}"
                ><i class="fas fa-glasses">&nbsp</i></span
            ></a
        ></td
    >
</tr>

<style>

</style>
