<script>
	import { euro } from '$lib/js/shared';
	// @ts-nocheck

	export let avviso;
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
			class="callout callout-highlight {avviso.outfunds__Status__c === 'TERMINATO'
				? 'danger '
				: 'success '} fullheight shadow py-4 px-2"
		>
			<div class="categoryicon-top">
				<svg
					class="icon {avviso.outfunds__Status__c === 'TERMINATO'
						? 'icon-danger '
						: 'icon-success '}"
					><use
						href="/svg/sprites.svg#it-{avviso.outfunds__Status__c === 'TERMINATO'
							? 'locked'
							: 'unlocked'}"
					></use></svg
				>
				<span
					class="text {avviso.outfunds__Status__c === 'TERMINATO' ? 'text-danger' : 'text-success'}"
				>
					<strong>{avviso.outfunds__Status__c}</strong>
				</span>
			</div>

			<p>
				{#each avviso.beneficiari as b}
					<div class="chip chip-simple">
						<span class="chip-label">{b}</span>
					</div>
				{/each}
			</p>
			<div>
				<h6>{avviso.Name}</h6>
				<dl class="row">
					<dt class="col-sm-4"><small>Data termine:</small></dt>
					<dd class="col-sm-8">
						<small>
							{moment(avviso.outfunds__End_Date__c).format('DD/MM/YYYY')}
							{#if avviso.outfunds__Status__c === 'PUBBLICATO'}
								<span class="text-danger"
									><strong>
										({moment(avviso.outfunds__End_Date__c).endOf('day').fromNow()})</strong
									></span
								>
							{/if}
						</small>
					</dd>

					<dt class="col-sm-4"><small>Data avvio:</small></dt>
					<dd class="col-sm-8">
						<small>
							{moment(avviso.outfunds__Start_Date__c).format('DD/MM/YYYY')}
						</small>
					</dd>

					<dt class="col-sm-4"><small>Valore:</small></dt>
					<dd class="col-sm-8">
						<small><strong> {euro(avviso.outfunds__Total_Program_Amount__c)}</strong> </small>
					</dd>

					<dt class="col-sm-4"><small>Fondi disponibili:</small></dt>
					<dd class="col-sm-8">
						<small><strong> {euro(avviso.Fondi_disponibili__c)}</strong> </small>
					</dd>

					<dt class="col-sm-4"><small>Oggetto:</small></dt>
					<dd class="col-sm-8">
						<small>
							{avviso.Oggetto_Avviso__c}
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
