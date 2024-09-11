<script>
	// @ts-nocheck
	export let s;
	export let codice;
</script>

{#if s.domande.find((x) => x.codice === codice)}
<div class="callout callout-highlight note my-4 largo">
	<div class="callout-title">
		<svg class="icon"><use href="/svg/sprites.svg#it-help-circle"></use></svg>{s.domande.find(
			(x) => x.codice === codice
		).codice}
		{s.domande.find((x) => x.codice === codice).domanda}
	</div>
	<p>
		{s.domande.find((x) => x.codice === codice).risposta}
	</p>
</div>
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

    .callout svg{
		font-size: 0.9rem;
	}

</style>