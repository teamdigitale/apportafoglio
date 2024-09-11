// @ts-nocheck
import survey from './struttura_survey_anci.json';

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
        if (conn) {
            return {
                survey: survey,
            };
        } else {
            throw redirect(303, '/users');
        }
    } else {
        throw redirect(303, '/users');
    }
}