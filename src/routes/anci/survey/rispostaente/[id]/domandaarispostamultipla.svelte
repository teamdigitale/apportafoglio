<script>
	// @ts-nocheck
	export let s;
	export let codice;
    export let sorted=false;
</script>

{#if s.domande.find((x) => x.codice === codice)}
<!--start card-->
<div class="callout callout-highlight note my-4">
	<div class="callout-title">
		<svg class="icon"><use href="/svg/sprites.svg#it-help-circle"></use></svg>{s.domande.find(
			(x) => x.codice === codice
		).codice}
		{s.domande.find((x) => x.codice === codice).domanda}
	</div>
    {#if sorted}
    <ol>
		{#each s.domande.find((x) => x.codice === codice).risposte as r}
			<li>{r}</li>
		{/each}
	</ol>
    {:else}
    
	<ul>
		{#each s.domande.find((x) => x.codice === codice).risposte as r}
			<li>
                {#if r === 'Facebook'}
									<svg class="icon icon-sm icon-primary"
										><use href="/svg/sprites.svg#it-facebook"></use></svg
									>
								{/if}
								{#if r === 'X'}
									<svg class="icon icon-sm icon-primary"
										><use href="/svg/sprites.svg#it-twitter"></use></svg
									>
								{/if}
								{#if r === 'Youtube'}
									<svg class="icon icon-sm icon-primary"
										><use href="/svg/sprites.svg#it-youtube"></use></svg
									>
								{/if}
								{#if r === 'LinkedIn'}
									<svg class="icon icon-sm icon-primary"
										><use href="/svg/sprites.svg#it-linkedin"></use></svg
									>
								{/if}
								{#if r === 'Instagram'}
									<svg class="icon icon-sm icon-primary"
										><use href="/svg/sprites.svg#it-instagram"></use></svg
									>
								{/if}
								{#if r === 'Tik Tok'}
									<svg class="icon icon-sm icon-primary"
										><use href="/svg/sprites.svg#it-tiktok"></use></svg
									>
								{/if}
								{#if r === 'Telegram'}
									<svg class="icon icon-sm icon-primary"
										><use href="/svg/sprites.svg#it-telegram"></use></svg
									>
								{/if}
								{#if r === 'Whatsapp'}
									<svg class="icon icon-sm icon-primary"
										><use href="/svg/sprites.svg#it-whatsapp"></use></svg
									>
								{/if}
                {r}
            </li>
		{/each}
	</ul>
    {/if}
</div>
<!--end card-->

{/if}

<style>
	.callout {
		max-width: none !important;
	}


    .callout-title {
		font-size: 1rem;
		font-family: 'Titillium Web';
	}

    .callout p{
		font-size: 1rem;
		font-family: 'Titillium Web';
	}

	.callout ul{
		font-size: 1rem;
		font-family: 'Titillium Web';
	}

    .callout ol{
		font-size: 1rem;
		font-family: 'Titillium Web';
	}

    .callout svg{
		font-size: 0.9rem;
	}

</style>