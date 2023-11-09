//PLATEA
export async function caricaPlatea145(conn) {
    const records = [];
    //console.log('-Caricamento platea...');
    let soql = `Select Id, IsDeleted, Name, Regione__c, Tech_Implementation_User__r.Name, Tipologia_Ente__c, Account_Manager__r.Name, Asseveratore__r.Name, Operation_Assistant__r.Name from Account where IsDeleted = false and Tipologia_Ente__c = 'Comuni'  and  Area_geografica__c='SUD_EST'`;
    let result_ = await conn.query(soql);
    records.push(...result_.records);
    //console.log("-numero di occorrenze da caricare: " + result_.totalSize);
    //console.log("-occorrenze caricate : " + result_.records.length);
    let more = !result_.done;
    while (more) {
        if (result_.nextRecordsUrl) {
            result_ = await conn.queryMore(result_.nextRecordsUrl);
            //console.log("-caricati altri : " + result_.records.length);
            records.push(...result_.records);
            more = !result_.done;
        }
    }
    //console.log('-...platea caricata: '+records.length);
    return records;
}

//CANDIDATURE
export async function caricaCandidature145(conn) {
    const records = [];
    //console.log('-Caricamento candidature...');
    let soql = `select Id, id_richiesta_di_candidatura__c, outfunds__Applying_Organization__r.Id,outfunds__Applying_Organization__r.Name,outfunds__Applying_Organization__r.Tipologia_Ente__c, outfunds__Applying_Organization__r.Regione__c, outfunds__Status__c, Stato_contrattualizzazione__c, Stato_Progetto__c, outfunds__Awarded_Amount__c, CreatedDate  from outfunds__Funding_Request__c where outfunds__FundingProgram__c in (select Id from outfunds__Funding_Program__c where outfunds__Parent_Funding_Program__r.Name = '1.4.5 Digitalizzazione degli avvisi pubblici')`;
    let result_ = await conn.query(soql);
    records.push(...result_.records);
    //console.log("-numero di occorrenze da caricare: " + result_.totalSize);
    //console.log("-occorrenze caricate : " + result_.records.length);
    let more = !result_.done;
    while (more) {
        if (result_.nextRecordsUrl) {
            result_ = await conn.queryMore(result_.nextRecordsUrl);
            //console.log("-caricati altri : " + result_.records.length);
            records.push(...result_.records);
            more = !result_.done;
        }
    }
    //console.log('-...candidature caricata: '+records.length);
    return records;
}

//FORNITORI
export async function caricaFornitori145(conn) {
    const records = [];
    //console.log('-Caricamento fornitori...');
    let soql = `select Id, Name, RecordType.Name, sfdo_grants__FundingRequest__c, Denominazione_Soggetto_Realizzatore__c, Service_provider__c, sfdo_grants__FundingRequest__r.Id from sfdo_grants__FundRqstCollaborator__c where RecordType.Name!='Titolare Effettivo' and	Soggetto_Realizzatore__c = null and IsDeleted = false`;
    let result_ = await conn.query(soql);
    records.push(...result_.records);
    //console.log("-numero di occorrenze da caricare: " + result_.totalSize);
    //console.log("-occorrenze caricate : " + result_.records.length);
    let more = !result_.done;
    while (more) {
        if (result_.nextRecordsUrl) {
            result_ = await conn.queryMore(result_.nextRecordsUrl);
            //console.log("-caricati altri : " + result_.records.length);
            records.push(...result_.records);
            more = !result_.done;
        }
    }
    //console.log('-...fornitori caricati: '+records.length);
    return records;
}