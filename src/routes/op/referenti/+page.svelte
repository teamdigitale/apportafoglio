<script>
	import Cite from '$lib/c/cite.svelte';
	import Referentecard from './referentecard.svelte';
	export let data;

	console.log(data);

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

	$: filteredReferenti = data.referenti
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
</script>

<div class="container my-4">
	<h1>Referenti</h1>
	<Cite
		text="Le persone cambiano e si dimenticano di
		avvisare gli altri."
		author="Lillian Hellman"
	/>

	<div class="row">
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
		<div class="col-12 col-lg-6 my-4">
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
		<div class="col-12 col-lg-4 my-4">
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
		<div class="col-12 col-lg-4 my-4">
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
		<div class="col-12 col-lg-4 my-4">
			<div class="form-group">
				<label class="active" for="filterNominativoReferente">Numero di telefono del referente</label>
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
</div>
