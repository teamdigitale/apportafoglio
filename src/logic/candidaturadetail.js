export async function loadCandidatura(conn, id) {
    const cs = [];
    if (id) {
        //console.log('-Caricamento della candidatura...');
        let soqlcandidatura = `select outfunds__Applying_Organization__r.Name,Id, OwnerId, IsDeleted, Name, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Application_Date__c, outfunds__Applying_Contact__c, outfunds__Applying_Employee__c, outfunds__Applying_Organization__c, outfunds__Awarded_Amount__c, outfunds__Awarded_Date__c, outfunds__Close_Date__c, outfunds__Closed_reason__c, outfunds__FundingProgram__c, outfunds__Geographical_Area_Served__c, outfunds__Population_Served__c, outfunds__Recommended_Amount__c, outfunds__Requested_Amount__c, outfunds__Requested_For__c, outfunds__Status__c, outfunds__Term_End_Date__c, outfunds__Term_Start_Date__c, outfunds__Terms__c, outfunds__Total_Remaining__c, outfunds__Total_Cancelled__c, outfunds__Total_Disbursed__c, outfunds__Unpaid_Disbursements__c, Ammissibilit__c, Base64PDF__c, Cluster__c, Codice_CUP__c, Consenso_Dichiarazioni_Inoltre__c, Consenso_Dichiarazioni__c, Data_Finanziamento__c, Data_Ricezione_CUP__c, Data_invio_candidatura__c, ErrorPDF__c, Finestra_Temporale__c, Flag_Dichiarazione_Responsabilita__c, Last_Confirmed_Step__c, Misura__c, Regione__c, Settimana_creazione__c, Step_candidatura__c, Tipologia_Istat__c, id_richiesta_di_candidatura__c, Contrattualizzazione_Fornitori__c, Data_conclusione__c, Descrizione_Progetto__c, Nome_Progetto__c, Stato_Progetto__c, CLP__c, Data_avanzamento_in_Liquidato__c, Data_Contrattualizzazione__c, IBAN__c, Last_Confirmed_Step_Progetto__c, Stato_contrattualizzazione__c, Data_Inizio_Formazione__c, Data_fine_formazione__c, Dichiarazione_Conformit_Servizi_Pubblic__c, Dichiarazione_Conformit_Sito_Internet__c, Modalita_Erogazione__c, Numero_Medio_Partecipanti__c, Numero_Ore_Formazione__c, Url_Servizi_Pubblici_Digitali__c, Url_Sito_Internet__c, Numero_task__c, Attivita_completata__c, Cittadino_Attivo_1_Descrizione__c, Cittadino_Attivo_1__c, Cittadino_Attivo_definitiva_Descrizione__c, Cittadino_Attivo_definitiva__c, Cittadino_Attivo_n_Descrizione__c, Cittadino_Attivo_n__c, Cittadino_Informato_1__c, Cittadino_Informato_definitiva__c, Cittadino_Informato_n__c, Codice_Amministrativo__c, Criteri_Conformita_1__c, Criteri_Conformita_definitiva__c, Criteri_Conformita_n__c, Esperienza_Utente_1_Descrizione__c, Esperienza_Utente_1__c, Esperienza_Utente_definitiva_Descrizione__c, Esperienza_Utente_definitiva__c, Esperienza_Utente_n_Descrizione__c, Esperienza_Utente_n__c, Funzionalita_1_Descrizione__c, Funzionalita_1__c, Funzionalita_definitiva_Descrizione__c, Funzionalita_definitiva__c, Funzionalita_n_Descrizione__c, Funzionalita_n__c, ID_Crawler_Job_1__c, ID_Crawler_Job_Nota_1__c, ID_Crawler_Job_Nota_definitiva__c, ID_Crawler_Job_Nota_n__c, ID_Crawler_Job_definitiva__c, ID_Crawler_Job_n__c, ID_Crawler__c, Motivazione_Altro_Revoca_Progetto__c, Motivazione_Revoca_Progetto__c, Normativa_1_Descrizione__c, Normativa_1__c, Normativa_definitiva_Descrizione__c, Normativa_definitiva__c, Normativa_n_Descrizione__c, Normativa_n__c, Pacchetto_1_4_1__c, Prestazioni_1__c, Prestazioni_definitiva__c, Prestazioni_n__c, Progetto_Terminato__c, Raccomandazioni_1_Descrizione__c, Raccomandazioni_1__c, Raccomandazioni_definitiva_Descrizione__c, Raccomandazioni_definitiva__c, Raccomandazioni_n_Descrizione__c, Raccomandazioni_n__c, Sicurezza_1_Descrizione__c, Sicurezza_1__c, Sicurezza_definitiva_Descrizione__c, Sicurezza_definitiva__c, Sicurezza_n_Descrizione__c, Sicurezza_n__c, Status_Generale_1__c, Status_Generale_definitiva__c, Status_Generale_n__c, URL_Scansione_1__c, URL_Scansione_definitiva__c, URL_Scansione_n__c, rinuncia__c, Controllo_URL__c, Data_Job_Crawler_1__c, Data_Job_Crawler_definitiva__c, Data_Job_Crawler_n__c, Cittadino_Attivo_1L__c, Cittadino_Attivo_definitivaL__c, Cittadino_Attivo_nL__c, Cittadino_Informato_1L__c, Cittadino_Informato_definitivaL__c, Cittadino_Informato_nL__c, Criteri_Conformita_1L__c, Criteri_Conformita_definitivaL__c, Criteri_Conformita_nL__c, Da_escludere__c, Esperienza_Utente_1L__c, Esperienza_Utente_definitivaL__c, Esperienza_Utente_nL__c, Funzionalita_1L__c, Funzionalita_definitivaL__c, Funzionalita_nL__c, Normativa_1L__c, Normativa_definitivaL__c, Normativa_nL__c, Prestazioni_1L__c, Prestazioni_definitivaL__c, Prestazioni_nL__c, Raccomandazioni_1L__c, Raccomandazioni_definitivaL__c, Raccomandazioni_nL__c, Sicurezza_1L__c, Sicurezza_definitivaL__c, Sicurezza_nL__c, Status_Generale1_1L__c, Status_Generale_definitivaL__c, Status_Generale_nL__c, Codice_Gestionale__c, Codice_inserito_manualmente__c, Cognome_Responsabile_Conservazione__c, Comune_Responsabile_Conservazione__c, Conflitto_di_interesse__c, DNSH_modificato__c, Data_avanzamento_step_5__c, Data_completamento_attivit__c, Data_esito_controlli_automatici__c, Descrizione_controlli__c, DocJobId__c, Doppio_finanziamento__c, Due_date_controlli__c, Esito_controlli__c, Indirizzo_Responsabile_Conservazione__c, Integrazione_PDND__c, Nome_Responsabile_Conservazione__c, Provincia_Responsabile_Conservazione__c, Tipologia_codice__c, Check_Data_Avanzamento_Step_5__c, Data_avanzamento_in_Liquidazione__c, Notifica_Liquidazione__c, Sezione_tesoreria__c, Conto_di_Tesoreria__c, IBAN_Report__c, Causale_Trasferimento__c, Data_Revoca_Decretata__c, Revoca__c, Ultimo_Esito_Conformit_Tecnica__c, Codice_misura_SAP__c, Conto_Contabilit_Speciale__c, Data_estrazione__c, Sezione_Contabilit_Speciale__c, Approvazione_offerta__c, Audit__c, Azioni_effettuate__c, Contratto_elaborato__c, Data_fine_Audit__c, Data_inizio_Audit__c, Delibera_Richiesta_offerta__c, Delibera_approvazione_offerta__c, Delibera_nomina_RUP_e_DEC__c, Dichiarazione_conformita_Migrazione__c, Esito_Audit__c, Motivazione_Audit__c, Predisposizione_progetto__c, Realizzero_intervento_senza_fornitori__c, Ricezione_offerta__c, Scelta_Fornitore__c, Stato_Audit__c, Pacchetto_Servizi__c, Criteri_Superati_Crawler_1__c, Criteri_Superati_Crawler_definitiva__c, Criteri_Superati_Crawler_n__c, Data_scansione_fallita__c, Riferimento_ReGIS__c, Versione_Crawler_1__c, Versione_Crawler_definitiva__c, Versione_Crawler_n__c, Check_Data_Scansione_Fallita__c, Scansione_fallita__c, Awarded_Amount_Padre_1__c, Awarded_Amount_Padre_2__c, Da_Scansionare_Data_Scansione__c, Da_Scansionare__c, Data_Rinuncia__c, hasServizi11__c, hasServizi12__c, havePDM__c, Nome_file_1__c, Nome_file_n__c, Report_Crawler_scansione_1_text__c, Report_Crawler_scansione_def_text__c, Report_Crawler_scansione_n_text__c, URL_scansione_fallita__c, Report_Crawler_scansione_1__c, Report_Crawler_scansione_definitiva__c, Report_Crawler_scansione_n__c, Last_Confirmed_Step_Modifica_Progetto__c, Stato_modifica__c, Codice_Gestionale_Report__c, Tipologia_documento__c, Data_convalida_silenzio_assenso__c, Tipo_Misura__c, Esito_campagna_duplicato_143_appIO__c, Risposta_PEC_143_appIO__c, Numero_notifiche__c, Data_asseverazione_tecnica__c, Numero_Richiesta_di_Pagamento__c, OldTemplate12__c from outfunds__Funding_Request__c where Id = '`+id+`'`;
        let result_ = await conn.query(soqlcandidatura);
        cs.push(...result_.records);
        //console.log("-numero di occorrenze da caricare: " + result_.totalSize);
        //console.log("-occorrenze caricate : " + result_.records.length);
        let more = !result_.done;
        while (more) {
            if (result_.nextRecordsUrl) {
                result_ = await conn.queryMore(result_.nextRecordsUrl);
                //console.log("-caricati altri : " + result_.records.length);
                cs.push(...result_.records);
                more = !result_.done;
            }
        }
        
        //console.log('-...candidature caricate: ' + cs.length);
    }
    return cs;
}

