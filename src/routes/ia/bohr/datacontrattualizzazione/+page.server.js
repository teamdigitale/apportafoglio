import jsforce from 'jsforce';
import brain from 'brain.js';
import fs from 'fs';
import { getUtenteStandard } from '../../../../logic/userdb.js';
import { caricaCandidatureSenzaDataContrattualizzazione } from './logic.js';

import traindata from './trained-net-contrattualizzazione.json';
import misuredata from './trained-net-contrattualizzazione_misure.json';
import regionidata from './trained-net-contrattualizzazione_regioni.json';
import provincedata from './trained-net-contrattualizzazione_province.json';
import tipologiedata from './trained-net-contrattualizzazione_tipologieenti.json';
import dataf from './trained-net-contrattualizzazione_datafinanziamento.json';
import ggcontr from './trained-net-contrattualizzazione_ggcontr.json';

export async function load({ cookies }) {
    const trainingTime = '31 minuti';
    const inputcategories = ['3700 candidature', '6 misure', '4 regioni', '14 province', '8 tipologie enti']
    let c = [];
    let datecontr = [];

    const ustd = getUtenteStandard(cookies);
    if (ustd) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        // @ts-ignore
        await conn.login(ustd.email, ustd.password + ustd.token);
        // @ts-ignore
        c = await caricaCandidatureSenzaDataContrattualizzazione(conn, ustd.idutentesf);
        const network = new brain.NeuralNetwork();
        //let tdata = JSON.parse(fs.readFileSync(`/iadata/trained-net-contrattualizzazione.json`, 'utf8'));

        network.fromJSON(traindata);
        c.forEach(e => {
            let misura = e.Misura__c;
            let mis = new Array(misuredata.length).fill(0);
            let regione = e.Regione__c;
            let reg = new Array(regionidata.length).fill(0);
            let tipologiaente = e.outfunds__Applying_Organization__r.Tipologia_Ente__c;
            let tipente = new Array(tipologiedata.length).fill(0);
            let provincia = e.outfunds__Applying_Organization__r.ShippingState;
            let province = new Array(provincedata.length).fill(0);
            if (misuredata.indexOf(misura) > -1) {
                mis[misuredata.indexOf(misura)] = 1;
                reg[regionidata.indexOf(regione)] = 1;
                tipente[tipologiedata.indexOf(tipologiaente)] = 1;
                province[provincedata.indexOf(provincia)] = 1;
                let d_s = e.Data_Finanziamento__c.split("-");
                let datafinanziamento = new Date(d_s[0], d_s[1] - 1, d_s[2]).getTime();
                let data = (datafinanziamento - dataf.mindataf) / (dataf.maxdataf - dataf.mindataf);
                let input = mis.concat(reg.concat(province.concat(tipente.concat([data]))));
                //console.log("INPUT: (" + misura + ", " + e.Data_Finanziamento__c +", "+e.Regione__c+", "+e.outfunds__Applying_Organization__r.Tipologia_Ente__c+", "+e.outfunds__Applying_Organization__r.ShippingState+ ") -- " + input);
                const prediction = network.run(input);
                let gg = Math.round(prediction[0] * (ggcontr.max - ggcontr.min) + ggcontr.min);
                datecontr.push({id: e.Id,gg: gg});
            }
        });
        await conn.logout();
    }

    return {
        trainingTime: trainingTime,
        inputcategories: inputcategories,
        candidature: c,
        datecontr: datecontr
    };
}