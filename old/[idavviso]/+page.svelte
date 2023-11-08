<script>
    export let data;

    let tipologieEnti = 
        Object.values(
            data.clusters.reduce((a, { Tipologia_Ente__c }) => {
                a[Tipologia_Ente__c] = a[Tipologia_Ente__c] || {
                    Tipologia_Ente__c,
                    count: 0,
                };
                a[Tipologia_Ente__c].count++;
                return a;
            }, Object.create(null))
        )
            .map((x) => x.Tipologia_Ente__c.toLowerCase())
            .sort()
    ;

</script>

<div>
    <ul>
        {#each data.clusters as cluster}
            <li>
                <p>
                    <span>Numero minimo servizi: </span>
                    <span>{cluster.Numero_Min_Servizi__c}</span>
                </p>
                <p>
                    <span>Numero massimo servizi: </span>
                    <span>{cluster.Numero_Max_Servizi__c}</span>
                </p>
                <p>
                    <span>Tipologia Ente: </span>
                    <span>{cluster.Tipologia_Ente__c}</span>
                </p>
            </li>
        {/each}
    </ul>
</div>
