import jsforce from 'jsforce';
import { getUtenteStandard, getUtenteAsseveratore } from '../../lib/userdb';
import { loadContatti, loadEventi } from './logic';

export async function load({ cookies }) {
    let contatti = [];
    let eventi = [];
    const ustd = getUtenteStandard(cookies);
    if (ustd) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        await conn.login(ustd.email, ustd.password + ustd.token);
        contatti = contatti.concat(await loadContatti(conn,ustd));
        eventi = eventi.concat(await loadEventi(conn,ustd));
        await conn.logout();
    }

    let r = [];
    contatti.forEach(c=>{
        r.push({
            CreatedDate: c.CreatedDate, 
            Account: {Name: c.Account.Name} ,
            Subject: c.Subject,
            Description: c.Description,
            Tipo: 'Contatto diretto'
        });
    });

    eventi.forEach(e=>{
        r.push({
            CreatedDate: e.CreatedDate, 
            Account: {Name: e.Account.Name} ,
            Subject: 'Riunione: '+e.Subject,
            Description: e.Subject,
            Tipo: 'Riunione'
        });
    });

    r = r.sort((a,b) => new Date(b.CreatedDate).getDate() - new Date(a.CreatedDate).getDate());

    return {
        contatti: r
    };
}
