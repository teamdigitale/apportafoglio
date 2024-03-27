<script>
	// @ts-nocheck

	import * as d3 from 'd3';
	import { clusterOrder, tipologieOrder, listino, target } from './clusterorder.js';
	import { euro, formatNumber, percentuale } from '$lib/js/shared.js';
	import Minigauge from './minigauge.svelte';
	import { fade } from 'svelte/transition';
	import Scorecard from '$lib/c/scorecard.svelte';
	export let data;

	

	listino.forEach((l) => {
		//if (l.beneficiari === 'Comuni' || l.beneficiari === 'Scuole') {
			l.importo_massimo = l.canone + d3.max(l.servizi, (dd) => dd.valore * dd.unita_massime);
			l.importo_minimo = l.canone + d3.min(l.servizi, (dd) => dd.valore * dd.unita_minime);
		/*
		} else {
			l.importo_massimo = l.canone + d3.sum(l.servizi, (dd) => dd.valore * dd.unita_massime);
			l.importo_minimo = l.canone + d3.sum(l.servizi, (dd) => dd.valore * dd.unita_minime);
		}
		*/
	});

	const modalitaOptions = ['Minimo', 'Media', 'Moda', 'Massimo'];

	$: riepilogo = d3.rollup(
		data.candidature,
		function (v) {
			return {
				numero_candidature: v.length,
				importo_totale: d3.sum(v, (dd) => dd.importo),
				importo_medio: d3.mean(v, (dd) => dd.importo),
				importo_moda: d3.mode(v, (dd) => dd.importo),
				importo_minimo: d3.min(v, (dd) => dd.importo),
				importo_massimo: d3.max(v, (dd) => dd.importo)
			};
		},
		(d) => d.tipologia_ente,
		(d) => d.cluster
	);

	$: platea = d3.rollup(
		data.enti,
		(D) => D.length,
		(d) => d.tipologia_ente,
		(d) => d.cluster
	);

	$: console.log(platea);

	$: tipologie = d3.sort([...riepilogo.keys()], (a, b) =>
		d3.ascending(
			tipologieOrder.find((t) => t.tipologia === a).ordine,
			tipologieOrder.find((t) => t.tipologia === b).ordine
		)
	);


	const dataForGaugeTarget = (l, t, r, p) => {
		let v = Math.round(
			([...r.get(t).values()].reduce((a, b) => (a = a + b.numero_candidature), 0) /
				[...p.get(t).values()].reduce((a, b) => (a = a + b), 0)) *
				100
		);
		return [
			['Labels', 'Value'],
			[l, v]
		];
	};

	const dataForGaugeTargetTotale = (l, s, c) => {
		let v = Math.round((s / c) * 100);
		return [
			['Labels', 'Value'],
			[l, v]
		];
	};

	const setDatiPerStima = () => {
		const riep = d3.rollup(
			data.candidature,
			function (v) {
				return {
					numero_candidature: v.length
				};
			},
			(d) => d.tipologia_ente,
			(d) => d.cluster
		);

		const pl = d3.rollup(
			data.enti,
			(D) => D.length,
			(d) => d.tipologia_ente,
			(d) => d.cluster
		);
		let g = {};
		[...riep.keys()].forEach((t) => {
			g[t] = {};
			[...riep.get(t).keys()].forEach((c) => {
				if (pl.get(t)) {
					g[t][c] = {
						candidature_potenziali: pl.get(t).get(c) - riep.get(t).get(c).numero_candidature,
						candidature_stimate: Math.round(
							0.8 * (pl.get(t).get(c) - riep.get(t).get(c).numero_candidature)
						),
						modalita: 'Moda',
						budget: 0
					};
				}
			});
		});
		return g;
	};

	let datiPerStima = setDatiPerStima();

	let calcolabudget = (t, c) => {
		return (
			c[1].candidature_stimate *
			(c[1].modalita === 'Minimo'
				? riepilogo.get(t).get(c[0]).importo_minimo
				: c[1].modalita === 'Medio'
					? riepilogo.get(t).get(c[0]).importo_medio
					: c[1].modalita === 'Moda'
						? riepilogo.get(t).get(c[0]).importo_moda
						: listino.find((l) => l.beneficiari === t && l.cluster === c[0]).importo_massimo)
		);
	};

	let calcolabudgetTotale = (t, cc) => {
		let tot = 0;
		cc.forEach((c) => {
			tot =
				tot +
				c[1].candidature_stimate *
					(c[1].modalita === 'Minimo'
						? riepilogo.get(t).get(c[0]).importo_minimo
						: c[1].modalita === 'Media'
							? riepilogo.get(t).get(c[0]).importo_medio
							: c[1].modalita === 'Moda'
								? riepilogo.get(t).get(c[0]).importo_moda
								: listino.find((l) => l.beneficiari === t && l.cluster === c[0]).importo_massimo);
		});
		return tot;
	};

	let calcolabudgetTotaleStimato = (dps) => {
		let tot = 0;
		Object.entries(dps).forEach((cc) => {
			Object.entries(cc[1]).forEach((c) => {
				if (platea.get(cc[0])) {
					tot =
						tot +
						c[1].candidature_stimate *
							(c[1].modalita === 'Minimo'
								? riepilogo.get(cc[0]).get(c[0]).importo_minimo
								: c[1].modalita === 'Media'
									? riepilogo.get(cc[0]).get(c[0]).importo_medio
									: c[1].modalita === 'Moda'
										? riepilogo.get(cc[0]).get(c[0]).importo_moda
										: listino.find((l) => l.beneficiari === cc[0] && l.cluster === c[0])
												.importo_massimo);
				}
			});
		});
		return tot;
	};

	let impostaModalita = (t, m, dps) => {
		Object.entries(dps[t]).forEach((c) => {
			c[1].modalita = m;
		});
		datiPerStima = dps;
	};

	let calcolaCandidatureAttive = () => {
		return data.candidature.length;
	};

	let candidatureAttive = calcolaCandidatureAttive();

	$: calcolaCandidatureStimate = () => {
		let res = 0;
		Object.values(datiPerStima).forEach((c) => {
			Object.values(c).forEach((x) => {
				res = res + x.candidature_stimate;
			});
		});
		return res;
	};

	$: candidatureStimate = calcolaCandidatureStimate();

	let percentualeDiAdesione = 80;

	$: calcolaWorstCase = (t, v, p) => {
		let res = {};
		let budgetResiduo = (v * p) / 100;

		d3.sort(Object.entries(datiPerStima[t]), (a, b) =>
			d3.ascending(
				clusterOrder.find((t) => t.cluster === a[0]).ordine,
				clusterOrder.find((t) => t.cluster === b[0]).ordine
			)
		)
			.reverse()
			.forEach((c) => {
				let importoMassimo = listino.filter((l) => l.cluster === c[0] && l.beneficiari === t)[0]
					.importo_massimo;

				let numCandPossibili = Math.floor(budgetResiduo / importoMassimo);

				let numCandidatureDaScalare = numCandPossibili;
				if (c[1].candidature_potenziali < numCandPossibili) {
					numCandidatureDaScalare = c[1].candidature_potenziali;
				}
				res[c[0]] = {
					numCandidature: numCandidatureDaScalare,
					importo: numCandidatureDaScalare * importoMassimo
				};
				budgetResiduo = budgetResiduo - numCandidatureDaScalare * importoMassimo;
			});
		return res;
	};

	$: worstCaseNumTotale = (p) => {
		let res = 0;
		tipologie.forEach((t) => {
			res =
				res +
				Object.entries(
					calcolaWorstCase(t, calcolabudgetTotale(t, Object.entries(datiPerStima[t])), p)
				).reduce((a, b) => (a = a + b[1].numCandidature), 0);
		});

		return res;
	};

	$: worstCaseImportoTotale = (p) => {
		let res = 0;
		tipologie.forEach((t) => {
			res =
				res +
				Object.entries(
					calcolaWorstCase(t, calcolabudgetTotale(t, Object.entries(datiPerStima[t])), p)
				).reduce((a, b) => (a = a + b[1].importo), 0);
		});

		return res;
	};
