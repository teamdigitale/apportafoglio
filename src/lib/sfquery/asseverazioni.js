export async function caricaTipiTask(conn) {
    const tipitask = [];
    let soql = `select Id, Name, SobjectType from RecordType where Name IN ('Controlli Conformità Tecnica','Controlli Asseverazione Formale') and isActive = true and SobjectType = 'Task'`;
    let result_ = await conn.query(soql);
    tipitask.push(...result_.records);

    let more = !result_.done;
    while (more) {
        if (result_.nextRecordsUrl) {
            result_ = await conn.queryMore(result_.nextRecordsUrl);
            //console.log("-caricati altri : " + result_.records.length);
            tipitask.push(...result_.records);
            more = !result_.done;
        }
    }
    return tipitask;
}

export async function caricaTask(conn,tipologia) {
    const tipitask = [];
    //console.log('-Caricamento task di tipo: '+tipologia);
    let soql = `select Funding_Request__r.Regione__c, Funding_Request__r.Misura__c,Id, RecordTypeId, WhoId, WhatId, WhoCount, WhatCount, Subject, ActivityDate, Status, Priority, IsHighPriority, OwnerId, Description, Type, IsDeleted, AccountId, IsClosed, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, IsArchived, CallDurationInSeconds, CallType, CallDisposition, CallObject, ReminderDateTime, IsReminderSet, RecurrenceActivityId, IsRecurrence, RecurrenceStartDateOnly, RecurrenceEndDateOnly, RecurrenceTimeZoneSidKey, RecurrenceType, RecurrenceInterval, RecurrenceDayOfWeekMask, RecurrenceDayOfMonth, RecurrenceInstance, RecurrenceMonthOfYear, RecurrenceRegeneratedType, TaskSubtype, Approvazione_Automatica__c, Data_richiesta__c, Data_scadenza_iniziale__c, Giorni_richiesti__c, Motivazione_Rifiuto__c, Requirement__c, Avviso__c, Ente__c, Fase_Cronoprogramma__c, Commenti_asseveratore__c, Comunicazione__c, Data_fine_Asseverazione__c, Esito__c, Data_scadenza_Richiesta__c, Convalidato_per_silenzio_assenso__c, Esito_convalida_PDM__c, Piano_di_migrazione__c, Data_ultima_assegnazione__c, Data_inizio_Asseverazione__c, Stato_lavorazione__c, RequirementIsFreeze__c, Data_esito__c, Invio_PEC__c, Visionata__c, In_Aggiornamento__c, Funding_Request__c, CL_controllo_formale__c, CUP__c, Decreto_di_finanziamento__c, Importo__c, Numero_Richiesta_di_Pagamento__c, Esito_controllo_1_livello__c, Esito_controllo_2_livello__c, Note_controllo_1_lv__c, Note_controllo_2_lv__c, CodaLV1_Formale__c from Task where RecordType.Name = '`+tipologia+`' and RecordType.isActive = true and RecordType.SobjectType = 'Task' `;
    let result_ = await conn.query(soql);
    tipitask.push(...result_.records);
    //console.log("-numero di occorrenze da caricare: " + result_.totalSize);
    //console.log("-occorrenze caricate : " + result_.records.length);
    let more = !result_.done;
    while (more) {
        if (result_.nextRecordsUrl) {
            result_ = await conn.queryMore(result_.nextRecordsUrl);
            //console.log("-caricati altri : " + result_.records.length);
            tipitask.push(...result_.records);
            more = !result_.done;
        }
    }
    //console.log('-...task caricati: ' + tipitask.length);
    return tipitask;
}