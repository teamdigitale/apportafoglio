import jsforce from "jsforce";
async function GET({ params, locals }) {
  const id = params.id;
  let f;
  let res;
  const connstandard = locals.user.connectionStandard;
  const connasseveratore = locals.user.connectionAsseveratore;
  const connection = connstandard ? connstandard : connasseveratore;
  if (connection) {
    let conn = new jsforce.Connection({
      instanceUrl: "https://padigitale2026.my.salesforce.com",
      accessToken: connection
    });
    f = await getFile(conn, id);
    if (f.length == 1) {
      let headers = {
        "Authorization": "Bearer " + conn.accessToken,
        "Content-Type": "blob"
      };
      let options = {
        method: "GET",
        headers
      };
      res = await fetch(conn.instanceUrl + f[0].VersionData, options);
    }
  }
  return new Response(
    await res.blob(),
    {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(id)}.` + f[0].FileExtension
      }
    }
  );
}
async function getFile(conn, id) {
  const files = [];
  if (id) {
    let soqlfiles = `SELECT VersionData,FileExtension,FileType FROM ContentVersion WHERE ContentDocumentId = '` + id + `' AND IsLatest = true`;
    let result_ = await conn.query(soqlfiles);
    files.push(...result_.records);
    let more = !result_.done;
    while (more) {
      if (result_.nextRecordsUrl) {
        result_ = await conn.queryMore(result_.nextRecordsUrl);
        files.push(...result_.records);
        more = !result_.done;
      }
    }
  }
  return files;
}
export {
  GET
};
