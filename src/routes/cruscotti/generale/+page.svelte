<script>
	import Pagination from '$lib/c/pagination.svelte';
	import { areaManager, euro } from '$lib/js/shared.js';

	import Gauge from '$lib/c/charts/gauge.svelte';

	export let data;

	console.log(data);

	import { onMount } from 'svelte';
	import Cite from '$lib/c/cite.svelte';

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

	let regioniOptions = ['Tutte le regioni'].concat(
		Object.values(
			data.candidature.reduce((a, { Regione__c }) => {
				a[Regione__c] = a[Regione__c] || {
					Regione__c,
					count: 0
				};
				a[Regione__c].count++;
				return a;
			}, Object.create(null))
		)
			.map((x) => x.Regione__c)
			.sort()
	);
	let filterRegioni = 'Tutte le regioni';

	let acmOptions = [
		{
			Id: 'All',
			Name: 'Tutti gli AcM'
		}
	]
		.concat(
			Object.values(
				data.candidature.reduce((a, b) => {
					//let idacm = b.Account_Manager__c ? b.Account_Manager__c : 'undefined';
					if (b.outfunds__Applying_Organization__r.Account_Manager__c) {
						a[b.outfunds__Applying_Organization__r.Account_Manager__c] = a[
							b.outfunds__Applying_Organization__r.Account_Manager__c
						] || {
							Id: b.outfunds__Applying_Organization__r.Account_Manager__c,
							Name: b.outfunds__Applying_Organization__r.Account_Manager__r.Name
						};
					}
					return a;
				}, Object.create(null))
			)
				//.map((x) => x.Account_Manager__c).filter(x => nomeUtente(x)!=='Standard')
				.sort((a, b) => {
					return a.Name - b.Name;
				})
		)
		.concat([
			{
				Id: 'undefined',
				Name: 'Non assegnato'
			}
		]);
	let filterAcm = acmOptions[0].Id;

	let statoCandidaturaOptions = ['Tutti gli stati della candidatura'].concat(
		Object.values(
			data.candidature.reduce((a, { outfunds__Status__c }) => {
				a[outfunds__Status__c] = a[outfunds__Status__c] || {
					outfunds__Status__c,
					count: 0
				};
				a[outfunds__Status__c].count++;
				return a;
			}, Object.create(null))
		)
			.map((x) => x.outfunds__Status__c)
			.sort()
	);
	let filterStatoCandidatura = 'FINANZIATA';

	let statiProgettoOptions = ['Tutti gli stati del progetto'].concat(
		Object.values(
			data.candidature.reduce((a, { Stato_Progetto__c }) => {
				a[Stato_Progetto__c] = a[Stato_Progetto__c] || {
					Stato_Progetto__c,
					count: 0
				};
				a[Stato_Progetto__c].count++;
				return a;
			}, Object.create(null))
		)
			.map((x) => (x.Stato_Progetto__c ? x.Stato_Progetto__c : 'n.a.'))
			.sort()
	);
	let filterStatoProgetto = 'Tutti gli stati del progetto';

	let soloconavvisiaperti = false;
	let mops = calcolaMisureOptions();
	let misureOptions = mops;
	let filterMisure = mops[0]; // soloconavvisiaperti?'Tutte le misure':mops[0];

	function refreshFilters() {
		mops = calcolaMisureOptions();
		misureOptions = mops;
		filterMisure = mops[0]; // soloconavvisiaperti?'Tutte le misure':mops[0];
	}

	function calcolaMisureOptions() {
		let r = Object.values(
			data.misure
				.filter((m) => (soloconavvisiaperti ? m.avvisiAperti && m.avvisiAperti.length > 0 : true))
				.reduce((a, { Name }) => {
					a[Name] = a[Name] || {
						Name,
						count: 0
					};
					a[Name].count++;
					return a;
				}, Object.create(null))
		)
			.map((x) => x.Name)
			.sort();

		//if (!soloconavvisiaperti) {
		r = ['Tutte le misure'].concat(r);
		//}

		return r;
	}

	let contrattualizzazioneOptions = ['Contrattualizzazione'].concat(
		Object.values(
			data.candidature.reduce((a, { Stato_contrattualizzazione__c }) => {
				a[Stato_contrattualizzazione__c] = a[Stato_contrattualizzazione__c] || {
					Stato_contrattualizzazione__c,
					count: 0
				};
				a[Stato_contrattualizzazione__c].count++;
				return a;
			}, Object.create(null))
		)
			.map((x) => x.Stato_contrattualizzazione__c)
			.sort()
	);
	let filterContrattualizzazione = 'Contrattualizzazione';

	$: beneficiariOptions = ['Tutti i beneficiari'].concat(
		calcolaBeneficiari()
			.filter((item, index, arr) => arr.indexOf(item) === index)
			.sort()
	);
	let filterBeneficiari = 'Tutti i beneficiari';

	function calcolaBeneficiari() {
		let res = [];
		for (let z = 0; z < data.avvisi.length; z++) {
			res = res.concat(data.avvisi[z].beneficiari);
		}
		return res;
	}

	$: filteredCandidature = data.candidature
		.filter((x) =>
			filterAcm === 'All'
				? true
				: filterAcm === 'undefined'
					? x.outfunds__Applying_Organization__r.Account_Manager__c === null
					: x.outfunds__Applying_Organization__r.Account_Manager__c === filterAcm
		)
		.filter((x) =>
			filterMisure === 'Tutte le misure'
				? misureOptions.indexOf(x.Misura__c) > -1
				: x.Misura__c === filterMisure
		)
		.filter((x) => (filterRegioni === 'Tutte le regioni' ? true : x.Regione__c === filterRegioni))
		.filter((x) =>
			filterStatoCandidatura === 'Tutti gli stati della candidatura'
				? true
				: x.outfunds__Status__c === filterStatoCandidatura
		)
		.filter((x) =>
			filterStatoProgetto === 'n.a.'
				? !x.Stato_Progetto__c
				: filterStatoProgetto === 'Tutti gli stati del progetto'
					? true
					: x.Stato_Progetto__c === filterStatoProgetto
		)
		.filter((x) =>
			filterContrattualizzazione === 'Contrattualizzazione'
				? true
				: x.Stato_contrattualizzazione__c === filterContrattualizzazione
		)
		.filter((x) =>
			filterBeneficiari === 'Tutti i beneficiari'
				? true
				: data.enti.filter((e) => e.Id === x.outfunds__Applying_Organization__c)[0]
						.Tipologia_Ente__c === filterBeneficiari
		);

	let cperpage;
	let cp = 0;

	$: candidature = data.candidature;
