// @ts-nocheck
import jsforce from 'jsforce';
import { loadEntiAPortafoglio } from '../../../logic/enti';
import { caricaAvvisi } from '../../../logic/misure';
import { caricaAdesioniPerAvviso, caricaDatiGrafico, caricaRichiesteDiModifica } from './db';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    let avvisiappio = [];
    let enti = [];
    let adesioniPerAvviso = [];
    let datipergrafico = [];
    let richiestedimodifica = [];
    const connstandard = locals.user.connectionStandard;
    const connection = connstandard;

    if (connection) {
        let conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connection
        });
        let idutentesf;
        await conn.identity(function (err, res) {
            idutentesf = res.user_id;
        });
        enti = await loadEntiAPortafoglio(conn, idutentesf, 'Standard');
        avvisiappio = (await caricaAvvisi(conn)).filter(a => a.Pacchetto__c === 'AppIO').sort((a, b) => { return new Date(a.outfunds__Start_Date__c).getDate() - new Date(b.outfunds__Start_Date__c).getDate() });
        adesioniPerAvviso = await caricaAdesioniPerAvviso(conn, idutentesf);
        datipergrafico = await caricaDatiGrafico(conn, idutentesf);
        richiestedimodifica = await caricaRichiesteDiModifica(conn);
        /* calcola platee */
        const platee = [];

        avvisiappio.forEach((a) => {
            a.beneficiari.forEach(b => {
                const item = {};
                item.idavviso = a.Id;
                item.beneficiario = b;
                item.plateapotenziale = 0;
                let adperav = adesioniPerAvviso.filter(apa => apa.outfunds__FundingProgram__c === a.Id && apa.outfunds__Applying_Organization__r.Tipologia_Ente__c.toUpperCase() === b);
                item.valide = adperav && adperav.length > 0 ? adperav.length : 0;
                if (!(platee.filter(p => p.beneficiario === b) && platee.filter(p => p.beneficiario === b).length > 0)) {
                    item.plateapotenziale = enti.filter(e => e.Tipologia_Ente__c.toUpperCase() === b) ? enti.filter(e => e.Tipologia_Ente__c.toUpperCase() === b).length : 0;
                } else {
                    item.plateapotenziale = platee[platee.length - 1].plateapotenziale - platee[platee.length - 1].valide;
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
    } else {
        throw redirect(303, '/io');
    }


}
