import { loadFornitori } from '$lib/sfquery/fornitori';
import jsforce from 'jsforce';
import { caricaCandidature } from '../../../logic/candidature';
import { loadEntiAPortafoglio } from '../../../logic/enti';
import { caricaAvvisi, caricaMisure } from '../../../logic/misure';
import { getUtenteStandard } from '../../../logic/userdb';

export async function load({ cookies }) {
    // @ts-ignore
    let enti = [];
    // @ts-ignore
    let misure = [];
    // @ts-ignore
    let candidature = [];
    // @ts-ignore
    let avvisi = [];
    // @ts-ignore
    let fornitori = [];
    // @ts-ignore
    const tipologieFornitori = [];
    // @ts-ignore
    const nomiFornitori = [];
    // @ts-ignore
    const fornitoriPerMisura = [];



    const ustd = getUtenteStandard(cookies);
    if (ustd) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });

        await conn.login(ustd.email, ustd.password + ustd.token);
        // @ts-ignore
        enti = enti.concat(await loadEntiAPortafoglio(conn, ustd, 'Standard'));
        // @ts-ignore
        misure = misure.concat(await caricaMisure(conn));
        // @ts-ignore
        candidature = candidature.concat(await caricaCandidature(conn, ustd));
        // @ts-ignore
        avvisi = avvisi.concat(await caricaAvvisi(conn));
        // @ts-ignore
        fornitori = fornitori.concat(await loadFornitori(conn));

        fornitori.forEach(f => {
            if (!f.Denominazione_Soggetto_Realizzatore__c) {
                f.Denominazione_Soggetto_Realizzatore__c = 'n.d.';
            }
            f.Denominazione_Soggetto_Realizzatore__c = f.Denominazione_Soggetto_Realizzatore__c.split('.').join('').toUpperCase();
            
            if(f.Denominazione_Soggetto_Realizzatore__c.startsWith("PA  DIGITALE")) f.Denominazione_Soggetto_Realizzatore__c = "PA DIGITALE ADRIATICA";
            if(f.Denominazione_Soggetto_Realizzatore__c.startsWith("PA DIGITALE ADRIATICA")) f.Denominazione_Soggetto_Realizzatore__c = "PA DIGITALE ADRIATICA";
            if(f.Denominazione_Soggetto_Realizzatore__c.startsWith("HALLEY INFORM")) f.Denominazione_Soggetto_Realizzatore__c = "HALLEY INFORMATICA";
            if(f.Denominazione_Soggetto_Realizzatore__c.startsWith("APKAPPA")) f.Denominazione_Soggetto_Realizzatore__c = "APKAPPA";
            if(f.Denominazione_Soggetto_Realizzatore__c.startsWith("DATA MANAGEMENT")) f.Denominazione_Soggetto_Realizzatore__c = "DATAMANAGEMENT";
            if(f.Denominazione_Soggetto_Realizzatore__c.startsWith("DATAMANAGEMENT")) f.Denominazione_Soggetto_Realizzatore__c = "DATAMANAGEMENT";
            if(f.Denominazione_Soggetto_Realizzatore__c.startsWith("DPS CONSULTING")) f.Denominazione_Soggetto_Realizzatore__c = "DPSCONSULTING";
            if(f.Denominazione_Soggetto_Realizzatore__c.startsWith("GRUPPO SPAGGIARI PARMA SPA")) f.Denominazione_Soggetto_Realizzatore__c = "GRUPPO SPAGGIARI PARMA SPA";
        })

        candidature.forEach(c => {
            c.fornitori = fornitori.filter(f => f.sfdo_grants__FundingRequest__r.Id === c.Id);
            c.ente = enti.filter(e => e.Id === c.outfunds__Applying_Organization__c);
        })

        avvisi.forEach(a => {
            a.candidature = candidature.filter(c => c.outfunds__FundingProgram__c === a.Id);
        });

        misure.forEach(m => {
            m.avvisi = avvisi.filter(a => a.outfunds__Parent_Funding_Program__c === m.Id);
        });

        //helpers
        candidature.forEach(c => {
            c.fornitori.forEach(f => {
                if (tipologieFornitori.indexOf(f.RecordType.Name) == -1) tipologieFornitori.push(f.RecordType.Name);
                if (nomiFornitori.indexOf(f.Denominazione_Soggetto_Realizzatore__c.toUpperCase()) == -1) nomiFornitori.push(f.Denominazione_Soggetto_Realizzatore__c.toUpperCase());
            });
        }
        );

        for (let z = 0; z < misure.length; z++) {
            
            misure[z].conteggioFornitori = [];
            misure[z].valoreFornitori = [];
            for (let y = 0; y < misure[z].avvisi.length; y++) {
                for (let x = 0; x < misure[z].avvisi[y].candidature.length; x++) {
                    if (misure[z].avvisi[y].candidature[x].fornitori && misure[z].avvisi[y].candidature[x].fornitori.length > 0) {
                        for (let w = 0; w < misure[z].avvisi[y].candidature[x].fornitori.length; w++) {
                            let cc = misure[z].conteggioFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c);
                            if (cc
                                && cc.length > 0) {
                                misure[z].conteggioFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c)[0].count = misure[z].conteggioFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c)[0].count + 1;
                            } else {
                                misure[z].conteggioFornitori.push({ nome: misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c, count: 1 });
                            }
                            let ss = misure[z].valoreFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c);
                            if (ss
                                && ss.length > 0) {
                                misure[z].valoreFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c)[0].value = misure[z].valoreFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c)[0].value + misure[z].avvisi[y].candidature[x].outfunds__Awarded_Amount__c;
                            } else {
                                misure[z].valoreFornitori.push({ nome: misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c, value: misure[z].avvisi[y].candidature[x].outfunds__Awarded_Amount__c });
                            }
                        }
                    }
                }
            }
            misure[z].conteggioFornitori.sort((a,b) => {return b.count-a.count});
            misure[z].valoreFornitori.sort((a,b) => {return b.value-a.value});
        }

        for (let z = 0; z < misure.length; z++) {
            misure[z].conteggioFornitori = [];
            misure[z].valoreFornitori = [];
            for (let y = 0; y < misure[z].avvisi.length; y++) {
                for (let x = 0; x < misure[z].avvisi[y].candidature.length; x++) {
                    if (misure[z].avvisi[y].candidature[x].fornitori && misure[z].avvisi[y].candidature[x].fornitori.length > 0) {
                        for (let w = 0; w < misure[z].avvisi[y].candidature[x].fornitori.length; w++) {
                            let cc = misure[z].conteggioFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c);
                            if (cc
                                && cc.length > 0) {
                                misure[z].conteggioFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c)[0].count = misure[z].conteggioFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c)[0].count + 1;
                            } else {
                                misure[z].conteggioFornitori.push({ nome: misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c, count: 1 });
                            }
                            let ss = misure[z].valoreFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c);
                            if (ss
                                && ss.length > 0) {
                                misure[z].valoreFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c)[0].value = misure[z].valoreFornitori.filter(a => a.nome === misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c)[0].value + misure[z].avvisi[y].candidature[x].outfunds__Awarded_Amount__c;
                            } else {
                                misure[z].valoreFornitori.push({ nome: misure[z].avvisi[y].candidature[x].fornitori[w].Denominazione_Soggetto_Realizzatore__c, value: misure[z].avvisi[y].candidature[x].outfunds__Awarded_Amount__c });
                            }
                        }
                    }
                }
            }
            misure[z].conteggioFornitori.sort((a,b) => {return b.count-a.count});
            misure[z].valoreFornitori.sort((a,b) => {return b.value-a.value});
        }



        await conn.logout();
    }
    return {
        misure: misure,
        enti: enti,
        tipologieFornitori: tipologieFornitori,
        nomiFornitori: nomiFornitori
    };
}
