<script>
	import Cite from '$lib/c/cite.svelte';

	export let data;
	import { onMount } from 'svelte';
	import Scorefornitori from './scorefornitori.svelte';
	import Pagination from '$lib/c/pagination.svelte';
	import { euro } from '$lib/js/shared';
	import Treemap from './treemap.svelte';
	import { setscroll } from '$lib/js/shared.js';

	let cperpage;
	let cp = 0;

	onMount(async () => {
		await setscroll();
	});

	$: calcola = () => {
		let aa = data.misure;
		for (let z = 0; z < data.misure.length; z++) {
			aa[z].conteggioFornitori = [];
			aa[z].valoreFornitori = [];

			for (let y = 0; y < aa[z].avvisi.length; y++) {
				let ccc = aa[z].avvisi[y].candidature;

				for (let x = 0; x < ccc.length; x++) {
					if (ccc[x].fornitori && ccc[x].fornitori.length > 0) {
						for (let w = 0; w < ccc[x].fornitori.length; w++) {
							let cc = aa[z].conteggioFornitori.filter(
								(a) => a.nome === ccc[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c
							);

							if (cc && cc.length > 0) {
								aa[z].conteggioFornitori.filter(
									(a) => a.nome === ccc[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c
								)[0].count =
									aa[z].conteggioFornitori.filter(
										(a) => a.nome === ccc[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c
									)[0].count + 1;
							} else {
								aa[z].conteggioFornitori.push({
									nome: ccc[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c,
									count: 1
								});
							}
							let ss = aa[z].valoreFornitori.filter(
								(a) => a.nome === ccc[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c
							);
							if (ss && ss.length > 0) {
								aa[z].valoreFornitori.filter(
									(a) => a.nome === ccc[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c
								)[0].value =
									aa[z].valoreFornitori.filter(
										(a) => a.nome === ccc[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c
									)[0].value + ccc[x].outfunds__Awarded_Amount__c;
							} else {
								aa[z].valoreFornitori.push({
									nome: ccc[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c,
									value: ccc[x].outfunds__Awarded_Amount__c
								});
							}
						}
					}
				}
			}

			aa[z].conteggioFornitori = aa[z].conteggioFornitori.sort((a, b) => {
				return b.count - a.count;
			});
			aa[z].valoreFornitori = aa[z].valoreFornitori.sort((a, b) => {
				return b.value - a.value;
			});
		}
		return aa;
	};

	$: calcolaCandidature = () => {
		let aa = data.misure;
		let result = [];
		for (let z = 0; z < data.misure.length; z++) {
			for (let y = 0; y < aa[z].avvisi.length; y++) {
				let ccc = aa[z].avvisi[y].candidature;
				result = result.concat(ccc);
			}
		}
		if (filterMisure !== misureOptions[0]) {
			result = result.filter((x) => x.Misura__c === filterMisure);
		}
		if (filterProgetto !== progettoOptions[0]) {
			result = result.filter((x) => x.Stato_Progetto__c === filterProgetto);
		}
		if (filterFornitore !== fornitoriOptions[0]) {
			result = result.filter(
				(x) =>
					x.fornitori.filter((f) => f.Denominazione_Soggetto_Realizzatore__c === filterFornitore)
						.length > 0
			);
		}

		return result;
	};

	let misureOptions = ['Tutte le misure'].concat(
		Object.values(
			data.misure.reduce((a, { Name }) => {
				a[Name] = a[Name] || {
					Name,
					count: 0
				};
				a[Name].count++;
				return a;
			}, Object.create(null))
		)
			.map((x) => x.Name)
			.sort()
	);
	let filterMisure = misureOptions[0];

	let progettoOptions = ['Tutti gli stati progetto'].concat(
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
			.map((x) => x.Stato_Progetto__c)
			.sort()
	);
	let filterProgetto = progettoOptions[0];

	let fornitoriOptions = ['Tutti i fornitori'].concat(data.nomiFornitori);
	let filterFornitore = fornitoriOptions[0];

	$: items = calcola();

	$: cand = calcolaCandidature();

	$: calcolaDatiPerDistribuzione = () => {
		let aa = data.misure;
		let r = [];
		for (let z = 0; z < data.misure.length; z++) {
			for (let y = 0; y < aa[z].avvisi.length; y++) {
				let ccc = aa[z].avvisi[y].candidature;
				r = r.concat(ccc);
			}
		}
		let result = [];

		result.push(['Label', 'Parent', 'Numero', 'Valore']);
		result.push(['Soggetti realizzatori', null, 0, 0]);
		data.nomiFornitori.forEach((f) => {
			let tot = 0;
			let value = 0;
			const cands = r.filter(
				(c) =>
					c.fornitori.filter((ff) => ff.Denominazione_Soggetto_Realizzatore__c === f).length > 0
			);
			tot = tot + cands.length;
			value = value + cands.reduce((acc, o) => acc + parseInt(o.outfunds__Awarded_Amount__c), 0);
			result.push([f, 'Soggetti realizzatori', tot, value]);
			if (cands.length > 0) {
				const misure = Object.values(
					cands.reduce((a, { Misura__c }) => {
						a[Misura__c] = a[Misura__c] || {
							Misura__c,
							count: 0
						};
						a[Misura__c].count++;
						return a;
					}, Object.create(null))
				)
					.map((x) => x.Misura__c)
					.sort();

				misure.forEach((m) => {
					let totmisure = 0;
					let valueMisure = 0;
					const candsMisure = cands.filter((c) => c.Misura__c === m);
					totmisure = totmisure + candsMisure.length;
					valueMisure =
						valueMisure +
						candsMisure.reduce((acc, o) => acc + parseInt(o.outfunds__Awarded_Amount__c), 0);
					result.push([m + '-' + f, f, totmisure, valueMisure]);
				});
			}
		});

		return result;
	};
</script>

<div class="container my-4">
	<h1>Soggetti realizzatori</h1>
	<Cite text="Sembra sempre impossibile fino a quando non è fatto." author="Nelson Mandela" />
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
										<a class="nav-link" href="#principalifornitori">
											<span>2. Principali fornitori </span>
										</a>
										<a class="nav-link" href="#distribuzione">
											<span>3. Distribuzione </span>
										</a>
										<a class="nav-link" href="#candidature">
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
					In questa sezione hai una visione dei soggetti realizzatori per le candidature
					appartenenti al tuo portafoglio.
				</p>
			</div>
			<div class="it-page-section my-5" id="principalifornitori">
				<h4>Principali fornitori</h4>
				<p>
					In questa sezione, per ogni misura, sono mostrati i principali fornitori, sia per numero
					di candidature sia per valore totale.
				</p>
				<div class="row my-6">
					{#each items.filter((m) => m.avvisi.filter((a) => a.candidature.length > 0)) as misura}
						{#if misura.conteggioFornitori.length > 0}
							<div class="col-12 col-lg-6 my-4">
								<Scorefornitori {misura} />
							</div>
						{/if}
					{/each}
				</div>
			</div>
			<div class="it-page-section my-5" id="distribuzione">
				<h4>Distribuzione totale</h4>
				<p>
					In questa sezion puoi visualizzare la distribuzione globale dei fornitori per <strong
						>numero di candidure</strong
					>
					e per <strong>valore</strong>.
				</p>
				<div class="alert alert-primary" role="alert">
					L'area dei rettangoli rappresenta il numero di candidature pesate sul totale mentre il
					colore rappresenta il valore delle candidature pesate sul totale.
				</div>
				<Treemap values={calcolaDatiPerDistribuzione()} />
			</div>

			<div class="it-page-section my-5" id="candidature">
				<h4>Candidature</h4>
				<div class="sticky-top bg-white">
					<div class="row">
						<div class="col-12 col-lg-4 my-4">
							<div class="select-wrapper">
								<label for="filterFornitore">Fornitore</label>
								<select id="filterFornitore" name="filterFornitore" bind:value={filterFornitore}>
									{#each fornitoriOptions as m}
										<option value={m}>{m}</option>
									{/each}
								</select>
							</div>
						</div>
						<div class="col-12 col-lg-4 my-4">
							<div class="select-wrapper">
								<label for="filterMisura">Misura</label>
								<select id="filterMisura" name="filterMisura" bind:value={filterMisure}>
									{#each misureOptions as m}
										<option value={m}>{m}</option>
									{/each}
								</select>
							</div>
						</div>
						<div class="col-12 col-lg-4 my-4">
							<div class="select-wrapper">
								<label for="filterProgetto">Stato progetto</label>
								<select id="filterProgetto" name="filterProgetto" bind:value={filterProgetto}>
									{#each progettoOptions as m}
										<option value={m}>{m}</option>
									{/each}
								</select>
							</div>
						</div>
					</div>
					<hr />
				</div>
				<div class="container my-4">
					<div class="table-responsive">
						<table class="table table-hover table-sm caption-top align-middle">
							<caption>Candidature risultanti in base ai filtri impostati</caption>
							<thead>
								<tr>
									<th>Misura</th>
									<th>Ente</th>
									<th>Valore</th>
									<th>Stato progetto</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{#if cperpage}
									{#each cperpage as c}
										<tr>
											<td>
												<small>{c.Misura__c}</small>
											</td>
											<td
												><small
													>{data.enti.filter(
														(e) => e.Id === c.outfunds__Applying_Organization__c
													)[0].Name}</small
												></td
											>

											<td><small>{euro(c.outfunds__Awarded_Amount__c)}</small></td>

											<td><small>{c.Stato_Progetto__c}</small></td>

											<td
												><small
													><a href="/op/candidatura/{c.Id}" target="_blank">
														<svg class="icon icon-sm icon-primary"
															><use href="/svg/sprites.svg#it-zoom-in"></use></svg
														>
													</a></small
												></td
											>
										</tr>
									{/each}
								{/if}
							</tbody>
							<tfoot>
								<tr>
									<th colspan="5"
										><Pagination rows={cand} bind:cp perPage={10} bind:trimmedRows={cperpage} /></th
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
