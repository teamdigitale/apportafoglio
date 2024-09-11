<script>
	// @ts-nocheck

	import * as d3 from 'd3';
	import georegioni from './limits_IT_regions.json';
	import { fade } from 'svelte/transition';
	// @ts-nocheck

	import Tabellarisposte from './tabellarisposte.svelte';
	import ProportionalBar from '$lib/c/observable/ProportionalBar.svelte';
	import Mappaquestionario from './mappaquestionario.svelte';
	import Cite from '$lib/c/cite.svelte';
	import { percentuale } from '$lib/js/shared';
	import AndamentoInvii from './AndamentoInvii.svelte';

	export let data;

	let warningStrutturati = data.warningStrutturati;
	let alertStrutturati = data.alertStrutturati;

	let questionarioAperto = true;
	let questionarioCompletato = true;
	let nomeComune = '';
	let regioni = ['Tutte'].concat(
		d3
			.flatGroup(data.r, (d) => d.pa2026.regione)
			.map((x) => x[0])
			.sort()
	);
	let regione = regioni[0];

	$: tutteLeRisposte = data.r.map((x) => ({
		...x,
		statocomune: x.surveyanci.completato
			? 'Completato'
			: x.surveyanci.aperto
				? 'In compilazione'
				: 'Mai aperto'
	}));

	$: completati = tutteLeRisposte.filter((x) => x.surveyanci.completato);

	$: risposte = tutteLeRisposte
		.filter((x) => (questionarioAperto ? x.surveyanci.aperto : true))
		.filter((x) => (questionarioCompletato ? x.surveyanci.completato : true))
		.filter((x) => (regione === regioni[0] ? true : x.pa2026.regione === regione))
		.filter((x) =>
			nomeComune === ''
				? true
				: x.nome.replaceAll('Comune di', '').toUpperCase().indexOf(nomeComune.toUpperCase()) > -1
		);

	$: {
		if (questionarioCompletato) questionarioAperto = true;
	}

	$: dataforlineinvii = (c, r, com) =>
		c
			.filter((x) => (r === regioni[0] ? true : x.pa2026.regione === r))
			.filter((x) =>
				com === ''
					? true
					: x.nome.replaceAll('Comune di', '').toUpperCase().indexOf(com.toUpperCase()) > -1
			);

	$: contieneWarningsAlerts = (r) => {
		let result = [];
		let completati = r.filter((x) => x.surveyanci.completato);
		completati.forEach((c) => {
			warningStrutturati.forEach((ws) => {
				ws.tipi
					.filter((tt) => tt.selezionato === true)
					.forEach((t) => {
						c.surveyanci.sezioni.forEach((s) => {
							if (s.insights && s.insights.warning.filter((i) => i.tipo === t.tipo).length > 0) {
								result.push(c);
							} else {
							}
						});
					});
			});
		});
		completati.forEach((c) => {
			alertStrutturati.forEach((ws) => {
				ws.tipi
					.filter((tt) => tt.selezionato === true)
					.forEach((t) => {
						c.surveyanci.sezioni.forEach((s) => {
							if (s.insights && s.insights.alert.filter((i) => i.tipo === t.tipo).length > 0) {
								result.push(c);
							} else {
							}
						});
					});
			});
		});
		return result;
	};

	const contaWarningsAlertsPerTipologia = (r, t) => {
		let result = [];
		let completati = r.filter((x) => x.surveyanci.completato);
		completati.forEach((c) => {
			c.surveyanci.sezioni.forEach((s) => {
				if (s.insights && s.insights.warning.filter((i) => i.tipo === t).length > 0) {
					result.push(c);
				}
			});
			c.surveyanci.sezioni.forEach((s) => {
				if (s.insights && s.insights.alert.filter((i) => i.tipo === t).length > 0) {
					result.push(c);
				}
			});
		});
		return result.length;
	};

	$: risposteEvidenziate = contieneWarningsAlerts(risposte);
	let mapsize;

	const toggleInsights = () => {
		expandedInsights = !expandedInsights;
	};

	let expandedInsights = false;
	let insightsWidth;
