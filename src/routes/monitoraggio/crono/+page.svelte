<script>
	import { onMount } from 'svelte';
	import Columnchart from '$lib/c/charts/columnchart.svelte';
	export let data;
	import moment from 'moment/min/moment-with-locales';
	import Combochart from './combochart.svelte';
	moment.locale('it');

    console.log(data);

	onMount(async () => {});

	let misure = ['Tutte le misure'].concat(
		Object.values(
			data.scadenze.reduce((a, m) => {
				a[
					m.outfunds__Funding_Request__r.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name
				] = a[
					m.outfunds__Funding_Request__r.outfunds__FundingProgram__r
						.outfunds__Parent_Funding_Program__r.Name
				] || {
					misura:
						m.outfunds__Funding_Request__r.outfunds__FundingProgram__r
							.outfunds__Parent_Funding_Program__r.Name,
					count: 0
				};
				a[
					m.outfunds__Funding_Request__r.outfunds__FundingProgram__r
						.outfunds__Parent_Funding_Program__r.Name
				].count++;
				return a;
			}, Object.create(null))
		)
			.map((x) => x.misura)
			.sort()
	);

	let tipiente = ['Tutte le tipologie'].concat(
		Object.values(
			data.scadenze.reduce((a, m) => {
				a[m.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Tipologia_Ente__c] = a[
					m.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Tipologia_Ente__c
				] || {
					tipoente:
						m.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Tipologia_Ente__c,
					count: 0
				};
				a[m.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Tipologia_Ente__c]
					.count++;
				return a;
			}, Object.create(null))
		)
			.map((x) => x.tipoente)
			.sort()
	);

	let filterMisure = misure[0];
	let filterTipoEnte = tipiente[0];

	$: filteredScadenze = data.scadenze
		.filter((s) =>
			filterMisure === misure[0]
				? true
				: s.outfunds__Funding_Request__r.outfunds__FundingProgram__r
						.outfunds__Parent_Funding_Program__r.Name === filterMisure
		)
		.filter((s) =>
			filterTipoEnte === tipiente[0]
				? true
				: s.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Tipologia_Ente__c ===
					filterTipoEnte
		);

	function calcolaRange(s, e) {
		const d = [];
		let current = new Date(s.getFullYear(), s.getMonth(), 1);
		current.setHours(0);
		current.setMinutes(0);
		current.setSeconds(0);
		current.setMilliseconds(0);
		while (current < e) {
			let lastDayOfMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0);
			lastDayOfMonth.setHours(23);
			lastDayOfMonth.setMinutes(59);
			lastDayOfMonth.setSeconds(59);
			lastDayOfMonth.setMilliseconds(999);
			d.push(lastDayOfMonth);
			current.setDate(lastDayOfMonth.getDate() + 1);
			current.setHours(0);
			current.setMinutes(0);
			current.setSeconds(0);
			current.setMilliseconds(0);
		}
		return d;
	}

	function getQuarter(d) {
		d = d || new Date();
		var m = Math.floor(d.getMonth() / 3) + 1;
		return m > 4 ? m - 4 : m;
	}

	function calcolaQuarters(s, e) {
		const d = [];
		let current = new Date(s.getFullYear(), s.getMonth(), 1);
		current.setHours(0);
		current.setMinutes(0);
		current.setSeconds(0);
		current.setMilliseconds(0);
		while (current < e) {
			const q = getQuarter(new Date(current));
			const y = new Date(current).getFullYear();
			const quarter = 'Q-' + y + '-' + q;
			if (d.indexOf(quarter) === -1) {
				d.push(quarter);
			}
			current.setDate(current.getDate() + 1);
			current.setHours(0);
			current.setMinutes(0);
			current.setSeconds(0);
			current.setMilliseconds(0);
		}
		return d;
	}

	let datesRange = calcolaRange(new Date(), new Date(2026, 11, 31));
	let quartersRange = calcolaQuarters(new Date(), new Date(2026, 11, 31));

	$: getDataScadenze = () => {
		const res = [['Mese', '# contrattualizzate','# da contrattualizzare']];
		datesRange.forEach((d) => {
			const numero = filteredScadenze
				.filter(
					(f) => f.tipologia=== 'Contrattualizzati' &&
						d.getFullYear() === new Date(f.outfunds__Due_Date__c).getFullYear() &&
						d.getMonth() === new Date(f.outfunds__Due_Date__c).getMonth()
				)
				.reduce((acc, c) => acc + 1, 0);
            const numeroDaContr = filteredScadenze
				.filter(
					(f) => f.tipologia=== 'Da contrattualizzare' &&
						d.getFullYear() === new Date(f.outfunds__Due_Date__c).getFullYear() &&
						d.getMonth() === new Date(f.outfunds__Due_Date__c).getMonth()
				)
				.reduce((acc, c) => acc + 1, 0);
			res.push([d, numero,numeroDaContr]);
		});
		return res;
	};

	$: getDataScadenzeQuarters = () => {
		const res = [['Quarter', '# contrattualizzate','# da contrattualizzare']];
		quartersRange.forEach((d) => {
			const numero = filteredScadenze.filter((f) => f.tipologia=== 'Contrattualizzati' && d === f.quarter).reduce((acc, c) => acc + 1, 0);
            const numerocontr = filteredScadenze.filter((f) => f.tipologia=== 'Da contrattualizzare' && d === f.quarter).reduce((acc, c) => acc + 1, 0);
			res.push([d, numero,numerocontr]);
		});
		return res;
	};

	$: filteredEnti = data.enti.filter((e) =>
		filterTipoEnte === tipiente[0] ? true : e.Tipologia_Ente__c === filterTipoEnte
	);

	let dataTarget = '2026-12-31';
	let percentualeTarget = 80;

	const checkPerc = () => {
		if (percentualeTarget > 100) percentualeTarget = 100;
		if (percentualeTarget < 0) percentualeTarget = 0;
	};

	let percentualeSicurezzaBucket = 10;

	const checkPercBucket = () => {
		if (percentualeSicurezzaBucket > 30) percentualeSicurezzaBucket = 30;
		if (percentualeSicurezzaBucket < 0) percentualeSicurezzaBucket = 0;
	};

	$: numeroTarget = Math.round((filteredEnti.length * percentualeTarget) / 100);

	let quartersBuffer = '2';
	let filterModalitaBucket = 'Costante';

	$: getQuartersBucket = () => {
		const q = calcolaQuarters(new Date(), new Date(dataTarget));
		const res = q.splice(1, q.length);
		for (let x = 0; x < Number(quartersBuffer); x++) {
			res.pop();
		}
		return res;
	};

	$: positivi = data.positivi.filter(
		(p) =>
			p.Ultimo_Esito_Conformit_Tecnica__c === 'Positivo' &&
			(filterTipoEnte === tipiente[0]
				? true
				: p.outfunds__Applying_Organization__r.Tipologia_Ente__c === filterTipoEnte) &&
			(filterMisure === misure[0]
				? true
				: p.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name === filterMisure)
	);

	$: inlavorazione = data.positivi.filter(
		(p) =>
			p.Ultimo_Esito_Conformit_Tecnica__c !== 'Positivo' &&
			p.outfunds__Status__c === 'FINANZIATA' &&
			(filterTipoEnte === tipiente[0]
				? true
				: p.outfunds__Applying_Organization__r.Tipologia_Ente__c === filterTipoEnte) &&
			(filterMisure === misure[0]
				? true
				: p.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name === filterMisure)
	);

	$: mancantiAltarget = numeroTarget - positivi.length;

	$: getQuartersBucketMax = () => {
		const qnominali = getDataScadenzeQuarters();
		qnominali[0].push('Capienza massima');
		const q = getQuartersBucket();
		if (filterModalitaBucket === 'Costante') {
			for (let z = 1; z < qnominali.length; z++) {
				qnominali[z].push(0);
				for (let y = 0; y < q.length; y++) {
					if (q[y] === qnominali[z][0]) {
						qnominali[z][3] = Math.round(
							(mancantiAltarget / q.length) * (1 + percentualeSicurezzaBucket / 100)
						);
					}
				}
			}
		} else {
			const q = getQuartersBucket();
			const percentuale = Number(filterModalitaBucket.substring(1));
			const delta = (mancantiAltarget * percentuale) / 100;

			let c = 0;
			if (filterModalitaBucket.charAt(0) !== 'm') {
				c = (mancantiAltarget - delta) / q.length;
			} else {
				c = (mancantiAltarget + delta) / q.length;
			}
			let somma = 0;
			for (let z = 0; z < q.length; z++) {
				somma = somma + (z + 1);
			}

			const step = Math.round(delta / q.length);
			let stepNumber = 0;
			for (let z = 1; z < qnominali.length; z++) {
				qnominali[z].push(0);
				for (let y = 0; y < q.length; y++) {
					if (q[y] === qnominali[z][0]) {
						stepNumber++;
						if (filterModalitaBucket.charAt(0) === 'm') {
							const fact = (delta / somma) * stepNumber;
							qnominali[z][3] = Math.round((c - fact) * (1 + percentualeSicurezzaBucket / 100));
						} else {
							const fact = (delta / somma) * stepNumber;
							qnominali[z][3] = Math.round((c + fact) * (1 + percentualeSicurezzaBucket / 100));
						}
					}
				}
			}
		}
		return qnominali;
	};
