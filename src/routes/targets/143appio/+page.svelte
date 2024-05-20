<script>
	import Scorecard from '$lib/c/scorecard.svelte';
	import { formatNumber } from '$lib/js/shared.js';
	import moment from 'moment/min/moment-with-locales';
	import { onMount } from 'svelte';
	moment.locale('it');

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

	export let data;
	let serviziPerTipologiaEnte = Object.values(
		data.servizi.reduce((a, { tipologia_ente }) => {
			a[tipologia_ente] = a[tipologia_ente] || {
				tipologia_ente,
				count: 0
			};
			a[tipologia_ente].count++;
			return a;
		}, Object.create(null))
	);

	const dataBaseLine = new Date(2021, 3, 1);

	let baseline = data.servizi.filter((s) => new Date(s.Data_Attivazione__c) <= dataBaseLine);
	let baselinePerTipologiaEnte = Object.values(
		baseline.reduce((a, { tipologia_ente }) => {
			a[tipologia_ente] = a[tipologia_ente] || {
				tipologia_ente,
				count: 0
			};
			a[tipologia_ente].count++;
			return a;
		}, Object.create(null))
	);

	let entiBaseLine = data.enti.filter(
		(e) => baseline.filter((b) => b.Ente__r.Id === e.Id).length > 0
	);
	let entiBaseLinePerTipologiaEnte = Object.values(
		entiBaseLine.reduce((a, { tipologia_ente }) => {
			a[tipologia_ente] = a[tipologia_ente] || {
				tipologia_ente,
				count: 0
			};
			a[tipologia_ente].count++;
			return a;
		}, Object.create(null))
	);

	let entiAttauliPerTipologiaEnte = Object.values(
		data.enti.reduce((a, { tipologia_ente }) => {
			a[tipologia_ente] = a[tipologia_ente] || {
				tipologia_ente,
				count: 0
			};
			a[tipologia_ente].count++;
			return a;
		}, Object.create(null))
	);

	let percentualeIncremento = 20;
	let serviziMediPerTipologia = [
		{ tipologia: 'Comuni', valore: 30 },
		{ tipologia: 'Scuole', valore: 15 },
		{ tipologia: 'Regioni', valore: 10 }
	];
</script>

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
								<!--
								<h3>Filtri</h3>
								<div class="form-check">
									<div class="toggles">
										<label for="soloAperti">
											Solo enti attivi
											<input type="checkbox" id="soloAperti" bind:checked={soloAttivi} />
											<span class="lever"></span>
										</label>
									</div>
								</div>
								<div class="form-check">
									<div class="toggles">
										<label for="soloBeneficiari">
											Solo enti beneficiari di avvisi
											<input type="checkbox" id="soloBeneficiari" bind:checked={soloBeneficiari} />
											<span class="lever"></span>
										</label>
									</div>
								</div>
								<Italymap bind:selectedRegions />
                                -->
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
										<a class="nav-link active" href="#baseline">
											<span>1. Baseline </span>
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link active" href="#target">
											<span>2. Target </span>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</div>
		<div class="col-12 col-lg-9 it-page-sections-container">
			<div class="it-page-section my-5" id="riepilogo">
				<h4>Baseline</h4>
				<div class="row">
					<div class="col-12 col-lg-12 my-4">
						<p>
							La baseline rappresenta la base di riferimento per il calcolo del target, in funzione
							della data di valutazione definita
						</p>
						<p>
							Data per il calcolo della baseline: {moment(dataBaseLine).format('DD/MM/YYYY')}
						</p>
					</div>
				</div>
				<div class="row">
					<div class="col-12 col-lg-3 my-4">
						<Scorecard
							title={formatNumber(entiBaseLine.length)}
							text="Numero enti in baseline"
							bgcolor="secondary"
							textcolor="white"
						/>
					</div>
					<div class="col-12 col-lg-9 my-4">
						<h6>Distribuzione enti per tipologia ente:</h6>
						<ul>
							{#each entiBaseLinePerTipologiaEnte as ebpte}
								<li>{ebpte.tipologia_ente}: {ebpte.count}</li>
							{/each}
						</ul>
					</div>
				</div>
				<div class="row">
					<div class="col-12 col-lg-3 my-4">
						<Scorecard
							title={formatNumber(baseline.length)}
							text="Numero servizi in baseline"
							bgcolor="secondary"
							textcolor="white"
						/>
					</div>
					<div class="col-12 col-lg-9 my-4">
						<h6>Distribuzione servizi per tipologia ente:</h6>
						<ul>
							{#each baselinePerTipologiaEnte as bpte}
								<li>{bpte.tipologia_ente}: {bpte.count}</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
			<hr />
			<div class="it-page-section my-5" id="target">
				<h4>Definizione del target</h4>
				<div class="row">
					<div class="col-12 col-lg-6 my-4">
						<div>
							<div class="form-group">
								<label for="percentualeIncremento" class="input-number-label active"
									>Incremento percentuale del numero di servizi</label
								>
								<div class="input-group input-number input-number-percentage">
									<span class="input-group-text fw-semibold">%</span>
									<input
										type="number"
										class="form-control"
										data-bs-input
										id="percentualeIncremento"
										name="percentualeIncremento"
										bind:value={percentualeIncremento}
										min="5"
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
					</div>
					<div class="col-12 col-lg-6 my-4">
                        {#each serviziMediPerTipologia as smpt,index}
                        <div>
							<div class="form-group">
								<label for="m_{smpt.tipologia}" class="input-number-label active"
									>Numero di servizi medi per tipologia {smpt.tipologia}</label
								>
								<div class="input-group input-number">
									<input
										type="number"
										class="form-control"
										data-bs-input
										id="m_{smpt.tipologia}"
										name="m_{smpt.tipologia}"
										bind:value={serviziMediPerTipologia[index].valore}
										min="1"
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
                        {/each}
                        
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!--
<p>
	Numero totale servizi in baseline: {baseline.length}
</p>

<hr/>
<p>Enti appartenenti alla baseline: {entiBaseLine.length}</p>
<p>Distribuzione enti baseline per tipologia ente:</p>
<ul>
	{#each entiBaseLinePerTipologiaEnte as ebpte}
		<li>{ebpte.tipologia_ente}: {ebpte.count} - Numero medio servizi {(baselinePerTipologiaEnte.filter(e => e.tipologia_ente===ebpte.tipologia_ente)[0].count/ebpte.count).toFixed(2)}</li>
	{/each}
</ul>

<hr/>
<p>
	Numero totale servizi attuale: {data.servizi.length}
</p>
<p>Distribuzione attuale per tipologia ente:</p>
<ul>
	{#each serviziPerTipologiaEnte as bpte}
		<li>{bpte.tipologia_ente}: {bpte.count}</li>
	{/each}
</ul>
<hr/>
<p>Distribuzione per tipologia ente:</p>
<ul>
	{#each entiAttauliPerTipologiaEnte as spte}
		<li>{spte.tipologia_ente}: {spte.count} - Numero medio servizi {(serviziPerTipologiaEnte.filter(e => e.tipologia_ente===spte.tipologia_ente)[0].count/spte.count).toFixed(2)}</li>
	{/each}
</ul>
<hr/>
-->
