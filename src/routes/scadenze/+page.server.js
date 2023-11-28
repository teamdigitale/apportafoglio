import jsforce from 'jsforce';
import { promiseQuery } from '$lib/index.js';
import { getUtenteStandard, getUtenteAsseveratore } from '$lib/userdb';
import { redirect } from '@sveltejs/kit';

const MAX_FETCH = 1000000;

export async function load({ cookies }) {

    const ustd = getUtenteStandard(cookies);
   
    if (ustd) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        await conn.login(ustd.email, ustd.password + ustd.token);
        const qscadenze = promiseQuery(conn, `
        select 
        outfunds__Funding_Request__r.Id, 
        RecordType.Name,
        outfunds__Funding_Request__r.outfunds__Applying_Organization__r.name, 
        outfunds__Funding_Request__r.outfunds__FundingProgram__r.Name,  
        outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Tipologia_Ente__c,
        outfunds__Funding_Request__r.outfunds__Status__c, 
        outfunds__Funding_Request__r.Stato_Progetto__c,  
        Id, Name, CreatedDate, LastModifiedDate, outfunds__Due_Date__c, outfunds__Funding_Request__c, outfunds__Requirements__c, outfunds__Status__c, Id_Comunicazione__c, Is_Comunicazione__c,  Urgenza__c, Oggetto__c, Regione__c, Estensione_cronoprogramma_automatica__c  
        from outfunds__Requirement__c 
        where outfunds__Status__c!='Complete' 
        and outfunds__Due_Date__c >= today
        and outfunds__Status__c!='Annullato' 
        and outfunds__Status__c!='ANNULLATA'  
        and outfunds__Status__c!='Freezato' 
        and RecordType.SobjectType = 'outfunds__Requirement__c' 
        and (RecordType.Name = 'Contrattualizzazione Fornitore' or RecordType.Name = 'Completamento Attività')
        and outfunds__Funding_Request__c in (select Id from outfunds__Funding_Request__c where outfunds__Applying_Organization__r.IsDeleted = false and (outfunds__Applying_Organization__r.Account_Manager__c = '` + ustd.idutentesf + `' or outfunds__Applying_Organization__r.Tech_Implementation_User__c = '` + ustd.idutentesf + `')) 
        order by outfunds__Due_Date__c 
        `, MAX_FETCH);
        
        const qvariazioni = promiseQuery(conn, `select Id, WhatId, Subject, IsClosed, CreatedDate, LastModifiedDate, Approvazione_Automatica__c,  Data_richiesta__c, Data_scadenza_iniziale__c, Giorni_richiesti__c, Motivazione_Rifiuto__c, Description  from Task where RecordType.Name = 'Variazione Cronoprogramma' and RecordType.SobjectType = 'Task' and status!='Completed' and status!='Rigettato' order by CreatedDate desc`, MAX_FETCH);
        
        const qcommentirv = promiseQuery(conn,`select 
        Parent.Id,
        Id, Type, CreatedById, CreatedDate, IsDeleted, LastModifiedDate, SystemModstamp, CommentCount, LikeCount, Title, Body, LinkUrl, IsRichText, RelatedRecordId, InsertedById, NetworkScope, Visibility 
        from TaskFeed 
        where Type = 'TextPost' and Parent.Subject = 'Richiesta Variazione Cronoprogramma' and Parent.Giorni_richiesti__c >= 90
        and Parent.RecordType.SobjectType = 'Task' and Parent.status!='Completed' and Parent.status!='Rigettato'`);
        
        const all = Promise.all([qscadenze,qvariazioni,qcommentirv]);
        const values = await all;
        await conn.logout();
        for(let z = 0; z<values[1].length; z++){
            values[1][z].comm=values[2].filter(r => r.Parent.Id===values[1][z].Id);
        }

        for(let z = 0; z<values[0].length; z++){
            values[0][z].rv=values[1].filter(r => r.WhatId===values[0][z].outfunds__Funding_Request__r.Id);
            
        }
        return {
            scadenze: values[0],
            idusf: ustd.idutentesf
        };
    } else {
        throw redirect(303, '/io');
    }

}