<script>
	// @ts-nocheck

	import comuni from '$lib/comuni.json';

	import Entecard from '$lib/uicomponents/entecard.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

</script>


<section class="my-3">
<div class="columns is-multiline">
	{#each data.enti.records as ente}
		<div class="column is-one-third">
			<Entecard
				{ente}
				categoria={data.categorie.records.filter(
					(c) => c.Codice_categoria === ente.Codice_Categoria
				)[0].Nome_categoria}
				comune={comuni.filter(c=> c["Codice Comune formato alfanumerico"]===ente.Codice_comune_ISTAT)}
			/>
		</div>
	{/each}
</div>

</section>
