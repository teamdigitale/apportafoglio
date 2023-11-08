import jsforce from 'jsforce';
import { caricaAvvisiPerMisura } from '../../../../logic/misure';
import { getUtenteStandard, getUtenteAsseveratore } from '../../../../logic/userdb';

export async function load({ params,cookies }) {
    let avvisi = [];
    let misure = [];
    const ustd = getUtenteStandard(cookies);
    const uass = getUtenteAsseveratore(cookies);
    if (ustd) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        await conn.login(ustd.email, ustd.password + ustd.token);
        avvisi = avvisi.concat(await caricaAvvisiPerMisura(conn, params.idmisura));
        misure = misure.concat(await caricaMisure(conn));
        await conn.logout();
    } else if (uass) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        await conn.login(uass.email, uass.password + uass.token);
        avvisi = avvisi.concat(await caricaAvvisiPerMisura(conn, params.idmisura));
        misure = misure.concat(await caricaMisure(conn));
        await conn.logout();
    }
    return {
        avvisi: avvisi,
        misure: misure,
        idmisura: params.slug
        //pMisura: params.slug
    };

}
