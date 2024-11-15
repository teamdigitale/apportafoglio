<script>
	// @ts-nocheck

	export let data;
	import * as d3 from 'd3';

	console.log(data);

	// @ts-nocheck

	import Columnchart from './columnchart.svelte';
	import Columnchartdetail from './columnchartdetail.svelte';

	import GeoSelector from './geo/GeoSelector.svelte';
	import { euro, formatNumber, percentuale, percentualeintera } from '$lib/js/shared';

	let selectedArea = data.selectedArea ? data.selectedArea : 'ALL';
	let selectedRegion = data.selectedRegion ? data.selectedRegion : '';
	let misura = data.misura ? data.misura : '';
	let tipologiaEnte = data.tipologiaEnte ? data.tipologiaEnte : 'Tutti';
	let pacchetto =
		misura === '1.4.3 Adozione PagoPA e AppIO' || misura === '1.4.4 Adozione identità digitale'
			? data.pacchetto
				? data.pacchetto
				: 'Tutte'
			: 'Tutte';

	const stati = [
		'In candidatura',
		'In contrattualizzazione',
		'In realizzazione',
		'In revisione a seguito di verifica tecnica',
		'In verifica tecnica',
		'Va richiesta erogazione',
		'In verifica formale',
		'Liquidate'
	];

	const statiColors = [
		'#bdddfc',
		'#6aaaeb',
		'#207bd6',
		'#f5ce93',
		'#e0a243',
		'#2bd6d0',
		'#cc7a00',
		'#009963'
	];

	const teoptions = ['Tutti', 'Comuni', 'Scuole', 'ASL', 'Altri (diversi da Comuni, Scuole, ASL)'];

	$: pacchetti =
		misura === '1.4.3 Adozione PagoPA e AppIO'
			? ['Tutte', 'PagoPA', 'AppIO']
			: ['Tutte', 'ANPR/ANSC', 'SPID/CIE'];

	const optionsTipologieEnti = [
		{ misura: '', options: ['Tutti', 'Comuni', 'Scuole', 'ASL'] },
		{
			misura: '1.2 Abilitazione e facilitazione migrazione al Cloud',
			options: ['Tutti', 'Comuni', 'Scuole', 'ASL']
		},
		{
			misura: '1.4.1 Esperienza del cittadino nei servizi pubblici',
			options: ['Tutti', 'Comuni', 'Scuole']
		}
	];

	$: filtered = data.candidature;

	$: calcolaRipartizione = () => {
		const result = [];
		result.push(['Stato'].concat(stati));
		const row = [];
		row.push('Numero');
		stati.forEach((s) => {
			row.push(filtered[s] ? d3.sum(filtered[s], (d) => d.numero) : 0);
		});
		result.push(row);
		const row2 = [];
		row2.push('Valore');
		stati.forEach((s) => {
			row2.push(filtered[s] ? d3.sum(filtered[s], (d) => d.valore) : 0);
		});
		result.push(row2);
		return result;
	};

	$: datatoshow = calcolaRipartizione();

	$: calcolaRipartizioneDettaglio = () => {
		const acms = [];
		stati.forEach((s) => {
			if (filtered[s]) {
				filtered[s].forEach((c) => {
					if (acms.indexOf(c.acm) === -1) {
						acms.push(c.acm);
					}
				});
			}
		});
		const result = [];
		const headrow = [];
		headrow.push('AcM');
		stati.forEach((s) => {
			headrow.push(s);
			headrow.push({ role: 'annotation' });
			headrow.push({type: 'string', role: 'tooltip'});
			
		});
		result.push(headrow);
		//result.push(['AcM'].concat(stati.map(x => [x,{ role: 'annotation' }])));
		acms.forEach((acm) => {
			const row = [];
			row.push(acm);
			let tot = 0;

			stati.forEach((s) => {
				tot = tot+(filtered[s] ? d3.sum(filtered[s].filter(x => x.acm ===acm), (d) => d.numero) : 0);
			});


			stati.forEach((s) => {
				row.push(filtered[s] ? d3.sum(filtered[s].filter(x => x.acm ===acm), (d) => d.numero) : 0);
				let perc = 0;
				if(filtered[s]){
					perc = d3.sum(filtered[s].filter(x => x.acm ===acm), (d) => d.numero)/tot;
				}
				row.push((data.selectedArea!=='ALL'&&perc>0.1)?percentualeintera(perc):'');
				row.push(s+'\n'+d3.sum(filtered[s].filter(x => x.acm ===acm), (d) => d.numero)+' ('+percentualeintera(perc)+')');
			});
			
			result.push(row);
		});
		console.log(result);
		return result;
	};

	$: datatoshowdettaglio = calcolaRipartizioneDettaglio();

	$: esisteCandidatura = (d) => {
		if (d[1].reduce((a, b) => (a = a + (!isNaN(b) ? b : 0)), 0) === 0) return false;
		return true;
	};

	const calcolaStatiColors = () => {
		let res = {};
		statiColors.forEach((e, index) => {
			res[index] = { color: statiColors[index] };
		});
		return res;
	};

	const calcolaPercentualeNumero = (i, d) => {
		return datatoshow[1][i + 1] / datatoshow[1].reduce((a, b) => (a = a + (!isNaN(b) ? b : 0)), 0);
	};

	const calcolaPercentualeNumeroCumulata = (i, d) => {
		let res = 0;
		for (let z = 0; z <= i; z++) {
			res =
				res +
				datatoshow[1][z + 1] / datatoshow[1].reduce((a, b) => (a = a + (!isNaN(b) ? b : 0)), 0);
		}
		return res;
	};

	const calcolaPercentualeValore = (i, d) => {
		return datatoshow[2][i + 1] / datatoshow[2].reduce((a, b) => (a = a + (!isNaN(b) ? b : 0)), 0);
	};

	const calcolaPercentualeValoreCumulata = (i, d) => {
		let res = 0;
		for (let z = 0; z <= i; z++) {
			res =
				res +
				datatoshow[2][z + 1] / datatoshow[2].reduce((a, b) => (a = a + (!isNaN(b) ? b : 0)), 0);
		}
		return res;
	};
