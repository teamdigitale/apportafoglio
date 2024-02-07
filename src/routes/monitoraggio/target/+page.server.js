import t from './targets.json';
import jsforce from 'jsforce';
import { promiseQuery } from '$lib/index.js';
import { redirect } from '@sveltejs/kit';

const MAX_FETCH = 1000000;

export async function load({ locals }) {

    const connstandard = locals.user.connectionStandard;
    const connection = connstandard;

    if (connection) {
        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connection
        });

        //PLATEE

        let platee = await promiseQuery(conn, `select count(id) c, 
        Regione__c, Tipologia_Istat__c, Tipologia_Istat_eccezioni__c 
        from Account
        where Tipologia_Istat__c != ''
        group by Regione__c, Tipologia_Istat__c, Tipologia_Istat_eccezioni__c`, MAX_FETCH);
        platee = platee.map((x) => {
            return { area: mapArea(x.Regione__c), regione: x.Regione__c, tipologia_ente: mapTipologiaEnte(x.Tipologia_Istat__c, x.Tipologia_Istat_eccezioni__c), c: x.c }
        }
        );
        platee = platee.reduce((r, { area, regione, tipologia_ente, c }) => {
            let temp = r.find(o => o.area === area && o.regione === regione && o.tipologia_ente===tipologia_ente);
            if (temp) {
                temp.c += c;
            } else {
                r.push({ area, regione, tipologia_ente, c });
            }
            return r;
        }, []);


        const qtargetM1C1_139 = promiseQuery(conn, `select count(id) c, 
        outfunds__Applying_Organization__r.Regione__c, outfunds__Applying_Organization__r.Tipologia_Istat__c, outfunds__Applying_Organization__r.Tipologia_Istat_eccezioni__c 
        from outfunds__Funding_Request__c 
        where outfunds__Applying_Organization__r.Tipologia_Istat__c != ''
        and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '1.2 Abilitazione e facilitazione migrazione al Cloud'
        and outfunds__Status__c = 'FINANZIATA' and Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and Data_asseverazione_tecnica__c <= 2024-09-30T23:59:59Z
        group by outfunds__Applying_Organization__r.Regione__c, outfunds__Applying_Organization__r.Tipologia_Istat__c, outfunds__Applying_Organization__r.Tipologia_Istat_eccezioni__c`, MAX_FETCH);

        const qtargetM1C1_147 = promiseQuery(conn, `select count(id) c, 
        outfunds__Applying_Organization__r.Regione__c, outfunds__Applying_Organization__r.Tipologia_Istat__c, outfunds__Applying_Organization__r.Tipologia_Istat_eccezioni__c 
        from outfunds__Funding_Request__c 
        where outfunds__Applying_Organization__r.Tipologia_Istat__c != ''
        and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '1.2 Abilitazione e facilitazione migrazione al Cloud'
        and outfunds__Status__c = 'FINANZIATA' and Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and Data_asseverazione_tecnica__c <= 2026-06-30T23:59:59Z
        group by outfunds__Applying_Organization__r.Regione__c, outfunds__Applying_Organization__r.Tipologia_Istat__c, outfunds__Applying_Organization__r.Tipologia_Istat_eccezioni__c`, MAX_FETCH);

        const qtargetM1C1_140 = promiseQuery(conn, `select count(id) c, 
        outfunds__Applying_Organization__r.Regione__c, outfunds__Applying_Organization__r.Tipologia_Istat__c, outfunds__Applying_Organization__r.Tipologia_Istat_eccezioni__c 
        from outfunds__Funding_Request__c 
        where outfunds__Applying_Organization__r.Tipologia_Istat__c != ''
        and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '1.4.1 Esperienza del cittadino nei servizi pubblici'
        and outfunds__Status__c = 'FINANZIATA' and Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and Data_asseverazione_tecnica__c <= 2024-12-31T23:59:59Z
        group by outfunds__Applying_Organization__r.Regione__c, outfunds__Applying_Organization__r.Tipologia_Istat__c, outfunds__Applying_Organization__r.Tipologia_Istat_eccezioni__c`, MAX_FETCH);

        const qtargetM1C1_148 = promiseQuery(conn, `select count(id) c, 
        outfunds__Applying_Organization__r.Regione__c, outfunds__Applying_Organization__r.Tipologia_Istat__c, outfunds__Applying_Organization__r.Tipologia_Istat_eccezioni__c 
        from outfunds__Funding_Request__c 
        where outfunds__Applying_Organization__r.Tipologia_Istat__c != ''
        and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '1.4.1 Esperienza del cittadino nei servizi pubblici'
        and outfunds__Status__c = 'FINANZIATA' and Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and Data_asseverazione_tecnica__c <= 2026-06-30T23:59:59Z
        group by outfunds__Applying_Organization__r.Regione__c, outfunds__Applying_Organization__r.Tipologia_Istat__c, outfunds__Applying_Organization__r.Tipologia_Istat_eccezioni__c`, MAX_FETCH);

        const all = Promise.all([qtargetM1C1_139, qtargetM1C1_147,qtargetM1C1_140,qtargetM1C1_148]);
        const values = await all;

        for(let z=0; z<values.length;z++){
            values[z] = values[z].map((x) => {
                return { area: mapArea(x.Regione__c), regione: x.Regione__c, tipologia_ente: mapTipologiaEnte(x.Tipologia_Istat__c, x.Tipologia_Istat_eccezioni__c), c: x.c }
            }
            );
            values[z] = values[z].reduce((r, { area, regione, tipologia_ente, c }) => {
                let temp = r.find(o => o.area === area && o.regione === regione && o.tipologia_ente===tipologia_ente);
                if (temp) {
                    temp.c += c;
                } else {
                    r.push({ area, regione, tipologia_ente, c });
                }
                return r;
            }, []);
        }

        let targetM1C1_139 = values[0];
        let targetM1C1_147 = values[1];
        let targetM1C1_140 = values[2];
        let targetM1C1_148 = values[3];

        targetM1C1_139 = targetM1C1_139.filter(x => x.tipologia_ente==='Comuni' || x.tipologia_ente==='Scuole' || x.tipologia_ente==='ASL');
        targetM1C1_139 = targetM1C1_147.filter(x => x.tipologia_ente==='Comuni' || x.tipologia_ente==='Scuole' || x.tipologia_ente==='ASL');

        targetM1C1_140 = targetM1C1_140.filter(x => x.tipologia_ente==='Comuni' || x.tipologia_ente==='Scuole' );
        targetM1C1_148 = targetM1C1_148.filter(x => x.tipologia_ente==='Comuni' || x.tipologia_ente==='Scuole' );

        return {
            t: t,
            platee: platee,
            targetM1C1_139: targetM1C1_139,
            targetM1C1_147: targetM1C1_147,
            targetM1C1_140: targetM1C1_140,
            targetM1C1_148: targetM1C1_148
        };

    } else {
        throw redirect(303, '/users');
    }

}

