<script>
	import { navigating } from '$app/stores';
	import { page } from '$app/stores';
	import { areaManager, checkAbilitazione, ruolo } from '$lib/js/shared.js';
	export let data;
	$: loggedstandard = data.loggedstandard;
	$: loggedasseveratore = data.loggedasseveratore;

	$: utentestandard = data.utentestandard;
	$: utenteasseveratore = data.utenteasseveratore;

	function getRandomArbitrary(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
</script>

<div class="it-header-wrapper">
	<div class="it-header-slim-wrapper">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<div class="it-header-slim-wrapper-content">
						<a
							class="d-none d-lg-block navbar-brand"
							target="_blank"
							href="https://innovazione.gov.it/"
						>
							Dipartimento per la Trasformazione Digitale
						</a>
						<div class="nav-mobile">
							<nav aria-label="Navigazione accessoria">
								<a
									class="it-opener d-lg-none"
									data-bs-toggle="collapse"
									href="#menu1a"
									role="button"
									aria-expanded="false"
									aria-controls="menu4"
								>
									<span>Dipartimento per la Trasformazione Digitale</span>
									<svg class="icon" aria-hidden="true">
										<use href="/svg/sprites.svg#it-expand"></use>
									</svg>
								</a>
								<!--
                  <div class="link-list-wrapper collapse" id="menu1a">
                    <ul class="link-list">
                      <li><a class="dropdown-item list-item" href="#">Link 1</a></li>
                      <li><a class="list-item active" href="#" aria-current="page">Link 2 (Attivo)</a></li>
                    </ul>
                  </div>
                  -->
							</nav>
						</div>
						<div class="it-header-slim-right-zone">
							<div class="it-access-top-wrapper">
								{#if loggedstandard || loggedasseveratore}
									<div
										class="d-flex align-items-center justify-content-around flex-wrap flex-sm-nowrap"
									>
										{#if loggedstandard}
											<p class="mx-4 text-white align-middle my-0">{ruolo(utentestandard.idsf)}</p>
										{/if}
										<ul class="avatar-group-stacked">
											{#if loggedstandard}
												<li>
													<a class="avatar size-md" href="/users">
														<img
															src={'/api/img/' + encodeURIComponent(utentestandard.FullPhotoUrl)}
															alt={utentestandard.Name}
														/>
													</a>
												</li>
											{/if}
											{#if loggedasseveratore}
												<li>
													<a class="avatar size-md" href="/users">
														<img
															src={'/api/img/' +
																encodeURIComponent(utenteasseveratore.FullPhotoUrl)}
															alt={utenteasseveratore.Name}
														/>
													</a>
												</li>
											{/if}
										</ul>
									</div>
								{:else}
									<a class="btn btn-primary btn-sm" href="/users">Accedi</a>
								{/if}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="it-nav-wrapper">
		<div class="it-header-center-wrapper">
			<div class="container">
				<div class="row">
					<div class="col-12">
						<div class="it-header-center-content-wrapper">
							<div class="it-brand-wrapper">
								<a href="/">
									<svg class="icon" aria-hidden="true">
										<use href="/svg/sprites.svg#it-team-digitale"></use>
									</svg>
									<div class="it-brand-text">
										<div class="it-brand-title">APPortafoglio</div>
										<div class="it-brand-tagline d-none d-md-block">
											Il tuo supporto per la digitalizzazione del Paese
										</div>
									</div>
								</a>
							</div>
							<div class="it-right-zone"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="it-header-navbar-wrapper">
			<div class="container">
				<div class="row">
					<div class="col-12">
						<!--start nav-->
						<nav class="navbar navbar-expand-lg" aria-label="Navigazione principale">
							<button
								class="custom-navbar-toggler"
								type="button"
								aria-controls="nav0"
								aria-expanded="false"
								aria-label="Mostra/Nascondi la navigazione"
								data-bs-toggle="navbarcollapsible"
								data-bs-target="#nav0"
							>
								<svg class="icon bg-override"><use href="/svg/sprites.svg#it-burger"></use></svg>
							</button>
							<div class="navbar-collapsable" id="nav0" style="display: none;">
								<div class="overlay" style="display: none;"></div>
								<div class="close-div">
									<button class="btn close-menu" type="button">
										<span class="visually-hidden">Nascondi la navigazione</span>
										<svg class="icon"><use href="/svg/sprites.svg#it-close-big"></use></svg>
									</button>
								</div>
								<div class="menu-wrapper">
									<ul class="navbar-nav">
										<li class="nav-item active">
											<a class="nav-link {$page.url.pathname === '/' ? 'active' : ''}" href="/"
												><span>home</span></a
											>
										</li>
										<li class="nav-item active">
											<a
												class="nav-link {$page.url.pathname === '/opendata' ? 'active' : ''}"
												href="/opendata"><span>open data</span></a
											>
										</li>

										<!-- consulta -->
										{#if loggedstandard}
											<li class="nav-item dropdown">
												<a
													class="nav-link dropdown-toggle"
													href="#"
													role="button"
													data-bs-toggle="dropdown"
													aria-expanded="false"
													id="ddconsulta"
												>
													<span>consulta</span>
													<svg class="icon icon-xs"
														><use href="/svg/sprites.svg#it-expand"></use></svg
													>
												</a>
												<div
													class="dropdown-menu"
													role="region"
													aria-labelledby="ddconsulta"
													data-sveltekit-preload-data="off"
												>
													<div class="link-list-wrapper">
														<ul class="link-list">
															<li>
																<a class="dropdown-item list-item" href="/op/avvisi"
																	><span>avvisi</span></a
																>
															</li>
															{#if data.utentestandard && (checkAbilitazione(data.utentestandard.idsf, 'Osservatorio') || checkAbilitazione(data.utentestandard.idsf, 'TO Executive') || checkAbilitazione(data.utentestandard.idsf, 'Area Manager') || checkAbilitazione(data.utentestandard.idsf, 'Relazioni Istituzionali') || checkAbilitazione(data.utentestandard.idsf, 'Account Manager') || checkAbilitazione(data.utentestandard.idsf, 'Technical Implementation Manager') || checkAbilitazione(data.utentestandard.idsf, 'Product Owner'))}
																<li>
																	<a class="dropdown-item list-item" href="/op/enti"
																		><span>enti</span></a
																	>
																</li>
																<li>
																	<a class="dropdown-item list-item" href="/op/referenti"
																		><span>referenti</span></a
																	>
																</li>
																{#if data.utentestandard && (checkAbilitazione(data.utentestandard.idsf, 'Area Manager') || checkAbilitazione(data.utentestandard.idsf, 'Account Manager') || checkAbilitazione(data.utentestandard.idsf, 'Technical Implementation Manager'))}
																	<li><span class="divider"></span></li>
																	<li>
																		<a class="dropdown-item list-item" href="/op/contatti"
																			><span>report accounting</span></a
																		>
																	</li>
																	<li>
																		<a class="dropdown-item list-item" href="/op/scadenze"
																			><span>scadenze</span></a
																		>
																	</li>
																	<li>
																		<a class="dropdown-item list-item" href="/op/proroghe"
																			><span>richieste proroghe</span></a
																		>
																	</li>
																{/if}
															{/if}
														</ul>
													</div>
												</div>
											</li>
										{/if}

										<!-- cruscotti -->
										{#if loggedstandard}
											{#if data.utentestandard && (checkAbilitazione(data.utentestandard.idsf, 'Area Manager') || checkAbilitazione(data.utentestandard.idsf, 'Account Manager') || checkAbilitazione(data.utentestandard.idsf, 'Technical Implementation Manager'))}
												<li class="nav-item dropdown">
													<a
														class="nav-link dropdown-toggle"
														href="#"
														role="button"
														data-bs-toggle="dropdown"
														aria-expanded="false"
														id="ddcruscotti"
													>
														<span>cruscotti</span>
														<svg class="icon icon-xs"
															><use href="/svg/sprites.svg#it-expand"></use></svg
														>
													</a>
													<div
														class="dropdown-menu"
														role="region"
														aria-labelledby="ddcruscotti"
														data-sveltekit-preload-data="off"
													>
														<div class="link-list-wrapper">
															<ul class="link-list">
																<li>
																	<a class="dropdown-item list-item" href="/cruscotti/generale"
																		><span>generale</span></a
																	>
																</li>
																<li>
																	<a class="dropdown-item list-item" href="/cruscotti/fornitori"
																		><span>fornitori</span></a
																	>
																</li>
															</ul>
														</div>
													</div>
												</li>
											{/if}

											{#if data.utentestandard && (checkAbilitazione(data.utentestandard.idsf, 'Osservatorio') || checkAbilitazione(data.utentestandard.idsf, 'TO Executive') || checkAbilitazione(data.utentestandard.idsf, 'Area Manager') || checkAbilitazione(data.utentestandard.idsf, 'Relazioni Istituzionali') || checkAbilitazione(data.utentestandard.idsf, 'Account Manager') || checkAbilitazione(data.utentestandard.idsf, 'Technical Implementation Manager') || checkAbilitazione(data.utentestandard.idsf, 'Product Owner'))}
												<li class="nav-item dropdown">
													<a
														class="nav-link dropdown-toggle"
														href="#"
														role="button"
														data-bs-toggle="dropdown"
														aria-expanded="false"
														id="ddcampagne"
													>
														<span>campagne</span>
														<svg class="icon icon-xs"
															><use href="/svg/sprites.svg#it-expand"></use></svg
														>
													</a>
													<div
														class="dropdown-menu"
														role="region"
														aria-labelledby="ddcampagne"
														data-sveltekit-preload-data="off"
													>
														<div class="link-list-wrapper">
															<ul class="link-list">
																<li>
																	<a class="dropdown-item list-item" href="/campagne/appio24/none"
																		><span>Avviso App IO Comuni</span></a
																	>
																</li>
															</ul>
														</div>
													</div>
												</li>
											{/if}
										{/if}

										{#if loggedstandard}
											{#if data.utentestandard && (checkAbilitazione(data.utentestandard.idsf, 'Osservatorio') || checkAbilitazione(data.utentestandard.idsf, 'TO Executive') || checkAbilitazione(data.utentestandard.idsf, 'Area Manager') || checkAbilitazione(data.utentestandard.idsf, 'Relazioni Istituzionali'))}
												<!-- monitoraggio -->
												<li class="nav-item dropdown">
													<a
														class="nav-link dropdown-toggle"
														href="#"
														role="button"
														data-bs-toggle="dropdown"
														aria-expanded="false"
														id="ddmonitoraggio"
													>
														<span>monitoraggio</span>
														<svg class="icon icon-xs"
															><use href="/svg/sprites.svg#it-expand"></use></svg
														>
													</a>
													<div
														class="dropdown-menu"
														role="region"
														aria-labelledby="ddmonitoraggio"
														data-sveltekit-preload-data="off"
													>
														<div class="link-list-wrapper">
															<ul class="link-list">
																<li data-sveltekit-preload-data="off">
																	<a class="dropdown-item list-item" href="/monitoraggio/risorse"
																		><span>board risorse</span></a
																	>
																</li>

																<li data-sveltekit-preload-data="off">
																	<a class="dropdown-item list-item" href="/monitoraggio/avvisi"
																		><span>residui avvisi aperti e misure</span></a
																	>
																</li>

																<li data-sveltekit-preload-data="off">
																	<a
																		class="dropdown-item list-item"
																		href="/monitoraggio/candidature"><span>progetti</span></a
																	>
																</li>

																<!--
																	<li data-sveltekit-preload-data="off">
																		<a class="dropdown-item list-item" href="/monitoraggio/enti"
																			><span>board enti</span></a
																		>
																	</li>
																	-->

																<li data-sveltekit-preload-data="off">
																	<a
																		class="dropdown-item list-item"
																		href="/monitoraggio/asseverazioni"><span>asseverazioni</span></a
																	>
																</li>

																<!--
																	<li data-sveltekit-preload-data="off">
																		<a class="dropdown-item list-item" href="/monitoraggio/avvisi"
																			><span>board avvisi</span></a
																		>
																	</li>
																	-->

																<li data-sveltekit-preload-data="off">
																	<a
																		class="dropdown-item list-item"
																		href="/monitoraggio/proroghe/monitoraggio"
																		><span>campagna di riprogrammazione</span></a
																	>
																</li>
															</ul>
														</div>
													</div>
												</li>
											{/if}
										{/if}

										{#if loggedstandard}
											{#if data.utentestandard && (checkAbilitazione(data.utentestandard.idsf, 'Osservatorio') || checkAbilitazione(data.utentestandard.idsf, 'TO Executive') || checkAbilitazione(data.utentestandard.idsf, 'Area Manager') || checkAbilitazione(data.utentestandard.idsf, 'Account Manager') || checkAbilitazione(data.utentestandard.idsf, 'Relazioni Istituzionali'))}
												<!-- monitoraggio -->
												<li class="nav-item dropdown">
													<a
														class="nav-link dropdown-toggle"
														href="#"
														role="button"
														data-bs-toggle="dropdown"
														aria-expanded="false"
														id="ddanci"
													>
														<span>osservatorio</span>
														<svg class="icon icon-xs"
															><use href="/svg/sprites.svg#it-expand"></use></svg
														>
													</a>
													<div
														class="dropdown-menu"
														role="region"
														aria-labelledby="ddanci"
														data-sveltekit-preload-data="off"
													>
														<div class="link-list-wrapper">
															<ul class="link-list">
																<li data-sveltekit-preload-data="off">
																	<a class="dropdown-item list-item" href="/anci/survey/map"
																		><span>mappa dei comuni digitali</span></a
																	>
																</li>
															</ul>
														</div>
													</div>
												</li>
											{/if}
										{/if}
									</ul>
								</div>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="container my-4">
	{#if $navigating}
		<section class="it-hero-wrapper it-primary it-overlay">
			<!-- - img-->
			<div class="img-responsive-wrapper">
				<div class="img-responsive">
					<div class="img-wrapper">
						<video autoplay muted loop id="myVideo">
							<source src="/vids/wait{getRandomArbitrary(0, 5)}.mp4" type="video/mp4" />
						</video>
					</div>
				</div>
			</div>
			<!-- - texts-->
			<div class="container">
				<div class="row justify-content-center">
					<div class="col-12">
						<div class="it-hero-text-wrapper bg-dark">
							<h1 class="h1"><strong>Caricamento in corso, attendere per favore...</strong></h1>
							<div class="progress progress-indeterminate">
								<span class="visually-hidden">In elaborazione...</span>
								<div class="progress-bar" role="progressbar"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	{:else}
		<slot />
	{/if}
</div>

<footer class="it-footer">
	<div class="it-footer-main">
		<div class="container py-4">
			<section>
				<div class="row">
					<div class="col-lg-3 col-md-3 col-sm-6 pb-2">
						<h6>ISTITUZIONALI</h6>
						<div class="link-list-wrapper">
							<ul class="footer-list link-list clearfix">
								<li>
									<a
										class="list-item"
										href="https://innovazione.gov.it/"
										target="_blank"
										title="Vai al sito del Dipartimento"
										>Il Dipartimento<svg class="icon icon-white icon-sm ms-1"
											><use href="/svg/sprites.svg#it-external-link"></use></svg
										></a
									>
								</li>
								<li>
									<a class="list-item" href="https://www.agid.gov.it/" title="Vai al sito dell'AGID"
										>AGID<svg class="icon icon-white icon-sm ms-1"
											><use href="/svg/sprites.svg#it-external-link"></use></svg
										></a
									>
								</li>
								<li>
									<a class="list-item" href="https://www.pagopa.it/it/" title="Vai al sito pagoPA"
										>PagoPA S.p.A.<svg class="icon icon-white icon-sm ms-1"
											><use href="/svg/sprites.svg#it-external-link"></use></svg
										></a
									>
								</li>
							</ul>
						</div>
					</div>
					<div class="col-lg-3 col-md-3 col-sm-6 pb-2">
						<h6>PA digitale 2026</h6>
						<div class="link-list-wrapper">
							<ul class="footer-list link-list clearfix">
								<li>
									<a
										class="list-item"
										href="https://padigitale2026.gov.it/"
										target="_blank"
										title="Vai al sito pubblico"
										>Sito pubblico<svg class="icon icon-white icon-sm ms-1"
											><use href="/svg/sprites.svg#it-external-link"></use></svg
										></a
									>
								</li>
								<li>
									<a
										class="list-item"
										href="https://padigitale2026.my.salesforce.com/"
										title="Vai al CRM"
										>CRM
										<svg class="icon icon-white icon-sm ms-1"
											><use href="/svg/sprites.svg#it-external-link"></use></svg
										>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>

	<a
		href="#"
		aria-hidden="true"
		tabindex="-1"
		data-bs-toggle="backtotop"
		class="back-to-top"
		id="btt"
	>
		<svg class="icon icon-light"><use href="/svg/sprites.svg#it-arrow-up"></use></svg>
	</a>
</footer>

<style>
	#myVideo {
		right: 0;
		bottom: 0;
		min-width: 100%;
		min-height: 100%;
		width: auto;
		height: auto;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
