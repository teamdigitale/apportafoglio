import jsforce from 'jsforce';
import { redirect } from '@sveltejs/kit';

const MAX_FETCH = 1000000;
export async function load({ locals}) {

    let tasks = [];
    let candidature = [];



    const connstandard = locals.user.connectionStandard;
    const connasseveratore = locals.user.connectionAsseveratore;
    const connection = connstandard?connstandard:connasseveratore;

    if (connection) {
        let conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connection
        });
        const qtasks = promiseQuery(conn, `select Id, WhatId, Subject, Status, Priority, IsHighPriority, IsDeleted,  IsClosed, CreatedDate,  LastModifiedDate,   IsArchived,  TaskSubtype, Approvazione_Automatica__c,  Requirement__c,Fase_Cronoprogramma__c,  Data_fine_Asseverazione__c, Esito__c,  Data_ultima_assegnazione__c, Data_inizio_Asseverazione__c, Stato_lavorazione__c, RequirementIsFreeze__c from Task where RecordType.name = 'Controlli Conformità Tecnica'`);
        const qcandidature = promiseQuery(conn, `select Id,outfunds__Applying_Organization__r.Area_geografica__c,outfunds__Applying_Organization__r.Regione__c,outfunds__Awarded_Amount__c from outfunds__Funding_Request__c`);

        const all = Promise.all([qtasks,qcandidature]);
        const values = await all;
        tasks = values[0];
        candidature = values[1];
        tasks.forEach(t => {
            if(!t.Esito__c){t.Esito__c='In lavorazione'}
            t.candidatura = candidature.filter(c => c.Id === t.WhatId)[0];
        });
        //await conn.logout();
    } else {
        throw redirect(303, '/io');
    }

    return {
        tasks: tasks
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