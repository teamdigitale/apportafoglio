<script>
    import moment from "moment/min/moment-with-locales";
    moment.locale("it");

    export let data;

    const maxrecords = 200;

    $: candidature = data.candidature.filter((x,index) => index<maxrecords);


</script>

<section class="hero is-small is-warning is-12 my-3">
    <div class="hero-body m-1 p-1">
        <p class="title">analisi data contrattualizzazione</p>
        <p class="subtitle is-5">mi sono allenato per {data.trainingTime} su {#each data.inputcategories as c,index}
            {c}{index===data.inputcategories.length-1?'':', '}
        {/each}</p>
    </div>
</section>


<section class="section is-12 p-2">
    <table class="table is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
            <tr>
                <th></th>
                <th>Regione</th>
                <th>Provincia</th>
                <th>Ente</th>
                <th>Misura</th>
                <th>Data finanziamento</th>
                <th>Data stimata</th>
                <th>Delta su previsione</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {#each candidature as c,index}
                <tr>
                    <td>{index+1}</td>
                    <td>{c.Regione__c}</td>
                    <td>{c.outfunds__Applying_Organization__r.ShippingState}</td>
                    <td>{c.outfunds__Applying_Organization__r.Name}</td>
                    <td>{c.Misura__c}</td>
                    <td>{moment(c.Data_Finanziamento__c,'YYYY-MM-DD').format("DD/MM/YYYY")}</td>
                    
                    <td class="has-text-weight-bold {
                        Math.round((moment().toDate()-(moment(c.Data_Finanziamento__c,'YYYY-MM-DD').add(data.datecontr.filter(d=>d.id===c.Id)[0].gg,'d')).toDate())/1000/60/60/24)
                        <0?'has-text-success'
                        :Math.round((moment().toDate()-(moment(c.Data_Finanziamento__c,'YYYY-MM-DD').add(data.datecontr.filter(d=>d.id===c.Id)[0].gg,'d')).toDate())/1000/60/60/24)
                        >30?'has-text-danger'
                        :(Math.round((moment().toDate()-(moment(c.Data_Finanziamento__c,'YYYY-MM-DD').add(data.datecontr.filter(d=>d.id===c.Id)[0].gg,'d')).toDate())/1000/60/60/24)
                        >=0 && Math.round((moment().toDate()-(moment(c.Data_Finanziamento__c,'YYYY-MM-DD').add(data.datecontr.filter(d=>d.id===c.Id)[0].gg,'d')).toDate())/1000/60/60/24)
                        <=60)?'has-text-info'
                        :'' }">{moment(c.Data_Finanziamento__c,'YYYY-MM-DD').add(data.datecontr.filter(d=>d.id===c.Id)[0].gg,'d').format("DD/MM/YYYY") }</td>
                    <td>
                        {Math.round((moment().toDate()-(moment(c.Data_Finanziamento__c,'YYYY-MM-DD').add(data.datecontr.filter(d=>d.id===c.Id)[0].gg,'d')).toDate())/1000/60/60/24) }
                    </td>
                    <td><a href="/candidatura/{c.Id}" target="_blank"><span class="icon"><i class="fas fa-glasses">&nbsp</i></span></a></td>
                </tr>
            {/each}
        </tbody>
    </table>
</section>
