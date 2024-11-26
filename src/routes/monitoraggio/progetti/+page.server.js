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


const loadData = async (locals, misura, pacchetto,area,regione,te) => {
    const connstandard = locals.user.connectionStandard;
    if (connstandard) {
        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connstandard
        });

        const pmisure = promiseQuery(conn, `select Id, Name, outfunds__Start_Date__c,outfunds__End_Date__c,  outfunds__Status__c, outfunds__Total_Program_Amount__c from outfunds__Funding_Program__c where IsDeleted =false and outfunds__Parent_Funding_Program__c = '' and outfunds__Total_Program_Amount__c != null order by Name`, MAX_FETCH);

        let condition = " and outfunds__Applying_Organization__r.Stato_giuridico__c = 'Attivo' and outfunds__Applying_Organization__r.Name!='Account Marketing Cloud 1' and outfunds__Applying_Organization__r.Name!='ACCOUNTSCATOLA'  and outfunds__Applying_Organization__r.Name!='XXDTD_C2' and outfunds__Applying_Organization__r.Name!='XXDTD_C' and outfunds__Applying_Organization__r.Name!='YYACN_R' ";
        if (misura !== null) {
            if(misura==='1.1 Infrastrutture digitali'){
                condition = condition + " and (outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '1.1 Infrastrutture digitali' or (outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '1.1 e 1.2 Multimisura' and hasServizi11__c =true)) ";
            }else if(misura==='1.2 Abilitazione e facilitazione migrazione al Cloud'){
                condition = condition + " and (outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '1.2 Abilitazione e facilitazione migrazione al Cloud' or (outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '1.1 e 1.2 Multimisura' and hasServizi12__c =true)) ";
            }else{
                condition = condition + " and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '" + misura + "'";
            }
        }

        if (pacchetto === "ANPR/ANSC") {
            condition = condition + " and outfunds__FundingProgram__r.Name  =  '1.4.4 Adozione ANPR ANSC - Comuni - luglio 2024'";
        } else if (pacchetto === "SPID/CIE") {
            condition = condition + " and outfunds__FundingProgram__r.Name  !=  '1.4.4 Adozione ANPR ANSC - Comuni - luglio 2024'";
        } else if (pacchetto === "PagoPA" || pacchetto === "AppIO") {
            condition = condition + " and outfunds__FundingProgram__r.Pacchetto__c  =  '" + pacchetto + "'";
        }

        if (area !== null) {
            condition = condition + " and outfunds__Applying_Organization__r.Area_geografica__c = '" + area + "'";
        }

        if (regione !== null) {
            condition = condition + " and outfunds__Applying_Organization__r.Regione__c = '" + regione + "'";
        }

        if (te !== null&&te!=='Tutti') {
            if(te!=='Altri (diversi da Comuni, Scuole, ASL)'){
                condition = condition + " and outfunds__Applying_Organization__r.Tipologia_Ente__c = '" + te + "'";
            }else{
                condition = condition + " and outfunds__Applying_Organization__r.Tipologia_Ente__c != 'Scuole' ";
                condition = condition + " and outfunds__Applying_Organization__r.Tipologia_Ente__c != 'Comuni' ";
                condition = condition + " and outfunds__Applying_Organization__r.Tipologia_Ente__c != 'ASL' ";
            }
        }


        const pInCandidatura = promiseQuery(conn, `select count(Id) numero, sum(outfunds__Awarded_Amount__c) valore, sum(Awarded_Amount_Padre_1__c) valore1, sum(Awarded_Amount_Padre_2__c) valore2 
        from outfunds__Funding_Request__c 
        where outfunds__Status__c in ('AMMESSA', 'AMMESSA CON RISERVA', 'ACCETTATA', 'IN VERIFICA') ${condition}`, MAX_FETCH);
        const pInContrattualizzazione = promiseQuery(conn, `select count(Id) numero, sum(outfunds__Awarded_Amount__c) valore, sum(Awarded_Amount_Padre_1__c) valore1, sum(Awarded_Amount_Padre_2__c) valore2 
        from outfunds__Funding_Request__c 
        where outfunds__Status__c ='FINANZIATA' and Stato_Progetto__c in ('DA AVVIARE','AVVIATO') and Data_Contrattualizzazione__c = null ${condition}`, MAX_FETCH);
        const pInRealizzazione = promiseQuery(conn, `select count(Id) numero, sum(outfunds__Awarded_Amount__c) valore, sum(Awarded_Amount_Padre_1__c) valore1, sum(Awarded_Amount_Padre_2__c) valore2 
        from outfunds__Funding_Request__c 
        where outfunds__Status__c ='FINANZIATA' and Stato_Progetto__c in ('DA AVVIARE','AVVIATO') and Data_Contrattualizzazione__c != null  and Ultimo_Esito_Conformit_Tecnica__c = '' ${condition}`, MAX_FETCH);
        const pInRevisione = promiseQuery(conn, `select count(Id) numero, sum(outfunds__Awarded_Amount__c) valore, sum(Awarded_Amount_Padre_1__c) valore1, sum(Awarded_Amount_Padre_2__c) valore2 
        from outfunds__Funding_Request__c 
        where outfunds__Status__c ='FINANZIATA' and Stato_Progetto__c in ('DA AVVIARE','AVVIATO') and Data_Contrattualizzazione__c != null  and Ultimo_Esito_Conformit_Tecnica__c != '' ${condition}`, MAX_FETCH);
        const pInVerificaTecnica = promiseQuery(conn, `select count(Id) numero, sum(outfunds__Awarded_Amount__c) valore, sum(Awarded_Amount_Padre_1__c) valore1, sum(Awarded_Amount_Padre_2__c) valore2 
        from outfunds__Funding_Request__c 
        where outfunds__Status__c ='FINANZIATA' and Stato_Progetto__c in ('COMPLETATO','IN VERIFICA') and Ultimo_Esito_Conformit_Tecnica__c != 'Positivo' and Ultimo_Esito_Conformit_Tecnica__c != 'Negativo' ${condition}`, MAX_FETCH);
        const pInRichiestaErogazione = promiseQuery(conn, `select count(Id) numero, sum(outfunds__Awarded_Amount__c) valore, sum(Awarded_Amount_Padre_1__c) valore1, sum(Awarded_Amount_Padre_2__c) valore2 
        from outfunds__Funding_Request__c 
        where outfunds__Status__c ='FINANZIATA' and Stato_Progetto__c in ('COMPLETATO') and Ultimo_Esito_Conformit_Tecnica__c in ('Positivo') ${condition}`, MAX_FETCH);
        const pInVerificaFormale = promiseQuery(conn, `select count(Id) numero, sum(outfunds__Awarded_Amount__c) valore, sum(Awarded_Amount_Padre_1__c) valore1, sum(Awarded_Amount_Padre_2__c) valore2 
        from outfunds__Funding_Request__c 
        where outfunds__Status__c ='FINANZIATA' and Stato_Progetto__c in ('IN VERIFICA') and Ultimo_Esito_Conformit_Tecnica__c in ('Positivo') ${condition}`, MAX_FETCH);
        
        const pLiquidate = promiseQuery(conn, `select count(Id) numero, sum(outfunds__Awarded_Amount__c) valore, sum(Awarded_Amount_Padre_1__c) valore1, sum(Awarded_Amount_Padre_2__c) valore2 
        from outfunds__Funding_Request__c 
        where outfunds__Status__c ='FINANZIATA' and Stato_Progetto__c in ('IN LIQUIDAZIONE','LIQUIDATO') ${condition}`, MAX_FETCH);

        const nall = Promise.all([pmisure, pInCandidatura, pInContrattualizzazione, pInRealizzazione, pInRevisione, pInVerificaTecnica, pInRichiestaErogazione, pInVerificaFormale, pLiquidate]);
        const nallvalues = await nall;

        if(misura==='1.1 Infrastrutture digitali')
        nallvalues.forEach(e => {
            if(e[0].valore1!==0){
                e[0].valore = e[0].valore-e[0].valore2
            }

        });

        if(misura==='1.2 Abilitazione e facilitazione migrazione al Cloud')
        nallvalues.forEach(e => {
            if(e[0].valore2!==0){
                e[0].valore = e[0].valore-e[0].valore1
            }
            
        });

        return {
            candidature: {
                'In candidatura': nallvalues[1],
                'In contrattualizzazione': nallvalues[2],
                'In realizzazione': nallvalues[3],
                'In revisione a seguito di verifica tecnica': nallvalues[4],
                'In verifica tecnica': nallvalues[5],
                'Va richiesta erogazione': nallvalues[6],
                'In verifica formale': nallvalues[7],
                'Liquidate': nallvalues[8]
            },
            misure: nallvalues[0],
            misura: misura,
            pacchetto: pacchetto===null?'Tutte':pacchetto,
            selectedArea: (area===null||area==='')?'ALL':area,
            selectedRegion: regione===null?'':regione,
            tipologiaEnte: te===null?'Tutti':te
        };
    } else {
        throw redirect(303, '/users');
    }
}

export async function load({ locals, url }) {
    const misura = url.searchParams.get('misura') === '' ? null : url.searchParams.get('misura');
    let pacchetto = url.searchParams.get('pacchetto') === '' ? null : url.searchParams.get('pacchetto');
    if(misura !== '1.4.3 Adozione PagoPA e AppIO' && misura !== '1.4.4 Adozione identità digitale') pacchetto=null;
    const area = url.searchParams.get('area') === ''||url.searchParams.get('area') === 'ALL' ? null : url.searchParams.get('area');
    const regione = url.searchParams.get('regione') === '' ? null : url.searchParams.get('regione');
    const te = url.searchParams.get('te') === '' ? null : url.searchParams.get('te');
    return loadData(locals, misura, pacchetto,area,regione,te);
}

