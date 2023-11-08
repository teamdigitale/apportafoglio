<script>
    export let rows;
    export let perPage;
    export let trimmedRows;

    $: totalRows = rows.length;
    $: currentPage = 0;
    $: totalPages = Math.ceil(totalRows / perPage);
    $: start = currentPage * perPage;
    $: end =
        currentPage === totalPages - 1 ? totalRows - 1 : start + perPage - 1;

    $: trimmedRows = rows.slice(start, end + 1);

    $: totalRows, (currentPage = 0);
    $: currentPage, start, end;
</script>

{#if totalRows && totalRows > perPage}
    <!-- svelte-ignore a11y-no-redundant-roles -->
    <nav
        class="pagination is-centered my-3"
        role="navigation"
        aria-label="pagination"
    >
        <ul class="pagination-list">
            <li>
                <button
                    class="mx-3 button is-info"
                    on:click={() => (currentPage -= 1)}
                    disabled={currentPage === 0 ? true : false}
                    >precedenti</button
                >
            </li>
            <li><span>stai visualizzando da {start + 1} a {end + 1} su un totale di {totalRows}</span></li>
            <li>
                <button
                    class="mx-3 button is-info"
                    on:click={() => (currentPage += 1)}
                    disabled={currentPage === totalPages - 1 ? true : false}
                    >successive</button
                >
            </li>
        </ul>
    </nav>
{/if}

<style>



</style>
