import { redirect } from '@sveltejs/kit';
import jsforce from 'jsforce';

const MAX_FETCH = 1000000;

export async function load({ locals }) {

    let servizi = [];
    let misure = [];
    let clusters = [];
    let catalogo = [];
    let candidature = [];

    const connstandard = locals.user.connectionStandard;
    const connasseveratore = locals.user.connectionAsseveratore;

    if (connstandard || connasseveratore) {
        if (connstandard) {
            const conn = new jsforce.Connection({
                instanceUrl: "https://padigitale2026.my.salesforce.com",
                accessToken: connstandard
            });
            let idutentesf;
            await conn.identity(function (err, res) {
                idutentesf = res.user_id;
            });
            const anagMisure = promiseQuery(conn, `select Id,Name from outfunds__Funding_Program__c where outfunds__Parent_Funding_Program__c = null order by Name`);
            const anagCluster = promiseQuery(conn, `select Id, Name, Canone__c, Considera_Advanced_Price__c, Misura__c, Numero_Max_Servizi__c, Numero_Min_Servizi__c, Pacchetto__c, Prezzo_Tipologia__c, Range__c, Tipologia_Ente__c, Range_classificazione__c, PA_non_clusterizzata__c, Soglia_Variazione_Cronoprogramma__c, Costo_Unit_Critico__c, Costo_Unit_Ordinario__c, Numero_Max_Servizi_2__c, Numero_Min_Servizi_2__c, Numero_Massimo_Servizi_Fisici__c, Numero_Massimo_Servizi_Virtuali__c, Numero_Minimo_Servizi_Fisici__c, Numero_Minimo_Servizi_Virtuali__c, Soglia_Importo_Massimo__c, Soglia_Importo_Minimo__c, Nuovo_Avviso_1_4_3_App_IO__c from Cluster__c`);
            const anagCatalogo = promiseQuery(conn, `select Id, OwnerId, IsDeleted, Name, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, Advanced_Price__c, Anagrafica_Servizi__c, Basic_Price__c, Classificazione__c, Cluster__c, Essenziale__c, Obsoleto__c, Servizio_Obbligatorio__c from Catalogo_Servizi__c`);
            const anagServizi = promiseQuery(conn, `select Id, OwnerId, IsDeleted, Name, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastViewedDate, LastReferencedDate, Categoria__c, Descrizione__c, Normativa_di_riferimento__c, Codice_Tassonomico__c, Data_di_disattivazione__c, Servizio_a_pagamento__c from Anagrafica_Servizi__c`);
            const cc = promiseQuery(conn, `select Servizio__r.Anagrafica_Servizi__r.Id, Id, Name, Candidatura__r.Id, Candidatura__r.outfunds__Status__c, Candidatura__r.Misura__c, Candidatura__r.outfunds__Applying_Organization__r.Name,Candidatura__r.Regione__c, Candidatura__r.Codice_CUP__c  from Servizio_Richiesta__c  where Candidatura__c in (select Id from outfunds__Funding_Request__c where outfunds__Applying_Organization__r.Account_Manager__c = '` + idutentesf + `' or outfunds__Applying_Organization__r.Tech_Implementation_User__c = '` + idutentesf + `')  and Servizio__r.Anagrafica_Servizi__r.Id != null and Candidatura__r.outfunds__Status__c = 'FINANZIATA' and Selezionato__c = true`);
            const all = Promise.all([anagMisure, anagCluster, anagCatalogo, anagServizi, cc]);
            const values = await all;
            misure = values[0];
            clusters = values[1];
            catalogo = values[2];
            servizi = values[3];
            candidature = values[4];
            return {
                anagraficaMisure: misure,
                anagraficaClusters: clusters,
                anagraficaServizi: servizi,
                anagraficaCatalogo: catalogo,
                candidature: candidature
            };

        } else {
            throw redirect(303, '/io');
        }
    }
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
