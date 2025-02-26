import { promiseQuery } from '$lib';
import { redirect } from '@sveltejs/kit';
import jsforce from 'jsforce';

const MAX_FETCH = 1000000;

export async function load({ locals }) {
    const connstandard = locals.user.connectionStandard;
    const connasseveratore = locals.user.connectionAsseveratore;
    let enti = [];
    if (connstandard || connasseveratore) {
        if (connstandard) {
            const conn = new jsforce.Connection({
                instanceUrl: "https://padigitale2026.my.salesforce.com",
                accessToken: connstandard
            });
            const soql = "Select Id, IsDeleted, Name, ShippingStreet, ShippingCity, ShippingState, Website, Description, OwnerId, LastActivityDate, Codice_amministrativo__c, Active__c, Area_geografica__c, Codice_Fiscale_RL__c, Cognome_responsabile__c, Data_Nascita_RL__c, Esistenza_candidature__c,  Nome_responsabile__c,  PEC__c, Regione__c, Tech_Implementation_User__c, Titolo_responsabile__c, Tipologia_Ente__c, Integrato_Cie__c, Integrato_Spid__c, Data_Esercizio_CIE__c, Data_Esercizio_SPID__c, Integrato_CIE_Fondo_Innovazione__c, Integrato_SPID_Fondo_Innovazione__c, Protocollo_CIE__c, Account_Manager__c, Account_Manager__r.Name, Protocollo_SPID__c, Asseveratore__c, Operation_Assistant__c, Stato_giuridico__c from Account where IsDeleted = false and Name!='ACCOUNTSCATOLA'"
            const qenti =
                locals.user.utentestandard.vasoss ?
                    promiseQuery(conn, `${soql} order by Name`, MAX_FETCH) :
                    locals.user.utentestandard.area ?
                        promiseQuery(conn, `${soql} and Area_geografica__c = '` + locals.user.utentestandard.area + `'  order by Name`, MAX_FETCH) :
                        promiseQuery(conn, `${soql} and (Account_Manager__c in ('` + locals.user.utentestandard.viewas + `') or Tech_Implementation_User__c in ('` + locals.user.utentestandard.viewas + `'))  order by Name`, MAX_FETCH);
            const all = Promise.all([qenti]);
            const values = await all;
            let entiStandard = values[0];
            //entiStandard.forEach((ente) => ente.acm = nomeUtente(ente.Account_Manager__c));
            enti = enti.concat(entiStandard);
        }
        /*
        if (connasseveratore) {
            const conn = new jsforce.Connection({
                instanceUrl: "https://padigitale2026.my.salesforce.com",
                accessToken: connasseveratore
            });
            const qenti = promiseQuery(conn, `Select Id, IsDeleted, Name, ShippingStreet, ShippingCity, ShippingState,  Website, Description, OwnerId, LastActivityDate, Codice_amministrativo__c, Active__c, Area_geografica__c, Codice_Fiscale_RL__c, Cognome_responsabile__c, Data_Nascita_RL__c, Esistenza_candidature__c,  Nome_responsabile__c,  PEC__c, Regione__c, Tech_Implementation_User__c, Titolo_responsabile__c, Tipologia_Ente__c, Integrato_Cie__c, Integrato_Spid__c, Data_Esercizio_CIE__c, Data_Esercizio_SPID__c, Integrato_CIE_Fondo_Innovazione__c, Integrato_SPID_Fondo_Innovazione__c, Protocollo_CIE__c, Account_Manager__c, Protocollo_SPID__c, Asseveratore__c, Operation_Assistant__c from Account where IsDeleted = false and (Asseveratore__c  ='`+locals.user.utenteasseveratore.idsf+`' or Asseveratore_1_2_Multimisura_1_1__c ='`+locals.user.utenteasseveratore.idsf+`' or Asseveratore_1_4_1__c ='`+locals.user.utenteasseveratore.idsf+`' or Asseveratore_misure_automatiche__c = '`+locals.user.utenteasseveratore.idsf+`') and Name!='ACCOUNTSCATOLA' order by Name`, MAX_FETCH);
            const all = Promise.all([qenti]);
            const values = await all;
            let entiAsseveratore = values[0];
            entiAsseveratore.forEach((ente) => ente.portafoglio = 'Asseveratore');
            enti = enti.concat(entiAsseveratore);
        }
        */
        return {
            enti: enti
        };
    } else {
        throw redirect(303, '/users');
    }
}