export async function loadStoriaCandidatura(conn, id) {
    const ch = [];
    if (id) {
        //console.log('-Caricamento della storia della candidatura...');
        let soqlstoriacandidatura = `select Id, IsDeleted, ParentId, CreatedById, CreatedDate, Field,  OldValue, NewValue from outfunds__Funding_Request__History where ParentId = '`+id+`' and Field!='Last_Confirmed_Step__c' and Field!='Ammissibilit__c' and Field!='Last_Confirmed_Step_Progetto__c' and Field!='IBAN__c' and Field!='Due_date_controlli__c' and Field!='Data_avanzamento_step_5__c' and Field!='Data_completamento_attivit__c' and Field!='Data_Contrattualizzazione__c'  and Field!='Data_conclusione__c'  and Field!='Da_Scansionare__c' order by CreatedDate desc`;
        let result_ = await conn.query(soqlstoriacandidatura);
        ch.push(...result_.records);
        //console.log("-numero di occorrenze da caricare: " + result_.totalSize);
        //console.log("-occorrenze caricate : " + result_.records.length);
        let more = !result_.done;
        while (more) {
            if (result_.nextRecordsUrl) {
                result_ = await conn.queryMore(result_.nextRecordsUrl);
                //console.log("-caricati altri : " + result_.records.length);
                ch.push(...result_.records);
                more = !result_.done;
            }
        }
        
        //console.log('-...storia della candidature caricata: ' + ch.length);
    }
    return ch;
}

