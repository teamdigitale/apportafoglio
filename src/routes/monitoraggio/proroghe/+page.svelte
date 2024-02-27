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
				<div class="col-12 col-lg-2 my-4 mx-4" data-sveltekit-preload-data="off" >
					<a href="/monitoraggio/proroghe/{m.idmisura}?pacchetto=PagoPA">
						<figure class="figure">
							<img style="height: 100px;"
								src="/logos/{m.misura} - PagoPA-logo.svg"
								class="figure-img img-fluid rounded"
								alt="Un'immagine generica segnaposto con angoli arrotondati in una figura."
							/>
							<figcaption class="figure-caption">{m.misura} - PagoPA</figcaption>
						</figure>
					</a>
				</div>
				<div class="col-12 col-lg-2 my-4 mx-4" data-sveltekit-preload-data="off">
					<a href="/monitoraggio/proroghe/{m.idmisura}?pacchetto=AppIO">
						<figure class="figure">
							<img
							style="height: 100px;"
								src="/logos/{m.misura} - App IO-logo.svg"
								class="figure-img img-fluid rounded"
								alt="Un'immagine generica segnaposto con angoli arrotondati in una figura."
							/>
							<figcaption class="figure-caption">{m.misura} - App IO</figcaption>
						</figure>
					</a>
				</div>
			{:else}
				<div class="col-12 col-lg-2 my-4" data-sveltekit-preload-data="off">
					<a href="/monitoraggio/proroghe/{m.idmisura}">
						<figure class="figure">
							<img
							style="height: 100px;"
								src="/logos/{m.misura}-logo.svg"
								class="figure-img img-fluid rounded"
								alt="Un'immagine generica segnaposto con angoli arrotondati in una figura."
							/>
							<figcaption class="figure-caption">{m.misura}</figcaption>
						</figure>
					</a>
					
				</div>
			{/if}
		{/each}
	</div>
</div>
