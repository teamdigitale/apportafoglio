<script>
	export let rows;
	export let perPage;
	export let trimmedRows;
    export let cp;

	$: totalRows = rows.length;
	$: currentPage = cp;
	$: totalPages = Math.ceil(totalRows / perPage);
	$: start = currentPage * perPage;
	$: end = currentPage === totalPages - 1 ? totalRows - 1 : start + perPage - 1;

	$: trimmedRows = rows.slice(start, end + 1);

    /*
	$: totalRows, (currentPage = 0);
	$: currentPage, start, end;
    */
</script>

{#if totalRows && totalRows > perPage}
<nav
		class="pagination-wrapper justify-content-center pagination-total"
		aria-label="Esempio di navigazione simple mode"
	>
		<ul class="pagination">
			<li class="page-item disabled">
				<button
					class="btn btn-xs btn-icon"
					on:click={() => {currentPage -= 1; cp -= 1}}
					disabled={currentPage === 0 ? true : false}
				>
					<span class="rounded-icon">
						<svg class="icon icon-secondary"><use href="/svg/sprites.svg#it-chevron-left"></use></svg
						>
					</span>
					<span>pagina precedente</span>
				</button>
			</li>
			<li class="page-item">
				<span class="page-link">{currentPage + 1}</span>
			</li>
			<li class="page-item"><span class="page-link">/</span></li>
			<li class="page-item"><span class="page-link">{totalPages}</span></li>

			<li class="page-item">
				<button
					class="btn btn-xs btn-icon"
					on:click={() => {currentPage += 1; cp+=1}}
					disabled={currentPage === totalPages - 1 ? true : false}
				>
					<span class="rounded-icon">
						<svg class="icon icon-secondary"
							><use href="/svg/sprites.svg#it-chevron-right"></use></svg
						>
					</span>
					<span>pagina successiva</span>
				</button>
			</li>
		</ul>
		<p>
			stai visualizzando gli elementi da {start + 1} a {end + 1} su un totale di {totalRows} elementi
		</p>
	</nav>
{/if}
