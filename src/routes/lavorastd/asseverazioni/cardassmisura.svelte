<script>
    import Bars from "./bars.svelte";
    import Pie from "./pie.svelte";

    // @ts-nocheck



    export let tasksTecnici = [];
    export let tasksFormali = [];
    export let misura;
    export let tipoTask = "";

   // @ts-ignore
     $: dataforbars = [["Tipologia", "Positivi", "In lavorazione", "Parziali",  "Negativi"],
    ['Tecnici',
    tasksTecnici.filter(t=>t.Esito__c==='Positivo').length,
    tasksTecnici.filter(t=>t.Esito__c==='In lavorazione').length,
    tasksTecnici.filter(t=>t.Esito__c==='Parziale').length,
    tasksTecnici.filter(t=>t.Esito__c==='Negativo').length],
    ['Formali',
    tasksFormali.filter(t=>t.Esito__c==='Positivo').length,
    tasksFormali.filter(t=>t.Esito__c==='In lavorazione').length,
    tasksFormali.filter(t=>t.Esito__c==='Parziale').length,
    tasksFormali.filter(t=>t.Esito__c==='Negativo').length]
    ];

    
</script>

<div class="card has-background-grey-lighter">
    <header class="has-background-info">
        <p class="card-header-title">
            {misura}
        </p>
    </header>
    <div class="card-content">
        <Bars values={dataforbars} id="{misura}-t-bars" direction="horizontal" />
        
    </div>
</div>
