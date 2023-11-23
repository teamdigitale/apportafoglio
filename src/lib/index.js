// place files you want to import through the `$lib` alias in this folder.

export const promiseQuery = (conn, q,MAX_FETCH) => {
    return new Promise((resolve, reject) => {
        const records = [];
        conn.query(q)
            .on("record", function (record) {
                records.push(record);
            })
            .on("end", function () {
                resolve(records);
            })
            .on("error", function (err) {
                console.error(err);
                reject([]);
            })
            .run({ autoFetch: true, maxFetch: MAX_FETCH });
    });
}