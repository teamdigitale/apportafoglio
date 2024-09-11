// @ts-nocheck
import risposte  from '../../survey_anci.json';
import { redirect } from '@sveltejs/kit';
import jsforce from 'jsforce';


/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
    const connstandard = locals.user.connectionStandard;
    let idente = params.id;
    if (connstandard) {
        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connstandard
        });
        return {
            risposta: risposte.data.filter(x => x.pa2026.id===idente)[0]
        }
    } else {
        throw redirect(303, '/users');
    }

}

