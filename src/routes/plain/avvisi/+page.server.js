import jsforce from 'jsforce';
import { caricaAvvisi, caricaMisure } from '../../../logic/misure';
import { getUtenteStandard, getUtenteAsseveratore } from '../../../lib/userdb';


export async function load({ cookies }) {
    let avvisi = [];
    let misure = [];
    const ustd = getUtenteStandard(cookies);
    const uass = getUtenteAsseveratore(cookies);
    const u = ustd?ustd:uass;
    if (u) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        await conn.login(u.email, u.password + u.token);
        avvisi = avvisi.concat(await caricaAvvisi(conn));
        misure = misure.concat(await caricaMisure(conn));
        await conn.logout();
    }
    return {
        avvisi: avvisi,
        misure: misure
    };
}


