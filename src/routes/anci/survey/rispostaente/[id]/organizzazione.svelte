<script>
	// @ts-nocheck

	import moment from 'moment/min/moment-with-locales';
	import Insights from './Insights.svelte';
	import Domandaarispostasingola from './domandaarispostasingola.svelte';
	import Domandaarispostamultipla from './domandaarispostamultipla.svelte';
	import Livellipervoce from './livellipervoce.svelte';
	import ElencoVoci from './ElencoVoci.svelte';
	moment.locale('it');
	export let s;
	export let tipo;
</script>

<Domandaarispostamultipla {s} codice="2.1" />

{#if s.domande
	.find((x) => x.codice === '2.1')
	.risposte.indexOf('Il Comune partecipa a una gestione ICT associata con altri enti pubblici') !== -1}
	<Domandaarispostamultipla {s} codice="2.1.1" />
{/if}

{#if s.domande.find((x) => x.codice === '2.1.1').risposte.indexOf('Altro') !== -1}
	<Domandaarispostasingola {s} codice="2.1.1.1" />
{/if}

<Domandaarispostasingola {s} codice="2.2" />

<Domandaarispostasingola {s} codice="2.3" />

<Domandaarispostamultipla {s} codice="2.4" />

{#if tipo==='Grandi Comuni'}
<Domandaarispostasingola {s} codice="2.5" />
{/if}

<Domandaarispostasingola {s} codice="2.6" />

<Domandaarispostasingola {s} codice="2.7" />

<ElencoVoci {s} codice="2.8" icons={[
	["Supporto significativo","it-error","danger"],
	["Supporto moderato","it-warning-circle","warning"],
	["Supporto minimo","it-check-circle","primary"],
	["Nessun supporto necessario","it-check-circle","success"],
	]} />
	
<!--
<Livellipervoce {s} codice="2.8" colors={["grey","#008055","#0066cc","#995c00","#cc334d"]}/>
-->
