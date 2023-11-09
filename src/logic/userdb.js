import { writable } from 'svelte/store';


export const standardusers = writable([]);
export const asseveratoreusers = writable([]);
export const runas = writable('');


export const getUtenteStandard = (cookies) => {
    const cookiesfuidstd = cookies.get('session_id_std');
    const cookiesrunas = cookies.get('runas');
    const cookiesorigrunas = cookies.get('origrunas');
    if (cookiesfuidstd) {
        const utentestandard = getUserBySessionid(cookiesfuidstd, 'standard');
        if (utentestandard == null) {
            cookies.delete('session_id_std');
            return null;
        } else {
            if(cookiesrunas&&cookiesrunas!=''&&cookiesrunas.value!=''){
                utentestandard.idutentesf = cookiesrunas;
            }else{
                if(cookiesorigrunas&&cookiesorigrunas!=''&&cookiesorigrunas.value!=''){
                    utentestandard.idutentesf = cookiesorigrunas;
                }
            }
            return utentestandard;
        }
    } else {
        return null;
    }
}

export const getUtenteAsseveratore = (cookies) => {
    const cookiesfuidass = cookies.get('session_id_ass');
    if (cookiesfuidass) {
        const utenteasseveratore = getUserBySessionid(cookiesfuidass, 'asseveratore');
        if (utenteasseveratore == null) {
            cookies.delete('session_id_ass');
            return null;
        } else {
            return utenteasseveratore;
        }
    } else {
        return null;
    }
}

export const getIdStandard = (cookies) => {
    const cookiesfuidstd = cookies.get('session_id_std');
    const cookiesrunas = cookies.get('runas');
    const cookiesorigrunas = cookies.get('origrunas');
    if (cookiesfuidstd) {
        const utentestandard = getUserBySessionid(cookiesfuidstd, 'standard');
        if (utentestandard == null) {
            cookies.delete('session_id_std');
            return null;
        } else {
            if(cookiesrunas&&cookiesrunas!=''&&cookiesrunas.value!=''){
                utentestandard.idutentesf = cookiesrunas;
            }else{
                if(cookiesorigrunas&&cookiesorigrunas!=''&&cookiesorigrunas.value!=''){
                    utentestandard.idutentesf = cookiesorigrunas;
                }
            }
            return utentestandard.idutentesf;
        }
    }
}

export const getIdAsseveratore = (cookies) => {
    const cookiesfuidass = cookies.get('session_id_ass');
    if (cookiesfuidass) {
        const utenteasseveratore = getUserBySessionid(cookiesfuidass, 'asseveratore');
        if (utenteasseveratore == null) {
            cookies.delete('session_id_ass');
            return null;
        } else {
            return utenteasseveratore.idutentesf;
        }
    }
}

export const getUserBySessionid = (session_id, tipoUtente) => {
    //console.log('Looking for user in database: ' + session_id);
    let existingUser;
    if (tipoUtente === 'standard') {
        standardusers.subscribe((value) => {
            if (value) {
                existingUser = value.find((item) => item.session_id === session_id);
            }
        });
    } else {
        asseveratoreusers.subscribe((value) => {
            if (value) {
                existingUser = value.find((item) => item.session_id === session_id);
            }
        });

    }
    if (!existingUser) return null;
    
    return existingUser;
};

export const createUser = (session_id, email, password, token, tipoUtente, idutentesf, sfuser) => {
    //console.log('Creating new user with id: ' + session_id);

    if (!getUserBySessionid(session_id, tipoUtente)) {
        if (tipoUtente === 'standard') {
            standardusers.update((u) => [...u, { session_id, email, password, token, tipoUtente, idutentesf, sfuser }]);
        } else {
            asseveratoreusers.update((u) => [...u, { session_id, email, password, token, tipoUtente, idutentesf, sfuser }]);
        }

    }
};

export const deleteUser = (session_id, tipoUtente) => {
    //console.log('Deleting user with id: ' + session_id);
    if (getUserBySessionid(session_id, tipoUtente)) {
        if (tipoUtente === 'standard') {
            standardusers.update((u) => u.filter((u) => u.session_id !== session_id));
        } else {
            asseveratoreusers.update((u) => u.filter((u) => u.session_id !== session_id));
        }

    }
};






