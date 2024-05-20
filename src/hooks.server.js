import jsforce from 'jsforce';
import { redirect } from '@sveltejs/kit';

import { MASTERP } from '$env/static/private';
import { promiseQuery } from '$lib/index.js';
import cron from 'node-cron';
import * as d3 from 'd3';

const MAXFETCH = 9999999999;

let snappio;


const serviziAppIO = async () => {

    let conn = new jsforce.Connection({
        loginUrl: "https://login.salesforce.com"
    });
    try {
        await conn.login("fausto.mancini@padigitale2026.com", MASTERP.replaceAll("##", "$"));
    } catch (err) {
        console.log(err.message);
    }
    if (conn) {
        const servizicandidature = await promiseQuery(
            conn,
            `select Candidatura__r.outfunds__Applying_Organization__c,Candidatura__r.outfunds__Applying_Organization__r.Regione__c, Candidatura__r.outfunds__Applying_Organization__r.ShippingState, codice_catalogo_attribuito_143appIO__c
            from Servizio_Richiesta__c
            where Selezionato__c = true and Candidatura__r.outfunds__Applying_Organization__r.Tipologia_Ente__c = 'Comuni'
            and Candidatura__r.outfunds__FundingProgram__r.Pacchetto__c = 'AppIO' 
            and Candidatura__r.outfunds__Status__c in ('AMMESSA', 'AMMESSA CON RISERVA', 'ACCETTATA', 'IN VERIFICA', 'FINANZIATA')`,MAXFETCH
        )
        //).map((x) => ({ente: x.Ente__c, regione: x.Candidatura__r.outfunds__Applying_Organization__r.Regione__c, provincia: x.Candidatura__r.outfunds__Applying_Organization__r.ShippingState,  codice: x.codice_catalogo_attribuito_143appIO__c }));
        
        const gcand = d3.flatGroup(servizicandidature, (d) => d.Candidatura__r.outfunds__Applying_Organization__c,(d) => d.Candidatura__r.outfunds__Applying_Organization__r.Regione__c, (d) => d.Candidatura__r.outfunds__Applying_Organization__r.ShippingState, (d) => d.codice_catalogo_attribuito_143appIO__c).map((x) => ({ente: x[0], regione: x[1], provincia: x[2],  codice: x[3] }));
        
        
        const serviziattivi = await promiseQuery(
            conn,
            `select Ente__c, Ente__r.Regione__c, Ente__r.ShippingState,   Codice_Catalogo_Attribuito__c
            from Servizio_Attivo__c
            where Piattaforma_Servizi__c = 'AppIO'
            and Ente__r.Tipologia_Ente__c = 'Comuni' and Ente__r.Name!='Account Marketing Cloud 1' and Ente__r.Name!='ACCOUNTSCATOLA'  and Ente__r.Name!='XXDTD_C2' and Ente__r.Name!='XXDTD_C' and Name!='YYACN_R'`,MAXFETCH
        );
        const gserv = d3.flatGroup(serviziattivi, (d)=>d.Ente__c, (d)=>d.Ente__r.Regione__c, (d)=>d.Ente__r.ShippingState,   (d)=>d.Codice_Catalogo_Attribuito__c).map((x) => ({ente: x[0], regione: x[1], provincia: x[2],  codice: x[3] }));
        //).map((x) => ({ente: x.Ente__c, regione: x.Ente__r.Regione__c, provincia: x.Ente__r.ShippingState,  codice: x.Codice_Catalogo_Attribuito__c}));
        
        //const allEnti = await promiseQuery(conn, `Select Id, Name,  ShippingState,  Codice_amministrativo__c, Active__c, Area_geografica__c,  Regione__c from Account where IsDeleted = false and Tipologia_Ente__c = 'Comuni'  and  Name!='Account Marketing Cloud 1' and Name!='ACCOUNTSCATOLA'  and Name!='XXDTD_C2' and Name!='XXDTD_C' and Name!='YYACN_R' order by Name`, MAXFETCH);

        let s = d3.flatGroup(gcand.concat(gserv), d => d.ente, d => d.regione, d => d.provincia, d => d.codice).map(
            (x) => ({
                ente: x[0],
                regione: x[1],
                provincia: x[2],
                codice: x[3]
            })
        );    

        //const serviziAppIO = serviziattivi.concat(servizicandidature.filter(a => !serviziattivi.find(b => b.ente === a.ente && b.regione===a.regione && b.provincia===a.provincia && b.codice===a.codice)));

        
       return s;
    }
}

