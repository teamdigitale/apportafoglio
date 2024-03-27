<script>
	// @ts-nocheck

	export let data;
	console.log(data);
	import { orderEnti } from '$lib';
	import * as d3 from 'd3';
	import GeoSelector from '$lib/c/GeoSelector.svelte';
	import Cite from '$lib/c/cite.svelte';
	import Scorecard from '$lib/c/scorecard.svelte';
	import PercentageIndicator from '$lib/c/PercentageIndicator.svelte';
	import { percentuale } from '$lib/js/shared';

	let selectedArea = 'ALL';
	let selectedRegion = '';
	let mostraSoloBeneficiariAvvisi = true;
	let mostraSoloCandidatureAttive = true;
	let idMisura = '';

	$: filteredBeneficiari = data.soggetti_beneficiari.filter((sb) =>
		idMisura === ''
			? true
			: sb.outfunds__Parent_Funding_Program__c === idMisura ||
				sb.Misura_Padre_1__c === idMisura ||
				sb.Misura_Padre_2__c === idMisura
	);

	$: filteredPlatea = data.platea
		.filter((p) =>
			mostraSoloBeneficiariAvvisi === true
				? filteredBeneficiari.filter(
						(sb) =>
							sb.SOGGETTI_DESTINATARI__c.toUpperCase()
								.split(';')
								.indexOf(p.Tipologia_Ente__c.toUpperCase()) !== -1
					).length > 0
				: true
		)
		.filter((p) => (selectedArea === 'ALL' ? true : p.Area_geografica__c === selectedArea))
		.filter((p) => (selectedRegion === '' ? true : p.Regione__c === selectedRegion));

	$: riepilogo = d3.rollup(
		filteredPlatea,
		(D) => D.length,
		(d) => d.Tipologia_Ente__c
	);

	$: filteredCandidature = data.candidature
		.filter((c) =>
			idMisura === ''
				? true
				: c.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id === idMisura ||
					(c.outfunds__FundingProgram__r.Misura_Padre_1__r &&
						c.outfunds__FundingProgram__r.Misura_Padre_1__r.Id === idMisura) ||
					(c.outfunds__FundingProgram__r.Misura_Padre_2__r &&
						c.outfunds__FundingProgram__r.Misura_Padre_2__r.Id === idMisura)
		)
		.filter((c) => (mostraSoloCandidatureAttive ? isAttiva(c) : true))
		.filter((c) =>
			selectedArea === 'ALL'
				? true
				: c.outfunds__Applying_Organization__r.Area_geografica__c === selectedArea
		)
		.filter((c) =>
			selectedRegion === ''
				? true
				: c.outfunds__Applying_Organization__r.Regione__c === selectedRegion
		);

	$: riepilogoCandidature = d3.rollup(
		filteredCandidature,
		(D) => D.length,
		(d) => d.outfunds__Applying_Organization__r.Tipologia_Ente__c
	);

	const isAttiva = (c) => {
		if (
			c.outfunds__Status__c === 'FINANZIATA' ||
			c.outfunds__Status__c === 'AMMESSA' ||
			c.outfunds__Status__c === 'IN VERIFICA' ||
			c.outfunds__Status__c === 'ACCETTATA' ||
			c.outfunds__Status__c === 'AMMESSA CON RISERVA'
		) {
			return true;
		} else {
			return false;
		}
	};
</script>

<div class="container my-4">
	<h1>Enti e candidature</h1>
	<Cite text="La mappa non è il territorio." author="Anonimo" />
