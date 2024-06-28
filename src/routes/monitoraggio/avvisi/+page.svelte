<script>
	import Cite from '$lib/c/cite.svelte';
	import { euro } from '$lib/js/shared';
	import Columnchart from './columnchart.svelte';
	import { onMount } from 'svelte';
	import moment from 'moment/min/moment-with-locales';
	import Gauge from '$lib/c/charts/gauge.svelte';
	moment.locale('it');

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

	let filteredMisure = data.misure;
	/*
	let filteredMisure = data.misure.filter(
		(m) => m.avvisi.filter((a) => a.outfunds__Status__c === 'PUBBLICATO').length > 0
	);
	*/

	const stati = ['Impegnate', 'Finanziate', 'Rinunciate', 'Revocate', 'Residue'];

	const statiColors = [
		'#bdddfc',
		'#6aaaeb',
		'#f5ce93',
		'#20d696',
		'#009963',
		'#2bd6d0',
		'#cc7a00',
		'#20d696',
		'#009963'
	];

	const calcolaStatiColors = () => {
		let res = {};
		statiColors.forEach((e, index) => {
			res[index] = { color: statiColors[index] };
		});
		return res;
	};

	const calcolaImpegnate = (a) => {
		return a.risorse.get('ACCETTATA')
			? a.risorse.get('ACCETTATA')
			: 0 + a.risorse.get('AMMESSA')
				? a.risorse.get('AMMESSA')
				: 0 + a.risorse.get('AMMESSA CON RISERVA')
					? a.risorse.get('AMMESSA CON RISERVA')
					: 0 + a.risorse.get('IN VERIFICA')
						? a.risorse.get('IN VERIFICA')
						: 0;
	};

	const calcolaFinanziate = (a) => {
		return a.risorse.get('FINANZIATA') ? a.risorse.get('FINANZIATA') : 0;
	};
	const calcolaRinunciate = (a) => {
		return a.risorse.get('RINUNCIATA') ? a.risorse.get('RINUNCIATA') : 0;
	};
	const calcolaRevocate = (a) => {
		return a.risorse.get('REVOCATA') ? a.risorse.get('REVOCATA') : 0;
	};

	const calcolaResidue = (a) => {
		return (
			a.outfunds__Total_Program_Amount__c -
			calcolaImpegnate(a) -
			calcolaFinanziate(a) -
			calcolaRinunciate(a) -
			calcolaRevocate(a)
		);
	};

	const calcolaResiduoAvvisi = (a) => {
		const result = [];
		result.push(['Stato'].concat(stati));
		const row = [];
		row.push('Risorse');
		const valoreAvviso = a.outfunds__Total_Program_Amount__c;
		const impegnate = calcolaImpegnate(a);
		const finanziate = calcolaFinanziate(a);
		const rinunciate = calcolaRinunciate(a);
		const revocate = calcolaRevocate(a);
		row.push(impegnate);
		row.push(finanziate);
		row.push(rinunciate);
		row.push(revocate);
		row.push(valoreAvviso - impegnate - finanziate - rinunciate - revocate);
		result.push(row);
		return result;
	};

	const calcolaResiduoMisura = (m) => {
		let residuo = m.outfunds__Total_Program_Amount__c;
		m.avvisi.forEach((a) => {
			if (a.outfunds__Status__c === 'TERMINATO') {
				residuo = residuo - calcolaFinanziate(a);
			} else {
				residuo = residuo - calcolaImpegnate(a) - calcolaFinanziate(a);
			}
		});
		return residuo;
	};
</script>

