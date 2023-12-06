import { caricaTaskAsseverazione, caricaCandidatureAsseverazione } from '../../../logic/asseverazioni'
import jsforce from 'jsforce';
import { caricaAvvisi, caricaMisure } from '../../../logic/misure';
import { loadEntiAPortafoglio } from '../../../logic/enti';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {

    let mm = [];
    let aa = [];
    let entiass = [];


    let taskasseverazione = [];
    let candidatureAsseverazione = [];

    const connasseveratore = locals.user.connectionAsseveratore;
    const connection = connasseveratore;

    if (connection) {
        let conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connection
        });
        let idutentesf;
        await conn.identity(function (err, res) {
            idutentesf = res.user_id;
        });
        taskasseverazione = await caricaTaskAsseverazione(conn, idutentesf);
        candidatureAsseverazione = await caricaCandidatureAsseverazione(conn);
        mm = mm.concat(await caricaMisure(conn));
        aa = aa.concat(await caricaAvvisi(conn));
        entiass = entiass.concat(await loadEntiAPortafoglio(conn, idutentesf, 'Asseveratore'));
        taskasseverazione.forEach((task) => {
            let cand = candidatureAsseverazione.filter((x) =>
                x.Id === task.WhatId
            );
            if (cand && cand.length == 1) {
                task.misura = cand[0].Misura__c;
                const ff = aa.filter((el) => (el.Id === cand[0].outfunds__FundingProgram__c));
                if (ff && ff.length > 0) {
    
                    task.misuraAll = ff[0];
                    task.pacchetto = ff[0].Pacchetto__c;
                } else {
                    task.pacchetto = 'n.a.';
                }
    
                //task.misuraAll = cand[0].outfunds__FundingProgram__c;
                task.esitoasseverazione = cand[0].Esito_Asseveratore__c;
                task.candidatura = cand[0];
    
            }
            if (!task.Esito__c) { task.Esito__c = 'In lavorazione' }
        });
    
        taskasseverazione = taskasseverazione.filter((x) => x.misura);
    
    
        return {
            misure: mm,
            taskasseverazione: taskasseverazione,
            enti: entiass,
            candidatureAsseverazione: candidatureAsseverazione
        };
    } else {
        throw redirect(303, '/io');
    }

   
}
