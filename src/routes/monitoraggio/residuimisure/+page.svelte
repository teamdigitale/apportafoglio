<script>
	import { euro } from '$lib/js/shared';
	import * as d3 from 'd3';
	import katex from 'katex';
	export let data;
	import { onMount } from 'svelte';
	import TangledTree from './TangledTree.svelte';
	import ResiduiViz from './ResiduiViz.svelte';
	import Scorecard from '$lib/c/scorecard.svelte';
	import { setscroll } from '$lib/js/shared.js';
	import Viz from '$lib/c/Viz.svelte';

	onMount(async () => {
		await setscroll();
	});
</script>

<div class="container">
	<div class="row">
		<div class="col-12 col-lg-3">
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
						<span class="it-list"></span>1. Misura
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
								<h3>Misure</h3>
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
										<a class="nav-link active" href="#intro">
											<span>Nota sui calcoli</span>
										</a>
									</li>
									<li class="nav-item">
										{#each data.res as d}
											<a class="nav-link active" href="#{d.misura.replaceAll(' ', '')}">
												<span>{d.misura} </span>
											</a>
										{/each}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</div>
		<div class="col-12 col-lg-9 it-page-sections-container">
			<div class="it-page-section my-5 smallfont" id="intro">
				<h5>Nota sui calcoli</h5>
				<p>
					Ogni investimento di ogni misura è caratterizzato da un importo iniziale di partenza: {@html katex.renderToString(
						'Inv_{totale}',
						{
							throwOnError: false,
							output: 'mathml'
						}
					)} . Tale importo viene poi suddiviso in due quote, una quota riservata agli interventi "centralizzati"
					ed una agli interventi sul territorio:
				</p>
				<p>
					{@html katex.renderToString(
						'Inv_{totale} = Inv_{centralizzato} + Inv_{territorializzato}',
						{
							throwOnError: false,
							output: 'mathml',
							displayMode: true
						}
					)}
				</p>
				<p>
					Gli avvisi afferenti alla misura sono caratterizzati da un importo massimo: {@html katex.renderToString(
						'Avv_{totale}',
						{
							throwOnError: false,
							output: 'mathml'
						}
					)} . All'apertura dell'avviso per il territorio, tale importo viene detratto dalla disponibilità
					di investimento per il terriorio stesso. Per cui, considerando <b>n</b> avvisi aperti, l'importo
					diponibile è pari a:
				</p>
				<p>
					{@html katex.renderToString(
						'Disp_{territorializzato} =  Inv_{territorializzato} - \\sum_{i=1}^{n} Avv_{totale_i}',
						{
							throwOnError: false,
							output: 'mathml',
							displayMode: true
						}
					)}
				</p>
				<p>
					Durante tutto il periodo di apertura dell'avviso, l'importo totale dell'avviso stesso può
					essere mano a mano impegnato dai <b>progetti che vengono candidati</b>. L'invio di una
					candidatura per un progetto è seguito da una verifica di ammissbilità; tutti i progetti
					che non superano tale verifica (stato della vandidatura "NON AMMESSA") non impegnano la
					disponibilità dell'avviso (ad esempio candidature inviate in assenza di disponibilità di
					fondi) e a tutti gli effetti, in questi calcoli, non vanno considerati. Analogamente le
					candidature non confermate tramite inserimento del CUP (stato della candidatura "NON
					ACCETTATA") o ritirate prima della conferma di ammissibilità (stato della candidatura
					"RITIRATA") o non finanziate (stato "NON FINANZIATA") non influiscono sulla disponibilità
					dell'avviso.
				</p>
				<p>
					I soggetti attuatori possono decidere di rinunciare al finanziamento (stato "RINUCIATA") o
					il finanziamento può essere revocato dal Dipartimento (stato "REVOCATA"), ma in questi
					casi gli importi vanno considerati poiché i progetti sono stati precedentemente
					finanziati.
				</p>
				<p>Quindi, in qualsiasi momento, detto</p>
				<p>
					{@html katex.renderToString(
						'STATI\\ AVV = \\Set{ "IN\\ VERIFICA","AMMESSA","ACCETTATA","FINANZIATA","RINUNCIATA","REVOCATA" }',
						{
							throwOnError: false,
							output: 'mathml',
							displayMode: true
						}
					)}
				</p>
				<p>l'importo disponibile dell'avviso è dato da:</p>
				<p>
					{@html katex.renderToString(
						'Avv_{disponibile} = Avv_{totale} - \\sum_{\\substack{i=1\\\\stato\\in STATI\\ AVV}}^{n}Imp_{progetto_i}',
						{
							throwOnError: false,
							output: 'mathml',
							displayMode: true
						}
					)}
				</p>
				<p>In considerazione di quanto appena detto, detto</p>
				<p></p>
				<p>
					{@html katex.renderToString(
						'STATI\\ RIN = \\Set{ "RINUNCIATA\\ DECRETATA","REVOCATA\\ DEFINITIVA" }',
						{
							throwOnError: false,
							output: 'mathml',
							displayMode: true
						}
					)}
				</p>
				<p>
					<b
						>rientrano nella disponibilità territorializzata gli evetuali residui degli avvisi
						chiusi e gli importi dei progetti rinunciati o revocati (questi ultimi solo dopo
						effettivo decreto):</b
					>
				</p>
				<p>
					{@html katex.renderToString(
						'Disp_{territorializzato} =  Inv_{territorializzato} - \\sum_{\\substack{{i=1}\\\\avvisi\\ aperti}}^{n} Avv_{totale_i} + \\sum_{\\substack{{i=1}\\\\avvisi\\ chiusi}}^{n} Avv_{disponibile_i} + \\sum_{\\substack{i=1\\\\stato\\in STATI\\ RIN}}^{n}Imp_{progetto_i}',
						{
							throwOnError: false,
							output: 'mathml',
							displayMode: true
						}
					)}
				</p>
				<p>
					<b
						>Per gli avvisi multimisura, gli importi vencono suddivisi nelle quote delle relative
						misure.</b
					>
				</p>
			</div>
			{#each data.res as d}
				<div class="it-page-section my-5" id={d.misura.replaceAll(' ', '')}>
					<h5>{d.misura}</h5>
					<div class="row">
						<div class="col-12 col-lg-12 my-4">
							<h6>Riepilogo {d.misura}</h6>
							<div class="row">
								<div class="col-12 col-lg-6">
									<Viz
										graphdata={`digraph "${d.misura}" {
                                node [style=rounded shape=box fontname="Titillium Web" fontsize=9]
                                
                                inv_tot [shape=record, tooltip=" ", fontsize="9",  label="{ Investimento totale | ${euro(
																	data.infomisure.find((i) => i.misura === d.misura).importi
																		.importo_totale
																)} }"]
                                inv_centr [shape=record, tooltip=" ", fontsize="9",  label="{ Investimento centralizzato | ${euro(
																	data.infomisure.find((i) => i.misura === d.misura).importi
																		.importo_centralizzato
																)} }"]
                                inv_terr [shape=record, tooltip=" ", fontsize="9",  label="{ Investimento territorializzato | ${euro(
																	data.infomisure.find((i) => i.misura === d.misura).importi
																		.importo_territorializzato
																)} }"]
                                imp_uso [shape=record, tooltip=" ", fontsize="9" , label="{ Importo in uso | ${euro(
																	data.infomisure.find((i) => i.misura === d.misura).importi
																		.importo_territorializzato -
																		data.infomisure.find((i) => i.misura === d.misura).importi
																			.residuo
																)} }"]
                                imp_disp [shape=record, tooltip=" ", style="rounded,filled" fontcolor="white" fontsize="9" fillcolor="#0066cc", label="{ Importo disponibile | ${euro(
																	data.infomisure.find((i) => i.misura === d.misura).importi.residuo
																)} }"]

                                imp_pot_rin [shape=record, tooltip=" ", style="rounded,filled" fontcolor="black" fontsize="9" fillcolor="#dddddd",  label="{ Potenziali rinunce | ${euro(
																	data.infomisure.find((i) => i.misura === d.misura).importi
																		.potenziali_rinunce
																)} }"]

                                imp_pot_rev [shape=record, tooltip=" ", style="rounded,filled"  fontcolor="black" fontsize="9" fillcolor="#dddddd",  label="{ Potenziali revoche | ${euro(
																	data.infomisure.find((i) => i.misura === d.misura).importi
																		.potenziali_revoche
																)} }"]
                                
                                imp_pot_disp [shape=record, tooltip=" ", style="rounded,filled" fontcolor="black" fontsize="9" fillcolor="#dddddd",  label="{ Importo potenziale disponibile | ${euro(
																	data.infomisure.find((i) => i.misura === d.misura).importi
																		.potenziali_revoche +
																		data.infomisure.find((i) => i.misura === d.misura).importi
																			.potenziali_rinunce +
																		data.infomisure.find((i) => i.misura === d.misura).importi
																			.residuo
																)} }"]
                                
                                inv_tot -> inv_centr
                                inv_tot -> inv_terr
                                inv_terr -> imp_uso
                                inv_terr -> imp_disp
                                imp_uso -> imp_pot_rin
                                imp_uso -> imp_pot_rev
                                imp_disp -> imp_pot_disp
                                imp_pot_rin -> imp_pot_disp
                                imp_pot_rev -> imp_pot_disp
                              }`}
										id="{d.misura.replaceAll(' ', '')}graph"
									/>
								</div>
								<div class="col-12 col-lg-6">
									<div class="table-responsive">
										<table class="table table-hover table-sm align-middle smalltable">
											<tbody>
												<tr>
													<td>Investimento totale</td>
													<td class="text-end"
														>{euro(
															data.infomisure.find((i) => i.misura === d.misura).importi
																.importo_totale
														)}</td
													>
												</tr>
												<tr>
													<td>Investimento centralizzato</td>
													<td class="text-end"
														>{euro(
															data.infomisure.find((i) => i.misura === d.misura).importi
																.importo_centralizzato
														)}</td
													>
												</tr>
												<tr>
													<td>Investimento territorializzato</td>
													<td class="text-end"
														>{euro(
															data.infomisure.find((i) => i.misura === d.misura).importi
																.importo_territorializzato
														)}</td
													>
												</tr>
												<tr class="text-primary">
													<td><b>Importo territorializzato residuo</b></td>
													<td class="text-end"
														><b>
															{euro(
																data.infomisure.find((i) => i.misura === d.misura).importi.residuo
															)}</b
														></td
													>
												</tr>
												<tr class="text-secondary">
													<td><i>Importo potenziali rinunce</i></td>
													<td class="text-end"
														><i>
															{euro(
																data.infomisure.find((i) => i.misura === d.misura).importi
																	.potenziali_rinunce
															)}</i
														></td
													>
												</tr>
												<tr class="text-secondary">
													<td><i>Importo potenziali revoche</i></td>
													<td class="text-end"
														><i>
															{euro(
																data.infomisure.find((i) => i.misura === d.misura).importi
																	.potenziali_revoche
															)}</i
														></td
													>
												</tr>
												<tr class="text-secondary">
													<td><i><b>Importo territorializzato residuo potenziale</b></i></td>
													<td class="text-end"
														><i
															><b>
																{euro(
																	data.infomisure.find((i) => i.misura === d.misura).importi
																		.residuo +
																		data.infomisure.find((i) => i.misura === d.misura).importi
																			.potenziali_rinunce +
																		data.infomisure.find((i) => i.misura === d.misura).importi
																			.potenziali_revoche
																)}</b
															></i
														></td
													>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12 col-lg-12 my-4">
							<h6>Dettaglio avvisi {d.misura}</h6>

							<ResiduiViz
								values={data.res}
								misura={d.misura}
								id={'viz_' + d.misura.replaceAll(' ', '')}
							/>
							<div class="my-4">
								<div class="table-responsive">
									<table class="table table-hover table-sm align-middle smalltable">
										<thead>
											<tr>
												<th class="text-center">Avviso</th>
												<th class="text-center">Movimento</th>
												<th class="text-center">Importo</th>
												<th class="text-center">Saldo misura</th>
												<th class="text-center">Potenziali svincoli</th>
											</tr>
										</thead>
										<tbody>
											{#each d.movimenti as m, i}
												{#if i !== 0 && m.importo !== 0}
													<tr>
														{#if m.avviso !== d.movimenti[i - 1].avviso}
															<td
																rowspan={d.movimenti.filter(
																	(x) => x.avviso === m.avviso && x.importo !== 0
																).length}>{m.avviso}</td
															>
														{/if}
														<td>{m.label}</td>
														<td
															class="text-end {m.importo === 0
																? ''
																: m.importo < 0
																	? 'text-danger'
																	: 'text-primary'}"
														>
															{#if !m.label.startsWith('Potenziali')}
																{euro(m.importo)}
															{:else}
																-
															{/if}
														</td>
														<td class="text-end">
															{euro(m.saldo)}
														</td>
														<td class="text-end text-primary">
															{#if m.label.startsWith('Potenziali')}
																{euro(m.importo)}
															{/if}
														</td>
													</tr>
												{/if}
											{/each}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	table.smalltable {
		font-size: 0.8rem;
	}
	.ftw * {
		font-family: 'Titillium-Web' !important;
	}
	.smallfont p {
		font-size: 0.9rem;
	}
</style>
