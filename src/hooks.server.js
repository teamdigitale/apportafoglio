import jsforce from 'jsforce';
import { redirect } from '@sveltejs/kit';
import { loadUtente } from './logic/utenti';

export const handle = async ({ event, resolve }) => {
    let loggedstandard = false;
    let loggedasseveratore = false;
    let cookiesfuidstd = event.cookies.get('session_id_std');
    let cookiesfuidass = event.cookies.get('session_id_ass');

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

    let sessionerror = '';

    let boardauth = false;
    if (loggedstandard && !utentestandard) {

        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: cookiesfuidstd
        });
        let idutentesf;

        try {
            await conn.identity(function (err, res) {
                if (err) {
                    sessionerror = err.message;
                    event.cookies.delete('session_id_std');
                    loggedstandard = false;
                    cookiesfuidstd = null;
                } else {
                    idutentesf = res.user_id;
                    utentestandard = loadUtente(conn, idutentesf);
                }

            });
        } catch (error) {
            sessionerror = error.message;
            event.cookies.delete('session_id_std');
            loggedstandard = false;
            cookiesfuidstd = null;
        }
        boardauth = ["0057Q0000072NWoQAM","0057Q000005UXjoQAG","0057Q00000375UHQAY"].indexOf(idutentesf) > -1;


    }

    if (loggedasseveratore && !utenteasseveratore) {

        const conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: cookiesfuidass
        });
        let idutentesf;
        try {
            await conn.identity(function (err, res) {
                if (err) {
                    sessionerror = err.message;
                    event.cookies.delete('session_id_ass');
                    loggedasseveratore = false;
                    cookiesfuidass = null;
                } else {
                    idutentesf = res.user_id;
                    utenteasseveratore = loadUtente(conn, idutentesf);
                }

            });
        }catch (error) {
                sessionerror = error.message;
                event.cookies.delete('session_id_ass');
                loggedasseveratore = false;
                cookiesfuidass = null;
            }


        }



    event.locals.user = {
            loggedstandard: loggedstandard,
            loggedasseveratore: loggedasseveratore,
            connectionStandard: cookiesfuidstd,
            connectionAsseveratore: cookiesfuidass,
            utentestandard: utentestandard,
            utenteasseveratore: utenteasseveratore,
            boardauth: boardauth,
            sessionerror: sessionerror
        };
        return resolve(event);
    };

