import { promiseQuery } from '$lib';
import { redirect } from '@sveltejs/kit';
import jsforce from 'jsforce';
import * as d3 from 'd3';

const MAX_FETCH = 1000000;

/** @type {import('../$types').PageServerLoad} */
export async function load({ locals }) {
    const connstandard = locals.user.connectionStandard;

    if (connstandard) {
        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connstandard
        });
        const rawAvvisi = await promiseQuery(conn, `select Id, Name, outfunds__Start_Date__c, outfunds__End_Date__c, outfunds__Status__c, outfunds__Total_Program_Amount__c, Total_Program_Amount_Padre_1__c, Total_Program_Amount_Padre_2__c, outfunds__Parent_Funding_Program__c, Pacchetto__c, SOGGETTI_DESTINATARI__c from outfunds__Funding_Program__c where IsDeleted = false and outfunds__Status__c in ('PUBBLICATO','TERMINATO')`, MAX_FETCH);
        const rawCandidature = await promiseQuery(conn, `select count(id) num_cand, sum(outfunds__Awarded_Amount__c) awarded, sum(Awarded_Amount_Padre_1__c) awarded_1, sum(Awarded_Amount_Padre_2__c) awarded_2,outfunds__Status__c, outfunds__FundingProgram__c
        from outfunds__Funding_Request__c where outfunds__Status__c in ('AMMESSA', 'AMMESSA CON RISERVA', 'ACCETTATA', 'IN VERIFICA', 'FINANZIATA','RINUNCIATA','REVOCATA')
        group by outfunds__Status__c, outfunds__FundingProgram__c`, MAX_FETCH);

        const tmpMisure = rawAvvisi.filter(x => !x.outfunds__Parent_Funding_Program__c && x.Name!=='1.1 e 1.2 Multimisura');
        const misure = tmpMisure.map((m) => ({...m, avvisi: avvisiPerMisura(m.Id,rawAvvisi,tmpMisure,rawCandidature)})).sort((a,b) => {return (a.Name < b.Name) ? -1 : (a.Name > b.Name) ? 1 : 0})
        return {
            misure: misure
        };
    } else {
        throw redirect(303, '/users');
    }

}

const risorsePerAvviso = (idAvviso,tipo,rawCandidature) => {
    const candidaturePerAvviso = rawCandidature.filter(x => x.outfunds__FundingProgram__c===idAvviso);
    const rollupPerStato = d3.rollup(candidaturePerAvviso, 
                                     (v) => (tipo==='standard'?
                                     d3.sum(v, d => d.awarded)
                                     :tipo==='multi 1.1'?
                                     d3.sum(v, d => d.awarded_1)
                                     :tipo==='multi 1.2'?
                                     d3.sum(v, d => d.awarded_2)
                                     :0)
                                     ,
                                     d => d.outfunds__Status__c)
    return rollupPerStato;
}

const avvisiPerMisura = (idMisura,rawAvvisi,tmpMisure,rawCandidature) => {
    const res = [];
    rawAvvisi.forEach(a => {
      if(a.outfunds__Parent_Funding_Program__c===idMisura){
        if(tmpMisure.find(x => x.Id===idMisura).Name!=='1.1 e 1.2 Multimisura'){
           res.push({...a,idMisura: idMisura, risorse: risorsePerAvviso(a.Id,'standard',rawCandidature),budget: a.outfunds__Total_Program_Amount__c, tipo: 'standard'});  
         }
      }else{
        if(tmpMisure.find(x => x.Id===idMisura).Name==='1.1 Infrastrutture digitali'&&rawAvvisi.find(x => x.Id===a.outfunds__Parent_Funding_Program__c)&&rawAvvisi.find(x => x.Id===a.outfunds__Parent_Funding_Program__c).Name==='1.1 e 1.2 Multimisura'){
            res.push({...a,idMisura: rawAvvisi.find(x => x.Id===a.outfunds__Parent_Funding_Program__c).Id, idMisura,risorse: risorsePerAvviso(a.Id,'multi 1.1',rawCandidature),budget: a.Total_Program_Amount_Padre_1__c, tipo: 'multi 1.1'});  
          }
        if(tmpMisure.find(x => x.Id===idMisura).Name==='1.2 Abilitazione e facilitazione migrazione al Cloud'&&rawAvvisi.find(x => x.Id===a.outfunds__Parent_Funding_Program__c)&&rawAvvisi.find(x => x.Id===a.outfunds__Parent_Funding_Program__c).Name==='1.1 e 1.2 Multimisura'){
            res.push({...a,idMisura: rawAvvisi.find(x => x.Id===a.outfunds__Parent_Funding_Program__c).Id,risorse: risorsePerAvviso(a.Id,'multi 1.2',rawCandidature),budget: a.Total_Program_Amount_Padre_2__c, tipo: 'multi 1.2'});  
          }
      }
    })
    return res;
  }