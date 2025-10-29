// @ts-nocheck
import { promiseQuery } from '$lib';
import { redirect } from '@sveltejs/kit';
import jsforce from 'jsforce';
import popolazioneregioni from '$lib/popolazione.json';

const MAX_FETCH = 1000000;

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const connstandard = locals.user.connectionStandard;
    if (connstandard) {
        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connstandard
        });
        const qenti = promiseQuery(conn, `select Id,Name,Area_geografica__c, Regione__c, ShippingState, Active__c, Tipologia_Ente__c from Account where Regione__c != null`, MAX_FETCH);
        const qcandidature = promiseQuery(conn, `select sum(outfunds__Awarded_Amount__c) awarded, count(id) num_cand, outfunds__Applying_Organization__r.Regione__c,Stato_Progetto__c,outfunds__Applying_Organization__r.Tipologia_Istat__c, outfunds__Applying_Organization__r.Tipologia_Istat_eccezioni__c from outfunds__Funding_Request__c where outfunds__Status__c = 'FINANZIATA' group by outfunds__Applying_Organization__r.Regione__c ,Stato_Progetto__c , outfunds__Applying_Organization__r.Tipologia_Istat__c, outfunds__Applying_Organization__r.Tipologia_Istat_eccezioni__c`, MAX_FETCH);
        const qbeneficiari = promiseQuery(conn, `select Id,outfunds__Parent_Funding_Program__r.Id, SOGGETTI_DESTINATARI__c from outfunds__Funding_Program__c where outfunds__Parent_Funding_Program__c != null`, MAX_FETCH);
        
        const all = Promise.all([qenti,qcandidature,qbeneficiari]);
        const values = await all;
        const enti = values[0];
        const candidature = values[1].map(c => {return {importo_finanziato: c.awarded, numero_candidature: c.num_cand, regione: c.Regione__c, stato_progetto: c.Stato_Progetto__c, tipologia_ente: mapTipologiaEnte(c.Tipologia_Istat__c,c.Tipologia_Istat_eccezioni__c)}});
        const b = values[2];
        const beneficiari = [];
        for(let z=0;z<b.length;z++){
            let bb = b[z].SOGGETTI_DESTINATARI__c.split(";");
            bb.forEach(e => {
                if(beneficiari.indexOf(e)===-1){
                    beneficiari.push(e);
                }
            });
        } 

        return {
            enti: enti,
            candidature: candidature,
            beneficiari: beneficiari,
            popolazione: popolazioneregioni.popolazione
        };
    } else {
        throw redirect(303, '/users');
    }

}

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
