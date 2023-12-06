const fieldsContatti = `select Account.Name, Id, RecordTypeId, WhoId, WhatId, WhoCount, WhatCount, Subject, ActivityDate, Status, Priority, IsHighPriority, OwnerId, Description, Type, IsDeleted, AccountId, IsClosed, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, IsArchived, CallDurationInSeconds, CallType, CallDisposition, CallObject, ReminderDateTime, IsReminderSet, RecurrenceActivityId, IsRecurrence, RecurrenceStartDateOnly, RecurrenceEndDateOnly, RecurrenceTimeZoneSidKey, RecurrenceType, RecurrenceInterval, RecurrenceDayOfWeekMask, RecurrenceDayOfMonth, RecurrenceInstance, RecurrenceMonthOfYear, RecurrenceRegeneratedType, TaskSubtype,  Approvazione_Automatica__c, Data_richiesta__c, Data_scadenza_iniziale__c, Giorni_richiesti__c, Motivazione_Rifiuto__c, Requirement__c, Avviso__c, Ente__c, Fase_Cronoprogramma__c, Commenti_asseveratore__c, Comunicazione__c, Data_fine_Asseverazione__c, Esito__c, Data_scadenza_Richiesta__c, Convalidato_per_silenzio_assenso__c, Esito_convalida_PDM__c, Piano_di_migrazione__c, Data_ultima_assegnazione__c, Data_inizio_Asseverazione__c, Stato_lavorazione__c, RequirementIsFreeze__c, Data_esito__c, Invio_PEC__c, Visionata__c, In_Aggiornamento__c, Funding_Request__c, CL_controllo_formale__c, CUP__c, Decreto_di_finanziamento__c, Importo__c, Numero_Richiesta_di_Pagamento__c, Esito_controllo_1_livello__c, Esito_controllo_2_livello__c, Note_controllo_1_lv__c, Note_controllo_2_lv__c, CodaLV1_Formale__c from Task `;
const fieldsEventi = `select Account.Name,Id, WhoId, WhatId, WhoCount, WhatCount, Subject, Location, IsAllDayEvent, ActivityDateTime, ActivityDate, DurationInMinutes, StartDateTime, EndDateTime,  Description, AccountId, OwnerId, Type, IsPrivate, ShowAs, IsDeleted, IsChild, IsGroupEvent, GroupEventType, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, IsArchived, RecurrenceActivityId, IsRecurrence, RecurrenceStartDateTime, RecurrenceEndDateOnly, RecurrenceTimeZoneSidKey, RecurrenceType, RecurrenceInterval, RecurrenceDayOfWeekMask, RecurrenceDayOfMonth, RecurrenceInstance, RecurrenceMonthOfYear, ReminderDateTime, IsReminderSet, EventSubtype,  Approvazione_Automatica__c, Data_richiesta__c, Data_scadenza_iniziale__c, Giorni_richiesti__c, Motivazione_Rifiuto__c, Requirement__c, Avviso__c, Ente__c, Fase_Cronoprogramma__c, Commenti_asseveratore__c, Comunicazione__c, Data_fine_Asseverazione__c, Esito__c, Data_scadenza_Richiesta__c, Convalidato_per_silenzio_assenso__c, Esito_convalida_PDM__c, Piano_di_migrazione__c, Data_ultima_assegnazione__c, Data_inizio_Asseverazione__c, Stato_lavorazione__c, RequirementIsFreeze__c, Data_esito__c, Invio_PEC__c, Visionata__c, In_Aggiornamento__c, Funding_Request__c, CL_controllo_formale__c, CUP__c, Decreto_di_finanziamento__c, Importo__c, Numero_Richiesta_di_Pagamento__c, Esito_controllo_1_livello__c, Esito_controllo_2_livello__c, Note_controllo_1_lv__c, Note_controllo_2_lv__c, CodaLV1_Formale__c from Event `;

export async function loadContatti(conn, u) {
    const contatti = [];
    if (u) {
        //console.log('-Caricamento contatti');
        let soqlcontatti = fieldsContatti + ` where TaskSubtype ='Call' and WhatId in (select Id from Account where (Account_Manager__c = '`+u+`' or Tech_Implementation_User__c = '`+u+`')) and CreatedById ='`+u+`' order by CreatedDate desc`;
        let result_ = await conn.query(soqlcontatti);
        contatti.push(...result_.records);
        //console.log("-numero di occorrenze da caricare: " + result_.totalSize);
        //console.log("-occorrenze caricate : " + result_.records.length);
        let more = !result_.done;
        while (more) {
            if (result_.nextRecordsUrl) {
                result_ = await conn.queryMore(result_.nextRecordsUrl);
                //console.log("-caricati altri : " + result_.records.length);
                contatti.push(...result_.records);
                more = !result_.done;
            }
        }
        //console.log('-...contatti caricati: ' + contatti.length);
    }
    return contatti;
}


export async function loadEventi(conn, u) {
    const contatti = [];
    if (u) {
        //console.log('-Caricamento eventi');
        let soqlcontatti = fieldsEventi + ` where WhatId in (select Id from Account where (Account_Manager__c = '`+u+`' or Tech_Implementation_User__c = '`+u+`')) and CreatedById ='`+u+`' order by CreatedDate desc`;
        let result_ = await conn.query(soqlcontatti);
        contatti.push(...result_.records);
        //console.log("-numero di occorrenze da caricare: " + result_.totalSize);
        //console.log("-occorrenze caricate : " + result_.records.length);
        let more = !result_.done;
        while (more) {
            if (result_.nextRecordsUrl) {
                result_ = await conn.queryMore(result_.nextRecordsUrl);
                //console.log("-caricati altri : " + result_.records.length);
                contatti.push(...result_.records);
                more = !result_.done;
            }
        }
        //console.log('-...eventi caricati: ' + contatti.length);
    }
    return contatti;
}


