// @ts-nocheck
import { promiseQuery } from '$lib';
import { redirect } from '@sveltejs/kit';
import jsforce from 'jsforce';

const MAX_FETCH = 1000000;

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const connstandard = locals.user.connectionStandard;

    if (connstandard) {
        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connstandard
        });

        const qbudgetMisura = promiseQuery(conn, "select Id, outfunds__Total_Program_Amount__c from outfunds__Funding_Program__c where outfunds__Parent_Funding_Program__C = null and Name = '1.2 Abilitazione e facilitazione migrazione al Cloud'", MAX_FETCH);

        const candidature_1_2 = promiseQuery(conn, `select 
        Id, outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name,
        outfunds__Applying_Organization__r.Tipologia_Ente__c, 
        outfunds__Applying_Organization__r.NumericaClusterToClusterRange__c,  
        outfunds__Awarded_Amount__c, Awarded_Amount_Padre_2__c, 
        Stato_Progetto__c  
        from outfunds__Funding_Request__c where outfunds__Status__c IN ('FINANZIATA','ACCETTATA','AMMESSA','IN VERIFICA','AMMESSA CON RISERVA')
        and  (outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '1.2 Abilitazione e facilitazione migrazione al Cloud' 
        or (outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name='1.1 e 1.2 Multimisura' and hasServizi12__c=true))`, MAX_FETCH);

        const qbeneficiari = promiseQuery(conn, `select 
        Id,outfunds__Parent_Funding_Program__r.Id, 
        SOGGETTI_DESTINATARI__c 
        from outfunds__Funding_Program__c 
        where 
        (outfunds__Parent_Funding_Program__r.Name = '1.2 Abilitazione e facilitazione migrazione al Cloud' 
        or outfunds__Parent_Funding_Program__r.Name='1.1 e 1.2 Multimisura' )
        and outfunds__Parent_Funding_Program__c != null`, MAX_FETCH);

        const all = Promise.all([candidature_1_2, qbeneficiari, qbudgetMisura]);
        const values = await all;
        const b = values[1];
        const beneficiari = [];
        for (let z = 0; z < b.length; z++) {
            let bb = b[z].SOGGETTI_DESTINATARI__c.split(";");
            bb.forEach(e => {
                if (e === 'Aziende Ospedaliere') { e = 'ASL' }
                if (beneficiari.indexOf(e) === -1) {
                    beneficiari.push(e);
                }
            });
        }

        const enti = await promiseQuery(conn, `select 
        Id,Name,Area_geografica__c, Regione__c, ShippingState, Tipologia_Ente__c, NumericaClusterToClusterRange__c 
        from Account where Regione__c != null
        and Tipologia_Ente__c in ('`+ beneficiari.join("','") + `')`, MAX_FETCH);

        return {
            candidature: values[0].map((c) => ({
                id_candidatura: c.Id,
                misura: c.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name,
                tipologia_ente: c.outfunds__Applying_Organization__r.Tipologia_Ente__c,
                cluster: c.outfunds__Applying_Organization__r.NumericaClusterToClusterRange__c,
                importo: c.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name === '1.1 e 1.2 Multimisura' ? c.Awarded_Amount_Padre_2__c : c.outfunds__Awarded_Amount__c,
                stato_progetto: c.Stato_Progetto__c
            })),
            beneficiari: beneficiari,
            enti: enti.map((e) => ({
                tipologia_ente: e.Tipologia_Ente__c,
                cluster: e.NumericaClusterToClusterRange__c
            })),
            budgetMisura: values[2][0].outfunds__Total_Program_Amount__c
        };
    } else {
        throw redirect(303, '/users');
    }

}

