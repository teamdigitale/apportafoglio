import jsforce from 'jsforce';
import { redirect } from '@sveltejs/kit';
import { CID } from '$env/static/private';
import { CS } from '$env/static/private';
import { CBURI } from '$env/static/private';

export const handle = async ({ event, resolve }) => {
    let loggedstandard = false;
    let loggedasseveratore = false;
    
    if(event.url.pathname.startsWith('/accesso')){
    const code = event.url.searchParams.get('code');
    if (code && code !== '') {
        const oa = new jsforce.OAuth2({
            clientId : CID,
            clientSecret : CS,
            redirectUri : CBURI
        });
        const conn = new jsforce.Connection({ oauth2: oa });
        conn.authorize(code, function (err, userInfo) {
            if (err) { return console.error(err); }
            const connectionToken = conn.accessToken;
            event.cookies.set('session_id_std', connectionToken, {
                path: '/',
                sameSite: 'strict',
                secure: true,
                maxAge: 60 * 60 * 24 * 1
            }); 
            loggedstandard=true;      
        });
    }
}


    let cookiesfuidstd = event.cookies.get('session_id_std');
    let cookiesfuidass = event.cookies.get('session_id_ass');
    if (cookiesfuidstd) loggedstandard = true;
    if (cookiesfuidass) loggedasseveratore = true;

    if (!(loggedstandard || loggedasseveratore) && !(
        event.url.pathname === '/' ||
        //event.url.pathname.startsWith('/entiipa') ||
        event.url.pathname.startsWith('/accesso') ||
        event.url.pathname.startsWith('/auth')
    )) {
        throw redirect(303, '/accesso');
    }

    let utentestandard = event.locals.utentestandard;
    let utenteasseveratore = event.locals.utenteasseveratore;


    let sessionerror = '';

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
                    event.cookies.delete('session_id_std', { path: '/' });
                    loggedstandard = false;
                    cookiesfuidstd = null;
                } else {
                    idutentesf = res.user_id;
                    //RUNAS: Marco Virno
                    //idutentesf = '0057Q0000070qelQAA';
                    //RUNAS: Claudio Scarpa
                    //idutentesf = '0057Q0000072YrZQAU';
                }

            });
            let soqlUtente = `select Username, Name, Title, Email, FullPhotoUrl   from User where Id = '` + idutentesf + `'`;
            let result_ = await conn.query(soqlUtente);
            utentestandard = result_.records[0];
            utentestandard.idsf = idutentesf;
        } catch (error) {
            sessionerror = error.message;
            event.cookies.delete('session_id_std', { path: '/' });
            loggedstandard = false;
            cookiesfuidstd = null;
            utentestandard = null;
        }

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
                    event.cookies.delete('session_id_ass', { path: '/' });
                    loggedasseveratore = false;
                    cookiesfuidass = null;
                } else {
                    idutentesf = res.user_id;

                }

            });
            let soqlUtente = `select Username, Name, Title, Email, FullPhotoUrl   from User where Id = '` + idutentesf + `'`;
            let result_ = await conn.query(soqlUtente);
            utenteasseveratore = result_.records[0];
            utenteasseveratore.idsf = idutentesf;
        } catch (error) {
            sessionerror = error.message;
            event.cookies.delete('session_id_ass', { path: '/' });
            loggedasseveratore = false;
            cookiesfuidass = null;
            utenteasseveratore = null;
            
        }

    }
    event.locals.user = {
        loggedstandard: loggedstandard,
        connectionStandard: cookiesfuidstd,
        utentestandard: utentestandard,
        loggedasseveratore: loggedasseveratore,
        connectionAsseveratore: cookiesfuidass,
        utenteasseveratore: utenteasseveratore,
        sessionerror: sessionerror
    };
    return resolve(event);
};

