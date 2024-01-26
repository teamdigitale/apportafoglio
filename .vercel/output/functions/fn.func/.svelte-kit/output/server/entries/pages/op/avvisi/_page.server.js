import jsforce from "jsforce";
import { r as redirect } from "../../../../chunks/index.js";
async function load({ locals }) {
  const connstandard = locals.user.connectionStandard;
  const connasseveratore = locals.user.connectionAsseveratore;
  const connection = connstandard ? connstandard : connasseveratore;
  if (connection) {
    const conn = new jsforce.Connection({
      instanceUrl: "https://padigitale2026.my.salesforce.com",
      accessToken: connection
    });
    const pavvisi = caricaAvvisi(conn);
    const pmisure = caricaMisure(conn);
    const all = Promise.all([pavvisi, pmisure]);
    const values = await all;
    return {
      avvisi: values[0],
      misure: values[1]
    };
  } else {
    throw redirect(303, "/accesso");
  }
}
async function caricaMisure(conn) {
  const records = [];
  let soqmisure = `select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Description__c, outfunds__End_Date__c, outfunds__Funding_Program_Manager__c, outfunds__Parent_Funding_Program__c, outfunds__Start_Date__c, outfunds__Status__c, outfunds__Top_Level__c, outfunds__Total_Program_Amount__c, Budget_Impegnato__c, Cluster_Regioni__c, Cluster_Scuole__c, Dichiara_inoltre_sotto_la_propria_respon__c, Dichiara_sotto_la_propria_responsabilit__c, Pacchetto__c, Parent_amount__c, Platea_potenziale__c, Oggetto_Avviso__c, Budget_Impegnato_Altro__c, Budget_Impegnato_Sud__c, InPreview__c, Program_Amount_Altro__c, Program_Amount_Sud__c, Quota_Sud__c, Fondi_disponibili_Altro__c, Fondi_disponibili_Sud__c, Fondi_disponibili__c, ID_Template__c, Codice_Controllo__c, Decode_Tipologia_Ente__c, Numero_Progressivo_Candidatura__c, Numero_Progressivo_Finestra__c, Numero_Progressivo__c, Stato_Formula__c, Nome_Progetto__c, Fondi_disponibili_Padre_1__c, Fondi_disponibili_Padre_2__c, Misura_Padre_1__c, Misura_Padre_2__c, Total_Program_Amount_Padre_1__c, Total_Program_Amount_Padre_2__c  from outfunds__Funding_Program__c where outfunds__Parent_Funding_Program__c = '' order by Name`;
  let result_ = await conn.query(soqmisure);
  records.push(...result_.records);
  let more = !result_.done;
  while (more) {
    if (result_.nextRecordsUrl) {
      result_ = await conn.queryMore(result_.nextRecordsUrl);
      records.push(...result_.records);
      more = !result_.done;
    }
  }
  return records;
}
async function caricaAvvisi(conn) {
  const records = [];
  let soqlavvisi = `select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Description__c, outfunds__End_Date__c, outfunds__Funding_Program_Manager__c, outfunds__Parent_Funding_Program__c, outfunds__Start_Date__c, outfunds__Status__c, outfunds__Top_Level__c, outfunds__Total_Program_Amount__c, Budget_Impegnato__c, Cluster_Regioni__c, Cluster_Scuole__c, Pacchetto__c, Parent_amount__c, Platea_potenziale__c, Oggetto_Avviso__c, Budget_Impegnato_Altro__c, Budget_Impegnato_Sud__c, InPreview__c, Program_Amount_Altro__c, Program_Amount_Sud__c, Quota_Sud__c, Fondi_disponibili_Altro__c, Fondi_disponibili_Sud__c, Fondi_disponibili__c, ID_Template__c, Codice_Controllo__c, Decode_Tipologia_Ente__c, Numero_Progressivo_Candidatura__c, Numero_Progressivo_Finestra__c, Numero_Progressivo__c, Stato_Formula__c, Nome_Progetto__c, Fondi_disponibili_Padre_1__c, Fondi_disponibili_Padre_2__c, Misura_Padre_1__c, Misura_Padre_2__c, Total_Program_Amount_Padre_1__c, Total_Program_Amount_Padre_2__c  from outfunds__Funding_Program__c where outfunds__Parent_Funding_Program__c != '' and (outfunds__Status__c='TERMINATO' or outfunds__Status__c='PUBBLICATO') order by outfunds__End_Date__c  desc`;
  let result_ = await conn.query(soqlavvisi);
  records.push(...result_.records);
  let more = !result_.done;
  while (more) {
    if (result_.nextRecordsUrl) {
      result_ = await conn.queryMore(result_.nextRecordsUrl);
      records.push(...result_.records);
      more = !result_.done;
    }
  }
  const res = await fetch("https://raw.githubusercontent.com/teamdigitale/padigitale2026-opendata/main/data/avvisi.json");
  const data = await res.json();
  for (let z = 0; z < data.length; z++) {
    data[z].beneficiari = data[z].soggetti_destinatari.toUpperCase().split(";");
  }
  records.forEach(
    (a) => {
      a.Name = a.Name.replaceAll('"', "'").replaceAll("”", "'");
      if (data.filter((d) => d.titolo.startsWith(a.Name))[0]) {
        a.beneficiari = data.filter((d) => d.titolo.startsWith(a.Name))[0].beneficiari;
      }
    }
  );
  return records;
}
export {
  load
};
