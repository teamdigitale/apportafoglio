<script>
    export let esito; //"Positivo", "Parziale" o "Negativo"
    export let t;
    export let tipo; //"tecnici" o "formali"
</script>

{#if t[tipo].filter((tt) => tt.Esito__c === esito).length > 0}
    <div class="tags has-addons">
        <span class="tag {esito==="Positivo"?"is-success":esito==="Parziale"?"is-info":"is-danger"}">Tasks {esito==="Positivo"?"positivi":esito==="Parziale"?"parziali":"negativi"}:</span>
        <span class="tag is-dark"
            >{t[tipo].filter((tt) => tt.Esito__c === esito).length}</span
        >
        <span class="tag {esito==="Positivo"?"is-success":esito==="Parziale"?"is-info":"is-danger"} is-light"
            >Tempo medio: {Math.round(
                t[tipo]
                    .filter((tt) => tt.Esito__c === esito)
                    .reduce(
                        (a, c) =>
                            a +
                            Math.round(
                                (new Date(c.LastModifiedDate) -
                                    new Date(c.CreatedDate)) /
                                    (1000 * 60 * 60 * 24),
                            ),
                        0,
                    ) /
                    t[tipo].filter((tt) => tt.Esito__c === esito).length,
            )}gg</span
        >
    </div>
{/if}
