<script>
	// @ts-nocheck

	import Columnchart from './columnchart.svelte';
	import * as d3 from 'd3';
	export let data;
	import GeoSelector from './geo/GeoSelector.svelte';
	import { euro, formatNumber, percentuale } from '$lib/js/shared';
	import Cite from '$lib/c/cite.svelte';
	let selectedArea = 'ALL';
	let selectedRegion = '';
	let misura = '';

	const stati = [
		'In candidatura',
		'In contrattualizzazione',
		'In realizzazione',
		'In revisione',
		'In verifica tecnica',
		'In verifica formale',
		'In liquidazione',
		'Liquidate'
	];

	const statiColors = [
		'#bdddfc',
		'#6aaaeb',
		'#207bd6',
		'#f5ce93',
		'#e0a243',
		'#cc7a00',
		'#20d696',
		'#009963'
	];

	$: riepiloga = (cc) => {
		let filtered;
		if (misura !== '') {
			cc = cc.filter((c) => c.misura === misura);
		}
		if (selectedArea === 'ALL') {
			filtered = cc;
		} else {
			if (selectedRegion === '') {
				filtered = cc.filter((c) => c.area_geografica === selectedArea);
			} else {
				filtered = cc.filter((c) => c.regione === selectedRegion);
			}
		}
		return d3.rollup(
			filtered,
			function (D) {
				return {
					numero_candidature: d3.sum(D, function (d) {
						return d.numero_candidature;
					}),
					valore_candidature: d3.sum(D, function (d) {
						return d.valore;
					})
				};
			},
			(d) => d.stato
		);
	};

	$: filtered = riepiloga(data.candidature);

	$: calcolaRipartizione = () => {
		const result = [];
		result.push(['Stato'].concat(stati));
		const row = [];
		row.push('Numero');
		stati.forEach((s) => {
			row.push(filtered.get(s) ? filtered.get(s).numero_candidature : 0);
		});
		result.push(row);
		const row2 = [];
		row2.push('Valore');
		stati.forEach((s) => {
			row2.push(filtered.get(s) ? filtered.get(s).valore_candidature : 0);
		});
		result.push(row2);
		return result;
	};

	$: datatoshow = calcolaRipartizione();

	const calcolaStatiColors = () => {
		let res = {};
		statiColors.forEach((e, index) => {
			res[index] = { color: statiColors[index] };
		});
		return res;
	};
</script>

<h1>Riepilogo candidature</h1>
<Cite text="Un sogno è solo un sogno. Un obiettivo è un sogno con un progetto e una scadenza." author="Harvey B. Mackay" />

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
											<select id="selectMisura" bind:value={misura}>
												<option value="">Tutte</option>
												{#each data.misure as m}
													<option value={m.Name}>{m.Name}</option>
												{/each}
											</select>
										</small>
									</div>
								</div>
								<hr class="my-0" />
								<span id="italy"><GeoSelector bind:selectedArea bind:selectedRegion /></span>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</div>
		<div class="col-12 col-lg-9 it-page-sections-container">
			<div class="it-page-section my-5" id="riepilogo">
				<div class="row my-4">
					<div class="col-12 col-lg-12">
						<small>
							<div class="callout callout-highlight note">
								<div class="callout-title">
									<svg class="icon"><use href="/svg/sprites.svg#it-info-circle"></use></svg>
									Dati relativi a
								</div>
								<p>
									<span
										><strong>
											{#if selectedArea === 'ALL'}
												Tutta Italia
											{:else if selectedRegion !== ''}
												{selectedRegion}
											{:else}
												{selectedArea.replaceAll('_', ' ')}
											{/if}</strong
										></span
									>e per
									<span><strong> {misura === '' ? 'Tutte le misure' : misura}</strong> </span>
								</p>
							</div>
						</small>
					</div>
				</div>

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
									<th scope="col" class="text-end"><small>Valore</small></th>
									<th scope="col" class="text-end"><small>% numero</small></th>
									<th scope="col" class="text-end"><small>% valore</small></th>
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
                                    {statiColors[i]} 0.3rem,
                                    transparent 0.3rem,
                                    transparent 100%
                                  );"><small>{s}</small></td
											>
											<td class="text-end"
												><small>{formatNumber(datatoshow[1][i + 1])}</small></td
											>
											<td class="text-end"><small>{euro(datatoshow[2][i + 1])}</small></td>
											<td class="text-end"
												><small
													>{percentuale(
														datatoshow[1][i + 1] /
															datatoshow[1].reduce((a, b) => (a = a + (!isNaN(b) ? b : 0)), 0)
													)}</small
												></td
											>
											<td class="text-end"
												><small
													>{percentuale(
														datatoshow[2][i + 1] /
															datatoshow[2].reduce((a, b) => (a = a + (!isNaN(b) ? b : 0)), 0)
													)}</small
												></td
											>
										</tr>
									{/if}
								{/each}
								<tr>
									<td class="text-end"><small><strong></strong></small></td>
									<td class="text-center"
										><small
											><strong
												>{formatNumber(
													datatoshow[1].reduce((a, b) => (a = a + (!isNaN(b) ? b : 0)), 0)
												)}</strong
											></small
										></td
									>
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
			</div>
		</div>
	</div>
</div>
