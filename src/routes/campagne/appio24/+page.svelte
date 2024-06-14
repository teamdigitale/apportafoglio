<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { formatDate, percentuale } from '$lib/js/shared.js';
	import { dipendenze12, dipendenze141, dipendenzepagopa } from './dipendenze.js';
	import { stringSimilarity } from 'string-similarity-js';


	$: snappioProvincia = [];
	$: snappioRegione =[];
	$: snappioNazionale = [];

	export let data;
	onMount(async () => {
		await setscroll();
		/*
		const response = await fetch("/snappio.json");
  		const snappio = await response.json();
		   snappioProvincia = d3.rollup(
		snappio,
		(D) => D.length,
		(d) => d.codice,
		(d) => d.regione,
		(d) => d.provincia
	);
	snappioRegione = d3.rollup(
		snappio,
		(D) => D.length,
		(d) => d.codice,
		(d) => d.regione
	);
	snappioNazionale = d3.rollup(
		snappio,
		(D) => D.length,
		(d) => d.codice
	);
	*/
		//await setpopover();
	});

	const stringSimilar = (a, b) => _stringSimilar(prep(a), prep(b));

	const _stringSimilar = (a, b) => {
		const bg1 = bigrams(a);
		const bg2 = bigrams(b);
		const c1 = count(bg1);
		const c2 = count(bg2);
		const combined = uniq([...bg1, ...bg2]).reduce(
			(t, k) => t + Math.min(c1[k] || 0, c2[k] || 0),
			0
		);
		return (2 * combined) / Math.max(bg1.length + bg2.length, 1);
	};

	const prep = (
		str // TODO: unicode support?
	) =>
		str
			.toLowerCase()
			.replace(/[^\w\s]/g, ' ')
			.replace(/\s+/g, ' ');

	const bigrams = (str) => [...str].slice(0, -1).map((c, i) => c + str[i + 1]);

	const count = (xs) => xs.reduce((a, x) => ((a[x] = (a[x] || 0) + 1), a), {});

	const uniq = (xs) => [...new Set(xs)];

	const setscroll = async () => {
		var navscrollElement = document.querySelector('.it-navscroll-wrapper');
		var navscroll = bootstrap.NavScroll.getOrCreateInstance(navscrollElement);
		navscroll.setScrollPadding(function () {
			var header = document.querySelector('.it-header-wrapper');
			return header.offsetHeight + 10;
		});
	};

	let popover;

	const setpopover = async (id) => {
		popover = new bootstrap.Popover(document.querySelector('#' + id), { sanitize: false });
	};

	const disposepopover = async (id) => {
		popover.dispose();
	};

	$: filterCategoria = '';

	$: mostraSoloCandidabili = false;

	$: mostraSoloNonAttivi = false;

	const fattoriOk = (c) => {
		
		let s = '';
		let numero = 0;
		/*
		if(snappioNazionale.length>0&&snappioRegione.length>0&&snappioProvincia.length>0){
		const percNazionale = !snappioNazionale.get(c)
			? 0
			: snappioNazionale.get(c) / data.allEnti.length;
		const percRegionale = !(
			snappioRegione.get(c) && snappioRegione.get(c).get(regioneEnte)
		)
			? 0
			: snappioRegione.get(c).get(regioneEnte) /
				data.allEnti.filter((x) => x.Regione__c === regioneEnte).length;
		const percProvinciale = !(
			snappioProvincia.get(c) &&
			snappioProvincia.get(c).get(regioneEnte) &&
			snappioProvincia.get(c).get(regioneEnte).get(provinciaEnte)
		)
			? 0
			: snappioProvincia.get(c).get(regioneEnte).get(provinciaEnte) /
				data.allEnti.filter((x) => x.ShippingState === provinciaEnte).length;
		if (percNazionale > 0.5 || percRegionale > 0.5 || percProvinciale > 0.5) {
			s = s + '<p><strong><small>Presenza sul territorio</small></strong></p>';
			s = s + '<ul>';
			if (percNazionale > 0.5) {
				s = s + '<li><small>' + percentuale(percNazionale) + ' della nazione</small></li>';
				numero++;
			}
			if (percRegionale > 0.5) {
				s = s + '<li><small>' + percentuale(percRegionale) + ' della regione</small></li>';
				numero++;
			}
			if (percProvinciale > 0.5) {
				s = s + '<li><small>' + percentuale(percProvinciale) + ' della provincia</small></li>';
				numero++;
			}
			s = s + '</ul>';
		}}
		*/

		const dip12 = dipendenze12
			.filter((s) => s.codici.indexOf(c) !== -1)
			.filter(
				(s) =>
					data.candidature12.filter(
						(c) =>
							c.Candidatura__r.outfunds__Applying_Organization__c === selectedComune &&
							c.Name === s.servizio
					).length > 0
			);
		if (dip12.length > 0) {
			s = s + '<p><strong><small>Servizi 1.2</small></strong></p>';
			s = s + '<ul>';
			dip12.forEach((x) => {
				s = s + '<li><small>';
				s = s + x.servizio;
				s = s + '</small></li>';
				numero = numero + 5;
			});
			s = s + '</ul>';
		}

		const dip141 = dipendenze141
			.filter((s) => s.codici.indexOf(c) !== -1)
			.filter(
				(s) =>
					data.candidature141.filter(
						(c) =>
							c.Candidatura__r.outfunds__Applying_Organization__c === selectedComune &&
							c.Name.toUpperCase() === s.servizio.toUpperCase()
					).length > 0
			);
		if (dip141.length > 0) {
			s = s + '<p><strong><small>Servizi 1.4.1</small></strong></p>';
			s = s + '<ul>';
			dip141.forEach((x) => {
				s = s + '<li><small>';
				s = s + x.servizio;
				s = s + '</small></li>';
				numero = numero + 5;
			});
			s = s + '</ul>';
		}

		const dippagopa = dipendenzepagopa
			.filter((s) => s.codici.indexOf(c) !== -1)
			.filter(
				(s) =>
					data.candidaturepagopa.filter(
						(c) =>
							c.Candidatura__r.outfunds__Applying_Organization__c === selectedComune &&
							c.Name.toUpperCase() === s.servizio.toUpperCase()
					).length > 0
			);
		if (dippagopa.length > 0) {
			s = s + '<p><strong><small>Servizi 1.4.3 PagoPA</small></strong></p>';
			s = s + '<ul>';
			dippagopa.forEach((x) => {
				s = s + '<li><small>';
				s = s + x.servizio;
				s = s + '</small></li>';
				numero = numero + 5;
			});
			s = s + '</ul>';
		}

		const sc = filteredServiziInCandidature.find(
			(x) => x.codice_catalogo_attribuito_143appIO__c === c
		);
		if (!sc) {
			const sa = serviziAttivi.filter((sa) => sa.Codice_Catalogo_Attribuito__c === c);
			if (sa.length === 1) {
				if (sa[0].dataAttivazioneAmmissibile) {
					if (!sa[0].Fondo_Innovazione__c) {
						s = s + '<p><strong><small>Servizio già attivo</small></strong></p>';
						numero++;
					}
				}
			}
		}

		return { n: numero, t: s };
	};

	const fattoriKo = (c, n, fam) => {
		let s = '';
		let numero = 0;
		const categorieAltro = [];
		const altrofam = data.serviziAttivi.filter(
			(x) =>
				x.Ente__c === selectedComune &&
				x.Argomento__c === fam &&
				x.Nome_Servizio__c.toUpperCase().indexOf('ALTRO') > -1
		);
		if (altrofam.length > 0) {
			s =
				s +
				'<p><strong><small>Ci sono ' +
				altrofam.length +
				' servizi già attivi della stessa categoria categorizzati come "altro":</small></strong></p>';
			s = s + '<ul>';
			altrofam.forEach((x) => {
				s = s + '<li><small>' + x.Descrizione_Servizio__c + '</small></li>';
				numero++;
			});
			s = s + '</ul>';
		}

		const altrofamCand = data.candidature.filter(
			(x) =>
				x.Candidatura__r.outfunds__Applying_Organization__c === selectedComune &&
				x.argomento_attribuito_143appIO__c === fam &&
				x.codice_catalogo_attribuito_143appIO__c.endsWith('000') &&
				data.serviziAttivi.filter(
					(xx) => xx.Ente__c === selectedComune && xx.Codice_Servizio__c === x.Codice_Servizio__c
				).length === 0
		);
		if (altrofamCand.length > 0) {
			s =
				s +
				'<p><strong><small>Ci sono ' +
				altrofamCand.length +
				' servizi già candidati della stessa categoria categorizzati come "altro":</small></strong></p>';
			s = s + '<ul>';
			altrofamCand.forEach((x) => {
				s = s + '<li><small>' + x.Name + '</small></li>';
				numero++;
			});
			s = s + '</ul>';
		}

		const simili = [];
		data.serviziAttivi
			.filter((x) => x.Ente__c === selectedComune)
			.forEach((sa) => {
				if (sa.Codice_Catalogo_Attribuito__c.endsWith('000')) {
					if (
						stringSimilarity(n, sa.Descrizione_Servizio__c) >= 0.39 &&
						stringSimilar(n, sa.Descrizione_Servizio__c) >= 0.39 &&
						fam === sa.Argomento__c
						//&& sa.Nome_Servizio__c.toUpperCase().indexOf("ALTRO") > -1
					) {
						//s = s + '<p><strong>Servizio simile a ' + sa.Descrizione_Servizio__c + '</strong></p>';
						simili.push(sa.Descrizione_Servizio__c);
						numero++;
					}
				}
			});
		if (simili.length > 0) {
			s = s + '<p><strong>Servizi simili</strong></p>';
			s = s + '<ul>';
			simili.forEach((sim) => {
				s = s + '<li><small>' + sim + '</small></li>';
			});
			s = s + '</ul>';
		}

		return { n: numero, t: s };
	};

	$: servizi = data.serviziACatalogo
		.map((x) => ({
			...x,
			candidabile: candidabile(x),
			fattoriok: fattoriOk(x.Anagrafica_Servizi__r.Codice_Tassonomico__c),
			fattoriko: fattoriKo(
				x.Anagrafica_Servizi__r.Codice_Tassonomico__c,
				x.Name,
				x.Anagrafica_Servizi__r.Categoria__c
			)
		}))
		.filter((x) => (mostraSoloCandidabili ? x.candidabile.startsWith('SI') : true))
		.filter((x) => (mostraSoloNonAttivi ? (x.candidabile.startsWith('SI - Già attivo')===false) : true))
		;

	$: catalogoPerCategoria = d3.group(servizi, (d) => d.Anagrafica_Servizi__r.Categoria__c);

	$: selectedComune = '';

	$: serviziAttivi = data.serviziAttivi
		.filter(
			(x) =>
				x.Ente__c === selectedComune &&
				(filterCategoria === ''
					? true
					: x.Argomento__c === filterCategoria || x.Argomento__c === 'Altro')
		)
		.map((x) => ({
			...x,
			dataAttivazioneAmmissibile: servizioAttivatoNeiTermini(new Date(x.Data_Attivazione__c))
		}));

	$: filteredServiziInCandidature = data.candidature.filter(
		(x) =>
			x.Candidatura__r.outfunds__Applying_Organization__c === selectedComune &&
			(filterCategoria === ''
				? true
				: x.argomento_attribuito_143appIO__c === filterCategoria ||
					x.argomento_attribuito_143appIO__c === 'Altro')
	);

	$: serviziCandidatureAttive = d3.group(
		filteredServiziInCandidature,
		(d) => d.Candidatura__r.outfunds__FundingProgram__r.Name
	);

	const dateAfter = (d1, d2) => {
		if (d2.getTime() > d1.getTime()) return false;
		else return true;
	};

	const servizioAttivatoNeiTermini = (d) => {
		const dataMinima = new Date(2021, 3, 1);
		if (dateAfter(dataMinima, d)) return false;
		else return true;
	};

	$: candidabile = (s) => {
		const sc = filteredServiziInCandidature.find(
			(x) =>
				x.codice_catalogo_attribuito_143appIO__c === s.Anagrafica_Servizi__r.Codice_Tassonomico__c
		);
		if (sc) {
			return 'NO - Già candidato';
		}

		const sa = serviziAttivi.filter(
			(sa) => sa.Codice_Catalogo_Attribuito__c === s.Anagrafica_Servizi__r.Codice_Tassonomico__c
		);
		if (sa.length === 0) {
			return 'SI';
		}
		if (sa.length === 1) {
			if (sa[0].dataAttivazioneAmmissibile) {
				if (sa[0].Fondo_Innovazione__c) {
					return 'NO - Fondo innovazione';
				} else {
					return 'SI - Già attivo';
				}
			} else {
				return 'NO - Servizio attivo avviato prima del 1 aprile 2021';
			}
		}
		if (sa.length > 1) {
			if (sa.filter((x) => x.Fondo_Innovazione__c).length > 1) {
				return (
					'NO - Esiste almeno un servizio con codice ' +
					s.Anagrafica_Servizi__r.Codice_Tassonomico__c +
					' realizzato con fondo innovazione'
				);
			}
			return 'SI, ma vanno rimossi ' + sa.length + ' servizi';
		}
		return 'SI';
	};

	$: regioneEnte = data.enti.find((x) => x.Id === selectedComune)
		? data.enti.find((x) => x.Id === selectedComune).Regione__c
		: '';
	$: provinciaEnte = data.enti.find((x) => x.Id === selectedComune)
		? data.enti.find((x) => x.Id === selectedComune).ShippingState
		: '';

	$: okColorScale = d3.scaleLinear().domain([1, 5]).range(['#cbf5e6', '#058256']).clamp(true);

	$: koColorScale = d3.scaleLinear().domain([1, 5]).range(['#f5d29f', '#cc7a00']).clamp(true);
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
						<span class="it-list"></span>1. Menu
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
										<a class="nav-link" href="#informativaavviso">
											<span>0. Informativa avviso </span>
										</a>
										<a class="nav-link" href="#selezioneComune">
											<span>1. Selezione Comune </span>
										</a>
										{#if selectedComune !== ''}
											<a class="nav-link" href="#serviziattivi">
												<span>2. Servizi attivi </span>
											</a>
											<a class="nav-link" href="#servizicandidature">
												<span>3. Servizi candidature </span>
											</a>
											<a class="nav-link" href="#catalogo">
												<span>4. Servizi candidabili </span>
											</a>
										{/if}
									</li>
								</ul>
							</div>
						</div>
						<hr />
						<h3>Opzioni</h3>
						<div class="row my-4">
							<div class="col-12">
								<div class="form-check">
									<div class="toggles">
										<label for="soloCandidabili">
											Visualizza solo servizi candidabili
											<input
												type="checkbox"
												id="soloCandidabili"
												bind:checked={mostraSoloCandidabili}
											/>
											<span class="lever"></span>
										</label>
									</div>
								</div>
							</div>
						</div>
						<div class="row my-4">
							<div class="col-12">
								<div class="form-check">
									<div class="toggles">
										<label for="soloNonAttivi">
											Visualizza solo servizi non attivi
											<input
												type="checkbox"
												id="soloNonAttivi"
												bind:checked={mostraSoloNonAttivi}
											/>
											<span class="lever"></span>
										</label>
									</div>
								</div>
							</div>
						</div>


						<div class="row my-4">
							<div class="col-12">
								<div class="select-wrapper">
									<label for="filterCategoria">Categorie</label>
									<select id="filterCategoria" name="filterCategoria" bind:value={filterCategoria}>
										<option value="">Tutte</option>
										{#each [...catalogoPerCategoria.keys()] as cat}
											<option value={cat}
												>{cat}{selectedComune !== ''
													? ' - ' +
														servizi.filter(
															(x) =>
																x.candidabile.startsWith('SI') &&
																x.Anagrafica_Servizi__r.Categoria__c === cat
														).length
													: ''}</option
											>
										{/each}
									</select>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</div>
		<div class="col-12 col-lg-9 it-page-sections-container">
			<h4>
				<span><img class="icon icon" src="/svg/logo-io-app-2021.svg" alt="logo app io" /></span>
				<span>Campagna adesione avviso Misura 1.4.3 "Adozione app IO" Comuni - maggio 2024</span>
			</h4>

			<div class="it-page-section my-5" id="informativaavviso">
				<div class="row">
					<div class="col-12 col-lg-12">
						<div class="alert alert-primary" role="alert">
							<h6>Ammissibilità</h6>
							<p>
								<span class="text-primary"
									>Si riportano qui di seguito le condizioni di ammissibilità, secondo quanto
									definito dall'art. 5 dell'avviso:</span
								><br />

								<cite>
									Sono invitati a presentare proposte a valere sul presente Avviso esclusivamente i
									Comuni.<br />Il singolo Ente locale, come sopra individuato, può presentare,
									<b>a valere sul presente Avviso, una sola domanda di partecipazione</b>.<br />Le
									eventuali proposte di Soggetti Attuatori già ammessi al finanziamento a valere
									sull’Avviso Misura 1.4.3 "Adozione appIO"- Comuni (aprile2022) e/o sull’Avviso
									Misura 1.4.3 "Adozione appIO" - Comuni (settembre 2022) e/o sull’Avviso Misura
									1.4.3 "Adozione appIO" - Comuni (novembre 2023) sono ammissibili ai fini del
									presente Avviso
									<b
										>esclusivamente per la migrazione e l’attivazione di ulteriori servizi rispetto
										a quelli già finanziati</b
									>, nel rispetto dell’Allegato 2.<br />
									<b
										>Non possono presentare domanda di partecipazione al presente Avviso gli Enti
										titolari di progetti già finanziati da altri Avvisi a valere sulla medesima
										Misura 1.4.3 appIO che abbiano presentato istanza di modifica del progetto
										attivo già finanziato, fin quando la procedura di modifica non sia conclusa.</b
									>
								</cite>
							</p>
						</div>

						<div class="alert alert-warning" role="alert">
							<h6>Servizio a rimborso</h6>
							<p>
								Un servizio già creato e attivato su app IO può essere finanziato a “rimborso”. In
								questo caso l’ente deve:
							</p>

							<ul>
								<li>
									Modificare il nome del servizio già attivo sull’app con uno corrispondente a
									quelli del Catalogo dei servizi dei Comuni, contenuto nell’Appendice e rimuovere
									dall’app IO eventuali altri servizi che ricadano nella stessa voce di catalogo.
								</li>
								<li>
									Attendere circa 12 giorni, in modo che la modifica operata nell’app IO venga
									recepita dalla piattaforma PA digitale 2026.
								</li>
								<li>
									Selezionare il servizio da portare a rimborso in fase di candidatura nella
									piattaforma PA digitale 2026. Nella piattaforma PA digitale il servizio sarà già
									chiaramente identificabile e corredato del suo identificativo (ID servizio).
								</li>
							</ul>
						</div>
						<p>
							Per tutte le informazioni si rimanda alla
							<a
								target="_blank"
								href="https://areariservata.padigitale2026.gov.it/Pa_digitale2026_dettagli_avviso?id=a017Q00001OIdU8QAL"
								>pagina ufficiale&nbsp;
								<svg class="icon icon-sm icon-primary me-2"
									><use href="/svg/sprites.svg#it-external-link"></use></svg
								></a
							>
						</p>
					</div>
				</div>
			</div>
			<div class="it-page-section my-5" id="selezioneComune">
				<div class="row">
					<div class="col-12 col-lg-4">
						<div class="select-wrapper">
							<label for="selezioneComune">Seleziona un Comune</label>
							<select
								class="form-control"
								id="selezioneComune"
								title="Seleziona un Comune"
								required
								bind:value={selectedComune}
							>
								{#each data.enti as c}
									<option value={c.Id}>{c.Name}</option>
								{/each}
							</select>
						</div>
					</div>
					{#if selectedComune !== ''}
						<div class="col-12 col-lg-4">
							<a class="read-more" href="/op/ente/{selectedComune}" target="_blank">
								<span class="text">Scheda ente</span>
								<svg class="icon"><use href="/svg/sprites.svg#it-external-link"></use></svg>
							</a>
						</div>
					{/if}
					<!--
					<div class="col-12 col-lg-4">
						<button
							type="button"
							class="btn btn-primary btn-xs btn-me"
							on:click={aiutamiAScegliere(data.serviziAttivi)}>Aiutami a scegliere</button
						>
					</div>
					-->
				</div>
			</div>

			{#if selectedComune !== ''}
				<div class="it-page-section my-5" id="serviziattivi">
					<div class="row">
						<div class="col-12 col-lg-12">
							<div class="accordion accordion-background-hover" id="accServiziAttivi">
								<div class="accordion-item">
									<h2 class="accordion-header" id="itemsa">
										<button
											class="accordion-button collapsed"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapsesa"
											aria-expanded="false"
											aria-controls="collapsesa"
										>
											Servizi attivi dell'ente: {serviziAttivi.length}
										</button>
									</h2>
									<div
										id="collapsesa"
										class="accordion-collapse collapse"
										data-bs-parent="#accServiziAttivi"
										role="region"
										aria-labelledby="itemsa"
									>
										<div class="accordion-body">
											<div class="row">
												<div class="col-12 col-lg-12">
													<div class="table-responsive">
														<table class="table table-hover table-sm caption-top align-middle">
															<thead>
																<tr>
																	<th><small>Codice servizio</small></th>
																	<th><small>Servizio</small></th>
																	<th><small>Codice servizio attribuito a catalogo</small></th>
																	<th><small>Argomento attribuito a catalogo</small></th>
																	<th><small>Servizio attribuito a catalogo</small></th>

																	<th><small>Data di attivazione</small></th>
																	<th><small>Fondo Innovazione</small></th>
																	<th><small>Ammissibile</small></th>
																</tr>
															</thead>
															<tbody>
																{#each serviziAttivi as s}
																	<tr>
																		<td><small>{s.Codice_Servizio__c}</small></td>
																		<td><small>{s.Descrizione_Servizio__c}</small></td>
																		<td><small>{s.Codice_Catalogo_Attribuito__c}</small></td>
																		<td><small>{s.Argomento__c}</small></td>
																		<td><small>{s.Nome_Servizio__c}</small></td>

																		<td
																			class="text-center {s.dataAttivazioneAmmissibile
																				? ''
																				: 'text-danger'}"
																			><small>{formatDate(new Date(s.Data_Attivazione__c))}</small
																			></td
																		>
																		<td
																			class="text-center {s.Fondo_Innovazione__c
																				? 'text-danger'
																				: ''}"
																			><small>{s.Fondo_Innovazione__c ? 'SI' : 'NO'}</small></td
																		>
																		<td class="text-center">
																			<small>
																				{#if s.Fondo_Innovazione__c || !s.dataAttivazioneAmmissibile}
																					<svg class="icon icon-xs icon-danger">
																						<use href="/svg/sprites.svg#it-ban"></use>
																					</svg>
																				{:else}
																					<svg class="icon icon-xs icon-success">
																						<use href="/svg/sprites.svg#it-check-circle"></use>
																					</svg>
																				{/if}
																			</small>
																		</td>
																	</tr>
																{/each}
															</tbody>
														</table>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="it-page-section my-5" id="servizicandidature">
					<div class="row my-2">
						<div class="col-12 col-lg-12">
							<div class="accordion accordion-background-hover" id="accCandidatureAttive">
								<div class="accordion-item">
									<h2 class="accordion-header" id="itemca">
										<button
											class="accordion-button collapsed"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseca"
											aria-expanded="false"
											aria-controls="collapseca"
										>
											Servizi in candidature attive: {filteredServiziInCandidature.length}
										</button>
									</h2>
									<div
										id="collapseca"
										class="accordion-collapse collapse"
										data-bs-parent="#accCandidatureAttive"
										role="region"
										aria-labelledby="itemca"
									>
										<div class="accordion-body">
											<div class="card-wrapper">
												<div class="card">
													<div class="card-body">
														{#each [...serviziCandidatureAttive.keys()] as sca}
															<div class="row">
																<div class="col-12 col-lg-6">
																	<p>
																		Avviso: <strong>{sca}</strong><br />
																		Stato candidatura:
																		<strong
																			>{serviziCandidatureAttive.get(sca)[0].Candidatura__r
																				.outfunds__Status__c}</strong
																		><br />
																		Stato progetto:
																		<strong
																			>{serviziCandidatureAttive.get(sca)[0].Candidatura__r
																				.Stato_Progetto__c
																				? serviziCandidatureAttive.get(sca)[0].Candidatura__r
																						.Stato_Progetto__c
																				: 'n.a.'}
																			{serviziCandidatureAttive.get(sca)[0].Candidatura__r
																				.TipologiaVerifica__c
																				? serviziCandidatureAttive.get(sca)[0].Candidatura__r
																						.TipologiaVerifica__c
																				: ''}</strong
																		>
																	</p>
																</div>

																<div class="col-12 col-lg-6">
																	<p>
																		Esito campagna qualità: <strong
																			>{serviziCandidatureAttive.get(sca)[0].Candidatura__r
																				.Esito_campagna_duplicato_143_appIO__c
																				? serviziCandidatureAttive.get(sca)[0].Candidatura__r
																						.Esito_campagna_duplicato_143_appIO__c
																				: 'OK'}</strong
																		>
																		<br />
																		Istanza di modifica conclusa:
																		<strong
																			>{!serviziCandidatureAttive.get(sca)[0].Candidatura__r
																				.Esito_campagna_duplicato_143_appIO__c
																				? 'Non applicabile'
																				: serviziCandidatureAttive.get(sca)[0].Candidatura__r
																							.Istanza_modifica_conclusa__c
																					? 'SI'
																					: 'NO'}</strong
																		>
																		<br />
																		Allegato 2 inviato:
																		<strong
																			>{!serviziCandidatureAttive.get(sca)[0].Candidatura__r
																				.Esito_campagna_duplicato_143_appIO__c
																				? 'Non applicabile'
																				: serviziCandidatureAttive.get(sca)[0].Candidatura__r
																							.Risposta_PEC_143_appIO__c
																					? 'SI'
																					: 'NO'}</strong
																		>
																	</p>
																</div>
															</div>
															<div class="row">
																<div class="col-12 col-lg-12">
																	<div class="table-responsive">
																		<table
																			class="table table-hover table-sm caption-top align-middle"
																		>
																			<thead>
																				<tr>
																					<th><small>Codice servizio</small></th>
																					<th><small>Servizio</small></th>
																					<th><small>Categoria a catalogo</small></th>
																					<th><small>Codice servizio a catalogo</small></th>
																					<th><small>Stato</small></th>
																					<th><small>Servizio nuovo</small></th>
																				</tr>
																			</thead>
																			<tbody>
																				{#each serviziCandidatureAttive
																					.get(sca)
																					.filter( (x) => (filterCategoria === '' ? true : x.argomento_attribuito_143appIO__c === filterCategoria || x.argomento_attribuito_143appIO__c === 'Altro') ) as s}
																					<tr>
																						<td
																							><small
																								>{s.Codice_Servizio__c
																									? s.Codice_Servizio__c
																									: 'n.d.'}</small
																							></td
																						>
																						<td><small>{s.Name}</small></td>
																						<td
																							><small>{s.argomento_attribuito_143appIO__c}</small
																							></td
																						>
																						<td
																							><small
																								>{s.codice_catalogo_attribuito_143appIO__c}</small
																							></td
																						>

																						<td><small>{s.Stato_Attivit__c}</small></td>
																						<td class="text-center"
																							><small>
																								{#if !serviziAttivi.find((x) => x.Codice_Catalogo_Attribuito__c === s.codice_catalogo_attribuito_143appIO__c)}
																									<strong
																										><svg class="icon icon-xs icon-primary">
																											<use href="/svg/sprites.svg#it-plus-circle"
																											></use>
																										</svg>
																									</strong>
																								{/if}
																							</small></td
																						>
																					</tr>
																				{/each}
																			</tbody>
																		</table>
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
							</div>
						</div>
					</div>
				</div>
			{/if}

			{#if selectedComune !== ''}
				<div class="it-page-section my-5" id="catalogo">
					<div class="accordion accordion-background-hover" id="accCatalogo">
						<div class="accordion-item">
							<h2 class="accordion-header" id="itemcatalogo">
								<button
									class="accordion-button collapsed"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target="#collapsecatalogo"
									aria-expanded="false"
									aria-controls="collapsecatalogo"
								>
									Catalogo: sono disponibili ancora {servizi.filter(
										(x) =>
											x.candidabile.startsWith('SI') &&
											(filterCategoria === ''
												? true
												: x.Anagrafica_Servizi__r.Categoria__c === filterCategoria)
									).length} servizi
								</button>
							</h2>
							<div
								id="collapsecatalogo"
								class="accordion-collapse collapse"
								data-bs-parent="#accCatalogo"
								role="region"
								aria-labelledby="itemcatalogo"
							>
								<div class="accordion-body">
									<div class="row">
										<div class="col-12 col-lg-12">
											<div class="table-responsive">
												<table class="table table-hover table-sm caption-top align-middle">
													<caption
														><strong
															>Sono disponibili ancora {servizi.filter(
																(x) =>
																	x.candidabile.startsWith('SI') &&
																	(filterCategoria === ''
																		? true
																		: x.Anagrafica_Servizi__r.Categoria__c === filterCategoria)
															).length} servizi</strong
														></caption
													>
													<thead>
														<tr>
															<th class="text-center">Categoria</th>
															<th class="text-center">Servizio</th>
															<th class="text-center">Codice</th>
															<th class="text-center">Candidabile</th>
															<th class="text-center">
																<img
																	class="img-fluid"
																	style="width: 1.5rem; height: 1.5rem"
																	src="/img/thumb-up-svgrepo-com.svg"
																	alt="OK"
																/>
															</th>
															<th class="text-center">
																<img
																	class="img-fluid"
																	style="width: 1.5rem; height: 1.5rem"
																	src="/img/thumb-down-svgrepo-com.svg"
																	alt="KO"
																/>
															</th>
														</tr>
													</thead>
													<tbody>
														{#each [...catalogoPerCategoria.keys()].filter( (x) => (filterCategoria === '' ? true : x === filterCategoria) ) as k, j}
															{#if catalogoPerCategoria.get(k).length > 0}
																{#each catalogoPerCategoria.get(k) as s, i}
																	<tr>
																		{#if i === 0}
																			<td rowspan={catalogoPerCategoria.get(k).length}
																				><small>{s.Anagrafica_Servizi__r.Categoria__c}</small></td
																			>
																		{/if}

																		<td><small>{s.Name}</small></td>
																		<td
																			><small>{s.Anagrafica_Servizi__r.Codice_Tassonomico__c}</small
																			></td
																		>
																		<td class="text-center"
																			><small
																				>{#if s.candidabile.startsWith('SI')}
																					<svg class="icon icon-xs icon-success align-middle">
																						<use href="/svg/sprites.svg#it-check-circle"></use>
																					</svg><span>{s.candidabile}</span>
																				{:else if s.candidabile === 'NO - Fondo innovazione'}
																					<svg class="icon icon-xs icon-danger align-middle">
																						<use href="/svg/sprites.svg#it-ban"></use>
																					</svg><span class="text-danger mx-2"
																						><strong>{s.candidabile}</strong></span
																					>
																				{:else if s.candidabile === 'NO - Già candidato'}
																					<svg class="icon icon-xs icon-primary align-middle">
																						<use href="/svg/sprites.svg#it-bookmark"></use>
																					</svg><span>{s.candidabile}</span>
																				{:else if s.candidabile === 'NO - Servizio attivo avviato prima del 1 aprile 2021'}
																					<svg class="icon icon-xs icon-danger align-middle">
																						<use href="/svg/sprites.svg#it-ban"></use>
																					</svg><span class="text-danger mx-2"
																						><strong>{s.candidabile}</strong></span
																					>
																				{:else}
																					<svg class="icon icon-xs icon-alert align-middle">
																						<use href="/svg/sprites.svg#it-warning-circle"></use>
																					</svg><span><strong>{s.candidabile}</strong></span>
																				{/if}</small
																			></td
																		>

																		<td class="text-center"
																			><small>
																				{#if s.fattoriok.n > 0 && !s.candidabile.startsWith('NO')}
																					<!-- svelte-ignore a11y-no-static-element-interactions -->
																					<div
																						class="chip chip-success chip-simple"
																						style="width: 50%; min-width:30px; cursor: pointer; background-color: {okColorScale(
																							s.fattoriok.n
																						)}; border-color: rgba(0, 0, 0, 0);"
																						on:mouseenter={() =>
																							setpopover('s-' + i + '-' + j + '-pop-ok')}
																						on:mouseleave={() =>
																							disposepopover('s-' + i + '-' + j + '-pop-ok')}
																						id="s-{i}-{j}-pop-ok"
																						data-container="body"
																						data-bs-toggle="popover"
																						data-bs-placement="left"
																						data-bs-trigger="hover"
																						data-bs-html="true"
																						title="<svg class='icon icon-success align-middle'><use href='/svg/sprites.svg#it-check-circle'></use></svg><span class='text-success'>Fattori positivi</span>"
																						data-bs-content={s.fattoriok.t}
																					>
																						<span
																							class="badge"
																							style="width: 100%; background-color:rgba(255,0,0,0); !important"
																							>&nbsp;</span
																						>
																					</div>
																				{/if}
																			</small>
																		</td>
																		<td class="text-center"
																			><small>
																				{#if s.fattoriko.n > 0 && !s.candidabile.startsWith('NO')}
																					<!-- svelte-ignore a11y-no-static-element-interactions -->
																					<div
																						class="chip chip-danger chip-simple"
																						style="width: 50%; min-width:30px; cursor: pointer; background-color: {koColorScale(
																							s.fattoriko.n
																						)};  border-color: rgba(0, 0, 0, 0);"
																						on:mouseenter={() =>
																							setpopover('s-' + i + '-' + j + '-pop-ko')}
																						on:mouseleave={() =>
																							disposepopover('s-' + i + '-' + j + '-pop-ko')}
																						id="s-{i}-{j}-pop-ko"
																						data-container="body"
																						data-bs-toggle="popover"
																						data-bs-placement="left"
																						data-bs-trigger="hover"
																						data-bs-html="true"
																						title="<svg class='icon icon-warning align-middle'><use href='/svg/sprites.svg#it-error'></use></svg><span class='text-warning'>Fattori negativi</span>"
																						data-bs-content={s.fattoriko.t}
																					>
																						<span
																							class="badge"
																							style="width: 100%; background-color:rgba(255,0,0,0); !important"
																							>&nbsp;</span
																						>
																					</div>
																				{/if}
																			</small>
																		</td>
																	</tr>
																{/each}
															{/if}
														{/each}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