</script>

<h1>Riepilogo progetti</h1>

<div class="container">
	<div class="row">
		<div class="col-12 col-lg-3">
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
							<form method="POST" action="?/update">
								<div class="link-list-wrapper">
									<h3>Filtri</h3>
									<div class="progress">
										<div
											class="progress-bar it-navscroll-progressbar"
											role="progressbar"
											aria-valuenow="0"
											aria-valuemin="0"
											aria-valuemax="100"
										></div>
									</div>

									<div class="my-4">
										<div class="select-wrapper">
											<label for="selectMisura">Misure</label>
											<small>
												<select name="misura" id="selectMisura" bind:value={misura}>
													<option value="">Tutte</option>
													{#each data.misure as m}
														<option value={m.Name}>{m.Name}</option>
													{/each}
												</select>
											</small>
										</div>
									</div>

									{#if misura === '1.4.3 Adozione PagoPA e AppIO' || misura === '1.4.4 Adozione identità digitale'}
										<hr class="my-0" />
										<div class="my-4">
											<div class="select-wrapper">
												<label for="selectPiattaforma">Piattaforma</label>
												<small>
													<select id="selectPiattaforma" bind:value={pacchetto}>
														{#each pacchetti as p}
															<option value={p}>{p}</option>
														{/each}
													</select>
												</small>
											</div>
										</div>
									{/if}

									<hr class="my-0" />
									<div class="my-4">
										<div class="select-wrapper">
											<label for="selectTipologiaEnte">Tipologia ente</label>
											<small>
												<select id="selectTipologiaEnte" bind:value={tipologiaEnte}>
													{#each teoptions as teo}
														<option value={teo}>{teo}</option>
													{/each}
												</select>
											</small>
										</div>
									</div>

									<hr class="my-0" />
									<span id="italy"><GeoSelector bind:selectedArea bind:selectedRegion /></span>
								</div>
								<div class="text-center">
									<a
										href="/monitoraggio/progettioa?misura={misura}&pacchetto={pacchetto}&area={selectedArea}&regione={selectedRegion}&te={tipologiaEnte}"
									>
										<small class="text-primary"
											>Aggiorna
											<svg class="icon icon-sm icon-primary"
												><use href="/svg/sprites.svg#it-refresh"></use></svg
											></small
										>
									</a>
								</div>
							</form>
						</div>
					</div>
				</nav>
			</div>
		</div>
		<div class="col-12 col-lg-9 it-page-sections-container">
			{#if esisteCandidatura(datatoshow)}
				<div class="it-page-section my-5" id="riepilogo">
					<!--
                    <div class="row my-4">
						<div class="col-12 col-lg-12">
							<small>
								<div class="text-start">
									<svg class="icon icon-primary icon-sm"
										><use href="/svg/sprites.svg#it-info-circle"></use></svg
									>
									<span class="align-middle"
										>Dati relativi a <span
											><strong>
												{#if selectedArea === 'ALL'}
													tutta Italia
												{:else if selectedRegion !== ''}
													{selectedRegion}
												{:else}
													{selectedArea.replaceAll('_', ' ')}
												{/if}</strong
											></span
										>, per
										<span
											><strong>
												{misura === '' ? 'tutte le misure' : 'la misura ' + misura}
												{misura === '1.4.3 Adozione PagoPA e AppIO' && pacchetto !== 'Tutte'
													? '(solo ' + pacchetto + ')'
													: ''}</strong
											>
										</span><span>e per </span>
										<span>
											{#if tipologiaEnte === 'Tutti'}
												<strong>tutte le tipologie</strong> di enti
											{:else}
												gli enti di tipologia: <strong>{tipologiaEnte}</strong>
											{/if}
										</span>
									</span>
								</div>
							</small>
						</div>
					</div>
                    -->
					<div>
						<Columnchart
							id="ripartizioneCandidature"
							values={datatoshow}
							series={calcolaStatiColors()}
							legendPosition=""
							stacked={'percent'}
							h="200"
						/>
					</div>
					<div class="my-4">
						<div class="table-responsive">
							<table class="table table-striped table-hover table-sm">
								<thead>
									<tr>
										<th scope="col" class="text-center"><small>Stato</small></th>
										<th scope="col" class="text-end"><small>Numero</small></th>
										<th scope="col" class="text-end"><small>% numero</small></th>
										<th scope="col" class="text-end"><small>% totale</small></th>
										<th scope="col" class="text-end"><small>Valore</small></th>
										<th scope="col" class="text-end"><small>% valore</small></th>
										<th scope="col" class="text-end"><small>% totale</small></th>
									</tr>
								</thead>
								<tbody>
									{#each stati as s, i}
										{#if datatoshow[1][i + 1] > 0}
											<tr>
												<td
													class="text-end"
													style="width:25% ; background: linear-gradient(
                                    to top,
                                    {statiColors[i]},
                                    {statiColors[i]} 0.4rem,
                                    transparent 0.4rem,
                                    transparent 100%
                                  );"><small>{s}</small></td
												>
												<td class="text-end"><small>{formatNumber(datatoshow[1][i + 1])}</small></td
												>
												<td class="text-end"
													><small>{percentuale(calcolaPercentualeNumero(i, datatoshow))}</small></td
												>
												<td class="text-end"
													><small
														>{percentuale(calcolaPercentualeNumeroCumulata(i, datatoshow))}</small
													></td
												>
												<td class="text-end"><small>{euro(datatoshow[2][i + 1])}</small></td>

												<td class="text-end"
													><small>{percentuale(calcolaPercentualeValore(i, datatoshow))}</small></td
												>
												<td class="text-end"
													><small
														>{percentuale(calcolaPercentualeValoreCumulata(i, datatoshow))}</small
													></td
												>
											</tr>
										{/if}
									{/each}
									<tr>
										<td class="text-end"><small><strong></strong></small></td>
										<td class="text-end"
											><small
												><strong
													>{formatNumber(
														datatoshow[1].reduce((a, b) => (a = a + (!isNaN(b) ? b : 0)), 0)
													)}</strong
												></small
											></td
										>
										<td class="text-end"><small><strong></strong></small></td>
										<td class="text-end"><small><strong></strong></small></td>
										<td class="text-end"
											><small
												><strong
													>{euro(
														datatoshow[2].reduce((a, b) => (a = a + (!isNaN(b) ? b : 0)), 0)
													)}</strong
												></small
											></td
										>
										<td class="text-end"><small><strong></strong></small></td>
										<td class="text-end"><small><strong></strong></small></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<h5>Dettaglio per Account Manager</h5>
					<div>
						<div>
							<Columnchartdetail
								id="ripartizioneCandidatureAcm"
								values={datatoshowdettaglio}
								series={calcolaStatiColors()}
								legendPosition=""
								stacked={'absolute'}
								h={datatoshowdettaglio.length*40}
							/>
						</div>
					</div>
					
					<div class="my-4">
						<div class="table-responsive">
							<table class="table table-striped table-hover table-sm">
								<thead>
									<tr>
										<th scope="col" class="text-start"><small>AcM</small></th>
										{#each stati as s, i}
										<th scope="col" class="text-center"><small>{s}</small></th>
										{/each}
										<th></th>
									</tr>
								</thead>
								<tbody>
									{#each datatoshowdettaglio as d,i}
									{#if i>0}
									<tr>
										<td><small>{d[0]}</small></td>
										<td class="text-center align-middle"><small>{d[1]}</small></td>
										<td class="text-center align-middle"><small>{d[4]}</small></td>
										<td class="text-center align-middle"><small>{d[7]}</small></td>
										<td class="text-center align-middle"><small>{d[10]}</small></td>
										<td class="text-center align-middle"><small>{d[13]}</small></td>
										<td class="text-center align-middle"><small>{d[16]}</small></td>
										<td class="text-center align-middle"><small>{d[19]}</small></td>
										<td class="text-center align-middle"><small>{d[22]}</small></td>
										<td class="text-center align-middle"><small><strong>{d[1]+d[4]+d[7]+d[10]+d[13]+d[16]+d[19]+d[22]}</strong></small></td>
									</tr>
									{/if}
									{/each}
									<tr>
										<td></td>
										<td class="text-center align-middle"><small><strong>{d3.sum(datatoshowdettaglio,d => d[1])}</strong></small></td>
										<td class="text-center align-middle"><small><strong>{d3.sum(datatoshowdettaglio,d => d[4])}</strong></small></td>
										<td class="text-center align-middle"><small><strong>{d3.sum(datatoshowdettaglio,d => d[7])}</strong></small></td>
										<td class="text-center align-middle"><small><strong>{d3.sum(datatoshowdettaglio,d => d[10])}</strong></small></td>
										<td class="text-center align-middle"><small><strong>{d3.sum(datatoshowdettaglio,d => d[13])}</strong></small></td>
										<td class="text-center align-middle"><small><strong>{d3.sum(datatoshowdettaglio,d => d[16])}</strong></small></td>
										<td class="text-center align-middle"><small><strong>{d3.sum(datatoshowdettaglio,d => d[19])}</strong></small></td>
										<td class="text-center align-middle"><small><strong>{d3.sum(datatoshowdettaglio,d => d[22])}</strong></small></td>
										<td class="text-center align-middle"><small><strong>{
										d3.sum(datatoshowdettaglio,d => d[1])
										+d3.sum(datatoshowdettaglio,d => d[4])
										+d3.sum(datatoshowdettaglio,d => d[7])
										+d3.sum(datatoshowdettaglio,d => d[10])
										+d3.sum(datatoshowdettaglio,d => d[13])
										+d3.sum(datatoshowdettaglio,d => d[16])
										+d3.sum(datatoshowdettaglio,d => d[19])
										+d3.sum(datatoshowdettaglio,d => d[22])
										}</strong></small></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					
				</div>
			{:else}
				<div class="it-page-section my-5" id="riepilogo">
					<div class="row my-4">
						<div class="col-12 col-lg-12">
							<small>
								<div class="text-start">
									<svg class="icon icon-danger icon-sm"
										><use href="/svg/sprites.svg#it-error"></use></svg
									>
									<span class="align-middle"
										><strong>Non esistono candidature per in base ai filtri selezionati</strong>
									</span>
								</div>
							</small>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	table *{ font-size: 0.75rem;}
</style>