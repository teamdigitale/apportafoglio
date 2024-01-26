<script>
	import moment from 'moment/min/moment-with-locales';
	moment.locale('it');
	import Gauge from '$lib/c/charts/gauge.svelte';
	import { formatNumber } from '$lib/js/shared';

	export let target;
	export let values;
	export let platea;

	let totale = values.reduce((a, { c }) => (a = parseInt(a) + parseInt(c)), 0);
	let entiInPlatea = platea.reduce((a, { c }) => (a = parseInt(a) + parseInt(c)), 0);
</script>

<div class="it-page-section my-5" id="target1_2">
	<div class="row">
		<div class="col-12 col-lg-12">
			<h6>{target.misura}: {target.trimestre}</h6>
		</div>
		<div class="col-12 col-lg-3">
			<Gauge
				id="contr-{target.id}"
				values={[
					['Label', 'Value'],
					['', Math.round((Math.round((totale / entiInPlatea) * 100) / target.valore_obiettivo) * 100)]
				]}
				label={target.misura}
			/>
		</div>
		<div class="col-12 col-lg-9">
		<div>
			<p>Data di scadenza: <strong>{moment(target.data, 'YYYY-MM-DD').format('DD/MM/YYYY')}</strong></p>
			<p>Valore obiettivo: <strong>{formatNumber(target.valore_obiettivo)}%</strong></p>
			<p>Platea: <strong>{formatNumber(entiInPlatea)}</strong></p>
			<p>Valore assoluto alla data: <strong>{formatNumber(totale)}</strong></p>
			<p>Valore % alla data: <strong>{Math.round((totale / entiInPlatea) * 100)}%</strong></p>
		</div>
		</div>
	</div>
</div>