</script>

<div class="it-page-section my-5" id="riepilogo">
	<h4>Riepilogo</h4>
	<p>
		I seguenti prospetti riportano lo <strong>stato attuale delle candidature attive</strong>,
		suddivise per tipologia ente e cluster. Per "candidature attive" si intendo le candidature negli
		stati
		<i>"AMMESSA", "AMMESSA CON RISERVA", "ACCETTATA", "IN VERFICA" e "FINANZIATA"</i>.
	</p>
	<div class="row">
		<div class="col-12 col-lg-4">
			<Scorecard
				textcolor="white"
				text="Totale importo candidature attive"
				title={euro(data.candidature.reduce((a, c) => (a = a + c.importo), 0))}
				bgcolor="primary"
			/>
		</div>
		<div class="col-12 col-lg-4">
			<Scorecard
				textcolor="white"
				text="Budget misura"
				title={euro(data.budgetMisura)}
				bgcolor="success"
			/>
		</div>
		<div class="col-12 col-lg-4">
			<Scorecard
				textcolor="white"
				text="Residuo"
				title={euro(data.budgetMisura - data.candidature.reduce((a, c) => (a = a + c.importo), 0))}
				bgcolor="secondary"
			/>
		</div>
	</div>

	<div class="row">
		<div class="col-12 col-lg-12">
			<div class="table-responsive">
				<table class="table table-hover table-sm caption-top align-middle">
					<thead>
						<tr>
							<th class="text-center"><small>Tipologia ente</small></th>
							<th><small>Cluster</small></th>
							<th class="text-center"><small>Numero enti</small></th>
							<th class="text-end"><small>Numero candidature attive</small></th>
							<th class="text-end"><small>Importo totale</small></th>
						</tr>
					</thead>
					<tbody>
						{#each tipologie as t}
							{#if platea.get(t)}
								{#each d3.sort( [...riepilogo
											.get(t)
											.keys()], (a, b) => d3.ascending(clusterOrder.find((t) => t.cluster === a).ordine, clusterOrder.find((t) => t.cluster === b).ordine) ) as c, i}
									<tr>
										{#if i === 0}
											<td class="text-center" rowspan={[...riepilogo.get(t).keys()].length}>
												<strong>{t}</strong>
												<Minigauge
													id="gauge-{t}"
													values={dataForGaugeTarget('', t, riepilogo, platea)}
													w={120}
													h={120}
												/>
												<p>
													<small>
														Attive

														<strong>
															{formatNumber(
																[...riepilogo.get(t).values()].reduce(
																	(a, b) => (a = a + b.numero_candidature),
																	0
																)
															)}
														</strong>
														candidature <br />
														per
														<strong>
															{euro(
																[...riepilogo.get(t).values()].reduce(
																	(a, b) => (a = a + b.importo_totale),
																	0
																)
															)}
														</strong>
													</small>
												</p>
											</td>
										{/if}
										<td>
											<small><strong>{c}</strong></small>
										</td>
										<td class="text-center"
											><small>
												{formatNumber(platea.get(t).get(c))}
											</small>
										</td>
										<td class="text-end"
											><small>
												{formatNumber(riepilogo.get(t).get(c).numero_candidature)}
												&nbsp;
												<i
													><strong
														>({percentuale(
															riepilogo.get(t).get(c).numero_candidature / platea.get(t).get(c)
														)})</strong
													></i
												>
											</small>
										</td>
										<td class="text-end">
											<small>
												{euro(riepilogo.get(t).get(c).importo_totale)}
											</small>
										</td>
									</tr>
								{/each}
							{/if}
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<div class="it-page-section my-5" id="potenziali">
	<h4>Quadro economico</h4>
	<p>
		Gli importi minimi e massimi sono calcolati sulla base dell'<a
			href="#"
			data-bs-toggle="modal"
			data-bs-target="#modaleListino">attuale listino</a
		>.
	</p>
	<div class="row">
		<div class="col-12 col-lg-12">
			<div class="table-responsive">
				<table class="table table-hover table-sm caption-top align-middle">
					<thead>
						<tr>
							<th><small>Tipologia ente</small></th>
							<th><small>Cluster</small></th>
							<th class="text-end"><small>Minimo</small></th>
							<th class="text-end"><small>Massimo</small></th>
							<th class="text-end"><small>Media</small></th>
							<th class="text-end"><small>Moda</small></th>
						</tr>
					</thead>
					<tbody>
						{#each tipologie as t}
							{#if t.cluster}
								{#each d3.sort( [...riepilogo
											.get(t)
											.keys()], (a, b) => d3.ascending(clusterOrder.find((t) => t.cluster === a).ordine, clusterOrder.find((t) => t.cluster === b).ordine) ) as c, i}
									{#if platea.get(t)}
										<tr>
											{#if i === 0}
												<td class="text-center" rowspan={[...riepilogo.get(t).keys()].length}>
													<strong>{t}</strong>
												</td>
											{/if}
											<td>
												<small><strong>{c}</strong></small>
											</td>
											<td class="text-end">
												<small>{euro(riepilogo.get(t).get(c).importo_minimo)}</small>
											</td>
											<td class="text-end">
												<small>{euro(riepilogo.get(t).get(c).importo_massimo)}</small>
											</td>
											<td class="text-end">
												<small>{euro(riepilogo.get(t).get(c).importo_medio)}</small>
											</td>
											<td class="text-end">
												<small>{euro(riepilogo.get(t).get(c).importo_moda)}</small>
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
	</div>
</div>

<div class="it-page-section my-5" id="potenziali">
	<div class="row">
		<div class="col-12 col-lg-9">
			<h4>Stima budget</h4>
			{#each tipologie as t}
				{#if platea.get(t)}
					<h6>{t}</h6>
					<p>
						Imposta importi di tutti i cluster a &nbsp;&nbsp;&nbsp;
						<button
							type="button"
							class="btn btn-outline-secondary btn-xs"
							on:click={() => impostaModalita(t, 'Minimo', datiPerStima)}>Minimo</button
						>
						<button
							type="button"
							class="btn btn-outline-secondary btn-xs"
							on:click={() => impostaModalita(t, 'Media', datiPerStima)}>Media</button
						>
						<button
							type="button"
							class="btn btn-outline-secondary btn-xs"
							on:click={() => impostaModalita(t, 'Moda', datiPerStima)}>Moda</button
						>
						<button
							type="button"
							class="btn btn-outline-secondary btn-xs"
							on:click={() => impostaModalita(t, 'Massimo', datiPerStima)}>Massimo</button
						>
					</p>
					<div class="row">
						<div class="col-12 col-lg-12">
							<div class="table-responsive">
								<table class="table table-hover table-sm caption-top align-middle">
									<thead>
										<tr>
											<th><small>Cluster</small></th>
											<th class="text-center"><small>Candidature potenziali</small></th>
											<th class="text-center"><small>Candidature stimate</small></th>
											<th class="text-center"><small>Importo</small></th>
											<th class="text-end"><small>Budget necessario</small></th>
										</tr>
									</thead>
									<tbody>
										{#each Object.entries(datiPerStima[t]) as c}
											{#if platea.get(t)}
												<tr>
													<td><small>{c[0]}</small></td>
													<td class="text-center"><small>{c[1].candidature_potenziali}</small></td>
													<td class="text-center px-4"
														><small>
															<div class="float-start w-40 align-middle">
																<input
																	class="align-middle"
																	type="range"
																	min="0"
																	max={c[1].candidature_potenziali}
																	bind:value={c[1].candidature_stimate}
																/>
															</div>
															<div class="float-end">
																<small>
																	<div class="input-group input-number input-number-adaptive">
																		<input
																			type="number"
																			min="0"
																			max={c[1].candidature_potenziali}
																			bind:value={c[1].candidature_stimate}
																			class=" text-primary"
																			data-bs-input
																			step="1"
																		/>
																	</div>
																</small>
															</div>
														</small></td
													>
													<td class="text-center"
														><small>
															<div class="select-wrapper">
																<select bind:value={c[1].modalita}>
																	{#each modalitaOptions as a}
																		<option value={a}>{a}</option>
																	{/each}
																</select>
															</div>
														</small>
													</td>
													<td class="text-end"><small>{euro(calcolabudget(t, c))}</small></td>
												</tr>
											{/if}
										{/each}
										<tr>
											<td class="text-end">Totale</td>
											<td class="text-center"><small>{formatNumber(candidatureAttive)}</small></td>
											<td class="text-center"><small>{formatNumber(candidatureStimate)}</small></td>
											<td></td>
											<td class="text-end"
												><strong
													>{euro(calcolabudgetTotale(t, Object.entries(datiPerStima[t])))}</strong
												></td
											>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>
		<div class="col-12 col-lg-3">
			<div data-bs-toggle="sticky" data-bs-stackable="true" class="bg-white border-start px-2">
				<h4>Impatti sul target</h4>

				<p
					class={candidatureAttive + candidatureStimate > target[1].valore
						? 'text-success'
						: 'text-danger'}
				>
					<small> Candidature totali (attive e stimate):</small><br />
					<strong>{formatNumber(candidatureStimate + candidatureAttive)}</strong>
				</p>
				<p>
					<small> Target:</small><br />
					<strong>{formatNumber(target[1].valore)}</strong>
				</p>
				<Minigauge
					id="gauge--x"
					values={dataForGaugeTargetTotale(
						'',
						candidatureStimate + candidatureAttive,
						data.enti.length
					)}
					w={120}
					h={120}
				/>
				<p>
					<small> Importo stimato:</small><br />
					<strong>{euro(calcolabudgetTotaleStimato(datiPerStima))}</strong>
				</p>
				<p>
					<small> Residuo disponbile:</small><br />
					<strong
						>{euro(
							data.budgetMisura - data.candidature.reduce((a, c) => (a = a + c.importo), 0)
						)}</strong
					>
				</p>
			</div>
		</div>
	</div>
</div>

<div class="it-page-section my-5" id="potenziali">
	<div class="row">
		<div class="col-12 col-lg-9">
			<h4>Worst case</h4>
			<div>
				<div class="form-group my-4">
					<label for="percentualeDiAdesione" class="input-number-label active"
						>Percentuale di adesione</label
					>
					<div class="input-group input-number input-number-percentage">
						<span class="input-group-text fw-semibold">%</span>
						<input
							type="number"
							class="form-control text-primary w-30"
							data-bs-input
							id="percentualeDiAdesione"
							name="percentualeDiAdesione"
							bind:value={percentualeDiAdesione}
							min="0"
							max="100"
							step="1"
						/>
						<span class="input-group-text align-buttons flex-column">
							<button class="input-number-add">
								<span class="visually-hidden">Aumenta del 1%</span>
							</button>
							<button class="input-number-sub">
								<span class="visually-hidden">Diminuisci del 1%</span>
							</button>
						</span>
					</div>
				</div>
			</div>
			{#each tipologie as t}
				{#if platea.get(t)}
					<h6>{t} - Budget: {euro(calcolabudgetTotale(t, Object.entries(datiPerStima[t])))}</h6>
					<div class="row">
						<div class="col-12 col-lg-12">
							<div class="table-responsive">
								<table class="table table-hover table-sm caption-top align-middle">
									<thead>
										<tr>
											<th><small>Cluster</small></th>
											<th class="text-center"><small>Numero candidature</small></th>
											<th class="text-end"><small>Importo</small></th>
										</tr>
									</thead>
									<tbody>
										{#each Object.entries(calcolaWorstCase(t, calcolabudgetTotale(t, Object.entries(datiPerStima[t])), percentualeDiAdesione)) as record}
											{#if platea.get(t)}
												<tr>
													<td><small>{record[0]}</small></td>
													<td class="text-center"><small>{record[1].numCandidature}</small></td>
													<td class="text-end"><small>{euro(record[1].importo)}</small></td>
												</tr>
											{/if}
										{/each}
										<tr>
											<td class="text-end">Totale</td>
											<td class="text-center"
												><strong
													>{formatNumber(
														Object.entries(
															calcolaWorstCase(
																t,
																calcolabudgetTotale(t, Object.entries(datiPerStima[t])),
																percentualeDiAdesione
															)
														).reduce((a, b) => (a = a + b[1].numCandidature), 0)
													)}</strong
												></td
											>
											<td class="text-end"
												><strong
													>{euro(
														Object.entries(
															calcolaWorstCase(
																t,
																calcolabudgetTotale(t, Object.entries(datiPerStima[t])),
																percentualeDiAdesione
															)
														).reduce((a, b) => (a = a + b[1].importo), 0)
													)}</strong
												></td
											>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>
		<div class="col-12 col-lg-3">
			<div data-bs-toggle="sticky" data-bs-stackable="true" class="bg-white border-start px-2">
				<h4>Impatti sul target - worst case</h4>

				<p
					class={candidatureAttive + worstCaseNumTotale(percentualeDiAdesione) > target[1].valore
						? 'text-success'
						: 'text-danger'}
				>
					<small> Candidature totali (attive e stimate):</small><br />
					<strong
						>{formatNumber(worstCaseNumTotale(percentualeDiAdesione) + candidatureAttive)}</strong
					>
				</p>
				<p>
					<small> Target:</small><br />
					<strong>{formatNumber(target[1].valore)}</strong>
				</p>
				<Minigauge
					id="gauge--xx"
					values={dataForGaugeTargetTotale(
						'',
						worstCaseNumTotale(percentualeDiAdesione) + candidatureAttive,
						data.enti.length
					)}
					w={120}
					h={120}
				/>
				<p>
					<small> Importo stimato:</small><br />
					<strong>{euro(worstCaseImportoTotale(percentualeDiAdesione))}</strong>
				</p>
				<p>
					<small> Residuo disponbile:</small><br />
					<strong
						>{euro(
							data.budgetMisura - data.candidature.reduce((a, c) => (a = a + c.importo), 0)
						)}</strong
					>
				</p>
			</div>
		</div>
	</div>
</div>

<div
	class="modal it-dialog-scrollable fade modal-lg"
	tabindex="-1"
	role="dialog"
	id="modaleListino"
	aria-labelledby="modaleListinoTitle"
>
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h2 class="modal-title h5" id="modaleListinoTitle">Listino</h2>
			</div>
			<div class="modal-body">
				<div class="container my-4" transition:fade>
					<div class="row">
						<div class="col-12 col-lg-12">
							<div class="table-responsive">
								<table class="table table-hover table-sm caption-top align-middle">
									<thead>
										<tr>
											<th><small>Beneficiari</small></th>
											<th><small>Cluster</small></th>
											<th class="text-center" colspan="4"><small>Servizi</small></th>
											<th class="text-end"><small>Canone</small></th>
										</tr>
										<tr>
											<th></th>
											<th></th>
											<th><small>Tipologia</small></th>
											<th class="text-end"><small>Valore</small></th>
											<th class="text-center"><small>Unità minime</small></th>
											<th class="text-center"><small>Unità massime</small></th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{#each listino as l}
											{#each l.servizi as s, i}
												<tr>
													{#if i === 0}
														<td rowspan={l.servizi.length}>
															<small>
																{l.beneficiari}
															</small>
														</td>
														<td rowspan={l.servizi.length}>
															<small>
																{l.cluster}
															</small>
														</td>
													{/if}

													<td><small>{s.unita}</small> </td>
													<td class="text-end"><small>{euro(s.valore)}</small> </td>
													<td class="text-center"><small>{s.unita_minime}</small> </td>
													<td class="text-center"><small>{s.unita_massime}</small> </td>
													{#if i === 0}
														<td rowspan={l.servizi.length} class="text-end">
															<small>
																{euro(l.canone)}
															</small>
														</td>
													{/if}
												</tr>
											{/each}
										{/each}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-outline-primary btn-sm" type="button" data-bs-dismiss="modal"
					>Chiudi</button
				>
			</div>
		</div>
	</div>
</div>
