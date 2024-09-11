<script>
	// @ts-nocheck
	export let servizi;
	export let title = '';
</script>

{#if servizi && servizi.length > 0}
	<div class="my-4">
		<p class="text-info text-center">
			<svg class="icon icon-info"><use href="/svg/sprites.svg#it-files"></use></svg><b>
				{title}
			</b>
		</p>
		{#each servizi as s}
			<div class="callout info callout-highlight my-2 neutral-1-bg-a2 rounded px-4 py-2">
				<small><b>{s[0]}: </b>{s[1]}</small><br />
			</div>
		{/each}
	</div>
{/if}
