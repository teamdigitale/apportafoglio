<script>
    // @ts-nocheck

    import Pie from "./pie.svelte";

    export let tasks = [];
    export let tipoTask = "";

    $: dataforpie = [{Esito__c: "Esito", count: "Numero task"}].concat(
            Object.values(
                tasks.reduce((a, { Esito__c }) => {
                    a[Esito__c] = a[Esito__c] || {
                        Esito__c,
                        count: 0,
                    };
                    a[Esito__c].count++;
                    return a;
                }, Object.create(null))
            )
        )
        .map(e=>
            [e.Esito__c,e.count]
        ).sort((a,b)=>{
            return a[0].localeCompare(b[0]);
        });
    
    
</script>

<div class="card bm--card-equal-height has-background-grey-lighter">
    <header class="has-background-info">
        <p class="card-header-title">
            {tipoTask} - Totale tasks: {tasks.length}
        </p>
    </header>
    <div class="card-content">
        <Pie id="pie-{tipoTask}" values={dataforpie} />
    </div>
</div>
