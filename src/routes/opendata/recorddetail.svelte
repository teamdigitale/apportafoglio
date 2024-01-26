<script>
	import { euro } from '$lib/js/shared';
	import moment from 'moment/min/moment-with-locales';
	moment.locale('it');
	export let record;
</script>

<p class="h3">
	{record.ente}
</p>

<dl class="row">
	<dt class="col-sm-3">Tipologia ente</dt>
	<dd class="col-sm-9">{record.tipologia_ente}</dd>
	<dt class="col-sm-3">Regione</dt>
	<dd class="col-sm-9">{record.regione}</dd>
	<dt class="col-sm-3">Provincia</dt>
	<dd class="col-sm-9">{record.provincia}</dd>
	<dt class="col-sm-3">Comune</dt>
	<dd class="col-sm-9">{record.comune}</dd>
	<dt class="col-sm-3">Avviso</dt>
	<dd class="col-sm-9">{record.avviso.titolo}</dd>
	<dt class="col-sm-3">Finestra</dt>
	<dd class="col-sm-9">{record.numero_finestra_temporale}</dd>
	<dt class="col-sm-3">CUP</dt>
	<dd class="col-sm-9">{record.codice_cup}</dd>
	<dt class="col-sm-3">Data invio</dt>
	<dd class="col-sm-9">{moment(record.data_invio_candidatura).format('DD/MM/YYYY')}</dd>
	<dt class="col-sm-3">Data finanziamento</dt>
	<dd class="col-sm-9">{moment(record.data_finanziamento, 'YYYY/MM/DD').format('DD/MM/YYYY')}</dd>
	<dt class="col-sm-3">Decreto finanziamento</dt>
	<dd class="col-sm-9">{record.decreto_finanziamento}</dd>
	<dt class="col-sm-3">Stato finanziamento</dt>
	<dd class="col-sm-9">
		{record.stato_candidatura === 'A'
			? 'Assegnato'
			: record.stato_candidatura === 'E'
				? 'Erogato'
				: 'Rinunciato'}
	</dd>
	<dt class="col-sm-3">Importo finanziamento</dt>
	<dd class="col-sm-9">{euro(record.importo_finanziamento)}</dd>
	<dt class="col-sm-3">Ultimo aggiornamento</dt>
	<dd class="col-sm-9">
		{moment(record.data_stato_candidatura, 'YYYY/MM/DD').format('DD/MM/YYYY')}
	</dd>
</dl>
