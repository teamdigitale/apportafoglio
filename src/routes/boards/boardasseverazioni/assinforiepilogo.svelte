<script>
    import Assinfo from "./assinfo.svelte";
    export let t;
</script>

{#if (t.tecnici.length > 0 && (t.tecnici.filter((tt) => tt.Esito__c === "Positivo").length > 0 || t.tecnici.filter((tt) => tt.Esito__c === "Negativo").length > 0 || t.tecnici.filter((tt) => tt.Esito__c === "Parziale").length > 0)) || (t.formali.length > 0 && (t.formali.filter((tt) => tt.Esito__c === "Positivo").length > 0 || t.formali.filter((tt) => tt.Esito__c === "Negativo").length > 0 || t.formali.filter((tt) => tt.Esito__c === "Parziale").length > 0))}
    <div class="box">
        <div class="columns is-multiline">
            <div class="column is-full is-centered has-text-centered">
                <p class="is-size-5 has-text-weight-bold">{t.tipologiaente}</p>
            </div>
            <div class="column is-half">
                {#if t.tecnici.length > 0 && (t.tecnici.filter((tt) => tt.Esito__c === "Positivo").length > 0 || t.tecnici.filter((tt) => tt.Esito__c === "Negativo").length > 0 || t.tecnici.filter((tt) => tt.Esito__c === "Parziale").length > 0)}
                    Tecnici
                    <article class="message is-dark">
                        <div class="message-body">
                            <Assinfo {t} esito="Positivo" tipo="tecnici" />
                            <Assinfo {t} esito="Parziale" tipo="tecnici" />
                            <Assinfo {t} esito="Negativo" tipo="tecnici" />
                            <p class="has-text-info">
                                <span
                                    >Numero medio di passaggi per candidatura:</span
                                >
                                <span class="has-text-weight-bold">
                                    {Math.round(t.tecnicimedi * 100) / 100}
                                </span>
                            </p>
                        </div>
                    </article>
                {/if}
            </div>
            <div class="column is-half">
                {#if t.formali.length > 0 && (t.formali.filter((tt) => tt.Esito__c === "Positivo").length > 0 || t.formali.filter((tt) => tt.Esito__c === "Negativo").length > 0 || t.formali.filter((tt) => tt.Esito__c === "Parziale").length > 0)}
                    Formali
                    <article class="message is-dark">
                        <div class="message-body">
                            <Assinfo {t} esito="Positivo" tipo="formali" />
                            <Assinfo {t} esito="Parziale" tipo="formali" />
                            <Assinfo {t} esito="Negativo" tipo="formali" />
                            <p class="has-text-info">
                                <span
                                    >Numero medio di passaggi per candidatura:</span
                                >
                                <span class="has-text-weight-bold">
                                    {Math.round(t.formalimedi * 100) / 100}
                                </span>
                            </p>
                        </div>
                    </article>
                {/if}
            </div>
        </div>
    </div>
{/if}
