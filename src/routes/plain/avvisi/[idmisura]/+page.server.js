import jsforce from 'jsforce';
import { caricaAvvisi, caricaMisure } from '../../../../logic/misure';
import { getUtenteStandard, getUtenteAsseveratore } from '../../../../logic/userdb';


export async function load({ cookies, params }) {
    let avvisi = [];
    let misure = [];
    const ustd = getUtenteStandard(cookies);
    const uass = getUtenteAsseveratore(cookies);
    const u = ustd ? ustd : uass;
    if (params.idmisura) {
        if (u) {
            let conn = new jsforce.Connection({
                loginUrl: "https://login.salesforce.com"
            });
            await conn.login(u.email, u.password + u.token);
            avvisi = avvisi.concat(await caricaAvvisi(conn)).filter(a=> a.outfunds__Parent_Funding_Program__c===params.idmisura);
            misure = misure.concat(await caricaMisure(conn)).filter(m=> m.Id === params.idmisura);
            await conn.logout();
        }
    }
    return {
        avvisi: avvisi,
        misure: misure
    };
}