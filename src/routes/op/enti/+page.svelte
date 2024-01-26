<script>
	import Cite from '$lib/c/cite.svelte';
	import Entecard from './entecard.svelte';
	export let data;

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

	$: filteredEnti = data.enti
		.filter((x) =>
			filterPortafoglio == 'Tutti i portafogli' ? true : x.portafoglio === filterPortafoglio
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
		;
</script>

<div class="container my-4">
	<h1>Enti</h1>
	<Cite
		text="Con la massa degli oggetti cresce ... il regno
	degli enti estranei a cui l'uomo è soggiogato."
		author="Guy Debord"
	/>

	<div class="row">
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
			<input type="text" class="form-control" id="filterNominativoEnte" name="filterNominativoEnte" placeholder="Digitare parte del nome dell'Ente"
			bind:value={filterNominativoEnte}>
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
