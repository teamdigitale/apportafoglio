<script>
	import { goto } from '$app/navigation';
    import Header from '$lib/c/ui/header.svelte';
	/** @type {import('./$types').PageData} */
	export let data;

	export let keyword = data.keyword;

	const search = () => {
		goto('/entiipa/' + keyword);
	};
</script>

<Header
    title="IPA"
    quote="Dove un superiore pubblico interesse non imponga un momentaneo segreto, la casa dell’amministrazione dovrebbe essere di vetro"
    author="F. Turati"
/>

<section class="hero is-small is-primary is-12">
	<div class="hero-body m-1 p-1">
		<nav class="level">
			<!-- Left side -->
			<div class="level-left">
				<div class="level-item">
					<span class="icon is-small is-left">
						<i class="fas fa-filter" />
					</span>
					<span>filtri</span>
					<span class="icon is-small is-left mx-3">
						<i class="fas fa-arrow-right" />
					</span>
				</div>
				<div class="level-item">
					<div class="field">
						<div class="control">
							<input
								class="input is-primary"
								type="text"
								placeholder="nparola chiave"
								bind:value={keyword}
							/>
						</div>
					</div>
				</div>
				<div class="level-item">
					<div class="field">
						<div class="control">
							<button class="button" on:click={search}>cerca</button>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</div>
</section>

<slot />
