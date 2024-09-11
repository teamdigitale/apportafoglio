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
</script>

<Domandaarispostasingola {s} codice="4.1" />
<Domandaarispostasingola {s} codice="4.2" />
{#if tipo === 'Grandi Comuni'}
	<Domandaarispostamultipla {s} codice="4.3" />

	<ElencoVoci
		{s}
		codice="4.4"
		icons={[
			['Da 1 a 5', 'it-warning-circle', 'warning'],
			['Nessun attacco', 'it-check-circle', 'success'],
			['Oltre i 5', 'it-error', 'danger'],
			['Dato non disponibile', 'it-error', 'danger']
		]}
	/>

	<Domandaarispostamultipla {s} codice="4.5" />
{/if}
