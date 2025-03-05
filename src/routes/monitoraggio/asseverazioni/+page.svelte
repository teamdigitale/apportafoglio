<script>
	import Barchart from '$lib/c/charts/barchart.svelte';
	import Columnchart from '$lib/c/charts/columnchart.svelte';
	import Cite from '$lib/c/cite.svelte';
	import Modal from '$lib/c/modal.svelte';
	import { setscroll } from '$lib/js/shared.js';

	export let data;

	let compressed = true;

	import { onMount } from 'svelte';
	import Columnchartandamenti from './columnchartandamenti.svelte';

	onMount(async () => {
		await setscroll();
	});

	let chartmodals = [];

	let showModal = false;
	let idModal = '';

	let sortedData = data.data.sort((a, b) =>
		a.misura > b.misura
			? 1
			: b.misura > a.misura
				? -1
				: a.tipologiaente > b.tipologiaente
					? 1
					: b.tipologiaente > a.tipologiaente
						? -1
						: 0
	);

	let misure = Object.values(
		sortedData.reduce((a, { misura }) => {
			a[misura] = a[misura] || {
				misura,
				count: 0
			};
			a[misura].count++;
			return a;
		}, Object.create(null))
	)
		.map((x) => x.misura)
		.sort();

	let tipologiah = '';
	let tipologiaf = '';
	let misurah = '';
	let tipologiaeh = '';

	let tipologiahr = '';
	let tipologiafr = '';
	let misurahr = '';
	let tipologiaehr = '';

	let filterTecnici = 'Totali';
	let filterFormali = 'Totali';
	let filtermedicompletamento = 'Totali';

	function calcolaRange(s, e) {
		const d = [];
		let current = new Date(s.getFullYear(), s.getMonth(), 1);
		current.setHours(0);
		current.setMinutes(0);
		current.setSeconds(0);
		current.setMilliseconds(0);
		while (current < e) {
			let lastDayOfMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0);
			lastDayOfMonth.setHours(23);
			lastDayOfMonth.setMinutes(59);
			lastDayOfMonth.setSeconds(59);
			lastDayOfMonth.setMilliseconds(999);
			d.push(lastDayOfMonth);
			current.setDate(lastDayOfMonth.getDate() + 1);
			current.setHours(0);
			current.setMinutes(0);
			current.setSeconds(0);
			current.setMilliseconds(0);
		}
		return d;
	}

	let datesRange = calcolaRange(new Date(2022, 5, 1), new Date(2026, 11, 31));

	function datiAndamentiTecniciPositivi(misura) {
		let result = [['Mese']];
		let vv = data.data.filter((d) => d.misura === misura);
		vv.forEach((e) => {
			result[0].push(e.tipologiaente);
		});
		datesRange.forEach((e, i) => {
			let row = [e.getFullYear() + '/' + (e.getMonth() + 1)].concat(Array(vv.length).fill(0));
			result.push(row);
			vv.forEach((vals, j) => {
				let item = vals.andamentotecnicipositivi.filter(
					(r) => r.anno === e.getFullYear() && r.mese === e.getMonth() + 1
				);

				if (item.length === 0) {
					result[i + 1][j + 1] = 0;
				} else {
					result[i + 1][j + 1] = item[0].tecnicipositivi;
				}
			});
		});
		return result;
	}

	function calcolaNumeroMedioPerMese(misura) {
		let vv = data.data.filter((d) => d.misura === misura);
		let somma = 0;
		let numeroMesi = 0;
		datesRange.forEach((e, i) => {
			let esiste = false;
			vv.forEach((vals, j) => {
				let item = vals.andamentotecnicipositivi.filter(
					(r) => r.anno === e.getFullYear() && r.mese === e.getMonth() + 1
				);
				if (item.length !== 0) {
					esiste = true;
					somma = somma + item[0].tecnicipositivi;
				}
			});
			if (esiste) numeroMesi++;
		});
		return [Math.round(somma / numeroMesi), somma, numeroMesi];
	}
</script>

<div class="container my-4">
	<h1>Board asseverazioni</h1>
	<Cite
		text="Gestire la qualità è importante perché niente è più così semplice, se davvero lo è mai stato."
		author="Philip B. Crosby"
	/>
</div>

