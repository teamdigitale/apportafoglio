<script>
    import Recorddetailrow from "./recorddetailrow.svelte";
    import moment from "moment/min/moment-with-locales";
    moment.locale("it");

    export let record;

    const close = () => {
        record = null;
    };

    function euro(v) {
        return Intl.NumberFormat("it-IT", {
            style: "currency",
            currency: "EUR",
        }).format(v);
    }
</script>

{#if record}
    <div class="card has-background-grey-lighter my-2">
        <div class="card-header has-background-info">
            <button class="button is-small is-info is-full" on:click={close}
                ><span class="icon is-small"
                    ><i class="fas fa-times-circle" /></span
                ></button
            >
        </div>
        <div class="card-content">
            <p class="title">
                {record.ente}
            </p>
            <p class="subtitle">{record.regione} - {record.provincia}</p>
            <Recorddetailrow label="Tipologia ente" value={record.tipologia_ente} />
            <Recorddetailrow label="Regione" value={record.regione} />
            <Recorddetailrow label="Provincia" value={record.provincia} />
            <Recorddetailrow label="Comune" value={record.comune} />
            <Recorddetailrow label="Avviso" value={record.avviso.titolo} />
            <Recorddetailrow label="Finestra" value={record.numero_finestra_temporale} />
            
            <Recorddetailrow label="CUP" value={record.codice_cup} />
            <Recorddetailrow label="Data invio" value={moment(record.data_invio_candidatura).format("DD/MM/YYYY")} />
            <Recorddetailrow label="Data finanziamento" value={moment(record.data_finanziamento,"YYYY/MM/DD").format("DD/MM/YYYY")} />
            <Recorddetailrow label="Decreto finanziamento" value={record.decreto_finanziamento} />
            <Recorddetailrow label="Stato finanziamento" value={record.stato_candidatura==='A'?'Assegnato':record.stato_candidatura==='E'?'Erogato':'Rinunciato'} />
            <Recorddetailrow label="Ultimo aggiornamento" value={moment(record.data_stato_candidatura,"YYYY/MM/DD").format("DD/MM/YYYY")} />
            <Recorddetailrow label="Importo finanziamento" value={euro(record.importo_finanziamento)} />
            
            
        </div>
    </div>
{/if}