export const handle = async ({ event, resolve }) => {
    let loggedstandard = false;
    let loggedasseveratore = false;

    let cookiesfuidstd = event.cookies.get('session_id_std');
    let cookiesfuidass = event.cookies.get('session_id_ass');
    if (cookiesfuidstd) loggedstandard = true;
    if (cookiesfuidass) loggedasseveratore = true;

    if (!(loggedstandard || loggedasseveratore) && !(
        event.url.pathname === '/' ||
        event.url.pathname.startsWith('/api/oauth') ||
        event.url.pathname.startsWith('/accesso') ||
        event.url.pathname.startsWith('/users') ||
        event.url.pathname.startsWith('/opendata')
    )) {
        throw redirect(303, '/users');
    }

    let utentestandard = event.locals.utentestandard;
    let utenteasseveratore = event.locals.utenteasseveratore;


    let sessionerror = '';

    if (loggedstandard && !utentestandard) {

        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: cookiesfuidstd
        });
        let idutentesf;

        try {
            await conn.identity(function (err, res) {
                if (err) {
                    sessionerror = err.message;
                    event.cookies.delete('session_id_std', { path: '/' });
                    loggedstandard = false;
                    cookiesfuidstd = null;
                } else {
                    idutentesf = res.user_id;
                }

            });
            let soqlUtente = `select Username, Name, Title, Email, FullPhotoUrl   from User where Id = '` + idutentesf + `'`;
            let result_ = await conn.query(soqlUtente);
            utentestandard = result_.records[0];
            utentestandard.idsf = idutentesf;
        } catch (error) {
            sessionerror = error.message;
            event.cookies.delete('session_id_std', { path: '/' });
            loggedstandard = false;
            cookiesfuidstd = null;
            utentestandard = null;
        }

    }

    if (loggedasseveratore && !utenteasseveratore) {

        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: cookiesfuidass
        });
        let idutentesf;

        try {
            await conn.identity(function (err, res) {
                if (err) {
                    sessionerror = err.message;
                    event.cookies.delete('session_id_ass', { path: '/' });
                    loggedasseveratore = false;
                    cookiesfuidass = null;
                } else {
                    idutentesf = res.user_id;

                }

            });
            let soqlUtente = `select Username, Name, Title, Email, FullPhotoUrl   from User where Id = '` + idutentesf + `'`;
            let result_ = await conn.query(soqlUtente);
            utenteasseveratore = result_.records[0];
            utenteasseveratore.idsf = idutentesf;
        } catch (error) {
            sessionerror = error.message;
            event.cookies.delete('session_id_ass', { path: '/' });
            loggedasseveratore = false;
            cookiesfuidass = null;
            utenteasseveratore = null;
            
        }

    }

    if(!snappio ){
        snappio = [];
        snappio = await serviziAppIO();
        
    }

    event.locals.snappio = {snappio: snappio};
    


    event.locals.user = {
        loggedstandard: loggedstandard,
        connectionStandard: cookiesfuidstd,
        utentestandard: utentestandard,
        loggedasseveratore: loggedasseveratore,
        connectionAsseveratore: cookiesfuidass,
        utenteasseveratore: utenteasseveratore,
        sessionerror: sessionerror
    };


    return resolve(event);


};

