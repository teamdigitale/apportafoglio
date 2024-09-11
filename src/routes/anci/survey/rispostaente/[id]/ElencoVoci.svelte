<script>
	// @ts-nocheck
	export let s;
	export let codice;
	export let icons = [[]];
	let domanda = s.domande.find((x) => x.codice === codice);
	const geticon = (v) => {
		if (icons.find((x) => x[0] === v)) {
			return icons.find((x) => x[0] === v)[1];
		}
		return '';
	};
	const geticoncolor = (v) => {
		if (icons.find((x) => x[0] === v)) {
			return icons.find((x) => x[0] === v)[2];
		}
		return '';
	};
</script>

<div class="callout callout-highlight note my-4 largo">
	<div class="callout-title">
		<svg class="icon"><use href="/svg/sprites.svg#it-help-circle"></use></svg>{domanda.codice}
		{domanda.domanda}
	</div>
	<table class="table table-sm table-responsive">
		<tbody>
			{#each domanda.risposte as r}
				<tr>
					<td style="width: 50%;"><small><b>{r[0]}</b></small></td>
                    <td class="align-middle text-center"><svg class="icon icon-secondary"
                        ><use href="/svg/sprites.svg#it-chevron-right"></use></svg
                    ></td>
					<td class="align-middle">
						<span class="align-middle">
                            {#if geticon(r[1])!==''}
							<svg class="icon icon-{geticoncolor(r[1])}"
								><use href="/svg/sprites.svg#{geticon(r[1])}"></use></svg
							>
                            {/if}
							<span class="text-{geticoncolor(r[1])}"><small>{r[1]}</small></span>
						</span>
					</td>
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
