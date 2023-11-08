//SELECT VersionDataUrl,FileExtension,FileType FROM ContentVersion WHERE (ContentDocumentId = '0697Q0000061rYDQAY' or ContentDocumentId = '0697Q0000061rYDQAY') AND IsLatest = true

export async function getFile(conn, id) {
    let bytes;
    const files = [];
    if (id) {
        let soqlfiles = `SELECT VersionData,FileExtension,FileType FROM ContentVersion WHERE ContentDocumentId = '`+id+`' AND IsLatest = true`;
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
