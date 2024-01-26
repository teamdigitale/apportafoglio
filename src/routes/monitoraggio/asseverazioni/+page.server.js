import jsforce from 'jsforce';
import { promiseQuery } from '$lib/index.js';
import { redirect } from '@sveltejs/kit';

const MAX_FETCH = 1000000;

let compressed = true;

async function calcolaAndamenti(conn, result) {
    const qandamentitecnicipositivi = [];
    for (let z = 0; z < result.length; z++) {
        qandamentitecnicipositivi.push(promiseQuery(conn, `select count(Id) tecnicipositivi, calendar_year(Data_asseverazione_tecnica__c ) anno, calendar_month(Data_asseverazione_tecnica__c ) mese from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' ` +calcolaClausola("  outfunds__Applying_Organization__r.Tipologia_Ente__c ",result[z].tipologiaente)+ ` group by calendar_year(Data_asseverazione_tecnica__c ), calendar_month(Data_asseverazione_tecnica__c ) order by calendar_year(Data_asseverazione_tecnica__c ), calendar_month(Data_asseverazione_tecnica__c )`, MAX_FETCH));
    }
    const allandamentitecnicipositivi = Promise.all(qandamentitecnicipositivi);
    const vallandamentitecnicipositivi = await allandamentitecnicipositivi;
    for (let z = 0; z < result.length; z++) {
            result[z].andamentotecnicipositivi = vallandamentitecnicipositivi[z];
    }

    const qandamentiformalipositivi = [];
    for (let z = 0; z < result.length; z++) {
        qandamentiformalipositivi.push(promiseQuery(conn, `select count(Id) formalipositivi, calendar_year(Data_avanzamento_in_Liquidazione__c) anno, calendar_month(Data_avanzamento_in_Liquidazione__c) mese from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' ` +calcolaClausola("  outfunds__Applying_Organization__r.Tipologia_Ente__c ",result[z].tipologiaente)+ ` and Stato_Progetto__c IN ('IN LIQUIDAZIONE','LIQUIDATO') group by calendar_year(Data_avanzamento_in_Liquidazione__c ), calendar_month(Data_avanzamento_in_Liquidazione__c) order by calendar_year(Data_avanzamento_in_Liquidazione__c), calendar_month(Data_avanzamento_in_Liquidazione__c)`, MAX_FETCH));
    }
    const allandamentiformalipositivi = Promise.all(qandamentiformalipositivi);
    const vallandamentiformalipositivi = await allandamentiformalipositivi;
    for (let z = 0; z < result.length; z++) {
            result[z].andamentoformalipositivi = vallandamentiformalipositivi[z];
    }

    const qandamentirinunce = [];
    for (let z = 0; z < result.length; z++) {
        qandamentirinunce.push(promiseQuery(conn, `select count(Id) rinunciati, calendar_year(Data_Rinuncia__c ) anno, calendar_month(Data_Rinuncia__c ) mese from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' ` +calcolaClausola("  outfunds__Applying_Organization__r.Tipologia_Ente__c ",result[z].tipologiaente)+ ` and outfunds__Status__c = 'RINUNCIATA' group by calendar_year(Data_Rinuncia__c ), calendar_month(Data_Rinuncia__c ) order by calendar_year(Data_Rinuncia__c ), calendar_month(Data_Rinuncia__c )`, MAX_FETCH));
    }
    const allandamentirinunce= Promise.all(qandamentirinunce);
    const vallandamentirinunce = await allandamentirinunce;
    for (let z = 0; z < result.length; z++) {
            result[z].andamentorinunce = vallandamentirinunce[z];
    }

}

function calcolaClausola(left,tipologiaente){
    let res = '';
    
    if(!compressed){
        res = " and "+left+" ='"+tipologiaente+"'";
    }else{
        if(tipologiaente!=='Tutti'){
            if(tipologiaente==='Altri'){
                res = " and "+left+" != 'Comuni' and "+left+" != 'Scuole' "
            }else{
                res = " and "+left+" ='"+tipologiaente+"'";
            }
        }

       
    }
    return res;
}