export async function loadComunicazioni(conn, id) {
    const comm = [];
    if (id) {
        //console.log('-Caricamento delle comunicazioni della candidatura...');
        let soqlcomunicazioni = `select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Assigned__c, outfunds__Completed_Date__c, outfunds__Due_Date__c, outfunds__Funding_Request__c, outfunds__Primary_Contact__c, outfunds__Requirements__c, outfunds__Status__c, outfunds__Type__c, Ambito__c, Comunicazione_Padre__c, Comunicazione_chiusa__c, Data_Esito__c, Data_ricezione_risposta_PA__c, Esito__c, Id_Comunicazione__c, Is_Comunicazione__c, Is_Read__c, Motivazione__c, Quesito__c, Risposta__c, Urgenza__c, Oggetto__c, Step_5_Completato__c, Tipologia_di_Revoca__c, Regione__c, Estensione_cronoprogramma_automatica__c, Piano_di_migrazione__c, canUseProfileRispondiPA__c, canUseRispondiPA__c from outfunds__Requirement__c where Is_Comunicazione__c =true and outfunds__Funding_Request__c = '`+id+`' order by CreatedDate desc`;
        let result_ = await conn.query(soqlcomunicazioni);
        comm.push(...result_.records);
        //console.log("-numero di occorrenze da caricare: " + result_.totalSize);
        //console.log("-occorrenze caricate : " + result_.records.length);
        let more = !result_.done;
        while (more) {
            if (result_.nextRecordsUrl) {
                result_ = await conn.queryMore(result_.nextRecordsUrl);
                //console.log("-caricati altri : " + result_.records.length);
                comm.push(...result_.records);
                more = !result_.done;
            }
        }
        
        //console.log('-...comunicazioni caricate: ' + comm.length);
    }
    return comm;
}