<h1>Monitoraggio risorse avvisi e misure</h1>
<Cite text="La Parsimonia è lontana da ogni spesa vana e superflua." author="Sant'Ambrogio" />

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
											{#each filteredMisure as m}
												<li class="nav-link">
													<a class="nav-link" href="#misure-{m.Id}">
														<span>{m.Name}</span>
													</a>
												</li>
											{/each}
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
			{#each filteredMisure as m}
				<div class="it-page-section my-5" id="misure-{m.Id}">
					<div class="row">
						<div class="col-12">
							<div class="d-flex justify-content-start mb-2 align-items-center">
								<div class="p-2 bd-highlight">
									<Gauge
										id="contr-{m.Id}"
										values={[
											['Label', 'Value'],
											[
												'',
												Math.round(
													(calcolaResiduoMisura(m) / m.outfunds__Total_Program_Amount__c) * 100
												)
											]
										]}
										label=""
									/>
								</div>
								<div class="p-2 bd-highlight">
									<h4>
										<strong> {m.Name}</strong>
									</h4>
									Importo misura:

									<strong>{euro(m.outfunds__Total_Program_Amount__c)}</strong><br />
									Residuo misura: <strong>{euro(calcolaResiduoMisura(m))}</strong>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						{#each m.avvisi.filter((x) => x.outfunds__Status__c === 'PUBBLICATO') as a}
							<div class="col-12 col-lg-12">
								<!--start card-->
								<div class="row">
									<div class="col-12 col-lg-12">
										<!--start card-->
										<div class="card-wrapper card-space">
											<div class="card card-bg border-bottom-card">
												<div class="etichetta"></div>
												<div class="card-body">
													<h3 class="card-title h6">
														<div class="d-flex justify-content-between mb-2">
															<div class="p-2 bd-highlight">
																{a.Name} <br /><small
																	>(Chiusura: {moment(a.outfunds__End_Date__c, 'YYYY-MM-DD').format(
																		'DD/MM/YYYY'
																	)})</small
																>
															</div>

															<div class="p-2 bd-highlight">
																<img
																	src="/svg/euro-svgrepo-com.svg"
																	alt="Dotazione avviso"
																	class="px-1"
																/>

																<span>{euro(a.outfunds__Total_Program_Amount__c)}</span>
															</div>
														</div>
													</h3>
													<div class="row">
														<div class="col-12 col-lg-12">
															<Columnchart
																id={a.Id}
																values={calcolaResiduoAvvisi(a)}
																series={calcolaStatiColors()}
																legendPosition=""
																stacked={'percent'}
																h="150"
															/>
														</div>
														<div class="col-12 col-lg-12">
															<div class="row">
																<div class="col-12 col-lg-12">
																	<div class="d-flex justify-content-start mb-2 align-items-center">
																		{#if calcolaImpegnate(a) > 0}
																			<div class="p-2 bd-highlight">
																				<div
																					style="width:100% ; margin-bottom:0.5rem; padding-left:0.5rem; background: linear-gradient(
																			to right,
																			{statiColors[0]},
																			{statiColors[0]} 0.3rem,
																			transparent 0.3rem,
																			transparent 100%
																		  );"
																				>
																					<small
																						><strong>Impegnate:</strong>
																						{euro(calcolaImpegnate(a))}</small
																					>
																				</div>
																			</div>
																		{/if}
																		{#if calcolaFinanziate(a) > 0}
																			<div class="p-2 bd-highlight">
																				<div
																					style="width:100% ; margin-bottom:0.5rem; padding-left:0.5rem; background: linear-gradient(
																		to right,
																		{statiColors[1]},
																		{statiColors[1]} 0.3rem,
																		transparent 0.3rem,
																		transparent 100%
																	  );"
																				>
																					<small
																						><strong>Finanziate:</strong>
																						{euro(calcolaFinanziate(a))}</small
																					>
																				</div>
																			</div>
																		{/if}
																		{#if calcolaRinunciate(a) > 0}
																			<div class="p-2 bd-highlight">
																				<div
																					style="width:100% ; margin-bottom:0.5rem; padding-left:0.5rem; background: linear-gradient(
																		to right,
																		{statiColors[2]},
																		{statiColors[2]} 0.3rem,
																		transparent 0.3rem,
																		transparent 100%
																	  );"
																				>
																					<small
																						><strong>Rinunciate:</strong>
																						{euro(calcolaRinunciate(a))}</small
																					>
																				</div>
																			</div>
																		{/if}
																		{#if calcolaRevocate(a) > 0}
																			<div class="p-2 bd-highlight">
																				<div
																					style="width:100% ; margin-bottom:0.5rem; padding-left:0.5rem; background: linear-gradient(
																		to right,
																		{statiColors[3]},
																		{statiColors[3]} 0.3rem,
																		transparent 0.3rem,
																		transparent 100%
																	  );"
																				>
																					<small
																						><strong>Revocate:</strong>
																						{euro(calcolaRevocate(a))}</small
																					>
																				</div>
																			</div>
																		{/if}
																		{#if calcolaResidue(a) > 0}
																			<div class="p-2 bd-highlight">
																				<div
																					style="width:100% ; margin-bottom:0.5rem; padding-left:0.5rem; background: linear-gradient(
																		to right,
																		{statiColors[4]},
																		{statiColors[4]} 0.3rem,
																		transparent 0.3rem,
																		transparent 100%
																	  );"
																				>
																					<small
																						><strong>Residue:</strong>
																						{euro(calcolaResidue(a))}</small
																					>
																				</div>
																			</div>
																		{/if}
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<!--end card-->
									</div>
								</div>

								<!--end card-->
							</div>
						{/each}
					</div>
				</div>
				<hr />
			{/each}
		</div>
	</div>
</div>

<style>
	.card:after {
		content: '';
		display: block;
		margin-top: 0px;
		margin-left: 24px;
	}
</style>
