<script>
    export let infomisura;
    import moment from "moment/min/moment-with-locales";
    
    moment.locale("it");

    const stativalidi = ["ACCETTATA", "FINANZIATA", "IN VERIFICA"];
    const statiinlavorazione = ["PREBOZZA", "BOZZA", "CONCLUSA"];
    const statinonvalidi = [
        "ANNULLATA",
        "NON ACCETTATA",
        "NON AMMESSA",
        "RINUNCIATA",
        "RITIRATA",
        "SCADUTA",
    ];
</script>
<div class="card bm--card-equal-height has-background-grey-lighter">
    <header
        class="has-background-{infomisura.avvisiaperti?'primary':'info'}"
    >
        <p class="card-header-title">
            {infomisura.misura}
        </p>
    </header>
    <div class="card-content">
        
        <p>
            <span class="has-text-weight-bold has-text-{infomisura.color}">
                
            {infomisura.messaggio}</span>
            </p>
            <ol>
            {#each infomisura.candidature as c}
                <li class="has-text-weight-bold {stativalidi.indexOf(c.outfunds__Status__c)===-1?'has-text-grey-dark':'has-text-info'}">
                    <span>{c.outfunds__Status__c} - <a href="/candidatura/{c.Id}" target="_blank"><span class="icon"><i class="fas fa-glasses">&nbsp</i></span></a></span>
                </li>
            {/each}
        </ol>
       
    </div>
</div>

<style>
        .bm--card-equal-height {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
</style>
