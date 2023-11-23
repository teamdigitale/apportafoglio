import jsforce from 'jsforce';
import { loadEntiAPortafoglio } from '../../../logic/enti';
import { getUtenteStandard, getUtenteAsseveratore } from '../../../lib/userdb';

export async function load({ cookies }) {
    let entistd = [];
    let entiass = [];
    const ustd = getUtenteStandard(cookies);
    const uass = getUtenteAsseveratore(cookies);

    if (ustd) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        await conn.login(ustd.email, ustd.password + ustd.token);
        entistd = entistd.concat(await loadEntiAPortafoglio(conn, ustd, 'Standard'));
        await conn.logout();
    }
    if (uass) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        await conn.login(uass.email, uass.password + uass.token);
        entiass = entiass.concat(await loadEntiAPortafoglio(conn, uass, 'Asseveratore'));
        await conn.logout();
    }
    return {
        enti: entistd.concat(entiass)
    };
}

