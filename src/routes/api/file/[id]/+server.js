
import jsforce from 'jsforce';
import { getFile } from '../../../../logic/files';
import { getUtenteStandard } from '../../../../lib/userdb';


/** @type {import('../$types').RequestHandler} */
export async function GET({ params,cookies }) {
    //0697Q0000061rYDQAY
    const id = params.id;
    
    let f;
    let res;
    const ustd = getUtenteStandard(cookies);
    if (ustd) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        await conn.login(ustd.email, ustd.password + ustd.token);

    
        f = await getFile(conn, id);
        if(f.length==1){
            let headers = {
                'Authorization': 'Bearer ' + conn.accessToken,
                'Content-Type': 'blob',
              }
              let options = {
                method: 'GET',
                headers: headers,
              }
               res = await fetch(conn.instanceUrl + f[0].VersionData, options);
              
        }
    
        //await conn.logout();
        
    }
    return new Response(
        await res.blob(),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition':
                    // Use filename* instead of filename to support non-ASCII characters
                    `attachment; filename*=UTF-8''${encodeURIComponent(id)}.`+f[0].FileExtension,
            },
        }
    );
    
    
}