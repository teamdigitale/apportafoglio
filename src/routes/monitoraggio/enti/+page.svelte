<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import Cite from '$lib/c/cite.svelte';
	import Italymap from '$lib/c/map/italymap.svelte';
	import { euro, formatNumber, percentuale } from '$lib/js/shared.js';
	import Columnchart from './columnchart.svelte';
	import Scorecard from '$lib/c/scorecard.svelte';
	import People from '$lib/c/people/people.svelte';
	export let data;
	console.log(data);

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

	let soloAttivi = true;
	let soloBeneficiari = true;
	let selectedRegions = [];

	$: beneficiari = data.beneficiari;

	$: enti = data.enti
		.filter((e) => (soloAttivi ? e.Active__c === 1 : true))
		.filter((e) => (soloBeneficiari ? beneficiari.indexOf(e.Tipologia_Ente__c) !== -1 : true))
		.filter((e) =>
			selectedRegions.length === 0 ? true : selectedRegions.indexOf(e.Regione__c) > -1
		);

	$: candidature = data.candidature.filter((e) =>
		selectedRegions.length === 0 ? true : selectedRegions.indexOf(e.regione) > -1
	);

	$: popolazione = data.popolazione
		.filter((p) =>
			selectedRegions.length === 0 ? true : selectedRegions.indexOf(p.Territorio) > -1
		)
		.map(function (c) {
			return Number(c.Value);
		})
		.reduce(function (a, b) {
			return a + b;
		});

	$: popolazionePerFascia = (s) => {
		return Object.values(
			data.popolazione
				.filter((p) =>
					selectedRegions.length === 0 ? true : selectedRegions.indexOf(p.Territorio) > -1
				)
				.filter((p) =>
					p.Sesso === s
				)
				.reduce((a, b) => {
					a[b.Fascia] = a[b.Fascia] || {
						fascia: b.Fascia,
						count: 0
					};
					a[b.Fascia].count = a[b.Fascia].count+Number(b.Value);
					return a;
				}, Object.create(null))
		);
	}

	$: woman_popolazionePerFasciaLabels = popolazionePerFascia('femmine').map(function (c) {
			return c.fascia;
		});

		$: woman_popolazionePerFasciaValues = popolazionePerFascia('femmine').map(function (c) {
			return c.count;
		})

		$: man_popolazionePerFasciaLabels = popolazionePerFascia('maschi').map(function (c) {
			return c.fascia;
		});

		$: man_popolazionePerFasciaValues = popolazionePerFascia('maschi').map(function (c) {
			return c.count;
		})



	$: numerocandidature = data.candidature
		.filter((e) => (selectedRegions.length === 0 ? true : selectedRegions.indexOf(e.regione) > -1))
		.map(function (c) {
			return Number(c.numero_candidature);
		})
		.reduce(function (a, b) {
			return a + b;
		});

	$: totalefinanziato = data.candidature
		.filter((e) => (selectedRegions.length === 0 ? true : selectedRegions.indexOf(e.regione) > -1))
		.map(function (c) {
			return Number(c.importo_finanziato);
		})
		.reduce(function (a, b) {
			return a + b;
		});

	$: finanziatoProCapite = euro(totalefinanziato / popolazione);

	$: console.log('Popolazione: ' + popolazione + ' - Totale finanziato:' + totalefinanziato);

	$: totaleliquidatonetto = data.candidature
		.filter((e) => (selectedRegions.length === 0 ? true : selectedRegions.indexOf(e.regione) > -1))
		.filter((e) => e.stato_progetto === 'IN LIQUIDAZIONE' || e.stato_progetto === 'LIQUIDATO')
		.map(function (c) {
			return Number(c.importo_finanziato);
		})
		.reduce(function (a, b) {
			return a + b;
		});

	$: liqsufin = percentuale(1 - totaleliquidatonetto / totalefinanziato).replaceAll(',', '.');

	$: tipologieenti = Object.values(
		enti.reduce((a, { Tipologia_Ente__c }) => {
			a[Tipologia_Ente__c] = a[Tipologia_Ente__c] || {
				Tipologia_Ente__c,
				count: 0
			};
			a[Tipologia_Ente__c].count++;
			return a;
		}, Object.create(null))
	)
		.map((x) => x.Tipologia_Ente__c)
		.sort();

	$: tipologieentidata = [['Tipologia', 'Numero enti', { role: 'annotation' }]].concat(
		Object.values(
			enti.reduce((a, { Tipologia_Ente__c }) => {
				a[Tipologia_Ente__c] = a[Tipologia_Ente__c] || {
					Tipologia_Ente__c,
					count: 0
				};
				a[Tipologia_Ente__c].count++;
				return a;
			}, Object.create(null))
		)
			.sort((a, b) => {
				return a.count < b.count ? 1 : -1;
			})
			.map((x) => [
				x.Tipologia_Ente__c,
				x.count,
				'' + x.count + ' (' + percentuale(x.count / enti.length) + ')'
			])
	);

	$: statiProgetto = Object.values(
		data.candidature
			.filter((e) =>
				selectedRegions.length === 0 ? true : selectedRegions.indexOf(e.regione) > -1
			)
			.reduce((a, { stato_progetto }) => {
				a[stato_progetto] = a[stato_progetto] || {
					stato_progetto,
					count: 0
				};
				a[stato_progetto].count++;
				return a;
			}, Object.create(null))
	).map((x) => x.stato_progetto);

	$: calcolaprogetti = () => {
		const res = [[]];
		res[0] = ['Stato progetto'].concat(statiProgetto).concat({ role: 'annotation' });
		tipologieenti.forEach((te, index) => {
			res.push([]);
			res[index + 1][0] = te;
			for (let z = 0; z < statiProgetto.length; z++) {
				res[index + 1][z + 1] = candidature
					.filter((c) => c.tipologia_ente === te)
					.filter((c) => c.stato_progetto === statiProgetto[z])
					.map(function (c) {
						return Number(c.importo_finanziato);
					})
					.reduce(function (a, b) {
						return a + b;
					}, 0);
			}
			res[index + 1][statiProgetto.length + 1] = euro(
				candidature
					.filter((c) => c.tipologia_ente === te)
					.map(function (c) {
						return Number(c.importo_finanziato);
					})
					.reduce(function (a, b) {
						return a + b;
					}, 0)
			);
		});
		return res;
	};

	$: progetti = calcolaprogetti();
