import { getUserBySessionid } from './lib/userdb';
import { redirect } from '@sveltejs/kit';


const unProtectedRoutes = ['/', '/io', '/opendata', '/entiipa','/io/cookies'];
export const handle = async ({ event,  resolve }) => {
    let loggedstandard = false;
    let loggedasseveratore = false;
    let utentestandard;
    let utenteasseveratore;
    const cookiesfuidstd = event.cookies.get('session_id_std');
    const cookiesfuidass = event.cookies.get('session_id_ass');


        if (!(cookiesfuidstd || cookiesfuidass) && !(
            event.url.pathname==='/'|| 
            event.url.pathname.startsWith('/entiipa')|| 
            event.url.pathname.includes('/io')|| 
            event.url.pathname.includes('/opendata') 
        //!unProtectedRoutes.includes(event.url.pathname)
        ) ) {
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

            if (!(
                event.url.pathname==='/'|| 
                event.url.pathname.startsWith('/entiipa')|| 
                event.url.pathname.includes('/io')|| 
                event.url.pathname.includes('/opendata') 
            //!unProtectedRoutes.includes(event.url.pathname)
            )) {
                throw redirect(303, '/io');
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

/*
export async function handleFetch({ event, request, fetch }) {
    console.log("Aaaa");
    const cookiesfuidstd = event.cookies.get('session_id_std');
    if (cookiesfuidstd) {
        let u = getUserBySessionid(cookiesfuidstd, 'standard');
        if (u) {
            console.log("b");
                request.headers.set('Authorization', 'Bearer ' + u.token);
            
        }
    }

    
    return fetch(request);
}
*/