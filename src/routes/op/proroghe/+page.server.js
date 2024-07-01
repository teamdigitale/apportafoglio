import { promiseQuery } from '$lib';
import { redirect } from '@sveltejs/kit';
import jsforce from 'jsforce';

const MAX_FETCH = 1000000;

export async function load({ locals }) {
    const connstandard = locals.user.connectionStandard;
    const connasseveratore = locals.user.connectionAsseveratore;
    let res = [];
    if (connstandard || connasseveratore) {
        if (connstandard) {
            const conn = new jsforce.Connection({
                instanceUrl: "https://padigitale2026.my.salesforce.com",
                accessToken: connstandard
            });
            const qcand = locals.user.utentestandard.area?
            promiseQuery(conn, `select Id,outfunds__FundingProgram__r.Name from outfunds__Funding_Request__c where outfunds__Status__c = 'FINANZIATA' and outfunds__Applying_Organization__r.Area_geografica__c = '`+locals.user.utentestandard.area+`' and Name!='ACCOUNTSCATOLA' order by Name asc`, MAX_FETCH)
            :promiseQuery(conn, `select Id,outfunds__FundingProgram__r.Name from outfunds__Funding_Request__c where outfunds__Status__c = 'FINANZIATA' and (outfunds__Applying_Organization__r.Account_Manager__c in ('`+locals.user.utentestandard.viewas+`') or outfunds__Applying_Organization__r.Tech_Implementation_User__c in ('`+locals.user.utentestandard.viewas+`')) and outfunds__Applying_Organization__r.Name!='ACCOUNTSCATOLA' order by Name asc`, MAX_FETCH);
            const qtasks = promiseQuery(conn, `select Id, WhatId, EnteLookup__r.Name, Description, Giorni_richiesti__c, Fase_Cronoprogramma__c, Chi_registra_la_riunione__c, Status, Data_richiesta__c from Task where RecordType.Name = 'Variazione Cronoprogramma Fase 2'`, MAX_FETCH)

            const all = Promise.all([qcand,qtasks]);
            const vall = await all;
            const cand = vall[0];
            const task = vall[1];
            cand.forEach(c => {
                const tt = task.filter(t => t.WhatId===c.Id);
                if(tt.length===1){
                    res.push({...c,...tt[0]})
                }
            });
        }
       
        return {
            richieste: res
        };
    } else {
        throw redirect(303, '/users');
    }
}

