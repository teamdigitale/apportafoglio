<script>
	import { euro } from '$lib/js/shared';
	import Columnchart from './columnchart.svelte';

	export let data;
	console.log(data);
	let filteredMisure = data.misure.filter(
		(m) => m.avvisi.filter((a) => a.outfunds__Status__c === 'PUBBLICATO').length > 0
	);

	const stati = ['Impegnate', 'Finanziate', 'Rinunciate', 'Revocate', 'Residue'];

	const statiColors = [
		'#bdddfc',
		'#6aaaeb',
		'#f5ce93',
		'#20d696',
		'#009963',
		'#2bd6d0',
		'#cc7a00',
		'#20d696',
		'#009963'
	];

	const calcolaStatiColors = () => {
		let res = {};
		statiColors.forEach((e, index) => {
			res[index] = { color: statiColors[index] };
		});
		return res;
	};

	const calcolaImpegnate = (a) => {
		return a.risorse.get('ACCETTATA')
			? a.risorse.get('ACCETTATA')
			: 0 + a.risorse.get('AMMESSA')
				? a.risorse.get('AMMESSA')
				: 0 + a.risorse.get('AMMESSA CON RISERVA')
					? a.risorse.get('AMMESSA CON RISERVA')
					: 0 + a.risorse.get('IN VERIFICA')
						? a.risorse.get('IN VERIFICA')
						: 0;
	};

	const calcolaFinanziate = (a) => {
		return a.risorse.get('FINANZIATA') ? a.risorse.get('FINANZIATA') : 0;
	};
	const calcolaRinunciate = (a) => {
		return a.risorse.get('RINUNCIATA') ? a.risorse.get('RINUNCIATA') : 0;
	};
	const calcolaRevocate = (a) => {
		return a.risorse.get('REVOCATA') ? a.risorse.get('REVOCATA') : 0;
	};

	const calcolaResidue = (a) => {
		return (
			a.outfunds__Total_Program_Amount__c -
			calcolaImpegnate(a) -
			calcolaFinanziate(a) -
			calcolaRinunciate(a) -
			calcolaRevocate(a)
		);
	};

	const calcolaResiduoAvvisi = (a) => {
		const result = [];
		result.push(['Stato'].concat(stati));
		const row = [];
		row.push('Numero');
		const valoreAvviso = a.outfunds__Total_Program_Amount__c;
		const impegnate = calcolaImpegnate(a);
		const finanziate = calcolaFinanziate(a);
		const rinunciate = calcolaRinunciate(a);
		const revocate = calcolaRevocate(a);
		row.push(impegnate);
		row.push(finanziate);
		row.push(rinunciate);
		row.push(revocate);
		row.push(valoreAvviso - impegnate - finanziate - rinunciate - revocate);
		result.push(row);
		return result;
	};
</script>

{#each filteredMisure as m}
	<div class="row">
		<div class="col-12">
			<p><strong>{m.Name}</strong></p>
		</div>
	</div>
	<div class="row">
		{#each m.avvisi.filter((x) => x.outfunds__Status__c === 'PUBBLICATO') as a}
			<div class="col-12 col-lg-6">
				<div class="row">
					<div class="col-12 col-lg-12 my-3">
						<!--start card-->

						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div class="callout callout-highlight fullheight shadow py-4 px-2">
							<div class="clearfix">
								<div class="categoryicon-top float-start">
									<svg class="icon icon-primary"><use href="/svg/sprites.svg#it-user"></use></svg>
									<span class="text text-uppercase">
										<strong>{a.Name} </strong>
										<p>
											<small>
												<strong>Valore avviso:</strong>
												{euro(a.outfunds__Total_Program_Amount__c)} - <strong>Residue:</strong>
												{euro(calcolaResidue(a))}</small
											>
										</p>
									</span>
								</div>
							</div>

							<div>
								<div class="row">
									<div class="col-12 col-lg-6">
										<Columnchart
											id={a.Id}
											values={calcolaResiduoAvvisi(a)}
											series={calcolaStatiColors()}
											legendPosition=""
											stacked={'percent'}
											h="100"
										/>
									</div>
									<div class="col-12 col-lg-6">
										<div class="row">
											<div class="row">
												<div class="col-12 col-lg-12">
													<ul>
														{#if calcolaImpegnate(a) > 0}
															<li>
																<small
																	><strong>Impegnate:</strong> {euro(calcolaImpegnate(a))}</small
																>
															</li>
														{/if}
														{#if calcolaFinanziate(a) > 0}
															<li>
																<small
																	><strong>Finanziate:</strong> {euro(calcolaFinanziate(a))}</small
																>
															</li>
														{/if}
														{#if calcolaRinunciate(a) > 0}
															<li>
																<small
																	><strong>Rinunciate:</strong> {euro(calcolaRinunciate(a))}</small
																>
															</li>
														{/if}
														{#if calcolaRevocate(a) > 0}
															<li>
																<small><strong>Revocate:</strong> {euro(calcolaRevocate(a))}</small>
															</li>
														{/if}
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!--end card-->
					</div>
				</div>
			</div>
		{/each}
	</div>
{/each}
