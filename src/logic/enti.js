import jsforce from 'jsforce';

const fields = `Select Id, IsDeleted, Name, ShippingStreet, ShippingCity, ShippingState, ShippingPostalCode,  Website, Description, OwnerId, LastActivityDate, Codice_amministrativo__c, Active__c, Area_geografica__c, Codice_Fiscale_RL__c, Cognome_responsabile__c, Data_Nascita_RL__c, Esistenza_candidature__c,  Nome_responsabile__c,  PEC__c, Regione__c, Tech_Implementation_User__c, Titolo_responsabile__c, Tipologia_Ente__c, Integrato_Cie__c, Integrato_Spid__c, Data_Esercizio_CIE__c, Data_Esercizio_SPID__c, Integrato_CIE_Fondo_Innovazione__c, Integrato_SPID_Fondo_Innovazione__c, Protocollo_CIE__c, Account_Manager__c, Protocollo_SPID__c, Asseveratore__c, Operation_Assistant__c from Account`;

export async function asyncLoadEntiAPortafoglio(u, tipo) {
    let conn = new jsforce.Connection({
        loginUrl: "https://login.salesforce.com"
    });
    await conn.login(u.email, u.password + u.token);
    const enti = [];
    if (u) {
        console.log('-Caricamento enti a portafoglio');
        let soqlentiaportafoglio = fields + ` where IsDeleted = false`;
        if(tipo==='Standard'){
            soqlentiaportafoglio = soqlentiaportafoglio+ ` and (Account_Manager__c = '`+u.idutentesf+`' or Tech_Implementation_User__c = '`+u.idutentesf+`')`;
        }else{
            soqlentiaportafoglio = soqlentiaportafoglio+ ` and (Asseveratore__c = '`+u.idutentesf+`')`;
        }
        let result_ = await conn.query(soqlentiaportafoglio);
        enti.push(...result_.records);
        console.log("-numero di occorrenze da caricare: " + result_.totalSize);
        console.log("-occorrenze caricate : " + result_.records.length);
        let more = !result_.done;
        while (more) {
            if (result_.nextRecordsUrl) {
                result_ = await conn.queryMore(result_.nextRecordsUrl);
                console.log("-caricati altri : " + result_.records.length);
                enti.push(...result_.records);
                more = !result_.done;
            }
        }
        enti.forEach((ente) => ente.portafoglio = tipo);
        console.log('-...enti caricati: ' + enti.length);
    }
    await conn.logout();
    return enti;
}


export async function loadEntiAPortafoglio(conn, u, tipo) {
    console.log(u.idutentesf);
    console.log(u.email);
    const enti = [];
    if (u) {
        console.log('-Caricamento enti a portafoglio');
        let soqlentiaportafoglio = fields + ` where IsDeleted = false`;
        if(tipo==='Standard'){
            soqlentiaportafoglio = soqlentiaportafoglio+ ` and (Account_Manager__c = '`+u.idutentesf+`' or Tech_Implementation_User__c = '`+u.idutentesf+`')`;
        }else{
            soqlentiaportafoglio = soqlentiaportafoglio+ ` and (Asseveratore__c = '`+u.idutentesf+`')`;
        }
        let result_ = await conn.query(soqlentiaportafoglio);
        enti.push(...result_.records);
        console.log("-numero di occorrenze da caricare: " + result_.totalSize);
        console.log("-occorrenze caricate : " + result_.records.length);
        let more = !result_.done;
        while (more) {
            if (result_.nextRecordsUrl) {
                result_ = await conn.queryMore(result_.nextRecordsUrl);
                console.log("-caricati altri : " + result_.records.length);
                enti.push(...result_.records);
                more = !result_.done;
            }
        }
        enti.forEach((ente) => ente.portafoglio = tipo);
        console.log('-...enti caricati: ' + enti.length);
    }
    return enti;
}

export async function loadEntiAPortafoglioAsseveratore(conn, uass) {
    const enti = [];
    if (uass) {
        console.log('-Caricamento enti a portafoglio');
        let soqlentiaportafoglio = fields + ` where IsDeleted = false` + 
        ` and (Asseveratore__c = '`+uass.idutentesf+`')`;
        let result_ = await conn.query(soqlentiaportafoglio);
        enti.push(...result_.records);
        console.log("-numero di occorrenze da caricare: " + result_.totalSize);
        console.log("-occorrenze caricate : " + result_.records.length);
        let more = !result_.done;
        while (more) {
            if (result_.nextRecordsUrl) {
                result_ = await conn.queryMore(result_.nextRecordsUrl);
                console.log("-caricati altri : " + result_.records.length);
                enti.push(...result_.records);
                more = !result_.done;
            }
        }
        enti.forEach((ente) => ente.portafoglio = 'Asseveratore');
        console.log('-...enti caricati: ' + enti.length);
    }
    return enti;
}


/**
 * select Id, IsDeleted, Name, ShippingStreet, ShippingCity, ShippingState, ShippingPostalCode,  Website, Description, OwnerId, LastActivityDate, Codice_amministrativo__c, Active__c, Area_geografica__c, Codice_Fiscale_RL__c, Cognome_responsabile__c, Data_Nascita_RL__c, Esistenza_candidature__c,  Nome_responsabile__c,  PEC__c, Regione__c, Tech_Implementation_User__c, Titolo_responsabile__c, Tipologia_Ente__c, Integrato_Cie__c, Integrato_Spid__c, Data_Esercizio_CIE__c, Data_Esercizio_SPID__c, Integrato_CIE_Fondo_Innovazione__c, Integrato_SPID_Fondo_Innovazione__c, Protocollo_CIE__c, Account_Manager__c, Protocollo_SPID__c, Asseveratore__c, Operation_Assistant__c from Account where IsDeleted =false and (Account_Manager__c = '0057Q0000072NWoQAM' or Tech_Implementation_User__c = '0057Q0000072NWoQAM')
 */
