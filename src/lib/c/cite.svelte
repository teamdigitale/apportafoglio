<script>
	export let text = '';
	export let author = '';
</script>

<blockquote class="blockquote  blockquote-card text-end">
	<p class="mb-0 mt-0">{text}</p>
	<footer class="blockquote-footer">
		<cite title={author}>{author}</cite>
	</footer>
</blockquote>