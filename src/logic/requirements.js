
import jsforce from 'jsforce';
//select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Assigned__c, outfunds__Completed_Date__c, outfunds__Due_Date__c, outfunds__Funding_Request__c, outfunds__Primary_Contact__c, outfunds__Requirements__c, outfunds__Status__c, outfunds__Type__c, Ambito__c, Comunicazione_Padre__c, Comunicazione_chiusa__c, Data_Esito__c, Data_ricezione_risposta_PA__c, Esito__c, Id_Comunicazione__c, Is_Comunicazione__c, Is_Read__c, Motivazione__c, Quesito__c, Risposta__c, Urgenza__c, Oggetto__c, Step_5_Completato__c, Tipologia_di_Revoca__c, Regione__c, Estensione_cronoprogramma_automatica__c, Piano_di_migrazione__c, canUseProfileRispondiPA__c, canUseRispondiPA__c  from outfunds__Requirement__c where RecordTypeId = '0127Q0000001zfIQAQ' and outfunds__Status__c!='Complete' and outfunds__Status__c!='Annullato' and outfunds__Status__c!='ANNULLATA'  and outfunds__Status__c!='Rejected'  and outfunds__Funding_Request__c in (select Id from outfunds__Funding_Request__c ) order by outfunds__Due_Date__c

export async function caricaRequirement(conn,reqname) {
    
    /**
     * TIPI REQ
     * select Id, Name, DeveloperName, NamespacePrefix, Description, BusinessProcessId, SobjectType, IsActive, CreatedById, CreatedDate, LastModifiedById, LastModifiedDate, SystemModstamp  from RecordType where SobjectType = 'outfunds__Requirement__c' 
     */
    const records = [];
    const reqs = [];
    console.log('-Caricamento tipo req...');
    let soqltiporeq = `select Id  from RecordType where SobjectType = 'outfunds__Requirement__c' and Name = '`+reqname+`'`;
    let result_ = await conn.query(soqltiporeq);
    records.push(...result_.records);
    console.log("-numero di occorrenze da caricare: " + result_.totalSize);
    console.log("-occorrenze caricate : " + result_.records.length);
    let more = !result_.done;
    while (more) {
        if (result_.nextRecordsUrl) {
            result_ = await conn.queryMore(result_.nextRecordsUrl);
            console.log("-caricati altri : " + result_.records.length);
            records.push(...result_.records);
            more = !result_.done;
        }
    }
    console.log('-...tipi req caricati: '+records.length);
    if(records && records.length===1){
        console.log('-Caricamento requirements...');
        let soqlreq = `select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Assigned__c, outfunds__Completed_Date__c, outfunds__Due_Date__c, outfunds__Funding_Request__c, outfunds__Primary_Contact__c, outfunds__Requirements__c, outfunds__Status__c, outfunds__Type__c, Ambito__c, Comunicazione_Padre__c, Comunicazione_chiusa__c, Data_Esito__c, Data_ricezione_risposta_PA__c, Esito__c, Id_Comunicazione__c, Is_Comunicazione__c, Is_Read__c, Motivazione__c, Quesito__c, Risposta__c, Urgenza__c, Oggetto__c, Step_5_Completato__c, Tipologia_di_Revoca__c, Regione__c, Estensione_cronoprogramma_automatica__c, Piano_di_migrazione__c, canUseProfileRispondiPA__c, canUseRispondiPA__c  from outfunds__Requirement__c where RecordTypeId = '`+records[0].Id+`' and outfunds__Status__c!='Complete' and outfunds__Status__c!='Annullato' and outfunds__Status__c!='ANNULLATA'  and outfunds__Status__c!='Freezato'  and outfunds__Funding_Request__c in (select Id from outfunds__Funding_Request__c ) order by outfunds__Due_Date__c`; //and outfunds__Status__c!='Rejected'
        let result_ = await conn.query(soqlreq);
        reqs.push(...result_.records);
        console.log("-numero di occorrenze da caricare: " + result_.totalSize);
        console.log("-occorrenze caricate : " + result_.records.length);
        let more = !result_.done;
        while (more) {
            if (result_.nextRecordsUrl) {
                result_ = await conn.queryMore(result_.nextRecordsUrl);
                console.log("-caricati altri : " + result_.records.length);
                reqs.push(...result_.records);
                more = !result_.done;
            }
        }
        console.log('-...requirements caricati: '+records.length);
    }
    return reqs;
}

