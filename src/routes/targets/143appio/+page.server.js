import jsforce from 'jsforce';
import { promiseQuery } from '$lib';
import { redirect } from '@sveltejs/kit';

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
        const qservizioattivo = promiseQuery(conn, `select Id, Ente__r.Id, Ente__r.Tipologia_Ente__c, Data_Attivazione__c from Servizio_Attivo__c where Piattaforma_Servizi__c = 'PagoPA' `, MAX_FETCH);
        const qente = promiseQuery(conn, `select Id,Area_geografica__c, Regione__c, Tipologia_Ente__c from Account where IsDeleted = false and Regione__c != null`, MAX_FETCH);
        const all = Promise.all([qservizioattivo,qente]);
        const values = await all;

        values[0].forEach(e => {
            if (e.Ente__r.Tipologia_Ente__c !== 'Scuole' && e.Ente__r.Tipologia_Ente__c !== 'Comuni') {
                e.tipologia_ente = 'Altri';
            } else {
                e.tipologia_ente = e.Ente__r.Tipologia_Ente__c;
            }
        });

        values[1].forEach(e => {
            if (e.Tipologia_Ente__c !== 'Scuole' && e.Tipologia_Ente__c !== 'Comuni') {
                e.tipologia_ente = 'Altri';
            } else {
                e.tipologia_ente = e.Tipologia_Ente__c;
            }
        });

        return {
            servizi: values[0],
            enti: values[1]
        };
    } else {
        throw redirect(303, '/users');
    }
}