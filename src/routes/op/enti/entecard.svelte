<script>
	// @ts-nocheck

	export let ente;
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
			class="callout callout-highlight {!ente.Active__c
				? 'danger '
				: 'primary '} fullheight shadow py-4 px-2"
		>
		<div class="clearfix">
			<div class="categoryicon-top float-start">
				<svg class="icon icon-primary"><use href="/svg/sprites.svg#it-pa"></use></svg>
				<span class="text {!ente.Active__c ? 'text-danger' : 'text-primary'}">
					<strong>{ente.Name}</strong>
				</span>
			</div>
            <div class="chip chip-simple float-end">
                <svg class="icon icon-xs"><use href="/svg/sprites.svg#it-pa"></use></svg>
                <span class="chip-label">{ente.portafoglio}</span>
            </div>
		</div>
			<div>
                <dl class="row">
				<dt class="col-sm-4"><small>Tipologia Ente:</small></dt>
				<dd class="col-sm-8">
					<small>
						{ente.Tipologia_Ente__c}
					</small>
				</dd>

				<dt class="col-sm-4"><small>Regione:</small></dt>
				<dd class="col-sm-8">
					<small>
						{ente.Regione__c}
					</small>
				</dd>
				<dt class="col-sm-4"><small>Provincia:</small></dt>
				<dd class="col-sm-8">
					<small>
						{ente.ShippingState}
					</small>
				</dd>
				<dt class="col-sm-4"><small>Comune:</small></dt>
				<dd class="col-sm-8">
					<small>
						{ente.ShippingCity}
					</small>
				</dd>
				<dt class="col-sm-4"><small>Indirizzo:</small></dt>
				<dd class="col-sm-8">
					<small>
						{ente.ShippingCity}
					</small>
				</dd>
				<dt class="col-sm-4"><small>PEC:</small></dt>
				<dd class="col-sm-8">
					<small>
						<a href="mailto:{ente.PEC__c}">{ente.PEC__c}</a>
					</small>
				</dd>
				<dt class="col-sm-4"><small>Responsabile:</small></dt>
				<dd class="col-sm-8">
					<small>
						{ente.Nome_responsabile__c}
						{ente.Cognome_responsabile__c} ({ente.Titolo_responsabile__c})
					</small>
				</dd>
            </dl>
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