async function calcola(conn, result, rolling) {

    const qtempimedi = [];

    for (let z = 0; z < result.length; z++) {
        if (rolling === 0) {
            qtempimedi.push(promiseQuery(conn, `select Data_Contrattualizzazione__c, Data_completamento_attivit__c from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' `+calcolaClausola("  outfunds__Applying_Organization__r.Tipologia_Ente__c ",result[z].tipologiaente)+` order by Data_completamento_attivit__c`, MAX_FETCH));
        } else {
            qtempimedi.push(promiseQuery(conn, `select Data_Contrattualizzazione__c, Data_completamento_attivit__c from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' `+ calcolaClausola("  outfunds__Applying_Organization__r.Tipologia_Ente__c ",result[z].tipologiaente)+ ` and Data_asseverazione_tecnica__c = LAST_N_DAYS:` + rolling+' order by Data_completamento_attivit__c', MAX_FETCH));
        }
    }
    const alltempimedi = Promise.all(qtempimedi);
    const valltempimedi = await alltempimedi;

    for (let z = 0; z < result.length; z++) {
        let tempoMedioA = [0,0];
        for(let y=0; y<valltempimedi[z].length; y++){
            let tm = Math.ceil((new Date(valltempimedi[z][y].Data_completamento_attivit__c)-new Date(valltempimedi[z][y].Data_Contrattualizzazione__c))/(1000 * 60 * 60 * 24));
            tm = tm<0?0:tm;
            tempoMedioA[0] = tempoMedioA[0]+ tm;
            tempoMedioA[1] = tempoMedioA[1]+1;
        }
        if (rolling === 0) {
            result[z].tempomediocompletamento = Math.round(tempoMedioA[0]/tempoMedioA[1]);
        } else {
            result[z].tempomediocompletamentorolling = Math.round(tempoMedioA[0]/tempoMedioA[1]);
        }
    }


    const qpositivi = [];
    for (let z = 0; z < result.length; z++) {
        if (rolling === 0) {
            qpositivi.push(promiseQuery(conn, `select count(Id) num from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' ` + calcolaClausola(" outfunds__Applying_Organization__r.Tipologia_Ente__c ",result[z].tipologiaente)+ ``, MAX_FETCH));            
        } else {
            qpositivi.push(promiseQuery(conn, `select count(Id) num from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' ` + calcolaClausola(" outfunds__Applying_Organization__r.Tipologia_Ente__c ",result[z].tipologiaente)+ ` and Data_asseverazione_tecnica__c = LAST_N_DAYS:` + rolling, MAX_FETCH));
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
            qnegativi.push(promiseQuery(conn, `select count(Id) num from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Negativo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' ` + calcolaClausola("  outfunds__Applying_Organization__r.Tipologia_Ente__c ",result[z].tipologiaente)+ ``, MAX_FETCH));
        } else {
            qnegativi.push(promiseQuery(conn, `select count(Id) num from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Negativo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' ` + calcolaClausola("  outfunds__Applying_Organization__r.Tipologia_Ente__c ",result[z].tipologiaente)+  ` and Data_asseverazione_tecnica__c = LAST_N_DAYS:` + rolling, MAX_FETCH));
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
            qtasks.push(promiseQuery(conn, `select Id, CreatedDate, LastModifiedDate, Data_ultima_assegnazione__c, Esito__c from Task where RecordType.Name = 'Controlli conformità tecnica' and WhatId in (select Id from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c in ('Positivo','Negativo') and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' ` + calcolaClausola(" outfunds__Applying_Organization__r.Tipologia_Ente__c ",result[z].tipologiaente)+  `)`, MAX_FETCH));
        } else {
            qtasks.push(promiseQuery(conn, `select Id, CreatedDate, LastModifiedDate, Data_ultima_assegnazione__c, Esito__c from Task where RecordType.Name = 'Controlli conformità tecnica' and WhatId in (select Id from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c in ('Positivo','Negativo') and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' ` + calcolaClausola(" outfunds__Applying_Organization__r.Tipologia_Ente__c ",result[z].tipologiaente)+  ` and Data_asseverazione_tecnica__c = LAST_N_DAYS:` + rolling + ` )`, MAX_FETCH));
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
            qpositiviformali.push(promiseQuery(conn, `select count(Id) num from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' ` + calcolaClausola(" outfunds__Applying_Organization__r.Tipologia_Ente__c ",result[z].tipologiaente)+  ` and Stato_Progetto__c IN ('IN LIQUIDAZIONE','LIQUIDATO')`, MAX_FETCH));
        } else {
            qpositiviformali.push(promiseQuery(conn, `select count(Id) num from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' ` + calcolaClausola(" outfunds__Applying_Organization__r.Tipologia_Ente__c ",result[z].tipologiaente)+  ` and Stato_Progetto__c IN ('IN LIQUIDAZIONE','LIQUIDATO') and Data_avanzamento_in_Liquidazione__c = LAST_N_DAYS:` + rolling, MAX_FETCH));
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
            qnegativiformali.push(promiseQuery(conn, `select count(Id) num from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' ` + calcolaClausola(" outfunds__Applying_Organization__r.Tipologia_Ente__c ",result[z].tipologiaente)+  ` and Stato_Progetto__c = 'REVOCATO'`, MAX_FETCH));
        } else {
            qnegativiformali.push(promiseQuery(conn, `select count(Id) num from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' ` + calcolaClausola(" outfunds__Applying_Organization__r.Tipologia_Ente__c ",result[z].tipologiaente)+  ` and Stato_Progetto__c = 'REVOCATO' and Data_Revoca_Decretata__c = LAST_N_DAYS:` + rolling, MAX_FETCH));
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
            qtasksformali.push(promiseQuery(conn, `select Id, CreatedDate, LastModifiedDate, Data_ultima_assegnazione__c, Esito__c from Task where RecordType.Name = 'Controlli asseverazione formale' and WhatId in (select Id from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' ` + calcolaClausola(" outfunds__Applying_Organization__r.Tipologia_Ente__c ",result[z].tipologiaente)+  `)`, MAX_FETCH));
        } else {
            qtasksformali.push(promiseQuery(conn, `select Id, CreatedDate, LastModifiedDate, Data_ultima_assegnazione__c, Esito__c from Task where RecordType.Name = 'Controlli asseverazione formale' and WhatId in (select Id from outfunds__Funding_Request__c where Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '` + result[z].misura + `' ` + calcolaClausola(" outfunds__Applying_Organization__r.Tipologia_Ente__c ",result[z].tipologiaente)+  ` and Data_avanzamento_in_Liquidazione__c = LAST_N_DAYS:` + rolling + `)`, MAX_FETCH));
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

        if(compressed){
            values[0].forEach(c => {
                if (
                    c.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name !== '1.2 Abilitazione e facilitazione migrazione al Cloud' &&
                    c.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name !== '1.4.1 Esperienza del cittadino nei servizi pubblici'
                ) {
                    c.outfunds__Applying_Organization__r.Tipologia_Ente__c = 'Tutti';
                } else {
                    if (c.outfunds__Applying_Organization__r.Tipologia_Ente__c !== 'Comuni' && c.outfunds__Applying_Organization__r.Tipologia_Ente__c !== 'Scuole') {
                        c.outfunds__Applying_Organization__r.Tipologia_Ente__c = 'Altri';
                    }else{
                        //nothing
                    }
                }
            });    
        }

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
        await calcolaAndamenti(conn,result);

        return {
            data: result
        };

    } else {
        throw redirect(303, '/accesso');
    }

}