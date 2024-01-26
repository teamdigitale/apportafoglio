<script>
	export let title = '';
	export let text = '';
	export let img = '';
	export let altimg = '';
	export let link = '';
	export let linktext = '';
</script>

<div class="card-wrapper">
	<div class="card card-img no-after rounded shadow">
		<div class="img-responsive-wrapper">
			<div class="img-responsive img-responsive-panoramic">
				<figure class="img-wrapper">
					<img src={img} title={altimg} alt={altimg} />
				</figure>
			</div>
		</div>
		<div class="card-body">
			<h3 class="card-title">{title}</h3>
            <p class="card-text">{text}</p>
			<div class="it-card-footer">
				<a class="btn btn-primary btn-sm" href={link}>{linktext}</a>
			</div>
		</div>
	</div>
</div>
