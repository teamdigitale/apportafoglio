import jsforce from 'jsforce';
import { loadEntiAPortafoglio } from '../../../logic/enti';
import { loadReferentiAPortafoglio } from '../../../logic/referenti';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    let referentistd = [];
    let referentiass = [];
    let entistd = [];
    let entiass = [];

    const connstandard = locals.user.connectionStandard;
    const connasseveratore = locals.user.connectionAsseveratore;

    if (connstandard || connasseveratore) {
        if (connstandard) {
            const conn = new jsforce.Connection({
                instanceUrl: "https://padigitale2026.my.salesforce.com",
                accessToken: connstandard
            });
            let idutentesf;
            await conn.identity(function (err, res) {
                idutentesf = res.user_id;
            });
            referentistd = referentistd.concat(await loadReferentiAPortafoglio(conn, idutentesf, 'Standard'));
            entistd = entistd.concat(await loadEntiAPortafoglio(conn, idutentesf, 'Standard'));
            referentistd.forEach((r) => r.ente = entistd.filter((e) => e.Id === r.AccountId)[0]);
        }
        if (connasseveratore) {
            const conn = new jsforce.Connection({
                instanceUrl: "https://padigitale2026.my.salesforce.com",
                accessToken: connasseveratore
            });
            let idutentesf;
            await conn.identity(function (err, res) {
                idutentesf = res.user_id;
            });
            referentiass = referentiass.concat(await loadReferentiAPortafoglio(conn, idutentesf, 'Asseveratore'));
            entiass = entiass.concat(await loadEntiAPortafoglio(conn, idutentesf, 'Asseveratore'));
            referentiass.forEach((r) => r.ente = entiass.filter((e) => e.Id === r.AccountId)[0]);
        }
        return {
            referenti: referentistd.concat(referentiass)
        };
    } else {
        throw redirect(303, '/io');
    }
}
