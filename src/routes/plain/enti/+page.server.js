import { redirect } from '@sveltejs/kit';
import jsforce from 'jsforce';
import { loadEntiAPortafoglio } from '../../../logic/enti';

export async function load({ locals }) {
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
            entistd = entistd.concat(await loadEntiAPortafoglio(conn, idutentesf, 'Standard'));
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
            entiass = entiass.concat(await loadEntiAPortafoglio(conn, idutentesf, 'Asseveratore'));
        }
        return {
            enti: entistd.concat(entiass)
        };
    } else {
        throw redirect(303, '/io');
    }
}

