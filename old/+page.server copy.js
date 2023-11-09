import jsforce from 'jsforce';
import { asyncCaricaCandidature, caricaCandidature } from '../../../logic/candidature.js';
import { asyncLoadEntiAPortafoglio, loadEntiAPortafoglio } from '../../../logic/enti.js';
import { asyncCaricaAvvisi, asyncCaricaMisure, caricaAvvisi, caricaMisure } from '../../../logic/misure.js';
import { asyncCaricaRequirement } from '../../../logic/requirements.js';
import { getUtenteStandard } from '../../../logic/userdb';



export async function load({ cookies }) {
    let misure = [];
    let avvisi = [];
    let candidature = [];
    let enti = [];
    let requirementsContrattualizzazione = [];
    let requirementsCompletamentoAttivita = [];

    const ustd = getUtenteStandard(cookies);

    if (ustd) {
        /*
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        await conn.login(ustd.email, ustd.password + ustd.token);
        */

        //misure = misure.concat(await caricaMisure(conn));
        //avvisi = avvisi.concat(await caricaAvvisi(conn));
        

        let pmisure = new Promise(async function (resolve, reject) {
            misure = misure.concat(await asyncCaricaMisure(ustd));
        });

        let pavvisi = new Promise(async function (resolve, reject) {
            avvisi = avvisi.concat(await asyncCaricaAvvisi(ustd));
        });

        let penti = new Promise(async function (resolve, reject) {
            enti = enti = enti.concat(await asyncLoadEntiAPortafoglio(ustd, 'Standard'));
        });

        let preqcontr = new Promise(async function (resolve, reject) {
            requirementsContrattualizzazione = requirementsContrattualizzazione.concat(await asyncCaricaRequirement(ustd, 'Contrattualizzazione fornitore'));
        });

        let preqcomp = new Promise(async function (resolve, reject) {
            requirementsCompletamentoAttivita = requirementsCompletamentoAttivita.concat(await asyncCaricaRequirement(ustd, 'Completamento Attività'));
        });

        let pcand = new Promise(async function (resolve, reject) {
            candidature = candidature.concat(await asyncCaricaCandidaturecaricaCandidature(ustd));
        });

        Promise.all([penti,pavvisi,pmisure,preqcomp,preqcontr,pcand]);
        
        /* Elaborazione */
        misure.forEach((m) => {
            //console.log("MISURA: " + m.Name);
            //console.log("Avvisi per misura: " + avvisi.filter((a) => a.outfunds__Parent_Funding_Program__c === m.Id).length);
            //console.log("Avvisi aperti per misura: " + avvisi.filter((a) => a.outfunds__Status__c === 'PUBBLICATO').filter((a) => a.outfunds__Parent_Funding_Program__c === m.Id).length);
            //console.log("Avvisi chiusi per misura: " + avvisi.filter((a) => a.outfunds__Status__c !== 'PUBBLICATO').filter((a) => a.outfunds__Parent_Funding_Program__c === m.Id).length);
            m.avvisiAperti = avvisi.filter((a) => a.outfunds__Status__c === 'PUBBLICATO').filter((a) => a.outfunds__Parent_Funding_Program__c === m.Id);
            m.avvisiChiusi = avvisi.filter((a) => a.outfunds__Status__c !== 'PUBBLICATO').filter((a) => a.outfunds__Parent_Funding_Program__c === m.Id);
        })
        //await conn.logout();
    }


    candidature.forEach(c => {
        let checkcontr = requirementsContrattualizzazione.filter(x => x.outfunds__Funding_Request__c === c.Id);
        if (checkcontr && checkcontr.length > 0) {
            c.reqcontr = checkcontr[0];
        }
    })
    return {
        misure: misure,
        enti: enti,
        avvisi: avvisi,
        candidature: candidature
    };
}
