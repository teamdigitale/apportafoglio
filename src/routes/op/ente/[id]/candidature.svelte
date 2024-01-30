<script>
	// @ts-nocheck

	export let candidature;
	export let misura;
	import moment from 'moment/min/moment-with-locales';
	moment.locale('it');
	let isHovered = false;
</script>

<div class="col-6 col-lg-6 my-3">
	<!--start card-->

	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class:neutral-2-bg-a1={isHovered}
		on:focus={() => (isHovered = true)}
		on:blur={() => (isHovered = false)}
		on:mouseover={() => (isHovered = true)}
		on:mouseout={() => (isHovered = false)}
		class="callout callout-highlight {candidature.filter(
			(c) =>
				c.outfunds__Status__c === 'AMMESSA' ||
				c.outfunds__Status__c === 'ACCETTATA' ||
				c.outfunds__Status__c === 'FINANZIATA'
		).length > 0
			? 'success'
			: 'danger '} fullheight shadow py-4 px-2"
	>
		<div class="clearfix">
			<div class="categoryicon-top float-start">
				<svg
					class="icon icon-{candidature.filter(
						(c) =>
							c.outfunds__Status__c === 'AMMESSA' ||
							c.outfunds__Status__c === 'ACCETTATA' ||
							c.outfunds__Status__c === 'FINANZIATA'
					).length > 0
						? 'success'
						: 'danger '}"><use href="/svg/sprites.svg#it-horn"></use></svg
				>
				<span
					class="text text-uppercase {candidature.filter(
						(c) =>
							c.outfunds__Status__c === 'AMMESSA' ||
							c.outfunds__Status__c === 'ACCETTATA' ||
							c.outfunds__Status__c === 'FINANZIATA'
					).length > 0
						? 'text-success'
						: 'text-danger'}"
				>
					<strong>{misura} </strong>
				</span>
			</div>
		</div>

		<div>
			{#if candidature && candidature.length > 0}
				{#if candidature.filter((c) => c.outfunds__Status__c === 'AMMESSA' || c.outfunds__Status__c === 'ACCETTATA' || c.outfunds__Status__c === 'FINANZIATA').length === 0}
					<div class="alert alert-danger my-2" role="alert">L'ente non ha candidature attive.</div>
					<ul>
						{#each candidature.filter((c) => c.outfunds__Status__c !== 'AMMESSA' && c.outfunds__Status__c !== 'ACCETTATA' && c.outfunds__Status__c !== 'FINANZIATA') as c}
							<li>
								La candidatura inviata il {moment(c.Data_invio_candidatura__c).format('DD/MM/YYYY')}
								è in stato {c.outfunds__Status__c}
							</li>
						{/each}
					</ul>
				{:else}
					<ul>
						{#each candidature.filter((c) => c.outfunds__Status__c === 'AMMESSA' || c.outfunds__Status__c === 'ACCETTATA' || c.outfunds__Status__c === 'FINANZIATA') as c}
							<li>
								La candidatura inviata il {moment(c.Data_invio_candidatura__c).format('DD/MM/YYYY')}
								è in stato {c.outfunds__Status__c}.{#if c.Stato_Progetto__c} Il relativo progetto è in stato {c.Stato_Progetto__c}.{/if}
							</li>
						{/each}
					</ul>
				{/if}
			{:else}
				<div class="alert alert-danger my-2" role="alert">
					L'ente non si è mai candidato a nessun avviso
				</div>
			{/if}
		</div>
	</div>

	<!--end card-->
</div>

<!--
{#if candidature && candidature.length > 0}
	{#if candidature.filter((c) => c.outfunds__Status__c === 'FINANZIATA').length > 0}
		<p><strong>Candidature attive</strong></p>
        <ul>
            {#each candidature.filter((c) => c.outfunds__Status__c === 'FINANZIATA') as c}
            <li>
                
                    La candidatura inviata il {moment(c.Data_invio_candidatura__c).format('DD/MM/YYYY')} è in
                    stato {c.outfunds__Status__c}
                
            </li>
            {/each}
        </ul>
		{#if candidature.filter((c) => c.outfunds__Status__c !== 'FINANZIATA').length > 0}
			<p>Candidature non attive</p>
			<ul>
                {#each candidature.filter((c) => c.outfunds__Status__c !== 'FINANZIATA') as c}
				<li>
					
						La candidatura inviata il {moment(c.Data_invio_candidatura__c).format('DD/MM/YYYY')} è in
						stato {c.outfunds__Status__c}
					
				</li>
                {/each}
			</ul>
		{/if}
	{:else}
		<div class="alert alert-danger" role="alert">
			L'ente non ha candidature attive per questa misura
		</div>
	{/if}
{:else}
	<div class="alert alert-danger" role="alert">
		L'ente non si è mai candidato a nessun avviso per questa misura
	</div>
{/if}
-->

<style>
	.fullheight {
		min-height: 100%;
		height: 100%;
	}
</style>
