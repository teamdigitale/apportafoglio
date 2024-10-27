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

	import moment from 'moment/min/moment-with-locales';
	moment.locale('it');

	export let data;


	let showinfo = false;

	const toggleinfo = () => {
		showinfo = !showinfo;
	};

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

	let georeg = {
		...georegioni,
		features: georegioni.features.filter((x) => regioni.indexOf(x.properties.reg_name) > -1)
	};

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
	.filter((x) => view==='Completato'?x.surveyanci.completato : view==='Mai aperto'?!x.surveyanci.aperto:view==='In compilazione'?(x.surveyanci.aperto&&!x.surveyanci.completato):true)
		.filter((x) => (regione === regioni[0] ? true : x.pa2026.regione === regione))
		.filter((x) =>
			nomeComune === ''
				? true
				: x.nome.replaceAll('Comune di', '').toUpperCase().indexOf(nomeComune.toUpperCase()) > -1
		);

	$: {
		if (questionarioCompletato) questionarioAperto = true;
	}

	const dataforlineinvii = () => {
		if (completati) {
			return completati
				.filter((x) => (regione === regioni[0] ? true : x.pa2026.regione === regione))
				.filter((x) =>
					nomeComune === ''
						? true
						: x.nome.replaceAll('Comune di', '').toUpperCase().indexOf(nomeComune.toUpperCase()) >
							-1
				);
		}
	};

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

	$: completatiPerAndamentoInvii = dataforlineinvii();

	$: risposteEvidenziate = contieneWarningsAlerts(risposte);
	let mapsize;

	const toggleInsights = () => {
		expandedInsights = !expandedInsights;
	};

	let expandedInsights = false;
	let insightsWidth;


	const statoRisp = (r) => {
		if(r.surveyanci.aperto && !r.surveyanci.completato){
			return "In compilazione";
		}else if (r.surveyanci.completato){
			return "Completato";
		}else{
			return "Mai aperto";
		}
	}

	const orderRisp = ["Completato","In compilazione", "Mai aperto"];

	let stato = 'Tutti';

	let viewOptions = ["Completato","In compilazione","Mai aperto"];
	let view = viewOptions[0];

</script>

<div class="container my-4">
	<h1>Mappa dei Comuni Digitali</h1>
	<!--
	Cite text="Se non chiedi, la risposta è sempre no." author="Nora Roberts" 
	-->
