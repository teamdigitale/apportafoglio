// @ts-nocheck
import { promiseQuery } from '$lib';
import { redirect } from '@sveltejs/kit';
import jsforce from 'jsforce';
import { UNCI } from '$env/static/private';
import { UPCI } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
    const connstandard = locals.user.connectionStandard;
    let idente = params.id;
    if (connstandard) {
        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connstandard
        });
        const e = await promiseQuery(conn, `Select Name from Account where Id = '` + idente + `'`, 100);
        if (e && e.length === 1) {
            const risposte_res = await fetch('https://rollingwords.it/dist/quest/survey_anci.json', {
                method: 'GET',
                credentials: 'same-origin',
                redirect: 'follow',
                agent: null,
                headers: {
                    "Content-Type": "text/plain",
                    'Authorization': 'Basic ' + btoa(UNCI + ':' + UPCI)
                },
                timeout: 10000
            });
            const risposte = await risposte_res.json();
            const risp = risposte.data.filter(x => x.pa2026.id === idente)[0];
            const strutturaSezioni = risposte.strutturaSezioni;
            const dd = [];
            strutturaSezioni.forEach(s => {
                 s.domande.forEach(d => {
                    dd.push({
                        codice: d.codice,
                        domanda: d.domanda,
                        options: d.options
                    })
                });
            });

            
            risp.surveyanci.sezioni.forEach(s => {
                s.domande.forEach(d => {
                   d.domanda = dd.find(x => x.codice ===d.codice).domanda;
                   d.options = dd.find(x => x.codice ===d.codice).options;
                   
                   
                });
            });
            return {
                risposta: risposte.data.filter(x => x.pa2026.id === idente)[0],
                struttura: strutturaSezioni
            }
        }
    } else {
        throw redirect(303, '/users');
    }

}
