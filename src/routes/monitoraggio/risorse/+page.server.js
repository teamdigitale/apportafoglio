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
        const misure = promiseQuery(conn, `select Id, Name, outfunds__Start_Date__c,outfunds__End_Date__c,  outfunds__Status__c, outfunds__Total_Program_Amount__c from outfunds__Funding_Program__c where IsDeleted =false and outfunds__Parent_Funding_Program__c = '' and outfunds__Total_Program_Amount__c != null order by Name`, MAX_FETCH);
        const finanziate = promiseQuery(conn, `select calendar_year(Data_Finanziamento__c) anno, calendar_month(Data_Finanziamento__c) mese,  
        SUM(outfunds__Awarded_Amount__c) valore,SUM(Awarded_Amount_Padre_1__c) valorem1,SUM(Awarded_Amount_Padre_2__c) valorem2,
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id misura, outfunds__FundingProgram__r.Misura_Padre_1__c misura1, outfunds__FundingProgram__r.Misura_Padre_2__c  misura2
        from outfunds__Funding_Request__c 
        where outfunds__Status__c ='FINANZIATA' 
        group by calendar_year(Data_Finanziamento__c), calendar_month(Data_Finanziamento__c),
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id, outfunds__FundingProgram__r.Misura_Padre_1__c ,outfunds__FundingProgram__r.Misura_Padre_2__c 
        order by calendar_year(Data_Finanziamento__c), calendar_month(Data_Finanziamento__c) `, MAX_FETCH);
        const rinunciate = promiseQuery(conn, `select calendar_year(Data_Rinuncia__c) anno, calendar_month(Data_Rinuncia__c) mese, 
        SUM(outfunds__Awarded_Amount__c) valore,SUM(Awarded_Amount_Padre_1__c) valorem1,SUM(Awarded_Amount_Padre_2__c) valorem2,
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id misura, outfunds__FundingProgram__r.Misura_Padre_1__c, outfunds__FundingProgram__r.Misura_Padre_2__c 
        from outfunds__Funding_Request__c 
        where outfunds__Status__c ='RINUNCIATA' 
        group by calendar_year(Data_Rinuncia__c), calendar_month(Data_Rinuncia__c),
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id, outfunds__FundingProgram__r.Misura_Padre_1__c ,outfunds__FundingProgram__r.Misura_Padre_2__c 
        order by calendar_year(Data_Rinuncia__c), calendar_month(Data_Rinuncia__c)`, MAX_FETCH);
        const revocate = promiseQuery(conn, `select calendar_year(Data_Revoca_Decretata__c ) anno, calendar_month(Data_Revoca_Decretata__c ) mese, 
        SUM(outfunds__Awarded_Amount__c) valore,SUM(Awarded_Amount_Padre_1__c) valorem1,SUM(Awarded_Amount_Padre_2__c) valorem2,
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id misura, outfunds__FundingProgram__r.Misura_Padre_1__c, outfunds__FundingProgram__r.Misura_Padre_2__c 
        from outfunds__Funding_Request__c 
        where outfunds__Status__c ='REVOCATA' 
        group by calendar_year(Data_Revoca_Decretata__c ), calendar_month(Data_Revoca_Decretata__c ),
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id, outfunds__FundingProgram__r.Misura_Padre_1__c ,outfunds__FundingProgram__r.Misura_Padre_2__c 
        order by calendar_year(Data_Revoca_Decretata__c ), calendar_month(Data_Revoca_Decretata__c )`, MAX_FETCH);
        

        
        const all = Promise.all([misure, finanziate, rinunciate, revocate]);
        const values = await all;



        const dacontrattualizzare = promiseQuery(conn, `select calendar_year(Data_Finanziamento__c) anno, calendar_month(Data_Finanziamento__c) mese,  
        SUM(outfunds__Awarded_Amount__c) valore,SUM(Awarded_Amount_Padre_1__c) valorem1,SUM(Awarded_Amount_Padre_2__c) valorem2,
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id misura, outfunds__FundingProgram__r.Misura_Padre_1__c misura1, outfunds__FundingProgram__r.Misura_Padre_2__c  misura2
        from outfunds__Funding_Request__c 
        where outfunds__Status__c ='FINANZIATA' and Stato_Progetto__c in ('DA AVVIARE','AVVIATO') and Data_Contrattualizzazione__c = null
        group by calendar_year(Data_Finanziamento__c), calendar_month(Data_Finanziamento__c),
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id, outfunds__FundingProgram__r.Misura_Padre_1__c ,outfunds__FundingProgram__r.Misura_Padre_2__c 
        order by calendar_year(Data_Finanziamento__c), calendar_month(Data_Finanziamento__c) `, MAX_FETCH);
        const inrealizzazione = promiseQuery(conn, `select calendar_year(Data_Contrattualizzazione__c) anno, calendar_month(Data_Contrattualizzazione__c) mese,  
        SUM(outfunds__Awarded_Amount__c) valore,SUM(Awarded_Amount_Padre_1__c) valorem1,SUM(Awarded_Amount_Padre_2__c) valorem2,
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id misura, outfunds__FundingProgram__r.Misura_Padre_1__c misura1, outfunds__FundingProgram__r.Misura_Padre_2__c  misura2
        from outfunds__Funding_Request__c 
        where outfunds__Status__c ='FINANZIATA' and Stato_Progetto__c in ('DA AVVIARE','AVVIATO') and Data_Contrattualizzazione__c != null  and Ultimo_Esito_Conformit_Tecnica__c = ''
        group by calendar_year(Data_Contrattualizzazione__c), calendar_month(Data_Contrattualizzazione__c),
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id, outfunds__FundingProgram__r.Misura_Padre_1__c ,outfunds__FundingProgram__r.Misura_Padre_2__c 
        order by calendar_year(Data_Contrattualizzazione__c), calendar_month(Data_Contrattualizzazione__c) `, MAX_FETCH);
        const inrevisione = promiseQuery(conn, `select calendar_year(Data_Contrattualizzazione__c) anno, calendar_month(Data_Contrattualizzazione__c) mese,  
        SUM(outfunds__Awarded_Amount__c) valore,SUM(Awarded_Amount_Padre_1__c) valorem1,SUM(Awarded_Amount_Padre_2__c) valorem2,
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id misura, outfunds__FundingProgram__r.Misura_Padre_1__c misura1, outfunds__FundingProgram__r.Misura_Padre_2__c  misura2
        from outfunds__Funding_Request__c 
        where outfunds__Status__c ='FINANZIATA' and Stato_Progetto__c in ('DA AVVIARE','AVVIATO') and Data_Contrattualizzazione__c != null  and Ultimo_Esito_Conformit_Tecnica__c != ''
        group by calendar_year(Data_Contrattualizzazione__c), calendar_month(Data_Contrattualizzazione__c),
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id, outfunds__FundingProgram__r.Misura_Padre_1__c ,outfunds__FundingProgram__r.Misura_Padre_2__c 
        order by calendar_year(Data_Contrattualizzazione__c), calendar_month(Data_Contrattualizzazione__c) `, MAX_FETCH);
        const inverificatecnica = promiseQuery(conn, `select calendar_year(Data_avanzamento_step_5__c) anno, calendar_month(Data_avanzamento_step_5__c) mese,  
        SUM(outfunds__Awarded_Amount__c) valore,SUM(Awarded_Amount_Padre_1__c) valorem1,SUM(Awarded_Amount_Padre_2__c) valorem2,
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id misura, outfunds__FundingProgram__r.Misura_Padre_1__c misura1, outfunds__FundingProgram__r.Misura_Padre_2__c  misura2
        from outfunds__Funding_Request__c 
        where outfunds__Status__c ='FINANZIATA' and Stato_Progetto__c in ('COMPLETATO','IN VERIFICA') and Ultimo_Esito_Conformit_Tecnica__c != 'Positivo' and Ultimo_Esito_Conformit_Tecnica__c != 'Negativo'
        group by calendar_year(Data_avanzamento_step_5__c), calendar_month(Data_avanzamento_step_5__c),
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id, outfunds__FundingProgram__r.Misura_Padre_1__c ,outfunds__FundingProgram__r.Misura_Padre_2__c 
        order by calendar_year(Data_avanzamento_step_5__c), calendar_month(Data_avanzamento_step_5__c) `, MAX_FETCH);
        const inverificaformale = promiseQuery(conn, `select calendar_year(Data_avanzamento_step_5__c) anno, calendar_month(Data_avanzamento_step_5__c) mese,  
        SUM(outfunds__Awarded_Amount__c) valore,SUM(Awarded_Amount_Padre_1__c) valorem1,SUM(Awarded_Amount_Padre_2__c) valorem2,
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id misura, outfunds__FundingProgram__r.Misura_Padre_1__c misura1, outfunds__FundingProgram__r.Misura_Padre_2__c  misura2
        from outfunds__Funding_Request__c 
        where outfunds__Status__c ='FINANZIATA' and Stato_Progetto__c in ('COMPLETATO','IN VERIFICA') and Ultimo_Esito_Conformit_Tecnica__c in ('Positivo','Negativo')
        group by calendar_year(Data_avanzamento_step_5__c), calendar_month(Data_avanzamento_step_5__c),
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id, outfunds__FundingProgram__r.Misura_Padre_1__c ,outfunds__FundingProgram__r.Misura_Padre_2__c 
        order by calendar_year(Data_avanzamento_step_5__c), calendar_month(Data_avanzamento_step_5__c) `, MAX_FETCH);
        const inliquidazione = promiseQuery(conn, `select calendar_year(Data_avanzamento_in_Liquidazione__c) anno, calendar_month(Data_avanzamento_in_Liquidazione__c) mese,  
        SUM(outfunds__Awarded_Amount__c) valore,SUM(Awarded_Amount_Padre_1__c) valorem1,SUM(Awarded_Amount_Padre_2__c) valorem2,
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id misura, outfunds__FundingProgram__r.Misura_Padre_1__c misura1, outfunds__FundingProgram__r.Misura_Padre_2__c  misura2
        from outfunds__Funding_Request__c 
        where outfunds__Status__c ='FINANZIATA' and Stato_Progetto__c in ('IN LIQUIDAZIONE')
        group by calendar_year(Data_avanzamento_in_Liquidazione__c), calendar_month(Data_avanzamento_in_Liquidazione__c),
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id, outfunds__FundingProgram__r.Misura_Padre_1__c ,outfunds__FundingProgram__r.Misura_Padre_2__c 
        order by calendar_year(Data_avanzamento_in_Liquidazione__c), calendar_month(Data_avanzamento_in_Liquidazione__c) `, MAX_FETCH);
        const liquidate = promiseQuery(conn, `select calendar_year(Data_avanzamento_in_Liquidato__c) anno, calendar_month(Data_avanzamento_in_Liquidato__c) mese,  
        SUM(outfunds__Awarded_Amount__c) valore,SUM(Awarded_Amount_Padre_1__c) valorem1,SUM(Awarded_Amount_Padre_2__c) valorem2,
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id misura, outfunds__FundingProgram__r.Misura_Padre_1__c misura1, outfunds__FundingProgram__r.Misura_Padre_2__c  misura2
        from outfunds__Funding_Request__c 
        where outfunds__Status__c ='FINANZIATA' and Stato_Progetto__c in ('LIQUIDATO')
        group by calendar_year(Data_avanzamento_in_Liquidato__c), calendar_month(Data_avanzamento_in_Liquidato__c),
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id, outfunds__FundingProgram__r.Misura_Padre_1__c ,outfunds__FundingProgram__r.Misura_Padre_2__c 
        order by calendar_year(Data_avanzamento_in_Liquidato__c), calendar_month(Data_avanzamento_in_Liquidato__c) `, MAX_FETCH);
        const allfinanziate = Promise.all([dacontrattualizzare, inrealizzazione, inverificatecnica, inverificaformale, inliquidazione, liquidate, inrevisione]);
        const finanziatevalues = await allfinanziate;

        const rinunciatePreContratto = promiseQuery(conn, `select calendar_year(Data_Rinuncia__c) anno, calendar_month(Data_Rinuncia__c) mese, 
        SUM(outfunds__Awarded_Amount__c) valore,SUM(Awarded_Amount_Padre_1__c) valorem1,SUM(Awarded_Amount_Padre_2__c) valorem2,
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id misura, outfunds__FundingProgram__r.Misura_Padre_1__c, outfunds__FundingProgram__r.Misura_Padre_2__c 
        from outfunds__Funding_Request__c 
        where outfunds__Status__c ='RINUNCIATA' and Contrattualizzazione_Fornitori__c = 'DA FARE'
        group by calendar_year(Data_Rinuncia__c), calendar_month(Data_Rinuncia__c),
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id, outfunds__FundingProgram__r.Misura_Padre_1__c ,outfunds__FundingProgram__r.Misura_Padre_2__c 
        order by calendar_year(Data_Rinuncia__c), calendar_month(Data_Rinuncia__c)`, MAX_FETCH);
        const rinunciatePreCompletamento = promiseQuery(conn, `select calendar_year(Data_Rinuncia__c) anno, calendar_month(Data_Rinuncia__c) mese, 
        SUM(outfunds__Awarded_Amount__c) valore,SUM(Awarded_Amount_Padre_1__c) valorem1,SUM(Awarded_Amount_Padre_2__c) valorem2,
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id misura, outfunds__FundingProgram__r.Misura_Padre_1__c, outfunds__FundingProgram__r.Misura_Padre_2__c 
        from outfunds__Funding_Request__c 
        where outfunds__Status__c ='RINUNCIATA' and Contrattualizzazione_Fornitori__c = 'FATTO' and Check_Data_Avanzamento_Step_5__c = false
        group by calendar_year(Data_Rinuncia__c), calendar_month(Data_Rinuncia__c),
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id, outfunds__FundingProgram__r.Misura_Padre_1__c ,outfunds__FundingProgram__r.Misura_Padre_2__c 
        order by calendar_year(Data_Rinuncia__c), calendar_month(Data_Rinuncia__c)`, MAX_FETCH);
        const rinunciatePostCompletamento = promiseQuery(conn, `select calendar_year(Data_Rinuncia__c) anno, calendar_month(Data_Rinuncia__c) mese, 
        SUM(outfunds__Awarded_Amount__c) valore,SUM(Awarded_Amount_Padre_1__c) valorem1,SUM(Awarded_Amount_Padre_2__c) valorem2,
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id misura, outfunds__FundingProgram__r.Misura_Padre_1__c, outfunds__FundingProgram__r.Misura_Padre_2__c 
        from outfunds__Funding_Request__c 
        where outfunds__Status__c ='RINUNCIATA' and Contrattualizzazione_Fornitori__c = 'FATTO' and Check_Data_Avanzamento_Step_5__c = true
        group by calendar_year(Data_Rinuncia__c), calendar_month(Data_Rinuncia__c),
        outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id, outfunds__FundingProgram__r.Misura_Padre_1__c ,outfunds__FundingProgram__r.Misura_Padre_2__c 
        order by calendar_year(Data_Rinuncia__c), calendar_month(Data_Rinuncia__c)`, MAX_FETCH);

        const allrinunciate = Promise.all([rinunciatePreContratto, rinunciatePreCompletamento, rinunciatePostCompletamento]);
        const rinunciatevalues = await allrinunciate;


        return {
            misure: values[0],
            finanziate: values[1],
            rinunciate: values[2],
            revocate: values[3],
            dacontrattualizzare: finanziatevalues[0],
            inrealizzazione: finanziatevalues[1],
            inverificatecnica: finanziatevalues[2],
            inverificaformale: finanziatevalues[3],
            inliquidazione: finanziatevalues[4],
            liquidate: finanziatevalues[5],
            inrevisione: finanziatevalues[6],
            rinunciatePreContratto: rinunciatevalues[0],
            rinunciatePreCompletamento: rinunciatevalues[1],
            rinunciatePostCompletamento: rinunciatevalues[2]
        };
    } else {
        throw redirect(303, '/accesso');
    }

}

