import jsforce from 'jsforce';
import { promiseQuery } from '$lib/index.js';
import { redirect } from '@sveltejs/kit';

const MAX_FETCH = 1000000;

async function calcola(conn, result, rolling) {
    const qpositivi = [];
    for (let z = 0; z < result.length; z++) {
        if (rolling === 0) {
            qpositivi.push(promiseQuery(conn, `select count(Id) num from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' and outfunds__Applying_Organization__r.Tipologia_Ente__c = '` + result[z].tipologiaente + `'`, MAX_FETCH));
        } else {
            qpositivi.push(promiseQuery(conn, `select count(Id) num from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' and outfunds__Applying_Organization__r.Tipologia_Ente__c = '` + result[z].tipologiaente + `'  and Data_asseverazione_tecnica__c = LAST_N_DAYS:` + rolling, MAX_FETCH));
        }
    }
    const allpositivi = Promise.all(qpositivi);
    const vallpositivi = await allpositivi;

    for (let z = 0; z < result.length; z++) {
        if (rolling === 0) {
            result[z].tecnicipositivi = vallpositivi[z][0].num;
        } else {
            result[z].tecnicipositivirolling = vallpositivi[z][0].num;
        }
    }

    const qnegativi = [];
    for (let z = 0; z < result.length; z++) {
        if (rolling === 0) {
            qnegativi.push(promiseQuery(conn, `select count(Id) num from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Negativo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' and outfunds__Applying_Organization__r.Tipologia_Ente__c = '` + result[z].tipologiaente + `'`, MAX_FETCH));
        } else {
            qnegativi.push(promiseQuery(conn, `select count(Id) num from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Negativo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' and outfunds__Applying_Organization__r.Tipologia_Ente__c = '` + result[z].tipologiaente + `'  and Data_asseverazione_tecnica__c = LAST_N_DAYS:` + rolling, MAX_FETCH));
        }
    }
    const allnegativi = Promise.all(qnegativi);
    const vallnegativi = await allnegativi;
    for (let z = 0; z < result.length; z++) {
        if (rolling === 0) {
            result[z].tecnicinegativi = vallnegativi[z][0].num;
        } else {
            result[z].tecnicinegativirolling = vallnegativi[z][0].num;
        }
    }

    const qtasks = [];
    for (let z = 0; z < result.length; z++) {
        if (rolling === 0) {
            qtasks.push(promiseQuery(conn, `select Id, CreatedDate, LastModifiedDate, Data_ultima_assegnazione__c, Esito__c from Task where RecordType.Name = 'Controlli conformità tecnica' and WhatId in (select Id from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c in ('Positivo','Negativo') and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' and outfunds__Applying_Organization__r.Tipologia_Ente__c = '` + result[z].tipologiaente + `')`, MAX_FETCH));
        } else {
            qtasks.push(promiseQuery(conn, `select Id, CreatedDate, LastModifiedDate, Data_ultima_assegnazione__c, Esito__c from Task where RecordType.Name = 'Controlli conformità tecnica' and WhatId in (select Id from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c in ('Positivo','Negativo') and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' and outfunds__Applying_Organization__r.Tipologia_Ente__c = '` + result[z].tipologiaente + `' and Data_asseverazione_tecnica__c = LAST_N_DAYS:` + rolling + ` )`, MAX_FETCH));
        }
    }
    const alltasks = Promise.all(qtasks);
    const valltasks = await alltasks;
    for (let z = 0; z < result.length; z++) {
        if (rolling === 0) {
            result[z].numeropassaggitecnici = valltasks[z].length;
            result[z].parzialitecnici = valltasks[z].filter(t => t.Esito__c === 'Parziale').length;
            result[z].numeromediopassaggi = Math.round(result[z].numeropassaggitecnici / (result[z].tecnicipositivi + result[z].tecnicinegativi) * 100) / 100;
            result[z].tempomediotecnico = Math.round(valltasks[z]
                .filter((tt) => (tt.Esito__c === 'Positivo' || tt.Esito__c === 'Negativo'))
                .reduce(
                    (a, c) =>
                        a +
                        Math.round(
                            (new Date(c.LastModifiedDate) -
                                new Date(c.CreatedDate)) /
                            (1000 * 60 * 60 * 24),
                        ),
                    0,
                ) / (result[z].tecnicipositivi + result[z].tecnicinegativi));
        } else {
            result[z].numeropassaggitecnicirolling = valltasks[z].length;
            result[z].parzialitecnicirolling = valltasks[z].filter(t => t.Esito__c === 'Parziale').length;
            result[z].numeromediopassaggirolling = Math.round(result[z].numeropassaggitecnicirolling / (result[z].tecnicipositivirolling + result[z].tecnicinegativirolling) * 100) / 100;
            result[z].tempomediotecnicorolling = Math.round(valltasks[z]
                .filter((tt) => (tt.Esito__c === 'Positivo' || tt.Esito__c === 'Negativo'))
                .reduce(
                    (a, c) =>
                        a +
                        Math.round(
                            (new Date(c.LastModifiedDate) -
                                new Date(c.CreatedDate)) /
                            (1000 * 60 * 60 * 24),
                        ),
                    0,
                ) / (result[z].tecnicipositivirolling + result[z].tecnicinegativirolling));
        }
    }


    /***************** FORMALI */
    const qpositiviformali = [];
    for (let z = 0; z < result.length; z++) {
        if (rolling === 0) {
            qpositiviformali.push(promiseQuery(conn, `select count(Id) num from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' and outfunds__Applying_Organization__r.Tipologia_Ente__c = '` + result[z].tipologiaente + `' and Stato_Progetto__c IN ('IN LIQUIDAZIONE','LIQUIDATO')`, MAX_FETCH));
        } else {
            qpositiviformali.push(promiseQuery(conn, `select count(Id) num from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' and outfunds__Applying_Organization__r.Tipologia_Ente__c = '` + result[z].tipologiaente + `' and Stato_Progetto__c IN ('IN LIQUIDAZIONE','LIQUIDATO') and Data_avanzamento_in_Liquidazione__c = LAST_N_DAYS:` + rolling, MAX_FETCH));
        }
    }
    const allpositiviformali = Promise.all(qpositiviformali);
    const vallpositiviformali = await allpositiviformali;
    for (let z = 0; z < result.length; z++) {
        if (rolling === 0) {
            result[z].formalipositivi = vallpositiviformali[z][0].num;
        } else {
            result[z].formalipositivirolling = vallpositiviformali[z][0].num;
        }
    }

    const qnegativiformali = [];
    for (let z = 0; z < result.length; z++) {
        if (rolling === 0) {
            qnegativiformali.push(promiseQuery(conn, `select count(Id) num from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' and outfunds__Applying_Organization__r.Tipologia_Ente__c = '` + result[z].tipologiaente + `' and Stato_Progetto__c = 'REVOCATO'`, MAX_FETCH));
        } else {
            qnegativiformali.push(promiseQuery(conn, `select count(Id) num from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' and outfunds__Applying_Organization__r.Tipologia_Ente__c = '` + result[z].tipologiaente + `' and Stato_Progetto__c = 'REVOCATO' and Data_Revoca_Decretata__c = LAST_N_DAYS:` + rolling, MAX_FETCH));
        }
    }
    const allnegativiformali = Promise.all(qnegativiformali);
    const vallnegativiformali = await allnegativiformali;
    for (let z = 0; z < result.length; z++) {
        if (rolling === 0) {
            result[z].formalinegativi = vallnegativiformali[z][0].num;
        } else {
            result[z].formalinegativirolling = vallnegativiformali[z][0].num;
        }
    }

    const qtasksformali = [];
    for (let z = 0; z < result.length; z++) {
        if (rolling === 0) {
            qtasksformali.push(promiseQuery(conn, `select Id, CreatedDate, LastModifiedDate, Data_ultima_assegnazione__c, Esito__c from Task where RecordType.Name = 'Controlli asseverazione formale' and WhatId in (select Id from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' and outfunds__Applying_Organization__r.Tipologia_Ente__c = '` + result[z].tipologiaente + `')`, MAX_FETCH));
        } else {
            qtasksformali.push(promiseQuery(conn, `select Id, CreatedDate, LastModifiedDate, Data_ultima_assegnazione__c, Esito__c from Task where RecordType.Name = 'Controlli asseverazione formale' and WhatId in (select Id from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' and outfunds__Applying_Organization__r.Tipologia_Ente__c = '` + result[z].tipologiaente + `' and Data_avanzamento_in_Liquidazione__c = LAST_N_DAYS:` + rolling + `)`, MAX_FETCH));
        }
    }
    const alltasksformali = Promise.all(qtasksformali);
    const valltasksformali = await alltasksformali;
    if (rolling === 0) {
        for (let z = 0; z < result.length; z++) {
            result[z].numeropassaggiformali = valltasksformali[z].length;
            result[z].parzialiformali = valltasksformali[z].filter(t => t.Esito__c === 'Parziale').length;
            result[z].numeromediopassaggiformali = Math.round(result[z].numeropassaggiformali / (result[z].formalipositivi + result[z].formalinegativi) * 100) / 100;
            result[z].tempomedioformale = Math.round(valltasksformali[z]
                .filter((tt) => (tt.Esito__c === 'Positivo' || tt.Esito__c === 'Negativo'))
                .reduce(
                    (a, c) =>
                        a +
                        Math.round(
                            (new Date(c.LastModifiedDate) -
                                new Date(c.CreatedDate)) /
                            (1000 * 60 * 60 * 24),
                        ),
                    0,
                ) / (result[z].formalipositivi + result[z].formalinegativi));
        }
    } else {
        for (let z = 0; z < result.length; z++) {
            result[z].numeropassaggiformalirolling = valltasksformali[z].length;
            result[z].parzialiformalirolling = valltasksformali[z].filter(t => t.Esito__c === 'Parziale').length;
            result[z].numeromediopassaggiformalirolling = Math.round(result[z].numeropassaggiformalirolling / (result[z].formalipositivirolling + result[z].formalinegativirolling) * 100) / 100;
            result[z].tempomedioformalerolling = Math.round(valltasksformali[z]
                .filter((tt) => (tt.Esito__c === 'Positivo' || tt.Esito__c === 'Negativo'))
                .reduce(
                    (a, c) =>
                        a +
                        Math.round(
                            (new Date(c.LastModifiedDate) -
                                new Date(c.CreatedDate)) /
                            (1000 * 60 * 60 * 24),
                        ),
                    0,
                ) / (result[z].formalipositivirolling + result[z].formalinegativirolling));
        }
    }
}

