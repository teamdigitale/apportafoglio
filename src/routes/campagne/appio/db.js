//adesioni per avviso
//select outfunds__FundingProgram__c,outfunds__Applying_Organization__r.Tipologia_Ente__c, Id from outfunds__Funding_Request__c where (outfunds__Status__c='FINANZIATA' or outfunds__Status__c='IN VERIFICA') and outfunds__FundingProgram__c in (select id from outfunds__Funding_Program__c where Pacchetto__c ='AppIO') and outfunds__Applying_Organization__c in (select Id from Account where IsDeleted =false and (Account_Manager__c = '0057Q0000072NWoQAM' or Tech_Implementation_User__c = '0057Q0000072NWoQAM'))
export async function caricaAdesioniPerAvviso(conn,u) {
    const records = [];
    //console.log('-Caricamento adesioni per avviso...');
    let soqladesioniperavviso = `select outfunds__Awarded_Amount__c,outfunds__Applying_Organization__r.Name,outfunds__Status__c,Codice_CUP__c,Data_invio_candidatura__c,Regione__c,Esito_campagna_duplicato_143_appIO__c,Risposta_PEC_143_appIO__c,outfunds__FundingProgram__c,outfunds__Applying_Organization__r.Tipologia_Ente__c, Id from outfunds__Funding_Request__c where (outfunds__Status__c='FINANZIATA' or outfunds__Status__c='IN VERIFICA') and outfunds__FundingProgram__c in (select id from outfunds__Funding_Program__c where Pacchetto__c ='AppIO') and outfunds__Applying_Organization__c in (select Id from Account where IsDeleted =false and (Account_Manager__c = '`+u.idutentesf+`' or Tech_Implementation_User__c = '`+u.idutentesf+`'))`;
    let result_ = await conn.query(soqladesioniperavviso);
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
    //console.log('-...adesioni per avviso caricate: '+records.length);
    return records;
}

//select id, LastModifiedDate, outfunds__Status__c, outfunds__FundingProgram__c, outfunds__Applying_Organization__r.Tipologia_Ente__c  from outfunds__Funding_Request__c where outfunds__FundingProgram__c in (select id from outfunds__Funding_Program__c where Pacchetto__c ='AppIO') and outfunds__Applying_Organization__c in (select Id from Account where IsDeleted =false and (Account_Manager__c = '0057Q0000072NWoQAM' or Tech_Implementation_User__c = '0057Q0000072NWoQAM')) 
export async function caricaDatiGrafico(conn,u){
    const records = [];
    //console.log('-Caricamento dati grafico...');
    let soqldatigrafico = `select id, LastModifiedDate, outfunds__Status__c, outfunds__FundingProgram__c, outfunds__Applying_Organization__r.Tipologia_Ente__c  from outfunds__Funding_Request__c where outfunds__FundingProgram__c in (select id from outfunds__Funding_Program__c where Pacchetto__c ='AppIO') and outfunds__Applying_Organization__c in (select Id from Account where IsDeleted =false and (Account_Manager__c = '`+u.idutentesf+`' or Tech_Implementation_User__c = '`+u.idutentesf+`'))`;
    let result_ = await conn.query(soqldatigrafico);
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
    //console.log('-...dati grafico caricati: '+records.length);
    return records;
}

//select Id,Progetto_da_modificare__c,outfunds__Status__c from outfunds__Review__c where RecordTypeId in (select Id from RecordType where Name = 'Richiesta Modifica Progetto') 
export async function caricaRichiesteDiModifica(conn){
    const records = [];
    //console.log('-Caricamento richieste di modifica...');
    let soqldatigrafico = `select Id,Progetto_da_modificare__c,outfunds__Status__c from outfunds__Review__c where RecordTypeId in (select Id from RecordType where Name = 'Richiesta Modifica Progetto') `;
    let result_ = await conn.query(soqldatigrafico);
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
    //console.log('-...richieste di modifica caricate: '+records.length);
    return records;
}
