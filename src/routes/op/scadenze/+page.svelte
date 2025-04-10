<script>
	// @ts-nocheck

	import Scorecard from '$lib/c/scorecard.svelte';
	import Cite from '$lib/c/cite.svelte';
	import { areaManager, euro, setscroll } from '$lib/js/shared';
	import { onMount } from 'svelte';
	import moment from 'moment/min/moment-with-locales';
	import Pagination from '$lib/c/pagination.svelte';
	import Richiestavariazionecard from './richiestavariazionecard.svelte';
	moment.locale('it');

	export let data;

	let cperpagecontr;
	let cpcontr = 0;

	let cperpagecompl;
	let cpcompl = 0;

	let acmOptions = [
		{
			Id: 'All',
			Name: 'Tutti gli AcM'
		}
	]
		.concat(
			Object.values(
				data.scadenze.reduce((a, b) => {
					//let idacm = b.Account_Manager__c ? b.Account_Manager__c : 'undefined';
					if (
						b.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Account_Manager__c
					) {
						a[
							b.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Account_Manager__c
						] = a[
							b.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Account_Manager__c
						] || {
							Id: b.outfunds__Funding_Request__r.outfunds__Applying_Organization__r
								.Account_Manager__c,
							Name: b.outfunds__Funding_Request__r.outfunds__Applying_Organization__r
								.Account_Manager__r.Name
						};
					}
					return a;
				}, Object.create(null))
			)
				//.map((x) => x.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Account_Manager__c).filter(x => nomeUtente(x)!=='Standard')
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

	$: contrattualizzazioni = data.scadenze
		.filter((x) =>
			filterAcm === 'All'
				? true
				: filterAcm === 'undefined'
					? x.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Account_Manager__c ===
						null
					: x.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Account_Manager__c ===
						filterAcm
		)
		.filter((f) => f.RecordType.Name === 'Contrattualizzazione Fornitore');

	$: contrattualizzazioni7 = contrattualizzazioni.filter((s) =>
		moment(s.outfunds__Due_Date__c, 'YYYY-MM-DD').isBefore(moment().add(7, 'days'))
	);

	$: contrattualizzazioni30 = contrattualizzazioni.filter(
		(s) =>
			moment(s.outfunds__Due_Date__c, 'YYYY-MM-DD').isBefore(moment().add(30, 'days')) &&
			moment(s.outfunds__Due_Date__c, 'YYYY-MM-DD').isAfter(moment().add(7, 'days'))
	);

	$: contrattualizzazionip30 = contrattualizzazioni.filter((s) =>
		moment(s.outfunds__Due_Date__c, 'YYYY-MM-DD').isAfter(moment().add(30, 'days'))
	);

	$: completamenti = data.scadenze
		.filter((x) =>
			filterAcm === 'All'
				? true
				: filterAcm === 'undefined'
					? x.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Account_Manager__c ===
						null
					: x.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Account_Manager__c ===
						filterAcm
		)
		.filter((f) => f.RecordType.Name === 'Completamento Attività');

	$: completamenti7 = completamenti.filter((s) =>
		moment(s.outfunds__Due_Date__c, 'YYYY-MM-DD').isBefore(moment().add(7, 'days'))
	);

	$: completamenti30 = completamenti.filter(
		(s) =>
			moment(s.outfunds__Due_Date__c, 'YYYY-MM-DD').isBefore(moment().add(30, 'days')) &&
			moment(s.outfunds__Due_Date__c, 'YYYY-MM-DD').isAfter(moment().add(7, 'days'))
	);

	$: completamentip30 = completamenti.filter((s) =>
		moment(s.outfunds__Due_Date__c, 'YYYY-MM-DD').isAfter(moment().add(30, 'days'))
	);

	$: richiestedivariazione = data.scadenze
		.filter((x) =>
			filterAcm === 'All'
				? true
				: filterAcm === 'undefined'
					? x.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Account_Manager__c ===
						null
					: x.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Account_Manager__c ===
						filterAcm
		)
		.filter((s) => {
			return s.rv.length > 0;
		});

	$: richiestedivariazione90 = data.scadenze
		.filter((x) =>
			filterAcm === 'All'
				? true
				: filterAcm === 'undefined'
					? x.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Account_Manager__c ===
						null
					: x.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Account_Manager__c ===
						filterAcm
		)
		.filter((s) => {
			return s.rv.length > 0 && Number(s.rv[0].Giorni_richiesti__c) >= 90;
		});

	$: richiestedivariazioneno90 = data.scadenze
		.filter((x) =>
			filterAcm === 'All'
				? true
				: filterAcm === 'undefined'
					? x.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Account_Manager__c ===
						null
					: x.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Account_Manager__c ===
						filterAcm
		)
		.filter((s) => {
			return s.rv.length > 0 && Number(s.rv[0].Giorni_richiesti__c) < 90;
		});

	onMount(async () => {
		await setscroll();
	});
</script>

<div class="container my-4">
	<h1>Scadenze</h1>
	<Cite
		text="Le scadenze sono positive. Ti aiutano a organizzare il tuo tempo. Ti aiutano a fissare delle priorità. Ti fanno fare le cose anche quando non ne hai voglia."
		author="Harvey Mackay"
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
										<a class="nav-link active" href="#riepilogoscadenze">
											<span>1. Riepilogo </span>
										</a>
										<ul class="link-list">
											<li class="nav-link">
												<a class="nav-link" href="#scadenzecontrattualizzazioni">
													<span>1.1 Scadenze contrattualizzazione </span>
												</a>
											</li>
											<li class="nav-link">
												<a class="nav-link" href="#scadenzecompletamenti">
													<span>1.2 Scadenze completamento attività </span>
												</a>
											</li>
											<li class="nav-link">
												<a class="nav-link" href="#proroghe90giorni">
													<span>1.3 Richieste di proroga in corso </span>
												</a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</div>
		<div class="col-12 col-lg-10 it-page-sections-container">
			<div class="it-page-section my-5" id="riepilogoscadenze">
				<h4>Riepilogo</h4>
				<p>
					In questa sezione potrai consultare tutte le scadenze dei cronoprogrammi relative alle
					candidature appartenenti al tuo portafoglio. Potrai inoltre vedere le <strong
						>richieste di variazione di cronoprogramma con numero di giorni maggiore di 90 ed ancora
						in corso</strong
					>; per queste richieste è necssario il tuo parere affinche Unità di Missione possa
					procedere con la valutazione.
				</p>
				<p>
					Per avere una visione globale del tuo portafoglio, consulta la pagina <a
						href="/cruscotti/generale">Cruscotto generale</a
					>
				</p>
			</div>
			{#if areaManager(data.utentestandard.idsf)}
				<div class="row">
					<div class="col-12 col-lg-3 my-4">
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
			<div class="it-page-section my-5" id="scadenzecontrattualizzazioni">
				<h4>Scadenze contrattualizzazione</h4>
				<p>
					Nel tuo portafoglio sono presenti <strong
						>{contrattualizzazioni.length} candidature in fase di contrattualizzazione fornitore.</strong
					>
				</p>
				<div class="row my-4">
					<div class="col-12 col-lg-4">
						<Scorecard
							bgcolor="danger"
							textcolor="white"
							title={contrattualizzazioni7.length}
							text="contrattualizzazioni entro 7 giorni"
						/>
					</div>
					<div class="col-12 col-lg-4">
						<Scorecard
							bgcolor="warning"
							textcolor="white"
							title={contrattualizzazioni30.length}
							text="contrattualizzazioni entro 30 giorni"
						/>
					</div>
					<div class="col-12 col-lg-4">
						<Scorecard
							bgcolor="primary"
							textcolor="white"
							title={contrattualizzazionip30.length}
							text="contrattualizzazioni a più di 30 giorni"
						/>
					</div>
				</div>
				<div class="container my-4">
					<div class="table-responsive">
						<table class="table table-hover table-sm caption-top align-middle">
							<caption>Scadenze contrattualizzazione</caption>
							<thead>
								<tr>
									<th>Ente</th>
									<th>Avviso</th>
									<th>Scadenza</th>
									<th>Richiesta Variazione</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{#if cperpagecontr}
									{#each cperpagecontr as c}
										<tr
											class={moment(c.outfunds__Due_Date__c, 'YYYY-MM-DD').isBefore(
												moment().add(7, 'days')
											)
												? 'text-danger'
												: moment(c.outfunds__Due_Date__c, 'YYYY-MM-DD').isAfter(
															moment().add(30, 'days')
													  )
													? 'text-primary'
													: 'text-warning'}
										>
											<td
												><small
													>{c.outfunds__Funding_Request__r.outfunds__Applying_Organization__r
														.Name}</small
												></td
											>
											<td
												><small
													>{c.outfunds__Funding_Request__r.outfunds__FundingProgram__r.Name}</small
												></td
											>
											<td
												><small
													>{moment(c.outfunds__Due_Date__c, 'YYYY-MM-DD').format(
														'DD/MM/YYYY'
													)}</small
												></td
											>
											<td
												><small
													>{#if c.rv && c.rv.length > 0}
														SI - {c.rv[0].Giorni_richiesti__c} giorni
													{:else}
														NO
													{/if}</small
												></td
											>
											<td>
												<a
													href="/op/candidatura/{c.outfunds__Funding_Request__r.Id}"
													target="_blank"
												>
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
									<th colspan="5"
										><Pagination
											rows={contrattualizzazioni}
											bind:cp={cpcontr}
											perPage={10}
											bind:trimmedRows={cperpagecontr}
										/></th
									>
								</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
			<div class="it-page-section my-5" id="scadenzecompletamenti">
				<h4>Scadenze completamento attività</h4>
				<p>
					Nel tuo portafoglio sono presenti <strong
						>{completamenti.length} candidature in fase di realizzazione.</strong
					>
				</p>
				<div class="row my-4">
					<div class="col-12 col-lg-4">
						<Scorecard
							bgcolor="danger"
							textcolor="white"
							title={completamenti7.length}
							text="completamenti attività entro 7 giorni"
						/>
					</div>
					<div class="col-12 col-lg-4">
						<Scorecard
							bgcolor="warning"
							textcolor="white"
							title={completamenti30.length}
							text="completamenti attività entro 30 giorni"
						/>
					</div>
					<div class="col-12 col-lg-4">
						<Scorecard
							bgcolor="primary"
							textcolor="white"
							title={completamentip30.length}
							text="completamenti attività a più di 30 giorni"
						/>
					</div>
				</div>
				<div class="container my-4">
					<div class="table-responsive">
						<table class="table table-hover table-sm caption-top align-middle">
							<caption>Scadenze completamento</caption>
							<thead>
								<tr>
									<th>Ente</th>
									<th>Avviso</th>
									<th>Scadenza</th>
									<th>Richiesta Variazione</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{#if cperpagecompl}
									{#each cperpagecompl as c}
										<tr
											class={moment(c.outfunds__Due_Date__c, 'YYYY-MM-DD').isBefore(
												moment().add(7, 'days')
											)
												? 'text-danger'
												: moment(c.outfunds__Due_Date__c, 'YYYY-MM-DD').isAfter(
															moment().add(30, 'days')
													  )
													? 'text-primary'
													: 'text-warning'}
										>
											<td
												><small
													>{c.outfunds__Funding_Request__r.outfunds__Applying_Organization__r
														.Name}</small
												></td
											>
											<td
												><small
													>{c.outfunds__Funding_Request__r.outfunds__FundingProgram__r.Name}</small
												></td
											>
											<td
												><small
													>{moment(c.outfunds__Due_Date__c, 'YYYY-MM-DD').format(
														'DD/MM/YYYY'
													)}</small
												></td
											>
											<td
												><small
													>{#if c.rv && c.rv.length > 0}
														SI - {c.rv[0].Giorni_richiesti__c} giorni
													{:else}
														NO
													{/if}</small
												></td
											>
											<td
												><a
													href="/op/candidatura/{c.outfunds__Funding_Request__r.Id}"
													target="_blank"
												>
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
									<th colspan="5"
										><Pagination
											rows={completamenti}
											bind:cp={cpcompl}
											perPage={10}
											bind:trimmedRows={cperpagecompl}
										/></th
									>
								</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
			<div class="it-page-section my-5" id="proroghe90giorni">
				<h4>Richieste di proroga in corso</h4>
				{#if richiestedivariazione.length === 0}
					<div class="alert alert-success" role="alert">
						Non ci sono richieste di proroga in corso
					</div>
				{:else}
					{#if richiestedivariazione90.length === 0}
						<div class="alert alert-success" role="alert">
							Non hai richieste di proroga per le quali è necessario un parere dell'Account Manager.
						</div>
					{:else}
						<div class="alert alert-danger" role="alert">
							Nel tuo portafoglio sono presenti {richiestedivariazione90.length} richieste di proroga
							per le quali è necessario un parere dell'Account Manager.
						</div>
						<div class="row my-4">
							{#each richiestedivariazione90 as s}
								<div class="col-12 col-lg-6">
									<Richiestavariazionecard idu={data.idusf} scadenza={s} />
								</div>
							{/each}
						</div>
					{/if}

					{#if richiestedivariazioneno90.length === 0}
						<div class="alert alert-success" role="alert">Non hai richieste di proroga</div>
					{:else}
						<div class="alert alert-danger" role="alert">
							Nel tuo portafoglio sono presenti {richiestedivariazioneno90.length} richieste di proroga
							in corso.
						</div>
						<div class="row my-4">
							{#each richiestedivariazioneno90 as s}
								<div class="col-12 col-lg-6">
									<Richiestavariazionecard idu={data.idusf} scadenza={s} />
								</div>
							{/each}
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</div>
</div>
