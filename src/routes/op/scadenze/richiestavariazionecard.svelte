<script>
	// @ts-nocheck

	export let scadenza;
	export let idu;
	import moment from 'moment/min/moment-with-locales';
	moment.locale('it');
	let isHovered = false;
</script>

<div class="row fullheight">
	<div class="col-12 col-lg-12">
		<!--start card-->

		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class:neutral-2-bg-a1={isHovered}
			on:focus={() => (isHovered = true)}
			on:blur={() => (isHovered = false)}
			on:mouseover={() => (isHovered = true)}
			on:mouseout={() => (isHovered = false)}
			class="callout primary fullheight shadow py-4 px-2"
		>
			<div class="clearfix">
				<div class="categoryicon-top float-start">
					<svg class="icon icon-primary"><use href="/svg/sprites.svg#it-pa"></use></svg>
					<span class="text text-primary">
						<strong
							>{scadenza.outfunds__Funding_Request__r.outfunds__Applying_Organization__r
								.Name}</strong
						>
					</span>
				</div>
				<div class="chip chip-simple float-end">
					<svg class="icon icon-xs"><use href="/svg/sprites.svg#it-calendar"></use></svg>
					<span class="chip-label">{scadenza.RecordType.Name}</span>
				</div>
			</div>
			<div>
				<dl class="row">
					<dt class="col-sm-4"><small>Avviso:</small></dt>
					<dd class="col-sm-8">
						<small>
							{scadenza.outfunds__Funding_Request__r.outfunds__FundingProgram__r.Name}
						</small>
					</dd>

					<dt class="col-sm-4"><small>Richiesta:</small></dt>
					<dd class="col-sm-8">
						<small>
							{scadenza.rv[0].Description}
						</small>
					</dd>
					<dt class="col-sm-4"><small>Data richiesta:</small></dt>
					<dd class="col-sm-8">
						<small>
							{moment(scadenza.rv[0].Data_richiesta__c, 'YYYY-MM-DD').format('DD/MM/YYYY')}
						</small>
					</dd>
					<dt class="col-sm-4"><small>Data scadenza:</small></dt>
					<dd class="col-sm-8">
						<small>
							<span
								>{moment(scadenza.rv[0].Data_scadenza_iniziale__c, 'YYYY-MM-DD').format(
									'DD/MM/YYYY'
								)}
								<span class="text-danger"
									>({moment(scadenza.rv[0].Data_scadenza_iniziale__c, 'YYYY-MM-DD')
										.add(1, 'days')
										.startOf('day')
										.fromNow()})</span
								></span
							>
						</small>
					</dd>
					<dt class="col-sm-4"><small>Giorni richiesti:</small></dt>
					<dd class="col-sm-8">
						<small>
							{scadenza.rv[0].Giorni_richiesti__c}
						</small>
					</dd>
				</dl>
				{#if scadenza.rv[0].comm && scadenza.rv[0].comm.length > 0}
					<hr />
					{#each scadenza.rv[0].comm as message}
						{#if message.InsertedById === idu}
							<dl class="row">
								<dt class="col-sm-4"><small> Il giorno {moment(message.CreatedDate).format(
                                    "DD/MM/YYYY",
                                )} hai scritto:</small></dt>
								<dd class="col-sm-8">
									<small>
										{@html message.Body}
									</small>
								</dd>
							</dl>
						{:else}
                        <dl class="row">
                            <dt class="col-sm-4"><small> Il giorno {moment(message.CreatedDate).format(
                                "DD/MM/YYYY",
                            )} è stato inserito questo commento:</small></dt>
                            <dd class="col-sm-8">
                                <small>
                                    {@html message.Body}
                                </small>
                            </dd>
                        </dl>
                        {/if}
					{/each}
				{/if}
                {#if (!scadenza.rv[0].comm || scadenza.rv[0].comm.length === 0 
				//|| scadenza.rv[0].comm.filter((c) => c.InsertedById === idu).length === 0
				) && Number(scadenza.rv[0].Giorni_richiesti__c) >= 90}
                <div class="alert alert-primary" role="alert">
                    Non hai ancora inserito commenti. Procedi inserendo su SalesForce il tuo parere relativamente alla
                    richiesta di proroga dell'Ente.
                </div>
                {/if}
			</div>
		</div>

		<!--end card-->
	</div>
</div>

<style>
	.fullheight {
		min-height: 100%;
		height: 100%;
	}
</style>
