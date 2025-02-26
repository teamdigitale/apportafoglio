<script>
	import Cite from '$lib/c/cite.svelte';
	import { areaManager, formatNumber } from '$lib/js/shared';
	import Entecard from './entecard.svelte';
	export let data;

	const MAXVIEW = 200;

	let soloattivi = true;

	let tipologiaEnteOptions = ['Tutte le tipologie'].concat(
		Object.values(
			data.enti.reduce((a, { Tipologia_Ente__c }) => {
				a[Tipologia_Ente__c] = a[Tipologia_Ente__c] || {
					Tipologia_Ente__c,
					count: 0
				};
				a[Tipologia_Ente__c].count++;
				return a;
			}, Object.create(null))
		)
			.map((x) => x.Tipologia_Ente__c)
			.sort()
	);
	let filterTipologiaEnte = 'Tutte le tipologie';

	let regioneOptions = ['Tutte le regioni'].concat(
		Object.values(
			data.enti.reduce((a, { Regione__c }) => {
				a[Regione__c] = a[Regione__c] || {
					Regione__c,
					count: 0
				};
				a[Regione__c].count++;
				return a;
			}, Object.create(null))
		)
			.map((x) => x.Regione__c)
			.sort()
	);
	let filterRegione = 'Tutte le regioni';

	let acmOptions = [
		{
			Id: 'All',
			Name: 'Tutti gli AcM'
		}
	]
		.concat(
			Object.values(
				data.enti.reduce((a, b) => {
					//let idacm = b.Account_Manager__c ? b.Account_Manager__c : 'undefined';
					if (b.Account_Manager__c) {
						a[b.Account_Manager__c] = a[b.Account_Manager__c] || {
							Id: b.Account_Manager__c,
							Name: b.Account_Manager__r.Name
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
			data.enti.reduce((a, { portafoglio }) => {
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

	let filterSoppresso = false;

	$: ff = data.enti
		.filter((x) =>
			filterAcm === 'All'
				? true
				: filterAcm === 'undefined'
					? x.Account_Manager__c === null
					: x.Account_Manager__c === filterAcm
		)
		.filter((x) =>
			filterTipologiaEnte == 'Tutte le tipologie'
				? true
				: x.Tipologia_Ente__c === filterTipologiaEnte
		)
		.filter((x) => (filterRegione == 'Tutte le regioni' ? true : x.Regione__c === filterRegione))
		.filter((x) =>
			filterNominativoEnte == ''
				? true
				: x.Name.toLowerCase().includes(filterNominativoEnte.toLowerCase())
		)
		.filter((x) => (!soloattivi ? true : x.Active__c == 1))
		.filter((x) => (!filterSoppresso ? true : x.Stato_giuridico__c === 'Soppresso'));

	$: filteredEnti = ff.slice(0, MAXVIEW);
</script>

<div class="container my-4">
	<h1>Enti</h1>
	<Cite
		text="Con la massa degli oggetti cresce ... il regno
	degli enti estranei a cui l'uomo è soggiogato."
		author="Guy Debord"
	/>

	{#if ff.length > MAXVIEW}
		<div class="alert alert-warning" role="alert">
			Sono visualizzati {MAXVIEW} su {formatNumber(ff.length)} enti. Agisci sui filtri di ricerca per
			restringere il numero di risultati.
		</div>
	{/if}

	<div class="row">
		<!--
		<div class="col-12 col-lg-3 my-4">
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
		{/if}
		<div class="col-12 col-lg-3 my-4">
			<div class="select-wrapper">
				<label for="filterTipologiaEnte">Tipologia</label>
				<select
					id="filterTipologiaEnte"
					name="filterTipologiaEnte"
					bind:value={filterTipologiaEnte}
				>
					{#each tipologiaEnteOptions as te}
						<option value={te}>{te}</option>
					{/each}
				</select>
			</div>
		</div>
		<div class="col-12 col-lg-3 my-4">
			<div class="select-wrapper">
				<label for="filterRegione">Regione</label>
				<select id="filterRegione" name="filterRegione" bind:value={filterRegione}>
					{#each regioneOptions as p}
						<option value={p}>{p}</option>
					{/each}
				</select>
			</div>
		</div>
		<div class="col-12 col-lg-3 my-4">
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
		<div class="col-12 col-lg-3 my-4 form-check">
			<div class="toggles">
				<label class="active" for="filterSoppresso"
					>Soppresso

					<input type="checkbox" id="filterSoppresso" bind:checked={filterSoppresso} />
					<span class="lever"></span>
				</label>
			</div>
		</div>
	</div>

	<div class="row">
		{#each filteredEnti as ente}
			<div class="col-12 col-lg-6 my-4">
				<Entecard {ente} />
			</div>
		{/each}
	</div>
</div>
