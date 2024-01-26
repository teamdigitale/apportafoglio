<script>
	import Cite from '$lib/c/cite.svelte';
	import { onMount } from 'svelte';
	import moment from 'moment/min/moment-with-locales';

	import Pagination from '$lib/c/pagination.svelte';
	import { euro, formatBytes } from '$lib/js/shared';
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

<div class="container my-4">
	<h1>Dettaglio candidatura</h1>
	<Cite text="La verità della storia è nei dettagli" author="Paul Auster" />
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
										<a class="nav-link active" href="#storia">
											<span>1. Storico </span>
										</a>
										<a class="nav-link active" href="#servizi">
											<span>2. Servizi </span>
										</a>
										<a class="nav-link active" href="#fornitori">
											<span>3. Fornitori </span>
										</a>
										<a class="nav-link active" href="#files">
											<span>4. Files </span>
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
			<div class="it-page-section my-5" id="storia">
				<h4>Storico della candidatura</h4>
				<p>
					In questa sezione puoi vedere lo storico della candidatura con tutte le informazioni
					relative agli eventi salienti della stessa.
				</p>
				<h6>
					ENTE: {data.c.outfunds__Applying_Organization__r.Name}
				</h6>
				<h6>Stato attuale candidatura: {data.c.outfunds__Status__c}</h6>
				<h6>
					Stato attuale del progetto:
					{data.c.Stato_Progetto__c ? data.c.Stato_Progetto__c : 'n.a.'}
				</h6>
				<div class="it-timeline-wrapper">
					<div class="row my-4">
						{#each Object.entries(data.chgrouped) as [key, value], index}
							<div class="col-12">
								<div class="timeline-element">
									<div
										class="it-pin-wrapper {key.split(':')[1] === 'D' ? 'it-now' : 'it-evidence'}"
									>
										{#if key.split(':')[1] === 'D'}
											<div class="pin-icon bg-white">
												<svg class="icon icon-primary"
													><use href="/svg/sprites.svg#it-team-digitale"></use></svg
												>
											</div>
										{:else}
											<div class="pin-icon">
												<svg class="icon"><use href="/svg/sprites.svg#it-pa"></use></svg>
											</div>
										{/if}

										<div class="pin-text">
											<span
												>{key.split(':')[0]} - ({index != Object.entries(data.chgrouped).length - 1
													? moment(key.split(':')[0], 'DD/MM/YYYY').startOf('day').fromNow()
													: moment(key.split(':')[0], 'DD/MM/YYYY').startOf('day').fromNow()})</span
											>
										</div>
									</div>
									<div class="card-wrapper">
										<div class="card">
											<div class="card-body">
												<div>
													{#each value as h, i}
														<h5 class="card-title">{h.title}</h5>
														<p>
															{h.subtitle}
														</p>

														{#if h.Field === 'COMUNICAZIONE'}
															<div class="accordion" id="collapsedetails">
																<div class="accordion-item">
																	<h2 class="accordion-header" id="heading{i}c">
																		<button
																			class="accordion-button collapsed"
																			type="button"
																			data-bs-toggle="collapse"
																			data-bs-target="#collapse{i}c"
																			aria-expanded="true"
																			aria-controls="collapse{i}c"
																		>
																			Comunicazione
																		</button>
																	</h2>
																	<div
																		id="collapse{i}c"
																		class="accordion-collapse collapse"
																		role="region"
																		aria-labelledby="heading{i}c"
																	>
																		<div class="accordion-body">
																			{@html h.NewValue}
																		</div>
																	</div>
																</div>
															</div>
														{/if}

														{#if h.Field === 'outfunds__Status__c' && h.OldValue === 'AMMESSA' && h.NewValue === 'ACCETTATA'}
															<p class="text-success">
																<strong>CUP: {data.c.Codice_CUP__c}</strong>
															</p>
														{/if}

														{#if h.Field === 'Stato_Progetto__c' && h.OldValue === 'IN LIQUIDAZIONE' && h.NewValue === 'LIQUIDATO'}
															<p class="text-success">
																<strong>{euro(data.c.outfunds__Awarded_Amount__c)}</strong>
															</p>
														{/if}
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
			</div>
			<div class="it-page-section my-5" id="servizi">
				<h4>Servizi</h4>
				<p>
					In questa sezione puoi vedere informazioni relative ai servizi appartenenti alla
					candidatura.
				</p>
				<div class="container my-4">
					<div class="table-responsive">
						<table class="table table-hover table-sm caption-top align-middle">
							<caption>Servizi</caption>
							<thead>
								<tr>
									<th>#</th>
									<th>Nome</th>
									<th>Stato</th>
									<th>Data di completamento</th>
									<th>Data di attivazione in esercizio</th>
									<th>Esito controlli automatici</th>
								</tr>
							</thead>
							<tbody>
								{#each data.sr as s, index}
									<tr>
										<td>
											<small>
												{index + 1}
											</small>
										</td>
										<td>
											<small>
												{s.Name}
											</small>
										</td>
										<td>
											<small>
												{s.Stato_Attivit__c}
											</small>
										</td>
										<td>
											<small>
												{s.Data_di_completamento__c
													? moment(s.Data_di_completamento__c).format('DD/MM/YYYY')
													: 'n.d.'}
											</small>
										</td>
										<td>
											<small
												>{s.Data_attivazione_servizio__c
													? moment(s.Data_attivazione_servizio__c).format('DD/MM/YYYY')
													: 'n.d.'}</small
											>
										</td>
										<td
											><small>
												{s.Esito_controlli__c ? s.Esito_controlli__c : 'n.d.'}
											</small></td
										>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="it-page-section my-5" id="fornitori">
				<h4>Fornitori</h4>
				<p>
					In questa sezione puoi vedere informazioni relative ai fornitori dei servizi della
					candidatura e scaricarne la documentazione contrattuale.
				</p>
				<div class="container my-4">
					<div class="table-responsive">
						<table class="table table-hover table-sm caption-top align-middle">
							<caption>Fornitori</caption>
							<thead>
								<tr>
									<th>#</th>
									<th>Servizio</th>
									<th>Fornitore</th>
									<th>Data di contrattualizzazione</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{#each data.soggettiRealizzatori as s, index}
									{#if data.sr.filter((x) => s.Servizio__c === x.Id && s.Denominazione_Soggetto_Realizzatore__c)[0]}
										<tr>
											<td>
												<small>
													{index + 1}
												</small>
											</td>
											<td>
												<small>
													{data.sr.filter((x) => s.Servizio__c === x.Id)[0].Name}
												</small>
											</td>
											<td>
												<small>
													{s.Denominazione_Soggetto_Realizzatore__c
														? s.Denominazione_Soggetto_Realizzatore__c
														: 'n.d.'}
												</small>
											</td>
											<td>
												<small>
													{moment(s.Data_Contrattualizzazione__c).format('DD/MM/YYYY')}
												</small>
											</td>
											<td>
												{#if s.contratti && s.contratti.length > 0}
													{#each s.contratti as fc, i}
														<a href="/api/file/{fc.ContentDocumentId}" target="_blank">
															<svg class="icon icon-sm icon-primary"
																><use href="/svg/sprites.svg#it-download"></use></svg
															>
														</a>
													{/each}
												{/if}
											</td>
										</tr>
									{/if}
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="it-page-section my-5" id="files">
				<h4>Files</h4>
				<p>In questa sezione puoi vedere e scaricare i files appartenenti alla candidatura</p>
				<div class="container my-4">
					<div class="table-responsive">
						<table class="table table-hover table-sm caption-top align-middle">
							<caption>Files appartenenti alla candidatura</caption>
							<thead>
								<tr>
									<th>#</th>
									<th>Nome</th>
									<th>Data</th>
									<th>Tipo</th>
									<th>Dimensione</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{#each data.filesCandidatura as file, index}
									<tr>
										<td>
											<small>
												{index + 1}
											</small>
										</td>
										<td>
											<small>
												{file.ContentDocument.Title}
											</small>
										</td>
										<td>
											<small>
												{moment(file.ContentDocument.LastModifiedDate).format(
													'DD/MM/YYYY - HH:mm:ss'
												)}
											</small>
										</td>
										<td>
											<small>
												{file.ContentDocument.FileExtension}
											</small>
										</td>
										<td>
											<small>
												{formatBytes(file.ContentDocument.ContentSize)}
											</small>
										</td>
										<td>
											<a href="/api/file/{file.ContentDocumentId}" target="_blank">
												<svg class="icon icon-sm icon-primary"
													><use href="/svg/sprites.svg#it-download"></use></svg
												>
											</a>
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