<div class="container">
	<div class="row">
		<div class="col-12 col-lg-2">
			<div data-bs-toggle="sticky" data-bs-stackable="true">
				<nav
					class="navbar it-navscroll-wrapper navbar-expand-lg it-bottom-navscroll it-right-side"
					data-bs-navscroll
				>
					<button
						class="custom-navbar-toggler"
						type="button"
						aria-controls="navbarNavProgress"
						aria-expanded="false"
						aria-label="Toggle navigation"
						data-bs-toggle="navbarcollapsible"
						data-bs-target="#navbarNavProgress"
					>
						<span class="it-list"></span>1. Riepilogo
					</button>
					<div class="progress custom-navbar-progressbar">
						<div
							class="progress-bar it-navscroll-progressbar"
							role="progressbar"
							aria-valuenow="0"
							aria-valuemin="0"
							aria-valuemax="100"
						></div>
					</div>
					<div class="navbar-collapsable" id="navbarNavProgress">
						<div class="overlay"></div>
						<button type="button" class="it-back-button btn w-100 text-start">
							<svg class="icon icon-sm icon-primary align-top"
								><use
									href="/svg/sprites.svg#it-chevron-left"
									xlink:href="/svg/sprites.svg#it-chevron-left"
								></use></svg
							>
							<span>Indietro</span>
						</button>
						<div class="menu-wrapper">
							<div class="link-list-wrapper">
								<h3>sezioni</h3>
								<div class="progress">
									<div
										class="progress-bar it-navscroll-progressbar"
										role="progressbar"
										aria-valuenow="0"
										aria-valuemin="0"
										aria-valuemax="100"
									></div>
								</div>
								<ul class="link-list">
									<li class="nav-item">
										<a class="nav-link active" href="#asseverazioni">
											<span>1. Statistiche asseverazioni </span>
										</a>
										<ul class="link-list">
											<li class="nav-link">
												<a class="nav-link" href="#asseverazionitecniche">
													<span>1.1 Asseverazioni tecniche </span>
												</a>
											</li>
											<li class="nav-link">
												<a class="nav-link" href="#asseverazioniformali">
													<span>1.2 Asseverazioni formali </span>
												</a>
											</li>
											<li class="nav-link">
												<a class="nav-link" href="#tempimedicompletamento">
													<span>1.3 Tempi medi completamento </span>
												</a>
											</li>
											<li class="nav-link">
												<a class="nav-link" href="#distribuzioneneltempotecnici">
													<span>1.4 Andamento nel tempo dei task tecnici positivi </span>
												</a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</div>
		<div class="col-12 col-lg-10 it-page-sections-container">
			<div class="it-page-section my-5" id="asseverazioni">
				<h4>Statistiche asseverazioni</h4>
				<p>
					In questa sezione è possibile consultare dei dati statistici relativi ai task di
					asseverazione, <strong>tecnici e formali</strong>, in relazione alle misure e ai
					beneficiari. In particolare, per ognuna delle due tipologie di task, sono mostrate le
					seguenti informazioni, per ogni misura e per ogni beneficiario:
				</p>
				<ul>
					<li>
						<strong class="text-success">Positivi</strong>: numero di task di asseverazioni conclusi
						con esito positivo
					</li>
					<li>
						<strong class="text-danger">Negativi</strong>: numero di task di asseverazioni conclusi
						con esito negativo
					</li>
					<li>
						<strong class="text-secondary">Parziali</strong>: numero di task di asseverazioni
						conclusi con esito parziale
					</li>
					<li>
						<strong>Passaggi medi</strong>: numero medio di "passaggi" necessario a chiudere una
						asseverazione positiva, cioè il numero medio di task lavorati per candidatura
					</li>
					<li>
						<strong>Tempo medio</strong>: il tempo medio (espresso in giorni solari) necessario a
						chiudere una asseverazione positiva
					</li>
				</ul>
				<div class="alert alert-primary" role="alert">
					Le informazioni sono relative al numero di task, non al numero di candidature.
				</div>
				<div class="alert alert-warning" role="alert">
					Il tempo medio è calcolato considerando il tempo intercorrente tra il completamento del
					progetto da parte dell'Ente e la chiusura del task di asseverazione. Tale tempo include
					quindi, oltre al tempo di lavorazione del task, anche il tempo di assegnazione e presa in
					carico dello stesso.
				</div>
			</div>
			<div class="it-page-section my-5" id="asseverazionitecniche">
				<h5>Asseverazioni tecniche</h5>
				<p>
					Nella seguente tabella sono riportati i dati sopra descritti per i <strong
						>task di asseverazione tecnica</strong
					>. Utilizzare il menu a tendina nella cella in alto a sinistra per scegliere se
					visualizzare i dati totali o i dati relativi agli ultimi 30 giorni.
				</p>
				<div class="table-responsive">
					<table class="table table-hover table-sm align-middle">
						<thead>
							<tr>
								<th class="text-center">
									<div class="select-wrapper">
										<label for="filterTecnici">Seleziona il periodo</label>
										<select id="filterTecnici" name="filterTecnici" bind:value={filterTecnici}>
											<option value="Totali">Sempre</option>
											<option value="30gg">Ultimi 30 giorni</option>
										</select>
									</div></th
								>
								<th class="text-center text-success"
									>Positivi<br /><span class="is-size-7 has-text-weight-normal">(#)</span></th
								>
								<th class="text-center text-danger"
									>Negativi<br /><span class="is-size-7 has-text-weight-normal">(#)</span></th
								>
								<th class="text-center text-secondary"
									>Parziali<br /><span class="is-size-7 has-text-weight-normal">(#)</span></th
								>
								<th class=" text-center"
									>Passaggi medi<br /><span class="is-size-7 has-text-weight-normal"
										>(tasks/candidatura)<br /></span
									></th
								>
								<th class=" text-center"
									>Tempo medio<br /><span class="is-size-7 has-text-weight-normal">(gg)<br /></span
									></th
								>
								<!--<th></th>-->
							</tr>
						</thead>
						<tbody>
							{#each misure as m}
								{#if sortedData
									.filter((sd) => sd.misura === m)
									.reduce((a, c) => a + c.tecnicipositivi + c.tecnicinegativi, 0) != 0}
									<tr class=" {misurah === m ? 'analogue-2-bg' : ''}">
										<td colspan="12" class="fw-bold is-size-6">{m}</td>
									</tr>

									{#each sortedData.filter((sd) => sd.misura === m) as t, index}
										{#if t.tecnicipositivi > 0 || t.tecnicinegativi > 0}
											<tr
												class={tipologiaeh === t.tipologiaente && misurah === m
													? 'has-background-info has-text-white'
													: ''}
											>
												<td
													class="has-text-weight-normal is-size-6 {tipologiaeh ===
														t.tipologiaente && misurah === m
														? 'has-background-info-dark has-text-white'
														: ''}">{t.tipologiaente}</td
												>
												<td
													class=" text-center small"
													on:mouseenter={() => {
														tipologiaeh = t.tipologiaente;
														misurah = m;
														tipologiah = 'bg-primary';
													}}
													on:mouseleave={() => {
														misurah = '';
														tipologiah = '';
													}}
												>
													{#if filterTecnici === 'Totali'}
														{t.tecnicipositivi}
													{:else}
														{t.tecnicipositivirolling}
													{/if}
												</td>
												<td
													class=" text-center small"
													on:mouseenter={() => {
														tipologiaeh = t.tipologiaente;
														misurah = m;
														tipologiah = 'bg-primary';
													}}
													on:mouseleave={() => {
														misurah = '';
														tipologiah = '';
													}}
												>
													{#if filterTecnici === 'Totali'}
														{t.tecnicinegativi}
													{:else}
														{t.tecnicinegativirolling}
													{/if}
												</td>
												<td
													class=" text-center small"
													on:mouseenter={() => {
														tipologiaeh = t.tipologiaente;
														misurah = m;
														tipologiah = 'bg-primary';
													}}
													on:mouseleave={() => {
														misurah = '';
														tipologiah = '';
													}}
												>
													{#if filterTecnici === 'Totali'}
														{t.parzialitecnici}
													{:else}
														{t.parzialitecnicirolling}
													{/if}
												</td>
												<td
													class=" text-center small"
													on:mouseenter={() => {
														tipologiaeh = t.tipologiaente;
														misurah = m;
														tipologiah = 'bg-primary';
													}}
													on:mouseleave={() => {
														misurah = '';
														tipologiah = '';
													}}
												>
													{#if filterTecnici === 'Totali'}
														{isFinite(t.numeromediopassaggi) && !isNaN(t.numeromediopassaggi)
															? t.numeromediopassaggi
															: 'n.a.'}
													{:else}
														{isFinite(t.numeromediopassaggirolling) &&
														!isNaN(t.numeromediopassaggirolling)
															? t.numeromediopassaggirolling
															: 'n.a.'}
													{/if}
												</td>
												<td
													class=" text-center small"
													on:mouseenter={() => {
														tipologiaeh = t.tipologiaente;
														misurah = m;
														tipologiah = 'bg-primary';
													}}
													on:mouseleave={() => {
														misurah = '';
														tipologiah = '';
													}}
												>
													{#if filterTecnici === 'Totali'}
														{isFinite(t.tempomediotecnico) && !isNaN(t.tempomediotecnico)
															? t.tempomediotecnico
															: 'n.a.'}
													{:else}
														{isFinite(t.tempomediotecnicorolling) &&
														!isNaN(t.tempomediotecnicorolling)
															? t.tempomediotecnicorolling
															: 'n.a.'}
													{/if}
												</td>
												<!--
												<td>
													<button
														class="btn btn-s btn-icon"
														data-bs-toggle="modal"
														data-bs-target={'#tecnici-' + index}
													>
														<span class="rounded-icon">
															<svg class="icon icon-primary"
																><use href="/svg/sprites.svg#it-chart-line"></use></svg
															>
														</span>
													</button>

													<div
														class="modal fade"
														tabindex="-1"
														role="dialog"
														id={'tecnici-' + index}
														aria-labelledby="modalCenterTitle"
													>
														<div class="modal-dialog modal-dialog-right" role="document">
															<div class="modal-content">
																<div class="modal-header">
																	<h6>{t.misura} - {t.tipologiaente}</h6>
																	<button
																		class="btn-close"
																		type="button"
																		data-bs-dismiss="modal"
																		aria-label="Chiudi finestra modale"
																	>
																		<svg class="icon"
																			><use href="/svg/sprites.svg#it-close"></use></svg
																		>
																	</button>
																</div>
																<div class="modal-body">
																	<Columnchartandamenti
																		id="chart-{t.misura}-{t.tipologiaente}"
																		values={datiAndamentiTecniciPositivi(
																			t.andamentotecnicipositivi
																		)}
																		title="Distribuzione esiti positivi"
																		xlabel="Mesi"
																		ylabel="Numero di esiti positivi"
																		stacked="false"
																	/>
																</div>
															</div>
														</div>
													</div>
												</td>
												-->
											</tr>
										{/if}
									{/each}
								{/if}
							{/each}
						</tbody>
					</table>
				</div>
			</div>
			<!--formali-->
			<div class="it-page-section my-5" id="asseverazioniformali">
				<h5>Asseverazioni formali</h5>
				<p>
					Nella seguente tabella sono riportati i dati sopra descritti per i <strong
						>task di asseverazione formale</strong
					>. Utilizzare il menu a tendina nella cella in alto a sinistra per scegliere se
					visualizzare i dati totali o i dati relativi agli ultimi 30 giorni.
				</p>
				<div class="table-responsive">
					<table class="table table-hover table-sm align-middle">
						<thead>
							<tr>
								<th class="text-center">
									<div class="select-wrapper">
										<label for="filterFormali">Seleziona il periodo</label>
										<select id="filterFormali" name="filterFormali" bind:value={filterFormali}>
											<option value="Totali">Sempre</option>
											<option value="30gg">Ultimi 30 giorni</option>
										</select>
									</div></th
								>
								<th class="text-center text-success"
									>Positivi<br /><span class="is-size-7 has-text-weight-normal">(#)</span></th
								>
								<th class="text-center text-danger"
									>Negativi<br /><span class="is-size-7 has-text-weight-normal">(#)</span></th
								>
								<th class="text-center text-secondary"
									>Parziali<br /><span class="is-size-7 has-text-weight-normal">(#)</span></th
								>
								<th class=" text-center"
									>Passaggi medi<br /><span class="is-size-7 has-text-weight-normal"
										>(tasks/candidatura)<br /></span
									></th
								>
								<th class=" text-center"
									>Tempo medio<br /><span class="is-size-7 has-text-weight-normal">(gg)<br /></span
									></th
								>
							</tr>
						</thead>
						<tbody>
							{#each misure as m}
								{#if sortedData
									.filter((sd) => sd.misura === m)
									.reduce((a, c) => a + c.formalipositivi + c.formalinegativi, 0) != 0}
									<tr class=" {misurah === m ? 'analogue-2-bg' : ''}">
										<td colspan="11" class="fw-bold is-size-6">{m}</td>
									</tr>

									{#each sortedData.filter((sd) => sd.misura === m) as t}
										{#if t.formalipositivi > 0 || t.formalinegativi > 0}
											<tr
												class={tipologiaeh === t.tipologiaente && misurah === m
													? 'has-background-info has-text-white'
													: ''}
											>
												<td
													class="has-text-weight-normal is-size-6 {tipologiaeh ===
														t.tipologiaente && misurah === m
														? 'has-background-info-dark has-text-white'
														: ''}">{t.tipologiaente}</td
												>
												<td
													class=" text-center small"
													on:mouseenter={() => {
														tipologiaeh = t.tipologiaente;
														misurah = m;
														tipologiah = 'bg-primary';
													}}
													on:mouseleave={() => {
														misurah = '';
														tipologiah = '';
													}}
												>
													{#if filterFormali === 'Totali'}
														{t.formalipositivi}
													{:else}
														{t.formalipositivirolling}
													{/if}
												</td>
												<td
													class=" text-center small"
													on:mouseenter={() => {
														tipologiaeh = t.tipologiaente;
														misurah = m;
														tipologiah = 'bg-primary';
													}}
													on:mouseleave={() => {
														misurah = '';
														tipologiah = '';
													}}
												>
													{#if filterFormali === 'Totali'}
														{t.formalinegativi}
													{:else}
														{t.formalinegativirolling}
													{/if}
												</td>
												<td
													class=" text-center small"
													on:mouseenter={() => {
														tipologiaeh = t.tipologiaente;
														misurah = m;
														tipologiah = 'bg-primary';
													}}
													on:mouseleave={() => {
														misurah = '';
														tipologiah = '';
													}}
												>
													{#if filterFormali === 'Totali'}
														{t.parzialiformali}
													{:else}
														{t.parzialiformalirolling}
													{/if}
												</td>
												<td
													class=" text-center small"
													on:mouseenter={() => {
														tipologiaeh = t.tipologiaente;
														misurah = m;
														tipologiah = 'bg-primary';
													}}
													on:mouseleave={() => {
														misurah = '';
														tipologiah = '';
													}}
												>
													{#if filterFormali === 'Totali'}
														{isFinite(t.numeromediopassaggiformali) &&
														!isNaN(t.numeromediopassaggiformali)
															? t.numeromediopassaggiformali
															: 'n.a.'}
													{:else}
														{isFinite(t.numeromediopassaggiformalirolling) &&
														!isNaN(t.numeromediopassaggiformalirolling)
															? t.numeromediopassaggiformalirolling
															: 'n.a.'}
													{/if}
												</td>
												<td
													class=" text-center small"
													on:mouseenter={() => {
														tipologiaeh = t.tipologiaente;
														misurah = m;
														tipologiah = 'bg-primary';
													}}
													on:mouseleave={() => {
														misurah = '';
														tipologiah = '';
													}}
												>
													{#if filterFormali === 'Totali'}
														{isFinite(t.tempomedioformale) && !isNaN(t.tempomedioformale)
															? t.tempomedioformale
															: 'n.a.'}
													{:else}
														{isFinite(t.tempomedioformalerolling) &&
														!isNaN(t.tempomedioformalerolling)
															? t.tempomedioformalerolling
															: 'n.a.'}
													{/if}
												</td>
											</tr>
										{/if}
									{/each}
								{/if}
							{/each}
						</tbody>
					</table>
				</div>
			</div>
			<!-- Tempi medi completamento -->
			<div class="it-page-section my-5" id="tempimedicompletamento">
				<h5>Tempi medi di completamento attività</h5>
				<p>
					Nella seguente tabella sono riportati i tempi medi di <strong
						>completamento attività</strong
					>. Utilizzare il menu a tendina nella cella in alto a sinistra per scegliere se
					visualizzare i dati totali o i dati relativi agli ultimi 30 giorni.
				</p>
				<div class="alert alert-primary" role="alert">
					Il tempo medio è calcolato considerando il tempo intercorrente tra il completamento del
					progetto da parte dell'Ente e la data di contrattualizzazione.
				</div>
				<div class="alert alert-primary" role="alert">
					La data di contrattualizzazione considerata è quella inserita dall'Ente, che potrebbe non
					coincidere con la data effettiva di firma del contratto.
				</div>
				<div class="alert alert-warning" role="alert">
					In alcuni casi la data di completamento è antecedente alla data di contrattualizzazione
					(vedi nota precedente); in questi casi il tempo di completamento è considerato pari a 0.
				</div>
				<div class="table-responsive">
					<table class="table table-hover table-sm align-middle">
						<thead>
							<tr>
								<th class="text-center">
									<div class="select-wrapper">
										<label for="filtermedicompletamento">Seleziona il periodo</label>
										<select
											id="filtermedicompletamento"
											name="filtermedicompletamento"
											bind:value={filtermedicompletamento}
										>
											<option value="Totali">Sempre</option>
											<option value="30gg">Ultimi 30 giorni</option>
										</select>
									</div></th
								>

								<th class=" text-center"
									>Tempo medio di completamento<br /><span class="is-size-7 has-text-weight-normal"
										>(gg)<br /></span
									></th
								>
							</tr>
						</thead>
						<tbody>
							{#each misure as m}
								{#if sortedData
									.filter((sd) => sd.misura === m)
									.reduce((a, c) => a + (c.tempomediocompletamento ? c.tempotempomediocompletamento : 0), 0) != 0}
									<tr class=" {misurah === m ? 'analogue-2-bg' : ''}">
										<td colspan="11" class="fw-bold is-size-6">{m}</td>
									</tr>

									{#each sortedData.filter((sd) => sd.misura === m) as t}
										{#if t.tempomediocompletamento > 0}
											<tr
												class={tipologiaeh === t.tipologiaente && misurah === m
													? 'has-background-info has-text-white'
													: ''}
											>
												<td
													class="has-text-weight-normal is-size-6 {tipologiaeh ===
														t.tipologiaente && misurah === m
														? 'has-background-info-dark has-text-white'
														: ''}">{t.tipologiaente}</td
												>

												<td
													class=" text-center small"
													on:mouseenter={() => {
														tipologiaeh = t.tipologiaente;
														misurah = m;
														tipologiah = 'bg-primary';
													}}
													on:mouseleave={() => {
														misurah = '';
														tipologiah = '';
													}}
												>
													{#if filtermedicompletamento === 'Totali'}
														{isFinite(t.tempomediocompletamento) &&
														!isNaN(t.tempomediocompletamento)
															? t.tempomediocompletamento
															: 'n.a.'}
													{:else}
														{isFinite(t.tempomediocompletamentorolling) &&
														!isNaN(t.tempomediocompletamentorolling)
															? t.tempomediocompletamentorolling
															: 'n.a.'}
													{/if}
												</td>
											</tr>
										{/if}
									{/each}
								{/if}
							{/each}
						</tbody>
					</table>
				</div>
			</div>
			<div class="it-page-section my-5" id="distribuzioneneltempotecnici">
				<h5>Distribuzione nel tempo dei task positivi</h5>
				<p>
					Per ogni misura viene riportata la distribuzione mensile dei <strong
						>Task Tecnici con esito positivo</strong
					>, il totale e la media per mese
				</p>
				{#each misure as m}
					{#if sortedData
						.filter((sd) => sd.misura === m)
						.reduce((a, c) => a + c.tecnicipositivi + c.tecnicinegativi, 0) != 0}
						<hr />
						<h6>{m}</h6>
						<p>
							Totali: <strong>{calcolaNumeroMedioPerMese(m)[1]}</strong><br />
							Numero medio per mese: <strong>{calcolaNumeroMedioPerMese(m)[0]}</strong>
						</p>
						<p>
							<Columnchartandamenti
								id="chart-{m}"
								values={datiAndamentiTecniciPositivi(m)}
								title="Distribuzione esiti positivi"
								xlabel="Mesi"
								ylabel="Numero di esiti positivi"
								stacked={true}
							/>
						</p>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.modal-dialog {
		max-width: 70vw;
		width: 70vw;
	}
</style>
