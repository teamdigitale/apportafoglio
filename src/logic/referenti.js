import jsforce from 'jsforce';

const fields = `select Id, IsDeleted, MasterRecordId, AccountId, LastName, FirstName, Salutation, MiddleName, Suffix, Name, MailingStreet, MailingCity, MailingState, MailingPostalCode, MailingCountry, MailingLatitude, MailingLongitude, MailingGeocodeAccuracy, MailingAddress, Phone, Fax, MobilePhone, HomePhone, OtherPhone, AssistantPhone, ReportsToId, Email, Title, Department, Birthdate, OwnerId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastCURequestDate, LastCUUpdateDate, LastViewedDate, LastReferencedDate, EmailBouncedReason, EmailBouncedDate, IsEmailBounced, PhotoUrl, Jigsaw, JigsawContactId, IndividualId, FiscalCode__c, Profilo__c, Stato__c, Amministrazione__c, Forma_Aggregativa__c, Area_Pubblica__c, Mail_Commerciale__c, SincronizzaMarketingCloud__c from contact where accountid in (Select Id  from Account`;

export async function loadReferentiAPortafoglio(conn, u, tipo) {
    const referenti = [];
    if (u) {
        //console.log('-Caricamento referenti a portafoglio');
        let soqlreferentiaportafoglio = fields + ` where IsDeleted = false`;
        if(tipo==='Standard'){
            soqlreferentiaportafoglio = soqlreferentiaportafoglio+ ` and (Account_Manager__c = '`+u.idutentesf+`' or Tech_Implementation_User__c = '`+u.idutentesf+`')`;
        }else{
            soqlreferentiaportafoglio = soqlreferentiaportafoglio+ ` and (Asseveratore__c = '`+u.idutentesf+`')`;
        }
        soqlreferentiaportafoglio = soqlreferentiaportafoglio+`)`;
        let result_ = await conn.query(soqlreferentiaportafoglio);
        referenti.push(...result_.records);
        //console.log("-numero di occorrenze da caricare: " + result_.totalSize);
        //console.log("-occorrenze caricate : " + result_.records.length);
        let more = !result_.done;
        while (more) {
            if (result_.nextRecordsUrl) {
                result_ = await conn.queryMore(result_.nextRecordsUrl);
                //console.log("-caricati altri : " + result_.records.length);
                referenti.push(...result_.records);
                more = !result_.done;
            }
        }
        referenti.forEach((referente) => referente.portafoglio = tipo);
        //console.log('-...referenti caricati: ' + referenti.length);
    }
    return referenti;
}


export async function caricaReferenti(conn) {

    /**
     * select Id, IsDeleted, MasterRecordId, AccountId, LastName, FirstName, Salutation, MiddleName, Suffix, Name, MailingStreet, MailingCity, MailingState, MailingPostalCode, MailingCountry, MailingLatitude, MailingLongitude, MailingGeocodeAccuracy, MailingAddress, Phone, Fax, MobilePhone, HomePhone, OtherPhone, AssistantPhone, ReportsToId, Email, Title, Department, Birthdate, OwnerId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastCURequestDate, LastCUUpdateDate, LastViewedDate, LastReferencedDate, EmailBouncedReason, EmailBouncedDate, IsEmailBounced, PhotoUrl, Jigsaw, JigsawContactId, IndividualId, FiscalCode__c, Profilo__c, Stato__c, Amministrazione__c, Forma_Aggregativa__c, Area_Pubblica__c, Mail_Commerciale__c, SincronizzaMarketingCloud__c from contact where accountid in (select Id from account where name!='ACCOUNTSCATOLA')
     */

    const records = [];
    //console.log('-Caricamento referenti...');
    
    let soqlreferenti = `select Id, IsDeleted, MasterRecordId, AccountId, LastName, FirstName, Salutation, MiddleName, Suffix, Name, MailingStreet, MailingCity, MailingState, MailingPostalCode, MailingCountry, MailingLatitude, MailingLongitude, MailingGeocodeAccuracy, MailingAddress, Phone, Fax, MobilePhone, HomePhone, OtherPhone, AssistantPhone, ReportsToId, Email, Title, Department, Birthdate, OwnerId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastCURequestDate, LastCUUpdateDate, LastViewedDate, LastReferencedDate, EmailBouncedReason, EmailBouncedDate, IsEmailBounced, PhotoUrl, Jigsaw, JigsawContactId, IndividualId, FiscalCode__c, Profilo__c, Stato__c, Amministrazione__c, Forma_Aggregativa__c, Area_Pubblica__c, Mail_Commerciale__c, SincronizzaMarketingCloud__c from contact where accountid in (select Id from account where name!='ACCOUNTSCATOLA')`;
    
    let result_ = await conn.query(soqlreferenti);
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
    //console.log('-...referenti caricati: '+records.length);
    return records;

}