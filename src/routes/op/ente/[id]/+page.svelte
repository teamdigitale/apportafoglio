<script>
	// @ts-nocheck

	import Cite from '$lib/c/cite.svelte';
	import { onMount } from 'svelte';
	import moment from 'moment/min/moment-with-locales';
	import Referentecard from './referentecard.svelte';
	import Candidature from './candidature.svelte';
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

	let open = false;

	let piattaformaOptions = ['Tutte'].concat(
		Object.values(
			data.servizi.reduce((a, { Piattaforma_Servizi__c }) => {
				a[Piattaforma_Servizi__c] = a[Piattaforma_Servizi__c] || {
					Piattaforma_Servizi__c,
					count: 0
				};
				a[Piattaforma_Servizi__c].count++;
				return a;
			}, Object.create(null))
		)
			.map((x) => x.Piattaforma_Servizi__c)
			.sort()
	);
	let filterPiattaforma = piattaformaOptions[0];
</script>

<div class="container my-4">
	<h1>Scheda ente</h1>
	<Cite
		text="Più che dalle leggi, la libertà nasce dalla coscienza di chi le amministra."
		author="Roberto Gervaso"
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
										<a class="nav-link active" href="#ente">
											<span>Ente </span>
										</a>
										<a class="nav-link active" href="#referenti">
											<span>Referenti </span>
										</a>
										<a class="nav-link active" href="#candidature">
											<span>Candidature </span>
										</a>
										<a class="nav-link active" href="#scadenzario">
											<span>Scadenzario </span>
										</a>
										<a class="nav-link active" href="#servizi">
											<span>Servizi </span>
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
			<div class="it-page-section my-5" id="ente">
				<h4>{data.ente.Name}</h4>
				<div class="row">
					<div class="col-12 col-lg-4">
						<hr />
						<h6>Indirizzo</h6>

						{data.ente.ShippingStreet}<br />
						{data.ente.ShippingCity}<br />
						{data.ente.ShippingState} - {data.ente.Regione__c}<br />
						Area geografica: <strong>{data.ente.Area_geografica__c}</strong>
					</div>
					<div class="col-12 col-lg-4">
						<hr />
						<h6>Contatti</h6>
						<strong>PEC: </strong>
						{data.ente.PEC__c ? data.ente.PEC__c : 'n.d.'}<br />
						<strong>Telefono: </strong>{data.ente.Phone ? data.ente.Phone : 'n.d.'}<br />
						<strong>Sito: </strong>{data.ente.Website ? data.ente.Website : 'n.d.'}
					</div>
					<div class="col-12 col-lg-4">
						<hr />
						<h6>Riferimenti interni</h6>
						<div class="link-list-wrapper">
							<ul class="link-list avatar-group">
								<li>
									{#if data.ente.Account_Manager__r}
										<div class="list-item">
											<div class="avatar size-sm">
												<img
													src={'/api/img/' +
														encodeURIComponent(data.ente.Account_Manager__r.FullPhotoUrl)}
													alt={data.ente.Account_Manager__r.Name}
												/>
											</div>
											<span
												>Account Manager: <strong>{data.ente.Account_Manager__r.Name}</strong></span
											>
										</div>
									{/if}
									{#if data.ente.Tech_Implementation_User__r}
										<div class="list-item">
											<div class="avatar size-sm">
												<img
													src={'/api/img/' +
														encodeURIComponent(data.ente.Tech_Implementation_User__r.FullPhotoUrl)}
													alt={data.ente.Account_Manager__r.Name}
												/>
											</div>
											<span
												>Technical Implementation Manager: <strong
													>{data.ente.Tech_Implementation_User__r.Name}</strong
												></span
											>
										</div>
									{/if}
									{#if data.ente.Asseveratore_1_2_Multimisura_1_1__r}
										<div class="list-item">
											<div class="avatar size-sm">
												<img
													src={'/api/img/' +
														encodeURIComponent(
															data.ente.Asseveratore_1_2_Multimisura_1_1__r.FullPhotoUrl
														)}
													alt={data.ente.Account_Manager__r.Name}
												/>
											</div>
											<span
												>Asseveratore Cloud: <strong
													>{data.ente.Asseveratore_1_2_Multimisura_1_1__r.Name}</strong
												></span
											>
										</div>
									{/if}
									{#if data.ente.Asseveratore_1_4_1__r}
										<div class="list-item">
											<div class="avatar size-sm">
												<img
													src={'/api/img/' +
														encodeURIComponent(data.ente.Asseveratore_1_4_1__r.FullPhotoUrl)}
													alt={data.ente.Account_Manager__r.Name}
												/>
											</div>
											<span
												>Asseveratore Web: <strong>{data.ente.Asseveratore_1_4_1__r.Name}</strong
												></span
											>
										</div>
									{/if}
									{#if data.ente.Asseveratore_misure_automatiche__r}
										<div class="list-item">
											<div class="avatar size-sm">
												<img
													src={'/api/img/' +
														encodeURIComponent(
															data.ente.Asseveratore_misure_automatiche__r.FullPhotoUrl
														)}
													alt={data.ente.Account_Manager__r.Name}
												/>
											</div>
											<span
												>Asseveratore automatiche: <strong
													>{data.ente.Asseveratore_misure_automatiche__r.Name}</strong
												></span
											>
										</div>
									{/if}
								</li>
							</ul>
						</div>
						<!-- 
                        <small>
                            Asseveratore Cloud: include multimisura e 1.2<br/>
                            Asseveratore Web: include la misura 1.4.1<br/>
                            Asseveratore automatiche: tutte le altre misure<br/>
                        </small>
                        -->
					</div>
				</div>
			</div>
			<div class="it-page-section my-5" id="referenti">
				<h4>Referenti attivi</h4>
				<div class="row fullheight">
					<Referentecard referente={data.referenti.filter((r) => r.Profilo__c === 'Super admin')[0]} />
					{#each data.referenti.filter((r) => r.Profilo__c !== null && r.Stato__c === 'Attivo') as referente}
						<Referentecard {referente} />
					{/each}
				</div>
			</div>
			<div class="it-page-section my-5" id="candidature">
				<h4>Candidature</h4>
				<p>
					Per questo ente sono stati aperti avvisi relativi a <strong
						>{data.misure.length} misure/pacchetti di servizi
					</strong>. Non sono considerate le candidature mai inviate dall'ente.
				</p>
				<div class="row">
					{#each data.misure as m}
						<Candidature
							misura={m.Name}
							candidature={data.candidature.filter(
								(c) =>
									c.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name === m.Name
							)}
						/>
					{/each}
				</div>
			</div>
			<div class="it-page-section my-5" id="scadenzario">
				<h4>Scadenzario</h4>
				<div class="form-check col-4 col-lg-4">
					<div class="toggles">
						<label for="soloAperti">
							Mostra solo attività da fare
							<input type="checkbox" id="soloAperti" bind:checked={open} />
							<span class="lever"></span>
						</label>
					</div>
				</div>
				<div class="table-responsive">
					<table class="table table-hover table-sm caption-top align-middle">
						<thead>
							<tr>
								<th>Scadenza</th>
								<th>Misura</th>
								<th>Tipologia</th>
								<th>Stato</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{#each data.scadenze.filter( (s) => (!open ? true : s.outfunds__Status__c === 'Open') ) as s}
								<tr class="text-{s.outfunds__Status__c === 'Complete' ? 'success' : 'black'}">
									<td>
										<small>
											{moment(s.outfunds__Due_Date__c, 'YYYY-MM-DD').format('DD/MM/YYYY')}
										</small>
									</td>
									<td>
										<small>
											{s.outfunds__Funding_Request__r.outfunds__FundingProgram__r
												.outfunds__Parent_Funding_Program__r.Name}
										</small>
									</td>

									<td>
										<small>
											{s.RecordType.Name}
										</small>
									</td>
									<td>
										<small>
											{s.outfunds__Status__c === 'Complete'
												? 'Completato'
												: s.outfunds__Status__c === 'Open'
													? 'Da fare'
													: s.outfunds__Status__c}
										</small>
									</td>
									<td>
										<a href="/op/candidatura/{s.outfunds__Funding_Request__r.Id}" target="_blank">
											<svg class="icon icon-sm icon-primary"
												><use href="/svg/sprites.svg#it-zoom-in"></use></svg
											>
										</a>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
			<div class="it-page-section my-5" id="servizi">
				<h4>Servizi</h4>

				<div class="form-check col-4 col-lg-4 my-4">
					<div class="select-wrapper">
						<label for="filterStatoAvviso">Piattaforma</label>
						<select id="filterStatoAvviso" name="filterStatoAvviso" bind:value={filterPiattaforma}>
							{#each piattaformaOptions as a}
								<option value={a}>{a}</option>
							{/each}
						</select>
					</div>
				</div>

				<div class="table-responsive">
					<table class="table table-hover table-sm caption-top align-middle">
						<thead>
							<tr>
								<th>Piattaforma</th>
								<th>Descrizione</th>
								<th>Data attivazione</th>
							</tr>
						</thead>
						<tbody>
							{#each data.servizi
								.filter((x) => x.Descrizione_Servizio__c !== 'tassonomia_non_valida')
								.filter( (x) => (filterPiattaforma === piattaformaOptions[0] ? true : x.Piattaforma_Servizi__c === filterPiattaforma) ) as s}
								<tr>
									<td>
										<small>
											{s.Piattaforma_Servizi__c}
										</small>
									</td>
									<td>
										<small>
											{s.Descrizione_Servizio__c}
										</small>
									</td>

									<td>
										<small>
											{moment(s.Data_Attivazione__c, 'YYYY-MM-DD').format('DD/MM/YYYY')}
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
