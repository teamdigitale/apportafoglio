<script>
	import { instance } from '@viz-js/viz';
	import { onMount } from 'svelte';

	export let graphdata = '';
	export let id = '';

	onMount(async () => {
		instance().then((viz) => {
			document.getElementById(id)?.appendChild(viz.renderSVGElement(graphdata));
		});
	});
</script>

<div class="row">
	<div class="col-12 col-lg-12 text-center">
		<div {id} class="ftw"></div>
	</div>
</div>
