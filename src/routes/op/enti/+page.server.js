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
            const soql = "Select Id, IsDeleted, Name, ShippingCity, ShippingState,  Description, OwnerId, LastActivityDate,  Nome_responsabile__c, Cognome_responsabile__c, Titolo_responsabile__c, PEC__c, Regione__c, Active__c, Tipologia_Ente__c, Account_Manager__c, Account_Manager__r.Name, Stato_giuridico__c from Account where Active__c = 1 and IsDeleted = false and Name!='ACCOUNTSCATOLA'"
            const qenti =
                locals.user.utentestandard.vasoss ?
                    promiseQuery(conn, `${soql} order by Name`, MAX_FETCH) :
                    locals.user.utentestandard.area ?
                        promiseQuery(conn, `${soql} and Area_geografica__c = '` + locals.user.utentestandard.area + `'  order by Name`, MAX_FETCH) :
                        promiseQuery(conn, `${soql} and (Account_Manager__c in ('` + locals.user.utentestandard.viewas + `') or Tech_Implementation_User__c in ('` + locals.user.utentestandard.viewas + `'))  order by Name`, MAX_FETCH);
            const all = Promise.all([qenti]);
            const values = await all;
            let entiStandard = values[0];
            enti = enti.concat(entiStandard);
        }
        return {
            enti: enti
        };
    } else {
        throw redirect(303, '/users');
    }
}