</script>

<div class="container my-4">
	<h1>Survey ANCI</h1>
	<Cite text="Se non chiedi, la risposta è sempre no." author="Nora Roberts" />
</div>

<div class="row">
	{#if !expandedInsights}
		<div class="col-12 col-lg-3 border-end" transition:fade>
			<div class="sticky-top">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<h5 class="my-4">
					Insights
					<!--
					<svg on:click={toggleInsights} class="icon icon-sm icon-primary cliccabile"
						><use href="/svg/sprites.svg#{expandedInsights ? 'it-minimize' : 'it-maximize'}"
						></use></svg
					>
					-->
				</h5>
				<hr class="my-4" />
				<div class="row align-middle" bind:clientWidth={insightsWidth}>
					<div class="col-12 col-lg-{expandedInsights ? '6' : '12'} align-middle">
						<ProportionalBar
							values={d3.flatRollup(
								tutteLeRisposte
									.filter((x) => (regione === regioni[0] ? true : x.pa2026.regione === regione))
									.filter((x) =>
										nomeComune === ''
											? true
											: x.nome
													.replaceAll('Comune di', '')
													.toUpperCase()
													.indexOf(nomeComune.toUpperCase()) > -1
									),
								(D) => D.length,
								(d) => d.statocomune
							)}
							colors={[
								['Mai aperto', '#cc334d'],
								['In compilazione', '#0066cc'],
								['Completato', '#008055']
							]}
							title="Stato compilazione"
						/>
					</div>

					<div
						class="col-12 col-lg-{expandedInsights ? '6' : '12'}"
						bind:clientWidth={insightsWidth}
					>
						<AndamentoInvii
							completati={dataforlineinvii(completati, regione, nomeComune)}
							boxWidth={insightsWidth}
						/>
						
					</div>
				</div>
				<h5 class="my-4">Filtri</h5>
				<hr class="my-4" />
				<div>
					<div class="select-wrapper my-2">
						<label for="regione">Regione</label>
						<select id="regione" name="regione" bind:value={regione}>
							{#each regioni as m}
								<option value={m}>{m}</option>
							{/each}
						</select>
					</div>
				</div>
				<br />
				<div>
					<div class="form-group">
						<div class="input-group">
							<span class="input-group-text"
								><svg class="icon icon-sm"><use href="/svg/sprites.svg#it-pa"></use></svg></span
							>
							<label class="active" for="nomeComune">Comune</label>
							<input
								type="text"
								class="form-control"
								id="nomeComune"
								name="nomeComune"
								bind:value={nomeComune}
							/>
						</div>
					</div>
				</div>
				<!--
		<div class="form-check form-check-group">
			<div class="toggles">
				<label for="questionarioAperto">
					Questionario aperto
					<input
						type="checkbox"
						id="questionarioAperto"
						aria-labelledby="questionarioAperto-help"
						bind:checked={questionarioAperto}
					/>
					<span class="lever"></span>
				</label>
			</div>
			<small id="questionarioAperto-help" class="form-text"
				>Mostra solo chi ha aperto almeno una volta il questionario</small
			>
		</div>
		-->
			</div>
		</div>
		<div
			class="col-12 col-lg-6"
			bind:clientWidth={mapsize}
			data-sveltekit-preload-data="off"
			transition:fade
		>
			<div class="sticky-top">
				<Mappaquestionario
					regioni={georegioni}
					mapwidth={mapsize}
					{regione}
					{risposte}
					{risposteEvidenziate}
				/>
				<hr />
						<a href="/anci/survey/downloadrisposte" target="_blank">
							<svg class="icon icon-sm icon-success"
								><use href="/svg/sprites.svg#it-file-csv"></use></svg
							><span
							>Elenco dei comuni che hanno risposto</span
						>
						</a>
				<!--
			<Tabellarisposte {risposte} />
			-->
			</div>
		</div>
	{/if}
	<div class="col-12 col-lg-{expandedInsights ? '12' : '3'} border-start" transition:fade>
		{#if !expandedInsights}
			<div transition:fade>
				<h5 class="my-4">Evidenzia</h5>
				<hr />
				<div class="evidenzia">
					<div class="form-check form-check-group">
						<div class="toggles">
							<label for="questionarioCompletato">
								Questionario completato
								<input
									type="checkbox"
									id="questionarioCompletato"
									aria-labelledby="questionarioCompletato-help"
									bind:checked={questionarioCompletato}
								/>
								<span class="lever"></span>
							</label>
						</div>
						<small id="questionarioCompletato-help" class="form-text"
							>Mostra solo chi ha completato il questionario</small
						>
					</div>
					<div class="callout callout-highlight my-4">
						<small>
							E' possibile evidenziare i comuni secondo criteri di alert e warning. Per consultare i criteri <a href="/anci/survey/dettaglioquestionario/" target="_blank">clicca qui.
							</a>
						</small>
						<hr/>
						<div class="callout-title">
							<svg class="icon icon-danger"><use href="/svg/sprites.svg#it-error"></use></svg><span
								class="text-danger">Alert</span
							>
						</div>
						{#each alertStrutturati as ws}
							<p class="text-primary"><b>{ws.sezione}</b></p>
							{#each ws.tipi as t}
								{#if contaWarningsAlertsPerTipologia(risposte, t.tipo) > 0}
									<div class="form-check form-check-group">
										<input
											id="checkboxalerts{t.tipo}"
											type="checkbox"
											bind:checked={t.selezionato}
										/>
										<label for="checkboxalerts{t.tipo}">{t.tipo}</label>

										<small id="checkboxalerts-help" class="form-text"
											><b>{contaWarningsAlertsPerTipologia(risposte, t.tipo)} Comuni</b> -
											<b
												>{percentuale(
													contaWarningsAlertsPerTipologia(risposte, t.tipo) /
														risposte.filter((x) => x.surveyanci.completato).length
												)}</b
											></small
										>
									</div>
								{/if}
							{/each}
						{/each}
					</div>

					<div class="callout callout-highlight my-4">
						<div class="callout-title">
							<svg class="icon icon-warning"
								><use href="/svg/sprites.svg#it-warning-circle"></use></svg
							><span class="text-warning">Warning</span>
						</div>
						{#each warningStrutturati as ws}
							<p class="text-primary"><b>{ws.sezione}</b></p>
							{#each ws.tipi as t}
								{#if contaWarningsAlertsPerTipologia(risposte, t.tipo) > 0}
									<div class="form-check form-check-group">
										<input
											id="checkboxalerts{t.tipo}"
											type="checkbox"
											bind:checked={t.selezionato}
										/>
										<label for="checkboxalerts{t.tipo}">{t.tipo}</label>

										<small id="checkboxalerts-help" class="form-text"
											><b>{contaWarningsAlertsPerTipologia(risposte, t.tipo)} Comuni</b> -
											<b
												>{percentuale(
													contaWarningsAlertsPerTipologia(risposte, t.tipo) /
														risposte.filter((x) => questionarioCompletato).length
												)}</b
											></small
										>
									</div>
								{/if}
							{/each}
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.evidenzia span {
		font-size: 0.9rem !important;
	}
	.evidenzia label {
		font-size: 0.9rem !important;
	}

	.form-check label {
		height: auto;
		line-height: none;
	}

	.form-check [type='checkbox'] + label {
		line-height: 100% !important;
	}

	.callout {
		max-width: none !important;
	}

	.callout-title {
		font-size: 1rem;
		font-family: 'Titillium Web';
	}

	.callout p {
		font-size: 1rem;
		font-family: 'Titillium Web';
	}

	.callout ul {
		font-size: 1rem;
		font-family: 'Titillium Web';
	}

	.callout svg {
		font-size: 0.9rem;
	}

	.callout svg {
		width: 100%;
	}

	.cliccabile {
		cursor: pointer;
	}
</style>
