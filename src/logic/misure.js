import jsforce from 'jsforce';

export async function asyncCaricaAvvisi(ustd) {
    let conn = new jsforce.Connection({
        loginUrl: "https://login.salesforce.com"
    });
    await conn.login(ustd.email, ustd.password + ustd.token);
    //console.log("SESSION ID: "+conn.accessToken );
    /**
     * AVVISI
     * select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Description__c, outfunds__End_Date__c, outfunds__Funding_Program_Manager__c, outfunds__Parent_Funding_Program__c, outfunds__Start_Date__c, outfunds__Status__c, outfunds__Top_Level__c, outfunds__Total_Program_Amount__c, Budget_Impegnato__c, Cluster_Regioni__c, Cluster_Scuole__c, Pacchetto__c, Parent_amount__c, Platea_potenziale__c, Oggetto_Avviso__c, Budget_Impegnato_Altro__c, Budget_Impegnato_Sud__c, InPreview__c, Program_Amount_Altro__c, Program_Amount_Sud__c, Quota_Sud__c, Fondi_disponibili_Altro__c, Fondi_disponibili_Sud__c, Fondi_disponibili__c, ID_Template__c, Codice_Controllo__c, Decode_Tipologia_Ente__c, Numero_Progressivo_Candidatura__c, Numero_Progressivo_Finestra__c, Numero_Progressivo__c, Stato_Formula__c, Nome_Progetto__c, Fondi_disponibili_Padre_1__c, Fondi_disponibili_Padre_2__c, Misura_Padre_1__c, Misura_Padre_2__c, Total_Program_Amount_Padre_1__c, Total_Program_Amount_Padre_2__c  from outfunds__Funding_Program__c where outfunds__Parent_Funding_Program__c != '' order by outfunds__End_Date__c  desc 
     */
    const records = [];
    //console.log('-Caricamento avvisi...');
    let soqlavvisi = `select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Description__c, outfunds__End_Date__c, outfunds__Funding_Program_Manager__c, outfunds__Parent_Funding_Program__c, outfunds__Start_Date__c, outfunds__Status__c, outfunds__Top_Level__c, outfunds__Total_Program_Amount__c, Budget_Impegnato__c, Cluster_Regioni__c, Cluster_Scuole__c, Pacchetto__c, Parent_amount__c, Platea_potenziale__c, Oggetto_Avviso__c, Budget_Impegnato_Altro__c, Budget_Impegnato_Sud__c, InPreview__c, Program_Amount_Altro__c, Program_Amount_Sud__c, Quota_Sud__c, Fondi_disponibili_Altro__c, Fondi_disponibili_Sud__c, Fondi_disponibili__c, ID_Template__c, Codice_Controllo__c, Decode_Tipologia_Ente__c, Numero_Progressivo_Candidatura__c, Numero_Progressivo_Finestra__c, Numero_Progressivo__c, Stato_Formula__c, Nome_Progetto__c, Fondi_disponibili_Padre_1__c, Fondi_disponibili_Padre_2__c, Misura_Padre_1__c, Misura_Padre_2__c, Total_Program_Amount_Padre_1__c, Total_Program_Amount_Padre_2__c  from outfunds__Funding_Program__c where outfunds__Parent_Funding_Program__c != '' order by outfunds__End_Date__c  desc`;
    let result_ = await conn.query(soqlavvisi);
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
    const res = await fetch('https://raw.githubusercontent.com/teamdigitale/padigitale2026-opendata/main/data/avvisi.json');
    const data = await res.json();
    for (let z = 0; z < data.length; z++) {
        data[z].beneficiari = data[z].soggetti_destinatari.split(';');
    }

    records.forEach((a) => {
        a.Name = a.Name.replaceAll('"',"'").replaceAll('”',"'");
        if(data.filter(d =>  d.titolo.startsWith(a.Name) )[0]){
         a.beneficiari = data.filter(d =>  d.titolo.startsWith(a.Name)  )[0].beneficiari }
        }
    );
    //console.log('-...avvisi caricati: '+records.length);
    await conn.logout();
    return records;
}

