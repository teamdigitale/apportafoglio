import jsforce from 'jsforce';
import { promiseQuery } from '$lib/index.js';
import { redirect } from '@sveltejs/kit';
import { caricaAvvisi } from '$lib/js/shared.js';

export async function load({ locals }) {
    let misure = [];
    let avvisi = [];
    let candidature = [];
    let enti = [];
    let requirementsContrattualizzazione = [];
    let requirementsCompletamentoAttivita = [];
    let tasksVariazioneCronoprogramma = [];

    const connstandard = locals.user.connectionStandard;

    if (connstandard) {
        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connstandard
        });
        let idutentesf;
        await conn.identity(function (err, res) {
            idutentesf = res.user_id;
        });
        avvisi = avvisi.concat(await caricaAvvisi(conn));

        const qmisure = promiseQuery(conn, `select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Description__c, outfunds__End_Date__c, outfunds__Funding_Program_Manager__c, outfunds__Parent_Funding_Program__c, outfunds__Start_Date__c, outfunds__Status__c, outfunds__Top_Level__c, outfunds__Total_Program_Amount__c, Budget_Impegnato__c, Cluster_Regioni__c, Cluster_Scuole__c, Dichiara_inoltre_sotto_la_propria_respon__c, Dichiara_sotto_la_propria_responsabilit__c, Pacchetto__c, Parent_amount__c, Platea_potenziale__c, Oggetto_Avviso__c, Budget_Impegnato_Altro__c, Budget_Impegnato_Sud__c, InPreview__c, Program_Amount_Altro__c, Program_Amount_Sud__c, Quota_Sud__c, Fondi_disponibili_Altro__c, Fondi_disponibili_Sud__c, Fondi_disponibili__c, ID_Template__c, Codice_Controllo__c, Decode_Tipologia_Ente__c, Numero_Progressivo_Candidatura__c, Numero_Progressivo_Finestra__c, Numero_Progressivo__c, Stato_Formula__c, Nome_Progetto__c, Fondi_disponibili_Padre_1__c, Fondi_disponibili_Padre_2__c, Misura_Padre_1__c, Misura_Padre_2__c, Total_Program_Amount_Padre_1__c, Total_Program_Amount_Padre_2__c  from outfunds__Funding_Program__c where outfunds__Parent_Funding_Program__c = '' order by Name`);
        const qenti = promiseQuery(conn, `select Id, IsDeleted, Name, ShippingStreet, ShippingCity, ShippingState,   Website, Description, OwnerId, LastActivityDate, Codice_amministrativo__c, Active__c, Area_geografica__c, Codice_Fiscale_RL__c, Cognome_responsabile__c, Data_Nascita_RL__c, Esistenza_candidature__c,  Nome_responsabile__c,  PEC__c, Regione__c, Tech_Implementation_User__c, Titolo_responsabile__c, Tipologia_Ente__c, Integrato_Cie__c, Integrato_Spid__c, Data_Esercizio_CIE__c, Data_Esercizio_SPID__c, Integrato_CIE_Fondo_Innovazione__c, Integrato_SPID_Fondo_Innovazione__c, Protocollo_CIE__c, Account_Manager__c, Protocollo_SPID__c, Asseveratore__c, Operation_Assistant__c from Account where IsDeleted = false `+
        (locals.user.utentestandard.area?
            ` and Area_geografica__c = '`+locals.user.utentestandard.area+`'`
            :` and (Account_Manager__c = '` + locals.user.utentestandard.viewas + `' or Tech_Implementation_User__c = '` + locals.user.utentestandard.viewas + `')`));
        const qreqcontr = promiseQuery(conn, `select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Assigned__c, outfunds__Completed_Date__c, outfunds__Due_Date__c, outfunds__Funding_Request__c, outfunds__Primary_Contact__c, outfunds__Requirements__c, outfunds__Status__c, outfunds__Type__c, Ambito__c, Comunicazione_Padre__c, Comunicazione_chiusa__c, Data_Esito__c, Data_ricezione_risposta_PA__c, Esito__c, Id_Comunicazione__c, Is_Comunicazione__c, Is_Read__c, Motivazione__c, Quesito__c, Risposta__c, Urgenza__c, Oggetto__c, Step_5_Completato__c, Tipologia_di_Revoca__c, Regione__c, Estensione_cronoprogramma_automatica__c, Piano_di_migrazione__c, canUseProfileRispondiPA__c, canUseRispondiPA__c  from outfunds__Requirement__c where outfunds__Status__c!='Complete' and outfunds__Status__c!='Annullato' and outfunds__Status__c!='ANNULLATA'  and outfunds__Status__c!='Freezato' and RecordType.SobjectType = 'outfunds__Requirement__c' and RecordType.Name = 'Contrattualizzazione fornitore'  and outfunds__Funding_Request__c in (select Id from outfunds__Funding_Request__c where outfunds__Applying_Organization__r.IsDeleted = false `+
        (locals.user.utentestandard.area?
            ` and outfunds__Applying_Organization__r.Area_geografica__c = '`+locals.user.utentestandard.area+`') `
            :` and (outfunds__Applying_Organization__r.Account_Manager__c = '` + locals.user.utentestandard.viewas + `' or outfunds__Applying_Organization__r.Tech_Implementation_User__c = '` + locals.user.utentestandard.viewas + `'))`)+
        ` order by outfunds__Due_Date__c`);
        const qreqcompl = promiseQuery(conn, `select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Assigned__c, outfunds__Completed_Date__c, outfunds__Due_Date__c, outfunds__Funding_Request__c, outfunds__Primary_Contact__c, outfunds__Requirements__c, outfunds__Status__c, outfunds__Type__c, Ambito__c, Comunicazione_Padre__c, Comunicazione_chiusa__c, Data_Esito__c, Data_ricezione_risposta_PA__c, Esito__c, Id_Comunicazione__c, Is_Comunicazione__c, Is_Read__c, Motivazione__c, Quesito__c, Risposta__c, Urgenza__c, Oggetto__c, Step_5_Completato__c, Tipologia_di_Revoca__c, Regione__c, Estensione_cronoprogramma_automatica__c, Piano_di_migrazione__c, canUseProfileRispondiPA__c, canUseRispondiPA__c  from outfunds__Requirement__c where outfunds__Status__c!='Complete' and outfunds__Status__c!='Annullato' and outfunds__Status__c!='ANNULLATA'  and outfunds__Status__c!='Freezato' and RecordType.SobjectType = 'outfunds__Requirement__c' and RecordType.Name = 'Completamento Attività'  and outfunds__Funding_Request__c in (select Id from outfunds__Funding_Request__c where outfunds__Applying_Organization__r.IsDeleted = false `+
        (locals.user.utentestandard.area?
            ` and outfunds__Applying_Organization__r.Area_geografica__c = '`+locals.user.utentestandard.area+`') `
            :` and (outfunds__Applying_Organization__r.Account_Manager__c = '` + locals.user.utentestandard.viewas + `' or outfunds__Applying_Organization__r.Tech_Implementation_User__c = '` + locals.user.utentestandard.viewas + `'))`)+
        ` order by outfunds__Due_Date__c`);
        const qvariaz = promiseQuery(conn, `select Id, RecordTypeId, WhoId, WhatId, WhoCount, WhatCount, Subject, ActivityDate, Status, Priority, IsHighPriority, OwnerId,  Type, IsDeleted, AccountId, IsClosed, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, IsArchived, CallDurationInSeconds, CallType, CallDisposition, CallObject, ReminderDateTime, IsReminderSet, RecurrenceActivityId, IsRecurrence, RecurrenceStartDateOnly, RecurrenceEndDateOnly, RecurrenceTimeZoneSidKey, RecurrenceType, RecurrenceInterval, RecurrenceDayOfWeekMask, RecurrenceDayOfMonth, RecurrenceInstance, RecurrenceMonthOfYear, RecurrenceRegeneratedType, TaskSubtype,  Approvazione_Automatica__c, Data_richiesta__c, Data_scadenza_iniziale__c, Giorni_richiesti__c, Motivazione_Rifiuto__c, Requirement__c, Avviso__c, Ente__c, Fase_Cronoprogramma__c, Commenti_asseveratore__c, Comunicazione__c, Data_fine_Asseverazione__c, Esito__c, Data_scadenza_Richiesta__c, Convalidato_per_silenzio_assenso__c, Esito_convalida_PDM__c, Piano_di_migrazione__c, Data_ultima_assegnazione__c, Data_inizio_Asseverazione__c, Stato_lavorazione__c, RequirementIsFreeze__c, Data_esito__c, Invio_PEC__c, Visionata__c, In_Aggiornamento__c, Funding_Request__c, CL_controllo_formale__c, CUP__c, Decreto_di_finanziamento__c, Importo__c, Numero_Richiesta_di_Pagamento__c, Esito_controllo_1_livello__c, Esito_controllo_2_livello__c, Note_controllo_1_lv__c, Note_controllo_2_lv__c  from Task where RecordType.Name = 'Variazione Cronoprogramma' and RecordType.SobjectType = 'Task' and status!='Completed' order by CreatedDate desc`);
        const qcand = promiseQuery(conn, `select outfunds__Applying_Organization__r.Account_Manager__c,outfunds__Applying_Organization__r.Account_Manager__r.Name,Id, OwnerId, IsDeleted, Name, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Application_Date__c, outfunds__Applying_Contact__c, outfunds__Applying_Employee__c, outfunds__Applying_Organization__c, outfunds__Awarded_Amount__c, outfunds__Awarded_Date__c, outfunds__Close_Date__c, outfunds__Closed_reason__c, outfunds__FundingProgram__c, outfunds__Geographical_Area_Served__c, outfunds__Population_Served__c, outfunds__Recommended_Amount__c, outfunds__Requested_Amount__c, outfunds__Requested_For__c, outfunds__Status__c, outfunds__Term_End_Date__c, outfunds__Term_Start_Date__c, outfunds__Terms__c, outfunds__Total_Remaining__c, outfunds__Total_Cancelled__c, outfunds__Total_Disbursed__c, outfunds__Unpaid_Disbursements__c, Ammissibilit__c, Base64PDF__c, Cluster__c, Codice_CUP__c, Consenso_Dichiarazioni_Inoltre__c, Consenso_Dichiarazioni__c, Data_Finanziamento__c, Data_Ricezione_CUP__c, Data_invio_candidatura__c, ErrorPDF__c, Finestra_Temporale__c, Flag_Dichiarazione_Responsabilita__c, Last_Confirmed_Step__c, Misura__c, Regione__c, Settimana_creazione__c, Step_candidatura__c, Tipologia_Istat__c, id_richiesta_di_candidatura__c, Contrattualizzazione_Fornitori__c, Data_conclusione__c, Descrizione_Progetto__c, Nome_Progetto__c, Stato_Progetto__c, CLP__c, Data_avanzamento_in_Liquidato__c, Data_Contrattualizzazione__c, IBAN__c, Last_Confirmed_Step_Progetto__c, Stato_contrattualizzazione__c, Data_Inizio_Formazione__c, Data_fine_formazione__c, Dichiarazione_Conformit_Servizi_Pubblic__c, Dichiarazione_Conformit_Sito_Internet__c, Modalita_Erogazione__c, Numero_Medio_Partecipanti__c, Numero_Ore_Formazione__c, Url_Servizi_Pubblici_Digitali__c, Url_Sito_Internet__c, Numero_task__c, Attivita_completata__c, Codice_Amministrativo__c, Criteri_Conformita_1__c, Criteri_Conformita_definitiva__c, Criteri_Conformita_n__c, Esperienza_Utente_1_Descrizione__c, Esperienza_Utente_1__c, Esperienza_Utente_definitiva_Descrizione__c, Esperienza_Utente_definitiva__c, Esperienza_Utente_n_Descrizione__c, Esperienza_Utente_n__c, Funzionalita_1_Descrizione__c, Funzionalita_1__c, Funzionalita_definitiva_Descrizione__c, Funzionalita_definitiva__c, Funzionalita_n_Descrizione__c, Funzionalita_n__c, Motivazione_Altro_Revoca_Progetto__c, Motivazione_Revoca_Progetto__c,  Progetto_Terminato__c,  rinuncia__c, Controllo_URL__c, Codice_Gestionale__c, Codice_inserito_manualmente__c, Cognome_Responsabile_Conservazione__c, Comune_Responsabile_Conservazione__c, Conflitto_di_interesse__c, DNSH_modificato__c, Data_avanzamento_step_5__c, Data_completamento_attivit__c, Data_esito_controlli_automatici__c, Descrizione_controlli__c, DocJobId__c, Doppio_finanziamento__c, Due_date_controlli__c, Esito_controlli__c, Indirizzo_Responsabile_Conservazione__c, Integrazione_PDND__c, Nome_Responsabile_Conservazione__c, Provincia_Responsabile_Conservazione__c, Tipologia_codice__c, Check_Data_Avanzamento_Step_5__c, Data_avanzamento_in_Liquidazione__c, Notifica_Liquidazione__c, Sezione_tesoreria__c, Conto_di_Tesoreria__c, IBAN_Report__c, Causale_Trasferimento__c, Data_Revoca_Decretata__c, Revoca__c, Ultimo_Esito_Conformit_Tecnica__c, Codice_misura_SAP__c, Conto_Contabilit_Speciale__c, Data_estrazione__c, Sezione_Contabilit_Speciale__c, Approvazione_offerta__c, Audit__c, Azioni_effettuate__c, Contratto_elaborato__c,  Dichiarazione_conformita_Migrazione__c, Esito_Audit__c, Motivazione_Audit__c, Predisposizione_progetto__c, Realizzero_intervento_senza_fornitori__c, Ricezione_offerta__c, Scelta_Fornitore__c, Stato_Audit__c, Pacchetto_Servizi__c,  Riferimento_ReGIS__c, Awarded_Amount_Padre_1__c, Awarded_Amount_Padre_2__c, Last_Confirmed_Step_Modifica_Progetto__c, Stato_modifica__c, Codice_Gestionale_Report__c, Tipologia_documento__c, Data_convalida_silenzio_assenso__c, Tipo_Misura__c, Esito_campagna_duplicato_143_appIO__c, Risposta_PEC_143_appIO__c, Numero_notifiche__c, Data_asseverazione_tecnica__c, Numero_Richiesta_di_Pagamento__c, OldTemplate12__c  from outfunds__Funding_Request__c where outfunds__Applying_Organization__c in (select Id from Account where IsDeleted =false `+
        (locals.user.utentestandard.area?
            ` and Area_geografica__c = '`+locals.user.utentestandard.area+`') `
            :` and (Account_Manager__c = '` + locals.user.utentestandard.viewas + `' or Tech_Implementation_User__c = '` + locals.user.utentestandard.viewas + `'))`)+
        ` `);

        const all = Promise.all([qmisure, qenti, qreqcontr, qreqcompl, qvariaz, qcand]);
        const values = await all;
        misure = values[0];
        enti = values[1];
        requirementsContrattualizzazione = values[2];
        requirementsCompletamentoAttivita = values[3];
        tasksVariazioneCronoprogramma = values[4];
        candidature = values[5];
        misure.forEach((m) => {
            m.avvisiAperti = avvisi.filter((a) => a.outfunds__Status__c === 'PUBBLICATO').filter((a) => a.outfunds__Parent_Funding_Program__c === m.Id);
            m.avvisiChiusi = avvisi.filter((a) => a.outfunds__Status__c !== 'PUBBLICATO').filter((a) => a.outfunds__Parent_Funding_Program__c === m.Id);
        })
        requirementsContrattualizzazione.forEach((rcontr) => {
            let checkTask = tasksVariazioneCronoprogramma.filter(x => x.Requirement__c === rcontr.Id);
            if (checkTask && checkTask.length > 0) {
                rcontr.task = checkTask[0];
            }
        })
        requirementsCompletamentoAttivita.forEach((rcompl) => {
            let checkTask = tasksVariazioneCronoprogramma.filter(x => x.Requirement__c === rcompl.Id);
            if (checkTask && checkTask[0]) {
                rcompl.task = checkTask[0];
            }
        })
        candidature.forEach(c => {
            let checkcontr = requirementsContrattualizzazione.filter(x => x.outfunds__Funding_Request__c === c.Id);
            let checkcompl = requirementsCompletamentoAttivita.filter(x => x.outfunds__Funding_Request__c === c.Id);
            if (checkcontr && checkcontr.length > 0) {
                c.reqcontr = checkcontr[0];
            }
            if (checkcompl && checkcompl.length > 0) {
                c.reqcompl = checkcompl[0];
            }
        })
        return {
            misure: misure,
            enti: enti,
            avvisi: avvisi,
            candidature: candidature
        };
    } else {
        throw redirect(303, '/io');
    }


}

