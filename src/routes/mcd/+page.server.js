// @ts-nocheck
import { promiseQuery } from '$lib';
import { redirect } from '@sveltejs/kit';
import jsforce from 'jsforce';
import * as d3 from 'd3';
const MAX_FETCH = 1000000;
import { UNCI } from '$env/static/private';
import { UPCI } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const connstandard = locals.user.connectionStandard;

    if (connstandard) {
        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connstandard
        });


        const qenti = 
        locals.user.utentestandard.vasoss ?
            promiseQuery(conn, `Select Id, IsDeleted, Name, ShippingStreet, ShippingCity, ShippingState,   Website, Description, OwnerId, LastActivityDate, Codice_amministrativo__c, Active__c, Area_geografica__c, Codice_Fiscale_RL__c, Cognome_responsabile__c, Data_Nascita_RL__c, Esistenza_candidature__c,  Nome_responsabile__c,  PEC__c, Regione__c, Tech_Implementation_User__c,  Tipologia_Ente__c, Integrato_Cie__c, Integrato_Spid__c, Data_Esercizio_CIE__c, Data_Esercizio_SPID__c, Integrato_CIE_Fondo_Innovazione__c, Integrato_SPID_Fondo_Innovazione__c, Protocollo_CIE__c, Account_Manager__c, Account_Manager__r.Name, Protocollo_SPID__c, Asseveratore__c, Operation_Assistant__c from Account where IsDeleted = false and Name!='ACCOUNTSCATOLA' and Tipologia_Ente__c = 'Comuni' order by Name`, MAX_FETCH) :
        locals.user.utentestandard.area ?
            promiseQuery(conn, `Select Id, IsDeleted, Name, ShippingStreet, ShippingCity, ShippingState,   Website, Description, OwnerId, LastActivityDate, Codice_amministrativo__c, Active__c, Area_geografica__c, Codice_Fiscale_RL__c, Cognome_responsabile__c, Data_Nascita_RL__c, Esistenza_candidature__c,  Nome_responsabile__c,  PEC__c, Regione__c, Tech_Implementation_User__c,  Tipologia_Ente__c, Integrato_Cie__c, Integrato_Spid__c, Data_Esercizio_CIE__c, Data_Esercizio_SPID__c, Integrato_CIE_Fondo_Innovazione__c, Integrato_SPID_Fondo_Innovazione__c, Protocollo_CIE__c, Account_Manager__c, Account_Manager__r.Name, Protocollo_SPID__c, Asseveratore__c, Operation_Assistant__c from Account where IsDeleted = false and Area_geografica__c = '` + locals.user.utentestandard.area + `'  and Name!='ACCOUNTSCATOLA' and Tipologia_Ente__c = 'Comuni' order by Name`, MAX_FETCH) :
            promiseQuery(conn, `Select Id, IsDeleted, Name, ShippingStreet, ShippingCity, ShippingState,   Website, Description, OwnerId, LastActivityDate, Codice_amministrativo__c, Active__c, Area_geografica__c, Codice_Fiscale_RL__c, Cognome_responsabile__c, Data_Nascita_RL__c, Esistenza_candidature__c,  Nome_responsabile__c,  PEC__c, Regione__c, Tech_Implementation_User__c,  Tipologia_Ente__c, Integrato_Cie__c, Integrato_Spid__c, Data_Esercizio_CIE__c, Data_Esercizio_SPID__c, Integrato_CIE_Fondo_Innovazione__c, Integrato_SPID_Fondo_Innovazione__c, Protocollo_CIE__c, Account_Manager__c, Account_Manager__r.Name, Protocollo_SPID__c, Asseveratore__c, Operation_Assistant__c from Account where IsDeleted = false and (Account_Manager__c in ('` + locals.user.utentestandard.viewas + `') or Tech_Implementation_User__c in ('` + locals.user.utentestandard.viewas + `'))  and Name!='ACCOUNTSCATOLA' and Tipologia_Ente__c = 'Comuni' order by Name`, MAX_FETCH);
        const all = Promise.all([qenti]);
        const values = await all;
        let entiStandard = values[0];


        const risposte_res = await fetch('https://rollingwords.it/dist/quest/stato_avanzamento_questionari.csv', {
            method: 'GET',
            credentials: 'same-origin',
            redirect: 'follow',
            agent: null,
            headers: {
                "Content-Type": "text/plain",
                'Authorization': 'Basic ' + btoa(UNCI+':'+UPCI),
            },
            timeout: 100000
        });
        let risposteText = await risposte_res.text();
        let risposte = d3.dsvFormat(';').parse(risposteText);
        console.log(risposte)
        const r = risposte.filter(x => entiStandard.filter(e => e.Id===x.id_ente).length>0 );

        const comuni_res = await fetch('https://rollingwords.it/dist/quest/comuni_def_2.json', {
            method: 'GET',
            credentials: 'same-origin',
            redirect: 'follow',
            agent: null,
            headers: {
                "Content-Type": "text/plain",
                'Authorization': 'Basic ' + btoa(UNCI+':'+UPCI),
            },
            timeout: 100000
        });
        let comuni = await comuni_res.json();

        ///console.log(comuni);

        return {
            r: r,
            com: comuni
        };
    } else {
        throw redirect(303, '/users');
    }
}

