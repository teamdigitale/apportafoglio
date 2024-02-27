// @ts-nocheck
import jsforce from 'jsforce';
import { promiseQuery } from '$lib/index.js';
import { redirect } from '@sveltejs/kit';
import { getQuarter, mapTipologiaEnte } from '$lib/js/shared.js';

const MAXFETCH = 9999999999;

export async function load({ locals, params, url }) {

    const connstandard = locals.user.connectionStandard;
    const connection = connstandard;

    if (connection) {
        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connection
        });

        let idmisura = params.idmisura;
        const PACCHETTO = url.searchParams.get('pacchetto');

        const qmis = await promiseQuery(
            conn,
            "select Name from outfunds__Funding_Program__c  where outfunds__Parent_Funding_Program__c = null and Id = '" + idmisura + "'", MAXFETCH
        )

        const MISURA = qmis[0].Name;

        //* DB QUERY *//
        const pmisure = promiseQuery(
            conn,
            "select Id, Name from outfunds__Funding_Program__c  where outfunds__Parent_Funding_Program__c = null order by name asc", MAXFETCH
        );
        const pcandidature = promiseQuery(
            conn,
            "select Id,outfunds__FundingProgram__r.Id,outfunds__Applying_Organization__r.Tipologia_Ente__c,outfunds__Applying_Organization__r.NumericaClusterToClusterRange__c,outfunds__Status__c,outfunds__Applying_Organization__r.Id, Stato_contrattualizzazione__c, Stato_Progetto__c, Ultimo_Esito_Conformit_Tecnica__c, Data_asseverazione_tecnica__c , Data_avanzamento_step_5__c, Data_conclusione__c, Data_Contrattualizzazione__c, Data_Finanziamento__c  from outfunds__Funding_Request__c " +
            (MISURA === '1.2 Abilitazione e facilitazione migrazione al Cloud'
                ? " where outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id = '" + idmisura + "' or (outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name='1.1 e 1.2 Multimisura' and hasServizi11__c = false)"
                : MISURA==='1.1 Infrastrutture digitali'?" where outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id = '" + idmisura + "' or (outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name='1.1 e 1.2 Multimisura' and hasServizi11__c = true)"
                : " where outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id = '" + idmisura + "'" +(PACCHETTO===null?"":(" and outfunds__FundingProgram__r.Pacchetto__c = '"+PACCHETTO+"'"))
            )
            ,MAXFETCH
        );
        
        const psoggettidestinatari = promiseQuery(
            conn,
            "select Id, Name, SOGGETTI_DESTINATARI__c from outfunds__Funding_Program__c  " +
            (MISURA === '1.2 Abilitazione e facilitazione migrazione al Cloud'
                ? " where outfunds__Parent_Funding_Program__c = '" + idmisura + "'"
                : " where outfunds__Parent_Funding_Program__c = '" + idmisura + "'"
            )
            ,MAXFETCH
        )
        const pcrono = promiseQuery(
            conn,
            "select Id, Cluster__r.Range__c, Cluster__r.Misura__r.Id, Tipologia__c, Durata__c, Avviso__r.Id from Dettaglio_Cronoprogramma__c where Cluster__r.Range__c != 'Unico'"+
            (PACCHETTO===null?"":(" and Cluster__r.Pacchetto__c = '"+PACCHETTO+"'"))
            ,MAXFETCH
        )
        const pqrcs = promiseQuery(
            conn,
            "select Id, outfunds__Status__c, outfunds__Due_Date__c, Data_apertura_fase__c, Giorni_rimanenti_counter__c, outfunds__Funding_Request__c   from outfunds__Requirement__c where outfunds__Funding_Request__c in (select id from outfunds__Funding_Request__c " +
            (MISURA === '1.2 Abilitazione e facilitazione migrazione al Cloud'
                ? " where outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id = '" + idmisura + "' or (outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name='1.1 e 1.2 Multimisura' and hasServizi11__c = false)) and RecordType.Name = 'Completamento Attività' and outfunds__Status__c != 'Complete' and outfunds__Status__c != 'Annullato'"
                : MISURA==='1.1 Infrastrutture digitali'?" where outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id = '" + idmisura + "' or (outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name='1.1 e 1.2 Multimisura' and hasServizi11__c = true)) and RecordType.Name = 'Completamento Attività' and outfunds__Status__c != 'Complete' and outfunds__Status__c != 'Annullato'"
                : (" where outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id = '" + idmisura + "'"+
                (PACCHETTO===null?"":(" and outfunds__FundingProgram__r.Pacchetto__c = '"+PACCHETTO+"'"))+")"
                +" and RecordType.Name = 'Completamento Attività' and outfunds__Status__c != 'Complete' and outfunds__Status__c != 'Annullato'")
            )
            ,MAXFETCH
        )
        const pqrcf = promiseQuery(
            conn,
            "select Id, outfunds__Status__c, outfunds__Due_Date__c, Data_apertura_fase__c, Giorni_rimanenti_counter__c, outfunds__Funding_Request__c   from outfunds__Requirement__c where " +
            (MISURA === '1.2 Abilitazione e facilitazione migrazione al Cloud'
                ? MISURA==='1.1 Infrastrutture digitali'?" outfunds__Funding_Request__c in (select id from outfunds__Funding_Request__c where outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id = '" + idmisura + "' or (outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name='1.1 e 1.2 Multimisura' and hasServizi11__c = true)) and RecordType.Name = 'Contrattualizzazione Fornitore' and outfunds__Status__c = 'Open'"
                :" outfunds__Funding_Request__c in (select id from outfunds__Funding_Request__c where outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id = '" + idmisura + "' or (outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name='1.1 e 1.2 Multimisura' and hasServizi11__c = false)) and RecordType.Name = 'Contrattualizzazione Fornitore' and outfunds__Status__c = 'Open'"
                : (" outfunds__Funding_Request__c in (select id from outfunds__Funding_Request__c where outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Id = '" + idmisura + "'"+
                (PACCHETTO===null?"":(" and outfunds__FundingProgram__r.Pacchetto__c = '"+PACCHETTO+"'"))+
                ") and RecordType.Name = 'Contrattualizzazione Fornitore' and outfunds__Status__c = 'Open'")),
            MAXFETCH
        )

        const all1 = Promise.all([pmisure, pcandidature, psoggettidestinatari, pcrono, pqrcs, pqrcf]);
        const all1values = await all1;

        const misure = all1values[0].map(e => ({ idmisura: e.Id, misura: e.Name }));
        const candidature = all1values[1].map(e => ({
            idcandidatura: e.Id,
            idavviso: e.outfunds__FundingProgram__r.Id,
            stato_candidatura: e.outfunds__Status__c,
            idente: e.outfunds__Applying_Organization__r.Id,
            stato_contrattualizzazione: e.Stato_contrattualizzazione__c,
            stato_progetto: (e.Stato_Progetto__c==='IN VERIFICA'&&e.Ultimo_Esito_Conformit_Tecnica__c==='Positivo')?'IN VERIFICA FORMALE':(e.Stato_Progetto__c==='IN VERIFICA'&&e.Ultimo_Esito_Conformit_Tecnica__c!=='Positivo')?'IN VERIFICA TECNICA': e.Stato_Progetto__c,
            ultimo_esito_conformita_tecnica: e.Ultimo_Esito_Conformit_Tecnica__c,
            data_ultimo_esito_conformita_tecnica: e.Data_asseverazione_tecnica__c ? new Date(e.Data_asseverazione_tecnica__c.substring(0, 10)) : null,
            data_avanzamento_step_5: e.Data_avanzamento_step_5__c,
            data_contrattualizzazione: e.Data_Contrattualizzazione__c,
            data_conclusione: e.Data_conclusione__c,
            cluster: e.outfunds__Applying_Organization__r.NumericaClusterToClusterRange__c,
            tipologia_ente: mapTipologiaEnte(misure.find(m => m.idmisura === idmisura).misura, e.outfunds__Applying_Organization__r.Tipologia_Ente__c)
        }));

        const soggetti_destinatari = [];
        all1values[2].forEach(e => {
            let sd = e.SOGGETTI_DESTINATARI__c.split(";");
            sd.forEach(s => {
                if (soggetti_destinatari.indexOf(s) === -1) {
                    soggetti_destinatari.push(s);
                }
            });
        });

        const qe = await promiseQuery(
            conn,
            "select Id,NumericaClusterToClusterRange__c,Tipologia_Ente__c from Account where Tipologia_Ente__c in ('" + soggetti_destinatari.join("','") + "') and Regione__c != null", MAXFETCH
        )
        const enti = qe.map(e => ({ idente: e.Id, cluster: e.NumericaClusterToClusterRange__c, tipologia_ente: mapTipologiaEnte(misure.find(m => m.idmisura === idmisura).misura, e.Tipologia_Ente__c) }));


        const cronoprogrammi = all1values[3].map(e => ({
            idcrono: e.Id, durata: e.Durata__c, tipologia: e.Tipologia__c,
            idmisura: e.Cluster__r.Misura__r.Id, range: e.Cluster__r.Range__c,
            idavviso: e.Avviso__r ? e.Avviso__r.Id : null
        }));

        const requirementCompletamento = all1values[4].map(e => ({
            idrequirement: e.Id,
            due_date: new Date(e.outfunds__Due_Date__c), idcandidatura: e.outfunds__Funding_Request__c
        }));

        const requirementContrattualizzazione = all1values[5].map(e => ({
            idrequirement: e.Id,
            due_date: new Date(e.outfunds__Due_Date__c), idcandidatura: e.outfunds__Funding_Request__c
        }));
        let x = 0;
        candidature.forEach(c => {

            if (c.stato_candidatura === 'FINANZIATA') {
                if (c.ultimo_esito_conformita_tecnica === 'Positivo' || c.ultimo_esito_conformita_tecnica === 'Negativo') {
                    c.data_completamento = new Date(c.data_avanzamento_step_5);
                    c.tipocompletamento = "1. Finale (esito finale positivo o negativo)";
                } else {
                    if (c.stato_contrattualizzazione === 'Completata') {
                        if (c.stato_progetto === 'IN VERIFICA TECNICA') {
                            c.data_completamento = new Date(c.data_conclusione);
                            c.tipocompletamento = "2. Stimata (in asseverazione)";
                        } else {
                            c.data_completamento = new Date(c.data_conclusione);
                            /*
                            c.data_completamento = requirementCompletamento.find(r => r.idcandidatura === c.idcandidatura).due_date;
                            */
                            c.tipocompletamento = "3. Stimata (contrattualizzazione fatta)";
                            
                        }
                    } else {
                        if (requirementContrattualizzazione.find(r => r.idcandidatura === c.idcandidatura)) {
                            c.data_contrattualizzazione = requirementContrattualizzazione.find(r => r.idcandidatura === c.idcandidatura).due_date;
                            let crono = cronoprogrammi.find(
                                cro => {
                                    if (cro.idavviso !== null) {
                                        return cro.idavviso === c.idavviso && (cro.range === 'Unico' ? true : cro.range === c.cluster) && cro.tipologia === "COMPLETAMENTO DELL'ATTIVITA'"
                                        
                                    } else {
                                        return cro.idmisura === idmisura && cro.tipologia === "COMPLETAMENTO DELL'ATTIVITA'";
                                    }
                                }
                            );
                            if(crono){
                            c.data_completamento = addDays(new Date(c.data_contrattualizzazione), cronoprogrammi.find(
                                cro => {
                                    if (cro.idavviso !== null) {
                                        return cro.idavviso === c.idavviso && (cro.range === 'Unico' ? true : cro.range === c.cluster) && cro.tipologia === "COMPLETAMENTO DELL'ATTIVITA'"
                                        
                                    } else {
                                        return cro.idmisura === idmisura && cro.tipologia === "COMPLETAMENTO DELL'ATTIVITA'";
                                    }
                                }
                            ).durata
                            );
                            }else{
                                c.data_completamento=new Date(c.data_conclusione)
                            }
                            c.tipocompletamento = "4. Incerta (contrattualizzazione stimata)";
                        } else {
                            x++;
                        }
                    }
                }
                c.quartercompletamento = getQuarter(c.data_completamento);
            }

        });



        return {
            misura: misure.find(m => m.idmisura === idmisura),
            candidature: candidature,
            destinatari: soggetti_destinatari,
            enti: enti,
            misure: misure,
            pacchetto: PACCHETTO
        }
    } else {
        throw redirect(303, 'users');
    }

}

const addDays = (d, n) => {
    let res = new Date(new Date(d).setDate(d.getDate() + n));
    if (d) {
        return res;
    } else {
        return new Date()
    }
}

