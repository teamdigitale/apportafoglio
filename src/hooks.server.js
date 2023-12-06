import jsforce from 'jsforce';
import { redirect } from '@sveltejs/kit';
import { loadUtente } from './logic/utenti';

export const handle = async ({ event, resolve }) => {
    let loggedstandard = false;
    let loggedasseveratore = false;
    const cookiesfuidstd = event.cookies.get('session_id_std');
    const cookiesfuidass = event.cookies.get('session_id_ass');

    if (!(cookiesfuidstd || cookiesfuidass) && !(
        event.url.pathname === '/' ||
        event.url.pathname.startsWith('/entiipa') ||
        event.url.pathname.includes('/io') ||
        event.url.pathname.includes('/opendata')
    )) {
        throw redirect(303, '/io');
    }

    if (cookiesfuidstd) loggedstandard = true;
    if (cookiesfuidass) loggedasseveratore = true;
    if (!(loggedasseveratore || loggedstandard)) {
        if (!(
            event.url.pathname === '/' ||
            event.url.pathname.startsWith('/entiipa') ||
            event.url.pathname.includes('/io') ||
            event.url.pathname.includes('/opendata')
        )) {
            throw redirect(303, '/io');
        }
    }

    let utentestandard = event.locals.utentestandard;
    let utenteasseveratore = event.locals.utenteasseveratore;

    let boardauth = false;
    if (loggedstandard && !utentestandard) {
        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: cookiesfuidstd
        });
        let idutentesf;
        await conn.identity(function (err, res) {
            idutentesf = res.user_id;
        });
        boardauth = ["0057Q0000072NWoQAM","0057Q000005UXjoQAG","0057Q00000375UHQAY"].indexOf(idutentesf) > -1;
        utentestandard = await loadUtente(conn, idutentesf);
    }

    if (loggedasseveratore && !utenteasseveratore) {
        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: cookiesfuidass
        });
        let idutentesf;
        await conn.identity(function (err, res) {
            idutentesf = res.user_id;
        });
        utenteasseveratore = await loadUtente(conn, idutentesf);
    }

    

    event.locals.user = {
        loggedstandard: loggedstandard,
        loggedasseveratore: loggedasseveratore,
        connectionStandard: cookiesfuidstd,
        connectionAsseveratore: cookiesfuidass,
        utentestandard: utentestandard,
        utenteasseveratore: utenteasseveratore,
        boardauth: boardauth

    };
    return resolve(event);
};