export async function loadServiziRichiesta(conn, id) {
    const sr = [];
    if (id) {
        //console.log('-Caricamento servizi richiesta della candidatura...');
        let soqlsr = `select Id, IsDeleted, Name, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, Candidatura__c, Codice_Servizio__c, Destinazione__c, Modalita_di_Migrazione__c, Selezionato__c, Servizio__c, Stato_Attivit__c, CPU__c, Data_Attivazione_CSP__c, Data_Inizio_Migrazione__c, Data_Rilascio_esercizio__c, Data_di_Integrazione__c, Data_di_completamento__c, Integrazione_OpenId__c, Memoria__c, Nome_Applicativo__c, Numero_utenti__c, Spazio_complessivo__c, Stato_formazione__c, Stato_scheda_Valutazione__c, Data_attivazione_servizio__c, Descrizione_controlli__c, Esito_controlli__c, Descrizione_API__c, Nome_API__c, Esito_Classificazione__c, hasPDM__c, Aggiunto_in_modifica__c, Da_eliminare__c, Istanza_di_modifica__c, Selezionato_in_modifica__c, Numero_elementi__c, Attivazione_in_produzione__c, Attivazione_in_produzione_motivazione__c, Cambio_modalit_migrazione__c, Completezza_della_migrazione_dei_dati__c, Completezza_migrazione_dati_motivazione__c, Destinazione_Cloud__c, Identificativi_univoci_delle_componenti__c, Indirizzi_IP__c, Sistema_di_origine__c, Software_migrati_e_loro_caratteristiche__c, Soluzione_PaaS_adottata__c, Soluzione_SaaS_adottata__c, Visibilit_del_servizio__c, hasDocumenti__c, hasFornitori__c, Data_chiamata_api_costo_notifica__c, Data_creazione_notifica__c, Gestionale_interno_ente__c, Notifica_integrata_via_API__c, Aggiunto_Istanza_di_modifica__c  from Servizio_Richiesta__c where Candidatura__c  = '`+id+`'  and Selezionato__c = true order by Name asc`;
        let result_ = await conn.query(soqlsr);
        sr.push(...result_.records);
        //console.log("-numero di occorrenze da caricare: " + result_.totalSize);
        //console.log("-occorrenze caricate : " + result_.records.length);
        let more = !result_.done;
        while (more) {
            if (result_.nextRecordsUrl) {
                result_ = await conn.queryMore(result_.nextRecordsUrl);
                //console.log("-caricati altri : " + result_.records.length);
                sr.push(...result_.records);
                more = !result_.done;
            }
        }
        
        //console.log('-...servizi richiesta caricati: ' + sr.length);
    }
    return sr;
}

