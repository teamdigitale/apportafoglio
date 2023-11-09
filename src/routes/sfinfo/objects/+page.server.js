import jsforce from 'jsforce';

export async function load() {


    const conn = new jsforce.Connection({
        loginUrl: "https://login.salesforce.com"
    });
    await conn.login("fausto.mancini@padigitale2026.com", "Raffaella$123Ei3SVa6MQiC2fnTQMNuW0QAo");

    let headers = {
        'Authorization': 'Bearer ' + conn.accessToken,
    }
    let options = {
        method: 'GET',
        headers: headers,
    }

    //versions
    let res = await fetch(conn.instanceUrl + '/services/data/', options);
    const versions = await res.json();
    //console.log("Available versions: " + versions.length + " - Using last version: " + versions[versions.length - 1].version);
    const version = versions[versions.length - 1].url;
    const baseurl = conn.instanceUrl + version;
    res = await fetch(baseurl + '/sobjects', options);
    const sobjects = await res.json();
    await conn.logout();

    return {
        sobjects: sobjects
    };
}