</div>

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
						<span class="it-list"></span>Menu
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
								<h3>Sezioni</h3>
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
										<a class="nav-link active" href="#enti">
											<span>1. Enti </span>
										</a>
									</li>
								</ul>
							</div>
							<hr class="my-0" />
							<h3>Filtri</h3>

							<GeoSelector bind:selectedArea bind:selectedRegion />

							<div class="my-4">
								<div class="select-wrapper">
									<label for="selectMisura">Misure</label>
									<select id="selectMisura" bind:value={idMisura}>
										<option value="">Tutte</option>
										{#each data.misure as m}
											<option value={m.Id}>{m.Name}</option>
										{/each}
									</select>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</div>
		<div class="col-12 col-lg-6 it-page-sections-container">
			<div class="it-page-section my-5" id="enti">
				<h4>Enti</h4>

				<div class="row">
					<div class="col-12 col-lg-12">
						<div class="row">
							<div class="col-12 col-lg-6">
								<div class="form-check">
									<div class="toggles">
										<label for="checkMostraSoloBeneficiariAvvisi">
											Mostra solo beneficiari avvisi
											<input
												type="checkbox"
												id="checkMostraSoloBeneficiariAvvisi"
												bind:checked={mostraSoloBeneficiariAvvisi}
											/>
											<span class="lever"></span>
										</label>
									</div>
								</div>
							</div>
							<div class="col-12 col-lg-6">
								<div class="form-check">
									<div class="toggles">
										<label for="checkMostraSoloCandidatureAttive">
											Mostra solo candidature attive
											<input
												type="checkbox"
												id="checkMostraSoloCandidatureAttive"
												bind:checked={mostraSoloCandidatureAttive}
											/>
											<span class="lever"></span>
										</label>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-12 col-lg-12">
								<table class="table table-hover table-sm caption-top">
									<caption>Numero enti per tipologia</caption>
									<thead class="table-primary">
										<tr>
											<th scope="col"><small>Tipologia ente</small></th>
											<th scope="col" class="text-end"><small># enti</small></th>
											<th scope="col" class="text-end"><small># candidature</small></th>
											{#if idMisura !== ''}
												<th scope="col"><small></small></th>
											{/if}
										</tr>
									</thead>
									<tbody>
										{#each [...riepilogo.keys()].sort(orderEnti) as k}
											<tr>
												<td><small>{k.toUpperCase()}</small></td>
												<td class="text-end"
													><small>{riepilogo.get(k).toLocaleString('it-IT')}</small></td
												>
												<td class="text-end">
													<small>
														{riepilogoCandidature.get(k)
															? riepilogoCandidature.get(k).toLocaleString('it-IT')
															: '0'}
													</small>
												</td>
												<td class="text-end">
													<small>
														{#if idMisura !== ''}
															<span class="mx-4">
																{percentuale(riepilogoCandidature.get(k) / riepilogo.get(k))}
															</span>
															<svg class="icon icon-sm icon-danger pulse"
																><use href="/svg/sprites.svg#it-error"></use></svg
															>
														{/if}
													</small>
												</td>
											</tr>
										{/each}
									</tbody>
									<tfoot>
										<tr>
											<td class="text-end"><strong><small>Totale:</small></strong></td>
											<td class="text-end"
												><strong
													><small
														>{[...riepilogo.values()]
															.reduce((a, e) => (a = a + e), 0)
															.toLocaleString('it-IT')}</small
													></strong
												></td
											>
											<td class="text-end"
												><strong
													><small>
														{filteredCandidature.length.toLocaleString('it-IT')}
													</small></strong
												>
											</td>
											{#if idMisura !== ''}
												<td></td>
											{/if}
										</tr>
									</tfoot>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-12 col-lg-3 it-page-sections-container">
			<div class="it-page-section my-5" id="riepilogo">
				<h6>Riepilogo</h6>
				<Scorecard
					text="Numero candidature"
					title={filteredCandidature.length.toLocaleString('it-IT')}
					bgcolor="primary"
					textcolor="white"
				/>
			</div>
		</div>
	</div>
</div>

<style>
	@keyframes pulse {
		/* Since you're using translate, you shouldn't overwrite it with only scale, just combine them */
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1);
		}
	}

	.pulse {
		animation-name: pulse;
		animation-duration: 2s;
		/* If you want the animation keeps going */
		animation-iteration-count: infinite;
	}
</style>