</script>

<div class="container">
	<div class="row">
		<div class="col-12 col-lg-2">
			<div data-bs-toggle="sticky" data-bs-stackable="true" class="bg-white border-end px-2">
				<h6 class="text-primary">Dimensione di analisi</h6>
				<div class="row my-4">
					<div class="col-12 col-lg-12 my-4">
						<div class="select-wrapper">
							<label for="filterMisura">Misura</label>
							<select id="filterMisura" name="filterMisura" bind:value={filterMisure}>
								{#each misure as m}
									<option value={m}>{m}</option>
								{/each}
							</select>
						</div>
					</div>
					<div class="col-12 col-lg-12 my-4">
						<div class="select-wrapper">
							<label for="filterTipoEnte">Tipologia ente</label>
							<select id="filterTipoEnte" name="filterTipoEnte" bind:value={filterTipoEnte}>
								{#each tipiente as t}
									<option value={t}>{t}</option>
								{/each}
							</select>
						</div>
					</div>
				</div>
				<h6 class="text-primary mt-y-5">Impostazione del target</h6>
				<div class="col-12 col-lg-12 my-4">
					<div class="form-group">
						<label for="percentualePlatea" class="input-number-label active"
							>% platea totale ({filteredEnti.length} enti)</label
						>
						<div class="input-group input-numbers input-number-percentage">
							<span class="input-group-text fw-semibold">%</span>
							<input
								bind:value={percentualeTarget}
								type="number"
								class="form-control"
								data-bs-input
								id="percentualePlatea"
								name="percentualePlatea"
								min="0"
								max="100"
								step="10"
								on:change={checkPerc}
							/>
						</div>
					</div>
				</div>
				<div class="col-12 col-lg-12 my-4">
					<div class="form-group">
						<label class="active" for="dateStandard">Data target</label>
						<input type="date" id="dateStandard" name="dataTarget" bind:value={dataTarget} />
					</div>
				</div>
				<h6 class="text-primary mt-y-5">Impostazioni dello scenario di calcolo</h6>
				<div class="col-12 col-lg-12 my-4">
					<div class="select-wrapper">
						<label for="quartersBuffer">Quarters buffer</label>
						<select id="quartersBuffer" name="quartersBuffer" bind:value={quartersBuffer}>
							<option value="0">0</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
						</select>
					</div>
				</div>
				<div class="col-12 col-lg-12 my-4">
					<div class="select-wrapper">
						<label for="filterModalitaBucket">Modalità di distribuzione</label>
						<select
							id="filterModalitaBucket"
							name="filterModalitaBucket"
							bind:value={filterModalitaBucket}
						>
							<option value="Costante">Costante</option>
							<option value="m25">Decrescente (25%)</option>
							<option value="m50">Decrescente (50%)</option>
							<option value="m75">Decrescente (75%)</option>
							<option value="p25">Crescente (25%)</option>
							<option value="p50">Crescente (50%)</option>
							<option value="p75">Crescente (75%)</option>
						</select>
					</div>
				</div>
				<div class="col-12 col-lg-12 my-4">
					<div class="form-group">
						<label for="percentualeSicurezzaBucket" class="input-number-label active"
							>% di sicurezza bucket</label
						>
						<div class="input-group input-numbers input-number-percentage">
							<span class="input-group-text fw-semibold">%</span>
							<input
								bind:value={percentualeSicurezzaBucket}
								type="number"
								class="form-control"
								data-bs-input
								id="percentualeSicurezzaBucket"
								name="percentualeSicurezzaBucket"
								min="0"
								max="100"
								step="1"
								on:change={checkPercBucket}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-12 col-lg-10">
			<div class="row">
                {#if filterMisure===misure[0]}
                <div class="alert alert-info" role="alert">
                    <p>Selezionare una misura dal pannello a sinistra</p>
                </div>
                
                {:else}

				<div class="col-12 col-lg-12 my-4">
					<h4 class="h4">Situazione attuale</h4>
					<p>Distribuzione della previsione di completamento attività per mese</p>
					<Columnchart
						id="scadenzebar"
						values={getDataScadenze()}
						titleColor="primary"
						title="Distribuzione attuale delle date di completamento"
						xlabel="Mesi"
						ylabel="Numero di candidature"
                        stacked=true
					/>
					<p>
						Distribuzione della previsione di completamento attività per quarter ("Q-<i>anno</i>-<i
							>numero_quarter</i
						>")
					</p>
					<Columnchart
						id="scadenzebarquarters"
						values={getDataScadenzeQuarters()}
						titleColor="primary"
						title="Distribuzione attuale delle date di completamento"
						xlabel="Quarters"
						ylabel="Numero di candidature"
                        stacked=true
					/>
				</div>
				<div class="col-12 col-lg-12">
					<div class="row">
						<div class="col-12 col-lg-12">
							<p class="text-primary">Numero di Enti target: <strong>{numeroTarget}</strong></p>
						</div>
					</div>
				</div>
				<div class="col-12 col-lg-12 my-4">
					<h4 class="h4">Scenario di calcolo</h4>
					<p>Totale positivi ad ora: <strong class="text-success">{positivi.length}</strong></p>
					<p>
						Numero candidature mancanti al target: <strong class="text-danger"
							>{mancantiAltarget}</strong
						>
					</p>
					<p>
						Totale in lavorazione ad ora: <strong class="text-primary"
							>{inlavorazione.length}</strong
						>
					</p>

					{#if inlavorazione.length + positivi.length < mancantiAltarget}
						<div class="alert alert-danger" role="alert">
							Il numero di candidature in lavorazione e positive (<strong
								>{inlavorazione.length + positivi.length}</strong
							>) non è sufficiente al raggiungimento del target.
						</div>
					{:else}
						<div class="alert alert-success" role="alert">
							Il numero di candidature in lavorazione e positive (<strong
								>{inlavorazione.length + positivi.length}</strong
							>) è sufficiente al raggiungimento del target.
						</div>
					{/if}
					<p>
						Numero di buckets disponibili: <strong class="text-primary"
							>{getQuartersBucket().length}</strong
						>
					</p>
					<p>
						Totale capienza buckets: <strong class="text-primary"
							>{getQuartersBucketMax()
								.slice(1)
								.reduce((partialSum, a) => partialSum + a[2]+a[1], 0)}</strong
						>
					</p>
					<div class="row">
						<div class="col-12 col-lg-12 my-4">
							<Combochart
								id="bucketbarquarters"
								values={getQuartersBucketMax()}
								titleColor="primary"
								title="Distribuzione capienza bucket"
								xlabel="Quarters"
								ylabel="Numero di candidature"
                                stacked=true
							/>
						</div>
					</div>

					<div class="table-responsive">
						<table class="table table-hover table-sm align-middle">
							<thead>
								<tr>
									<th class="text-center"
										>Bucket<br /><span class="is-size-7 has-text-weight-normal">(quarter)</span></th
									>
									<th class="text-center">Selezionabile<br /></th>
									<th class="text-center"
										>Capienza<br /><span class="is-size-7 has-text-weight-normal"
											>(contatore 1)</span
										></th
									>
									<th class="text-center"
										>Disponbilità<br /><span class="is-size-7 has-text-weight-normal"
											>(contatore 2)</span
										></th
									>
									<th class="text-center"
										>Occupazione<br /><span class="is-size-7 has-text-weight-normal"></span></th
									>
								</tr>
							</thead>
							<tbody>
								{#each getQuartersBucketMax().slice(1) as q}
									<tr>
										<td class="text-center"><small>{q[0]}</small></td>
										<td class="text-center">
											<small><strong>{q[3] === 0 ? 'NO' : 'SI'}</strong></small>
										</td>
										<td class="text-center">
											<small><strong>{q[3] === 0 ? 'n.a.' : q[3]}</strong></small>
										</td>
										<td
											class="text-center {q[3] === 0
												? ''
												: q[3] - q[2] - q[1] <= 0
													? 'text-danger'
													: 'text-success'}"
										>
											<small
												><strong>{q[3] === 0 ? 'n.a.' : (q[3] - q[2] - q[1]) <= 0 ? 0 : q[3]  -q[2] - q[1]}</strong
												></small
											>
										</td>
										<td class="text-center">
											<small><strong>{q[1]+q[2]}</strong></small>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
                {/if}
			</div>
		</div>
	</div>
</div>
