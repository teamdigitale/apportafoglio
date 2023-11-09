import { getUserBySessionid } from './logic/userdb';
import { redirect } from '@sveltejs/kit';


const unProtectedRoutes = ['/', '/io', '/opendata', '/io/cookies'];
export const handle = async ({ event, request, resolve }) => {
    let loggedstandard = false;
    let loggedasseveratore = false;
    let utentestandard;
    let utenteasseveratore;
    const cookiesfuidstd = event.cookies.get('session_id_std');
    const cookiesfuidass = event.cookies.get('session_id_ass');
    if (!event.url.pathname.startsWith('/sfinfo')) {
        if (!(cookiesfuidstd || cookiesfuidass) && !unProtectedRoutes.includes(event.url.pathname)) {
            throw redirect(303, '/io');
        }


        if (cookiesfuidstd) {
            utentestandard = getUserBySessionid(cookiesfuidstd, 'standard');
            if (utentestandard == null) {
                event.cookies.delete('session_id_std');
                loggedstandard = false;
            } else {
                loggedstandard = true;
            }
        }

        if (cookiesfuidass) {
            utenteasseveratore = getUserBySessionid(cookiesfuidass, 'asseveratore');
            if (utenteasseveratore == null) {
                event.cookies.delete('session_id_ass');
                loggedasseveratore = false;

            } else {
                loggedasseveratore = true;
            }
        }
        if (loggedasseveratore || loggedstandard) {
            //DO SOMETHING
        } else {

            if (!unProtectedRoutes.includes(event.url.pathname)) {
                throw redirect(303, '/io');
            }

        }

    }

    /*
    let us = utentestandard;

    if (utentestandard) {
        delete us.token;
        delete us.password;
        delete us.idutentesf;
    }

    let ua = utenteasseveratore;
    if (utenteasseveratore) {
        delete ua.token;
        delete ua.password;
        delete ua.idutentesf;
    }
    */


    event.locals.user = {
        loggedstandard: loggedstandard,
        loggedasseveratore: loggedasseveratore,
        //userstandard: utentestandard,
        //userasseveratore: utenteasseveratore,
        originaluserstandard: utentestandard
    };
    return resolve(event);
};