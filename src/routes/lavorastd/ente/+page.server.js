// @ts-nocheck
import jsforce from 'jsforce';
import { caricaCandidature } from '../../../logic/candidature.js';
import { loadEntiAPortafoglio } from '../../../logic/enti.js';
import { caricaAvvisi, caricaMisure } from '../../../logic/misure.js';
import { getUtenteStandard } from '../../../logic/userdb.js';

const stativalidi = ['ACCETTATA', 'FINANZIATA', 'IN VERIFICA'];
const statiinlavorazione = ['PREBOZZA', 'BOZZA', 'CONCLUSA'];
const statinonvalidi = ['ANNULLATA', 'NON ACCETTATA', 'NON AMMESSA', 'RINUNCIATA', 'RITIRATA', 'SCADUTA']

export async function load({ cookies }) {
    // @ts-ignore
    let enti = [];
    // @ts-ignore
    let misure = [];
    // @ts-ignore
    let candidature = [];
    // @ts-ignore
    let avvisi = [];

    const ustd = getUtenteStandard(cookies);
    if (ustd) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        // @ts-ignore
        await conn.login(ustd.email, ustd.password + ustd.token);
        // @ts-ignore
        enti = enti.concat(await loadEntiAPortafoglio(conn, ustd, 'Standard'));
        // @ts-ignore
        misure = misure.concat(await caricaMisure(conn));
        // @ts-ignore
        candidature = candidature.concat(await caricaCandidature(conn, ustd));
        // @ts-ignore
        avvisi = avvisi.concat(await caricaAvvisi(conn));
        await conn.logout();
    }

    const q = calcolaQuadro(enti, misure, avvisi, candidature.sort((a,b) =>  new Date(a.CreatedDate).getDate - new Date(b.CreatedDate).getDate()));
    // @ts-ignore
    return { enti: enti, misure: misure, candidature: candidature, avvisi: avvisi, quadro: q }

}