export async function load({ locals }) {

    const connstandard = locals.user.connectionStandard;
    const connection = connstandard;

    if (connection) {
        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connection
        });

        /*
        const qtasktecnici = promiseQuery(conn, `select Id, Esito__c, CreatedDate, LastModifiedDate, Data_ultima_assegnazione__c, WhatId
        from Task where RecordType.Name = 'Controlli conformità tecnica'`, MAX_FETCH);
        const qtaskformali = promiseQuery(conn, `select Id, Esito__c, CreatedDate, LastModifiedDate, Data_ultima_assegnazione__c, WhatId
        from Task where RecordType.Name = 'Controlli asseverazione formale'`, MAX_FETCH);
        */
        const qcandidature = promiseQuery(conn, `select Id, outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name, outfunds__Applying_Organization__r.Tipologia_Ente__c, Ultimo_Esito_Conformit_Tecnica__c, Stato_Progetto__c from outfunds__Funding_Request__c  where outfunds__Status__c IN ('FINANZIATA','RINUNCIATA','REVOCATA') and Stato_contrattualizzazione__c = 'Completata'`, MAX_FETCH);

        const all = Promise.all([qcandidature]);
        const values = await all;

        const result = [];
        values[0].forEach(c => {
            const resmisura = result.filter((r) => r.misura === c.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name);
            if (resmisura.length === 0) {
                result.push({ misura: c.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name, tipologiaente: c.outfunds__Applying_Organization__r.Tipologia_Ente__c });
            }
        });
        values[0].forEach(c => {
            const restipologiaente = result.filter((r) => r.misura === c.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name && r.tipologiaente === c.outfunds__Applying_Organization__r.Tipologia_Ente__c);
            if (restipologiaente.length === 0) {
                result.push({ misura: c.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name, tipologiaente: c.outfunds__Applying_Organization__r.Tipologia_Ente__c });
            }
        });


        await calcola(conn, result, 0);
        await calcola(conn, result, 30);

        return {
            data: result
        };

    } else {
        throw redirect(303, '/io');
    }

}