export async function asyncCaricaMisure(ustd) {
    let conn = new jsforce.Connection({
        loginUrl: "https://login.salesforce.com"
    });
    await conn.login(ustd.email, ustd.password + ustd.token);
    //console.log("SESSION ID: "+conn.accessToken );
    /**
     * MISURE
     * select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Description__c, outfunds__End_Date__c, outfunds__Funding_Program_Manager__c, outfunds__Parent_Funding_Program__c, outfunds__Start_Date__c, outfunds__Status__c, outfunds__Top_Level__c, outfunds__Total_Program_Amount__c, Budget_Impegnato__c, Cluster_Regioni__c, Cluster_Scuole__c, Dichiara_inoltre_sotto_la_propria_respon__c, Dichiara_sotto_la_propria_responsabilit__c, Pacchetto__c, Parent_amount__c, Platea_potenziale__c, Oggetto_Avviso__c, Budget_Impegnato_Altro__c, Budget_Impegnato_Sud__c, InPreview__c, Program_Amount_Altro__c, Program_Amount_Sud__c, Quota_Sud__c, Fondi_disponibili_Altro__c, Fondi_disponibili_Sud__c, Fondi_disponibili__c, ID_Template__c, Codice_Controllo__c, Decode_Tipologia_Ente__c, Numero_Progressivo_Candidatura__c, Numero_Progressivo_Finestra__c, Numero_Progressivo__c, Stato_Formula__c, Nome_Progetto__c, Fondi_disponibili_Padre_1__c, Fondi_disponibili_Padre_2__c, Misura_Padre_1__c, Misura_Padre_2__c, Total_Program_Amount_Padre_1__c, Total_Program_Amount_Padre_2__c  from outfunds__Funding_Program__c where outfunds__Parent_Funding_Program__c = '' order by Name 
     */
    const records = [];
    //console.log('-Caricamento misure...');
    let soqmisure = `select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Description__c, outfunds__End_Date__c, outfunds__Funding_Program_Manager__c, outfunds__Parent_Funding_Program__c, outfunds__Start_Date__c, outfunds__Status__c, outfunds__Top_Level__c, outfunds__Total_Program_Amount__c, Budget_Impegnato__c, Cluster_Regioni__c, Cluster_Scuole__c, Dichiara_inoltre_sotto_la_propria_respon__c, Dichiara_sotto_la_propria_responsabilit__c, Pacchetto__c, Parent_amount__c, Platea_potenziale__c, Oggetto_Avviso__c, Budget_Impegnato_Altro__c, Budget_Impegnato_Sud__c, InPreview__c, Program_Amount_Altro__c, Program_Amount_Sud__c, Quota_Sud__c, Fondi_disponibili_Altro__c, Fondi_disponibili_Sud__c, Fondi_disponibili__c, ID_Template__c, Codice_Controllo__c, Decode_Tipologia_Ente__c, Numero_Progressivo_Candidatura__c, Numero_Progressivo_Finestra__c, Numero_Progressivo__c, Stato_Formula__c, Nome_Progetto__c, Fondi_disponibili_Padre_1__c, Fondi_disponibili_Padre_2__c, Misura_Padre_1__c, Misura_Padre_2__c, Total_Program_Amount_Padre_1__c, Total_Program_Amount_Padre_2__c  from outfunds__Funding_Program__c where outfunds__Parent_Funding_Program__c = '' order by Name`;
    let result_ = await conn.query(soqmisure);
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
    //console.log('-...misure caricate: '+records.length);
    await conn.logout();
    return records;
}