export async function loadEntiAPortafoglioOld(conn, idutentesfstandard, idutentesfasseveratore) {
    const enti = [];
    if (idutentesfstandard || idutentesfasseveratore) {
        console.log('-Caricamento enti a portafoglio');
        let soqlentiaportafoglio = fields + ` where IsDeleted = false` + 
        ` and (`+
        idutentesfstandard?`Account_Manager__c = '`+idutentesfstandard+`' or Tech_Implementation_User__c = '`+idutentesfstandard+`'`:`` +
        idutentesfstandard&&idutentesfasseveratore?` or `:` `+
        idutentesfasseveratore?`Asseveratore__c = '`+idutentesfasseveratore+`'`:``+
        `)`;
        let result_ = await conn.query(soqlentiaportafoglio);
        enti.push(...result_.records);
        console.log("-numero di occorrenze da caricare: " + result_.totalSize);
        console.log("-occorrenze caricate : " + result_.records.length);
        let more = !result_.done;
        while (more) {
            if (result_.nextRecordsUrl) {
                result_ = await conn.queryMore(result_.nextRecordsUrl);
                console.log("-caricati altri : " + result_.records.length);
                enti.push(...result_.records);
                more = !result_.done;
            }
        }
        enti.forEach((ente) => idutentesfasseveratore&&idutentesfasseveratore === ente.Asseveratore__c ? ente.portafoglio = 'Asseveratore' : ente.portafoglio = 'Standard');
        console.log('-...enti caricati: ' + enti.length);
    }
    return enti;
}


export async function caricaNominativiEnti(conn) {

    const records = [];
    console.log('-Caricamento nominativo enti');

    let soqlreferenti = `select Id, IsDeleted, MasterRecordId, Name, Type, ParentId, BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry, BillingLatitude, BillingLongitude, BillingGeocodeAccuracy, BillingAddress, ShippingStreet, ShippingCity, ShippingState, ShippingPostalCode, ShippingCountry, ShippingLatitude, ShippingLongitude, ShippingGeocodeAccuracy, ShippingAddress, Phone, Website, PhotoUrl, Industry, NumberOfEmployees, Description, OwnerId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, IsCustomerPortal, Jigsaw, JigsawCompanyId, AccountSource, SicDesc, Codice_amministrativo__c, Active__c, Area_geografica__c, Codice_Fiscale_RL__c, Cognome_responsabile__c, Data_Nascita_RL__c, Esistenza_candidature__c, Grado_Scuola__c, Mapping_Tipologia_Ente__c, Nome_responsabile__c, NumericaClusterToClusterRange__c, Numerica_Cluster__c, PEC__c, Pratica_Classificazione__c, Regione__c, Stato_Pratica_Classificazione__c, Tech_Implementation_User__c, Tipologia_Istat__c, Tipologia_Istat_eccezioni__c, Tipologia_riclassificata__c, Titolo_responsabile__c, ClusterRangeClassificazione__c, Area_40_60__c, Tipologia_Ente__c, Integrato_Cie__c, Integrato_Spid__c, Data_Esercizio_CIE__c, Data_Esercizio_SPID__c, Integrato_CIE_Fondo_Innovazione__c, Integrato_SPID_Fondo_Innovazione__c, Protocollo_CIE__c, Account_Manager__c, Protocollo_SPID__c, Asseveratore__c, Operation_Assistant__c, Variazione_RL__c, Tipologia_Istat_eccezioni_ACN__c, Tipologia_Riclassificata_ACN__c, Tipologia_Ente_ACN__c, Pratica_Piano_di_Migrazione__c, Stato_Pratica_Piano_di_Migrazione__c, Codice_fiscale_firmatario__c, Cognome_firmatario__c, Data_nascita_firmatario__c, Luogo_nascita_firmatario__c, Nome_firmatario__c, Qualifica_firmatario__c, Area_Pubblica__c, Misura11__c, Qualifica__c from account where name!='ACCOUNTSCATOLA'`;

    let result_ = await conn.query(soqlreferenti);
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
    console.log('-...nominativo enti caricati: ' + records.length);
    return records;

}



export async function caricaEnti(conn, idutentesf, acm, qualifica) {
    const records = [];
    console.log('-Caricamento enti...');


    let soqlenti = `select Id, Regione__c, Name, ShippingState, ShippingCity, Tipologia_Ente__c, Account_Manager__c from account `;

    console.log('ACM: ' + acm);
    console.log('Qualifica: ' + qualifica);
    let tim = false;
    if (qualifica && qualifica == 'Asseveratore') {
        soqlenti = soqlenti + ` where Asseveratore__c = '` + qualifica + `'`;
    } else {
        if (acm && acm != '') {
            soqlenti = soqlenti + ` where Account_Manager__c = '` + acm + `'`;
        } else {
            if (qualifica && qualifica == 'Technical Implementation Manager') {
                soqlenti = soqlenti + ` where Tech_Implementation_User__c = '` + idutentesf + `'`;
            }
        }
    }

    let result_ = await conn.query(soqlenti);
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
    console.log('-...enti caricati: ' + records.length);
    return records;
}