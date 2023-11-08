// @ts-nocheck
import jsforce from 'jsforce';
import { loadEntiAPortafoglio } from '../../../logic/enti';
import { caricaAvvisi } from '../../../logic/misure';
import { getUtenteStandard } from '../../../logic/userdb';
import { caricaAdesioniPerAvviso, caricaDatiGrafico, caricaRichiesteDiModifica } from './db';

/*
const stativalidi = ['FINANZIATA', 'IN VERIFICA'];
const statiinlavorazione = ['PREBOZZA', 'BOZZA', 'CONCLUSA','ACCETTATA'];
const statinonvalidi = ['ANNULLATA', 'NON ACCETTATA', 'NON AMMESSA', 'RINUNCIATA', 'RITIRATA', 'SCADUTA'];
*/

export async function load({ cookies }) {
    let avvisiappio = [];
    let enti = [];
    let adesioniPerAvviso = [];
    let datipergrafico = [];
    let richiestedimodifica = [];
    const ustd = getUtenteStandard(cookies);
    if (ustd) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        await conn.login(ustd.email, ustd.password + ustd.token);
        enti = await loadEntiAPortafoglio(conn,ustd,'Standard');
        avvisiappio = (await caricaAvvisi(conn)).filter(a => a.Pacchetto__c === 'AppIO').sort((a, b) => { return new Date(a.outfunds__Start_Date__c).getDate() - new Date(b.outfunds__Start_Date__c).getDate() });
        adesioniPerAvviso = await caricaAdesioniPerAvviso(conn,ustd);
        datipergrafico = await caricaDatiGrafico(conn,ustd);
        richiestedimodifica = await caricaRichiesteDiModifica(conn);
        await conn.logout();
    }

    /* calcola platee */
    const platee = [];
    
    avvisiappio.forEach((a)=>{
        a.beneficiari.forEach(b=>{
            const item = {};
            item.idavviso = a.Id;
            item.beneficiario = b;
            item.plateapotenziale =  0;
            let adperav = adesioniPerAvviso.filter(apa=>apa.outfunds__FundingProgram__c===a.Id&&apa.outfunds__Applying_Organization__r.Tipologia_Ente__c.toUpperCase()===b);
            item.valide = adperav&&adperav.length>0?adperav.length:0;
            if(!(platee.filter(p=>p.beneficiario===b)&&platee.filter(p=>p.beneficiario===b).length>0)){
                item.plateapotenziale=enti.filter(e=>e.Tipologia_Ente__c.toUpperCase()===b)?enti.filter(e=>e.Tipologia_Ente__c.toUpperCase()===b).length:0;
                
            }else{
                item.plateapotenziale=platee[platee.length-1].plateapotenziale-platee[platee.length-1].valide;
            }


            platee.push(item);
        });
        
    });


    return {
        avvisiappio: avvisiappio,
        platee: platee,
        datigrafico: datipergrafico,
        adv: adesioniPerAvviso,
        rdm: richiestedimodifica
    };
}
