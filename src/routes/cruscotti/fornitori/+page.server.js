import jsforce from 'jsforce';
import { promiseQuery } from '$lib/index.js';
import { redirect } from '@sveltejs/kit';
import { caricaAvvisi } from '$lib/js/shared.js';

export async function load({ locals }) {
    // @ts-ignore
    let enti = [];
    // @ts-ignore
    let misure = [];
    // @ts-ignore
    let candidature = [];
    // @ts-ignore
    let avvisi = [];
    // @ts-ignore
    let fornitori = [];
    // @ts-ignore
    const tipologieFornitori = [];
    // @ts-ignore
    const nomiFornitori = [];

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

        // @ts-ignore
        avvisi = avvisi.concat(await caricaAvvisi(conn));

        const qmisure = promiseQuery(conn, `select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Description__c, outfunds__End_Date__c, outfunds__Funding_Program_Manager__c, outfunds__Parent_Funding_Program__c, outfunds__Start_Date__c, outfunds__Status__c, outfunds__Top_Level__c, outfunds__Total_Program_Amount__c, Budget_Impegnato__c, Cluster_Regioni__c, Cluster_Scuole__c, Dichiara_inoltre_sotto_la_propria_respon__c, Dichiara_sotto_la_propria_responsabilit__c, Pacchetto__c, Parent_amount__c, Platea_potenziale__c, Oggetto_Avviso__c, Budget_Impegnato_Altro__c, Budget_Impegnato_Sud__c, InPreview__c, Program_Amount_Altro__c, Program_Amount_Sud__c, Quota_Sud__c, Fondi_disponibili_Altro__c, Fondi_disponibili_Sud__c, Fondi_disponibili__c, ID_Template__c, Codice_Controllo__c, Decode_Tipologia_Ente__c, Numero_Progressivo_Candidatura__c, Numero_Progressivo_Finestra__c, Numero_Progressivo__c, Stato_Formula__c, Nome_Progetto__c, Fondi_disponibili_Padre_1__c, Fondi_disponibili_Padre_2__c, Misura_Padre_1__c, Misura_Padre_2__c, Total_Program_Amount_Padre_1__c, Total_Program_Amount_Padre_2__c  from outfunds__Funding_Program__c where outfunds__Parent_Funding_Program__c = '' order by Name`);
        const qenti = promiseQuery(conn, `select Id, IsDeleted, Name, ShippingStreet, ShippingCity, ShippingState, ShippingPostalCode,  Website, Description, OwnerId, LastActivityDate, Codice_amministrativo__c, Active__c, Area_geografica__c, Codice_Fiscale_RL__c, Cognome_responsabile__c, Data_Nascita_RL__c, Esistenza_candidature__c,  Nome_responsabile__c,  PEC__c, Regione__c, Tech_Implementation_User__c, Titolo_responsabile__c, Tipologia_Ente__c, Integrato_Cie__c, Integrato_Spid__c, Data_Esercizio_CIE__c, Data_Esercizio_SPID__c, Integrato_CIE_Fondo_Innovazione__c, Integrato_SPID_Fondo_Innovazione__c, Protocollo_CIE__c, Account_Manager__c, Protocollo_SPID__c, Asseveratore__c, Operation_Assistant__c from Account where IsDeleted = false and (Account_Manager__c = '` + idutentesf + `' or Tech_Implementation_User__c = '` + idutentesf + `')`);
        const qcand = promiseQuery(conn, `select Id, OwnerId, IsDeleted, Name, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Application_Date__c, outfunds__Applying_Contact__c, outfunds__Applying_Employee__c, outfunds__Applying_Organization__c, outfunds__Awarded_Amount__c, outfunds__Awarded_Date__c, outfunds__Close_Date__c, outfunds__Closed_reason__c, outfunds__FundingProgram__c, outfunds__Geographical_Area_Served__c, outfunds__Population_Served__c, outfunds__Recommended_Amount__c, outfunds__Requested_Amount__c, outfunds__Requested_For__c, outfunds__Status__c, outfunds__Term_End_Date__c, outfunds__Term_Start_Date__c, outfunds__Terms__c, outfunds__Total_Remaining__c, outfunds__Total_Cancelled__c, outfunds__Total_Disbursed__c, outfunds__Unpaid_Disbursements__c, Ammissibilit__c, Base64PDF__c, Cluster__c, Codice_CUP__c, Consenso_Dichiarazioni_Inoltre__c, Consenso_Dichiarazioni__c, Data_Finanziamento__c, Data_Ricezione_CUP__c, Data_invio_candidatura__c, ErrorPDF__c, Finestra_Temporale__c, Flag_Dichiarazione_Responsabilita__c, Last_Confirmed_Step__c, Misura__c, Regione__c, Settimana_creazione__c, Step_candidatura__c, Tipologia_Istat__c, id_richiesta_di_candidatura__c, Contrattualizzazione_Fornitori__c, Data_conclusione__c, Descrizione_Progetto__c, Nome_Progetto__c, Stato_Progetto__c, CLP__c, Data_avanzamento_in_Liquidato__c, Data_Contrattualizzazione__c, IBAN__c, Last_Confirmed_Step_Progetto__c, Stato_contrattualizzazione__c, Data_Inizio_Formazione__c, Data_fine_formazione__c, Dichiarazione_Conformit_Servizi_Pubblic__c, Dichiarazione_Conformit_Sito_Internet__c, Modalita_Erogazione__c, Numero_Medio_Partecipanti__c, Numero_Ore_Formazione__c, Url_Servizi_Pubblici_Digitali__c, Url_Sito_Internet__c, Numero_task__c, Attivita_completata__c, Cittadino_Attivo_1_Descrizione__c, Cittadino_Attivo_1__c, Cittadino_Attivo_definitiva_Descrizione__c, Cittadino_Attivo_definitiva__c, Cittadino_Attivo_n_Descrizione__c, Cittadino_Attivo_n__c, Cittadino_Informato_1__c, Cittadino_Informato_definitiva__c, Cittadino_Informato_n__c, Codice_Amministrativo__c, Criteri_Conformita_1__c, Criteri_Conformita_definitiva__c, Criteri_Conformita_n__c, Esperienza_Utente_1_Descrizione__c, Esperienza_Utente_1__c, Esperienza_Utente_definitiva_Descrizione__c, Esperienza_Utente_definitiva__c, Esperienza_Utente_n_Descrizione__c, Esperienza_Utente_n__c, Funzionalita_1_Descrizione__c, Funzionalita_1__c, Funzionalita_definitiva_Descrizione__c, Funzionalita_definitiva__c, Funzionalita_n_Descrizione__c, Funzionalita_n__c, ID_Crawler_Job_1__c, ID_Crawler_Job_Nota_1__c, ID_Crawler_Job_Nota_definitiva__c, ID_Crawler_Job_Nota_n__c, ID_Crawler_Job_definitiva__c, ID_Crawler_Job_n__c, ID_Crawler__c, Motivazione_Altro_Revoca_Progetto__c, Motivazione_Revoca_Progetto__c, Normativa_1_Descrizione__c, Normativa_1__c, Normativa_definitiva_Descrizione__c, Normativa_definitiva__c, Normativa_n_Descrizione__c, Normativa_n__c, Pacchetto_1_4_1__c, Prestazioni_1__c, Prestazioni_definitiva__c, Prestazioni_n__c, Progetto_Terminato__c, Raccomandazioni_1_Descrizione__c, Raccomandazioni_1__c, Raccomandazioni_definitiva_Descrizione__c, Raccomandazioni_definitiva__c, Raccomandazioni_n_Descrizione__c, Raccomandazioni_n__c, Sicurezza_1_Descrizione__c, Sicurezza_1__c, Sicurezza_definitiva_Descrizione__c, Sicurezza_definitiva__c, Sicurezza_n_Descrizione__c, Sicurezza_n__c, Status_Generale_1__c, Status_Generale_definitiva__c, Status_Generale_n__c, URL_Scansione_1__c, URL_Scansione_definitiva__c, URL_Scansione_n__c, rinuncia__c, Controllo_URL__c, Data_Job_Crawler_1__c, Data_Job_Crawler_definitiva__c, Data_Job_Crawler_n__c, Cittadino_Attivo_1L__c, Cittadino_Attivo_definitivaL__c, Cittadino_Attivo_nL__c, Cittadino_Informato_1L__c, Cittadino_Informato_definitivaL__c, Cittadino_Informato_nL__c, Criteri_Conformita_1L__c, Criteri_Conformita_definitivaL__c, Criteri_Conformita_nL__c, Da_escludere__c, Esperienza_Utente_1L__c, Esperienza_Utente_definitivaL__c, Esperienza_Utente_nL__c, Funzionalita_1L__c, Funzionalita_definitivaL__c, Funzionalita_nL__c, Normativa_1L__c, Normativa_definitivaL__c, Normativa_nL__c, Prestazioni_1L__c, Prestazioni_definitivaL__c, Prestazioni_nL__c, Raccomandazioni_1L__c, Raccomandazioni_definitivaL__c, Raccomandazioni_nL__c, Sicurezza_1L__c, Sicurezza_definitivaL__c, Sicurezza_nL__c, Status_Generale1_1L__c, Status_Generale_definitivaL__c, Status_Generale_nL__c, Codice_Gestionale__c, Codice_inserito_manualmente__c, Cognome_Responsabile_Conservazione__c, Comune_Responsabile_Conservazione__c, Conflitto_di_interesse__c, DNSH_modificato__c, Data_avanzamento_step_5__c, Data_completamento_attivit__c, Data_esito_controlli_automatici__c, Descrizione_controlli__c, DocJobId__c, Doppio_finanziamento__c, Due_date_controlli__c, Esito_controlli__c, Indirizzo_Responsabile_Conservazione__c, Integrazione_PDND__c, Nome_Responsabile_Conservazione__c, Provincia_Responsabile_Conservazione__c, Tipologia_codice__c, Check_Data_Avanzamento_Step_5__c, Data_avanzamento_in_Liquidazione__c, Notifica_Liquidazione__c, Sezione_tesoreria__c, Conto_di_Tesoreria__c, IBAN_Report__c, Causale_Trasferimento__c, Data_Revoca_Decretata__c, Revoca__c, Ultimo_Esito_Conformit_Tecnica__c, Codice_misura_SAP__c, Conto_Contabilit_Speciale__c, Data_estrazione__c, Sezione_Contabilit_Speciale__c, Approvazione_offerta__c, Audit__c, Azioni_effettuate__c, Contratto_elaborato__c, Data_fine_Audit__c, Data_inizio_Audit__c, Delibera_Richiesta_offerta__c, Delibera_approvazione_offerta__c, Delibera_nomina_RUP_e_DEC__c, Dichiarazione_conformita_Migrazione__c, Esito_Audit__c, Motivazione_Audit__c, Predisposizione_progetto__c, Realizzero_intervento_senza_fornitori__c, Ricezione_offerta__c, Scelta_Fornitore__c, Stato_Audit__c, Pacchetto_Servizi__c, Criteri_Superati_Crawler_1__c, Criteri_Superati_Crawler_definitiva__c, Criteri_Superati_Crawler_n__c, Data_scansione_fallita__c, Riferimento_ReGIS__c, Versione_Crawler_1__c, Versione_Crawler_definitiva__c, Versione_Crawler_n__c, Check_Data_Scansione_Fallita__c, Scansione_fallita__c, Awarded_Amount_Padre_1__c, Awarded_Amount_Padre_2__c, Da_Scansionare_Data_Scansione__c, Da_Scansionare__c, Data_Rinuncia__c, hasServizi11__c, hasServizi12__c, havePDM__c, Nome_file_1__c, Nome_file_n__c, Report_Crawler_scansione_1_text__c, Report_Crawler_scansione_def_text__c, Report_Crawler_scansione_n_text__c, URL_scansione_fallita__c, Report_Crawler_scansione_1__c, Report_Crawler_scansione_definitiva__c, Report_Crawler_scansione_n__c, Last_Confirmed_Step_Modifica_Progetto__c, Stato_modifica__c, Codice_Gestionale_Report__c, Tipologia_documento__c, Data_convalida_silenzio_assenso__c, Tipo_Misura__c, Esito_campagna_duplicato_143_appIO__c, Risposta_PEC_143_appIO__c, Numero_notifiche__c, Data_asseverazione_tecnica__c, Numero_Richiesta_di_Pagamento__c, OldTemplate12__c  from outfunds__Funding_Request__c where Stato_Progetto__c!='DA AVVIARE' and outfunds__Status__c='FINANZIATA' and outfunds__Applying_Organization__c in (select Id from Account where IsDeleted =false and (Account_Manager__c = '` + idutentesf + `' or Tech_Implementation_User__c = '` + idutentesf + `'))`);
        const qforn = promiseQuery(conn, `select Id, Name, RecordType.Name, sfdo_grants__FundingRequest__c, Denominazione_Soggetto_Realizzatore__c, Service_provider__c, sfdo_grants__FundingRequest__r.Id, P_IVA__c, Codice_Fiscale__c from sfdo_grants__FundRqstCollaborator__c  where RecordType.Name!='Titolare Effettivo' and Soggetto_Realizzatore__c = null and IsDeleted = false and (sfdo_grants__FundingRequest__r.outfunds__Applying_Organization__r.Account_Manager__c = '` + idutentesf + `' or  sfdo_grants__FundingRequest__r.outfunds__Applying_Organization__r.Tech_Implementation_User__c  = '` + idutentesf + `') and Service_provider__c = false`);
        const all = Promise.all([qmisure, qenti, qcand, qforn]);
        const values = await all;
        misure = values[0];
        enti = values[1];
        candidature = values[2];
        fornitori = values[3];



        fornitori.forEach(f => {
            if (!f.Denominazione_Soggetto_Realizzatore__c) {
                f.Denominazione_Soggetto_Realizzatore__c = 'n.d.';
            }
            f.Denominazione_Soggetto_Realizzatore__c = f.Denominazione_Soggetto_Realizzatore__c.toUpperCase();
        })

        omogeneizzaFornitori(fornitori);

        candidature.forEach(c => {
            c.fornitori = fornitori.filter(f => f.sfdo_grants__FundingRequest__r.Id === c.Id);
            c.ente = enti.filter(e => e.Id === c.outfunds__Applying_Organization__c);
        })



        //helpers
        candidature.forEach(c => {
            c.fornitori.forEach(f => {
                if (tipologieFornitori.indexOf(f.RecordType.Name) == -1) tipologieFornitori.push(f.RecordType.Name);
                if (nomiFornitori.indexOf(f.Denominazione_Soggetto_Realizzatore__c.toUpperCase()) == -1) nomiFornitori.push(f.Denominazione_Soggetto_Realizzatore__c.toUpperCase());
            });
        }
        );

        avvisi.forEach(a => {
            a.candidature = candidature.filter(c => c.outfunds__FundingProgram__c === a.Id);
        });

        misure.forEach(m => {
            m.avvisi = avvisi.filter(a => a.outfunds__Parent_Funding_Program__c === m.Id);
        });

        for (let z = 0; z < misure.length; z++) {

            misure[z].conteggioFornitori = [];
            misure[z].valoreFornitori = [];
            for (let y = 0; y < misure[z].avvisi.length; y++) {
                for (let x = 0; x < misure[z].avvisi[y].candidature.length; x++) {
                    if (misure[z].avvisi[y].candidature[x].fornitori && misure[z].avvisi[y].candidature[x].fornitori.length > 0) {
                        for (let w = 0; w < misure[z].avvisi[y].candidature[x].fornitori.length; w++) {
                            let cc = misure[z].conteggioFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c);
                            if (cc
                                && cc.length > 0) {
                                misure[z].conteggioFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c)[0].count = misure[z].conteggioFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c)[0].count + 1;
                            } else {
                                misure[z].conteggioFornitori.push({ nome: misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c, count: 1 });
                            }
                            let ss = misure[z].valoreFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c);
                            if (ss
                                && ss.length > 0) {
                                misure[z].valoreFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c)[0].value = misure[z].valoreFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c)[0].value + misure[z].avvisi[y].candidature[x].outfunds__Awarded_Amount__c;
                            } else {
                                misure[z].valoreFornitori.push({ nome: misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c, value: misure[z].avvisi[y].candidature[x].outfunds__Awarded_Amount__c });
                            }
                        }
                    }
                }
            }
            misure[z].conteggioFornitori.sort((a, b) => { return b.count - a.count });
            misure[z].valoreFornitori.sort((a, b) => { return b.value - a.value });
        }

        for (let z = 0; z < misure.length; z++) {
            misure[z].conteggioFornitori = [];
            misure[z].valoreFornitori = [];
            for (let y = 0; y < misure[z].avvisi.length; y++) {
                for (let x = 0; x < misure[z].avvisi[y].candidature.length; x++) {
                    if (misure[z].avvisi[y].candidature[x].fornitori && misure[z].avvisi[y].candidature[x].fornitori.length > 0) {
                        for (let w = 0; w < misure[z].avvisi[y].candidature[x].fornitori.length; w++) {
                            let cc = misure[z].conteggioFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c);
                            if (cc
                                && cc.length > 0) {
                                misure[z].conteggioFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c)[0].count = misure[z].conteggioFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c)[0].count + 1;
                            } else {
                                misure[z].conteggioFornitori.push({ nome: misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c, count: 1 });
                            }
                            let ss = misure[z].valoreFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c);
                            if (ss
                                && ss.length > 0) {
                                misure[z].valoreFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c)[0].value = misure[z].valoreFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c)[0].value + misure[z].avvisi[y].candidature[x].outfunds__Awarded_Amount__c;
                            } else {
                                misure[z].valoreFornitori.push({ nome: misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c, value: misure[z].avvisi[y].candidature[x].outfunds__Awarded_Amount__c });
                            }
                        }
                    }
                }
            }
            misure[z].conteggioFornitori.sort((a, b) => { return b.count - a.count });
            misure[z].valoreFornitori.sort((a, b) => { return b.value - a.value });
        }


        return {
            misure: misure,
            enti: enti,
            tipologieFornitori: tipologieFornitori,
            nomiFornitori: nomiFornitori.sort(),
            candidature: candidature
        };
    } else {
        throw redirect(303, '/users');
    }
}

function omogeneizzaFornitori(fornitori){
    const piva = [];
    fornitori.forEach(f => {
        if(piva.filter(p => p.piva===f.P_IVA__c).length===0){
            piva.push({piva: f.P_IVA__c,denominazione: f.Denominazione_Soggetto_Realizzatore__c})
        }
        f.Denominazione_Soggetto_Realizzatore__c = piva.filter(p => p.piva===f.P_IVA__c)[0].denominazione;
    });
}