export async function caricaClusters(conn,idavviso) {
    /**
     * CLUSTERS
     * select Id, OwnerId, IsDeleted, Name, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, Canone__c, Considera_Advanced_Price__c, Misura__c, Numero_Max_Servizi__c, Numero_Min_Servizi__c, Pacchetto__c, Prezzo_Tipologia__c, Range__c, Tipologia_Ente__c, Range_classificazione__c, PA_non_clusterizzata__c, Soglia_Variazione_Cronoprogramma__c, Costo_Unit_Critico__c, Costo_Unit_Ordinario__c, Numero_Max_Servizi_2__c, Numero_Min_Servizi_2__c, Numero_Massimo_Servizi_Fisici__c, Numero_Massimo_Servizi_Virtuali__c, Numero_Minimo_Servizi_Fisici__c, Numero_Minimo_Servizi_Virtuali__c, Soglia_Importo_Massimo__c, Soglia_Importo_Minimo__c from Cluster__c 
     */
    const records = [];
    //console.log('-Caricamento clusters...');
    let soqlclusters = `select Id, OwnerId, IsDeleted, Name, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, Canone__c, Considera_Advanced_Price__c, Misura__c, Numero_Max_Servizi__c, Numero_Min_Servizi__c, Pacchetto__c, Prezzo_Tipologia__c, Range__c, Tipologia_Ente__c, Range_classificazione__c, PA_non_clusterizzata__c, Soglia_Variazione_Cronoprogramma__c, Costo_Unit_Critico__c, Costo_Unit_Ordinario__c, Numero_Max_Servizi_2__c, Numero_Min_Servizi_2__c, Numero_Massimo_Servizi_Fisici__c, Numero_Massimo_Servizi_Virtuali__c, Numero_Minimo_Servizi_Fisici__c, Numero_Minimo_Servizi_Virtuali__c, Soglia_Importo_Massimo__c, Soglia_Importo_Minimo__c from Cluster__c where Cluster__r ='`+idavviso+`'`;
    let result_ = await conn.query(soqlclusters);
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
    //console.log('-...clusters caricati: '+records.length);
    return records;
}

export async function caricaMisure(conn) {
    /**
     * MISURE
     * select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Description__c, outfunds__End_Date__c, outfunds__Funding_Program_Manager__c, outfunds__Parent_Funding_Program__c, outfunds__Start_Date__c, outfunds__Status__c, outfunds__Top_Level__c, outfunds__Total_Program_Amount__c, Budget_Impegnato__c, Cluster_Regioni__c, Cluster_Scuole__c, Dichiara_inoltre_sotto_la_propria_respon__c, Dichiara_sotto_la_propria_responsabilit__c, Pacchetto__c, Parent_amount__c, Platea_potenziale__c, Oggetto_Avviso__c, Budget_Impegnato_Altro__c, Budget_Impegnato_Sud__c, InPreview__c, Program_Amount_Altro__c, Program_Amount_Sud__c, Quota_Sud__c, Fondi_disponibili_Altro__c, Fondi_disponibili_Sud__c, Fondi_disponibili__c, ID_Template__c, Codice_Controllo__c, Decode_Tipologia_Ente__c, Numero_Progressivo_Candidatura__c, Numero_Progressivo_Finestra__c, Numero_Progressivo__c, Stato_Formula__c, Nome_Progetto__c, Fondi_disponibili_Padre_1__c, Fondi_disponibili_Padre_2__c, Misura_Padre_1__c, Misura_Padre_2__c, Total_Program_Amount_Padre_1__c, Total_Program_Amount_Padre_2__c  from outfunds__Funding_Program__c where outfunds__Parent_Funding_Program__c = '' order by Name 
     */
    const records = [];
    //console.log('-Caricamento misure...');
    let soqmisure = `select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Description__c, outfunds__End_Date__c, outfunds__Funding_Program_Manager__c, outfunds__Parent_Funding_Program__c, outfunds__Start_Date__c, outfunds__Status__c, outfunds__Top_Level__c, outfunds__Total_Program_Amount__c, Budget_Impegnato__c, Cluster_Regioni__c, Cluster_Scuole__c, Dichiara_inoltre_sotto_la_propria_respon__c, Dichiara_sotto_la_propria_responsabilit__c, Pacchetto__c, Parent_amount__c, Platea_potenziale__c, Oggetto_Avviso__c, Budget_Impegnato_Altro__c, Budget_Impegnato_Sud__c, InPreview__c, Program_Amount_Altro__c, Program_Amount_Sud__c, Quota_Sud__c, Fondi_disponibili_Altro__c, Fondi_disponibili_Sud__c, Fondi_disponibili__c, ID_Template__c, Codice_Controllo__c, Decode_Tipologia_Ente__c, Numero_Progressivo_Candidatura__c, Numero_Progressivo_Finestra__c, Numero_Progressivo__c, Stato_Formula__c, Nome_Progetto__c, Fondi_disponibili_Padre_1__c, Fondi_disponibili_Padre_2__c, Misura_Padre_1__c, Misura_Padre_2__c, Total_Program_Amount_Padre_1__c, Total_Program_Amount_Padre_2__c  from outfunds__Funding_Program__c where outfunds__Parent_Funding_Program__c = '' order by Name`;
    let result_ = await conn.query(soqmisure);
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
    //console.log('-...misure caricate: '+records.length);
    return records;
}

