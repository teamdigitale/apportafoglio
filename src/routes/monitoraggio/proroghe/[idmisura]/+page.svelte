<script>
	// @ts-nocheck

	import { statusIndex, statusColor } from '$lib';
	import Scorecard from '$lib/c/scorecard.svelte';
	import {
		addDays,
		formatNumber,
		getFirstDayOfQuarter,
		getQuarter,
		monthDiff,
		quartersDiff
	} from '$lib/js/shared.js';
	import { onMount } from 'svelte';
	import Barchart from './barchart.svelte';
	import Columnchart from './columnchart.svelte';
	import Areachart from './areachart.svelte';

	export let data;

	onMount(async () => {
		await setscroll();
	});

	const setscroll = async () => {
		var navscrollElement = document.querySelector('.it-navscroll-wrapper');
		var navscroll = bootstrap.NavScroll.getOrCreateInstance(navscrollElement);
		navscroll.setScrollPadding(function () {
			var header = document.querySelector('.it-header-wrapper');
			return header.offsetHeight + 10;
		});
	};

	const determinaTarget = (m) => {
		console.log(m);
		if (m === '1.1 Infrastrutture digitali') {
			return [
				{
					quarter: 'Q2-2026',
					giorno: '2026-06-30',
					valore: 500,
					buffer: 100,
					quarter_prec: 'Q1-2026',
					targetPerTipologia: { 'Tutte le tipologie': 500 }
				}
			];
		}else if(m==='1.3.1 Piattaforma Digitale Nazionale Dati'){
			return [
				{
					quarter: 'Q2-2026',
					giorno: '2026-06-30',
					valore: 6200,
					buffer: 100,
					quarter_prec: 'Q1-2026',
					targetPerTipologia: { 'Tutte le tipologie': 6200 }
				}
			];
		}else if(m==='1.4.4 Adozione identità digitale'){
			return [
				{
					quarter: 'Q2-2026',
					giorno: '2026-06-30',
					valore: 16500,
					buffer: 100,
					quarter_prec: 'Q1-2026',
					targetPerTipologia: { 'Tutte le tipologie': 16500 }
				}
			];
		}else if(m==='1.4.5 Digitalizzazione degli avvisi pubblici'){
			return [
				{
					quarter: 'Q2-2026',
					giorno: '2026-06-30',
					valore: 6400,
					buffer: 100,
					quarter_prec: 'Q1-2026',
					targetPerTipologia: { 'Tutte le tipologie': 6400 }
				}
			];
		}else if (m==='1.2 Abilitazione e facilitazione migrazione al Cloud'){
			return [
				{
							quarter: 'Q3-2024',
							giorno: '2024-09-30',
							valore: 4083,
							buffer: 100,
							quarter_prec: 'Q2-2024',
							targetPerTipologia: { Comuni: 6900, Scuole: 6000, 'Altre tipologie': 8 }
						},
						{
							quarter: 'Q2-2026',
							giorno: '2026-06-30',
							valore: 12464,
							buffer: 100,
							quarter_prec: 'Q1-2026',
							targetPerTipologia: { Comuni: 6900, Scuole: 6000, 'Altre tipologie': 8 }
						}
			]
		}else{
			return [
				{
							quarter: 'Q3-2024',
							giorno: '2024-09-30',
							valore: 6375,
							buffer: 100,
							quarter_prec: 'Q2-2024',
							targetPerTipologia: { Comuni: 6900, Scuole: 6000, 'Altre tipologie': 8 }
						},
						{
							quarter: 'Q2-2026',
							giorno: '2026-06-30',
							valore: 12750,
							buffer: 100,
							quarter_prec: 'Q1-2026',
							targetPerTipologia: { Comuni: 6900, Scuole: 6000, 'Altre tipologie': 8 }
						}
			]
		}
	};

	let targets = determinaTarget(data.misura.misura);
		

	let candidatureFinanziate = data.candidature.filter((c) => c.stato_candidatura === 'FINANZIATA');

	let tipologieEnti = Object.values(
		data.enti.reduce((a, { tipologia_ente }) => {
			a[tipologia_ente] = a[tipologia_ente] || {
				tipologia_ente,
				count: 0
			};
			a[tipologia_ente].count++;
			return a;
		}, Object.create(null))
	).map((x) => x.tipologia_ente);

	let candidatureFinanziatePositive = candidatureFinanziate.filter(
		(c) => c.stato_candidatura === 'FINANZIATA' && c.ultimo_esito_conformita_tecnica === 'Positivo'
	);

	let candidatureFinanziateNonPositive = candidatureFinanziate.filter(
		(c) => c.stato_candidatura === 'FINANZIATA' && c.ultimo_esito_conformita_tecnica !== 'Positivo'
	);

	let esitoVerificaUnicaCandidatura = 'OK';
	let esitoVerificaEnteInPlatea = 'OK';

	function calcolaQuarters(s, e) {
		const d = [];
		let current = new Date(s.getFullYear(), s.getMonth(), 1);
		current.setHours(0);
		current.setMinutes(0);
		current.setSeconds(0);
		current.setMilliseconds(0);
		while (current < e) {
			const quarter = getQuarter(new Date(current));

			if (d.indexOf(quarter) === -1) {
				d.push(quarter);
			}
			current.setDate(current.getDate() + 1);
			current.setHours(0);
			current.setMinutes(0);
			current.setSeconds(0);
			current.setMilliseconds(0);
		}
		return d;
	}

	function dateRange(startDate, endDate, steps = 1) {
		const dateArray = [];
		let currentDate = new Date(startDate);

		while (currentDate <= new Date(endDate)) {
			dateArray.push(new Date(currentDate));
			// Use UTC date to prevent problems with time zones and DST
			currentDate.setUTCDate(currentDate.getUTCDate() + steps);
		}

		return dateArray;
	}

	let entiConCandidaturaFinanziata = data.enti.filter(
		(e) => candidatureFinanziate.filter((c) => c.idente === e.idente).length > 0
	);

	if (data.misura.misura === '1.2 Abilitazione e facilitazione migrazione al Cloud') {
		const checkNumeroCandidature = data.enti.filter(
			(e) => candidatureFinanziate.filter((c) => c.idente === e.idente).length > 1
		);
		if (checkNumeroCandidature.length > 0) {
			esitoVerificaUnicaCandidatura =
				'Ci sono ' + checkNumeroCandidature.length + ' enti con più di una candidatura';
		}
		if (candidatureFinanziate > entiConCandidaturaFinanziata) {
			/* Check candidature senza ente */
			const candidatureFinanziateSenzaEnte = candidatureFinanziate.filter(
				(e) => data.enti.filter((c) => c.idente === e.idente).length === 0
			);
			esitoVerificaEnteInPlatea =
				'Sono state individuate ' +
				candidatureFinanziateSenzaEnte.length +
				" candidature che non corrispondono ad un ente in platea. Verranno rimosse dall'analisi.";
			candidatureFinanziate = candidatureFinanziate.filter(
				(f) =>
					candidatureFinanziateSenzaEnte.filter((cfse) => cfse.idcandidatura === f.idcandidatura)
						.length === 0
			);
		}
	}

	const calcolaRipartizioneCandidature = (c) => {
		let cc = Object.values(
			c.reduce((a, { stato_candidatura }) => {
				a[stato_candidatura] = a[stato_candidatura] || {
					stato_candidatura,
					count: 0
				};
				a[stato_candidatura].count++;
				return a;
			}, Object.create(null))
		).sort((a, b) => {
			return (
				statusIndex[a.stato_candidatura.replaceAll(' ', '_')] -
				statusIndex[b.stato_candidatura.replaceAll(' ', '_')]
			);
		});
		let labels = ['Stato candidatura'];
		let values = ['Numero candidature'];

		cc.forEach((e) => {
			labels.push(e.stato_candidatura);
			values.push(e.count);
		});
		return [labels, values];
	};

	const calcolaRipartizionePlatea = (c) => {
		let cc = Object.values(
			c.reduce((a, { tipologia_ente }) => {
				a[tipologia_ente] = a[tipologia_ente] || {
					tipologia_ente,
					count: 0
				};
				a[tipologia_ente].count++;
				return a;
			}, Object.create(null))
		);
		let labels = ['Tipologia ente'];
		let values = ['Numero enti'];

		cc.forEach((e) => {
			labels.push(e.tipologia_ente);
			values.push(e.count);
		});
		return [labels, values];
	};

	const calcolaColoriRipartizioniCandidature = (c) => {
		let cc = Object.values(
			c.reduce((a, { stato_candidatura }) => {
				a[stato_candidatura] = a[stato_candidatura] || {
					stato_candidatura,
					count: 0
				};
				a[stato_candidatura].count++;
				return a;
			}, Object.create(null))
		).sort((a, b) => {
			return (
				statusIndex[a.stato_candidatura.replaceAll(' ', '_')] -
				statusIndex[b.stato_candidatura.replaceAll(' ', '_')]
			);
		});

		let res = {};
		cc.forEach((e, index) => {
			res[index] = { color: statusColor[e.stato_candidatura.replaceAll(' ', '_')] };
		});
		return res;
	};

	const calcolaDistribuzioneCompletamentoAttivita = (c) => {
		const res = [];
		let tipiDataCompletamento = Object.values(
			candidatureFinanziate.reduce((a, { tipocompletamento }) => {
				a[tipocompletamento] = a[tipocompletamento] || {
					tipocompletamento,
					count: 0
				};
				a[tipocompletamento].count++;
				return a;
			}, Object.create(null))
		)
			.filter((x) => x.tipocompletamento)
			.map((x) => x.tipocompletamento)
			.sort((a, b) => {
				return a < b ? -1 : 1;
			});
		const quarters = calcolaQuarters(new Date(2022, 0, 1), new Date(2026, 11, 31));
		res.push(['Quarter'].concat(tipiDataCompletamento));

		quarters.forEach((q) => {
			let row = [q];
			tipiDataCompletamento.forEach((tc) => {
				row.push(
					candidatureFinanziate.filter(
						(c) => c.tipocompletamento === tc && c.quartercompletamento === q
					).length
				);
			});
			res.push(row);
		});
		return res;
	};

	$: calcolaIncrementaleEsitiPositivi = (c) => {
		const result = [['Data', 'Positivi', 'Target']];
		let days = dateRange(new Date(2022, 0, 1), new Date(2026, 11, 31));
		days.forEach((d) => {
			result.push([
				d,
				c.filter(
					(x) =>
						x.data_ultimo_esito_conformita_tecnica &&
						x.ultimo_esito_conformita_tecnica === 'Positivo' &&
						x.data_ultimo_esito_conformita_tecnica.getFullYear() === d.getFullYear() &&
						x.data_ultimo_esito_conformita_tecnica.getMonth() === d.getMonth() &&
						x.data_ultimo_esito_conformita_tecnica.getDate() === d.getDate()
				).length,
				null
			]);
		});
		result.forEach((e, i) => {
			if (i > 1) {
				result[i][1] = result[i - 1][1] + Number(e[1]);
			} else {
				if (i === 1) {
					result[i][1] = 0;
				}
			}
		});
		targets.forEach((t) => {
			result.push([new Date(t.giorno), null, t.valore]);
		});
		return result;
	};

	let tempoMedioAsseverazione = 60;

	$: calcolaIncrementaleAttuali = (c) => {
		const result = [['Data', 'Stima positivi', 'Target']];
		const cc = c.map((item) => ({
			...item,
			data_completamento: item.data_completamento
				? addDays(item.data_completamento, tempoMedioAsseverazione)
				: null
		}));
		let days = dateRange(new Date(2022, 0, 1), new Date(2026, 11, 31));
		days.forEach((d) => {
			result.push([
				d,
				cc.filter(
					(x) =>
						x.data_completamento &&
						x.data_completamento.getFullYear() === d.getFullYear() &&
						x.data_completamento.getMonth() === d.getMonth() &&
						x.data_completamento.getDate() === d.getDate()
				).length,
				null
			]);
		});

		result.forEach((e, i) => {
			if (i > 1) {
				result[i][1] = result[i - 1][1] + Number(e[1]);
			} else {
				if (i === 1) {
					result[i][1] = 0;
				}
			}
		});
		targets.forEach((t) => {
			result.push([new Date(t.giorno), null, t.valore]);
		});
		return result;
	};

	let calcolaSlotIniziali = (t) => {
		//Gli slot vanno calcolati per ogni target
		t.forEach((target) => {
			let slots = [
				{ quarter: 'Q3-2024', valore: 0, data: getFirstDayOfQuarter('Q3-2024') },
				{ quarter: 'Q4-2024', valore: 0, data: getFirstDayOfQuarter('Q4-2024') },
				{ quarter: 'Q1-2025', valore: 0, data: getFirstDayOfQuarter('Q1-2025') },
				{ quarter: 'Q2-2025', valore: 0, data: getFirstDayOfQuarter('Q2-2025') },
				{ quarter: 'Q3-2025', valore: 0, data: getFirstDayOfQuarter('Q3-2025') },
				{ quarter: 'Q4-2025', valore: 0, data: getFirstDayOfQuarter('Q4-2025') },
				{ quarter: 'Q1-2026', valore: 0, data: getFirstDayOfQuarter('Q1-2026') },
				{ quarter: 'Q2-2026', valore: 0, data: getFirstDayOfQuarter('Q2-2026') },
				{ quarter: 'Q3-2026', valore: 0, data: getFirstDayOfQuarter('Q3-2026') }
			].filter((s) => getFirstDayOfQuarter(s.quarter) <= getFirstDayOfQuarter(target.quarter));
			slots.pop();
			if (slots.length > 0) {
				let daAsseverare =
					Math.round(target.valore * (1 + target.buffer / 100)) -
					candidatureFinanziatePositive.length;
				const capienzamedia = Math.round(daAsseverare / slots.length);
				slots.forEach((element) => {
					element.valore = capienzamedia < 0 ? 0 : capienzamedia;
				});
			}
			target.slots = slots;
		});
	};

	$: calcolaSlotIniziali(targets);

	

	let calcolaCompletamentiECapienze = (candidatureFinanziateNonPositive, targets, te) => {
		const result = [['# Progetti', 'Completamento attuale', 'Capienza slot']];
		calcolaQuarters(new Date(2024, 5, 1), new Date(2026, 11, 31)).forEach((q) => {
			result.push([
				q,
				Number(
					candidatureFinanziateNonPositive.filter(
						(c) => c.tipologia_ente === te && c.quartercompletamento === q
					).length
				),
				Number(
					Math.round(
						(targets[targets.length - 1].targetPerTipologia[te] -
							candidatureFinanziatePositive.filter((c) => c.tipologia_ente === te).length) /
							quartersDiff('Q3-2024', targets[targets.length - 1].quarter)
					)
				)
			]);
		});
		return result;
	};
