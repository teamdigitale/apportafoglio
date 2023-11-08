import jsforce from 'jsforce';

export async function caricaCandidatureSenzaDataContrattualizzazione(conn,id) {
    console.log("Caricamento candidature senza data di contrattualizzazione in corso...");
    const records = [];
    let soqlcandidature = `select outfunds__Applying_Organization__r.Name,outfunds__Applying_Organization__r.ShippingState,outfunds__Applying_Organization__r.Tipologia_Ente__c ,Regione__c,Id,Misura__c,outfunds__Status__c, Data_Finanziamento__c, Data_Contrattualizzazione__c  from outfunds__Funding_Request__c where outfunds__Applying_Organization__c in (select Id from Account where IsDeleted =false and (Account_Manager__c = '`+id+`' or Tech_Implementation_User__c = '`+id+`')) and outfunds__Status__c = 'FINANZIATA' and Data_Contrattualizzazione__c = null order by Data_Finanziamento__c asc`;
    let result_ = await conn.query(soqlcandidature);
    records.push(...result_.records);
    let more = !result_.done;
    while (more) {
        if (result_.nextRecordsUrl) {
            result_ = await conn.queryMore(result_.nextRecordsUrl);
            records.push(...result_.records);
            more = !result_.done;
        }
    }
    console.log("...caricate "+records.length+" candidature");
    return records;
}