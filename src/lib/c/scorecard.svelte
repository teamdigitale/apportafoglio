<script>
	export let title = '';
	export let text = '';
	export let textcolor = '';
	export let bgcolor = '';
</script>

<div class="card-wrapper">
	<div class="card no-after shadow rounded bg-{bgcolor}">
		<div class="card-body">
			<h3 class="card-title h4 text-{textcolor}">{title}</h3>
			<p class="card-text text-{textcolor}">{text}</p>
		</div>
	</div>
</div>
