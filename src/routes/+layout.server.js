import jsforce from 'jsforce';
import { run } from 'node:test';
import { caricaMisure } from '../logic/misure';

export async function load({locals, cookies}) {

    const cookiesrunas = cookies.get('runas');

    return{
        loggedstandard: locals.user.loggedstandard,
        loggedasseveratore: locals.user.loggedasseveratore,
        userstandard: locals.user.userstandard, 
        userasseveratore: locals.user.userasseveratore,
        originaluserstandard: locals.user.originaluserstandard,
        runas: cookiesrunas
    }
}

