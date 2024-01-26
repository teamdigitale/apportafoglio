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
    const misure = promiseQuery(conn, `select Id, Name, outfunds__Start_Date__c,outfunds__End_Date__c,  outfunds__Status__c, outfunds__Total_Program_Amount__c from outfunds__Funding_Program__c where IsDeleted =false and outfunds__Parent_Funding_Program__c = '' and outfunds__Total_Program_Amount__c != null order by Name`, MAX_FETCH);
    const cok = promiseQuery(conn, `Select Id,outfunds__FundingProgram__c, outfunds__Applying_Organization__r.Tipologia_Ente__c from outfunds__Funding_Request__c 
        where outfunds__Status__c = 'FINANZIATA'`, MAX_FETCH);
    const cko = promiseQuery(conn, `Select Id,outfunds__FundingProgram__c, outfunds__Applying_Organization__r.Tipologia_Ente__c from outfunds__Funding_Request__c 
        where outfunds__Status__c IN ('RINUNCIATA','REVOCATA')`, MAX_FETCH);
    const all = Promise.all([misure, cok, cko]);
    const values = await all;
    const cb = values[1];
    const cc = values[2];
    const avvisi = await promiseQuery(conn, `select Id, outfunds__Parent_Funding_Program__r.Id,Misura_Padre_1__c, Misura_Padre_2__c, outfunds__Total_Program_Amount__c, Total_Program_Amount_Padre_1__c, Total_Program_Amount_Padre_2__c, Name, outfunds__Status__c, outfunds__Start_Date__c, outfunds__End_Date__c   from outfunds__Funding_Program__c 
        where outfunds__Parent_Funding_Program__c != null  order by outfunds__End_Date__c desc`, MAX_FETCH);
    const res = await fetch("https://raw.githubusercontent.com/teamdigitale/padigitale2026-opendata/main/data/avvisi.json");
    const data = await res.json();
    for (let z = 0; z < data.length; z++) {
      data[z].beneficiari = data[z].soggetti_destinatari.split(";");
    }
    avvisi.forEach(
      (a) => {
        a.Name = a.Name.replaceAll('"', "'").replaceAll("”", "'");
        if (data.filter((d) => d.titolo.startsWith(a.Name))[0]) {
          a.beneficiari = [];
          const bb = data.filter((d) => d.titolo.startsWith(a.Name))[0].beneficiari;
          bb.forEach((b) => {
            a.beneficiari.push({ beneficiario: b.toUpperCase().replaceAll("AZIENDE OSPEDALIERE", "AOO").replaceAll("AGENZIE REGIONALI SANITARIE", "ASL").replaceAll("CITTA METROPOLITANE", "PROVINCE").toUpperCase() });
          });
        }
      }
    );
    const enti = await promiseQuery(conn, `select Id,Tipologia_Ente__c from Account where IsDeleted = false`, MAX_FETCH);
    const platee = Object.values(
      enti.reduce((a, { Tipologia_Ente__c }) => {
        a[Tipologia_Ente__c] = a[Tipologia_Ente__c] || {
          Tipologia_Ente__c,
          count: 0
        };
        a[Tipologia_Ente__c].count++;
        return a;
      }, /* @__PURE__ */ Object.create(null))
    );
    console.log(platee);
    avvisi.forEach((a) => {
      console.log("Analisi avviso: " + a.Name);
      if (a.Misura_Padre_1__c || a.Misura_Padre_2__c) {
        if (a.Misura_Padre_1__c) {
          console.log("Misura di appartenenza: " + values[0].filter((m) => m.Id === a.Misura_Padre_1__c)[0].Name);
        }
        if (a.Misura_Padre_2__c) {
          console.log("Misura di appartenenza: " + values[0].filter((m) => m.Id === a.Misura_Padre_2__c)[0].Name);
        }
      } else {
        console.log("Misura di appartenenza: " + values[0].filter((m) => m.Id === a.outfunds__Parent_Funding_Program__r.Id)[0].Name);
        a.beneficiari.forEach((b) => {
          console.log("Analisi beneficiario: " + b);
          const pgenerale = platee.filter((p) => p.Tipologia_Ente__c.toUpperCase() === b.beneficiario)[0].count;
          console.log("Platea generale: " + pgenerale);
          b.platea_generale = pgenerale;
          b.ok = cb.filter((x) => x.outfunds__FundingProgram__c === a.Id && x.outfunds__Applying_Organization__r.Tipologia_Ente__c.toUpperCase() === b.beneficiario).length;
          b.ko = cc.filter((x) => x.outfunds__FundingProgram__c === a.Id && x.outfunds__Applying_Organization__r.Tipologia_Ente__c.toUpperCase() === b.beneficiario).length;
        });
      }
    });
    return {
      misure: values[0],
      avvisi
    };
  } else {
    throw redirect(303, "/accesso");
  }
}
export {
  load
};
