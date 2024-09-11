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

{#if tipo === 'Grandi Comuni'}
	<ElencoVoci
		{s}
		codice="7.1"
		icons={[
			['Non rilevante', 'it-arrow-down-circle', 'danger'],
			['Rilevante', 'it-burger', 'warning'],
			['Essenziale', 'it-arrow-up-circle', 'success']
		]}
	/>
{/if}

<Domandaarispostamultipla {s} codice="7.2" sorted={true} />

<TabellaVoci {s} codice="7.3" redlabel="Nessuna" />

<ElencoVoci
	{s}
	codice="7.4"
	icons={[
		['Nessuna o poca rilevanza', 'it-arrow-down-circle', 'danger'],
		['Abbastanza rilevante', 'it-burger', 'warning'],
		['Molto rilevante', 'it-arrow-up-circle', 'success']
	]}
/>

<Domandaarispostamultipla {s} codice="7.5" />

{#if tipo === 'Grandi Comuni'}
	<Domandaarispostamultipla {s} codice="7.6" />
{/if}