function mapArea(regione) {
    if (regione) {
        if (regione === 'Abruzzo' || regione === 'Basilicata' || regione === 'Molise' || regione === 'Puglia') {
            return 'SUD EST';
        } else if (regione === 'Campania' || regione === 'Sicilia' || regione === 'Calabria') {
            return 'SUD OVEST';
        } else if (regione === 'Lombardia') {
            return 'LOMBARDIA';
        } else if (regione === 'Emilia-Romagna' || regione === 'Veneto' || regione === 'Friuli-Venezia Giulia' || regione === 'Trentino-Alto Adige/Südtirol') {
            return 'NORD EST';
        } else if (regione === 'Liguria' || regione === 'Piemonte' || regione === "Valle d'Aosta/Vallée d'Aoste") {
            return 'NORD OVEST';
        } else if (regione === 'Lazio' || regione === 'Toscana' || regione === 'Umbria' || regione === 'Marche'|| regione === 'Sardegna') {
            return 'CENTRO';
        }
    } else {
        'NON DEFINITA';
    }
}

//TODO verificare
function mapTipologiaEnte(ti, tie) {
    let t = tie ? tie : ti;
    if (t.toUpperCase() === 'Comune'.toUpperCase()) t = 'Comuni';
    else if (t.toUpperCase() === 'Agenzie Regionali Sanitarie'.toUpperCase()) t = 'ASL';
    else if (t.toUpperCase() === 'Aziende Sanitarie Locali'.toUpperCase()) t = 'ASL';
    else if (t.toUpperCase() === 'Aziende Ospedaliere, Aziende Ospedaliere Universitarie, Policlinici e Istituti di Ricovero e Cura a Carattere Scientifico Pubblici'.toUpperCase()) t = 'ASL';
    else if (t.toUpperCase() === 'REGIONI'.toUpperCase()) t = 'Enti regionali';
    else if (t.toUpperCase() === 'Trentino Alto Adige'.toUpperCase()) t = 'Enti regionali';
    else if (t.toUpperCase() === 'PROVINCE AUTONOME'.toUpperCase()) t = 'PROVINCE AUTONOME';
    else if (t.toUpperCase() === 'Aziende Pubbliche di Servizi alla Persona'.toUpperCase()) t = 'Aziende Pubbliche di Servizi alla Persona';
    else if (t.toUpperCase() === 'Istituzioni per l’Alta Formazione Artistica, Musicale e Coreutica - AFAM'.toUpperCase()) t = 'Istituti di ricerca e AFAM';
    else if (t.toUpperCase() === 'Enti e Istituzioni di Ricerca Pubblici'.toUpperCase()) t = 'Istituti di ricerca e AFAM';
    else if (t.toUpperCase() === 'Agenzie, Enti e Consorzi Pubblici per il Diritto allo Studio Universitario'.toUpperCase()) t = 'Istituti di ricerca e AFAM';
    else if (t.toUpperCase() === 'Consorzi Interuniversitari di Ricerca'.toUpperCase()) t = 'Istituti di ricerca e AFAM';
    else if (t.toUpperCase() === 'Agenzie Fiscali'.toUpperCase()) t = 'PA Centrali';
    else if (t.toUpperCase() === "Autorita' Amministrative Indipendenti".toUpperCase()) t = 'PA Centrali';
    else if (t.toUpperCase() === "Forze di Polizia ad Ordinamento Civile e Militare per la Tutela dell'Ordine e della Sicurezza Pubblica".toUpperCase()) t = 'PA Centrali';
    else if (t.toUpperCase() === 'PA Centrali'.toUpperCase()) t = 'PA Centrali';
    else if (t.toUpperCase() === 'PROVINCE E CITTA’ METROPOLITANE'.toUpperCase()) t = 'PROVINCE';
    else if (t.toUpperCase() === 'Organi Costituzionali e di Rilievo Costituzionale'.toUpperCase()) t = 'PA Centrali';
    else if (t.toUpperCase() === 'Enti di Previdenza ed Assistenza Sociale in Conto Economico Consolidato pubblici'.toUpperCase()) t = 'PA Centrali';
    else if (t.toUpperCase() === 'Presidenza del Consiglio dei Ministri, Ministeri e Avvocatura dello Stato'.toUpperCase()) t = 'PA Centrali';
    else if (t.toUpperCase() === 'Pubbliche Amministrazioni'.toUpperCase()) t = 'PA Centrali';
    else if (t.toUpperCase() === "Universita' e Istituti di Istruzione Universitaria Pubblici".toUpperCase()) t = 'Università';
    else if (t.toUpperCase() === "Citta' Metropolitane".toUpperCase()) t = 'PROVINCE';
    else if (t.toUpperCase() === 'Istituti Zooprofilattici Sperimentali'.toUpperCase()) t = 'Istituti Zooprofilattici Sperimentali';
    else if (t.toUpperCase() === 'Istituti di Istruzione Statale di Ogni Ordine e Grado'.toUpperCase()) t = 'Scuole';
    else if (t.toUpperCase() === 'Aree Organizzative Omogenee'.toUpperCase()) t = 'AOO ';
    else t = 'Altri Enti';
    return t;
}