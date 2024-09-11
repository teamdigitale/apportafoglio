<script>
	// @ts-nocheck
	export let s;
	export let codice;
	export let redlabel = "";
	let domanda = s.domande.find((x) => x.codice === codice);
	
</script>

<div class="callout callout-highlight note my-4 largo">
	<div class="callout-title">
		<svg class="icon"><use href="/svg/sprites.svg#it-help-circle"></use></svg>{s.domande.find(
			(x) => x.codice === codice
		).codice}
		{domanda.domanda}
	</div>
	
	<table class="table table-sm table-responsive">
		<thead>
			<th></th>
			{#each domanda.options.filter(x => x!==redlabel) as o}
				<th class="text-left"><small>{o}</small></th>
			{/each}
		</thead>
		<tbody>
			{#each domanda.risposte as r,index}
				<tr class="{r[1].length===0||r[1].indexOf(redlabel)!==-1?'table-danger':''}">
					<td><small><b>{r[0]}</b></small></td>
					{#each domanda.options.filter(x => x!==redlabel) as o}
					<td class="align-middle text-center">
						<span class="align-middle">
							
							<span >
								<small>
									{#if r[1].indexOf(o)!==-1}
									<svg class="icon icon-success icon-sm"
								><use href="/svg/sprites.svg#it-check-circle"></use></svg
							>
										{:else}
										-
									{/if}
									
								</small>
							</span>
						</span>
					</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.callout {
		max-width: none !important;
	}

	.callout-title {
		font-size: 1rem;
		font-family: 'Titillium Web';
	}

	.callout p {
		font-size: 1rem;
		font-family: 'Titillium Web';
	}

	.callout ul {
		font-size: 1rem;
		font-family: 'Titillium Web';
	}

	.callout svg {
		font-size: 0.9rem;
	}
</style>