export async function caricaTipiReq(conn) {
    /**
     * TIPI REQ
     * select Id, Name, DeveloperName, NamespacePrefix, Description, BusinessProcessId, SobjectType, IsActive, CreatedById, CreatedDate, LastModifiedById, LastModifiedDate, SystemModstamp  from RecordType where SobjectType = 'outfunds__Requirement__c' 
     */
    const records = [];
    console.log('-Caricamento tipi req...');
    let soqlscadenze = `select Id, Name, DeveloperName, NamespacePrefix, Description, BusinessProcessId, SobjectType, IsActive, CreatedById, CreatedDate, LastModifiedById, LastModifiedDate, SystemModstamp  from RecordType where SobjectType = 'outfunds__Requirement__c'`;
    let result_ = await conn.query(soqlscadenze);
    records.push(...result_.records);
    console.log("-numero di occorrenze da caricare: " + result_.totalSize);
    console.log("-occorrenze caricate : " + result_.records.length);
    let more = !result_.done;
    while (more) {
        if (result_.nextRecordsUrl) {
            result_ = await conn.queryMore(result_.nextRecordsUrl);
            console.log("-caricati altri : " + result_.records.length);
            records.push(...result_.records);
            more = !result_.done;
        }
    }
    console.log('-...tipi req caricati: '+records.length);
    return records;
}

export async function caricaScadenze(conn) {
    /**
     * REQUIREMENTS
     * select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Description__c, outfunds__End_Date__c, outfunds__Funding_Program_Manager__c, outfunds__Parent_Funding_Program__c, outfunds__Start_Date__c, outfunds__Status__c, outfunds__Top_Level__c, outfunds__Total_Program_Amount__c, Budget_Impegnato__c, Cluster_Regioni__c, Cluster_Scuole__c, Dichiara_inoltre_sotto_la_propria_respon__c, Dichiara_sotto_la_propria_responsabilit__c, Pacchetto__c, Parent_amount__c, Platea_potenziale__c, Oggetto_Avviso__c, Budget_Impegnato_Altro__c, Budget_Impegnato_Sud__c, InPreview__c, Program_Amount_Altro__c, Program_Amount_Sud__c, Quota_Sud__c, Fondi_disponibili_Altro__c, Fondi_disponibili_Sud__c, Fondi_disponibili__c, ID_Template__c, Codice_Controllo__c, Decode_Tipologia_Ente__c, Numero_Progressivo_Candidatura__c, Numero_Progressivo_Finestra__c, Numero_Progressivo__c, Stato_Formula__c, Nome_Progetto__c, Fondi_disponibili_Padre_1__c, Fondi_disponibili_Padre_2__c, Misura_Padre_1__c, Misura_Padre_2__c, Total_Program_Amount_Padre_1__c, Total_Program_Amount_Padre_2__c  from outfunds__Funding_Program__c where outfunds__Parent_Funding_Program__c != '' order by outfunds__End_Date__c desc 
     */
    const records = [];
    console.log('-Caricamento scadenze...');
    let soqlscadenze = `select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Assigned__c, outfunds__Completed_Date__c, outfunds__Due_Date__c, outfunds__Funding_Request__c, outfunds__Primary_Contact__c, outfunds__Requirements__c, outfunds__Status__c, outfunds__Type__c, Ambito__c, Comunicazione_Padre__c, Comunicazione_chiusa__c, Data_Esito__c, Data_ricezione_risposta_PA__c, Esito__c, Id_Comunicazione__c, Is_Comunicazione__c, Is_Read__c, Motivazione__c, Quesito__c, Risposta__c, Urgenza__c, Oggetto__c, Step_5_Completato__c, Tipologia_di_Revoca__c, Regione__c, Estensione_cronoprogramma_automatica__c, Piano_di_migrazione__c, canUseProfileRispondiPA__c, canUseRispondiPA__c  from outfunds__Requirement__c where RecordTypeId in (select Id from RecordType where SobjectType = 'outfunds__Requirement__c') and outfunds__Due_Date__c >= TODAY and outfunds__Status__c !='Complete' and outfunds__Status__c !='Completata'  and Is_Comunicazione__c=false and outfunds__Funding_Request__c IN (select Id from outfunds__Funding_Request__c ) order by outfunds__Due_Date__c asc`;
    let result_ = await conn.query(soqlscadenze);
    records.push(...result_.records);
    console.log("-numero di occorrenze da caricare: " + result_.totalSize);
    console.log("-occorrenze caricate : " + result_.records.length);
    let more = !result_.done;
    while (more) {
        if (result_.nextRecordsUrl) {
            result_ = await conn.queryMore(result_.nextRecordsUrl);
            console.log("-caricati altri : " + result_.records.length);
            records.push(...result_.records);
            more = !result_.done;
        }
    }
    console.log('-...scadenze caricate: '+records.length);
    return records;
}