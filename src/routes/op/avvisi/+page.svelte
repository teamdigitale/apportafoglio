<script lang="ts">
	import Cite from '$lib/c/cite.svelte';
	import Avvisocard from './avvisocard.svelte';
	export let data;

	let misuraOptions = [{ idmisura: '', misura: 'Tutte le misure' }].concat(
		data.misure.map((el) => {
			return {
				idmisura: el.Id,
				misura: el.Name
			};
		})
	);

	let filterMisura = '';

	let statoAvvisoOptions = ['Tutti gli stati'].concat(
		Object.values(
			data.avvisi.reduce((a, { outfunds__Status__c }) => {
				a[outfunds__Status__c] = a[outfunds__Status__c] || {
					outfunds__Status__c,
					count: 0
				};
				a[outfunds__Status__c].count++;
				return a;
			}, Object.create(null))
		)
			.map((x: any) => x.outfunds__Status__c)
			.sort()
	);
	let filterStatoAvviso = 'Tutti gli stati';

	$: pacchettoOptions = fp();
	$: filterPacchetto = 'Tutti i pacchetti';

	$: fp = () => {
		if (filterMisura === null || filterMisura === '') {
			return ['Tutti i pacchetti'];
		} else {
			if (data.misure.find((x) => x.Id === filterMisura).Name.indexOf('1.4.4') > -1) {
				return ['Tutti i pacchetti', 'ANPR/ANSC', 'SPID/CIE'];
			} else if (data.misure.find((x) => x.Id === filterMisura).Name.indexOf('1.4.3') > -1) {
				return ['Tutti i pacchetti', 'AppIO', 'PagoPA'];
			} else {
				return ['Tutti i pacchetti'];
			}
		}
	};

	$: beneficiariOptions = calcolaBeneficiari();
	let filterBeneficiari = 'Tutti i beneficiari';

	function calcolaBeneficiari() {
		let res: string[] = [];
		for (let z = 0; z < data.avvisi.length; z++) {
			if (data.avvisi[z].beneficiari) res = res.concat(data.avvisi[z].beneficiari);
		}
		return ['Tutti i beneficiari'].concat(
			res.filter((item, index, arr) => arr.indexOf(item) === index).sort()
		);
	}

	$: filteredAvvisi = data.avvisi
		.filter((x) =>
			filterStatoAvviso === 'Tutti gli stati' ? true : x.outfunds__Status__c === filterStatoAvviso
		)
		.filter((x) =>
			filterMisura === '' ? true : x.outfunds__Parent_Funding_Program__c === filterMisura
		)
		.filter((x) =>
			filterPacchetto === 'Tutti i pacchetti' ? true : x.Pacchetto__c === filterPacchetto
		)
		.filter(
			(x) =>
				filterBeneficiari === 'Tutti i beneficiari' ||
				(x.beneficiari && x.beneficiari.includes(filterBeneficiari))
		);
</script>

<div class="container my-4">
	<h1>Avvisi</h1>
	<Cite text="Ente avvisato, mezzo salvato." author="Anonimo" />

	<div class="row">
		<div class="col-12 col-lg-3 my-4">
			<div class="select-wrapper">
				<label for="filterStatoAvviso">Stato avviso</label>
				<select id="filterStatoAvviso" name="filterStatoAvviso" bind:value={filterStatoAvviso}>
					{#each statoAvvisoOptions as a}
						<option value={a}>{a}</option>
					{/each}
				</select>
			</div>
		</div>
		<div class="col-12 col-lg-3 my-4">
			<div class="select-wrapper">
				<label for="filterMisura">Misura</label>
				<select
					id="filterMisura"
					name="filterMisura"
					bind:value={filterMisura}
					on:change={() => {
						if (filterPacchetto !== 'Tutti i pacchetti') filterPacchetto = 'Tutti i pacchetti';
					}}
				>
					{#each misuraOptions as m}
						<option value={m.idmisura}>{m.misura}</option>
					{/each}
				</select>
			</div>
		</div>
		<div class="col-12 col-lg-3 my-4">
			<div class="select-wrapper">
				<label for="filterPacchetto">Pacchetto</label>
				<select
					id="filterPacchetto"
					name="filterPacchetto"
					bind:value={filterPacchetto}
					disabled={fp().length === 1}
				>
					{#each pacchettoOptions as p}
						<option value={p}>{p}</option>
					{/each}
				</select>
			</div>
		</div>
		<div class="col-12 col-lg-3 my-4">
			<div class="select-wrapper">
				<label for="filterBeneficiari">Beneficiari</label>
				<select id="filterBeneficiari" name="filterBeneficiari" bind:value={filterBeneficiari}>
					{#each beneficiariOptions as b}
						<option value={b}>{b}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	<div class="row">
		{#each filteredAvvisi as avviso}
			<div class="col-12 col-lg-6 my-4">
				<Avvisocard {avviso} />
			</div>
		{/each}
	</div>
</div>
