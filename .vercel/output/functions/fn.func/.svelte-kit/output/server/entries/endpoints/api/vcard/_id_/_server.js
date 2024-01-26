import { p as promiseQuery } from "../../../../../chunks/index2.js";
import jsforce from "jsforce";
let vcard;
let contact;
async function GET({ params, locals }) {
  const id = params.id;
  const connstandard = locals.user.connectionStandard;
  const connasseveratore = locals.user.connectionAsseveratore;
  const connection = connstandard ? connstandard : connasseveratore;
  if (connection) {
    let conn = new jsforce.Connection({
      instanceUrl: "https://padigitale2026.my.salesforce.com",
      accessToken: connection
    });
    const c = await promiseQuery(conn, `select FirstName, LastName, MobilePhone, Phone,  Account.Name, Email, PEC__c, Title, Salutation, Name from contact where id = '` + id + `'`);
    contact = c[0];
    vcard = `BEGIN:VCARD
VERSION:4.0
FN:` + contact.Name + `
N:` + contact.FirstName + `;` + contact.las + `;;;ing. jr,M.Sc.
ORG:` + contact.Account.Name + `
TEL;TYPE=cell:` + (contact.MobilePhone ? contact.MobilePhone : "") + `
EMAIL;TYPE=work:` + (contact.Email ? contact.Email : "") + `
END:VCARD`;
  }
  return new Response(
    vcard,
    {
      status: 200,
      headers: {
        "Content-Type": "text/vcard",
        "Content-Disposition": `attachment; filename*=UTF-8''` + contact.Name + `.vcf`
      }
    }
  );
}
export {
  GET
};
