import jsforce from 'jsforce';
import { caricaMisure } from '../../../logic/misure.js';
import { getUtenteStandard, getUtenteAsseveratore } from '../../../logic/userdb';

export async function load({ cookies }) {
    let misure = [];
    const ustd = getUtenteStandard(cookies);
    const uass = getUtenteAsseveratore(cookies);
    if (ustd) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        console.log(JSON.stringify(ustd));
        await conn.login(ustd.email, ustd.password + ustd.token);
        misure = misure.concat(await caricaMisure(conn));
        await conn.logout();
    } else if (uass) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        await conn.login(uass.email, uass.password + uass.token);
        misure = misure.concat(await caricaMisure(conn));
        await conn.logout();
    }
    return {
        misure: misure
    };
}
