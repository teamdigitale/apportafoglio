<script>
	// @ts-nocheck

	import moment from 'moment/min/moment-with-locales';
	import Insights from './Insights.svelte';
	import Domandaarispostasingola from './domandaarispostasingola.svelte';
	import Domandaarispostamultipla from './domandaarispostamultipla.svelte';
	import Livellipervoce from './livellipervoce.svelte';
	import { dangerColor, secondaryColor, successColor, warningColor } from '$lib/js/shared';
	import ElencoVoci from './ElencoVoci.svelte';
	moment.locale('it');
	export let s;
	export let tipo;
	let dismissioneParziale = s.domande.find((x) => x.codice === '3.1');
</script>

<Domandaarispostasingola {s} codice="3.1" />

{#if dismissioneParziale.risposta.indexOf('No, non è stato dismesso ancora nessun server') !== -1 || dismissioneParziale.risposta.indexOf('Si, sono stati dismessi meno del 25% dei server') !== -1 || dismissioneParziale.risposta.indexOf('Si, sono stati dismessi dal 25% al 50% dei server') !== -1}
	<Domandaarispostasingola {s} codice="3.1.1" />

	<Domandaarispostamultipla {s} codice="3.1.2" />

	{#if s.domande
		.find((x) => x.codice === '3.1.2')
		.risposte.indexOf('Gestione e archivio di file (documenti, dati, immagini, ecc.)') !== -1}
		<Domandaarispostamultipla {s} codice="3.1.3" />
	{/if}
{/if}

{#if tipo==='Grandi Comuni'}
<Livellipervoce {s} codice="3.2" colors={["grey","#0066cc","#0066cc","#0066cc","#0066cc","#0066cc","#0066cc","#0066cc","#0066cc","#0066cc","#0066cc"]} showzero={false} xlabelappend="%"/>
{/if}

<Domandaarispostasingola {s} codice="3.3" />

<ElencoVoci {s} codice="3.4" icons={[
	["Dato non disponibile","it-error","danger"],
	["Fino a 10 Mbps","it-error","danger"],
	["Fra 11 e 100 Mbps","it-warning-circle","warning"],
	["Oltre 100 Mbps","it-check-circle","success"],
	]} />

<!--
<Livellipervoce {s} codice="3.4" colors={["grey",secondaryColor,dangerColor,warningColor,successColor]} showzero={true} xlabelappend="" barHehight={100}/>
-->

<Domandaarispostasingola {s} codice="3.5" />

<ElencoVoci {s} codice="3.6" icons={[
	["Servizi non erogati","it-error","danger"],
	["Personale dell'Ente","it-check-circle","success"],
	["Fornitori esterni","it-check-circle","success"],
	["Entrambe le modalità","it-check-circle","success"],
	]} />