</div>
<p>
	È un’indagine, unica a livello nazionale per portata e caratteristiche, sullo stato di
	digitalizzazione del territorio: un’attività di ricerca che prevede una raccolta puntuale di
	informazioni che ANCI e Dipartimento stanno direttamente richiedendo ai Comuni tramite la
	somministrazione di un questionario.
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
{#if !showinfo}
	<div class="row" transition:fade>
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
								).sort((a,b) => orderRisp.indexOf(a[0])-orderRisp.indexOf(b[0]))}
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
								values={tutteLeRisposte
									.filter((x) => x.surveyanci.completato)
									.filter((x) => (regione === regioni[0] ? true : x.pa2026.regione === regione))
									.filter((x) =>
										nomeComune === ''
											? true
											: x.nome
													.replaceAll('Comune di', '')
													.toUpperCase()
													.indexOf(nomeComune.toUpperCase()) > -1
									)}
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
					<p><small>Ultimo aggiornamento dati: {moment(data.lastUpdate).calendar()
						.toLocaleLowerCase()}</small></p>
					<Mappaquestionario
						regioni={georeg}
						mapwidth={mapsize}
						{regione}
						{risposte}
						{risposteEvidenziate}
						{view}
						com = {data.com}
					/>
					<hr />
					<div class="row">
						
					</div>
					<div class="row">
						<div class="col-12 col-lg-6">
							<div class="select-wrapper my-4">
								<label for="regione">Stato questionario</label>
								<select id="regione" name="regione" bind:value={stato}>
									<option value="Tutti">Tutti</option>
									<option value="Completato">Completato</option>
									<option value="In compilazione">In compilazione</option>
									<option value="Mai aperto">Mai aperto</option>
								</select>
							</div>
						</div>
					</div>
					<Tabellarisposte risposte={tutteLeRisposte.filter(x => stato==='Tutti'?true: statoRisp(x)===stato).filter((x) => (regione === regioni[0] ? true : x.pa2026.regione === regione))
						.filter((x) =>
							nomeComune === ''
								? true
								: x.nome
										.replaceAll('Comune di', '')
										.toUpperCase()
										.indexOf(nomeComune.toUpperCase()) > -1
						).sort((a,b) => {return ('' + a.nome).localeCompare(b.nome);})} />
						
					<a href="/anci/survey/downloadrisposte" target="_blank">
						<svg class="icon icon-sm icon-success"
							><use href="/svg/sprites.svg#it-file-csv"></use></svg
						><span>Scarica il quadro generale in csv</span>
					</a>

				</div>
			</div>
		{/if}
		<div class="col-12 col-lg-{expandedInsights ? '12' : '3'} border-start" transition:fade>
			{#if !expandedInsights}
				<div transition:fade>
					<h5 class="my-4">Opzioni di visualizzazione</h5>
					<hr />
					
					<div>
						<div class="select-wrapper my-2">
							<label for="regione">Stato</label>
							<select id="regione" name="regione" bind:value={view}>
								{#each viewOptions as m}
									<option value={m}>{m}</option>
								{/each}
							</select>
						</div>
					</div>
					<div class="evidenzia">
						<div class="callout callout-highlight my-4">
							<small>
								È possibile visualizzare lo stato di compilazione del questionario per Comune
								utilizzando i criteri di <a
									href="/anci/survey/dettaglioquestionario/"
									target="_blank">alert e warning</a
								>.
							</small>
							<hr />
							<div class="callout-title">
								<svg class="icon icon-danger"><use href="/svg/sprites.svg#it-error"></use></svg
								><span class="text-danger">Alert</span>
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
												><b
													>{contaWarningsAlertsPerTipologia(risposte, t.tipo)} Comun{contaWarningsAlertsPerTipologia(
														risposte,
														t.tipo
													) === 1
														? 'e'
														: 'i'}</b
												>
												-
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
												><b
													>{contaWarningsAlertsPerTipologia(risposte, t.tipo)} Comun{contaWarningsAlertsPerTipologia(
														risposte,
														t.tipo
													) === 1
														? 'e'
														: 'i'}</b
												>
												-
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
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

{#if showinfo}
	<div transition:fade class="row">
		<div class="col-12 col-lg-12">
			<div class="alert alert-primary" role="alert">
				<p class="text-end">
					<a class="btn" href="#" role="button" on:click={toggleinfo}>
						<svg class="icon primary icon-primary"
							><use href="/svg/sprites.svg#it-close-circle"></use></svg
						>
						Chiudi
					</a>
				</p>
				<h2>Cos’è la Mappa dei Comuni Digitali</h2>
				<p>
					L'ANCI e il Dipartimento per la trasformazione digitale il 15 maggio 2023 hanno
					sottoscritto un Accordo per la messa in campo di azioni congiunte di supporto ai Comuni
					nel proprio percorso di digitalizzazione dell’ente. Ne è scaturito un progetto il cui
					principale obiettivo è quello di aumentare la capacità dei Comuni di gestire l’intero
					ciclo della trasformazione digitale, inquadrando le risorse PNRR all’interno di un più
					ampio percorso che punti alla completa semplificazione e digitalizzazione dei processi.
					Tra i diversi strumenti di supporto previsti, a luglio 2024, in occasione di “Missione
					Italia”, l’evento organizzato da ANCI, è partita una delle iniziative strategiche per
					traghettare i Comuni oltre il PNRR e agevolare un percorso di trasformazione digitale che
					sia duraturo e pervasivo, denominata “Mappa dei Comuni digitali”. E’ un’indagine, unica a
					livello nazionale per portata e caratteristiche, sullo stato di digitalizzazione del
					territorio: un’attività di ricerca che prevede una raccolta puntuale di informazioni che
					ANCI e Dipartimento stanno direttamente richiedendo ai Comuni tramite la somministrazione
					di un questionario. Successivamente i dati raccolti saranno pubblicati in un report che
					racconterà in maniera completa lo stato di digitalizzazione degli enti locali sul
					territorio italiano.
				</p>
				<h2>Obiettivi della survey</h2>
				<ul>
					<li>
						Stato della transizione digitale: Valutare il grado di attuale digitalizzazione dei
						Comuni
					</li>
					<li>Sfide e ostacoli: Esaminare le sfide e gli ostacoli alla digitalizzazione</li>
					<li>
						Priorità future: Definire le priorità future e individuare le sfide che potrebbero
						ostacolare il raggiungimento di tali priorità
					</li>
				</ul>
				<h2>Cosa prevede il Piano Triennale per l’Informatica</h2>
				<p>
					L’iniziativa “Mappa dei Comuni Digitali” fa diretto riferimento a quanto previsto dal <a
						href="https://www.agid.gov.it/sites/agid/files/2024-06/piano_triennale_per_linformatica_nella_pa_2024-2026.pdf"
						target="_blank"
						>Piano Triennale per l’informatica nella Pubblica Amministrazione 2024-2026</a
					> nel Capitolo 1 - Organizzazione e gestione del cambiamento per la parte relativa al “Monitoraggio”
					dove è indicato l’Obiettivo 1.3 - Monitorare e analizzare lo stato di digitalizzazione del
					paese. Obiettivo che molti Comuni hanno richiamato anche nel PIAO. La compilazione del questionario
					relativo alla “Mappa dei Comuni Digitali”, (con scadenza prevista entro il 30 settembre ma
					che sarà prorogata al 18 ottobre 2024) assolve quindi al compito assegnato agli Enti Locali
					indicati quali destinatari dell’attività. Infatti, uno dei Risultati attesi (RA1.3.2) è proprio
					l’Acquisizione ed elaborazione di informazioni analitiche da Enti locali che prevede quale
					target per il 2024 la “Raccolta dati tramite survey, coinvolgendo attivamente gli Enti locali
					per ottenere un quadro iniziale dello stato di digitalizzazione”. Azione che proseguirà anche
					nel 2025 con il “Secondo ciclo di raccolta dati tramite survey, permettendo un confronto con
					i dati raccolti nell'anno precedente e identificando eventuali trend”.
				</p>
				<h2>Perché è importante partecipare</h2>
				<h3>Benefici generali:</h3>
				<ul>
					<li>
						Partecipare alla più completa mappatura sullo stato di digitalizzazione del territorio
					</li>
					<li>
						Contribuire al miglioramento delle politiche nazionali in ambito di digitalizzazione e
						alla pianificazione dei futuri finanziamenti
					</li>
					<li>Rafforzare la voce dei Comuni nel dibattito nazionale sul digitale</li>
				</ul>
				<h3>Beneficio per il Comune:</h3>
				<ul>
					<li>
						Fotografia chiara dello stato di salute del Comune, ulteriormente arricchita da dati di
						contesto già in possesso del Dipartimento
					</li>
					<li>Parametro oggettivo per confrontarsi anche con altre amministrazioni</li>
					<li>Strumento per implementare una vera agenda digitale, basata sui dati</li>
				</ul>
				<h3>Beneficio per il sistema Comuni:</h3>
				<ul>
					<li>
						Creazione d percorsi di formazioni gratuiti in base alle vere esigenze del territorio
					</li>
					<li>Creazione di un percorso di supporto e affiancamento dedicato</li>
				</ul>

				<h2>Come si accede al questionario</h2>
				<p>
					A luglio 2024 è stata inviata una mail a tutti i sindaci dei comuni coinvolti, con le
					indicazioni dettagliate sulla compilazione del questionario, disponibile al seguente link
					https://mappacomunidigitali.anci.it Si accede per la prima volta a una pagina di
					registrazione, che presenta un campo in cui indicare la mail della persona chi si occuperà
					della compilazione, scelta dal Comune. Il delegato potrà scegliere la password e accedere
					dunque alla schermata di login.
				</p>
				<h2>Come si compila il questionario</h2>
				<p>
					La survey può essere compilata in più riprese. È importante però salvare le proprie
					risposte prima di lasciare/cambiare la sezione o chiudere il questionario. All’accesso
					successivo tutte le risposte già date saranno conservate ed è ovviamente possibile
					modificarle. Questo per garantire all’ente di avere il tempo necessario a reperire tutte
					le informazioni necessarie in modo corretto. Una volta compilate tutte le domande (se ne è
					stata tralasciata qualcuna comparirà un alert) è necessario inviare il questionario
					facendo clic sull’ultima sezione.
				</p>

				<h2>Contatti utili</h2>
				<p>
					Nel caso in cui non sia stata ricevuta la mail o si hanno problemi ad accedere o più in
					generale per assistenza tecnica è possibile rivolgersi a Anci Digitale S.p.A.
				</p>
				<ul>
					<li>Email: mappacomunidigitali@ancidigitale.it</li>
					<li>
						Tel. 06 83394257 (Opzione 1 Assistenza Comuni / Questionario Mappa Comuni Digitali)
					</li>
				</ul>
				<p class="text-end">
					<a class="btn" href="#" role="button" on:click={toggleinfo}>
						<svg class="icon primary icon-primary"
							><use href="/svg/sprites.svg#it-close-circle"></use></svg
						>
						Chiudi
					</a>
				</p>
			</div>
		</div>
	</div>
{/if}

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
