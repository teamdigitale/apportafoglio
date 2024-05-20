<script>
	import { fade } from 'svelte/transition';

	// @ts-nocheck

	let showListino = false;

	const openListino = () => {
		showListino = true;
	};

	const closeListino = () => {
		showListino = false;
	};

	const target = [
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

	const listino = [
		{
			beneficiari: 'Comuni',
			cluster: '<=2.500 ab',
			canone: 6000,
			servizi: [
				{
					unita: 'Trasferimento servizio',
					valore: 1528.0,
					unita_minime: 7,
					unita_massime: 9
				},
				{
					unita: 'Aggiornamento servizio',
					valore: 4603.0,
					unita_minime: 7,
					unita_massime: 9
				}
			]
		},
		{
			beneficiari: 'Comuni',
			cluster: '2.500< ab <=5.000',
			canone: 12000,
			servizi: [
				{
					unita: 'Trasferimento servizio',
					valore: 2352.0,
					unita_minime: 10,
					unita_massime: 13
				},
				{
					unita: 'Aggiornamento servizio',
					valore: 5069.0,
					unita_minime: 10,
					unita_massime: 13
				}
			]
		},
		{
			beneficiari: 'Comuni',
			cluster: '5.000< ab <=20.000',
			canone: 25000,
			servizi: [
				{
					unita: 'Trasferimento servizio',
					valore: 4146.0,
					unita_minime: 11,
					unita_massime: 14
				},
				{
					unita: 'Aggiornamento servizio',
					valore: 6928.0,
					unita_minime: 11,
					unita_massime: 14
				}
			]
		},
		{
			beneficiari: 'Comuni',
			cluster: '20.000< ab <=50.000',
			canone: 50000,
			servizi: [
				{
					unita: 'Trasferimento servizio',
					valore: 9143.0,
					unita_minime: 11,
					unita_massime: 14
				},
				{
					unita: 'Aggiornamento servizio',
					valore: 14437.0,
					unita_minime: 11,
					unita_massime: 14
				}
			]
		},
		{
			beneficiari: 'Comuni',
			cluster: '50.000< ab <=100.000',
			canone: 120000,
			servizi: [
				{
					unita: 'Trasferimento servizio',
					valore: 14254.0,
					unita_minime: 14,
					unita_massime: 18
				},
				{
					unita: 'Aggiornamento servizio',
					valore: 16618.0,
					unita_minime: 14,
					unita_massime: 18
				}
			]
		},
		{
			beneficiari: 'Comuni',
			cluster: '100.000< ab <=250.000',
			canone: 450000,
			servizi: [
				{
					unita: 'Trasferimento servizio',
					valore: 15394.0,
					unita_minime: 17,
					unita_massime: 21
				},
				{
					unita: 'Aggiornamento servizio',
					valore: 27694.0,
					unita_minime: 17,
					unita_massime: 21
				}
			]
		},
		{
			beneficiari: 'Comuni',
			cluster: 'ab >250.000',
			canone: 3500000,
			servizi: [
				{
					unita: 'Trasferimento servizio',
					valore: 46634.0,
					unita_minime: 17,
					unita_massime: 21
				},
				{
					unita: 'Aggiornamento servizio',
					valore: 75816.0,
					unita_minime: 17,
					unita_massime: 21
				}
			]
		},
		{
			beneficiari: 'Scuole',
			cluster: 'Scuole primo e secondo grado',
			canone: 0,
			servizi: [
				{
					unita: 'Trasferimento servizio',
					valore: 553.0,
					unita_minime: 1,
					unita_massime: 23
				},
				{
					unita: 'Aggiornamento servizio',
					valore: 553.0,
					unita_minime: 1,
					unita_massime: 23
				}
			]
		},
		{
			beneficiari: 'Scuole',
			cluster: 'Altre scuole',
			canone: 0,
			servizi: [
				{
					unita: 'Trasferimento servizio',
					valore: 553.0,
					unita_minime: 1,
					unita_massime: 23
				},
				{
					unita: 'Aggiornamento servizio',
					valore: 553.0,
					unita_minime: 1,
					unita_massime: 23
				}
			]
		},
		{
			beneficiari: 'ASL',
			cluster: '<=500 posti letto',
			canone: 0,
			servizi: [
				{
					unita: 'Servizio ordinario',
					valore: 19628.0,
					unita_minime: 3,
					unita_massime: 15
				},
				{
					unita: 'Servizio critico',
					valore: 25517.0,
					unita_minime: 3,
					unita_massime: 26
				}
			]
		},
		{
			beneficiari: 'ASL',
			cluster: '500< posti letto <=1000',
			canone: 0,
			servizi: [
				{
					unita: 'Servizio ordinario',
					valore: 58885.0,
					unita_minime: 3,
					unita_massime: 15
				},
				{
					unita: 'Servizio critico',
					valore: 76550.0,
					unita_minime: 3,
					unita_massime: 26
				}
			]
		},
		{
			beneficiari: 'ASL',
			cluster: '>1000 posti letto',
			canone: 0,
			servizi: [
				{
					unita: 'Servizio ordinario',
					valore: 94215.0,
					unita_minime: 3,
					unita_massime: 15
				},
				{
					unita: 'Servizio critico',
					valore: 122480.0,
					unita_minime: 3,
					unita_massime: 26
				}
			]
		},
		{
			beneficiari: 'ASL',
			cluster: '<=0.5mln as',
			canone: 0,
			servizi: [
				{
					unita: 'Servizio ordinario',
					valore: 34050.0,
					unita_minime: 3,
					unita_massime: 15
				},
				{
					unita: 'Servizio critico',
					valore: 44265.0,
					unita_minime: 3,
					unita_massime: 26
				}
			]
		},
		{
			beneficiari: 'ASL',
			cluster: '0.5mln< as <=1mln',
			canone: 0,
			servizi: [
				{
					unita: 'Servizio ordinario',
					valore: 102150.0,
					unita_minime: 3,
					unita_massime: 15
				},
				{
					unita: 'Servizio critico',
					valore: 132795.0,
					unita_minime: 3,
					unita_massime: 26
				}
			]
		},
		{
			beneficiari: 'ASL',
			cluster: '>1mln as',
			canone: 0,
			servizi: [
				{
					unita: 'Servizio ordinario',
					valore: 163440.0,
					unita_minime: 3,
					unita_massime: 15
				},
				{
					unita: 'Servizio critico',
					valore: 212472.0,
					unita_minime: 3,
					unita_massime: 26
				}
			]
		}
	];

	listino.forEach((l) => {
		if (l.beneficiari === 'Comuni' || l.beneficiari === 'Scuole') {
			l.importo_massimo = l.canone + d3.max(l.servizi, (dd) => dd.valore * dd.unita_massime);
			l.importo_minimo = l.canone + d3.min(l.servizi, (dd) => dd.valore * dd.unita_minime);
		} else {
			l.importo_massimo = l.canone + d3.sum(l.servizi, (dd) => dd.valore * dd.unita_massime);
			l.importo_minimo = l.canone + d3.sum(l.servizi, (dd) => dd.valore * dd.unita_minime);
		}
	});

	const clusterOrder = [
		{
			ordine: 100,
			Cluster: '<=500 posti letto'
		},
		{
			ordine: 110,
			Cluster: '500< posti letto <=1000'
		},
		{
			ordine: 120,
			Cluster: '>1000 posti letto'
		},
		{
			ordine: 130,
			Cluster: '<=0.5mln as'
		},
		{
			ordine: 140,
			Cluster: '0.5mln< as <=1mln'
		},
		{
			ordine: 150,
			Cluster: '>1mln as'
		},
		{
			ordine: 200,
			Cluster: '<=2.500 ab'
		},
		{
			ordine: 210,
			Cluster: '2.500< ab <=5.000'
		},
		{
			ordine: 220,
			Cluster: '5.000< ab <=20.000'
		},
		{
			ordine: 230,
			Cluster: '20.000< ab <=50.000'
		},
		{
			ordine: 240,
			Cluster: '50.000< ab <=100.000'
		},
		{
			ordine: 250,
			Cluster: '100.000< ab <=250.000'
		},
		{
			ordine: 260,
			Cluster: 'ab >250.000'
		},
		{
			ordine: 300,
			Cluster: 'Scuole primo e secondo grado'
		},
		{
			ordine: 310,
			Cluster: 'Altre scuole'
		},
		{
			ordine: 400,
			Cluster: 'Unico'
		}
	];

	import { euro, formatNumber, percentuale } from '$lib/js/shared.js';
	import * as d3 from 'd3';
	export let data;

	let c = data.candidature;
	let e = data.enti;

	let riepilogo = d3.rollups(
		c,
		function (v) {
			return {
				numero_candidature: v.length,
				importo_totale: d3.sum(v, (dd) => dd.importo),
				importo_medio: d3.mean(v, (dd) => dd.importo),
				importo_moda: d3.mode(v, (dd) => dd.importo)
			};
		},
		(d) => d.tipologia_ente,
		(d) => d.cluster
	);

	let platea = d3.rollups(
		e,
		(D) => D.length,
		(d) => d.tipologia_ente,
		(d) => d.cluster
	);

	const findNumeroEnti = (tipologia_ente, cluster) => {
		let res = 0;
		platea.forEach((p) => {
			if (p[0] === tipologia_ente) {
				p[1].forEach((c) => {
					if (c[0] === cluster) {
						res = c[1];
					}
				});
			}
		});
		return res;
	};

	riepilogo.forEach((t) => {
		t[1].forEach((c) => {
			if (platea.find((p) => p[0] === t[0])) {
				c[1].numero_enti = findNumeroEnti(t[0], c[0]);
				c[1].stima_per_avviso = Math.round(
					(findNumeroEnti(t[0], c[0]) - c[1].numero_candidature) * 0.9
				);
				c[1].modalita = 'Moda';
				c[1].importo_stimato = 0;
			}
		});
	});

	const impostaModalita = (t, m, r) => {
		r.filter((r) => r[0] === t).forEach((t) => {
			t[1].forEach((c) => {
				if (platea.find((p) => p[0] === t[0])) {
					c[1].modalita = m;
				}
			});
		});
		riepilogo = r;
	};

	const modalitaOptions = ['Media', 'Moda', 'Massimo'];

	$: calcolaImportoStimato = (tt, cc) => {
		let res = 0;

		riepilogo.forEach((t) => {
			let perben = 0;
			t[1].forEach((c) => {
				if (platea.find((p) => p[0] === t[0])) {
					if (t[0] === tt && c[0] === cc) {
						c[1].importo_stimato =
							c[1].stima_per_avviso *
							(c[1].modalita === 'Media'
								? c[1].importo_medio
								: c[1].modalita === 'Moda'
									? c[1].importo_moda
									: listino.find((l) => l.beneficiari === t[0] && l.cluster === c[0])
											.importo_massimo);
						res = c[1].importo_stimato;
						perben = perben + res;
					}
				}
			});
			t.importo_stimato_beneficiario = calcolaImportoStimatoBeneficiario(tt);
		});

		return res;
	};

	let calcolaImportoStimatoBeneficiario = (b) => {
		let res = 0;
		if (platea.find((p) => p[0] === b)) {
			riepilogo.forEach((t) => {
				if (b === t[0]) {
					t[1].forEach((c) => {
						res = res + c[1].importo_stimato;


						t.importo_stimato_beneficiario = res;
					});
				}
			});
		}
		return res;
	};

	let calcolaCandidatureAttive = () => {
		let res = 0;
		riepilogo.forEach((t) => {
			t[1].forEach((c) => {
				if (platea.find((p) => p[0] === t[0])) {
					res = res + c[1].numero_candidature;
				}
			});
		});
		return res;
	};

	let candidatureAttive = calcolaCandidatureAttive();

	$: calcolaCandidatureStimate = () => {
		let res = 0;
		riepilogo.forEach((t) => {
			t[1].forEach((c) => {
				if (c[1].stima_per_avviso) {
					res = res + c[1].stima_per_avviso;
				}
			});
		});
		return res;
	};

	$: candidatureStimate = calcolaCandidatureStimate();

	const calcolaworstcase = (b, v) => {
		const res = [];
		let budget = v;
		const riep = d3.rollups(
			c,
			function (v) {
				return {
					numero_candidature: v.length
				};
			},
			(d) => d.tipologia_ente,
			(d) => d.cluster
		);

		const li = listino.filter((l) => l.beneficiari === b).reverse();
        li.forEach((l) => {
				if (l.beneficiari === 'Comuni' || l.beneficiari === 'Scuole') {
					l.importo_massimo = l.canone + d3.max(l.servizi, (dd) => dd.valore * dd.unita_massime);
					l.importo_minimo = l.canone + d3.min(l.servizi, (dd) => dd.valore * dd.unita_minime);
				} else {
					l.importo_massimo = l.canone + d3.sum(l.servizi, (dd) => dd.valore * dd.unita_massime);
					l.importo_minimo = l.canone + d3.sum(l.servizi, (dd) => dd.valore * dd.unita_minime);
				}
            });

            const min = li[li.length-1].importo_minimo;
		while (budget > 0&&budget>min) {
			li.forEach((l) => {
				riep
					.filter((r) => r[0] === b)[0][1]
					.filter((z) => z[0] === l.cluster)
					.forEach((c) => {

						while ((budget>l.importo_massimo)&&(findNumeroEnti(b, l.cluster) - c[1].numero_candidature > 0)) {
							if (budget > 0) {
								budget = budget - l.importo_massimo;
								c[1].numero_candidature = c[1].numero_candidature + 1;
								res.push([l.cluster, l.importo_massimo, 1]);
							}
						}
					});
			});


		}

		return res;
	};

</script>

<div class="it-page-section my-5" id="riepilogo">
	<h4>Riepilogo</h4>
	<div class="row">
		<div class="col-12 col-lg-12">
			<div class="table-responsive">
				<table class="table table-hover table-sm caption-top align-middle">
					<thead>
						<tr>
							<th><small>Tipologia ente</small></th>
							<th><small>Cluster</small></th>
							<th class="text-center"><small>Numero enti</small></th>
							<th class="text-center"><small>Numero candidature attive</small></th>
							<th class="text-end"><small>Importo totale</small></th>
						</tr>
					</thead>
					<tbody>
						{#each riepilogo as t}
							{#each t[1].sort((a, b) => {
								return clusterOrder.find((co) => co.Cluster === a[0]).ordine - clusterOrder.find((co) => co.Cluster === b[0]).ordine;
							}) as c, i}
								<tr>
									{#if i === 0}
										<td rowspan={t[1].length}>
											<strong>{t[0]}</strong>
										</td>
									{/if}
									<td>
										<small><strong>{c[0]}</strong></small>
									</td>
									<td class="text-center">
										<small>
											{#if platea.find((p) => p[0] === t[0])}
												{c[1].numero_enti}
											{:else}
												<i>n.a.</i>
											{/if}
										</small>
									</td>
									<td class="text-center">
										<small>
											{#if platea.find((p) => p[0] === t[0])}
												{c[1].numero_candidature} ({percentuale(
													Number(c[1].numero_candidature) / Number(c[1].numero_enti)
												)})
											{:else}
												<i>n.a.</i>
											{/if}
										</small>
									</td>
									<td class="text-end">
										<small>{euro(c[1].importo_totale)}</small>
									</td>
								</tr>
							{/each}
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<div class="it-page-section my-5" id="potenziali">
	<h4>Candidature potenziali</h4>
	<p>
		Le candidature potenziali sono calcolate contando il numero di enti in platea privi di
		candidatura finanziata (<i
			>si assume che ogni ente non possa avere più di una candidatura attiva</i
		>).
	</p>
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
							<th class="text-center"><small>Numero enti</small></th>
							<th class="text-end"><small>Importo minimo</small></th>
							<th class="text-end"><small>Importo massimo</small></th>
							<th class="text-end"><small>Media storica</small></th>
							<th class="text-end"><small>Moda storica</small></th>
						</tr>
					</thead>
					<tbody>
						{#each riepilogo as t}
							{#each t[1].sort((a, b) => {
								return clusterOrder.find((co) => co.Cluster === a[0]).ordine - clusterOrder.find((co) => co.Cluster === b[0]).ordine;
							}) as c, i}
								{#if platea.find((p) => p[0] === t[0])}
									<tr>
										{#if i === 0}
											<td rowspan={t[1].length}>
												<strong>{t[0]}</strong>
											</td>
										{/if}
										<td>
											<small><strong>{c[0]}</strong></small>
										</td>

										<td class="text-center">
											<small>{Number(c[1].numero_enti) - Number(c[1].numero_candidature)}</small>
										</td>
										<td class="text-end">
											<small
												>{euro(
													listino.find((l) => l.beneficiari === t[0] && l.cluster === c[0])
														.importo_minimo
												)}</small
											>
										</td>
										<td class="text-end">
											<small
												>{euro(
													listino.find((l) => l.beneficiari === t[0] && l.cluster === c[0])
														.importo_massimo
												)}</small
											>
										</td>
										<td class="text-end">
											<small>{euro(c[1].importo_medio)}</small>
										</td>
										<td class="text-end">
											<small>{euro(c[1].importo_moda)}</small>
										</td>
									</tr>
								{/if}
							{/each}
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<div class="it-page-section my-5" id="stima">
	<h4>Stima dotazione nuovi avvisi</h4>
	{#each data.beneficiari as b}
		<h6>{b}</h6>
		<p>
			Imposta importi a
			<button
				type="button"
				class="btn btn-outline-secondary btn-xs"
				on:click={() => impostaModalita(b, 'Media', riepilogo)}>Media</button
			>
			<button
				type="button"
				class="btn btn-outline-secondary btn-xs"
				on:click={() => impostaModalita(b, 'Moda', riepilogo)}>Moda</button
			>
			<button
				type="button"
				class="btn btn-outline-secondary btn-xs"
				on:click={() => impostaModalita(b, 'Massimo', riepilogo)}>Massimo</button
			>
		</p>

		<div class="row">
			<div class="col-12 col-lg-12">
				<div class="table-responsive">
					<table class="table table-hover table-sm caption-top align-middle">
						<thead>
							<tr>
								<th><small>Cluster</small></th>
								<th class="text-center"><small>Numero enti</small></th>
								<th><small># candidature</small></th>
								<th><small>Importo unitario</small></th>
								<th><small>Budget necessario</small></th>
							</tr>
						</thead>
						<tbody>
							{#each riepilogo.filter((r) => r[0] === b) as t}
								{#each t[1].sort((a, b) => {
									return clusterOrder.find((co) => co.Cluster === a[0]).ordine - clusterOrder.find((co) => co.Cluster === b[0]).ordine;
								}) as c, i}
									{#if platea.find((p) => p[0] === t[0])}
										<tr>
											<td><small><strong>{c[0]}</strong></small></td>
											<td class="text-center"
												><small>{Number(c[1].numero_enti) - Number(c[1].numero_candidature)}</small
												></td
											>
											<td
												><small>
													<input
														type="range"
														min="0"
														max={Number(c[1].numero_enti) - Number(c[1].numero_candidature)}
														bind:value={c[1].stima_per_avviso}
													/>
													{c[1].stima_per_avviso}
												</small></td
											>
											<td>
												<small>
													<div class="select-wrapper">
														<select
															id="filterModalita{i}{b}{c[0]}"
															name="filterModalita{i}{b}{c[0]}"
															bind:value={c[1].modalita}
														>
															{#each modalitaOptions as a}
																<option value={a}>{a}</option>
															{/each}
														</select>
													</div>
												</small>
											</td>
											<td>
												<small>
													{euro(calcolaImportoStimato(b, c[0]))}
												</small>
											</td>
										</tr>
									{/if}
								{/each}
								<tr
									><td colspan="4" class="text-end">Totale</td>
									<td>
										<strong> {euro(t.importo_stimato_beneficiario)}</strong>
									</td></tr
								>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	{/each}
</div>
<div class="it-page-section my-5" id="target">
	<h4>Target</h4>

	<div class="row">
		<div class="col-12 col-lg-12">
			<div class="table-responsive">
				<table class="table table-hover table-sm caption-top align-middle">
					<thead>
						<tr>
							<th class="text-center"><small>Candidature attive</small></th>
							<th class="text-center"><small>Candidature stimate</small></th>
							<th class="text-center"><small>Candidature totali</small></th>
							<th class="text-center"><small>Target</small></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="text-center"><small>{formatNumber(candidatureAttive)}</small></td>
							<td class="text-center"><small>{formatNumber(candidatureStimate)}</small></td>
							<td
								class="text-center {candidatureAttive + candidatureStimate > target[1].valore
									? 'text-success'
									: 'text-danger'}"
								><small
									><strong>{formatNumber(candidatureAttive + candidatureStimate)}</strong></small
								></td
							>
							<td class="text-center"
								><small><strong>{formatNumber(target[1].valore)}</strong></small></td
							>
						</tr>
					</tbody>
				</table>
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
