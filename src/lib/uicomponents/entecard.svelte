<script>
	export let ente;
	export let categoria;
	export let comune;
	let activetab = 'info';
	const setActiveTab = (/** @type {string} */ name) => {
		activetab = name;
	};

</script>

<div class="card has-background-grey-lighter bm--card-equal-height" id={'card-' + ente.Codice_IPA}>
	<header class="card-header has-background-primary">
		<p class="card-header-title">Codice IPA: {ente.Codice_IPA}</p>
	</header>
	<div class="card-content">
		<div class="tabs is-small is-full-width">
			<ul>
				<li class={activetab === 'info' ? 'is-active' : ''}>
					<a href="#nan" on:click={() => setActiveTab('info')} role="button">Info</a>
				</li>
				<li class={activetab === 'responsabile' ? 'is-active' : ''}>
					<a href="#nan" on:click={() => setActiveTab('responsabile')} role="button">Responsabile</a
					>
				</li>
				<li class={activetab === 'indirizzo' ? 'is-active' : ''}>
					<a href="#nan" on:click={() => setActiveTab('indirizzo')} role="button">Indirizzo</a>
				</li>
			</ul>
		</div>
		<div class="content">
			{#if activetab === 'info'}
				<p class="title">{ente.Denominazione_ente}</p>
				<p class="subtitle">{categoria}</p>
				{#if ente.Mail1}
					<p><span class="has-text-weight-bold">PEC:&nbsp;</span>{ente.Mail1}</p>
				{/if}
				{#if ente.Mail2}
					<p><span class="has-text-weight-bold">email:&nbsp;</span>{ente.Mail2}</p>
				{/if}
				{#if ente.Mail3}
					<p><span class="has-text-weight-bold">email:&nbsp;</span>{ente.Mail3}</p>
				{/if}
				{#if ente.Sito_istituzionale}
					<p><span class="has-text-weight-bold">Sito:&nbsp;</span>{ente.Sito_istituzionale}</p>
				{/if}
			{/if}
			{#if activetab === 'responsabile'}
				<p class="title">{ente.Nome_responsabile}&nbsp;{ente.Cognome_responsabile}</p>
				<p class="subtitle">{ente.Titolo_responsabile}</p>
			{/if}
			{#if activetab === 'indirizzo'}
				{#if comune && comune[0]}
					<p>
						<span class="has-text-weight-bold">Ripartizione geografica ISTAT:&nbsp;</span>{comune[0][
							'Ripartizione geografica'
						]}
					</p>

					<p>
						<span class="has-text-weight-bold">Regione:&nbsp;</span>{comune[0][
							'Denominazione Regione'
						]}
					</p>
					<p>
						<span class="has-text-weight-bold">Comune:&nbsp;</span>{comune[0][
							'Denominazione (Italiana e straniera)'
						]}
					</p>
				{/if}

				<p><span class="has-text-weight-bold">Indirizzo:&nbsp;</span>{ente.Indirizzo}</p>
				<p><span class="has-text-weight-bold">CAP:&nbsp;</span>{ente.CAP}</p>
			{/if}
		</div>
	</div>
</div>

<style>
	.bm--card-equal-height {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.tabs ul {
		flex-shrink: 1;
		flex-wrap: wrap;
		border-bottom-color: transparent;
	}
</style>
