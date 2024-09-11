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
				<th class="text-center"><small>Questionario aperto</small></th>
				<th class="text-center"><small>Questionario completato</small></th>
			</tr>
		</thead>
		<tbody>
			{#if cperpage}
				{#each cperpage as r}
					<tr>
						<td>
							<small>{r.nome}</small>
						</td>
						<td class="text-center"
							><small>
								{#if r.surveyanci.aperto}
									<svg class="icon icon-sm icon-primary"
										><use href="/svg/sprites.svg#it-check-circle"></use></svg
									>
								{/if}
							</small></td
						>
						<td class="text-center"
							><small
								>{#if r.surveyanci.completato}
                                <a href="/anci/survey/rispostaente/{r.pa2026.id}" target="_blank">
									<svg class="icon icon-sm icon-success"
										><use href="/svg/sprites.svg#it-check-circle"></use></svg
									>
                                </a>
								{/if}</small
							></td
						>
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
