// @ts-nocheck
import { promiseQuery } from '$lib';
import { redirect } from '@sveltejs/kit';
import jsforce from 'jsforce';
import * as d3 from 'd3';

const MAX_FETCH = 1000000;

const aree_geografiche = [
    { area: "CENTRO", regioni: ["Lazio", "Marche", "Sardegna", "Toscana", "Umbria"] },
    { area: "LOMBARDIA", regioni: ["Lombardia"] },
    { area: "NORD_EST", regioni: ["Emilia-Romagna", "Friuli-Venezia Giulia", "Trentino-Alto Adige/Südtirol", "Veneto"] },
    { area: "NORD_OVEST", regioni: ["Liguria", "Piemonte", "Valle d'Aosta/Vallée d'Aoste"] },
    { area: "SUD_EST", regioni: ["Abruzzo", "Basilicata", "Molise", "Puglia"] },
    { area: "SUD_OVEST", regioni: ["Calabria", "Campania", "Sicilia"] },
];


export async function load({ locals }) {
    const connstandard = locals.user.connectionStandard;

    if (connstandard) {
        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connstandard
        });
        const misure = promiseQuery(conn, `select Id, Name, outfunds__Start_Date__c,outfunds__End_Date__c,  outfunds__Status__c, outfunds__Total_Program_Amount__c from outfunds__Funding_Program__c where IsDeleted =false and outfunds__Parent_Funding_Program__c = '' and outfunds__Total_Program_Amount__c != null order by Name`, MAX_FETCH);
        const fields = `select  count(Id) numero_candidature, SUM(outfunds__Awarded_Amount__c) valore,SUM(Awarded_Amount_Padre_1__c) valore1,SUM(Awarded_Amount_Padre_2__c) valore2, outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name misura, outfunds__Applying_Organization__r.Regione__c regione from outfunds__Funding_Request__c`;
        const objects = `group by outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name, outfunds__Applying_Organization__r.Regione__c`;
        const incandidatura = promiseQuery(conn, (fields + ` where outfunds__Status__c in ('AMMESSA', 'AMMESSA CON RISERVA', 'ACCETTATA', 'IN VERFICA') ` + objects), MAX_FETCH);
        const incontrattualizzazione = promiseQuery(conn, (fields + ` where outfunds__Status__c ='FINANZIATA' and Stato_Progetto__c in ('DA AVVIARE','AVVIATO') and Data_Contrattualizzazione__c = null ` + objects), MAX_FETCH);
        const inrealizzazione = promiseQuery(conn, (fields + ` where outfunds__Status__c ='FINANZIATA' and Stato_Progetto__c in ('DA AVVIARE','AVVIATO') and Data_Contrattualizzazione__c != null  and Ultimo_Esito_Conformit_Tecnica__c = '' ` + objects), MAX_FETCH);
        const inrevisione = promiseQuery(conn, (fields + ` where outfunds__Status__c ='FINANZIATA' and Stato_Progetto__c in ('DA AVVIARE','AVVIATO') and Data_Contrattualizzazione__c != null  and Ultimo_Esito_Conformit_Tecnica__c != '' ` + objects), MAX_FETCH);
        const inverificatecnica = promiseQuery(conn, (fields + ` where outfunds__Status__c ='FINANZIATA' and Stato_Progetto__c in ('COMPLETATO','IN VERIFICA') and Ultimo_Esito_Conformit_Tecnica__c != 'Positivo' and Ultimo_Esito_Conformit_Tecnica__c != 'Negativo' ` + objects), MAX_FETCH);
        const inverificaformale = promiseQuery(conn, (fields + ` where outfunds__Status__c ='FINANZIATA' and Stato_Progetto__c in ('COMPLETATO','IN VERIFICA') and Ultimo_Esito_Conformit_Tecnica__c in ('Positivo','Negativo') ` + objects), MAX_FETCH);
        const inliquidazione = promiseQuery(conn, (fields + ` where outfunds__Status__c ='FINANZIATA' and Stato_Progetto__c in ('IN LIQUIDAZIONE') ` + objects), MAX_FETCH);
        const liquidate = promiseQuery(conn, (fields + ` where outfunds__Status__c ='FINANZIATA' and Stato_Progetto__c in ('LIQUIDATO') ` + objects), MAX_FETCH);

        const all = Promise.all([incandidatura, incontrattualizzazione, inrealizzazione, inrevisione, inverificatecnica, inverificaformale, inliquidazione, liquidate,misure]);
        const allvalues = await all;

        let candidature = [];
        candidature = candidature.concat(allvalues[0].map((x) => ({...x,stato: "In candidatura"})));
        candidature = candidature.concat(allvalues[1].map((x) => ({...x,stato: "In contrattualizzazione"})));
        candidature = candidature.concat(allvalues[2].map((x) => ({...x,stato: "In realizzazione"})));
        candidature = candidature.concat(allvalues[3].map((x) => ({...x,stato: "In revisione"})));
        candidature = candidature.concat(allvalues[4].map((x) => ({...x,stato: "In verifica tecnica"})));
        candidature = candidature.concat(allvalues[5].map((x) => ({...x,stato: "In verifica formale"})));
        candidature = candidature.concat(allvalues[6].map((x) => ({...x,stato: "In liquidazione"})));
        candidature = candidature.concat(allvalues[7].map((x) => ({...x,stato: "Liquidate"})));

        candidature.forEach(c => {
            c.area_geografica = aree_geografiche.find(ag => ag.regioni.indexOf(c.regione)!=-1).area;
            //Se è pura 1.2 la considero 1.2 altrimenti 1.1
            if(c.misura==='1.1 e 1.2 Multimisura'){
                if(c.valore1===0 && c.valore2 !==0){
                    c.misura = '1.2 Abilitazione e facilitazione migrazione al Cloud';
                    c.valore = c.valore2;
                }else{
                    c.misura = '1.1 Infrastrutture digitali';
                    c.valore = c.valore1;
                }
            }
        }); 

        const riepilogoCandidatureAll = d3.rollup(candidature, function (D) {
            return {
                numero_candidature: d3.sum(D, function (d) { return d.numero_candidature; }),
                valore_candidature: d3.sum(D, function (d) { return d.valore; }),
            }
        }, (d) => d.misura,(d) => d.stato);

        const riepilogoCandidatureArea = d3.rollup(candidature, function (D) {
            return {
                numero_candidature: d3.sum(D, function (d) { return d.numero_candidature; }),
                valore_candidature: d3.sum(D, function (d) { return d.valore; }),
            }
        }, (d) => d.area_geografica,  (d) => d.misura, (d) => d.stato);

        const riepilogoCandidatureRegione = d3.rollup(candidature, function (D) {
            return {
                numero_candidature: d3.sum(D, function (d) { return d.numero_candidature; }),
                valore_candidature: d3.sum(D, function (d) { return d.valore; }),
            }
        }, (d) => d.regione,  (d) => d.misura, (d) => d.stato);


        return {
            candidature: candidature,
            riepilogoCandidatureAll: riepilogoCandidatureAll,
            riepilogoCandidatureArea: riepilogoCandidatureArea,
            riepilogoCandidatureRegione: riepilogoCandidatureRegione,
            misure: allvalues[8]
        };
    } else {
        throw redirect(303, '/users');
    }

}

