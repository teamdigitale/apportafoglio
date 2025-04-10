<script lang="ts">
	import Cite from '$lib/c/cite.svelte';
	import Pagination from '$lib/c/pagination.svelte';
	import Scorecard from '$lib/c/scorecard.svelte';
	import { euro } from '$lib/js/shared.js';
	import { fade } from 'svelte/transition';
	import Recorddetail from './recorddetail.svelte';

	export let data;
	let candidature = data.finanziate;
	let cperpage: any;
	let cp = 0;
	let selectedRecord: any;

	function calcolaMisureOptions() {
		const res: string[] = [];
		candidature.forEach((c: any) => {
			if (res.indexOf(c.avviso.misura) === -1) {
				res.push(c.avviso.misura);
			}
		});
		return res;
	}

	let tipologiaEnteOptions = ['Tutte le tipologie di ente'].concat(
		candidature
			.map((c: any) => c.tipologia_ente)
			.filter((v: any, i: any, a: any) => a.indexOf(v) === i)
			.sort()
	);
	let filterTipologiaEnte = tipologiaEnteOptions[0];

	let misureOptions = ['Tutte le misure'].concat(calcolaMisureOptions().sort());
	let filterMisura = misureOptions[0];

	let regioneOptions = ['Tutte le regioni'].concat(
		candidature
			.map((c: any) => c.regione)
			.filter((v: any, i: any, a: any) => a.indexOf(v) === i)
			.sort()
	);
	let filterRegione = regioneOptions[0];

	$: provinceOptions = ['Tutte le province'].concat(
		candidature
			.filter((c: any) => {
				if (filterRegione === 'Tutte le regioni') return true;
				else return c.regione === filterRegione;
			})
			.map((c: any) => c.provincia)
			.filter((v: any, i: any, a: any) => a.indexOf(v) === i)
			.sort()
	);
	$: filterProvincia = 'Tutte le province';

	$: cc = candidature
		.filter((c: any) =>
			filterTipologiaEnte !== tipologiaEnteOptions[0]
				? c.tipologia_ente === filterTipologiaEnte
				: true
		)
		.filter((c: any) =>
			filterMisura !== misureOptions[0] ? c.avviso.misura === filterMisura : true
		)
		.filter((c: any) => (filterRegione !== regioneOptions[0] ? c.regione === filterRegione : true))
		.filter((c: any) =>
			filterProvincia !== provinceOptions[0] ? c.provincia === filterProvincia : true
		);

	$: fonditotali = cc.reduce(function (a: any, b: any) {
		return a + b.importo_finanziamento;
	}, 0);

	$: fondiAssegnati = cc
		.filter((f: any) => f.stato_candidatura === 'A')
		.reduce(function (a: any, b: any) {
			return a + b.importo_finanziamento;
		}, 0);

	$: fondiLiquidati = cc
		.filter((f: any) => f.stato_candidatura === 'E')
		.reduce(function (a: any, b: any) {
			return a + b.importo_finanziamento;
		}, 0);

	$: fondiRinunciati = cc
		.filter((f: any) => f.stato_candidatura === 'R')
		.reduce(function (a: any, b: any) {
			return a + b.importo_finanziamento;
		}, 0);
</script>

