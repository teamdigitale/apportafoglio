<script>
	import Usercard from '$lib/c/usercard.svelte';
	import { areaManager } from '$lib/js/shared.js';
	export let data;
</script>

<div class="container my-4 text-center">
	{#if !data.loggedstandard}
		<p>
			<a href="/api/oauth/" class="text-decoration-none fw-bold" data-sveltekit-preload-data="off">
				<figure class="figure">
					<img
						src="/salesforce.com_logo.svg"
						class="figure-img img-fluid rounded"
						alt="Logo di salesforce"
					/>
					<figcaption class="figure-caption text-end">
						Accedi con le tue credenziali SalesForce
					</figcaption>
				</figure>
				<br />Accedi
				<span class="mx-3"
					><svg class="icon icon-primary icon-sm align-middle"
						><use href="/svg/sprites.svg#it-external-link"></use></svg
					></span
				></a
			>
		</p>
	{:else}
		<form method="POST" action="?/logoutstandard">
			<Usercard utente={data.utentestandard} tipo={areaManager(data.utentestandard.idsf)?'Area Manager':'AcM / TIM'} />
		</form>
	{/if}
</div>
