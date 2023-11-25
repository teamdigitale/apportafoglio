import jsforce from 'jsforce';
import { caricaMisure } from '../logic/misure';

export async function load({locals, cookies}) {

    const cookiesrunas = cookies.get('runas');
    const cookiesfuidstd = cookies.get('session_id_std');
    const cookiesfuidass = cookies.get('session_id_ass');

    return{
        loggedstandard: locals.user.loggedstandard || cookiesfuidstd?true:false,
        loggedasseveratore: locals.user.loggedasseveratore || cookiesfuidass?true:false,
        userstandard: locals.user.userstandard, 
        userasseveratore: locals.user.userasseveratore,
        originaluserstandard: locals.user.originaluserstandard,
        runas: cookiesrunas
    }
}