export async function caricaAvvisi(conn) {
    /**
     * AVVISI
     * select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Description__c, outfunds__End_Date__c, outfunds__Funding_Program_Manager__c, outfunds__Parent_Funding_Program__c, outfunds__Start_Date__c, outfunds__Status__c, outfunds__Top_Level__c, outfunds__Total_Program_Amount__c, Budget_Impegnato__c, Cluster_Regioni__c, Cluster_Scuole__c, Pacchetto__c, Parent_amount__c, Platea_potenziale__c, Oggetto_Avviso__c, Budget_Impegnato_Altro__c, Budget_Impegnato_Sud__c, InPreview__c, Program_Amount_Altro__c, Program_Amount_Sud__c, Quota_Sud__c, Fondi_disponibili_Altro__c, Fondi_disponibili_Sud__c, Fondi_disponibili__c, ID_Template__c, Codice_Controllo__c, Decode_Tipologia_Ente__c, Numero_Progressivo_Candidatura__c, Numero_Progressivo_Finestra__c, Numero_Progressivo__c, Stato_Formula__c, Nome_Progetto__c, Fondi_disponibili_Padre_1__c, Fondi_disponibili_Padre_2__c, Misura_Padre_1__c, Misura_Padre_2__c, Total_Program_Amount_Padre_1__c, Total_Program_Amount_Padre_2__c  from outfunds__Funding_Program__c where outfunds__Parent_Funding_Program__c != '' order by outfunds__End_Date__c  desc 
     */
    const records = [];
    //console.log('-Caricamento avvisi...');
    let soqlavvisi = `select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Description__c, outfunds__End_Date__c, outfunds__Funding_Program_Manager__c, outfunds__Parent_Funding_Program__c, outfunds__Start_Date__c, outfunds__Status__c, outfunds__Top_Level__c, outfunds__Total_Program_Amount__c, Budget_Impegnato__c, Cluster_Regioni__c, Cluster_Scuole__c, Pacchetto__c, Parent_amount__c, Platea_potenziale__c, Oggetto_Avviso__c, Budget_Impegnato_Altro__c, Budget_Impegnato_Sud__c, InPreview__c, Program_Amount_Altro__c, Program_Amount_Sud__c, Quota_Sud__c, Fondi_disponibili_Altro__c, Fondi_disponibili_Sud__c, Fondi_disponibili__c, ID_Template__c, Codice_Controllo__c, Decode_Tipologia_Ente__c, Numero_Progressivo_Candidatura__c, Numero_Progressivo_Finestra__c, Numero_Progressivo__c, Stato_Formula__c, Nome_Progetto__c, Fondi_disponibili_Padre_1__c, Fondi_disponibili_Padre_2__c, Misura_Padre_1__c, Misura_Padre_2__c, Total_Program_Amount_Padre_1__c, Total_Program_Amount_Padre_2__c  from outfunds__Funding_Program__c where outfunds__Parent_Funding_Program__c != '' and (outfunds__Status__c='TERMINATO' or outfunds__Status__c='PUBBLICATO') order by outfunds__End_Date__c  desc`;
    let result_ = await conn.query(soqlavvisi);
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
    const res = await fetch('https://raw.githubusercontent.com/teamdigitale/padigitale2026-opendata/main/data/avvisi.json');
    const data = await res.json();
    for (let z = 0; z < data.length; z++) {
        data[z].beneficiari = data[z].soggetti_destinatari.toUpperCase().split(';');
    }

    records.forEach((a) => {
        a.Name = a.Name.replaceAll('"',"'").replaceAll('”',"'");
        if(data.filter(d =>  d.titolo.startsWith(a.Name) )[0]){
         a.beneficiari = data.filter(d =>  d.titolo.startsWith(a.Name)  )[0].beneficiari }
        }
    );
    //console.log('-...avvisi caricati: '+records.length);
    return records;
}

