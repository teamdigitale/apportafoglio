import jsforce from 'jsforce';
import { caricaClusters } from '../../../../logic/misure.js';
import { getUtenteStandard, getUtenteAsseveratore } from '../../../../logic/userdb';

export async function load({ params,cookies }) {
    let clusters = [];
    const ustd = getUtenteStandard(cookies);
    const uass = getUtenteAsseveratore(cookies);
    if (ustd) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        await conn.login(ustd.email, ustd.password + ustd.token);
        clusters = clusters.concat(await caricaClusters(conn, params.idavviso));
        
        await conn.logout();
    } else if (uass) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        await conn.login(uass.email, uass.password + uass.token);
        clusters = clusters.concat(await caricaClusters(conn, params.idavviso));
        
        await conn.logout();
    }
    return {
        idmisura: params.idavviso,
        clusters: clusters
    };

}