<script>
	// @ts-nocheck

	export let q;
	export let questdef;
	const convertTitle = (t) => {
		return t.trim().split(' ').slice(1).join(' ');
	};
</script>

{#if questdef}
	<div class="row">
		<div class="col-12 col-lg-12">
			<div class="card-wrapper card-space">
				<div class="card card-bg">
					<div class="card-body">
						<div class="category-top">
							<h6 class="text-primary">{convertTitle(q.title)}</h6>
							<p><small>{questdef.nota}</small></p>
						</div>
						{#if questdef.tipo === 'multicheck'}
							{#each q.answers as a}
								<div class="risposte">
									<input id="checkbox{a.id}" type="checkbox" />
									<label for="checkbox{a.id}">{a.title}</label>
								</div>
							{/each}
						{/if}
						{#if questdef.tipo === 'value'}
							<div class="risposte">
								<div class="w-50 mt5">
									<input type="text" id="input{q.id}" />
								</div>
							</div>
						{/if}
						{#if questdef.tipo === 'radio'}
							<div class="risposte">
								{#each q.answers as a}
									<input name="gruppo{a.id}" type="radio" id="radio{a.id}" />
									<label for="radio{a.id}">{a.title}</label><br />
								{/each}
							</div>
						{/if}
						{#if questdef.tipo === 'multiradio'}
							<div class="risposte">
								<div class="table-responsive">
									<table class="table table-hover table-sm caption-top align-middle">
										<thead>
											<tr>
												<th><small></small></th>
												{#each q.columns as c}
													<th class="text-center"><small>{c.title}</small></th>
												{/each}
											</tr>
										</thead>
										<tbody>
											{#each q.answers as a}
												<tr>
													<td><small>{a.title}</small></td>
													{#each q.columns as c}
														<td class="text-center"
															><small>
																<input
																	name="gruppo{a.id}{c.id}"
																	type="radio"
																	id="radio{a.id}{c.id}"
																/>
																<label for="radio{a.id}{c.id}"></label>
																<br />
															</small></td
														>
													{/each}
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							</div>
						{/if}
						{#if questdef.tipo === 'multicheckoptions'}
							<div class="risposte">
								<div class="table-responsive">
									<table class="table table-hover table-sm caption-top align-middle">
										<thead>
											<tr>
												<th><small></small></th>
												{#each q.columns as c}
													<th class="text-center"><small>{c.title}</small></th>
												{/each}
											</tr>
										</thead>
										<tbody>
											{#each q.answers as a}
												<tr>
													<td><small>{a.title}</small></td>
													{#each q.columns as c}
														<td class="text-center"
															><small>
																<div class="risposte">
																	<input id="checkbox{a.id}{c.id}" type="checkbox" />
																</div>
															</small></td
														>
													{/each}
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							</div>
						{/if}
						<hr />
						<div class="row">
							{#if questdef.warnings.length > 0}
								<div class="col-12 col-lg-12">
									<div class="alert alert-warning" role="alert">
										<b>Controlli warning</b>
										<ul>
											{#each questdef.warnings as w}
												<li>{w}</li>
											{/each}
										</ul>
									</div>
								</div>
							{/if}
							{#if questdef.alerts.length > 0}
								<div class="col-12 col-lg-12">
									<div class="alert alert-danger" role="alert">
										<b>Controlli alert</b>
										<ul>
											{#each questdef.alerts as w}
												<li>{w}</li>
											{/each}
										</ul>
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.risposte * {
		font-size: 0.9rem;
	}
	.alert {
		margin: 0.2rem;
		padding-bottom: 0;
	}
	.alert * {
		font-size: 0.9rem;
	}
	.card:after {
		margin-top: 0px;
	}
</style>
