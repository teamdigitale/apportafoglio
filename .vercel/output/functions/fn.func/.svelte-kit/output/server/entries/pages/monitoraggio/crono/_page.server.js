import { p as promiseQuery } from "../../../../chunks/index2.js";
import { r as redirect } from "../../../../chunks/index.js";
import jsforce from "jsforce";
const MAX_FETCH = 1e6;
async function load({ locals }) {
  const connstandard = locals.user.connectionStandard;
  if (connstandard) {
    const conn = new jsforce.Connection({
      instanceUrl: "https://padigitale2026.my.salesforce.com",
      accessToken: connstandard
    });
    const qscadenze = promiseQuery(conn, `select 
        outfunds__Funding_Request__r.Id, 
        RecordType.Name ,
        outfunds__Due_Date__c, 
        outfunds__Funding_Request__r.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name,
        outfunds__Funding_Request__r.outfunds__FundingProgram__r.Id,
        outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Tipologia_Ente__c,
        outfunds__Funding_Request__r.outfunds__Applying_Organization__r.NumericaClusterToClusterRange__c 
        from outfunds__Requirement__c 
        where outfunds__Status__c!='Complete' 
        and outfunds__Due_Date__c >= today
        and outfunds__Status__c!='Annullato' 
        and outfunds__Status__c!='ANNULLATA'  
        and outfunds__Status__c!='Freezato' 
        and RecordType.SobjectType = 'outfunds__Requirement__c' 
        and (RecordType.Name = 'Contrattualizzazione Fornitore' or RecordType.Name = 'Completamento Attività')
        order by outfunds__Due_Date__c asc`, MAX_FETCH);
    const qenti = promiseQuery(conn, `select Id, Tipologia_Ente__c from Account`, MAX_FETCH);
    const qpositivi = promiseQuery(conn, `select Id,outfunds__Applying_Organization__r.Tipologia_Ente__c, outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name,Ultimo_Esito_Conformit_Tecnica__c,outfunds__Status__c from outfunds__Funding_Request__c`, MAX_FETCH);
    const qcronoprogrammi = promiseQuery(conn, `select Durata__c, Tipologia__c, Avviso__r.Id, Cluster__r.Tipologia_Ente__c, Cluster__r.Range__c from Dettaglio_Cronoprogramma__c where Avviso__r.Id != null`, MAX_FETCH);
    const all = Promise.all([qscadenze, qenti, qpositivi, qcronoprogrammi]);
    const values = await all;
    const scadenze = values[0];
    const enti = values[1];
    const positivi = values[2];
    const cronoprogrammi = values[3];
    scadenze.forEach((s) => {
      s.cronoprogrammi = cronoprogrammi.filter((c) => c.Avviso__r.Id === s.outfunds__Funding_Request__r.outfunds__FundingProgram__r.Id && c.Cluster__r.Tipologia_Ente__c === s.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.Tipologia_Ente__c.toUpperCase() && c.Cluster__r.Range__c === s.outfunds__Funding_Request__r.outfunds__Applying_Organization__r.NumericaClusterToClusterRange__c);
      if (s.RecordType.Name === "Contrattualizzazione Fornitore") {
        if (s.cronoprogrammi.length > 0) {
          s.tipologia = "Da contrattualizzare";
          s.outfunds__Due_Date__c = addDays(new Date(s.outfunds__Due_Date__c), s.cronoprogrammi.filter((c) => c.Tipologia__c === "COMPLETAMENTO DELL'ATTIVITA'")[0].Durata__c);
        }
      } else {
        s.tipologia = "Contrattualizzati";
      }
      s.q = getQuarter(new Date(s.outfunds__Due_Date__c));
      s.y = new Date(s.outfunds__Due_Date__c).getFullYear();
      s.quarter = "Q-" + s.y + "-" + s.q;
    });
    return {
      scadenze,
      enti,
      positivi,
      cronoprogrammi
    };
  } else {
    throw redirect(303, "/accesso");
  }
}
function getQuarter(d) {
  d = d || /* @__PURE__ */ new Date();
  var m = Math.floor(d.getMonth() / 3) + 1;
  return m > 4 ? m - 4 : m;
}
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
export {
  load
};
