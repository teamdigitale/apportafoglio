// @ts-nocheck
import { promiseQuery } from '$lib';
import { redirect } from '@sveltejs/kit';
import jsforce from 'jsforce';


const MAX_FETCH = 1000000;

export async function load({ locals }) {
    const connstandard = locals.user.connectionStandard;

    if (connstandard) {
        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connstandard
        });
        const slots = promiseQuery(conn, `select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, Capienza__c, Completamento_slot__c, Data_fine__c, Data_inizio__c, Id_slot__c, Misura__c, Pacchetto__c, Quarter_slot__c, Tipologia_Ente_proroghe__c, Proroga_ammissibile_slot__c, QuarterFormat__c, Count__c, Prenotazioni_slot__c from Slot_proroghe__c`, MAX_FETCH);
        const tasks = promiseQuery(conn, `select WhatId, Id,Ente__c,Status,Owner.Name,Owner.Id,  Data_richiesta__c, Data_scadenza_iniziale__c, Giorni_richiesti__c, Requirement__r.outfunds__Funding_Request__r.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name, Requirement__r.outfunds__Funding_Request__r.outfunds__FundingProgram__r.Pacchetto__c, Requirement__r.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Tipologia_Ente__c
        from Task where Fase_Cronoprogramma__c = 'Completamento attività' and RecordType.Name = 'Variazione Cronoprogramma Fase 2'   and RecordType.SobjectType = 'Task' and status!='Completed' `, MAX_FETCH)
        const all = Promise.all([slots, tasks]);
        const allvalues = await all;

        const t = allvalues[1];

        t.forEach(tt => {
            if (tt.Requirement__r.outfunds__Funding_Request__r.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name === '1.1 Infrastrutture digitali') { tt.tipologia_ente = 'Tutti'; tt.misura = "Misura_11" };
            if (tt.Requirement__r.outfunds__Funding_Request__r.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name === '1.1 e 1.2 Multimisura') { tt.tipologia_ente = 'Tutti'; tt.misura = "Misura_11_12" };
            if (tt.Requirement__r.outfunds__Funding_Request__r.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name === '1.4.5 Digitalizzazione degli avvisi pubblici') { tt.tipologia_ente = 'Tutti'; tt.misura = "Misura_145" };
            if (tt.Requirement__r.outfunds__Funding_Request__r.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name === '1.4.3 Adozione PagoPA e AppIO') { tt.tipologia_ente = 'Tutti'; tt.misura = 'Misura_143' };
            if (tt.Requirement__r.outfunds__Funding_Request__r.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name === '1.4.4 Adozione identità digitale') { tt.tipologia_ente = 'Tutti'; tt.misura = 'Misura_144' };
            if (tt.Requirement__r.outfunds__Funding_Request__r.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name === '1.4.1 Esperienza del cittadino nei servizi pubblici') {
                tt.misura = 'Misura_141';
                tt.tipologia_ente = tt.Requirement__r.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Tipologia_Ente__c;
            };
            if (tt.Requirement__r.outfunds__Funding_Request__r.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name === '1.2 Abilitazione e facilitazione migrazione al Cloud') {
                if (tt.Requirement__r.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Tipologia_Ente__c !== 'Scuole' && tt.Requirement__r.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Tipologia_Ente__c !== 'Comuni') {
                    tt.tipologia_ente = 'ASL';
                } else {
                    tt.tipologia_ente = tt.Requirement__r.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Tipologia_Ente__c;
                }
                tt.misura = 'Misura_12'
            };
            if (tt.Requirement__r.outfunds__Funding_Request__r.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name === '1.3.1 Piattaforma Digitale Nazionale Dati') { tt.misura = 'Misura_131'; tt.tipologia_ente = 'Tutti'; };
        });

        return {
            slots: allvalues[0],
            tasks: t
        };
    } else {
        throw redirect(303, '/users');
    }

}

