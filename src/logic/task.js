export async function caricaTasks(conn,taskname) {
    
    /**
     * TASK
     * select Id, Name, DeveloperName, NamespacePrefix, Description, BusinessProcessId, SobjectType, IsActive, CreatedById, CreatedDate, LastModifiedById, LastModifiedDate, SystemModstamp  from RecordType where SobjectType = 'outfunds__Requirement__c' 
     */
    const records = [];
    const reqs = [];
    //console.log('-Caricamento tipo req...');
    let soqltiporeq = `select Id  from RecordType where SobjectType = 'Task' and Name = '`+taskname+`'`;
    let result_ = await conn.query(soqltiporeq);
    records.push(...result_.records);
    //console.log("-numero di occorrenze da caricare: " + result_.totalSize);
    //console.log("-occorrenze caricate : " + result_.records.length);
    let more = !result_.done;
    while (more) {
        if (result_.nextRecordsUrl) {
            result_ = await conn.queryMore(result_.nextRecordsUrl);
            //console.log("-caricati altri : " + result_.records.length);
            records.push(...result_.records);
            more = !result_.done;
        }
    }
    //console.log('-...tipi req caricati: '+records.length);
    if(records && records.length===1){
        //console.log('-Caricamento requirements...');
        let soqlreq = `select Id, RecordTypeId, WhoId, WhatId, WhoCount, WhatCount, Subject, ActivityDate, Status, Priority, IsHighPriority, OwnerId,  Type, IsDeleted, AccountId, IsClosed, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, IsArchived, CallDurationInSeconds, CallType, CallDisposition, CallObject, ReminderDateTime, IsReminderSet, RecurrenceActivityId, IsRecurrence, RecurrenceStartDateOnly, RecurrenceEndDateOnly, RecurrenceTimeZoneSidKey, RecurrenceType, RecurrenceInterval, RecurrenceDayOfWeekMask, RecurrenceDayOfMonth, RecurrenceInstance, RecurrenceMonthOfYear, RecurrenceRegeneratedType, TaskSubtype,  Approvazione_Automatica__c, Data_richiesta__c, Data_scadenza_iniziale__c, Giorni_richiesti__c, Motivazione_Rifiuto__c, Requirement__c, Avviso__c, Ente__c, Fase_Cronoprogramma__c, Commenti_asseveratore__c, Comunicazione__c, Data_fine_Asseverazione__c, Esito__c, Data_scadenza_Richiesta__c, Convalidato_per_silenzio_assenso__c, Esito_convalida_PDM__c, Piano_di_migrazione__c, Data_ultima_assegnazione__c, Data_inizio_Asseverazione__c, Stato_lavorazione__c, RequirementIsFreeze__c, Data_esito__c, Invio_PEC__c, Visionata__c, In_Aggiornamento__c, Funding_Request__c, CL_controllo_formale__c, CUP__c, Decreto_di_finanziamento__c, Importo__c, Numero_Richiesta_di_Pagamento__c, Esito_controllo_1_livello__c, Esito_controllo_2_livello__c, Note_controllo_1_lv__c, Note_controllo_2_lv__c  from Task where RecordTypeId = '`+records[0].Id+`' and status!='Completed' order by CreatedDate desc`;
        let result_ = await conn.query(soqlreq);
        reqs.push(...result_.records);
        //console.log("-numero di occorrenze da caricare: " + result_.totalSize);
        //console.log("-occorrenze caricate : " + result_.records.length);
        let more = !result_.done;
        while (more) {
            if (result_.nextRecordsUrl) {
                result_ = await conn.queryMore(result_.nextRecordsUrl);
                //console.log("-caricati altri : " + result_.records.length);
                reqs.push(...result_.records);
                more = !result_.done;
            }
        }
        //console.log('-...requirements caricati: '+records.length);
    }
    return reqs;
}