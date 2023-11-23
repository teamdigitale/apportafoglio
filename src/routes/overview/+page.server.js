import jsforce from 'jsforce';
import {getUtenteStandard } from '../../lib/userdb.js';

const MAX_FETCH = 1000000;

const AREE = ["SUD_OVEST","SUD_EST","CENTRO","NORD_EST","NORD_OVEST","CENTRO"];

export async function load({ cookies, params }) {
    const u = getUtenteStandard(cookies);

    if (u) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        await conn.login(u.email, u.password + u.token);
        const promises = [];
        AREE.forEach(area => {
            promises.push(promiseQuery(conn, `select Id,IsDeleted,CreatedDate,LastModifiedDate,outfunds__Application_Date__c,outfunds__Applying_Organization__r.Name,outfunds__Applying_Organization__r.Tipologia_Ente__c ,outfunds__Applying_Organization__r.Area_geografica__c,  outfunds__Awarded_Amount__c,outfunds__Awarded_Date__c,outfunds__Close_Date__c,outfunds__Closed_reason__c,outfunds__FundingProgram__r.Name,outfunds__FundingProgram__r.Pacchetto__c,outfunds__Status__c,Ammissibilit__c,Cluster__r.Name,Codice_CUP__c,Data_Finanziamento__c,Data_Ricezione_CUP__c,Data_invio_candidatura__c,Finestra_Temporale__c,Misura__c,Regione__c,Contrattualizzazione_Fornitori__c,Data_conclusione__c,Stato_Progetto__c,Data_avanzamento_in_Liquidato__c,Data_Contrattualizzazione__c,Stato_contrattualizzazione__c from outfunds__Funding_Request__c where outfunds__Applying_Organization__r.Area_geografica__c = '`+area+`'`));
        });
        const all = Promise.all(promises);
        const values = await all;
/*
        tecnici = values[0];
        formali = values[1];
        servizi = values[2];
        fsaas = values[3];
        fpaas = values[4];
        fiaas = values[5];
        */
        await conn.logout();

    } else {
        throw redirect(303, '/io');
    }

    return {
     
    };
}

const promiseQuery = (conn, q) => {
    return new Promise((resolve, reject) => {
        const records = [];
        conn.query(q)
            .on("record", function (record) {
                records.push(record);
            })
            .on("end", function () {
                resolve(records);
            })
            .on("error", function (err) {
                console.error(err);
                reject([]);
            })
            .run({ autoFetch: true, maxFetch: MAX_FETCH });
    });
}
