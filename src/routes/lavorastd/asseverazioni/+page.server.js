import jsforce from 'jsforce';
import { caricaTask, caricaTipiTask } from '$lib/sfquery/asseverazioni';
import { getUtenteStandard } from '../../../lib/userdb';
import { caricaCandidature } from '../../../logic/candidature';
import { caricaAvvisi } from '../../../logic/misure';
import { loadEntiAPortafoglio } from '../../../logic/enti';

let taskAssTecnica = [];
let taskAssFormale = [];
let candidature = [];
let avvisi = [];
let enti = []

export async function load({ cookies }) {
    const ustd = getUtenteStandard(cookies);
    if (ustd) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        await conn.login(ustd.email, ustd.password + ustd.token);
        taskAssTecnica = await caricaTask(conn,'Controlli Conformità Tecnica');
        taskAssFormale = await caricaTask(conn,'Controlli Asseverazione Formale');
        candidature = await caricaCandidature(conn,ustd);
        avvisi = await caricaAvvisi(conn);
        enti = await loadEntiAPortafoglio(conn,ustd,'Standard');

        taskAssTecnica= taskAssTecnica.filter(t=> candidature.filter(c=>c.Id===t.WhatId).length>0);
        taskAssTecnica.forEach(t => {
            if(!t.Esito__c || t.Esito__c===''){
                t.Esito__c = 'In lavorazione';
            }
        });
        taskAssFormale= taskAssFormale.filter(t=> candidature.filter(c=>c.Id===t.WhatId).length>0);
        taskAssFormale.forEach(t => {
            if(!t.Esito__c || t.Esito__c===''){
                t.Esito__c = 'In lavorazione';
            }
        });
        await conn.logout();
    }
    return {
        taskAssTecnica: taskAssTecnica,
        taskAssFormale: taskAssFormale,
        candidature: candidature,
        avvisi: avvisi,
        enti: enti
    };
}