</script>

<div class="container my-4">
	<h1>Board enti</h1>
	<Cite
		text="Niente è possibile senza gli uomini, e niente dura senza le istituzioni."
		author="Jean Monnet"
	/>
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
										<a class="nav-link active" href="#entipertipologia">
											<span>2. Enti per tipologia </span>
										</a>
										<a class="nav-link active" href="#distribuzionefinanziamenti">
											<span>3. Distribuzione finanziamenti </span>
										</a>
										<a class="nav-link active" href="#cittadino">
											<span>4. Cittadino </span>
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
				<h4>Riepilogo</h4>
				<div class="row">
					<div class="col-12 col-lg-3 my-4">
						<Scorecard
							title={formatNumber(enti.length)}
							text="Numero enti"
							bgcolor="secondary"
							textcolor="white"
						/>
					</div>
					<div class="col-12 col-lg-3 my-4">
						<Scorecard
							title={formatNumber(numerocandidature)}
							text="Numero candidature finanziate"
							bgcolor="secondary"
							textcolor="white"
						/>
					</div>
					<div class="col-12 col-lg-3 my-4">
						<Scorecard
							title={euro(totalefinanziato)}
							text="Totale finanziato"
							bgcolor="primary"
							textcolor="white"
						/>
					</div>
					<div class="col-12 col-lg-3 my-4">
						<Scorecard
							title={formatNumber(totaleliquidatonetto)}
							text="Liquidate o in liquidazione"
							bgcolor="success"
							textcolor="white"
						/>
					</div>
				</div>
			</div>
			<hr />
			<div class="it-page-section my-5" id="entipertipologia">
				<h4>Numero enti per tipologia</h4>
				<div class="row">
					<div class="col-12 col-lg-12">
						<Columnchart
							id="tipologieenti"
							values={tipologieentidata}
							stacked={false}
							legendPosition="none"
						/>
					</div>
				</div>
			</div>
			<hr />
			<div class="it-page-section my-5" id="distribuzionefinanziamenti">
				<h4>Distribuzione finanziamenti</h4>
				<div class="row">
					<div class="col-12 col-lg-12">
						<Columnchart
							id="tipologieenti-stati"
							values={progetti}
							stacked={'percent'}
							legendPosition="bottom"
						/>
					</div>
				</div>
			</div>
			<hr />
			<div class="it-page-section my-5" id="cittadino">
				<h4>Cittadino</h4>
				<div class="row">
					<div class="col-12 col-lg-6">
						<People
						
							id="finpercittadini"
							manlabels={man_popolazionePerFasciaLabels}
							manvalues={man_popolazionePerFasciaValues}
							womanlabels={woman_popolazionePerFasciaLabels}
							womanvalues={woman_popolazionePerFasciaValues}
						/>
					</div>
					<div class="col-12 col-lg-6">
						<h5>Popolazione</h5>
						<h6>{formatNumber(popolazione)}</h6>
						<h5>Finanziamento medio pro-capite</h5>
						<h6>{euro(totalefinanziato/popolazione)}</h6>
						<h5>Numero medio di servizi pro-capite</h5>
						<h6>n.d.</h6>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
