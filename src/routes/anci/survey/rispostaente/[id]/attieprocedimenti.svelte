<script>
	// @ts-nocheck

	import moment from 'moment/min/moment-with-locales';
	import Insights from './Insights.svelte';
	import Domandaarispostasingola from './domandaarispostasingola.svelte';
	import Domandaarispostamultipla from './domandaarispostamultipla.svelte';
	import Livellipervoce from './livellipervoce.svelte';
	import { dangerColor, secondaryColor, successColor, warningColor } from '$lib/js/shared';
	import ElencoVoci from './ElencoVoci.svelte';
	import TabellaVoci from './TabellaVoci.svelte';
	moment.locale('it');
	export let s;
	export let tipo;
</script>

<ElencoVoci
	{s}
	codice="6.1"
	icons={[
		['Non digitalizzata', 'it-error', 'danger'],
		['Parzialmente digitalizzata', 'it-warning-circle', 'warning'],
		['Atti digitali, ma non viene utilizzato un sistema dedicato', 'it-warning-circle', 'warning'],
		['Totalmente digitalizzata', 'it-check-circle', 'success']
	]}
/>

<Domandaarispostasingola {s} codice="6.2" />

{#if s.domande.find((x) => x.codice === '6.2').risposta ==='Si'}
	
<Domandaarispostamultipla {s} codice="6.2.1" />
{/if}

{#if tipo==='Grandi Comuni'}
<Domandaarispostasingola {s} codice="6.3" />
<Domandaarispostasingola {s} codice="6.4" />
{/if}


<Domandaarispostasingola {s} codice="6.5" />

{#if tipo==='Grandi Comuni'}
<ElencoVoci
	{s}
	codice="6.6"
	icons={[

	]}
/>
{/if}

<ElencoVoci
	{s}
	codice="6.7"
	icons={[

	]}
/>

<Domandaarispostasingola {s} codice="6.8" />

<Domandaarispostasingola {s} codice="6.9" />

<Domandaarispostasingola {s} codice="6.10" />

