<script>
	// @ts-nocheck

	import ProportionalBar from './ProportionalBar.svelte';
	export let data;
	import * as d3 from 'd3';
	import georegioni from './limits_IT_regions.json';
	import moment from 'moment/min/moment-with-locales';
	moment.locale('it');
    import AndamentoInvii from './AndamentoInvii.svelte';
	import Mappaquestionario from './Mappaquestionario.svelte';
	import TabellaRisposte from './TabellaRisposte.svelte';
	

	const orderRisp = ['Completato', 'In compilazione', 'Mai aperto'];

	let risp = data.r;

	let edizioni = [...d3.group(risp, (d) => d.anno_survey).keys()].sort().reverse();
	let data_aggiornamento = d3.max(risp, (d) => d.updated_at);
	let edizione = edizioni[0];

	let regioni = ['Tutte'].concat(
		d3
			.flatGroup(risp, (d) => d.regione)
			.map((x) => x[0])
			.sort()
	);
	let regione = regioni[0];

	let nomeComune = '';

	let georeg = {
		...georegioni,
		features: georegioni.features.filter((x) => regioni.indexOf(x.properties.reg_name) > -1)
	};

	let mapsize;
	let viewOptions = ['Completato', 'In compilazione', 'Mai aperto'];
	let view = viewOptions[0];

	$: frt = risp
		//.filter((x) => x.anno_survey === edizione)
		.filter((x) => (regione === 'Tutte' ? true : x.regione === regione));

	$: fr = frt.filter((x) => x.anno_survey === edizione);

	$: data_for_bars = d3
		.flatRollup(
			fr,
			(D) => D.length,
			(d) => d.stato_compilazione
		)
		.sort((a, b) => orderRisp.indexOf(a[0]) - orderRisp.indexOf(b[0]));

	$: data_for_andamento = fr.filter((x) => x.stato_compilazione === 'Completato');
</script>

<div class="container my-4">
	<h1>Mappa dei Comuni Digitali</h1>
</div>
<p>
	È un’indagine, unica a livello nazionale per portata e caratteristiche, sullo stato di
	digitalizzazione del territorio: un’attività di ricerca che prevede una raccolta puntuale di
	informazioni che ANCI e Dipartimento, e dal 2025 anche Banca d'Italia, stanno direttamente
	richiedendo ai Comuni tramite la somministrazione di un questionario.
</p>
<div class="alert alert-warning alert-dismissible fade show" role="alert">
	In base a quanto previsto dagli articoli 2, 12 e 13 comma 3 del DPCM 16 settembre 2014 (Codice di
	comportamento e di tutela della dignità e dell’etica dei dirigenti e dei dipendenti della
	Presidenza del Consiglio dei ministri), si ricorda che è vietata qualsiasi diffusione di
	informazioni e dati riguardanti progetti e iniziative che coinvolgono questo Dipartimento a meno
	di specifica autorizzazione. Si raccomanda di rispettare rigorosamente questa disposizione per
	evitare violazioni del codice di comportamento.
	<p>
		<button
			title="Ho capito"
			type="button"
			class="btn-close"
			data-bs-dismiss="alert"
			aria-label="Chiudi"
		>
			<svg class="icon"><use href="/svg/sprites.svg#it-close"></use></svg>
		</button>
	</p>
</div>

<div class="row">
	<div class="col-12 col-lg-3 border-end">
		<div class="sticky-top">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->

			<h5 class="my-4">Filtri</h5>
			<hr class="my-4" />

			<div>
				<div class="select-wrapper my-4">
					<label for="edizione">Edizione</label>
					<select id="edizione" name="edizione" bind:value={edizione}>
						{#each edizioni as e}
							<option value={e}>{e}</option>
						{/each}
					</select>
				</div>
			</div>
			<div>
				<div class="select-wrapper my-4">
					<label for="regione">Regione</label>
					<select id="regione" name="regione" bind:value={regione}>
						{#each regioni as m}
							<option value={m}>{m}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
	</div>

	<div class="col-12 col-lg-9" data-sveltekit-preload-data="off">
		<div class="row">
			<div class="col-12 col-lg-12">
				<div>
					<p>
						<small
							>Ultimo aggiornamento dati: {moment(data_aggiornamento)
								.calendar()
								.toLocaleLowerCase()}</small
						>
					</p>
				</div>
				<div class="row align-middle">
					<div class="col-12 col-lg-4 align-middle">
						<ProportionalBar
							bind:values={data_for_bars}
							colors={[
								['Mai aperto', '#cc334d'],
								['In compilazione', '#0066cc'],
								['Completato', '#008055']
							]}
							title="Stato compilazione"
						/>
					</div>
					<div class="col-12 col-lg-8 align-middle">
						<AndamentoInvii values={data_for_andamento} />
					</div>
				</div>
				<div class="row align-middle">
					<div class="col-12 col-lg-12 align-middle">
						<hr />
					</div>
				</div>
				<div class="row align-middle">
					<div class="col-12 col-lg-4 align-middle">
						<div>
							<div class="select-wrapper my-2">
								<label for="stato">Stato</label>
								<select id="stato" name="stato" bind:value={view}>
									{#each viewOptions as m}
										<option value={m}>{m}</option>
									{/each}
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="row align-middle">
					<div
						class="col-12 col-lg-12 align-middle"
						bind:clientWidth={mapsize}
						data-sveltekit-preload-data="off"
					>
						<Mappaquestionario
							regioni={georeg}
							mapwidth={mapsize}
							{regione}
							risposte={fr}
							{view}
							com={data.com}
						/>
					</div>
				</div>
				<div class="row align-middle">
					<div class="col-12 col-lg-12 align-middle">
						<TabellaRisposte risposte={frt} />
					</div>
				</div>
			</div>
		</div>
		<hr />
		<a href="/anci/survey/downloadrisposte" target="_blank">
			<svg class="icon icon-sm icon-success"><use href="/svg/sprites.svg#it-file-csv"></use></svg
			><span>Scarica il quadro generale in csv</span>
		</a>
	</div>
</div>
