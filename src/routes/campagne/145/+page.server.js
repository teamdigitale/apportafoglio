// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import jsforce from 'jsforce';
import { caricaCandidature145, caricaFornitori145, caricaPlatea145 } from './db';

export async function load({ locals }) {
    let platea = [];
    let candidature = [];
    let fornitori = [];
    const connstandard = locals.user.connectionStandard;
    const connection = connstandard;
    if (connection) {
        let conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connection
        });
        platea = await caricaPlatea145(conn);
        candidature = await caricaCandidature145(conn);
        fornitori = await caricaFornitori145(conn);
    }else {
        throw redirect(303, '/io');
    }
    return {
        platea: platea,
        candidature: candidature,
        fornitori: fornitori
    };
}