<script>
	// @ts-nocheck
	import { formatNumber } from '$lib/js/shared.js';
	import Pagination from '$lib/c/pagination.svelte';

	export let risposte;



	let cperpage;
	let cp = 0;
</script>



<div class="table-responsive">
	<table class="table table-hover table-sm caption-top align-middle">
		<caption>Numero di comuni: {formatNumber(risposte.length)}</caption>
		<thead>
			<tr>
				<th><small>Comune</small></th>
				<th class="text-center"><small>Stato del questionario</small></th>
			</tr>
		</thead>
		<tbody>
			{#if cperpage}
				{#each cperpage as r}
					<tr>
						<td>
							<small>{r.nome}</small>
						</td>
						<td class="text-center">
							{#if r.surveyanci.aperto && !r.surveyanci.completato}
								<small class="text-primary">In compilazione</small>
							{:else if r.surveyanci.completato}
								<a href="/anci/survey/rispostaente/{r.pa2026.id}" target="_blank">
									<small class="text-success"
										>Completato
										<svg class="icon icon-sm icon-success"
											><use href="/svg/sprites.svg#it-file"></use></svg
										></small
									>
								</a>
							{:else}
								<small class="text-danger">Mai aperto</small>
							{/if}
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
		<tfoot>
			<tr>
				<th colspan="3"
					><Pagination rows={risposte} bind:cp perPage={10} bind:trimmedRows={cperpage} /></th
				>
			</tr>
		</tfoot>
	</table>
</div>
