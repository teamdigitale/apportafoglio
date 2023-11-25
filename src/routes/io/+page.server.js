import { getUserBySessionid, createUser, deleteUser } from '../../lib/userdb';
import { v4 as uuidv4 } from 'uuid';
import { dev } from '$app/environment';
import jsforce from 'jsforce';
import { loadUtente } from '../../logic/utenti'
import { redirect } from '@sveltejs/kit';

let loggedstandard = false;
let loggedasseveratore = false;
let loginerrorstandard = '';
let loginerrorasseveratore = '';
let utentestandard;
let utenteasseveratore;

export function load({ cookies }) {
    const cookiesfuidstd = cookies.get('session_id_std');
    const cookiesfuidass = cookies.get('session_id_ass');
    loggedstandard = false;
    loggedasseveratore = false;
    loginerrorstandard = '';
    loginerrorasseveratore = '';

    if (cookiesfuidstd) {
        utentestandard = getUserBySessionid(cookiesfuidstd, 'standard');
        if (utentestandard == null) {
            cookies.delete('session_id_std');
            loggedstandard = false;
        } else {
            loggedstandard = true;
        }
    }

    if (cookiesfuidass) {
        utenteasseveratore = getUserBySessionid(cookiesfuidass, 'asseveratore');
        if (utenteasseveratore == null) {
            cookies.delete('session_id_ass');
            loggedasseveratore = false;

        } else {
            loggedasseveratore = true;
        }
    }
    return {
        cookiesfuidstd: cookiesfuidstd,
        cookiesfuidass: cookiesfuidass,
        loggedstandard: loggedstandard,
        loggedasseveratore: loggedasseveratore,
        loginerrorstandard: loginerrorstandard,
        loginerrorasseveratore: loginerrorasseveratore,
        utentestandard: utentestandard,
        utenteasseveratore: utenteasseveratore
    }

}

export const actions = {
    login: async ({ request, cookies }) => {
        loggedstandard = false;
        loggedasseveratore = false;
        loginerrorstandard = '';
        loginerrorasseveratore = '';
        const data = await request.formData();
        const email = '' + data.get('email');
        const password = '' + data.get('password');
        const token = '' + data.get('token');
        let tipoUtente = '' + data.get('tipoutente');
        let idutentesf = '';
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        try {
            await conn.login(email, password + token);
            await conn.identity(function (err, res) {

                idutentesf = res.user_id;
            });
            const sfuser = await loadUtente(conn, idutentesf);
            if (sfuser.Title == 'Asseveratore') {
                tipoUtente = 'asseveratore';
            }

            /******ABILITAZIONE PILOTI */

            if (["0057Q00000729pMQAQ", "0057Q0000072YrZQAU", "0057Q000005UXtlQAG", "0057Q0000070qelQAA", "0057Q0000072NWoQAM",
                "0057Q0000072hbnQAA", "0057Q0000072hcgQAA", "0057Q0000072hdZQAQ", "0057Q0000072hcCQAQ","0057Q00000BBBNwQAP"].indexOf(idutentesf) < 0) {
                throw redirect(303, '/io');
            }

            const sessionId = uuidv4();
            createUser(sessionId, email, password, token, tipoUtente, idutentesf, sfuser);
            cookies.set(tipoUtente === 'standard' ? 'session_id_std' : 'session_id_ass', sessionId, {
                path: '/',
                //httpOnly: true,
                sameSite: 'strict',
                secure: true,
                maxAge: 60 * 60 * 24 * 1
            });
            cookies.delete('runas');
            cookies.delete('origrunas');


            if (tipoUtente === 'standard') {
                loggedstandard = true;
            } else {
                loggedasseveratore = true;
            }

            await conn.logout();
            //throw redirect(303, '/io?/login');
        } catch (err) {
            console.log(err.message);
            if (tipoUtente == 'standard') { loginerrorstandard = err.message; }
            else {
                loginerrorasseveratore = err.message;
            }
            if (tipoUtente === 'standard') {
                loggedstandard = false;
            } else {
                loggedasseveratore = false;
            }
        }

        return {

            loggedstandard: loggedstandard,
            loggedasseveratore: loggedasseveratore,
            loginerrorstandard: loginerrorstandard,
            loginerrorasseveratore: loginerrorasseveratore,

        }
        //throw redirect(303, '/io');
    },
    logout: async ({ request, cookies }) => {

        const data = await request.formData();
        const tipoUtente = '' + data.get('tipoutente');
        const c = cookies.get(tipoUtente === 'standard' ? 'session_id_std' : 'session_id_ass');
        deleteUser(c, tipoUtente);
        cookies.delete(tipoUtente === 'standard' ? 'session_id_std' : 'session_id_ass');
        if (tipoUtente === 'standard') {
            loggedstandard = false;
        } else {
            loggedasseveratore = false;
        }
        throw redirect(303, '/io');
    }
};
