<script>
	// @ts-nocheck

	import moment from 'moment/min/moment-with-locales';
	import Insights from './Insights.svelte';
	moment.locale('it');
	export let s;
</script>

<!--start card-->
<div class="card-wrapper card-space">
	<div class="card card-bg">
		<div class="card-body">
			<div class="categoryicon-top">
				<svg class="icon"><use href="/svg/sprites.svg#it-user"></use></svg>
				<span class="text text-primary"
					><b>Dati del referente per la compilazione del questionario</b></span
				>
			</div>

			<p><b>Nominativo: </b>{s.domande.find((x) => x.codice === '1.1').risposta}</p>
			<p><b>Ruolo: </b>{s.domande.find((x) => x.codice === '1.2').risposta}</p>
			<p class="align-middle">
				<b>Contatto telefonico: </b>{s.domande.find((x) => x.codice === '1.3').risposta}
			</p>
			<hr/>
			<p class="align-middle" >
				<span class="mx-2 my-0 py-0">
				<a
					class="text-success"
					target="_blank"
					href="https://wa.me/{s.domande.find((x) => x.codice === '1.3').risposta}"
					><svg class="icon icon-success"><use href="/svg/sprites.svg#it-whatsapp"></use></svg></a
				>
			</span>
			<span class="mx-2">
				<a
					class="text-primary"
					target="_blank"
					href="tel:{s.domande.find((x) => x.codice === '1.3').risposta}"
					><svg class="icon icon-primary"><use href="/svg/sprites.svg#it-telephone"></use></svg></a
				>
			</span>
			</p>
		</div>
	</div>
</div>
<!--end card-->

<style>
	.card:after {
    content: "";
    display: block;
    margin-top: 0px;
    margin-left: 0px;
}
</style>