<div class="container my-4">
	<h1>Open Data</h1>
	<Cite
		text="Se torturi i numeri abbastanza a lungo, confesseranno qualsiasi cosa."
		author="Gregg Easterbrook"
	/>

	<div class="row">
		<div class="col-12 col-lg-3 my-4">
			<div class="select-wrapper">
				<label for="filterMisura">Misure</label>
				<select id="filterMisura" name="filterMisura" bind:value={filterMisura}>
					{#each misureOptions as m}
						<option value={m}>{m}</option>
					{/each}
				</select>
			</div>
		</div>
		<div class="col-12 col-lg-3 my-4">
			<div class="select-wrapper">
				<label for="filterTipologiaEnte">Tipologie ente</label>
				<select
					id="filterTipologiaEnte"
					name="filterTipologiaEnte"
					bind:value={filterTipologiaEnte}
				>
					{#each tipologiaEnteOptions as te}
						<option value={te}>{te}</option>
					{/each}
				</select>
			</div>
		</div>
		<div class="col-12 col-lg-3 my-4">
			<div class="select-wrapper">
				<label for="filterRegione">Regioni</label>
				<select
					id="filterRegione"
					name="filterRegione"
					bind:value={filterRegione}
					on:change={() => (filterProvincia = 'Tutte le province')}
				>
					{#each regioneOptions as r}
						<option value={r}>{r}</option>
					{/each}
				</select>
			</div>
		</div>
		<div class="col-12 col-lg-3 my-4">
			<div class="select-wrapper">
				<label for="filterProvincia">Province</label>
				<select id="filterProvincia" name="filterProvincia" bind:value={filterProvincia}>
					{#each provinceOptions as p}
						<option value={p}>{p}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-12 col-lg-3 my-4">
			<Scorecard
				title={euro(fonditotali)}
				text="Valore candidature"
				bgcolor="secondary"
				textcolor="white"
			/>
		</div>
		<div class="col-12 col-lg-3 my-4">
			<Scorecard
				title={euro(fondiAssegnati)}
				text="Fondi assegnati"
				bgcolor="primary"
				textcolor="white"
			/>
		</div>
		<div class="col-12 col-lg-3 my-4">
			<Scorecard
				title={euro(fondiLiquidati)}
				text="Fondi liquidati"
				bgcolor="success"
				textcolor="white"
			/>
		</div>
		<div class="col-12 col-lg-3 my-4">
			<Scorecard
				title={euro(fondiRinunciati)}
				text="Fondi rinunciati"
				bgcolor="danger"
				textcolor="white"
			/>
		</div>
	</div>
</div>
{#if selectedRecord}
	<div class="container my-4" transition:fade>
		<Recorddetail bind:record={selectedRecord} />
		<button type="button" class="btn btn-primary go-back" on:click={() => (selectedRecord = null)}
			><svg class="icon icon-sm icon-white me-2"
				><use href="/svg/sprites.svg#it-arrow-left"></use></svg
			>Torna indietro</button
		>
	</div>
{:else}
	<div class="container my-4">
		<div class="table-responsive">
			<table class="table table-hover table-sm caption-top align-middle">
				<caption>Candidature risultanti in base ai filtri impostati</caption>
				<thead>
					<tr>
						<th />
						<th>Tipologia ente</th>
						<th>Ente</th>
						<th>Regione</th>
						<th>Provincia</th>
						<th>Misura</th>
						<th>Stato</th>
						<th>Importo</th>
					</tr>
				</thead>
				<tbody>
					{#if cperpage}
						{#each cperpage as c}
							<tr>
								<td>
									<button class="btn btn-s btn-icon" on:click={() => (selectedRecord = c)}>
										<span class="rounded-icon">
											<svg class="icon icon-primary"
												><use href="/svg/sprites.svg#it-zoom-in"></use></svg
											>
										</span>
									</button>
								</td>
								<td><small>{c.tipologia_ente}</small></td>
								<td><small>{c.ente}</small></td>

								<td><small>{c.regione}</small></td>
								<td><small>{c.provincia}</small></td>
								<td><small>{c.avviso.misura}</small></td>
								<td
									><small
										>{c.stato_candidatura === 'A'
											? 'ASSEGNATO'
											: c.stato_candidatura === 'E'
												? 'EROGATO'
												: 'RINUNCIATO'}</small
									></td
								>

								<td><small>{euro(c.importo_finanziamento)}</small></td>
							</tr>
						{/each}
					{/if}
				</tbody>
				<tfoot>
					<tr>
						<th colspan="8"
							><Pagination rows={cc} bind:cp perPage={10} bind:trimmedRows={cperpage} /></th
						>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>
{/if}
