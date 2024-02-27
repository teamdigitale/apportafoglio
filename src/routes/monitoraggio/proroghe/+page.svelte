<script>
	import Cite from '$lib/c/cite.svelte';

	export let data;
</script>

<div class="container my-4">
	<h1>Monitoraggio proroghe e target</h1>
	<Cite text="Mai rimandare a domani ciò che puoi fare benissimo dopodomani." author="Mark Twain" />

	<div class="row">
		{#each data.misure as m}
			{#if m.misura === '1.4.3 Adozione PagoPA e AppIO'}
				<div class="col-12 col-lg-3 my-3" data-sveltekit-preload-data="off">
					<div class="card card-teaser rounded shadow">
						<a
							class="card card-img no-after special-card"
							href="/monitoraggio/proroghe/{m.idmisura}?pacchetto=PagoPA"
						>
							<div class="card-body">
								<p class="card-text font-serif">{m.misura} - PagoPA</p>
							</div>
						</a>
					</div>
				</div>
				<div class="col-12 col-lg-3 my-3" data-sveltekit-preload-data="off">
					<div class="card card-teaser rounded shadow">
						<a
							class="card card-img no-after special-card"
							href="/monitoraggio/proroghe/{m.idmisura}?pacchetto=AppIO"
						>
							<div class="card-body">
								<p class="card-text font-serif">{m.misura} - App IO</p>
							</div>
						</a>
					</div>
					
				</div>
			{:else}
				<div class="col-12 col-lg-3 my-3" data-sveltekit-preload-data="off">
					<div class="card card-teaser rounded shadow">
						<a
							class="card card-img no-after special-card"
							href="/monitoraggio/proroghe/{m.idmisura}"
						>
							<div class="card-body">
								<p class="card-text font-serif">{m.misura}</p>
							</div>
						</a>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>
