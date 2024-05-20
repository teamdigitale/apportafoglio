<script>
	export let data;
	import Linkcard from '$lib/c/linkcard.svelte';
	$: loggedstandard = data.loggedstandard;

</script>

<div class="container">
	<div class="row">
		<div class="col-12 col-lg-6 my-4">
			<Linkcard
				altimg="open data"
				img="/img/opendata.jpg"
				link="/opendata"
				linktext="Fammi vedere"
				text="Consulta gli Open Data liberamente"
				title="Open Data"
			/>
		</div>
		<div class="col-12 col-lg-6 my-4">
			<Linkcard
				altimg="portafoglio"
				img="/img/buildings.jpg"
				link="/users"
				linktext="{loggedstandard?'Area riservata':'Voglio accedere'}"
				text="Consulta i dati con le tue credenziali"
				title="Area riservata"
			/>
		</div>
		<!--
        <div class="col-12 col-lg-6 my-4">
			<Linkcard
				altimg="moniotraggio"
				img="/img/monitor.jpg"
				link="/monitoraggio"
				linktext="Voglio accedere"
				text="Verifica gli andamenti"
				title="Monitoraggio"
			/>
		</div>
		-->
	</div>
</div>
