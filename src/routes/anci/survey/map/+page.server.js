// @ts-nocheck
import risposte  from '../survey_anci.json';
import { redirect } from '@sveltejs/kit';
import jsforce from 'jsforce';


/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const connstandard = locals.user.connectionStandard;

    if (connstandard) {
        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connstandard
        });
        
        return {
            r: risposte.data,
            alerts: risposte.alerts,
            warnings: risposte.warnings,
            warningStrutturati: risposte.warningStrutturati,
            alertStrutturati: risposte.alertStrutturati
        };
    } else {
        throw redirect(303, '/users');
    }
}