function calcolaQuadro(enti, misure, avvisi, candidature) {
    const result = [];
    enti.forEach(e => {
        misure.forEach(m => {
            let item = {};
            item.idente = e.Id;
            item.ente = e.Name;
            item.idmisura = m.Id;
            item.misura = m.Name;
            item.candidature = [];

            //ESISTE CANDIDATURA
            item.esistecandidatura = false;
            avvisi.every(a => {
                if (a.outfunds__Parent_Funding_Program__c === m.Id) {
                    if (a.beneficiari&&a.beneficiari.indexOf(e.Tipologia_Ente__c.toUpperCase()) > -1) {
                        candidature.every(c => {
                            if (c.outfunds__Applying_Organization__c === e.Id && c.outfunds__FundingProgram__c === a.Id) {
                                item.esistecandidatura = true;
                                return false;
                            } else {
                                return true;
                            }
                        });
                        //item.esisteavviso = true;
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            });

                        //CANDIDATURE
                        item.statoultimacandidtura = '';
                        avvisi.every(a => {
                            if (a.outfunds__Parent_Funding_Program__c === m.Id) {
                                if (a.beneficiari&&a.beneficiari.indexOf(e.Tipologia_Ente__c.toUpperCase()) > -1) {
                                    let cc = candidature.filter(c => c.outfunds__Applying_Organization__c === e.Id && c.outfunds__FundingProgram__c === a.Id);
                                    if(cc && cc.length>0){
                                        cc.sort((a,b) => {return new Date(a.CreatedDate).getDate()- new Date(b.CreatedDate).getDate()});
                                        item.candidature = cc;
                                        return false;
                                    }else{
                                        return true;
                                    }
                                } else {
                                    return true;
                                }
                            } else {
                                return true;
                            }
                        });

            //STATO ULTIMA CANDIDATURA
            item.statoultimacandidtura = '';
            item.ultimacandidaturavalida = false;
            avvisi.every(a => {
                if (a.outfunds__Parent_Funding_Program__c === m.Id) {
                    if (a.beneficiari&&a.beneficiari.indexOf(e.Tipologia_Ente__c.toUpperCase()) > -1) {
                        let cc = candidature.filter(c => c.outfunds__Applying_Organization__c === e.Id && c.outfunds__FundingProgram__c === a.Id);
                        if(cc && cc.length>0){
                            cc.sort((a,b) => {return new Date(b.CreatedDate).getDate()- new Date(a.CreatedDate).getDate()});
                            item.statoultimacandidtura = cc[0].outfunds__Status__c;
                            if(stativalidi.indexOf(item.statoultimacandidtura)>-1){
                                item.ultimacandidaturavalida = true;
                            }
                            return false;
                        }else{
                            return true;
                        }
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            });

            //*item.ultimacandidaturavalida = false;
            /*
            if(stativalidi.indexOf(item.ultimacandidaturavalida)>-1){
                item.ultimacandidaturavalida = true;
            }*/
/*
            avvisi.every(a => {
                if (a.outfunds__Parent_Funding_Program__c === m.Id) {
                    if (a.beneficiari.indexOf(e.Tipologia_Ente__c.toUpperCase()) > -1) {
                        let cc = candidature.filter(c => c.outfunds__Applying_Organization__c === e.Id && c.outfunds__FundingProgram__c === a.Id);
                        if(cc && cc.length>0){
                            cc.sort((a,b) => {return new Date(a.CreatedDate).getDate()- new Date(b.CreatedDate).getDate()});
                            if(stativalidi.indexOf(cc[0].outfunds__Status__c)>-1){
                                item.ultimacandidaturavalida = true;
                                return false;
                            }else{
                                return true;
                            }
                        }else{
                            return true;
                        }
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            });
            */

            /*
        avvisi.every(a => {
            if (a.outfunds__Parent_Funding_Program__c === m.Id) {
                if (a.beneficiari.indexOf(e.Tipologia_Ente__c.toUpperCase()) > -1) {
                    item.esisteavviso = true;
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        });
        */

            //ESISTE AVVISO
            item.esisteavviso = false;
            avvisi.every(a => {
                if (a.outfunds__Parent_Funding_Program__c === m.Id) {
                    if (a.beneficiari&&a.beneficiari.indexOf(e.Tipologia_Ente__c.toUpperCase()) > -1) {
                        item.esisteavviso = true;
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            });

            //ESISTE AVVISO APERTO
            item.esisteavvisoaperto = false;
            avvisi.every(a => {
                if (a.outfunds__Parent_Funding_Program__c === m.Id && a.outfunds__Status__c === 'PUBBLICATO') {
                    if (a.beneficiari&&a.beneficiari.indexOf(e.Tipologia_Ente__c.toUpperCase()) > -1) {
                        item.esisteavvisoaperto = true;
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            });

            if(item.esisteavviso){
                if(item.esistecandidatura){
                    if(item.ultimacandidaturavalida){
                        item.color = 'info';
                        item.message = "L'ente ha una candidatura valida in stato: "+item.statoultimacandidtura;
                    }else{
                        if(item.esisteavvisoaperto){
                            item.color = 'primary';
                            item.message = "L'ente non ha una candidatura valida e ci sono avvisi aperti. Stato ultima candidatura: "+item.statoultimacandidtura;
                        }
                        else{
                            item.color = 'danger';        
                            item.message = "L'ente non ha una candidatura valida e non ci sono avvisi aperti. Stato ultima candidatura: "+item.statoultimacandidtura;
                        }
                    }
                }else{
                    if(item.esisteavvisoaperto){
                        item.color = 'primary';
                        item.message = "L'ente non si è mai candidato e ci sono avvisi aperti";
                    }
                    else{
                        item.color = 'danger';        
                        item.message = "L'ente non si è mai candidato e non ci sono avvisi aperti";
                    }
                }
            }else{
                item.color = 'grey';
                item.message = "Non sono stati pubblicati avvisi per questo ente";
            }

            result.push(item);
        });

    });
    return result;
}