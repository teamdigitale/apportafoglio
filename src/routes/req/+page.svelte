<script>

export let data;

</script>

<ul>

    {#each data.reqs as r}
    <li>
        {data.tipireq.filter((t) => t.Id === r.RecordTypeId)[0].Name} - {r.outfunds__Due_Date__c} - {r.outfunds__Status__c} - {r.Ambito__c}
    </li>
    {/each}

</ul>