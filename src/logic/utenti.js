export async function loadUtente(conn,idutentesf){

    try {

        //console.log(idutentesf);
        const records = [];
        //console.log('-Caricamento utente...'+idutentesf);
        let soqlUtente = `select Username, Name, Title, Email, FullPhotoUrl   from User where Id = '` + idutentesf + `'`;
        let result_ = await conn.query(soqlUtente);
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
        //console.log('-...utente caricato');
        
        if(records&&records.length===1){
            return records[0];
        }else{
            return {}
        }
    } catch (err) {
        //console.log(err);
    }
}