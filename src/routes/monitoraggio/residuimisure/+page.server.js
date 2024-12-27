import { promiseQuery } from '$lib';
import { redirect } from '@sveltejs/kit';
import jsforce from 'jsforce';
import * as d3 from 'd3';

const MAX_FETCH = 1000000;

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const connstandard = locals.user.connectionStandard;

    if (connstandard) {
        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connstandard
        });
        const misure = await promiseQuery(conn, `
            select Id, Name, outfunds__Total_Program_Amount__c from outfunds__Funding_Program__c where IsDeleted =false and outfunds__Parent_Funding_Program__c = '' and outfunds__Total_Program_Amount__c != null and Name != '2.2.3 Digitalizzazione delle procedure (SUAP e SUE)' order by Name
            `, MAX_FETCH);
        const candidature_avvisi_standard = await promiseQuery(conn, `
            select outfunds__Awarded_Amount__c,outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name, outfunds__FundingProgram__r.Name,outfunds__Status__c, rinuncia__c, Revoca__c from outfunds__Funding_Request__c where outfunds__Status__c in ('AMMESSA', 'AMMESSA CON RISERVA', 'ACCETTATA', 'IN VERIFICA', 'FINANZIATA','RINUNCIATA','REVOCATA')
            and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name != '1.1 e 1.2 Multimisura' 
            `, MAX_FETCH);

        const candidature_avviso_multi_1_1 = await promiseQuery(conn, `
                select Awarded_Amount_Padre_1__c, outfunds__FundingProgram__r.Name,outfunds__Status__c, rinuncia__c, Revoca__c from outfunds__Funding_Request__c where outfunds__Status__c in ('AMMESSA', 'AMMESSA CON RISERVA', 'ACCETTATA', 'IN VERIFICA', 'FINANZIATA','RINUNCIATA','REVOCATA')
                and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '1.1 e 1.2 Multimisura' 
                and hasServizi11__c = true
                `, MAX_FETCH);

        const candidature_avviso_multi_1_2 = await promiseQuery(conn, `
                    select Awarded_Amount_Padre_2__c, outfunds__FundingProgram__r.Name,outfunds__Status__c, rinuncia__c, Revoca__c from outfunds__Funding_Request__c where outfunds__Status__c in ('AMMESSA', 'AMMESSA CON RISERVA', 'ACCETTATA', 'IN VERIFICA', 'FINANZIATA','RINUNCIATA','REVOCATA')
                    and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '1.1 e 1.2 Multimisura' 
                    and hasServizi12__c = true
                    `, MAX_FETCH);

        const avvisi_standard = await promiseQuery(conn, `
            select Id,outfunds__Start_Date__c, outfunds__Status__c,Name, outfunds__Total_Program_Amount__c,outfunds__Parent_Funding_Program__r.Name from outfunds__Funding_Program__c where IsDeleted =false and outfunds__Parent_Funding_Program__c != '' and outfunds__Parent_Funding_Program__r.Name !='1.1 e 1.2 Multimisura'  order by outfunds__Start_Date__c   
            `, MAX_FETCH);

        const avvisi_multi_1_1 = await promiseQuery(conn, `
                select Id,outfunds__Start_Date__c, outfunds__Status__c,Name, Total_Program_Amount_Padre_1__c from outfunds__Funding_Program__c where IsDeleted =false and outfunds__Parent_Funding_Program__c != '' and outfunds__Parent_Funding_Program__r.Name ='1.1 e 1.2 Multimisura'  order by outfunds__Start_Date__c   
                `, MAX_FETCH);

        const avvisi_multi_1_2 = await promiseQuery(conn, `
                    select Id, outfunds__Start_Date__c,outfunds__Status__c,Name, Total_Program_Amount_Padre_2__c from outfunds__Funding_Program__c where IsDeleted =false and outfunds__Parent_Funding_Program__c != '' and outfunds__Parent_Funding_Program__r.Name ='1.1 e 1.2 Multimisura'  order by outfunds__Start_Date__c   
                    `, MAX_FETCH);

        const avvisi = d3.sort(avvisi_standard.map(x => ({ ...x, importo: x.outfunds__Total_Program_Amount__c, misura: x.outfunds__Parent_Funding_Program__r.Name })).concat(
            avvisi_multi_1_1.map(x => ({ ...x, importo: x.Total_Program_Amount_Padre_1__c, misura: '1.1 Infrastrutture digitali' })).concat(
                avvisi_multi_1_2.map(x => ({ ...x, importo: x.Total_Program_Amount_Padre_2__c, misura: '1.2 Abilitazione e facilitazione migrazione al Cloud' }))
            )
        ),(d) => d.outfunds__Start_Date__c);
        const candidature =
            candidature_avvisi_standard.map(x => ({ ...x, importo: x.outfunds__Awarded_Amount__c, misura: x.outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name })).concat(
                candidature_avviso_multi_1_1.map(x => ({ ...x, importo: x.Awarded_Amount_Padre_1__c, misura: '1.1 Infrastrutture digitali' })).concat(
                    candidature_avviso_multi_1_2.map(x => ({ ...x, importo: x.Awarded_Amount_Padre_2__c, misura: '1.2 Abilitazione e facilitazione migrazione al Cloud' }))
                )
            );

        const res = [];
        misure.forEach(misura => {
            let saldo = misura.outfunds__Total_Program_Amount__c;
            const m = {
                misura: misura.Name,

                movimenti: [{
                    avviso: '',

                    /*data_apertura: avviso.outfunds__Start_Date__c,
                    stato: avviso.outfunds__Status__c,
                    */
                    label: 'Allocazione importo territorializzato', importo: misura.outfunds__Total_Program_Amount__c, saldo: saldo
                }]
            }
            avvisi.filter(a => a.misura === misura.Name).forEach(avviso => {
                //Allocazione avviso
                saldo = saldo - avviso.importo;
                m.movimenti.push(
                    {
                        avviso: avviso.Name,
                        data_apertura: avviso.outfunds__Start_Date__c,
                        stato: avviso.outfunds__Status__c,
                        label: 'Allocazione importo avviso', importo: -avviso.importo, saldo: saldo
                    }
                );

                if (avviso.outfunds__Status__c === 'TERMINATO') {

                    //Svincolo rinunciate
                    const rinuncedecretate = d3.sum(
                        candidature.filter(
                            (c) =>
                                c.outfunds__FundingProgram__r.Name === avviso.Name &&
                                c.outfunds__Status__c === 'RINUNCIATA' &&
                                c.rinuncia__c === 'Decretato'
                        ),
                        (d) => d.importo
                    );
                    saldo = saldo + rinuncedecretate;
                    m.movimenti.push(
                        {
                            avviso: avviso.Name,
                            data_apertura: avviso.outfunds__Start_Date__c,
                            stato: avviso.outfunds__Status__c,
                            label: 'Svincolo rinunce decretate', importo: rinuncedecretate, saldo: saldo
                        }
                    );
                    //Svincolo revocate
                    const revochedefinitive = d3.sum(
                        candidature.filter(
                            (c) =>
                                c.outfunds__FundingProgram__r.Name === avviso.Name &&
                                c.outfunds__Status__c === 'REVOCATA' &&
                                c.Revoca__c === 'Revoca Definitiva'
                        ),
                        (d) => d.importo
                    );
                    saldo = saldo + revochedefinitive;
                    m.movimenti.push(
                        {
                            avviso: avviso.Name,
                            data_apertura: avviso.outfunds__Start_Date__c,
                            stato: avviso.outfunds__Status__c,
                            label: 'Svincolo revoche definitive', importo: revochedefinitive, saldo: saldo
                        }
                    );
                    //Residuo avviso
                    let residuoavviso = avviso.importo - d3.sum(
                        candidature.filter(
                            (c) =>
                                c.outfunds__FundingProgram__r.Name === avviso.Name && c.misura === misura.Name &&
                                (
                                    c.outfunds__Status__c === 'AMMESSA'
                                    || c.outfunds__Status__c === 'AMMESSA CON RISERVA'
                                    || c.outfunds__Status__c === 'ACCETTATA'
                                    || c.outfunds__Status__c === 'IN VERIFICA'
                                    || c.outfunds__Status__c === 'FINANZIATA'
                                    
                                    || c.outfunds__Status__c === 'RINUNCIATA'
                                    || c.outfunds__Status__c === 'REVOCATA'
                                    
                                    /*

                                    ||(c.outfunds__Status__c ===  'RINUNCIATA'&&c.rinuncia__c!=='Decretato')
                                    ||(c.outfunds__Status__c ===  'REVOCATA'&&c.Revoca__c!=='Revoca Definitiva')
                                    */

                                )

                        ),
                        (d) => d.importo
                    );
                    //if (residuoavviso < 0) { residuoavviso = 0; }
                    saldo = saldo + residuoavviso;
                    m.movimenti.push(
                        {
                            avviso: avviso.Name,
                            data_apertura: avviso.outfunds__Start_Date__c,
                            stato: avviso.outfunds__Status__c,
                            label: 'Svincolo residuo avviso', importo: residuoavviso, saldo: saldo
                        }
                    );
                    
                }
                //Potenziali rinunciate
                const rinuncenondecretate = d3.sum(
                    candidature.filter(
                        (c) =>
                            c.outfunds__FundingProgram__r.Name === avviso.Name &&
                            c.outfunds__Status__c === 'RINUNCIATA' &&
                            c.rinuncia__c !== 'Decretato'
                    ),
                    (d) => d.importo
                );
                //saldo = saldo + rinuncedecretate;
                m.movimenti.push(
                    {
                        avviso: avviso.Name,
                        data_apertura: avviso.outfunds__Start_Date__c,
                        stato: avviso.outfunds__Status__c,
                        label: 'Potenziali rinunce', importo: rinuncenondecretate, saldo: saldo
                    }
                );
                //Potenziali revocate
                const revochenondefinitive = d3.sum(
                    candidature.filter(
                        (c) =>
                            c.outfunds__FundingProgram__r.Name === avviso.Name &&
                            c.outfunds__Status__c === 'REVOCATA' &&
                            c.Revoca__c !== 'Revoca Definitiva'
                    ),
                    (d) => d.importo
                );
                //saldo = saldo + revochedefinitive;
                m.movimenti.push(
                    {
                        avviso: avviso.Name,
                        data_apertura: avviso.outfunds__Start_Date__c,
                        stato: avviso.outfunds__Status__c,
                        label: 'Potenziali revoche', importo: revochenondefinitive, saldo: saldo
                    }
                );

            });
            res.push(m);

        });

        const infomisure = [];
        infomisure.push({
            misura: "1.1 Infrastrutture digitali",
            importi: {
                importo_totale: 900000000,
                importo_centralizzato: 900000000-res.find(x => x.misura==="1.1 Infrastrutture digitali").movimenti[0].importo,
                importo_territorializzato: res.find(x => x.misura==="1.1 Infrastrutture digitali").movimenti[0].importo,
                residuo: res.find(x => x.misura==="1.1 Infrastrutture digitali").movimenti[res.find(x => x.misura==="1.1 Infrastrutture digitali").movimenti.length-1].saldo,
                potenziali_rinunce: d3.sum(res.find(x => x.misura==="1.1 Infrastrutture digitali").movimenti.filter(x => x.label==='Potenziali rinunce'),(d) => d.importo),
                potenziali_revoche: d3.sum(res.find(x => x.misura==="1.1 Infrastrutture digitali").movimenti.filter(x => x.label==='Potenziali revoche'),(d) => d.importo)
            }
        });
        infomisure.push({
            misura: "1.2 Abilitazione e facilitazione migrazione al Cloud",
            importi: {
                importo_totale: 1000000000,
                importo_centralizzato: 1000000000-res.find(x => x.misura==="1.2 Abilitazione e facilitazione migrazione al Cloud").movimenti[0].importo,
                importo_territorializzato: res.find(x => x.misura==="1.2 Abilitazione e facilitazione migrazione al Cloud").movimenti[0].importo,
                residuo: res.find(x => x.misura==="1.2 Abilitazione e facilitazione migrazione al Cloud").movimenti[res.find(x => x.misura==="1.2 Abilitazione e facilitazione migrazione al Cloud").movimenti.length-1].saldo,
                potenziali_rinunce: d3.sum(res.find(x => x.misura==="1.2 Abilitazione e facilitazione migrazione al Cloud").movimenti.filter(x => x.label==='Potenziali rinunce'),(d) => d.importo),
                potenziali_revoche: d3.sum(res.find(x => x.misura==="1.2 Abilitazione e facilitazione migrazione al Cloud").movimenti.filter(x => x.label==='Potenziali revoche'),(d) => d.importo)
            }
        });
        infomisure.push({
            misura: "1.3.1 Piattaforma Digitale Nazionale Dati",
            importi: {
                importo_totale: 556000000,
                importo_centralizzato: 556000000-res.find(x => x.misura==="1.3.1 Piattaforma Digitale Nazionale Dati").movimenti[0].importo,
                importo_territorializzato: res.find(x => x.misura==="1.3.1 Piattaforma Digitale Nazionale Dati").movimenti[0].importo,
                residuo: res.find(x => x.misura==="1.3.1 Piattaforma Digitale Nazionale Dati").movimenti[res.find(x => x.misura==="1.3.1 Piattaforma Digitale Nazionale Dati").movimenti.length-1].saldo,
                potenziali_rinunce: d3.sum(res.find(x => x.misura==="1.3.1 Piattaforma Digitale Nazionale Dati").movimenti.filter(x => x.label==='Potenziali rinunce'),(d) => d.importo),
                potenziali_revoche: d3.sum(res.find(x => x.misura==="1.3.1 Piattaforma Digitale Nazionale Dati").movimenti.filter(x => x.label==='Potenziali revoche'),(d) => d.importo)
            }
        });

        infomisure.push({
            misura: "1.4.1 Esperienza del cittadino nei servizi pubblici",
            importi: {
                importo_totale: 813000000,
                importo_centralizzato: 813000000-res.find(x => x.misura==="1.4.1 Esperienza del cittadino nei servizi pubblici").movimenti[0].importo,
                importo_territorializzato: res.find(x => x.misura==="1.4.1 Esperienza del cittadino nei servizi pubblici").movimenti[0].importo,
                residuo: res.find(x => x.misura==="1.4.1 Esperienza del cittadino nei servizi pubblici").movimenti[res.find(x => x.misura==="1.4.1 Esperienza del cittadino nei servizi pubblici").movimenti.length-1].saldo,
                potenziali_rinunce: d3.sum(res.find(x => x.misura==="1.4.1 Esperienza del cittadino nei servizi pubblici").movimenti.filter(x => x.label==='Potenziali rinunce'),(d) => d.importo),
                potenziali_revoche: d3.sum(res.find(x => x.misura==="1.4.1 Esperienza del cittadino nei servizi pubblici").movimenti.filter(x => x.label==='Potenziali revoche'),(d) => d.importo)
            }
        });

        infomisure.push({
            misura: "1.4.3 Adozione PagoPA e AppIO",
            importi: {
                importo_totale: 561000000,
                importo_centralizzato: 561000000-res.find(x => x.misura==="1.4.3 Adozione PagoPA e AppIO").movimenti[0].importo,
                importo_territorializzato: res.find(x => x.misura==="1.4.3 Adozione PagoPA e AppIO").movimenti[0].importo,
                residuo: res.find(x => x.misura==="1.4.3 Adozione PagoPA e AppIO").movimenti[res.find(x => x.misura==="1.4.3 Adozione PagoPA e AppIO").movimenti.length-1].saldo,
                potenziali_rinunce: d3.sum(res.find(x => x.misura==="1.4.3 Adozione PagoPA e AppIO").movimenti.filter(x => x.label==='Potenziali rinunce'),(d) => d.importo),
                potenziali_revoche: d3.sum(res.find(x => x.misura==="1.4.3 Adozione PagoPA e AppIO").movimenti.filter(x => x.label==='Potenziali revoche'),(d) => d.importo)
            }
        });

        infomisure.push({
            misura: "1.4.4 Adozione identità digitale",
            importi: {
                importo_totale: 285000000,
                importo_centralizzato: 285000000-res.find(x => x.misura==="1.4.4 Adozione identità digitale").movimenti[0].importo,
                importo_territorializzato: res.find(x => x.misura==="1.4.4 Adozione identità digitale").movimenti[0].importo,
                residuo: res.find(x => x.misura==="1.4.4 Adozione identità digitale").movimenti[res.find(x => x.misura==="1.4.4 Adozione identità digitale").movimenti.length-1].saldo,
                potenziali_rinunce: d3.sum(res.find(x => x.misura==="1.4.4 Adozione identità digitale").movimenti.filter(x => x.label==='Potenziali rinunce'),(d) => d.importo),
                potenziali_revoche: d3.sum(res.find(x => x.misura==="1.4.4 Adozione identità digitale").movimenti.filter(x => x.label==='Potenziali revoche'),(d) => d.importo)
            }
        });

        infomisure.push({
            misura: "1.4.5 Digitalizzazione degli avvisi pubblici",
            importi: {
                importo_totale: 245000000,
                //importo_centralizzato: 245000000-res.find(x => x.misura==="1.4.5 Digitalizzazione degli avvisi pubblici").movimenti[0].importo,
                importo_centralizzato: 245000000-191620450,
                //importo_territorializzato: res.find(x => x.misura==="1.4.5 Digitalizzazione degli avvisi pubblici").movimenti[0].importo,
                importo_territorializzato: 191620450,
                residuo: res.find(x => x.misura==="1.4.5 Digitalizzazione degli avvisi pubblici").movimenti[res.find(x => x.misura==="1.4.5 Digitalizzazione degli avvisi pubblici").movimenti.length-1].saldo,
                potenziali_rinunce: d3.sum(res.find(x => x.misura==="1.4.5 Digitalizzazione degli avvisi pubblici").movimenti.filter(x => x.label==='Potenziali rinunce'),(d) => d.importo),
                potenziali_revoche: d3.sum(res.find(x => x.misura==="1.4.5 Digitalizzazione degli avvisi pubblici").movimenti.filter(x => x.label==='Potenziali revoche'),(d) => d.importo)
            }
        });

        infomisure.forEach(im => {
            im.importi.importo_territorializzato_vincolato = im.importi.importo_territorializzato-im.importi.residuo;
        })

        return {
            res: res,
            infomisure: infomisure
        };
    } else {
        throw redirect(303, '/users');
    }

}

