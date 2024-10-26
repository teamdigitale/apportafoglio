<script>
	// @ts-nocheck

	import * as d3 from 'd3';
	import * as Plot from '@observablehq/plot';

	import Cite from '$lib/c/cite.svelte';

	import { euro, formatDate, formatNumber, percentuale } from '$lib/js/shared.js';
	import { onMount } from 'svelte';
	import moment from 'moment/min/moment-with-locales';
	import Utente from './utente.svelte';
	import Organizzazione from './organizzazione.svelte';
	import Insights from './Insights.svelte';
	import Infrastrutturaict from './infrastrutturaict.svelte';
	import Candidature from './Candidature.svelte';
	import Sicurezza from './sicurezza.svelte';
	import Serviziapplicazionidati from './serviziapplicazionidati.svelte';
	import Attieprocedimenti from './attieprocedimenti.svelte';
	import Governance from './governance.svelte';
	import Servizi from './Servizi.svelte';
	import Demografico from './Demografico.svelte';
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
								{#if data.risposta}
									<ul class="link-list">
										<li class="nav-item">
											{#each d3.flatGroup(data.risposta.surveyanci.sezioni) as sezione,i}
											{#if i!==0}
												<a class="nav-link active" href="#heading{sezione.codice}">
													<span>{sezione.codice}. {sezione.nome}</span>
												</a>
												{/if}
											{/each}
										</li>
									</ul>
								{/if}
							</div>
						</div>
					</div>
				</nav>
			</div>
		</div>
		{#if data.risposta}
			<div class="col-12 col-lg-9 it-page-sections-container">
				<h5 id="heading-com">
					{data.risposta.nome}
				</h5>
				<div class="alert alert-primary" role="alert">
					Dati aggiornati a: <b
						>{moment(data.risposta.surveyanci.data_invio, 'YYYY-MM-DD HH:mm:ss')
						.add(2, 'hours')
							.calendar()
							.toLocaleLowerCase()}</b
					><a class="read-more" href="/op/ente/{data.risposta.pa2026.id}" target="_blank">
						<span>Dettaglio ente</span>
						<svg class="icon"><use href="/svg/sprites.svg#it-external-link"></use></svg>
					</a>
				</div>
				<hr />
				{#each data.risposta.surveyanci.sezioni as s,i}
				{#if i!==0}
					<h5 id="heading{s.codice}">{s.codice}. {s.nome}</h5>
					{/if}
					
					{#if s.codice === '2'}
						<div class="row">
							<div class="col-12 col-lg-8">
								<Organizzazione {s} tipo={data.risposta.surveyanci.tipo} />
							</div>
							<div class="col-12 col-lg-4">
								<Insights {s} />
							</div>
						</div>
					{/if}
					{#if s.codice === '3'}
						<div class="row">
							<div class="col-12 col-lg-8">
								<Infrastrutturaict {s} tipo={data.risposta.surveyanci.tipo} />
							</div>
							<div class="col-12 col-lg-4">
								<div>
									<Candidature
										candidature={data.risposta.pa2026.candidature.filter(
											(x) => x.misura === '1.2 Abilitazione e facilitazione migrazione al Cloud'&& x.data_invio!==null
										)}
										title="Candidature 1.2"
									/>
								</div>
								<div>
									<Insights {s} />
								</div>
							</div>
						</div>
					{/if}
					{#if s.codice === '4'}
						<div class="row">
							<div class="col-12 col-lg-8">
								<Sicurezza {s} tipo={data.risposta.surveyanci.tipo} />
							</div>
							<div class="col-12 col-lg-4">
								<div>
									<Insights {s} />
								</div>
							</div>
						</div>
					{/if}
					{#if s.codice === '5'}
						<div class="row">
							<div class="col-12 col-lg-8">
								<Serviziapplicazionidati {s} tipo={data.risposta.surveyanci.tipo} />
							</div>
							<div class="col-12 col-lg-4">
								<div>
									<Servizi
										servizi={data.risposta.pa2026.servizi}
										title="Servizi dell'ente"
									/>
								</div>
								<div>
									<Candidature
										candidature={data.risposta.pa2026.candidature.filter(
											(x) => x.misura === '1.3.1 Piattaforma Digitale Nazionale Dati'&& x.data_invio!==null
										)}
										title="Candidature 1.3.1"
									/>
								</div>
                                <div>
									<Candidature
										candidature={data.risposta.pa2026.candidature.filter(
											(x) => x.misura === '1.4.3 Adozione PagoPA e AppIO' && x.pacchetto==='PagoPA'&& x.data_invio!==null
										)}
										title="Candidature 1.4.3 pagoPA"
									/>
								</div>
                                <div>
									<Candidature
										candidature={data.risposta.pa2026.candidature.filter(
											(x) => x.misura === '1.4.1 Esperienza del cittadino nei servizi pubblici' && x.data_invio!==null
										)}
										title="Candidature 1.4.1"
									/>
								</div>
								<div>
									<Insights {s} />
								</div>
                                 
							</div>
						</div>
					{/if}
                    {#if s.codice === '6'}
						<div class="row">
							<div class="col-12 col-lg-8">
								<Attieprocedimenti {s} tipo={data.risposta.surveyanci.tipo} />
							</div>
							<div class="col-12 col-lg-4">
								<div>
									<Insights {s} />
								</div>
							</div>
						</div>
					{/if}
                    {#if s.codice === '7'}
						<div class="row">
							<div class="col-12 col-lg-8">
								<Governance {s} tipo={data.risposta.surveyanci.tipo} />
							</div>
							<div class="col-12 col-lg-4">
								<div>
									<Insights {s} />
								</div>
							</div>
						</div>
					{/if}
					<hr />
				{/each}
			</div>
		{:else}
			<div class="col-12 col-lg-10 it-page-sections-container">
				L'ente non ha ancora risposto al questionario
			</div>
		{/if}
	</div>
</div>
