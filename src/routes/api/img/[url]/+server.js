
import { resolveObjectURL } from 'buffer';
import jsforce from 'jsforce';
import { getUtenteAsseveratore, getUtenteStandard } from '../../../../lib/userdb';


/** @type {import('../$types').RequestHandler} */
export async function GET({ params, cookies }) {
    //0697Q0000061rYDQAY
    const id = params.id;


    let res;
    const ustd = getUtenteStandard(cookies);
    const uass = getUtenteAsseveratore(cookies);
    const u = ustd ? ustd : uass;
    if (u) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        await conn.login(u.email, u.password + u.token);

            let headers = {
                'Authorization': 'Bearer ' + conn.accessToken,
                'Content-Type': 'blob',
            }
            let options = {
                method: 'GET',
                headers: headers,
            }
            res = await fetch(decodeURIComponent(params.url), options);


        await conn.logout();

    }
    let f = await res?.blob();
    
    //return "data:" + blob.type + ';base64,' + buffer.toString('base64');
    return new Response(
        f,
        {
            status: 200,
            headers: {
                'Content-Type': 'image/jpeg',
            },
        }
    );



}