</script>

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
										<a class="nav-link active" href="#platea">
											<span>1. Platea </span>
										</a>
										<a class="nav-link" href="#candidature">
											<span>2. Candidature </span>
										</a>
										<!--
										<a class="nav-link" href="#datawrangling">
											<span>3. Data wrangling </span>
										</a>
										-->
										<a class="nav-link" href="#targets">
											<span>3. Targets </span>
										</a>
										<a class="nav-link" href="#simulazione">
											<span>4. Simulazione </span>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</div>
		<div class="col-12 col-lg-10 it-page-sections-container">
			<h4>Analisi proroghe - Misura {data.misura.misura} {data.pacchetto?(' - '+data.pacchetto):''}</h4>
			<div class="it-page-section my-5" id="platea">
				<h5>Platea</h5>
				<div class="row my-4 d-flex align-items-center">
					<div class="col-12 col-lg-4">
						<Scorecard
							title={formatNumber(data.enti.length)}
							text="Numero totale enti"
							bgcolor="primary"
							textcolor="white"
						/>
					</div>
					<div class="col-12 col-lg-8">
						<Columnchart
							id="ripartizionePlatea"
							values={calcolaRipartizionePlatea(data.enti)}
							series={null}
							legendPosition="right"
							stacked={'percent'}
							h="150"
						/>
					</div>
				</div>
			</div>
			<hr />
			<div class="it-page-section my-5" id="candidature">
				<h5>Candidature</h5>
				<div class="row my-4 d-flex align-items-center">
					<div class="col-12 col-lg-4">
						<Scorecard
							title={formatNumber(data.candidature.length)}
							text="Numero totale candidature"
							bgcolor="primary"
							textcolor="white"
						/>
					</div>
					<div class="col-12 col-lg-8">
						<Columnchart
							id="ripartizioneCandidature"
							values={calcolaRipartizioneCandidature(data.candidature)}
							series={calcolaColoriRipartizioniCandidature(data.candidature)}
							legendPosition="right"
							stacked={'percent'}
							h="150"
						/>
					</div>
				</div>
			</div>
			<hr/>
			<!--
			<div class="it-page-section my-5" id="datawrangling">
				<h5>Data wrangling</h5>
				<h6>Verifiche di consistenza</h6>
				<div class="row my-4 d-flex align-items-center">
					<div class="col-12 col-lg-8">
						<p>Verifica che ogni ente non abbia più di una candidatura finanziata</p>
					</div>
					<div class="col-12 col-lg-4">
						<p>
							{#if esitoVerificaUnicaCandidatura === 'OK'}
								<svg class="icon icon-success"
									><use href="/svg/sprites.svg#it-check-circle"></use></svg
								>
							{:else}
								<svg class="icon icon icon-warning"
									><use href="/svg/sprites.svg#it-check-circle"></use></svg
								>
								<span>{esitoVerificaUnicaCandidatura}</span>
							{/if}
						</p>
					</div>
				</div>
				<div class="row my-4 d-flex align-items-center">
					<div class="col-12 col-lg-8">
						<p>Verifica che ogni candidatura corrisponda ad un ente in platea</p>
					</div>
					<div class="col-12 col-lg-4">
						{#if esitoVerificaEnteInPlatea === 'OK'}
							<svg class="icon icon-success"
								><use href="/svg/sprites.svg#it-check-circle"></use></svg
							>
						{:else}
							<svg class="icon icon icon-warning"
								><use href="/svg/sprites.svg#it-check-circle"></use></svg
							>
							<span>{esitoVerificaEnteInPlatea}</span>
						{/if}
					</div>
				</div>
				<h6>Calcolo delle date di completamento (reali e stimate)</h6>
				<div class="row my-4 d-flex align-items-center">
					<div class="col-12 col-lg-12">
						<p>
							Per le candidature già in esito tecnico finale (positivo o negativo), la data di
							completamento è quella effettiva. Per le candidature in asseverazione e quelle in
							realizzazione, la data di completamento è il giorno ultimo previsto della fase di
							completamento del cronoprogramma, incluse le proroghe. Per le candidature non ancora
							contrattualizzate, la data di completamento è la data prevista da cronoprogramma per
							la contrattualizzazione sommata ai giorni previsti di cronoprogramma per il
							completamento.
						</p>
					</div>
					<div class="col-12 col-lg-12">
						<Barchart
							id="datecomplchart"
							values={calcolaDistribuzioneCompletamentoAttivita(candidatureFinanziate)}
							legendPosition="top"
							stacked={'true'}
							series={null}
							h="400"
						/>
					</div>
				</div>
			</div>
			<hr />
			-->
			<div class="it-page-section my-5" id="targets">
				<h5>Definizione dei targets</h5>
				<div class="row my-4 d-flex align-items-center">
					<div class="col-12 col-lg-4">
						<div class="table-responsive">
							<table class="table table-hover table-sm caption-top align-middle">
								<caption>Inserire il valore nel quarter di riferimento</caption>
								<thead>
									<tr>
										{#each targets as q}
											<th><small>{q.quarter}</small></th>
										{/each}
									</tr>
								</thead>
								<tbody>
									<tr>
										{#each targets as q, i}
											<td>
												<small>
													<div class="form-group">
														<div class="input-group input-number">
															<small>
																<strong>
																<input
																	type="number"
																	bind:value={q.valore}
																	class="form-control text-primary"
																	data-bs-input
																	id="inputNumber{i}"
																	name="inputNumber{i}"
																	step="1"
																/>
															</strong>
															</small>
														</div>
													</div>
												</small>
											</td>
										{/each}
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<p>
					Il seguente grafico mostra la situazione attuale delle asseverazioni tecniche positive
				</p>
				<div>
					<Areachart
						id="positivi"
						title="Asseverazioni tecniche positive"
						colors={['#3e8ed0']}
						values={calcolaIncrementaleEsitiPositivi(candidatureFinanziatePositive)}
					/>
				</div>
			</div>
			<hr />
			<div class="it-page-section my-5" id="simulazione">
				<h5>Simulazione</h5>
				<h6>Campienza ammissibilità</h6>
				<div class="row">
					<div class="col-12 col-lg-12">
						<div class="table-responsive">
							<table class="table table-hover table-sm caption-top align-middle">
								<thead>
									<tr>
										<th><small>Quarter</small></th>
										<th><small>Target</small></th>
										<th><small>Buffer</small></th>
										<th><small>Necessari al target</small></th>
										<th><small>Completamento target</small></th>
										<th><small>Numero slots</small></th>
									</tr>
								</thead>
								<tbody>
									{#each targets as t, i}
										<tr>
											<td><small>{t.quarter}</small></td>
											<td><small>{t.valore}</small></td>
											<td
												><small>
													<div class="form-group my-0">
														<div class="input-group input-number my-0">
															<small>
																<input
																	type="number"
																	bind:value={t.buffer}
																	class="form-control  text-primary"
																	data-bs-input
																	id="inputNumberBuffer{i}"
																	name="inputNumberBuffer{i}"
																	step="1"
																/>
															</small>
														</div>
													</div>
												</small></td
											>
											<td
												><small
													>{Math.round(
														((t.valore - candidatureFinanziatePositive.length) * t.buffer) / 100
													)}</small
												></td
											>
											<td
												><small>
													{candidatureFinanziateNonPositive.filter(
														(f) =>
															getFirstDayOfQuarter(f.quartercompletamento).getTime() <=
															getFirstDayOfQuarter(t.quarter_prec).getTime()
													).length}
												</small></td
											>
											<td><small>{quartersDiff('Q3-2024', t.quarter)}</small></td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<h6>Dimensionamento slot</h6>
				<div class="row">
					<div class="col-12 col-lg-12">
						<div class="table-responsive">
							<table class="table table-hover table-sm caption-top align-middle">
								<thead>
									<tr>
										<th><small>Tipologia Ente</small></th>
										<th><small># positivi</small></th>
										<th><small># in completamento</small></th>
										<th><small># progetto attivi</small></th>
										<th><small>Target</small></th>
										<th><small># mancanti al target</small></th>
										<th><small>Capienza slot (uniforme)</small></th>
									</tr>
								</thead>
								<tbody>
									{#each tipologieEnti as te}
										<tr>
											<td><small>{te}</small></td>
											<td
												><small
													>{candidatureFinanziatePositive.filter((c) => c.tipologia_ente === te)
														.length}</small
												></td
											>
											<td
												><small
													>{candidatureFinanziateNonPositive.filter((c) => c.tipologia_ente === te)
														.length}</small
												></td
											>
											<td
												><small
													>{candidatureFinanziatePositive.filter((c) => c.tipologia_ente === te)
														.length +
														candidatureFinanziateNonPositive.filter((c) => c.tipologia_ente === te)
															.length}</small
												></td
											>
											<td
												><small>
													<div class="form-group my-0">
														<div class="input-group input-number my-0">
															<small>
																<input
																	type="number"
																	bind:value={targets[targets.length - 1].targetPerTipologia[te]}
																	class="form-control  text-primary"
																	data-bs-input
																	id="inputNumberBuffer-{te}"
																	name="inputNumberBuffer-{te}"
																	step="1"
																/>
															</small>
														</div>
													</div>
												</small></td
											>
											<td>
												<small>
													{targets[targets.length - 1].targetPerTipologia[te] -
														candidatureFinanziatePositive.filter((c) => c.tipologia_ente === te)
															.length}
												</small>
											</td>
											<td>
												<small>
													{Math.round(
														(targets[targets.length - 1].targetPerTipologia[te] -
															candidatureFinanziatePositive.filter((c) => c.tipologia_ente === te)
																.length) /
															quartersDiff('Q3-2024', targets[targets.length - 1].quarter)
													)}
												</small>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<h6>Calendario slot per tipologia ente</h6>
				{#each tipologieEnti as te}
					<strong>{te}</strong>

					<div class="row">
						<div class="col-12 col-lg-6">
							<div class="table-responsive">
								<table class="table table-hover table-sm caption-top align-middle">
									<thead>
										<tr>
											<th><small>Slot</small></th>
											<th><small># completamento {te}</small></th>
											<th><small>Ammissibile {te}</small></th>
										</tr>
									</thead>
									<tbody>
										{#each calcolaQuarters(new Date(2024, 5, 1), new Date(2026, 11, 31)) as q}
											<tr>
												<td>
													<small>{q}</small>
												</td>
												<td>
													<small>
														{candidatureFinanziateNonPositive.filter(
															(c) => c.tipologia_ente === te && c.quartercompletamento === q
														).length}
													</small>
												</td>
												<td>
													<small>
														{candidatureFinanziateNonPositive.filter(
															(c) => c.tipologia_ente === te && c.quartercompletamento === q
														).length >
														Math.round(
															(targets[targets.length - 1].targetPerTipologia[te] -
																candidatureFinanziatePositive.filter((c) => c.tipologia_ente === te)
																	.length) /
																quartersDiff('Q3-2024', targets[targets.length - 1].quarter)
														)
															? 'NO'
															: 'SI'}
													</small>
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						</div>
						<div class="col-12 col-lg-6">
							<Barchart
								id="datecomplchart--{te}"
								values={calcolaCompletamentiECapienze(
									candidatureFinanziateNonPositive,
									targets,
									te
								)}
								legendPosition="top"
								stacked={'false'}
								series={null}
								h="400"
							/>
						</div>
					</div>
				{/each}
				<h6>Proiezione raggiungimento target</h6>
				<p>
					Il seguente grafico mostra la proiezione delle asseverazioni tecniche positive,
					considerando le date stimate ti completamento attività ed un tempo medio di asseverazione
					tecnica pari a {tempoMedioAsseverazione} giorni.
				</p>
				<div class="form-group my-4">
					<label for="tempoMedioAsseverazione" class="input-number-label active"
						>Tempo medio di asseverazione</label
					>
					<div class="input-group input-number">
						<small>
							<input
								type="number"
								bind:value={tempoMedioAsseverazione}
								class="form-control  text-primary"
								data-bs-input
								id="tempoMedioAsseverazione"
								name="tempoMedioAsseverazione"
								step="1"
							/>
						</small>
					</div>
				</div>
				<div>
					<Areachart
						id="previsionepositivi"
						title="Previsione tecniche positive"
						colors={['#ff9900']}
						values={calcolaIncrementaleAttuali(candidatureFinanziate)}
					/>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	input,
	th {
		font-size: 0.8rem;
	}
</style>