//select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__AssignedTo__c, outfunds__Comments__c, outfunds__DueDate__c, outfunds__FundingRequest__c, outfunds__Status__c, outfunds__SubmittedDate__c, sfdo_grants__ConfigurationJson__c, sfdo_grants__DisplayEndDate__c, sfdo_grants__DisplayStartDate__c, sfdo_grants__IsDisplayed__c, sfdo_grants__IsMine__c, sfdo_grants__IsSubmitted__c, sfdo_grants__ReviewUrl__c, Contract__c, Contratto_SCP__c, Data_Contrattualizzazione_SCP__c, Data_Contrattualizzazione__c, Funding_Request_Collaborator__c, Servizio__c, Soggetto_Realizzatore_SCP__c, Tipologia__c, Avviso__c, Denominazione_Soggetto_Realizzatore_SCP__c, Denominazione_Soggetto_Realizzatore__c, Ente__c, numero_servizi_report__c, Data_normativa__c, Data_sottomissione_modifica_step3__c, Dettaglio__c, Dichiarazione_consenso__c, Id_Modifica_Progetto__c, Motivazione_Rifiuto__c, Motivazione_dell_istanza_di_modifica__c, Normativa_di_riferimento__c, Progetto_da_modificare__c, Nome_Progetto__c, isLavorato__c, Archiviato__c, NomeFornitore__c, Note__c, Storico_Tipologia_Soggetto_Realizzatore__c, URL_Fornitore__c from outfunds__Review__c where RecordTypeId in (select id from RecordType where Name = 'Soggetto Realizzatore') and outfunds__FundingRequest__c = 'a037Q000000mUNYQA2'
export async function loadSoggettoRealizzatore(conn, id) {
    const sr = [];
    if (id) {
        //console.log('-Caricamento soggetti realizzatori della candidatura...');
        let soqlsr = `select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__AssignedTo__c, outfunds__Comments__c, outfunds__DueDate__c, outfunds__FundingRequest__c, outfunds__Status__c, outfunds__SubmittedDate__c, sfdo_grants__ConfigurationJson__c, sfdo_grants__DisplayEndDate__c, sfdo_grants__DisplayStartDate__c, sfdo_grants__IsDisplayed__c, sfdo_grants__IsMine__c, sfdo_grants__IsSubmitted__c, sfdo_grants__ReviewUrl__c, Contract__c, Contratto_SCP__c, Data_Contrattualizzazione_SCP__c, Data_Contrattualizzazione__c, Funding_Request_Collaborator__c, Servizio__c, Soggetto_Realizzatore_SCP__c, Tipologia__c, Avviso__c, Denominazione_Soggetto_Realizzatore_SCP__c, Denominazione_Soggetto_Realizzatore__c, Ente__c, numero_servizi_report__c, Data_normativa__c, Data_sottomissione_modifica_step3__c, Dettaglio__c, Dichiarazione_consenso__c, Id_Modifica_Progetto__c, Motivazione_Rifiuto__c, Motivazione_dell_istanza_di_modifica__c, Normativa_di_riferimento__c, Progetto_da_modificare__c, Nome_Progetto__c, isLavorato__c, Archiviato__c, NomeFornitore__c, Note__c, Storico_Tipologia_Soggetto_Realizzatore__c, URL_Fornitore__c from outfunds__Review__c where RecordTypeId in (select id from RecordType where Name = 'Soggetto Realizzatore') and outfunds__FundingRequest__c = '`+id+`'`;
        let result_ = await conn.query(soqlsr);
        sr.push(...result_.records);
        //console.log("-numero di occorrenze da caricare: " + result_.totalSize);
        //console.log("-occorrenze caricate : " + result_.records.length);
        let more = !result_.done;
        while (more) {
            if (result_.nextRecordsUrl) {
                result_ = await conn.queryMore(result_.nextRecordsUrl);
                //console.log("-caricati altri : " + result_.records.length);
                sr.push(...result_.records);
                more = !result_.done;
            }
        }
        
        //console.log('-...soggetti realizzatori caricati: ' + sr.length);
    }
    return sr;
}

//select ContentDocumentId  from ContentDocumentLink where LinkedEntityId = '8007Q00000079YQQAY'
export async function loadFileCorrelati(conn, id) {
    const fc = [];
    if (id) {
        //console.log('-Caricamento file correlati...');
        let soqlfc = `select Id, LinkedEntityId, ContentDocumentId, IsDeleted, SystemModstamp, ShareType, Visibility, ContentDocument.FileExtension, ContentDocument.ContentSize,ContentDocument.Title, ContentDocument.LastModifiedDate  from ContentDocumentLink where LinkedEntityId in `+id+` order by ContentDocument.LastModifiedDate asc`;
        let result_ = await  conn.query(soqlfc);
        fc.push(...result_.records);
        //console.log("-numero di occorrenze da caricare: " + result_.totalSize);
        //console.log("-occorrenze caricate : " + result_.records.length);
        let more = !result_.done;
        while (more) {
            if (result_.nextRecordsUrl) {
                result_ = await conn.queryMore(result_.nextRecordsUrl);
                //console.log("-caricati altri : " + result_.records.length);
                fc.push(...result_.records);
                more = !result_.done;
            }
        }
        
        //console.log('-...file correlati caricati: ' + fc.length);
    }
    return fc;
}

