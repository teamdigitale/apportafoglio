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

<TabellaVoci {s} codice="5.1" redlabel="Nessuno" />

<TabellaVoci {s} codice="5.2" redlabel="Nessuno" />

<Domandaarispostamultipla {s} codice="5.3" />

<ElencoVoci
	{s}
	codice="5.4"
	icons={[
		['Servizio non gestito', 'it-error', 'danger'],
		['La maggior parte dei servizi forniti dal settore non è digitale', 'it-error', 'danger'],
		[
			'La maggior parte dei servizi è digitalizzata solo nel front-office (richieste, prenotazioni, pagamenti, ecc.)',
			'it-warning-circle',
			'warning'
		],
		[
			'La maggior parte dei servizi forniti è completamente erogata in modo digitale (front-office e back-office)',
			'it-check-circle',
			'success'
		]
	]}
/>

<ElencoVoci
	{s}
	codice="5.5"
	icons={[
		['Nessun utilizzo', 'it-error', 'danger'],
		['Utilizzo Basso (Minore del 25%)', 'it-error', 'danger'],
		['Utilizzo Medio (Tra il 25 ed il 75%)', 'it-warning-circle', 'warning'],
		['Utilizzo Elevato (Superiore al 75%)', 'it-check-circle', 'success']
	]}
/>

<ElencoVoci
	{s}
	codice="5.6"
	icons={[
		['Assente', 'it-error', 'danger'],
		['In sviluppo', 'it-warning-circle', 'warning'],
		['Disponibile', 'it-check-circle', 'success']
	]}
/>

<ElencoVoci
	{s}
	codice="5.7"
	icons={[
		['Non pianificato', 'it-error', 'danger'],
		['Pianificato', 'it-warning-circle', 'warning'],
		['Attivato', 'it-check-circle', 'success']
	]}
/>

<ElencoVoci
	{s}
	codice="5.8"
	icons={[
		['Poco rilevante', 'it-arrow-down-circle', 'danger'],
		['Abbastanza rilevante', 'it-burger', 'warning'],
		['Molto rilevante', 'it-arrow-up-circle', 'success']
	]}
/>

{#if tipo === 'Grandi Comuni'}
	<Domandaarispostamultipla {s} codice="5.9" />
{/if}

<ElencoVoci
	{s}
	codice="5.10"
	icons={[
		['Poco rilevante', 'it-arrow-down-circle', 'danger'],
		['Abbastanza Rilevante', 'it-burger', 'warning'],
		['Molto rilevante', 'it-arrow-up-circle', 'success']
	]}
/>

<Domandaarispostasingola {s} codice="5.11" />

{#if tipo === 'Grandi Comuni'}
	<Domandaarispostasingola {s} codice="5.12" />

	{#if s.domande.find((x) => x.codice === '5.12').risposta === 'Si, sono utilizzate anche per dati e documenti di rilevanza amministrativa'}
		<Domandaarispostamultipla {s} codice="5.12.1" />
	{/if}
{/if}

<Domandaarispostasingola {s} codice="5.13" />
