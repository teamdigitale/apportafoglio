// @ts-nocheck
import jsforce from 'jsforce';

import { redirect } from '@sveltejs/kit';
import { promiseQuery } from '$lib';

const MAX_FETCH = 1000000;

export async function load({ locals, params }) {
    const connstandard = locals.user.connectionStandard;
    const connasseveratore = locals.user.connectionAsseveratore;

    let idente = params.id;
    let connection = connstandard ? connstandard : connasseveratore;

    if (connection) {
        let conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connection
        });
        const qente = promiseQuery(conn, `select Id, Name, Website, PEC__c, Phone, ShippingStreet, Stato_giuridico__c, Area_geografica__c, Regione__c, ShippingState, ShippingCity, Tipologia_Ente__c, Account_Manager__r.Name, Tech_Implementation_User__r.Name, Account_Manager__r.Id, Tech_Implementation_User__r.Id,Account_Manager__r.FullPhotoUrl, Tech_Implementation_User__r.FullPhotoUrl,Asseveratore_1_2_Multimisura_1_1__r.Name, Asseveratore_1_2_Multimisura_1_1__r.FullPhotoUrl, Asseveratore_1_4_1__r.Name, Asseveratore_1_4_1__r.FullPhotoUrl, Asseveratore_misure_automatiche__r.Name, Asseveratore_misure_automatiche__r.FullPhotoUrl,
            (SELECT Ente_destinazione__c, Motivazione_variazione__c  FROM Account.Registri_eventi_enti__r),
            (SELECT Ente_destinazione__c, Motivazione_variazione__c  FROM Account.Registri_eventi_enti1__r)
            from Account where Id = '`+ idente + `'`, MAX_FETCH);
        const qreferenti = promiseQuery(conn, `select Id, LastName, FirstName, MiddleName, Name, MobilePhone, Email, LastActivityDate, FiscalCode__c, Profilo__c, Stato__c from contact where accountid  = '` + idente + `'`, MAX_FETCH);
        const qcandidature = promiseQuery(conn, `select Id, outfunds__FundingProgram__r.Pacchetto__c, outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name, outfunds__Awarded_Amount__c, Awarded_Amount_Padre_1__c, Awarded_Amount_Padre_2__c, Codice_CUP__c, outfunds__Status__c, Stato_Progetto__c,  Data_Finanziamento__c, Data_Ricezione_CUP__c, Data_invio_candidatura__c, Data_conclusione__c, Data_avanzamento_in_Liquidato__c, Data_Contrattualizzazione__c, Data_avanzamento_step_5__c, Data_completamento_attivit__c,  Data_avanzamento_in_Liquidazione__c, Data_Revoca_Decretata__c, Data_Rinuncia__c,  Data_asseverazione_tecnica__c, Data_comunicazione_revoca__c, Data_decreto_rinuncia__c, Data_ultimo_esito_controlli_formali__c, Data_ultimo_esito_asseverazione_tecnica__c   from outfunds__Funding_Request__c where Data_invio_candidatura__c!=null and outfunds__Applying_Organization__r.Id = '` + idente + `'`, MAX_FETCH);
        const qscadenze = promiseQuery(conn, `select 
        outfunds__Funding_Request__r.Id, 
        outfunds__Funding_Request__r.outfunds__Status__c, 
        outfunds__Funding_Request__r.outfunds__FundingProgram__r.Pacchetto__c, 
        outfunds__Funding_Request__r.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name, 
        RecordType.Name,
        Id, Name, CreatedDate, LastModifiedDate, outfunds__Due_Date__c, outfunds__Funding_Request__c, outfunds__Requirements__c, outfunds__Status__c, Id_Comunicazione__c, Is_Comunicazione__c,  Urgenza__c, Oggetto__c, Regione__c, Estensione_cronoprogramma_automatica__c  
        from outfunds__Requirement__c
        where 
        outfunds__Due_Date__c != null
        and RecordType.Name in ('Inserimento CUP','Completamento Attività','Contrattualizzazione Fornitore')
        and RecordType.SobjectType = 'outfunds__Requirement__c' 
        and outfunds__Funding_Request__r.outfunds__Status__c IN ('AMMESSA','ACCETTATA','FINANZIATA')
        and outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Id = '`+ idente + `'
        order by outfunds__Status__c asc, outfunds__Due_Date__c desc`, MAX_FETCH);
        const qservizi = promiseQuery(conn, `select Id, Descrizione_Servizio__c,  Piattaforma_Servizi__c, Data_Attivazione__c,Ente__c  from Servizio_Attivo__c where IsDeleted_pagoPA__c = false and Ente__c = '` + idente + `'`, MAX_FETCH);

        const all = Promise.all([qente, qreferenti, qcandidature, qscadenze, qservizi]);
        const values = await all;

        values[2].forEach(e => {
            if (e.outfunds__FundingProgram__r.Pacchetto__c && e.outfunds__FundingProgram__r.Pacchetto__c !== '') {
                e.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = e.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name + ' - ' + e.outfunds__FundingProgram__r.Pacchetto__c;
            }
        });

        values[3].forEach(e => {
            if (e.outfunds__Funding_Request__r.outfunds__FundingProgram__r.Pacchetto__c && e.outfunds__Funding_Request__r.outfunds__FundingProgram__r.Pacchetto__c !== '') {
                e.outfunds__Funding_Request__r.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = e.outfunds__Funding_Request__r.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name + ' - ' + e.outfunds__Funding_Request__r.outfunds__FundingProgram__r.Pacchetto__c;
            }
        });

        const misure = await promiseQuery(conn, `select count(Avviso__r.outfunds__Parent_Funding_Program__r.Id),Avviso__r.outfunds__Parent_Funding_Program__r.Name,Avviso__r.Pacchetto__c  from Dettaglio_Cronoprogramma__c where Cluster__r.Tipologia_Ente__c = '` + values[0][0].Tipologia_Ente__c + `' AND Avviso__r.outfunds__Parent_Funding_Program__r.Name != NULL group by Avviso__r.outfunds__Parent_Funding_Program__r.Name,Avviso__r.Pacchetto__c order by Avviso__r.outfunds__Parent_Funding_Program__r.Name,Avviso__r.Pacchetto__c`, MAX_FETCH);

        misure.forEach(e => {
            if (e.Pacchetto__c && e.Pacchetto__c !== '') {
                e.Name = e.Name + ' - ' + e.Pacchetto__c;
            }
        });

        let relazioni = { destinazioni: [], origini: [] };

        if (values[0][0].Registri_eventi_enti__r && values[0][0].Registri_eventi_enti__r.records && values[0][0].Registri_eventi_enti__r.records.length > 0) {
            const id = values[0][0].Registri_eventi_enti__r.records.map(e => e.Ente_destinazione__c).join("','")
            if (id.length > 0) {
                const destinazioniQuery = await promiseQuery(conn, `select Id, Name from Account where Id in ('` + values[0][0].Registri_eventi_enti__r.records.map(e => e.Ente_destinazione__c).join("','") + `')`, MAX_FETCH);
                const valuesQuery = await Promise.all(destinazioniQuery);
                relazioni.destinazioni = valuesQuery.map(e => { return { 'id': e.Id, 'name': e.Name, 'motivazione': values[0][0].Registri_eventi_enti__r.records.find((r) => r.Ente_destinazione__c === e.Id).Motivazione_variazione__c } })
            }
        }

        if (values[0][0].Registri_eventi_enti1__r && values[0][0].Registri_eventi_enti1__r.records && values[0][0].Registri_eventi_enti1__r.records.length > 0) {
            const id = values[0][0].Registri_eventi_enti1__r.records.map(e => e.Ente_destinazione__c).join("','")
            if (id.length > 0) {
                const originiQuery = await promiseQuery(conn, `select Id, Name from Account where Id in ('` + values[0][0].Registri_eventi_enti1__r.records.map(e => e.Ente_destinazione__c).join("','") + `')`, MAX_FETCH);
                const valuesQuery = await Promise.all(originiQuery);
                relazioni.origini = valuesQuery.map(e => { return { 'id': e.Id, 'name': e.Name, 'motivazione': values[0][0].Registri_eventi_enti1__r.records.find((r) => r.Ente_destinazione__c === e.Id).Motivazione_variazione__c } })
            }
        }

        return {
            ente: values[0][0],
            referenti: values[1],
            candidature: values[2],
            scadenze: values[3],
            servizi: values[4],
            misure: misure,
            relazioni: relazioni
        };
    } else {
        throw redirect(303, '/users');
    }
}