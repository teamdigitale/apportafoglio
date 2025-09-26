<script>
	// @ts-nocheck
	import { formatDate, formatNumber } from '$lib/js/shared.js';
	import Pagination from '$lib/c/pagination.svelte';
	import moment from 'moment/min/moment-with-locales';
	moment.locale('it');

	export let risposte;

	let nomeComune = '';

	$: r1 = risposte.filter((x) =>
		nomeComune === ''
			? true
			: x.nome_ente.replaceAll('Comune di', '').toUpperCase().indexOf(nomeComune.toUpperCase()) > -1
	);

	$: r = r1
		.filter((x) => x.anno_survey === '2024')
		.map((x) => ({
			nome_ente: x.nome_ente,
			stato2024: x.stato_compilazione,
			stato2025: r1.find(
				(y) => y.anno_survey === '2025' && x.codice_istat_comune === y.codice_istat_comune
			)?.stato_compilazione,
			agg2024: x.data_ultima_modifica,
			invio2024: x.data_completamento,
			agg2025: r1.find(
				(y) => y.anno_survey === '2025' && x.codice_istat_comune === y.codice_istat_comune
			)?.data_ultima_modifica,
			invio2025: r1.find(
				(y) => y.anno_survey === '2025' && x.codice_istat_comune === y.codice_istat_comune
			)?.data_completamento
		}))
		.sort((a, b) => {
			return ('' + a.nome_ente).localeCompare(b.nome_ente);
		});

	let cperpage;
	let cp = 0;
</script>

<hr />

<div class="row">
	<div class="col-12 col-lg-4">
		<div>
			<div class="form-group my-4">
				<div class="input-group">
					<span class="input-group-text"
						><svg class="icon icon-sm"><use href="/svg/sprites.svg#it-pa"></use></svg></span
					>
					<label class="active" for="nomeComune">Comune</label>
					<input
						type="text"
						class="form-control"
						id="nomeComune"
						name="nomeComune"
						bind:value={nomeComune}
					/>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="table-responsive">
	<table class="table table-hover table-sm caption-top align-middle">
		<caption>Numero di comuni: {formatNumber(risposte.length / 2)}</caption>
		<thead>
			<tr>
				<th><small>Comune</small></th>
				<th class="text-center"><small>2024</small></th>
				<th class="text-center"><small>2025</small></th>
			</tr>
		</thead>
		<tbody>
			{#if cperpage}
				{#each cperpage as r}
					<tr>
						<td>
							<small>{r.nome_ente}</small>
						</td>
						<td
							class="text-center {r.stato2024 === 'Completato'
								? 'text-success'
								: r.stato2024 === 'Mai aperto'
									? 'text-danger'
									: 'text-secondary'}"
						>
							{r.stato2024}
							{#if r.stato2024 === 'Completato'}
								<br />
								<span class="text-secondary"
									><small
										>Inviato il: {moment(r.invio2024.substring(0, 10))
											.calendar()
											.toLocaleLowerCase()}</small
									></span
								>
							{:else if r.stato2024 === 'In compilazione'}
								<br />
								<span class="text-secondary"
									><small
										>Aggiornato il: {moment(r.agg2024.substring(0, 10))
											.calendar()
											.toLocaleLowerCase()}</small
									></span
								>
							{:else}
								<br />
								<span> </span>
							{/if}
						</td>
						<td
							class="text-center {r.stato2025 === 'Completato'
								? 'text-success'
								: r.stato2025 === 'Mai aperto'
									? 'text-danger'
									: 'text-secondary'}"
						>
							{r.stato2025}
							{#if r.stato2025 === 'Completato'}
								<br />
								<span class="text-secondary"
									><small
										>Inviato il: {moment(r.invio2025.substring(0, 10))
											.calendar()
											.toLocaleLowerCase()}</small
									></span
								>
							{:else if r.stato2025 === 'In compilazione'}
								<br />
								<span class="text-secondary"
									><small
										>Aggiornato il: {moment(r.agg2025.substring(0, 10))
											.format("DD/MM/YYYY")
											.toLocaleLowerCase()}</small
									></span
								>
							{:else}
								<br />
								<span> </span>
							{/if}
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
		<tfoot>
			<tr>
				<th colspan="3"><Pagination rows={r} bind:cp perPage={10} bind:trimmedRows={cperpage} /></th
				>
			</tr>
		</tfoot>
	</table>
</div>
