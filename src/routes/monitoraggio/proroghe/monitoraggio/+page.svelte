<script>
	// @ts-nocheck
	import * as d3 from 'd3';
	import Cite from '$lib/c/cite.svelte';
	import Scorecard from './scorecard.svelte';
	import { getQuarter, formatNumber } from '$lib/js/shared.js';
	import Barchart from './barchart.svelte';
	export let data;

	console.log(data);
	let misureOptions = [
		'Misura_11',
		'Misura_11_12',
		'Misura_12',
		'Misura_131',
		'Misura_141',
		'Misura_143#PagoPA',
		'Misura_143#AppIO',
		'Misura_144',
		'Misura_145'
	];

	let misureLabels = [
		'1.1 Infrastrutture digitali',
		'1.1 e 1.2 Multimisura',
		'1.2 Abilitazione e facilitazione migrazione al Cloud',
		'1.3.1 Piattaforma Digitale Nazionale Dati',
		'1.4.1 Esperienza del cittadino nei servizi pubblici',
		'1.4.3 Adozione PagoPA e AppIO - PagoPA',
		'1.4.3 Adozione PagoPA e AppIO - AppIO',
		'1.4.4 Adozione identità digitale',
		'1.4.5 Digitalizzazione degli avvisi pubblici'
	];

	let filterMisure = misureOptions[0];

	$: tipologie = Object.values(
		data.slots
			.filter((x) =>
				filterMisure.indexOf('#') === -1
					? x.Misura__c === filterMisure
					: x.Misura__c === filterMisure.split('#')[0] &&
						x.Pacchetto__c === filterMisure.split('#')[1]
			)
			.reduce((a, { Tipologia_Ente_proroghe__c }) => {
				a[Tipologia_Ente_proroghe__c] = a[Tipologia_Ente_proroghe__c] || {
					Tipologia_Ente_proroghe__c,
					count: 0
				};
				a[Tipologia_Ente_proroghe__c].count++;
				return a;
			}, Object.create(null))
	)
		.map((x) => x.Tipologia_Ente_proroghe__c)
		.sort();

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

	const calcolaCapienze = (m, p, t) => {
		let d = data.slots
			.filter((x) =>
				filterMisure.indexOf('#') === -1
					? x.Misura__c === filterMisure
					: x.Misura__c === filterMisure.split('#')[0] &&
						x.Pacchetto__c === filterMisure.split('#')[1]
			)
			.filter((s) => (p ? s.Pacchetto__c === p : true))
			.filter((s) => s.Tipologia_Ente_proroghe__c === t);
		const result = [];
		const quarters = calcolaQuarters(new Date(2024, 3, 1), new Date(2026, 5, 1));
		const header = ['Quarter', 'Completamenti', 'Prenotazioni', 'Capienza'];
		result.push(header);

		quarters.forEach((q) => {
			const row = [q];
			//completamenti
			if (d.find((x) => x.QuarterFormat__c === q)) {
				row.push(d.find((x) => x.QuarterFormat__c === q).Completamento_slot__c);
			} else {
				row.push(0);
			}
			//prenotazioni
			if (d.find((x) => x.QuarterFormat__c === q)) {
				row.push(d.find((x) => x.QuarterFormat__c === q).Prenotazioni_slot__c);
			} else {
				row.push(0);
			}
			//capienza
			if (d.find((x) => x.QuarterFormat__c === q)) {
				row.push(d.find((x) => x.QuarterFormat__c === q).Capienza__c);
			} else {
				row.push(0);
			}

			result.push(row);
		});

		return result;
	};

	const calcolaGiorniMedi = (t, s) => {
		const tt = data.tasks
			.filter((x) =>
				filterMisure.indexOf('#') === -1
					? x.misura === filterMisure
					: x.misura === filterMisure.split('#')[0] && x.pacchetto === filterMisure.split('#')[1]
			)
			.filter((x) => (s === 'Tutti' ? true : x.Status === s))
			.filter((x) => x.tipologia_ente === t);
		return tt.length > 0 ? Math.round(d3.mean(tt, (dd) => dd.Giorni_richiesti__c)) : 'n.a.';
	};

	const calcolaGiorniMinimi = (t, s) => {
		const tt = data.tasks
			.filter((x) =>
				filterMisure.indexOf('#') === -1
					? x.misura === filterMisure
					: x.misura === filterMisure.split('#')[0] && x.pacchetto === filterMisure.split('#')[1]
			)
			.filter((x) => (s === 'Tutti' ? true : x.Status === s))
			.filter((x) => x.tipologia_ente === t);
		return tt.length > 0 ? Math.round(d3.min(tt, (dd) => dd.Giorni_richiesti__c)) : 'n.a.';
	};

	const calcolaGiorniMassimi = (t, s) => {
		const tt = data.tasks
			.filter((x) =>
				filterMisure.indexOf('#') === -1
					? x.misura === filterMisure
					: x.misura === filterMisure.split('#')[0] && x.pacchetto === filterMisure.split('#')[1]
			)
			.filter((x) => (s === 'Tutti' ? true : x.Status === s))
			.filter((x) => x.tipologia_ente === t);
		return tt.length > 0 ? Math.round(d3.max(tt, (dd) => dd.Giorni_richiesti__c)) : 'n.a.';
	};
