<script>
	// @ts-nocheck

	export let referente;
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
			class="callout callout-highlight {referente.Stato__c !== 'Attivo'
				? 'danger '
				: 'primary '} fullheight shadow py-4 px-2"
		>
			<div class="clearfix">
				<div class="categoryicon-top float-start">
					<svg class="icon icon-primary"><use href="/svg/sprites.svg#it-user"></use></svg>
					<span
						class="text text-uppercase {referente.Stato__c !== 'Attivo'
							? 'text-danger'
							: 'text-primary'}"
					>
						<strong
							>{referente.Name}
							{#if referente.Stato__c !== 'Attivo'}
								&nbsp;({referente.Stato__c})
							{/if}
						</strong>
					</span>
				</div>
				<!--
				<div class="chip chip-simple float-end">
					<svg class="icon icon-xs"><use href="/svg/sprites.svg#it-pa"></use></svg>
					<span class="chip-label">{referente.portafoglio}</span>
				</div>
				-->
			</div>

			<div>
				<dl class="row">
					<dt class="col-sm-3"><small>Ente:</small></dt>
					<dd class="col-sm-9">
						<small>
							{referente.Account.Name}
						</small>
					</dd>
					<dt class="col-sm-3"><small>Profilo:</small></dt>
					<dd class="col-sm-9">
						<small>
							{referente.Profilo__c ? referente.Profilo__c : 'Responsabile'}
						</small>
					</dd>

					<dt class="col-sm-3"><small>Telefono:</small></dt>
					<dd class="col-sm-9">
						<small class={referente.MobilePhone ? '' : 'text-muted'}>
							{referente.MobilePhone ? referente.MobilePhone : 'Non disponibile'}
						</small>
					</dd>

					<dt class="col-sm-3"><small>Email:</small></dt>
					<dd class="col-sm-9">
						<small class={referente.Email ? '' : 'text-muted'}>
							{referente.Email ? referente.Email : 'Non disponibile'}
						</small>
					</dd>

					<dt class="col-sm-3"><small>Ultima attività:</small></dt>
					<dd class="col-sm-9">
						<small class={referente.LastActivityDate ? '' : 'text-muted'}>
							{referente.LastActivityDate
								? moment(referente.LastActivityDate).format('DD/MM/YYYY')
								: 'Non disponibile'}
							{#if referente.LastActivityDate}
								({referente.LastActivityDate
									? moment(referente.LastActivityDate).startOf('day').fromNow()
									: ''})
							{/if}
						</small>
					</dd>
					<hr />
					<div class="row">
						<div class="col-12 col-lg-3 text-center">
							{#if referente.MobilePhone}
								<a class="text-success" target="_blank" href="https://wa.me/{referente.MobilePhone}"
									><svg class="icon icon-success"
										><use href="/svg/sprites.svg#it-whatsapp"></use></svg
									></a
								>
							{/if}
						</div>
						<div class="col-12 col-lg-3 text-center">
							{#if referente.MobilePhone}
								<a class="text-primary" target="_blank" href="tel:{referente.MobilePhone}"
									><svg class="icon icon-primary"
										><use href="/svg/sprites.svg#it-telephone"></use></svg
									></a
								>
							{/if}
						</div>
						<div class="col-12 col-lg-3 text-center">
							{#if referente.Email}
								<a class="text-primary" target="_blank" href="mailto:{referente.Email}"
									><svg class="icon icon-primary"><use href="/svg/sprites.svg#it-mail"></use></svg
									></a
								>
							{/if}
						</div>
                        <div class="col-12 col-lg-3 text-center">

								<a class="text-primary" target="_blank" href="/api/vcard/{referente.Id}"
									><svg class="icon icon-primary"
										><use href="/svg/sprites.svg#it-download"></use></svg
									></a
								>

						</div>
					</div>
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
