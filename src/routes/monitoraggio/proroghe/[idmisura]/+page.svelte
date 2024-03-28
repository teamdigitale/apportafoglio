<script>
	// @ts-nocheck

	import { statusIndex, statusColor, statusProgettoIndex, statusProgettoColor } from '$lib';
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

	const sortTipologie = {
		Comuni: 0,
		Scuole: 1,
		'Altre tipologie': 2,
		'Tutte le tipologie': 3
	};

	const determinaTarget = (m, p) => {
		if (m === '1.1 Infrastrutture digitali') {
			return [
				{
					quarter: 'Q3-2024',
					giorno: '2024-09-30',
					valore: 100,
					buffer: 100,
					quarter_prec: 'Q2-2024',
					targetPerTipologia: { Comuni: 6900, Scuole: 6000, 'Altre tipologie': 8 }
				},
				{
					quarter: 'Q2-2026',
					giorno: '2026-06-30',
					valore: 280,
					buffer: 100,
					quarter_prec: 'Q1-2026',
					targetPerTipologia: { 'Tutte le tipologie': 500 }
				}
			];
		} else if (m === '1.3.1 Piattaforma Digitale Nazionale Dati') {
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
		} else if (m === '1.4.4 Adozione identità digitale') {
			return [
				{
					quarter: 'Q2-2026',
					giorno: '2026-06-30',
					valore: 7400,
					buffer: 100,
					quarter_prec: 'Q1-2026',
					targetPerTipologia: { 'Tutte le tipologie': 7400 }
				}
			];
		} else if (m === '1.4.5 Digitalizzazione degli avvisi pubblici') {
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
		} else if (m === '1.4.3 Adozione PagoPA e AppIO' && p === 'AppIO') {
			return [
				{
					quarter: 'Q2-2026',
					giorno: '2026-06-30',
					valore: 6800,
					buffer: 100,
					quarter_prec: 'Q1-2026',
					targetPerTipologia: { 'Tutte le tipologie': 6800 }
				}
			];
		} else if (m === '1.4.3 Adozione PagoPA e AppIO' && p === 'PagoPA') {
			return [
				{
					quarter: 'Q2-2026',
					giorno: '2026-06-30',
					valore: 6800,
					buffer: 100,
					quarter_prec: 'Q1-2026',
					targetPerTipologia: { 'Tutte le tipologie': 6800 }
				}
			];
		} else if (m === '1.2 Abilitazione e facilitazione migrazione al Cloud') {
			return [
				{
					quarter: 'Q3-2024',
					giorno: '2024-09-30',
					valore: 4083,
					buffer: 100,
					quarter_prec: 'Q2-2024',
					targetPerTipologia: { Comuni: 6900, Scuole: 6000, 'Altre tipologie': 67 }
				},
				{
					quarter: 'Q2-2026',
					giorno: '2026-06-30',
					valore: 12464,
					buffer: 100,
					quarter_prec: 'Q1-2026',
					targetPerTipologia: { Comuni: 6900, Scuole: 6000, 'Altre tipologie': 67 }
				}
			];
		} else {
			return [
				{
					quarter: 'Q3-2024',
					giorno: '2024-09-30',
					valore: 6508,
					buffer: 100,
					quarter_prec: 'Q2-2024',
					targetPerTipologia: { Comuni: 6900, Scuole: 6000, 'Altre tipologie': 8 }
				},
				{
					quarter: 'Q2-2026',
					giorno: '2026-06-30',
					valore: 13015,
					buffer: 100,
					quarter_prec: 'Q1-2026',
					targetPerTipologia: { Comuni: 6600, Scuole: 6750, 'Altre tipologie': 8 }
				}
			];
		}
	};

	let targets = determinaTarget(data.misura.misura, data.pacchetto);

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
	)
		.map((x) => x.tipologia_ente)
		.sort((a, b) => {
			return sortTipologie[a] < sortTipologie[b] ? -1 : 1;
		});

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
			c.reduce((a, { stato_progetto }) => {
				a[stato_progetto] = a[stato_progetto] || {
					stato_progetto,
					count: 0
				};
				a[stato_progetto].count++;
				return a;
			}, Object.create(null))
		).sort((a, b) => {
			return (
				statusProgettoIndex[a.stato_progetto.replaceAll(' ', '_')] -
				statusProgettoIndex[b.stato_progetto.replaceAll(' ', '_')]
			);
		});
		let labels = ['Stato candidatura'];
		let values = ['Numero candidature'];

		cc.forEach((e) => {
			labels.push(e.stato_progetto);
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
			c.reduce((a, { stato_progetto }) => {
				a[stato_progetto] = a[stato_progetto] || {
					stato_progetto,
					count: 0
				};
				a[stato_progetto].count++;
				return a;
			}, Object.create(null))
		).sort((a, b) => {
			return (
				statusProgettoIndex[a.stato_progetto.replaceAll(' ', '_')] -
				statusProgettoIndex[b.stato_progetto.replaceAll(' ', '_')]
			);
		});

		let res = {};
		cc.forEach((e, index) => {
			res[index] = { color: statusProgettoColor[e.stato_progetto.replaceAll(' ', '_')] };
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
		const quarters = calcolaQuarters(new Date(2022, 8, 1), new Date(2026, 11, 31));
		let firstRow = ['Quarter'];
		tipiDataCompletamento.forEach((e) => {
			firstRow = firstRow.concat([e]);
		});

		res.push(firstRow);

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

	$: calcolaIncrementaleSimulazione = (cand) => {
		const result = [['Data', 'Stima positivi', 'Target']];
		let c = cand;
		let slotsim = slots;

		for (let z = 0; z < c.length; z++) {
			if (Object.entries(slotsim).reduce((a, b) => (a = a + b[1]), 0) <= 0) {
				break;
			}
			console.log('SLOT: ' + Object.entries(slotsim).reduce((a, b) => (a = a + b[1]), 0));
			for (let x = slotsim.length - 1; x >= 0; x++) {
				if (slotsim[x][0].startsWith(c.tipologia_ente) && slotsim[1] > 0) {
					c.data_completamento = getFirstDayOfQuarter(
						slotsim[x].substring(0, c.tipologia_ente.length)
					);
					slotsim[x][1] = slotsim[x][1] - 1;
				}
			}
		}

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

	$: slots = {};

	let calcolaSlotIniziali = (t) => {
		//Gli slot vanno calcolati per ogni target e per ogni tipologia ente...

		tipologieEnti.forEach((te) => {
			console.log('Tipologia ente: ' + te);

			t.forEach((target) => {
				let sss = [];
				let slotste = [
					{
						quarter: 'Q3-2024',
						valore: 0,
						data: getFirstDayOfQuarter('Q3-2024'),
						tipologia_ente: te
					},
					{
						quarter: 'Q4-2024',
						valore: 0,
						data: getFirstDayOfQuarter('Q4-2024'),
						tipologia_ente: te
					},
					{
						quarter: 'Q1-2025',
						valore: 0,
						data: getFirstDayOfQuarter('Q1-2025'),
						tipologia_ente: te
					},
					{
						quarter: 'Q2-2025',
						valore: 0,
						data: getFirstDayOfQuarter('Q2-2025'),
						tipologia_ente: te
					},
					{
						quarter: 'Q3-2025',
						valore: 0,
						data: getFirstDayOfQuarter('Q3-2025'),
						tipologia_ente: te
					},
					{
						quarter: 'Q4-2025',
						valore: 0,
						data: getFirstDayOfQuarter('Q4-2025'),
						tipologia_ente: te
					},
					{
						quarter: 'Q1-2026',
						valore: 0,
						data: getFirstDayOfQuarter('Q1-2026'),
						tipologia_ente: te
					},
					{
						quarter: 'Q2-2026',
						valore: 0,
						data: getFirstDayOfQuarter('Q2-2026'),
						tipologia_ente: te
					},
					{
						quarter: 'Q3-2026',
						valore: 0,
						data: getFirstDayOfQuarter('Q3-2026'),
						tipologia_ente: te
					}
				].filter((s) => getFirstDayOfQuarter(s.quarter) <= getFirstDayOfQuarter(target.quarter));
				slotste.pop();
				if (slotste.length > 0) {
					let daAsseverare =
						targets[targets.length - 1].targetPerTipologia[te] -
						candidatureFinanziatePositive.filter((c) => c.tipologia_ente === te).length;
					console.log('Numero slots: ' + slotste.length);
					const capienzamedia = Math.round(daAsseverare / slotste.length);
					console.log(capienzamedia);
					slotste.forEach((element) => {
						let q = element.quarter;
						element.valore = capienzamedia < 0 ? 0 : capienzamedia;
						slots[te + q] = element.valore;
						//slots.set(,element.valore);
						//sss.push({q, valore: capienzamedia < 0 ? 0 : capienzamedia})
					});

					//slots.push({te, sss})
				}

				//slots = slots.concat(slotste);
			});
		});
		//t.slots = slots;
	};

	$: calcolaSlotIniziali(targets);

	$: console.log(slots);

	$: calcolaCompletamentiECapienze = (candidatureFinanziateNonPositive, targets, te) => {
		const result = [['# Progetti', 'Completamento attuale', 'Capienza slot']];
		calcolaQuarters(new Date(2024, 5, 1), new Date(2026, 11, 31)).forEach((q) => {
			result.push([
				q,
				Number(
					candidatureFinanziateNonPositive.filter(
						(c) => c.tipologia_ente === te && c.quartercompletamento === q
					).length
				),
				getFirstDayOfQuarter('Q3-2024') <= getFirstDayOfQuarter(q) &&
				getFirstDayOfQuarter(q) < getFirstDayOfQuarter(targets[targets.length - 1].quarter)
					? slots[te.concat(q)]
					: 0
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
										<!--
										<a class="nav-link active" href="#platea">
											<span>1. Platea </span>
										</a>
										-->
										<a class="nav-link" href="#candidature">
											<span>1. Candidature </span>
										</a>
										<!--
										<a class="nav-link" href="#datawrangling">
											<span>3. Data wrangling </span>
										</a>
										-->
										<a class="nav-link" href="#targets">
											<span>2. Targets </span>
										</a>
										<a class="nav-link" href="#simulazione">
											<span>3. Simulazione </span>
										</a>
										<a class="nav-link" href="#attuale">
											<span>4. Situazione attuale </span>
										</a>
									</li>
								</ul>
								<hr />
								<a href="/monitoraggio/proroghe" class="go-back"
									><svg class="icon icon-sm icon-primary me-2"
										><use href="/svg/sprites.svg#it-arrow-left"></use></svg
									>Torna indietro</a
								>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</div>
		<div class="col-12 col-lg-10 it-page-sections-container">
			<h4>
				Analisi proroghe - Misura {data.misura.misura}
				{data.pacchetto ? ' - ' + data.pacchetto : ''}
			</h4>
			<!--
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
			-->
			<div class="it-page-section my-5" id="candidature">
				<h5>Candidature finanziate: {formatNumber(candidatureFinanziate.length)}</h5>
				<h6>Ripartizione degli avanzamenti progettuali per tipologia ente</h6>
				<div class="row my-1 d-flex align-items-center">
					{#each tipologieEnti as te}
						<div class="col-12 col-lg-4">
							<p><small>{te}</small></p>
							<Columnchart
								id="ripartizioneCandidature-{te}"
								values={calcolaRipartizioneCandidature(
									candidatureFinanziate.filter((c) => c.tipologia_ente === te)
								)}
								series={calcolaColoriRipartizioniCandidature(
									candidatureFinanziate.filter((c) => c.tipologia_ente === te)
								)}
								legendPosition="top"
								stacked={'percent'}
								h="150"
							/>
						</div>
					{/each}
				</div>
				<div>
					<div
						class="chip chip-simple"
						style="background-color: {statusProgettoColor['DA_AVVIARE']}"
					>
						<span class="chip-label">Da avviare</span>
					</div>
					<div class="chip chip-simple" style="background-color: {statusProgettoColor['AVVIATO']}">
						<span class="chip-label">Avviato</span>
					</div>
					<div
						class="chip chip-simple"
						style="background-color: {statusProgettoColor['COMPLETATO']};"
					>
						<span class="chip-label" style="color: white;">Completato</span>
					</div>
					<div
						class="chip chip-simple"
						style="background-color: {statusProgettoColor['IN_VERIFICA_TECNICA']}"
					>
						<span class="chip-label">In verifica tecnica</span>
					</div>
					<div
						class="chip chip-simple"
						style="background-color: {statusProgettoColor['IN_VERIFICA_FORMALE']}"
					>
						<span class="chip-label">In verifica formale</span>
					</div>
					<div
						class="chip chip-simple"
						style="background-color: {statusProgettoColor['IN_LIQUIDAZIONE']}"
					>
						<span class="chip-label">In liquidazione</span>
					</div>
					<div
						class="chip chip-simple"
						style="background-color: {statusProgettoColor['LIQUIDATO']};"
					>
						<span class="chip-label" style="color:white">Liquidato</span>
					</div>
				</div>
				<div class="my-4">
					<h6>Calcolo delle date di completamento (reali e stimate)</h6>
					<div class="row d-flex align-items-center">
						<div class="col-12 col-lg-9">
							<Barchart
								id="datecomplchart"
								values={calcolaDistribuzioneCompletamentoAttivita(candidatureFinanziate)}
								legendPosition="top"
								stacked={'true'}
								series={null}
								h="400"
								colors={['#278262', '#f5ce93', '#d68d20', '#e07b8b']}
							/>
						</div>
						<div class="col-12 col-lg-3">
							<p>
								<small>
									Per le candidature già in esito tecnico finale (positivo o negativo), la data di
									completamento è quella effettiva. Per le candidature in asseverazione e quelle in
									realizzazione, la data di completamento è il giorno ultimo previsto della fase di
									completamento del cronoprogramma, incluse le proroghe. Per le candidature non
									ancora contrattualizzate, la data di completamento è la data prevista da
									cronoprogramma per la contrattualizzazione sommata ai giorni previsti di
									cronoprogramma per il completamento.
								</small>
							</p>
						</div>
					</div>
				</div>
				<h6 class="my-2">Proiezione raggiungimento target</h6>
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
								class="form-control text-primary"
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
						title="Previsione esiti positivi asseverazione tecnica"
						colors={['#009963']}
						values={calcolaIncrementaleAttuali(candidatureFinanziate)}
					/>
				</div>
			</div>
			<hr />
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
			<div class="it-page-section my-4" id="targets">
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
			</div>
			<hr />
			<div class="it-page-section my-4" id="simulazione">
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
										<th><small>Proroga ammissibile</small></th>
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
																	class="form-control text-primary"
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
											<td class="text-center"
												><small>
													{#if candidatureFinanziateNonPositive.filter((f) => getFirstDayOfQuarter(f.quartercompletamento).getTime() <= getFirstDayOfQuarter(t.quarter_prec).getTime()).length < Math.round(((t.valore - candidatureFinanziatePositive.length) * t.buffer) / 100)}
														<svg class="icon icon-sm icon-danger"
															><use href="/svg/sprites.svg#it-ban"></use></svg
														>
													{:else}
														<svg class="icon icon-sm icon-success"
															><use href="/svg/sprites.svg#it-check-circle"></use></svg
														>
													{/if}
												</small></td
											>
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
										<th><small># progetti attivi</small></th>
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
																	class="form-control text-primary"
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
									<tr>
										<td><small><strong>Totali</strong></small></td>
										<td><small><i>{candidatureFinanziatePositive.length}</i></small></td>
										<td><small><i>{candidatureFinanziateNonPositive.length}</i></small></td>
										<td
											><small
												><i
													>{candidatureFinanziatePositive.length +
														candidatureFinanziateNonPositive.length}</i
												></small
											></td
										>
										<td
											><small
												><i
													>{Object.values(targets[targets.length - 1].targetPerTipologia).reduce(
														(acc, o) => acc + parseInt(o),
														0
													)}</i
												></small
											></td
										>
										<td
											><small
												><i
													>{Object.values(targets[targets.length - 1].targetPerTipologia).reduce(
														(acc, o) => acc + parseInt(o),
														0
													) - candidatureFinanziatePositive.length}</i
												></small
											></td
										>
										<td><small><i>n.a.</i></small></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<h6>Calendario slot per tipologia ente</h6>
				{#each tipologieEnti as te}
					<strong>{te}</strong>

					<div class="row">
						<div class="col-12 col-lg-7">
							<div class="table-responsive">
								<table class="table table-hover table-sm caption-top align-middle">
									<thead>
										<tr>
											<th><small>Slot</small></th>
											<th><small>Completamento attuale</small></th>
											<th><small>Capienza slot</small></th>
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
													{#if getFirstDayOfQuarter('Q3-2024') <= getFirstDayOfQuarter(q) && getFirstDayOfQuarter(q) < getFirstDayOfQuarter(targets[targets.length - 1].quarter)}
														<div class="input-group input-number my-0">
															<small>
																<input
																	type="number"
																	bind:value={slots[te.concat(q)]}
																	class="form-control text-primary"
																	data-bs-input
																	id="inputNumberBuffer-{te}"
																	name="inputNumberBuffer-{te}"
																	step="1"
																/>
															</small>
														</div>
													{:else}
														<small>n.a.</small>
													{/if}
												</td>
												<td class="text-center">
													<small>
														{#if getFirstDayOfQuarter('Q3-2024') <= getFirstDayOfQuarter(q) && getFirstDayOfQuarter(q) < getFirstDayOfQuarter(targets[targets.length - 1].quarter)}
															{#if slots[te.concat(q)] === 0 || candidatureFinanziateNonPositive.filter((c) => c.tipologia_ente === te && c.quartercompletamento === q).length > slots[te.concat(q)]}
																<svg class="icon icon-sm icon-danger"
																	><use href="/svg/sprites.svg#it-ban"></use></svg
																>
															{:else}
																<svg class="icon icon-sm icon-success"
																	><use href="/svg/sprites.svg#it-check-circle"></use></svg
																>
															{/if}
														{:else}
															<svg class="icon icon-sm icon-danger"
																><use href="/svg/sprites.svg#it-ban"></use></svg
															>
														{/if}
													</small>
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						</div>
						<div class="col-12 col-lg-5">
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
								colors={['#0066cc', '#ed7d31']}
							/>
							<p>
								Capienza totale degli slots: <strong
									>{formatNumber(
										Object.entries(slots)
											.filter((e) => e[0].startsWith(te))
											.reduce((a, b) => (a = a + b[1]), 0)
									)}</strong
								>
							</p>
							<p>
								Capienza totale minima da rispettare per il target:
								<strong>
									{formatNumber(
										targets[targets.length - 1].targetPerTipologia[te] -
											candidatureFinanziatePositive.filter((c) => c.tipologia_ente === te).length
									)}
								</strong>
							</p>
						</div>
					</div>
				{/each}
			</div>
			<div>
				<Areachart
					id="previsionepositivisimulazione"
					title="Previsione esiti positivi asseverazione tecnica"
					colors={['#009963']}
					values={calcolaIncrementaleSimulazione(candidatureFinanziate)}
				/>
			</div>
			<div class="it-page-section my-4" id="attuale">
				<h5>Situazione attuale</h5>
				<p>
					Il seguente grafico mostra la situazione <strong>attuale</strong> delle asseverazioni tecniche
					positive
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
		</div>
	</div>
</div>

<style>
	input,
	th {
		font-size: 0.8rem;
	}
</style>
