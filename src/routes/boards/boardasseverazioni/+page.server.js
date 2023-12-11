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

        //imposta task tecnici e formale
        for (let z = 0; z < result.length; z++) {
            console.log(">Analisi di "+result[z].misura+" - "+result[z].tipologiaente);
            result[z].tecnici = await promiseQuery(conn, `select Id, Esito__c, CreatedDate, LastModifiedDate, Data_ultima_assegnazione__c, WhatId
            from Task where RecordType.Name = 'Controlli conformità tecnica'
            and WhatId in (select Id from outfunds__Funding_Request__c where outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '`+ result[z].misura + `' and outfunds__Applying_Organization__r.Tipologia_Ente__c = '` + result[z].tipologiaente + `' and Ultimo_Esito_Conformit_Tecnica__c in ('Positivo','Negativo'))`);

            result[z].formali = await promiseQuery(conn, `select Id, Esito__c, CreatedDate, LastModifiedDate, Data_ultima_assegnazione__c, WhatId
            from Task where RecordType.Name = 'Controlli asseverazione formale'
            and WhatId in (select Id from outfunds__Funding_Request__c where outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '`+ result[z].misura + `' and outfunds__Applying_Organization__r.Tipologia_Ente__c = '` + result[z].tipologiaente + `')`);
            const numerocandidaturetec = values[0].filter(c => (result[z].tecnici.filter(tt => tt.WhatId === c.Id).length > 0) && c.Ultimo_Esito_Conformit_Tecnica__c === 'Positivo' && result[z].misura === c.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name && result[z].tipologiaente === c.outfunds__Applying_Organization__r.Tipologia_Ente__c).length;
            const numerocandidatureform = values[0].filter(c => (result[z].formali.filter(tt => tt.WhatId === c.Id).length > 0) && (c.Stato_Progetto__c === 'LIQUIDATO' || c.Stato_Progetto__c === 'IN LIQUIDAZIONE') && result[z].misura === c.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name && result[z].tipologiaente === c.outfunds__Applying_Organization__r.Tipologia_Ente__c).length;
         
            result[z].tecnicimedi = numerocandidaturetec === 0 ? 0 : result[z].tecnici.length / numerocandidaturetec;
            result[z].formalimedi = numerocandidatureform === 0 ? 0 : result[z].formali.length / numerocandidatureform;
        }

        //imposta task tecnici e formale a 30 giorni
        for (let z = 0; z < result.length; z++) {
            result[z].tecnici30 = await promiseQuery(conn, `select Id, Esito__c, CreatedDate, LastModifiedDate, Data_ultima_assegnazione__c, WhatId
                    from Task where RecordType.Name = 'Controlli conformità tecnica'
                    and WhatId in (select Id from outfunds__Funding_Request__c where outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '`+ result[z].misura + `' and outfunds__Applying_Organization__r.Tipologia_Ente__c = '` + result[z].tipologiaente + `') and CreatedDate = LAST_N_DAYS:30`);
            result[z].formali30 = await promiseQuery(conn, `select Id, Esito__c, CreatedDate, LastModifiedDate, Data_ultima_assegnazione__c, WhatId
                    from Task where RecordType.Name = 'Controlli asseverazione formale'
                    and WhatId in (select Id from outfunds__Funding_Request__c where outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '`+ result[z].misura + `' and outfunds__Applying_Organization__r.Tipologia_Ente__c = '` + result[z].tipologiaente + `')  and CreatedDate = LAST_N_DAYS:30`);
            const numerocandidaturetec30 = values[0].filter(c => (result[z].tecnici30.filter(tt => tt.WhatId === c.Id).length > 0) && c.Ultimo_Esito_Conformit_Tecnica__c === 'Positivo' && result[z].misura === c.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name && result[z].tipologiaente === c.outfunds__Applying_Organization__r.Tipologia_Ente__c).length;
            const numerocandidatureform30 = values[0].filter(c => (result[z].formali30.filter(tt => tt.WhatId === c.Id).length > 0) && (c.Stato_Progetto__c === 'LIQUIDATO' || c.Stato_Progetto__c === 'IN LIQUIDAZIONE') && result[z].misura === c.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name && result[z].tipologiaente === c.outfunds__Applying_Organization__r.Tipologia_Ente__c).length;
            result[z].tecnicimedi30 = numerocandidaturetec30 === 0 ? 0 : result[z].tecnici30.length / numerocandidaturetec30;
            result[z].formalimedi30 = numerocandidatureform30 === 0 ? 0 : result[z].formali30.length / numerocandidatureform30;
        }

        return {
            data: result
        };

    } else {
        throw redirect(303, '/io');
    }

}