import { redirect } from '@sveltejs/kit';
import jsforce from 'jsforce';

export async function load({ locals }) {
    let contatti = [];
    let eventi = [];
    const connstandard = locals.user.connectionStandard;




    if (connstandard) {
        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connstandard
        });
        const qcontatti = contatti.concat(await loadContatti(conn, locals.user.utentestandard.idsf,locals));
        const qeventi = eventi.concat(await loadEventi(conn, locals.user.utentestandard.idsf,locals));

        const all = Promise.all([qcontatti, qeventi]);
        const values = await all;
        contatti = contatti.concat(values[0]);
        eventi = eventi.concat(values[1]);
        let r = [];
        contatti.forEach(c => {
            r.push({
                CreatedDate: c.CreatedDate,
                Account: { Name: c.Account.Name },
                Subject: c.Subject,
                Description: c.Description,
                Tipo: 'Contatto diretto',
                CreatedById: c.CreatedById,
                CreatedByName: c.CreatedBy.Name 
            });
        });
        eventi.forEach(e => {
            r.push({
                CreatedDate: e.CreatedDate,
                Account: { Name: e.Account.Name },
                Subject: e.Subject,
                Description: e.Subject,
                Tipo: 'Riunione',
                CreatedById: e.CreatedById,
                CreatedByName: e.CreatedBy.Name 
            });
        });
        r = r.sort((a, b) => new Date(b.CreatedDate).getDate() - new Date(a.CreatedDate).getDate());
        return {
            contatti: r
        };
    } else {
        throw redirect(303, '/users');
    }
}

const fieldsContatti = `select CreatedBy.Name,Account.Name, Id, RecordTypeId, WhoId, WhatId, WhoCount, WhatCount, Subject, ActivityDate, Status, Priority, IsHighPriority, OwnerId, Description, Type, IsDeleted, AccountId, IsClosed, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, IsArchived, CallDurationInSeconds, CallType, CallDisposition, CallObject, ReminderDateTime, IsReminderSet, RecurrenceActivityId, IsRecurrence, RecurrenceStartDateOnly, RecurrenceEndDateOnly, RecurrenceTimeZoneSidKey, RecurrenceType, RecurrenceInterval, RecurrenceDayOfWeekMask, RecurrenceDayOfMonth, RecurrenceInstance, RecurrenceMonthOfYear, RecurrenceRegeneratedType, TaskSubtype,  Approvazione_Automatica__c, Data_richiesta__c, Data_scadenza_iniziale__c, Giorni_richiesti__c, Motivazione_Rifiuto__c, Requirement__c, Avviso__c, Ente__c, Fase_Cronoprogramma__c, Commenti_asseveratore__c, Comunicazione__c, Data_fine_Asseverazione__c, Esito__c, Data_scadenza_Richiesta__c, Convalidato_per_silenzio_assenso__c, Esito_convalida_PDM__c, Piano_di_migrazione__c, Data_ultima_assegnazione__c, Data_inizio_Asseverazione__c, Stato_lavorazione__c, RequirementIsFreeze__c, Data_esito__c, Invio_PEC__c, Visionata__c, In_Aggiornamento__c, Funding_Request__c, CL_controllo_formale__c, CUP__c, Decreto_di_finanziamento__c, Importo__c, Numero_Richiesta_di_Pagamento__c, Esito_controllo_1_livello__c, Esito_controllo_2_livello__c, Note_controllo_1_lv__c, Note_controllo_2_lv__c, CodaLV1_Formale__c from Task `;
const fieldsEventi = `select CreatedBy.Name,Account.Name,Id, WhoId, WhatId, WhoCount, WhatCount, Subject, Location, IsAllDayEvent, ActivityDateTime, ActivityDate, DurationInMinutes, StartDateTime, EndDateTime,  Description, AccountId, OwnerId, Type, IsPrivate, ShowAs, IsDeleted, IsChild, IsGroupEvent, GroupEventType, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, IsArchived, RecurrenceActivityId, IsRecurrence, RecurrenceStartDateTime, RecurrenceEndDateOnly, RecurrenceTimeZoneSidKey, RecurrenceType, RecurrenceInterval, RecurrenceDayOfWeekMask, RecurrenceDayOfMonth, RecurrenceInstance, RecurrenceMonthOfYear, ReminderDateTime, IsReminderSet, EventSubtype,  Approvazione_Automatica__c, Data_richiesta__c, Data_scadenza_iniziale__c, Giorni_richiesti__c, Motivazione_Rifiuto__c, Requirement__c, Avviso__c, Ente__c, Fase_Cronoprogramma__c, Commenti_asseveratore__c, Comunicazione__c, Data_fine_Asseverazione__c, Esito__c, Data_scadenza_Richiesta__c, Convalidato_per_silenzio_assenso__c, Esito_convalida_PDM__c, Piano_di_migrazione__c, Data_ultima_assegnazione__c, Data_inizio_Asseverazione__c, Stato_lavorazione__c, RequirementIsFreeze__c, Data_esito__c, Invio_PEC__c, Visionata__c, In_Aggiornamento__c, Funding_Request__c, CL_controllo_formale__c, CUP__c, Decreto_di_finanziamento__c, Importo__c, Numero_Richiesta_di_Pagamento__c, Esito_controllo_1_livello__c, Esito_controllo_2_livello__c, Note_controllo_1_lv__c, Note_controllo_2_lv__c, CodaLV1_Formale__c from Event `;

async function loadContatti(conn, u,locals) {
    const contatti = [];
    if (u) {
        let soqlcontatti = fieldsContatti + (locals.user.utentestandard.area?
        `where TaskSubtype ='Call' and WhatId in (select Id from Account where Area_geografica__c = '`+locals.user.utentestandard.area+`' ) order by CreatedDate desc`
        :`where TaskSubtype ='Call' and WhatId in (select Id from Account where (Account_Manager__c = '` + u + `' or Tech_Implementation_User__c = '` + u + `')) and CreatedById ='` + u + `' order by CreatedDate desc`);

        let result_ = await conn.query(soqlcontatti);
        contatti.push(...result_.records);
        let more = !result_.done;
        while (more) {

            if (result_.nextRecordsUrl) {
                result_ = await conn.queryMore(result_.nextRecordsUrl);
                contatti.push(...result_.records);
                more = !result_.done;
            }
        }
    }
    return contatti;
}


async function loadEventi(conn, u,locals) {
    const contatti = [];
    if (u) {
        let soqlcontatti = fieldsEventi + (locals.user.utentestandard.area?
        `where WhatId in (select Id from Account where Area_geografica__c = '`+locals.user.utentestandard.area+`' )  order by CreatedDate desc`
        :`where WhatId in (select Id from Account where (Account_Manager__c = '` + u + `' or Tech_Implementation_User__c = '` + u + `')) and CreatedById ='` + u + `' order by CreatedDate desc`);
        let result_ = await conn.query(soqlcontatti);
        contatti.push(...result_.records);
        let more = !result_.done;
        while (more) {
            if (result_.nextRecordsUrl) {
                result_ = await conn.queryMore(result_.nextRecordsUrl);
                contatti.push(...result_.records);
                more = !result_.done;
            }
        }
    }
    return contatti;
}
