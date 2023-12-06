
import jsforce from 'jsforce';
import { getFile } from '../../../../logic/files';


/** @type {import('../$types').RequestHandler} */
export async function GET({ params,locals }) {
    const id = params.id;
    
    let f;
    let res;
    const connstandard = locals.user.connectionStandard;
    const connasseveratore = locals.user.connectionAsseveratore;
    const connection = connstandard?connstandard:connasseveratore;

    if (connection) {
        let conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connection
        });

    
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
    }
    return new Response(
        await res.blob(),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition':
                    `attachment; filename*=UTF-8''${encodeURIComponent(id)}.`+f[0].FileExtension,
            },
        }
    );
    
    
}