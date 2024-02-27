import jsforce from 'jsforce';
import { promiseQuery } from '$lib/index.js';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {

    const connstandard = locals.user.connectionStandard;
    const connection = connstandard;

    if (connection) {
        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connection
        });
        let qm = await promiseQuery(
            conn,
            "select Id, Name from outfunds__Funding_Program__c  where outfunds__Parent_Funding_Program__c = null and Name!='1.1 e 1.2 Multimisura' order by name asc"
        );
        const misure = qm.map(e => ({ idmisura: e.Id, misura: e.Name }));
        return {
            misure: misure
        }
    } else {
        throw redirect(303, 'users');
    }

}