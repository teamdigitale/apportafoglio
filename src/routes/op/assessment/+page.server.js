import { promiseQuery } from '$lib';
import { redirect } from '@sveltejs/kit';
import jsforce from 'jsforce';

const MAXFETCH = 99999999;

export async function load({ locals }) {

    const connection = locals.user.connectionStandard;

    if (connection) {
        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connection
        });
        let idutentesf;
        await conn.identity(function (err, res) {
            idutentesf = res.user_id;
        });

        //const calendario = await promiseQuery(conn, `select ANA_Ente__c, ANA_Data_Assessment__c, ALTRO_prossimo_appuntamento__c, ANA_Referenti_Ente__c, ANA_Referenti_Fornitore__c from Assessment_TO__c where CreatedById = '` + locals.user.utentestandard.idsf + `'`, MAXFETCH);
        const calendario = await promiseQuery(conn, `select Id,ANA_Ente__c, ANA_Data_Assessment__c, ALTRO_prossimo_appuntamento__c, ANA_Referenti_Ente__c, ANA_Referenti_Fornitore__c from Assessment_TO__c where CreatedById = '0057Q00000729qtQAA'`, MAXFETCH);
        


        return {
            calendario: calendario
        };
    } else {
        throw redirect(303, '/users');
    }
}

