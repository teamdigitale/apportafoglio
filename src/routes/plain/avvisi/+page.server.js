import jsforce from 'jsforce';
import { redirect } from '@sveltejs/kit';
import { caricaAvvisi, caricaMisure } from '../../../logic/misure';

export async function load({ locals }) {
    const connstandard = locals.user.connectionStandard;
    const connasseveratore = locals.user.connectionAsseveratore;
    const connection = connstandard ? connstandard : connasseveratore;

    if (connection) {
        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connection
        });
        const pavvisi = caricaAvvisi(conn);
        const pmisure = caricaMisure(conn);
        const all = Promise.all([pavvisi, pmisure]);
        const values = await all;
        return {
            avvisi: values[0],
            misure: values[1]
        };
    } else {
        throw redirect(303, '/io');
    }
}


