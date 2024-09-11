<script>
	// @ts-nocheck
	import { euro } from '$lib/js/shared';
	import moment from 'moment/min/moment-with-locales';
	moment.locale('it');
	export let candidature;
	export let title = '';
</script>

{#if candidature && candidature.length > 0}
	<div class="my-4">
		<p class="text-info text-center">
			<svg class="icon icon-info"><use href="/svg/sprites.svg#it-files"></use></svg><b>
				{title}
			</b>
		</p>
		{#each candidature.sort( (a, b) => (moment(a.data_invio).isBefore(moment(b.data_invio)) ? -1 : 1) ) as c}
			<div class="callout info callout-highlight my-2 neutral-1-bg-a2 rounded px-4 py-2">
				<b>{c.avviso}</b><br />
				<small><b>Data invio: </b>{moment(c.data_invio).format('DD/MM/YYYY')}</small><br />
				<small><b>Stato: </b>{c.stato_candidatura}</small><br />
				{#if c.stato_progetto != null}
					<small><b>Stato progetto: </b>{c.stato_progetto}</small><br />
				{/if}
				<small><b>Importo: </b>{euro(c.importo)}</small><br />
				
					<a href="/op/candidatura/{c.id}" target="_blank">
						<svg class="icon icon-sm icon-primary"
							><use href="/svg/sprites.svg#it-zoom-in"></use></svg
						><span>Dettaglio</span>
					</a>
				
			</div>
		{/each}
	</div>
{/if}

<style>
	li {
		font-size: 0.9rem;
	}
</style>
