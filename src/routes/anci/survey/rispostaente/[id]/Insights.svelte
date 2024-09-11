<script>
	// @ts-nocheck

	import moment from 'moment/min/moment-with-locales';
	moment.locale('it');
	export let s;
</script>

{#if s.insights.info && s.insights.info.length > 0}
	<div class="my-4">
		<p class="text-success text-center">
			<svg class="icon icon-success"><use href="/svg/sprites.svg#it-check-circle"></use></svg><b>
				Info
			</b>
		</p>
		{#each s.insights.info as i}
			<div class="callout success callout-highlight my-2 complementary-3-bg-a2 rounded px-4 py-2">
				{i.testo}
			</div>
		{/each}
	</div>
{/if}
{#if s.insights.alert && s.insights.alert.length > 0}
	<div class="my-4">
		<p class="text-danger text-center">
			<svg class="icon icon-danger"><use href="/svg/sprites.svg#it-error"></use></svg><b> Alert </b>
		</p>
		{#each s.insights.alert as i}
			<div class="callout danger callout-highlight my-2 complementary-1-bg-a3 rounded px-4 py-2">
				{i.testo}
				{#if i.testi && i.testi.length > 0}
					<ul>
						{#each i.testi as t}
							<li>{t}</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/each}
	</div>
{/if}
{#if s.insights.warning && s.insights.warning.length > 0}
	<div class="my-4">
		<p class="text-warning text-center">
			<svg class="icon icon-warning"><use href="/svg/sprites.svg#it-warning-circle"></use></svg><b>
				Warning
			</b>
		</p>
		{#each s.insights.warning as i}
			<div class="callout warning callout-highlight my-2 complementary-2-bg-a1 rounded px-4 py-2">
				{i.testo}
				{#if i.testi && i.testi.length > 0}
					<ul>
						{#each i.testi as t}
							<li>{t}</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/each}
	</div>
{/if}

<style>
	li {
		font-size: 0.9rem;
	}
</style>
