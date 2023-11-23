import jsforce from 'jsforce';
import { caricaCandidature } from '../../../logic/candidature.js';
import { loadEntiAPortafoglio } from '../../../logic/enti.js';
import { caricaAvvisi, caricaMisure } from '../../../logic/misure.js';
import { caricaRequirement } from '../../../logic/requirements.js';
import { caricaTasks } from '../../../logic/task.js';
import { getUtenteStandard } from '../../../lib/userdb';



export async function load({ cookies }) {
    let misure = [];
    let avvisi = [];
    let candidature = [];
    let enti = [];
    let requirementsContrattualizzazione = [];
    let requirementsCompletamentoAttivita = [];
    let tasksVariazioneCronoprogramma = [];

    const ustd = getUtenteStandard(cookies);

    if (ustd) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        await conn.login(ustd.email, ustd.password + ustd.token);
        
        misure = misure.concat(await caricaMisure(conn));
        enti = enti.concat(await loadEntiAPortafoglio(conn, ustd, 'Standard'));
        
        requirementsContrattualizzazione = requirementsContrattualizzazione.concat(await caricaRequirement(conn,'Contrattualizzazione fornitore'));
        requirementsCompletamentoAttivita = requirementsCompletamentoAttivita.concat(await caricaRequirement(conn,'Completamento Attività'));
        tasksVariazioneCronoprogramma = tasksVariazioneCronoprogramma.concat(await caricaTasks(conn,'Variazione Cronoprogramma'));
        candidature = candidature.concat(await caricaCandidature(conn, ustd));

        avvisi = avvisi.concat(await caricaAvvisi(conn));

        /* Elaborazione */
        misure.forEach((m) => {
            m.avvisiAperti = avvisi.filter((a) => a.outfunds__Status__c === 'PUBBLICATO').filter((a) => a.outfunds__Parent_Funding_Program__c === m.Id);
            m.avvisiChiusi = avvisi.filter((a) => a.outfunds__Status__c !== 'PUBBLICATO').filter((a) => a.outfunds__Parent_Funding_Program__c === m.Id);
        })
        await conn.logout();
    }

    requirementsContrattualizzazione.forEach((rcontr)=>{
        let checkTask = tasksVariazioneCronoprogramma.filter(x => x.Requirement__c === rcontr.Id);
        if(checkTask&&checkTask.length>0){
            rcontr.task = checkTask[0];
        }
    })

    requirementsCompletamentoAttivita.forEach((rcompl)=>{
        let checkTask = tasksVariazioneCronoprogramma.filter(x => x.Requirement__c === rcompl.Id);
        
        if(checkTask&&checkTask[0]){
            rcompl.task = checkTask[0];
        }
    })
    
    candidature.forEach(c =>{
        let checkcontr = requirementsContrattualizzazione.filter(x => x.outfunds__Funding_Request__c===c.Id);
        let checkcompl = requirementsCompletamentoAttivita.filter(x => x.outfunds__Funding_Request__c===c.Id);
        //let checkVariazione = tasksVariazioneCronoprogramma.filter(x => x.outfunds__Funding_Request__c===c.Id);
        if(checkcontr && checkcontr.length>0){
            c.reqcontr = checkcontr[0];
        }
        if(checkcompl && checkcompl.length>0){
          
            c.reqcompl = checkcompl[0];
        }
        /*
        if(checkVariazione && checkVariazione.length>0){
            c.reqvariazione = checkVariazione[0];
        }
        */
    })
    return {
        misure: misure,
        enti: enti,
        avvisi: avvisi,
        candidature: candidature
    };
}

