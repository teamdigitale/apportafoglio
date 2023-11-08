export async function loadFornitori(conn) {
    const fornitori = [];
    console.log('-Caricamento fornitori a portafoglio');
    let soqlfornitori = `select Id, Name, RecordType.Name, sfdo_grants__FundingRequest__c, Denominazione_Soggetto_Realizzatore__c, Service_provider__c, sfdo_grants__FundingRequest__r.Id from sfdo_grants__FundRqstCollaborator__c where RecordType.Name!='Titolare Effettivo' and	Soggetto_Realizzatore__c = null and IsDeleted = false`;
    let result_ = await conn.query(soqlfornitori);
    fornitori.push(...result_.records);
    console.log("-numero di occorrenze da caricare: " + result_.totalSize);
    console.log("-occorrenze caricate : " + result_.records.length);
    let more = !result_.done;
    while (more) {
        if (result_.nextRecordsUrl) {
            result_ = await conn.queryMore(result_.nextRecordsUrl);
            console.log("-caricati altri : " + result_.records.length);
            fornitori.push(...result_.records);
            more = !result_.done;
        }
    }
    console.log('-...fornitori caricati: ' + fornitori.length);
    return fornitori;
}