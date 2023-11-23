// @ts-nocheck
import jsforce from 'jsforce';
import { getUtenteStandard } from '../../../lib/userdb';
import { caricaCandidature145, caricaFornitori145, caricaPlatea145 } from './db';

export async function load({ cookies }) {
    let platea = [];
    let candidature = [];
    let fornitori = [];

    const ustd = getUtenteStandard(cookies);
    if (ustd) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        await conn.login(ustd.email, ustd.password + ustd.token);
        platea = await caricaPlatea145(conn);
        candidature = await caricaCandidature145(conn);
        fornitori = await caricaFornitori145(conn);
        await conn.logout();
    }

    return {
        platea: platea,
        candidature: candidature,
        fornitori: fornitori
    };
}