export async function caricaAvvisiPerMisura(conn,idMisura) {
    /**
     * AVVISI
     * select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Description__c, outfunds__End_Date__c, outfunds__Funding_Program_Manager__c, outfunds__Parent_Funding_Program__c, outfunds__Start_Date__c, outfunds__Status__c, outfunds__Top_Level__c, outfunds__Total_Program_Amount__c, Budget_Impegnato__c, Cluster_Regioni__c, Cluster_Scuole__c, Dichiara_inoltre_sotto_la_propria_respon__c, Dichiara_sotto_la_propria_responsabilit__c, Pacchetto__c, Parent_amount__c, Platea_potenziale__c, Oggetto_Avviso__c, Budget_Impegnato_Altro__c, Budget_Impegnato_Sud__c, InPreview__c, Program_Amount_Altro__c, Program_Amount_Sud__c, Quota_Sud__c, Fondi_disponibili_Altro__c, Fondi_disponibili_Sud__c, Fondi_disponibili__c, ID_Template__c, Codice_Controllo__c, Decode_Tipologia_Ente__c, Numero_Progressivo_Candidatura__c, Numero_Progressivo_Finestra__c, Numero_Progressivo__c, Stato_Formula__c, Nome_Progetto__c, Fondi_disponibili_Padre_1__c, Fondi_disponibili_Padre_2__c, Misura_Padre_1__c, Misura_Padre_2__c, Total_Program_Amount_Padre_1__c, Total_Program_Amount_Padre_2__c  from outfunds__Funding_Program__c where outfunds__Parent_Funding_Program__c != '' order by outfunds__End_Date__c desc 
     */
    const records = [];
    //console.log('-Caricamento avvisi...');
    let soqlavvisipermisura = `select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Description__c, outfunds__End_Date__c, outfunds__Funding_Program_Manager__c, outfunds__Parent_Funding_Program__c, outfunds__Start_Date__c, outfunds__Status__c, outfunds__Top_Level__c, outfunds__Total_Program_Amount__c, Budget_Impegnato__c, Cluster_Regioni__c, Cluster_Scuole__c, Dichiara_inoltre_sotto_la_propria_respon__c, Dichiara_sotto_la_propria_responsabilit__c, Pacchetto__c, Parent_amount__c, Platea_potenziale__c, Oggetto_Avviso__c, Budget_Impegnato_Altro__c, Budget_Impegnato_Sud__c, InPreview__c, Program_Amount_Altro__c, Program_Amount_Sud__c, Quota_Sud__c, Fondi_disponibili_Altro__c, Fondi_disponibili_Sud__c, Fondi_disponibili__c, ID_Template__c, Codice_Controllo__c, Decode_Tipologia_Ente__c, Numero_Progressivo_Candidatura__c, Numero_Progressivo_Finestra__c, Numero_Progressivo__c, Stato_Formula__c, Nome_Progetto__c, Fondi_disponibili_Padre_1__c, Fondi_disponibili_Padre_2__c, Misura_Padre_1__c, Misura_Padre_2__c, Total_Program_Amount_Padre_1__c, Total_Program_Amount_Padre_2__c  from outfunds__Funding_Program__c where outfunds__Parent_Funding_Program__c = '`+idMisura+`'  order by outfunds__End_Date__c  desc`;
    let result_ = await conn.query(soqlavvisipermisura);
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
    //console.log('-...avvisi caricati: '+records.length);
    return records;
}
