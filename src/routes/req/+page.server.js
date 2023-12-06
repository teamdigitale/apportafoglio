import { get } from 'svelte/store';
import { getUserBySessionid } from '../../lib/userdb';
import jsforce from 'jsforce';
import { caricaScadenze } from '../../logic/requirements';

export async function load({ cookies }) {

    let result = [];
    const iduserstd = getIdStandard(cookies);
    if (iduserstd && iduserstd.length > 0) {
        const utentestandard = getUserBySessionid( cookies.get('session_id_std'), 'standard');
        if (utentestandard) {
            let conn = new jsforce.Connection({
                loginUrl: "https://login.salesforce.com"
            });
            await conn.login(utentestandard.email, utentestandard.password + utentestandard.token);
            result = await caricaScadenze(conn);
            //await conn.logout();
        } 
    } 

    return {
        reqs: result,
        tipireq: get(tipireq)  
    };
}



function getIdStandard(cookies) {
    const cookiesfuidstd = cookies.get('session_id_std');
    if (cookiesfuidstd) {
        const utentestandard = getUserBySessionid(cookiesfuidstd, 'standard');
        if (utentestandard == null) {
            cookies.delete('session_id_std');
            return null;
        } else {
            return utentestandard.idutentesf
        }
    }else{
        cookies.delete('session_id_std');
        return null;
    }
}

function getIdAsseveratore(cookies) {
    const cookiesfuidass = cookies.get('session_id_ass');
    if (cookiesfuidass) {
        const utenteasseveratore = getUserBySessionid(cookiesfuidass, 'asseveratore');
        if (utenteasseveratore == null) {
            cookies.delete('session_id_ass');
            return null;
        } else {
            return utenteasseveratore.idutentesf
        }
    }else{
        cookies.delete('session_id_ass');
        return null;
    }
}