</script>

<h1>Monitoraggio campagna riprogrammazione</h1>
<Cite
	text="Un sogno è solo un sogno. Un obiettivo è un sogno con un progetto e una scadenza."
	author="Harvey B. Mackay"
/>

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
						<span class="it-list"></span>1. Misure
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
										<a class="nav-link active" href="#riepilogo">
											<span>1. Riepilogo </span>
										</a>
										<ul class="link-list">
											<li class="nav-item"></li>
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
			<div class="it-page-section my-5" id="misure">
				<div class="row my-4">
					<div class="col-12 col-lg-12 my-4">
						<div class="row">
							<div class="col-12 col-lg-4">
								<div class="select-wrapper">
									<label for="filterMisura">Misura</label>
									<select id="filterMisura" name="filterMisura" bind:value={filterMisure}>
										{#each misureOptions as m,i}
											<option value={m}>{misureLabels[i]}</option>
										{/each}
									</select>
								</div>
							</div>
						</div>
						{#each tipologie as t}
							<div class="row my-2">
								<div class="col-12 col-lg-12">
									<div class="bd-callout bd-callout-danger w-100 my-4 mx-2">
										<div class="callout-inner">
											<div class="callout-title">
												<h4>{t}</h4>
											</div>
											<div class="row my-2">
												<div class="col-12 col-lg-3">
													<Scorecard
														textcolor="white"
														text="Richieste in valutazione"
														title={formatNumber(
															data.tasks
																.filter((x) => x.Status === 'In valutazione')
																.filter((x) => x.misura === filterMisure)
																.filter((x) => x.tipologia_ente === t).length
														)}
														bgcolor="warning"
													/>
												</div>
												<div class="col-12 col-lg-3">
													<Scorecard
														textcolor="white"
														text="Richieste approvate"
														title={formatNumber(
															data.tasks
																.filter((x) => x.Status === 'Approvazione automatica Servizio 1')
																.filter((x) => x.misura === filterMisure)
																.filter((x) => x.tipologia_ente === t).length
														)}
														bgcolor="success"
													/>
												</div>
												<div class="col-12 col-lg-3">
													<Scorecard
														textcolor="white"
														text="Richieste rifiutate"
														title={formatNumber(
															data.tasks
																.filter((x) => x.Status === 'Rigettato')
																.filter((x) => x.misura === filterMisure)
																.filter((x) => x.tipologia_ente === t).length
														)}
														bgcolor="danger"
													/>
												</div>
												<div class="col-12 col-lg-3">
													<Scorecard
														textcolor="white"
														text="Richieste totali"
														title={formatNumber(
															data.tasks
																.filter((x) => x.misura === filterMisure)
																.filter((x) => x.tipologia_ente === t).length
														)}
														bgcolor="primary"
													/>
												</div>
											</div>
											<div class="row my-2">
												<div class="col-12 col-lg-12">
													<div class="accordion" id="collapseExample">
														<div class="accordion-item">
															<h2 class="accordion-header" id="heading1c">
																<button
																	class="accordion-button"
																	type="button"
																	data-bs-toggle="collapse"
																	data-bs-target="#collapse1c"
																	aria-expanded="true"
																	aria-controls="collapse1c"
																>
																	Dettagli
																</button>
															</h2>
															<div
																id="collapse1c"
																class="accordion-collapse collapse show"
																role="region"
																aria-labelledby="heading1c"
															>
																<div class="accordion-body">
																	<div class="row my-2">
																		<div class="col-12 col-lg-3">
																			<p>
																				<small
																					><strong>Giorni medi:</strong>
																					{calcolaGiorniMedi(t, 'In valutazione')}</small
																				><br />
																				<small
																					><strong>Giorni minimi:</strong>
																					{calcolaGiorniMinimi(t, 'In valutazione')}</small
																				>
																				<br />
																				<small
																					><strong>Giorni massimi:</strong>
																					{calcolaGiorniMassimi(t, 'In valutazione')}</small
																				>
																			</p>
																		</div>
																		<div class="col-12 col-lg-3">
																			<p>
																				<small
																					><strong>Giorni medi:</strong>
																					{calcolaGiorniMedi(
																						t,
																						'Approvazione automatica Servizio 1'
																					)}</small
																				><br />
																				<small
																					><strong>Giorni minimi:</strong>
																					{calcolaGiorniMinimi(
																						t,
																						'Approvazione automatica Servizio 1'
																					)}</small
																				>
																				<br />
																				<small
																					><strong>Giorni massimi:</strong>
																					{calcolaGiorniMassimi(
																						t,
																						'Approvazione automatica Servizio 1'
																					)}</small
																				>
																			</p>
																		</div>
																		<div class="col-12 col-lg-3">
																			<p>
																				<small
																					><strong>Giorni medi:</strong>
																					{calcolaGiorniMedi(t, 'Rigettato')}</small
																				><br />
																				<small
																					><strong>Giorni minimi:</strong>
																					{calcolaGiorniMinimi(t, 'Rigettato')}</small
																				>
																				<br />
																				<small
																					><strong>Giorni massimi:</strong>
																					{calcolaGiorniMassimi(t, 'Rigettato')}</small
																				>
																			</p>
																		</div>
																		<div class="col-12 col-lg-3">
																			<p>
																				<small
																					><strong>Giorni medi:</strong>
																					{calcolaGiorniMedi(t, 'Tutti')}</small
																				><br />
																				<small
																					><strong>Giorni minimi:</strong>
																					{calcolaGiorniMinimi(t, 'Tutti')}</small
																				>
																				<br />
																				<small
																					><strong>Giorni massimi:</strong>
																					{calcolaGiorniMassimi(t, 'Tutti')}</small
																				>
																			</p>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="row my-2">
												<div class="col-12 col-lg-6">
													<Barchart
														id="datecomplchart--{t}"
														values={calcolaCapienze(filterMisure, null, t)}
														legendPosition="top"
														stacked={'false'}
														h="400"
														colors={['#0066cc', '#2288ee', '#ed7d31']}
													/>
												</div>
												<div class="col-12 col-lg-6">
													<div class="table-responsive">
														<table class="table table-striped table-hover table-sm">
															<thead>
																<tr>
																	<th scope="col" class="text-center"><small>Quarter</small></th>
																	<th scope="col" class="text-end"><small>Completamenti</small></th>
																	<th scope="col" class="text-end"><small>Prenotazioni</small></th>
																	<th scope="col" class="text-end"><small>Capienza slot</small></th>
																	<th scope="col" class="text-end"
																		><small>Disponibilità slot</small></th
																	>
																</tr>
															</thead>
															<tbody>
																{#each calcolaCapienze(filterMisure, null, t) as d, i}
																	{#if i > 0}
																		<tr>
																			<td class="text-center">
																				<small><strong>{d[0]}</strong></small>
																			</td>
																			<td class="text-end">
																				<small>{formatNumber(d[1])}</small>
																			</td>
																			<td class="text-end {d[2] > 0 ? 'text-primary mark' : ''}">
																				<small>{formatNumber(d[2])}</small>
																			</td>
																			<td class="text-end">
																				<small>{formatNumber(d[3])}</small>
																			</td>
																			<td class="text-end">
																				<small
																					>{formatNumber(
																						d[3] - d[1] - d[2] < 0 ? 0 : d[3] - d[1] - d[2]
																					)}</small
																				>
																			</td>
																		</tr>
																	{/if}
																{/each}
															</tbody>
														</table>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
