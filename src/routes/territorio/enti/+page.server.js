// @ts-nocheck
import jsforce from 'jsforce';
import { promiseQuery } from '$lib';
import { redirect } from '@sveltejs/kit';

const MAX_FETCH = 1000000;

export async function load({ locals }) {
    const connstandard = locals.user.connectionStandard;

    let connection = connstandard;

    if (connection) {
        let conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connection
        });
        const qmisure = promiseQuery(conn, `select Id,Name,outfunds__Total_Program_Amount__c  from outfunds__Funding_Program__c  where outfunds__Parent_Funding_Program__c=null and outfunds__Total_Program_Amount__c!= null order by name asc`, MAX_FETCH);
        const qsoggetti_beneficiari = promiseQuery(conn, `select Id,outfunds__Parent_Funding_Program__c, Misura_Padre_1__c, Misura_Padre_2__c, SOGGETTI_DESTINATARI__c from outfunds__Funding_Program__c  where outfunds__Parent_Funding_Program__c != null`, MAX_FETCH);
        const qenti = promiseQuery(conn, `select Area_geografica__c, Regione__c, Tipologia_Ente__c from Account where Regione__c != null`, MAX_FETCH);
        const qcandidature = promiseQuery(conn, `select outfunds__Applying_Organization__r.Area_geografica__c, outfunds__Applying_Organization__r.Regione__c, outfunds__Applying_Organization__r.Tipologia_Ente__c, outfunds__Status__c, Stato_Progetto__c, Name, outfunds__FundingProgram__r.Pacchetto__c, outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id, outfunds__FundingProgram__r.Misura_Padre_1__r.Id, outfunds__FundingProgram__r.Misura_Padre_2__r.Id from outfunds__Funding_Request__c `, MAX_FETCH);
        
        const all = Promise.all([qmisure, qsoggetti_beneficiari, qenti, qcandidature]);
        const values = await all;

        return {
            misure: values[0],
            soggetti_beneficiari: values[1],
            platea: values[2],
            candidature: values[3]
        };
    } else {
        throw redirect(303, '/users');
    }
}