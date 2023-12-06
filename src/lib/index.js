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

export const euro = (v) => {
    return Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
    }).format(v);
}

export const formatDate = (v) => {
    return new Intl.DateTimeFormat('it-IT').format(v);
}

export const percentuale = (v) => {
    const option = {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    };
    const formatter = new Intl.NumberFormat("it-IT", option);
    return formatter.format(v);
}
