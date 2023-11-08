<script>

export let misura = '';
export let tasks = [];


$: aggregatoStati = Object.values(
    tasks.reduce((a, { Esito__c }) => {
                a[Esito__c] = a[Esito__c] || {
                    Esito__c,
                    count: 0,
                };
                a[Esito__c].count++;
                return a;
            }, Object.create(null))
        ).sort(function (a, b) {
            return b.Esito__c - a.Esito__c;
        })


</script>


{#if tasks && tasks.length>0}
<div class="column is-half">
    <div
        class="card bm--card-equal-height has-background-grey-lighter"
    >
        <header class="has-background-info">
            <p class="card-header-title">
                {misura}
            </p>
        </header>
        <div class="card-content p-1 m-1">
            <p>
                <span class="mx-2">Totale assegnate:</span
                ><span class="has-text-weight-bold is-size-5">{tasks.length}</span>
            </p>

            <div class="field is-grouped is-grouped-multiline my-1">
                {#each aggregatoStati as s}
                <div class="control">
                <div class="tags has-addons">    
                    <span class="tag {s.Esito__c==='Positivo'?'is-success':(s.Esito__c==='Parziale'?'is-warning':'is-info')}">{s.Esito__c?s.Esito__c:'In lavorazione'}</span>
                    <span class="tag is-dark">{s.count}</span>
                </div>    
            </div>
                {/each}
            </div>
              
        </div>

    </div>
</div>
{/if}


<style>
    .bm--card-equal-height {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .bm--card-equal-height .card-footer {
        margin-top: auto;
    }
</style>