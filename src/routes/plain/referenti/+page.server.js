import jsforce from 'jsforce';
import { loadEntiAPortafoglio } from '../../../logic/enti';
import { loadReferentiAPortafoglio } from '../../../logic/referenti';
import { getUtenteStandard, getUtenteAsseveratore } from '../../../logic/userdb';



export async function load({ cookies }) {
    let referentistd = [];
    let referentiass = [];
    let entistd = [];
    let entiass = [];
    const ustd = getUtenteStandard(cookies);
    const uass = getUtenteAsseveratore(cookies);
    if (ustd) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        await conn.login(ustd.email, ustd.password + ustd.token);
        referentistd = referentistd.concat(await loadReferentiAPortafoglio(conn, ustd, 'Standard'));
        entistd = entistd.concat(await loadEntiAPortafoglio(conn, ustd, 'Standard'));
        await conn.logout();
        referentistd.forEach((r) => r.ente=entistd.filter((e) => e.Id === r.AccountId)[0]);
    }
    if (uass) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        await conn.login(uass.email, uass.password + uass.token);
        referentiass = referentiass.concat(await loadReferentiAPortafoglio(conn, uass, 'Asseveratore'));
        entiass = entiass.concat(await loadEntiAPortafoglio(conn, uass, 'Asseveratore'));
        referentiass.forEach((r) => r.ente=entiass.filter((e) => e.Id === r.AccountId)[0]);
        await conn.logout();
    }
    return {
        referenti: referentistd.concat(referentiass)
    };
}
