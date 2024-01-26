import jsforce from "jsforce";
async function GET({ params, locals }) {
  params.id;
  let res;
  const connstandard = locals.user.connectionStandard;
  const connasseveratore = locals.user.connectionAsseveratore;
  const connection = connstandard ? connstandard : connasseveratore;
  if (connection) {
    let conn = new jsforce.Connection({
      instanceUrl: "https://padigitale2026.my.salesforce.com",
      accessToken: connection
    });
    let headers = {
      "Authorization": "Bearer " + conn.accessToken,
      "Content-Type": "blob"
    };
    let options = {
      method: "GET",
      headers
    };
    res = await fetch(decodeURIComponent(params.url), options);
  }
  let f = await res?.blob();
  return new Response(
    f,
    {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg"
      }
    }
  );
}
export {
  GET
};
