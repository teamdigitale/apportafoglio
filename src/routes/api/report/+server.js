
import jsforce from 'jsforce';

/** @type {import('../$types').RequestHandler} */
export async function GET({ params, locals }) {

    const id = params.id;
    let res;
    const connstandard = locals.user.connectionStandard;
    const connasseveratore = locals.user.connectionAsseveratore;
    const connection = connstandard?connstandard:connasseveratore;

    if (connection) {
        let conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connection
        });
        let headers = {
            'Authorization': 'Bearer ' + conn.accessToken
        }
        let options = {
            method: 'GET',
            headers: headers,
        }
        res = await fetch(decodeURIComponent("https://padigitale2026.my.salesforce.com/services/data/v58.0/analytics/reports/00O7Q000008du0VUAQ?allData=true&includeDetails=true"), options);
    }
    let f = await res?.json();


    return new Response(
        f,
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
}