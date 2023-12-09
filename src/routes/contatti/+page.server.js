import { redirect } from '@sveltejs/kit';
import jsforce from 'jsforce';
import { loadContatti, loadEventi } from './logic';

export async function load({ locals }) {
    let contatti = [];
    let eventi = [];
    const connstandard = locals.user.connectionStandard;
    const connasseveratore = locals.user.connectionAsseveratore;
    const connection = connstandard ? connstandard : connasseveratore;

    if (connection) {
        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connection
        });
        let idutentesf;
        await conn.identity(function (err, res) {
            idutentesf = res.user_id;
        });

        idutentesf='0057Q0000070qelQAA';
        contatti = contatti.concat(await loadContatti(conn, idutentesf));
        eventi = eventi.concat(await loadEventi(conn, idutentesf));
        let r = [];
        contatti.forEach(c => {
            r.push({
                CreatedDate: c.CreatedDate,
                Account: { Name: c.Account.Name },
                Subject: c.Subject,
                Description: c.Description,
                Tipo: 'Contatto diretto'
            });
        });
        eventi.forEach(e => {
            r.push({
                CreatedDate: e.CreatedDate,
                Account: { Name: e.Account.Name },
                Subject: 'Riunione: ' + e.Subject,
                Description: e.Subject,
                Tipo: 'Riunione'
            });
        });
        r = r.sort((a, b) => new Date(b.CreatedDate).getDate() - new Date(a.CreatedDate).getDate());
        return {
            contatti: r
        };
    } else {
        throw redirect(303, '/io');
    }
}
