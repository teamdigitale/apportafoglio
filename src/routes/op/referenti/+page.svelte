<script>
	import Cite from '$lib/c/cite.svelte';
	import { onMount } from 'svelte';
	import Referentecard from './referentecard.svelte';
	import { areaManager, formatNumber } from '$lib/js/shared';
	export let data;

	const MAXVIEW = 200;

	let pregnolato = false;

	let memes = [
		{
			id: 1,
			img: 'scuola',
			label: 'Pregnolato che scopre un comune senza scuola... che ha candidato "Mensa scolastica"'
		},
		{ id: 2, img: 'parere', label: "Pregnolato che aspetta il parere dell'account" },
		{ id: 3, img: 'liquida', label: 'Pregnolato che liquida scuole e comuni' },
		{ id: 4, img: 'proroghe', label: "Pregnolato che approva le proroghe dell'ultimo minuto" },
		{ id: 5, img: 'revoca', label: 'Pregnolato che fa una revoca' },
		{ id: 6, img: 'scadute', label: 'Pregnolato che recupera le candidature scadute' },
		{ id: 7, img: 'verbale', label: "Pregnolato che trova l'ennesimo verbale non firmato" }
	];

	let statoReferenteOptions = ['Tutti'].concat(
		Object.values(
			data.referenti.reduce((a, { Stato__c }) => {
				a[Stato__c] = a[Stato__c] || {
					Stato__c,
					count: 0
				};
				a[Stato__c].count++;
				return a;
			}, Object.create(null))
		)
			.map((x) => x.Stato__c)
			.sort()
	);
	let filterStatoReferente = 'Attivo';

	let acmOptions = [
		{
			Id: 'All',
			Name: 'Tutti gli AcM'
		}
	]
		.concat(
			Object.values(
				data.referenti.reduce((a, b) => {
					//let idacm = b.Account_Manager__c ? b.Account_Manager__c : 'undefined';
					if (b.Account.Account_Manager__c) {
						a[b.Account.Account_Manager__c] = a[b.Account.Account_Manager__c] || {
							Id: b.Account.Account_Manager__c,
							Name: b.Account.Account_Manager__r.Name
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

	let portafoglioOptions = ['Tutti i portafogli'].concat(
		Object.values(
			data.referenti.reduce((a, { portafoglio }) => {
				a[portafoglio] = a[portafoglio] || {
					portafoglio,
					count: 0
				};
				a[portafoglio].count++;
				return a;
			}, Object.create(null))
		)
			.map((x) => x.portafoglio)
			.sort()
	);
	let filterPortafoglio = 'Tutti i portafogli';

	let filterNominativoEnte = '';
	let filterNominativoReferente = '';
	let filterTelefonoReferente = '';

	$: ff = data.referenti
		.filter((x) =>
			filterAcm === 'All'
				? true
				: filterAcm === 'undefined'
					? x.Account.Account_Manager__c === null
					: x.Account.Account_Manager__c === filterAcm
		)
		.filter((x) => (filterStatoReferente === 'Tutti' ? true : x.Stato__c === filterStatoReferente))
		.filter((x) =>
			filterPortafoglio == 'Tutti i portafogli' ? true : x.portafoglio === filterPortafoglio
		)
		.filter((x) =>
			filterNominativoEnte == ''
				? true
				: x.Account.Name.toLowerCase().includes(filterNominativoEnte.toLowerCase())
		)
		.filter((x) =>
			filterNominativoReferente == ''
				? true
				: x.Name.toLowerCase().includes(filterNominativoReferente.toLowerCase())
		)
		.filter((x) =>
			filterTelefonoReferente == ''
				? true
				: x.MobilePhone
					? x.MobilePhone.includes(filterTelefonoReferente)
					: false
		);

	$: filteredReferenti = ff.slice(0, MAXVIEW);

	let caru;

	$: setMeme = () => {
		if (filterNominativoReferente === 'pregnolato') {
			pregnolato = true;
			if (!caru) {
				setTimeout(() => {
					caru = new bootstrap.CarouselBI(document.querySelector('#caru'));
				}, 1000);
			}
		} else {
			pregnolato = false;
			if (caru) {
				caru.dispose();
				caru = null;
			}
		}
	};

	$: setMeme();
</script>

<div class="container my-4">
	<h1>Referenti</h1>
	<Cite
		text="Le persone cambiano e si dimenticano di
		avvisare gli altri."
		author="Lillian Hellman"
	/>

	{#if ff.length>MAXVIEW}
	<div class="alert alert-warning" role="alert">
		Sono visualizzati {MAXVIEW} su {formatNumber(ff.length)} referenti. Agisci sui filtri di ricerca per
		restringere il numero di risultati.
	</div>
	{/if}

	<div class="row">
		<!--
		<div class="col-12 col-lg-6 my-4">
			<div class="select-wrapper">
				<label for="filterPortafoglio">Portafoglio</label>
				<select id="filterPortafoglio" name="filterPortafoglio" bind:value={filterPortafoglio}>
					{#each portafoglioOptions as a}
						<option value={a}>{a}</option>
					{/each}
				</select>
			</div>
		</div>
		-->
		{#if areaManager(data.utentestandard.idsf)}
			<div class="col-12 col-lg-{areaManager(data.utentestandard.idsf) ? '4' : '3'} my-4">
				<div class="select-wrapper">
					<label for="filterAcm">Account Manager</label>
					<select id="filterAcm" name="filterAcm" bind:value={filterAcm}>
						{#each acmOptions as te}
							<option value={te.Id}>{te.Name}</option>
						{/each}
					</select>
				</div>
			</div>
		{/if}
		<div class="col-12 col-lg-{areaManager(data.utentestandard.idsf) ? '4' : '3'} my-4">
			<div class="select-wrapper">
				<label for="filterStatoReferente">Stato</label>
				<select
					id="filterStatoReferente"
					name="filterStatoReferente"
					bind:value={filterStatoReferente}
				>
					{#each statoReferenteOptions as te}
						<option value={te}>{te}</option>
					{/each}
				</select>
			</div>
		</div>
		<div class="col-12 col-lg-{areaManager(data.utentestandard.idsf) ? '4' : '3'} my-4">
			<div class="form-group">
				<label class="active" for="filterNominativoEnte">Nome dell'Ente</label>
				<input
					type="text"
					class="form-control"
					id="filterNominativoEnte"
					name="filterNominativoEnte"
					placeholder="Digitare parte del nome dell'Ente"
					bind:value={filterNominativoEnte}
				/>
			</div>
		</div>
		<div class="col-12 col-lg-{areaManager(data.utentestandard.idsf) ? '4' : '3'} my-4">
			<div class="form-group">
				<label class="active" for="filterNominativoReferente">Nominativo del referente</label>
				<input
					type="text"
					class="form-control"
					id="filterNominativoReferente"
					name="filterNominativoReferente"
					placeholder="Digitare parte del nome del referente"
					bind:value={filterNominativoReferente}
				/>
			</div>
		</div>
		<div class="col-12 col-lg-{areaManager(data.utentestandard.idsf) ? '4' : '3'} my-4">
			<div class="form-group">
				<label class="active" for="filterNominativoReferente"
					>Numero di telefono del referente</label
				>
				<input
					type="text"
					class="form-control"
					id="filterTelefonoReferente"
					name="filterTelefonoReferente"
					placeholder="Digitare parte del numero di telefono"
					bind:value={filterTelefonoReferente}
				/>
			</div>
		</div>
	</div>

	<div class="row">
		{#each filteredReferenti as referente}
			<div class="col-12 col-lg-6 my-4">
				<Referentecard {referente} />
			</div>
		{/each}
	</div>
	{#if pregnolato}
		<div class="row">
			<div class="col-12 col-lg-12 my-4">
				<div
					id="caru"
					class="it-carousel-wrapper it-carousel-landscape-abstract-three-cols it-full-carousel splide"
					data-bs-carousel-splide
				>
					<div class="splide__track">
						<ul class="splide__list">
							{#each memes as m}
								<li class="splide__slide">
									<div class="it-single-slide-wrapper">
										<img
											src="/img/meme/{m.img}.jpg"
											alt={m.label}
											class="img-fluid img-thumbnail"
										/>

										<div class="card-body px-3 px-md-4">
											<h5 class="card-title">
												{m.label}
											</h5>
										</div>
									</div>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
