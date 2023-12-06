import jsforce from 'jsforce';
import { getUtenteAsseveratore } from '../../../../lib/userdb.js';

const MAX_FETCH = 1000000;

export async function load({ cookies, params }) {

    let tecnici = [];
    let formali = [];
    let servizi = [];
    let fsaas = [];
    let fpaas = [];
    let fiaas = [];

    //console.log(params.idc);
    const uass = getUtenteAsseveratore(cookies);

    if (uass) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        await conn.login(uass.email, uass.password + uass.token);
        const taskTecnici = promiseQuery(conn, `select Id, Subject,Status, Priority, IsHighPriority, OwnerId, Description,  IsClosed, CreatedDate,  LastModifiedDate,   IsArchived, TaskSubtype,  Approvazione_Automatica__c, Commenti_asseveratore__c, Comunicazione__c, Data_fine_Asseverazione__c, Esito__c, Data_scadenza_Richiesta__c, Convalidato_per_silenzio_assenso__c, Data_ultima_assegnazione__c, RequirementIsFreeze__c, EnteLookup__c from task where RecordType.Name='Controlli Conformità Tecnica' and WhatId = '` + params.idc + `' order by CreatedDate desc`);
        const taskFormali = promiseQuery(conn, `select Id, Subject, Status, Priority, IsHighPriority, OwnerId,   IsClosed, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, IsArchived,  TaskSubtype,  Requirement__c, Avviso__c, Ente__c, Fase_Cronoprogramma__c, Commenti_aUdM__c, Commenti_asseveratore__c, Comunicazione__c, Data_fine_Asseverazione__c, Esito__c, Data_scadenza_Richiesta__c, Convalidato_per_silenzio_assenso__c, Esito_convalida_PDM__c, Piano_di_migrazione__c, Data_ultima_assegnazione__c, Checklist__c, Data_inizio_Asseverazione__c, Stato_lavorazione__c, RequirementIsFreeze__c, EnteLookup__c,  Data_esito__c, Invio_PEC__c, Visionata__c, In_Aggiornamento__c, Funding_Request__c, CL_controllo_formale__c, CUP__c, Decreto_di_finanziamento__c, Importo__c, Numero_Richiesta_di_Pagamento__c, Esito_controllo_1_livello__c, Esito_controllo_2_livello__c, Note_controllo_1_lv__c, Note_controllo_2_lv__c, CodaLV1_Formale__c  from task where RecordType.Name='Controlli Asseverazione Formale' and WhatId = '` + params.idc + `' order by CreatedDate desc`);
        const serviziRichiesta = promiseQuery(conn,`select Id, IsDeleted, Name, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, Candidatura__c, Codice_Servizio__c, Destinazione__c, Modalita_di_Migrazione__c, Selezionato__c, Servizio__c, Stato_Attivit__c, CPU__c, Data_Attivazione_CSP__c, Data_Inizio_Migrazione__c, Data_Rilascio_esercizio__c, Data_di_Integrazione__c, Data_di_completamento__c, Integrazione_OpenId__c, Memoria__c, Nome_Applicativo__c, Numero_utenti__c, Spazio_complessivo__c, Stato_formazione__c, Stato_scheda_Valutazione__c, Data_attivazione_servizio__c, Descrizione_controlli__c, Esito_controlli__c, Descrizione_API__c, Nome_API__c, Esito_Classificazione__c, hasPDM__c, Aggiunto_in_modifica__c, Da_eliminare__c, Istanza_di_modifica__c, Selezionato_in_modifica__c, Numero_elementi__c, Attivazione_in_produzione__c, Attivazione_in_produzione_motivazione__c, Cambio_modalit_migrazione__c, Completezza_della_migrazione_dei_dati__c, Completezza_migrazione_dati_motivazione__c, Destinazione_Cloud__c, Identificativi_univoci_delle_componenti__c, Indirizzi_IP__c, Sistema_di_origine__c, Software_migrati_e_loro_caratteristiche__c, Soluzione_PaaS_adottata__c, Soluzione_SaaS_adottata__c, Visibilit_del_servizio__c, hasDocumenti__c, hasFornitori__c, Data_chiamata_api_costo_notifica__c, Data_creazione_notifica__c, Gestionale_interno_ente__c, Notifica_integrata_via_API__c, Aggiunto_Istanza_di_modifica__c, argomento_attribuito_143appIO__c, nome_servizio_attribuito_143appIO__c, codice_catalogo_attribuito_143appIO__c, Servizio__r.Obsoleto__c  from Servizio_Richiesta__c where Candidatura__c  = '`+params.idc+`'  and Selezionato__c = true order by Name asc`);
        const fornitoriSaaS = promiseQuery(conn,`select RecordType.Name, Id, Servizio__c, URL_Fornitore__c from outfunds__Review__c where outfunds__FundingRequest__c = '`+params.idc+`' and RecordType.Name = 'Fornitore SaaS'`);
        const fornitoriPaaS = promiseQuery(conn,`select RecordType.Name, Id, Servizio__c, URL_Fornitore__c from outfunds__Review__c where outfunds__FundingRequest__c = '`+params.idc+`' and RecordType.Name = 'Fornitore PaaS'`);
        const fornitoriIaaS = promiseQuery(conn,`select RecordType.Name, Id, Servizio__c, URL_Fornitore__c from outfunds__Review__c where outfunds__FundingRequest__c = '`+params.idc+`' and RecordType.Name = 'Fornitore IaaS'`);
        //
        const all = Promise.all([taskTecnici, taskFormali,serviziRichiesta,fornitoriSaaS,fornitoriPaaS,fornitoriIaaS]);
        const values = await all;
        tecnici = values[0];
        formali = values[1];
        servizi = values[2];
        fsaas = values[3];
        fpaas = values[4];
        fiaas = values[5];
        //await conn.logout();

    } else {
        throw redirect(303, '/io');
    }

    return {
        tecnici: tecnici,
        formali: formali,
        servizi: servizi,
        fornitoriSaaS: fsaas,
        fornitoriPaaS: fpaas,
        fornitoriIaaS: fiaas
    };
}

const promiseQuery = (conn, q) => {
    return new Promise((resolve, reject) => {
        const records = [];
        conn.query(q)
            .on("record", function (record) {
                records.push(record);
            })
            .on("end", function () {
                resolve(records);
            })
            .on("error", function (err) {
                console.error(err);
                reject([]);
            })
            .run({ autoFetch: true, maxFetch: MAX_FETCH });
    });
}
