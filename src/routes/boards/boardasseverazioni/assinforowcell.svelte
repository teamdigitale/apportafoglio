<script>
    export let esito; //"Positivo", "Parziale" o "Negativo"
    export let t;
    export let tipo; //"tecnici" o "formali"
    export let textcolor
</script>

{#if t[tipo].filter((tt) => tt.Esito__c === esito).length > 0}
    <td class="has-text-centered has-text-{textcolor}"
        >
        <span class="has-text-weight-bold">
        {t[tipo].filter((tt) => tt.Esito__c === esito).length}</span>
        <br/>
        <span class="is-size-7">
        {Math.round(
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
                ) / t[tipo].filter((tt) => tt.Esito__c === esito).length,
        )} gg
        </span>
    </td>
{:else}
<td class="is-size-7 has-text-centered is-vcentered"><i>n.d.</i></td>
{/if}
