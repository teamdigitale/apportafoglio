<script>
	// @ts-nocheck

	export let misura;
	import { euro } from '$lib/js/shared';
	import moment from 'moment/min/moment-with-locales';
	moment.locale('it');

	let isHovered = false;
</script>

<div class="row fullheight">
	<div class="col-12 col-lg-12">
		<!--start card-->

		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class:neutral-2-bg-a1={isHovered}
			on:focus={() => (isHovered = true)}
			on:blur={() => (isHovered = false)}
			on:mouseover={() => (isHovered = true)}
			on:mouseout={() => (isHovered = false)}
			class="callout callout-highlight primary fullheight shadow py-4 px-2"
		>
			<div class="clearfix">
				<div class="categoryicon-top float-start">
					<span class="text text-primary">
						<strong>{misura.Name}</strong>
					</span>
				</div>
			</div>
			<hr/>
			<div>
				<dl class="row">
					{#each misura.conteggioFornitori.filter((x, index) => index < 3) as cf}
						<dt class="col-sm-4"><small>{cf.nome}</small></dt>
						<dd class="col-sm-8">
							<small>
								{cf.count} candidature
							</small>
						</dd>
					{/each}
				</dl>
			</div>
            <hr/>
			<div>
				<dl class="row">
					{#each misura.valoreFornitori.filter((x, index) => index < 3) as vf}
						<dt class="col-sm-4"><small>{vf.nome}</small></dt>
						<dd class="col-sm-8">
							<small>
								{euro(vf.value)}
							</small>
						</dd>
					{/each}
				</dl>
			</div>
		</div>

		<!--end card-->
	</div>
</div>

<style>
	.fullheight {
		min-height: 100%;
		height: 100%;
	}
</style>
