<script>
	import Areachart from '$lib/c/charts/areachart.svelte';
	import Barchart from '$lib/c/charts/barchart.svelte';
	import Cite from '$lib/c/cite.svelte';
	import Scorecard from '$lib/c/scorecard.svelte';
	import { euro, setscroll } from '$lib/js/shared.js';
	import { onMount } from 'svelte';
	import moment from 'moment/min/moment-with-locales';
	moment.locale('it');

	export let data;

	let selectedMisura = '';
	$: filteredMisure = data.misure.filter((m) =>
		selectedMisura === '' ? true : m.Id === selectedMisura
	);

	$: filteredAvvisi = data.avvisi.filter((a) =>
		selectedMisura === ''
			? true
			: (a.Misura_Padre_1__c && a.Misura_Padre_1__c === selectedMisura) ||
				(a.Misura_Padre_2__c && a.Misura_Padre_2__c === selectedMisura) ||
				a.outfunds__Parent_Funding_Program__r.Id === selectedMisura
	);

	$: calcolaBeneficiari = () => {
		const res = [];
		filteredAvvisi.forEach((a) => {
			a.beneficiari.forEach((b) => {
				if (res.indexOf(b.beneficiario) === -1) {
					res.push(b.beneficiario);
				}
			});
		});
		return res;
	};

	$: beneficiariOptions = ['Tutti i beneficiari'].concat(calcolaBeneficiari());

	let selectedBeneficiario = 'Tutti i beneficiari';

	$: calcolaPlatea = () => {
		const res = [];
		if (selectedBeneficiario !== beneficiariOptions[0]) {
			let sumok = 0;
			filteredAvvisiTimeLine.reverse().forEach((a, index) => {
				if (index === 0) {
					res.push({
						id: a.Id,
						platea: a.beneficiari.filter((b) => b.beneficiario === selectedBeneficiario)[0]
							.platea_generale
					});
					sumok =
						sumok + a.beneficiari.filter((b) => b.beneficiario === selectedBeneficiario)[0].ok;
				} else {
					res.push({
						id: a.Id,
						platea:
							a.beneficiari.filter((b) => b.beneficiario === selectedBeneficiario)[0]
								.platea_generale - sumok
					});
					sumok =
						sumok + a.beneficiari.filter((b) => b.beneficiario === selectedBeneficiario)[0].ok;
				}
			});
		}
		return res;
	};

	$: platea = calcolaPlatea();

	$: filteredAvvisiTimeLine = filteredAvvisi.filter((a) =>
		selectedBeneficiario === beneficiariOptions[0]
			? true
			: a.beneficiari.filter((b) => b.beneficiario === selectedBeneficiario).length > 0
	);

	onMount(async () => {
		await setscroll();
	});
</script>

<div class="container my-4">
	<h1>Board avvisi</h1>
	<Cite
		text="Se volete conoscere il valore del denaro cercate di farvene prestare."
		author="Benjamin Franklin"
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
										<a class="nav-link active" href="#storiaavvisi">
											<span>1. Storico degli avvisi </span>
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
			<div class="it-page-section my-5" id="storiaavvisi">
				<h4>Storico degli avvisi</h4>
				<div class="col-12 col-lg-12 my-4">
					<div class="select-wrapper">
						<label for="filterMisura">Misure</label>
						<select id="filterMisura" name="filterMisura" bind:value={selectedMisura}>
							<option value="">Tutte le misure</option>
							{#each data.misure as m}
								<option value={m.Id}>{m.Name}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="col-12 col-lg-12 my-4">
					<div class="select-wrapper">
						<label for="selectedBeneficiario">Beneficiari</label>
						<select
							id="selectedBeneficiario"
							name="selectedBeneficiario"
							bind:value={selectedBeneficiario}
						>
							{#each beneficiariOptions as b}
								<option value={b}>{b}</option>
							{/each}
						</select>
					</div>
				</div>

				{#if true || selectedMisura !== ''}
					<div class="it-timeline-wrapper">
						<div class="row">
							{#each filteredAvvisiTimeLine as avviso}
								<div class="col-12">
									<div class="timeline-element">
										<div
											class="it-pin-wrapper {avviso.outfunds__Status__c === 'PUBBLICATO'
												? 'it-now'
												: 'it-evidence'}"
										>
											<div class="pin-icon">
												<svg class="icon"><use href="/svg/sprites.svg#it-horn"></use></svg>
											</div>
											<div class="pin-text">
												<span
													>{moment(avviso.outfunds__Start_Date__c, 'YYYY-MM-DD').format('MMM YYYY')}
													- {moment(avviso.outfunds__End_Date__c, 'YYYY-MM-DD').format(
														'MMM YYYY'
													)}</span
												>
											</div>
										</div>
										<div class="card-wrapper">
											<div class="card">
												<div class="card-body">
													<h5 class="card-title">{avviso.Name}</h5>

													<div>
														{#each avviso.beneficiari as b}
															<div class="chip chip-simple">
																<span class="chip-label">{b.beneficiario}</span>
															</div>
														{/each}
													</div>
													<div>
														Dotazione finanziaria: <strong
															>{euro(
																avviso.Misura_Padre_1__c
																	? avviso.Total_Program_Amount_Padre_1__c
																	: avviso.Misura_Padre_2__c
																		? avviso.Total_Program_Amount_Padre_2__c
																		: avviso.outfunds__Total_Program_Amount__c
															)}</strong
														>
													</div>
													<div>
														{#each avviso.beneficiari as b}
															<hr />
															Beneficiario:<strong>{b.beneficiario}</strong><br />
															{#if selectedBeneficiario !== 'Tutti i beneficiari'}
																Platea: <strong
																	>{platea.filter((p) => p.id === avviso.Id)[0].platea}</strong
																><br />
															{/if}
															Candidature OK: <strong>{b.ok}</strong><br />
														{/each}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
