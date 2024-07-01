<script>
	import Cite from '$lib/c/cite.svelte';
	import Pagination from '$lib/c/pagination.svelte';
    import moment from 'moment/min/moment-with-locales';
	moment.locale('it');

	
	export let data;
    let statiOptions = ['Tutti'].concat(
		Object.values(
			data.richieste.reduce((a, { Status }) => {
				a[Status] = a[Status] || {
					Status,
					count: 0
				};
				a[Status].count++;
				return a;
			}, Object.create(null))
		)
			.map((x) => x.Status)
			.sort()
	);
	let filterStati = statiOptions[0];

	$: richieste = data.richieste
    .filter(c => filterStati==='Tutti'?true:c.Status===filterStati)
    .sort((a,b) => {return new Date(a.Data_richiesta__c)-new Date(b.Data_richiesta__c)});
	let cperpage;
    let cp = 0;
	

	
</script>

<div class="container my-4">
	<h1>Richieste proroghe completamento attività</h1>
	<Cite
		text="Un uomo non può essere a suo agio senza la sua propria approvazione."
		author="Mark Twain"
	/>

	<div class="row">
		<!--
        <div class="col-12 col-lg-3 my-4">
			<div class="select-wrapper">
				<label for="filterMisura">Misure</label>
				<select id="filterMisura" name="filterMisura" bind:value={filterMisura}>
					{#each misureOptions as m}
						<option value={m}>{m}</option>
					{/each}
				</select>
			</div>
		</div>
		-->
        <div class="form-check col-4 col-lg-4">
            <div class="select-wrapper">
                <label for="filterStato">Stato</label>
                <select id="filterStato" name="filterStato" bind:value={filterStati}>
                    {#each statiOptions as te}
                        <option value={te}>{te}</option>
                    {/each}
                </select>
            </div>
            <!--
            <div class="toggles">
                <label for="soloDaValutare">
                    Mostra solo richieste da valutare
                    <input
                        type="checkbox"
                        id="soloDaValutare"
                        bind:checked={soloDaValutare}
                    />
                    <span class="lever"></span>
                </label>
            </div>
            -->
        </div>
	</div>

	
</div>

	<div class="container my-4">
		<div class="table-responsive">
			<table class="table table-hover table-sm caption-top align-middle">
				<caption>Richieste di proroghe di completamento attività in base ai filtri impostati</caption>
				<thead>
					<tr>
						<th>Data richiesta</th>
						<th>Ente</th>
						<th>Avviso</th>
						<th>Giorni richiesti</th>
						<th>Motivazione</th>
                        <th>Stato</th>
                        <th></th>
					</tr>
				</thead>
				<tbody>
					{#if cperpage}
						{#each cperpage as c}
							<tr>
								<td><small>{moment(c.Data_richiesta__c, 'YYYY-MM-DD').format('DD/MM/YYYY')}</small></td>
								<td><small>{c.EnteLookup__r.Name}</small></td>
								<td><small>{c.outfunds__FundingProgram__r.Name}</small></td>
								<td><small>{c.Giorni_richiesti__c}</small></td>
								<td><small>{c.Description}</small></td>
                                <td><small>{c.Status}</small></td>
                                <td>
                                    <a class="read-more" href="https://padigitale2026.lightning.force.com/lightning/r/Task/{c.Id}/view" target="_blank">
                                        <span class="text">SF</span>
                                        <svg class="icon"><use href="/svg/sprites.svg#it-external-link"></use></svg>
                                      </a>
                                </td>
							</tr>
						{/each}
					{/if}
				</tbody>
				<tfoot>
					<tr>
						<th colspan="8"><Pagination rows={richieste} bind:cp={cp} perPage={10} bind:trimmedRows={cperpage} /></th>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>