</script>

<div class="container my-4">
	<h1>Cruscotto generale</h1>
	<Cite text="Più alto vola il gabbiano, e più vede lontano." author="Richard Bach" />
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
										<a class="nav-link active" href="#riepilogo">
											<span>1. Riepilogo </span>
										</a>
										<a class="nav-link" href="#contrattualizzazione">
											<span>2. Contrattualizzazione </span>
										</a>
										<a class="nav-link" href="#realizzazione">
											<span>3. Completamento attività </span>
										</a>
										<a class="nav-link active" href="#candidature">
											<span>4. Candidature </span>
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
			<div class="it-page-section my-5" id="riepilogo">
				<h4>Riepilogo</h4>
				<p>
					In questa sezione hai una visione generale del tuo portafoglio, con particolare attenzione
					alle fasi di <strong>contrattualizzazione</strong> e <strong>completamento</strong> delle attività.
				</p>
				<p>
					Puoi utilizzare i filtri di ricerca per identificare specificare candidature, visibili
					nell'apposita tabella nella sezione <a href="#candidature"> 4. Candidature. </a>
				</p>
				<div class="alert alert-primary" role="alert">
					Per le sezioni <a href="#contrattualizzazione">2. Contrattualizzazione</a> e
					<a href="#realizzazione">3. Completamento attività</a> il solo filtro attivo è quello della
					misura.
				</div>
				<p>
					Per avere dettagli sulle scadenze dei cronoprogrammi e sulle eventuali richieste di
					variazione, consulta la pagina <a href="/op/scadenze">Scadenze</a>
				</p>
			</div>
			<div class="sticky-top bg-white">
				{#if areaManager(data.utentestandard.idsf)}
					<div class="row my-6">
						<div class="col-12 col-lg-4 my-6">
							<div class="select-wrapper">
								<label for="filterAcm">Account Manager</label>
								<select id="filterAcm" name="filterAcm" bind:value={filterAcm}>
									{#each acmOptions as te}
										<option value={te.Id}>{te.Name}</option>
									{/each}
								</select>
							</div>
						</div>
					</div>
				{/if}
				<div class="row my-6">
					<div class="col-12 col-lg-4 my-4">
						<div class="form-check">
							<div class="toggles">
								<label for="soloAperti">
									Solo con avvisi aperti
									<input
										type="checkbox"
										id="soloAperti"
										bind:checked={soloconavvisiaperti}
										on:change={refreshFilters}
									/>
									<span class="lever"></span>
								</label>
							</div>
						</div>
					</div>

					<div class="col-12 col-lg-4 my-4">
						<div class="select-wrapper">
							<label for="filterMisura">Misure</label>
							<select id="filterMisura" name="filterMisura" bind:value={filterMisure}>
								{#each misureOptions as m}
									<option value={m}>{m}</option>
								{/each}
							</select>
						</div>
					</div>
					<div class="col-12 col-lg-4 my-4">
						<div class="select-wrapper">
							<label for="filterBeneficiari">Beneficiari</label>
							<select
								id="filterBeneficiari"
								name="filterBeneficiari"
								bind:value={filterBeneficiari}
							>
								{#each beneficiariOptions as m}
									<option value={m}>{m}</option>
								{/each}
							</select>
						</div>
					</div>
					<div class="col-12 col-lg-4 my-4">
						<div class="select-wrapper">
							<label for="filterStatoCandidatura">Stato candidatura</label>
							<select
								id="filterStatoCandidatura"
								name="filterStatoCandidatura"
								bind:value={filterStatoCandidatura}
							>
								{#each statoCandidaturaOptions as m}
									<option value={m}>{m}</option>
								{/each}
							</select>
						</div>
					</div>
					<div class="col-12 col-lg-4 my-4">
						<div class="select-wrapper">
							<label for="filterStatoProgetto">Stato progetto</label>
							<select
								id="filterStatoProgetto"
								name="filterStatoProgetto"
								bind:value={filterStatoProgetto}
							>
								{#each statiProgettoOptions as m}
									<option value={m}>{m}</option>
								{/each}
							</select>
						</div>
					</div>
					<div class="col-12 col-lg-4 my-4">
						<div class="select-wrapper">
							<label for="filterContrattualizzazione">Contrattualizzazione</label>
							<select
								id="filterContrattualizzazione"
								name="filterContrattualizzazione"
								bind:value={filterContrattualizzazione}
							>
								{#each contrattualizzazioneOptions as m}
									<option value={m}>{m}</option>
								{/each}
							</select>
						</div>
					</div>
				</div>
				<hr />
			</div>

			<div class="it-page-section my-5" id="contrattualizzazione">
				<h4>Contrattualizzazione</h4>
				<div class="row">
					{#each data.misure.filter( (x) => (filterMisure === misureOptions[0] ? true : x.Name === filterMisure) ) as m}
						{#if candidature.filter((x) =>
							filterAcm === 'All'
								? true
								: filterAcm === 'undefined'
									? x.outfunds__Applying_Organization__r.Account_Manager__c === null
									: x.outfunds__Applying_Organization__r.Account_Manager__c ===
										filterAcm
						).filter((x) => x.Misura__c === m.Name).length > 0}
							<div class="col-12 col-lg-4 my-4">
								<p>{m.Name}</p>
								<Gauge
									id="contr-{m.Id}"
									values={[
										['Label', 'Value'],
										[
											'',
											Math.round(
												(candidature
													.filter((x) =>
														filterAcm === 'All'
															? true
															: filterAcm === 'undefined'
																? x.outfunds__Applying_Organization__r.Account_Manager__c === null
																: x.outfunds__Applying_Organization__r.Account_Manager__c ===
																	filterAcm
													)
													.filter((x) => x.Misura__c === m.Name)
													.filter(
														(x) =>
															x.outfunds__Status__c === 'FINANZIATA' &&
															x.Stato_contrattualizzazione__c === 'Completata'
													).length /
													candidature
														.filter((x) =>
															filterAcm === 'All'
																? true
																: filterAcm === 'undefined'
																	? x.outfunds__Applying_Organization__r.Account_Manager__c === null
																	: x.outfunds__Applying_Organization__r.Account_Manager__c ===
																		filterAcm
														)
														.filter((x) => x.Misura__c === m.Name)
														.filter((x) => x.outfunds__Status__c === 'FINANZIATA').length) *
													100
											)
										]
									]}
									label={m.Name}
								/>
							</div>
						{/if}
					{/each}
				</div>
			</div>

			<div class="it-page-section my-5" id="realizzazione">
				<h4>Completamento attività</h4>
				<div class="row">
					{#each data.misure.filter( (x) => (filterMisure === misureOptions[0] ? true : x.Name === filterMisure) ) as m}
						{#if candidature.filter((x) =>
							filterAcm === 'All'
								? true
								: filterAcm === 'undefined'
									? x.outfunds__Applying_Organization__r.Account_Manager__c === null
									: x.outfunds__Applying_Organization__r.Account_Manager__c ===
										filterAcm
						).filter((x) => x.Misura__c === m.Name).length > 0}
							<div class="col-12 col-lg-4 my-4">
								<p>{m.Name}</p>
								<Gauge
									id="compl-{m.Id}"
									values={[
										['Label', 'Value'],
										[
											'',
											Math.round(
												(candidature
													.filter((x) =>
														filterAcm === 'All'
															? true
															: filterAcm === 'undefined'
																? x.outfunds__Applying_Organization__r.Account_Manager__c === null
																: x.outfunds__Applying_Organization__r.Account_Manager__c ===
																	filterAcm
													)
													.filter((x) => x.Misura__c === m.Name)
													.filter(
														(x) =>
															x.outfunds__Status__c === 'FINANZIATA' &&
															x.Stato_contrattualizzazione__c === 'Completata' &&
															('COMPLETATO' === x.Stato_Progetto__c ||
																'IN VERIFICA' === x.Stato_Progetto__c ||
																'IN LIQUIDAZIONE' === x.Stato_Progetto__c ||
																'LIQUIDATO' === x.Stato_Progetto__c)
													).length /
													candidature
														.filter((x) =>
															filterAcm === 'All'
																? true
																: filterAcm === 'undefined'
																	? x.outfunds__Applying_Organization__r.Account_Manager__c === null
																	: x.outfunds__Applying_Organization__r.Account_Manager__c ===
																		filterAcm
														)
														.filter((x) => x.Misura__c === m.Name)
														.filter((x) => x.outfunds__Status__c === 'FINANZIATA').length) *
													100
											)
										]
									]}
									label={m.Name}
								/>
							</div>
						{/if}
					{/each}
				</div>
			</div>

			<div class="it-page-section my-5" id="candidature">
				<h4>Candidature</h4>

				<div class="row">
					<div class="col-12 col-lg-12 my-4">
						<div class="container my-4">
							<div class="table-responsive">
								<table class="table table-hover table-sm caption-top align-middle">
									<caption>Candidature risultanti in base ai filtri impostati</caption>
									<thead>
										<tr>
											<th>Misura</th>
											<th>Regione</th>
											<th>Ente</th>
											<th>Valore</th>
											<th>Stato candidatura</th>
											<th>Stato progetto</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{#if cperpage}
											{#each cperpage as c}
												<tr>
													<td><small>{c.Misura__c}</small></td>
													<td><small>{c.Regione__c}</small></td>

													<td
														><small
															>{data.enti.filter(
																(x) => x.Id === c.outfunds__Applying_Organization__c
															)[0].Name}</small
														></td
													>
													<td><small>{euro(c.outfunds__Awarded_Amount__c)}</small></td>
													<td><small>{c.outfunds__Status__c}</small></td>
													<td><small>{c.Stato_Progetto__c}</small></td>
													<td>
														<a href="/op/candidatura/{c.Id}" target="_blank">
															<svg class="icon icon-sm icon-primary"
																><use href="/svg/sprites.svg#it-zoom-in"></use></svg
															>
														</a>
													</td>
												</tr>
											{/each}
										{/if}
									</tbody>

									<tfoot>
										<tr>
											<th colspan="7"
												><Pagination
													rows={filteredCandidature}
													bind:cp
													perPage={10}
													bind:trimmedRows={cperpage}
												/></th
											>
										</tr>
									</tfoot>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
