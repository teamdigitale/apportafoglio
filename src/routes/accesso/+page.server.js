import jsforce from 'jsforce';
import { redirect } from '@sveltejs/kit';
import { CID } from '$env/static/private';
import { CS } from '$env/static/private';
import { CBURI } from '$env/static/private';

export async function load({ cookies, url, locals }) {

    const code = url.searchParams.get('code');
    if (code && code !== '') {
        const oa = new jsforce.OAuth2({
            clientId: CID,
            clientSecret: CS,
            redirectUri: CBURI
        });
        const conn = new jsforce.Connection({ oauth2: oa });


        await conn.authorize(code);
        const connectionToken = conn.accessToken;
        if (connectionToken) {
            cookies.set('session_id_std', connectionToken, {
                path: '/',
                sameSite: 'strict',
                secure: true,
                maxAge: 60 * 60 * 24 * 1
            });
        }
        //throw redirect(303, '/accesso');
        let utentestandard = null;
        let cookiesfuidstd = null;
        let loggedstandard = false;
        let sessionerror = '';
        let idutentesf = '';
        try {
            await conn.identity(function (err, res) {
                if (err) {
                    sessionerror = err.message;
                    cookies.delete('session_id_std', { path: '/' });
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
            cookies.delete('session_id_std', { path: '/' });
            loggedstandard = false;
            cookiesfuidstd = null;
            utentestandard = null;
        }

        locals.user.loggedstandard = loggedstandard;
        locals.user.utentestandard = utentestandard;
        throw redirect(302, '/accesso');
        /*
        return {
            loggedstandard: true ,
            utentestandard: utentestandard,
            cookiesfuidstd: connectionToken,
            sessionerror: sessionerror,
            refresh: true   
        }*/
    }
    else {
        return {
        }
    }

}


export const actions = {
    loginstandard: async ({ request, cookies }) => {

        const data = await request.formData();
        const email = '' + data.get('emailstandard');
        const password = '' + data.get('passwordstandard');
        const token = '' + data.get('tokenstandard');

        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        try {
            await conn.login(email, password + token);
            const connectionToken = conn.accessToken;
            cookies.set('session_id_std', connectionToken, {
                path: '/',
                sameSite: 'strict',
                secure: true,
                maxAge: 60 * 60 * 24 * 1
            });




        } catch (err) {
            console.log(err.message);
        }
        throw redirect(303, '/accesso');
    },
    logoutstandard: async ({ cookies }) => {
        cookies.delete('session_id_std', { path: '/' });
        throw redirect(303, '/accesso');
    },
    loginasseveratore: async ({ request, cookies }) => {

        const data = await request.formData();
        const email = '' + data.get('emailasseveratore');
        const password = '' + data.get('passwordasseveratore');
        const token = '' + data.get('tokenasseveratore');

        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        try {
            await conn.login(email, password + token);
            const connectionToken = conn.accessToken;
            cookies.set('session_id_ass', connectionToken, {
                path: '/',
                sameSite: 'strict',
                secure: true,
                maxAge: 60 * 60 * 24 * 1
            });

        } catch (err) {
            console.log(err.message);
        }
        throw redirect(303, '/accesso');
    },
    logoutasseveratore: async ({ cookies }) => {
        cookies.delete('session_id_ass', { path: '/' });
        throw redirect(303, '/accesso');
    }
};
