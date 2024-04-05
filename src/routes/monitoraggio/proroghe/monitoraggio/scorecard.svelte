<script>
	export let title = '';
	export let text = '';
	export let textcolor = '';
	export let bgcolor = '';
</script>

<div class="card-wrapper py-0">
	<div class="card no-after shadow rounded bg-{bgcolor}">
		<div class="card-body py-2">
			<h6 class="card-title h6 text-{textcolor} text-center">{title}</h6>
			<p class="card-text text-{textcolor} text-center">{text}</p>
		</div>
	</div>
</div>