//select Subject, Status, Priority, IsHighPriority, OwnerId, Description, IsClosed, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, IsArchived, CallDurationInSeconds, CallType, CallDisposition, CallObject, ReminderDateTime, IsReminderSet, RecurrenceActivityId, IsRecurrence, RecurrenceStartDateOnly, RecurrenceEndDateOnly, RecurrenceTimeZoneSidKey, RecurrenceType, RecurrenceInterval, RecurrenceDayOfWeekMask, RecurrenceDayOfMonth, RecurrenceInstance, RecurrenceMonthOfYear, RecurrenceRegeneratedType, TaskSubtype,  Approvazione_Automatica__c, Data_richiesta__c, Data_scadenza_iniziale__c, Giorni_richiesti__c, Motivazione_Rifiuto__c, Requirement__c, Avviso__c, Ente__c, Fase_Cronoprogramma__c, Commenti_asseveratore__c, Comunicazione__c, Data_fine_Asseverazione__c, Esito__c, Data_scadenza_Richiesta__c, Convalidato_per_silenzio_assenso__c, Esito_convalida_PDM__c, Piano_di_migrazione__c, Data_ultima_assegnazione__c, Data_inizio_Asseverazione__c, Stato_lavorazione__c, RequirementIsFreeze__c, Data_esito__c, Invio_PEC__c, Visionata__c, In_Aggiornamento__c, Funding_Request__c, CL_controllo_formale__c, CUP__c, Decreto_di_finanziamento__c, Importo__c, Numero_Richiesta_di_Pagamento__c, Esito_controllo_1_livello__c, Esito_controllo_2_livello__c, Note_controllo_1_lv__c, Note_controllo_2_lv__c from Task where RecordTypeId in (select Id from RecordType where Name = 'Variazione Cronoprogramma') and WhatId  = 'a037Q000000njr3QAA'
export async function loadRichiesteVariazione(conn, id) {
    const rv = [];
    if (id) {
        //console.log('-Caricamento richieste di variazione...');
        let soqlrv = `select Subject, Status, Priority, IsHighPriority, OwnerId, Description, IsClosed, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, IsArchived, CallDurationInSeconds, CallType, CallDisposition, CallObject, ReminderDateTime, IsReminderSet, RecurrenceActivityId, IsRecurrence, RecurrenceStartDateOnly, RecurrenceEndDateOnly, RecurrenceTimeZoneSidKey, RecurrenceType, RecurrenceInterval, RecurrenceDayOfWeekMask, RecurrenceDayOfMonth, RecurrenceInstance, RecurrenceMonthOfYear, RecurrenceRegeneratedType, TaskSubtype,  Approvazione_Automatica__c, Data_richiesta__c, Data_scadenza_iniziale__c, Giorni_richiesti__c, Motivazione_Rifiuto__c, Requirement__c, Avviso__c, Ente__c, Fase_Cronoprogramma__c, Commenti_asseveratore__c, Comunicazione__c, Data_fine_Asseverazione__c, Esito__c, Data_scadenza_Richiesta__c, Convalidato_per_silenzio_assenso__c, Esito_convalida_PDM__c, Piano_di_migrazione__c, Data_ultima_assegnazione__c, Data_inizio_Asseverazione__c, Stato_lavorazione__c, RequirementIsFreeze__c, Data_esito__c, Invio_PEC__c, Visionata__c, In_Aggiornamento__c, Funding_Request__c, CL_controllo_formale__c, CUP__c, Decreto_di_finanziamento__c, Importo__c, Numero_Richiesta_di_Pagamento__c, Esito_controllo_1_livello__c, Esito_controllo_2_livello__c, Note_controllo_1_lv__c, Note_controllo_2_lv__c from Task where RecordTypeId in (select Id from RecordType where Name = 'Variazione Cronoprogramma') and WhatId  = '`+id+`' order by CreatedDate asc`;
        let result_ = await  conn.query(soqlrv);
        rv.push(...result_.records);
        //console.log("-numero di occorrenze da caricare: " + result_.totalSize);
        //console.log("-occorrenze caricate : " + result_.records.length);
        let more = !result_.done;
        while (more) {
            if (result_.nextRecordsUrl) {
                result_ = await conn.queryMore(result_.nextRecordsUrl);
                //console.log("-caricati altri : " + result_.records.length);
                rv.push(...result_.records);
                more = !result_.done;
            }
        }
        
        //console.log('-...richieste di variazione caricate: ' + rv.length);
    }
    return rv;
}