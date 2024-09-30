import { redirect } from '@sveltejs/kit';
import jsforce from 'jsforce';
import * as d3 from 'd3';
import moment from 'moment/min/moment-with-locales';
import { promiseQuery } from '$lib';

import { UNCI } from '$env/static/private';
import { UPCI } from '$env/static/private';

moment.locale('it');
const MAX_FETCH = 1000000;


export async function GET({ params, locals }) {

    const connection = locals.user.connectionStandard;

    if (connection) {
        let conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connection
        });
        if (conn) {

            const qenti = locals.user.utentestandard.area ?
            promiseQuery(conn, `Select Id, IsDeleted, Name, ShippingStreet, ShippingCity, ShippingState,   Website, Description, OwnerId, LastActivityDate, Codice_amministrativo__c, Active__c, Area_geografica__c, Codice_Fiscale_RL__c, Cognome_responsabile__c, Data_Nascita_RL__c, Esistenza_candidature__c,  Nome_responsabile__c,  PEC__c, Regione__c, Tech_Implementation_User__c, Titolo_responsabile__c, Tipologia_Ente__c, Integrato_Cie__c, Integrato_Spid__c, Data_Esercizio_CIE__c, Data_Esercizio_SPID__c, Integrato_CIE_Fondo_Innovazione__c, Integrato_SPID_Fondo_Innovazione__c, Protocollo_CIE__c, Account_Manager__c, Account_Manager__r.Name, Protocollo_SPID__c, Asseveratore__c, Operation_Assistant__c from Account where IsDeleted = false and Area_geografica__c = '` + locals.user.utentestandard.area + `'  and Name!='ACCOUNTSCATOLA' order by Name`, MAX_FETCH) :
            promiseQuery(conn, `Select Id, IsDeleted, Name, ShippingStreet, ShippingCity, ShippingState,   Website, Description, OwnerId, LastActivityDate, Codice_amministrativo__c, Active__c, Area_geografica__c, Codice_Fiscale_RL__c, Cognome_responsabile__c, Data_Nascita_RL__c, Esistenza_candidature__c,  Nome_responsabile__c,  PEC__c, Regione__c, Tech_Implementation_User__c, Titolo_responsabile__c, Tipologia_Ente__c, Integrato_Cie__c, Integrato_Spid__c, Data_Esercizio_CIE__c, Data_Esercizio_SPID__c, Integrato_CIE_Fondo_Innovazione__c, Integrato_SPID_Fondo_Innovazione__c, Protocollo_CIE__c, Account_Manager__c, Account_Manager__r.Name, Protocollo_SPID__c, Asseveratore__c, Operation_Assistant__c from Account where IsDeleted = false and (Account_Manager__c in ('` + locals.user.utentestandard.viewas + `') or Tech_Implementation_User__c in ('` + locals.user.utentestandard.viewas + `'))  and Name!='ACCOUNTSCATOLA' order by Name`, MAX_FETCH);
        const all = Promise.all([qenti]);
        const values = await all;
        let entiStandard = values[0];

            const risposte_res = await fetch('https://rollingwords.it/dist/quest/survey_anci.json', {
                method: 'GET',
                credentials: 'same-origin',
                redirect: 'follow',
                agent: null,
                headers: {
                    "Content-Type": "text/plain",
                    'Authorization': 'Basic ' + btoa(UNCI+':'+UPCI),
                },
                timeout: 10000
            });
            let risposte = await risposte_res.json();

            const d = risposte.data.filter(x => entiStandard.filter(e => e.Id===x.pa2026.id).length>0 ).filter(x => x.surveyanci.completato).map(x =>
            ({
                area: x.pa2026.area,
                regione: x.pa2026.regione,
                comune: x.nome,
                tipo: x.surveyanci.tipo,
                data_invio_risposta: x.surveyanci.data_invio,
            })
            );

            const file = d3.dsvFormat(";").format(d);
             //d3.csvFormat(d);

            

            return new Response(
                file,
                {
                    status: 200,
                    headers: {
                        'Content-Type': 'text',
                        'Content-Disposition':
                            `attachment; filename*=UTF-8''` + 'risposte_survey_anci_' + moment().format("YYYYMMDD") + `.csv`,
                    },
                }
            );
        } else {
            throw redirect(303, '/users');
        }
    } else {
        throw redirect(303, '/users');
    }
}