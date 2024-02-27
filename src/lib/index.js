// place files you want to import through the `$lib` alias in this folder.

export const promiseQuery = (conn, q, MAX_FETCH) => {
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

export const statusIndex = {
    PREBOZZA: 9,
    BOZZA: 10,
    CONCLUSA: 11,
    IN_VERIFICA: 15,
    AMMESSA: 12,
    NON_AMMESSA: 1,
    ACCETTATA: 13,
    NON_ACCETTATA: 2,
    FINANZIATA: 14,
    NON_FINANZIATA: 3,
    ANNULLATA: 4,
    RINUNCIATA: 5,
    REVOCATA: 6,
    SCADUTA: 7,
    RITIRATA: 8
};

export const statusColor = {
    PREBOZZA: "#d9dadb",
    BOZZA: "#adb2b8",
    CONCLUSA: "#768594",
    IN_VERIFICA: "#f90",
    AMMESSA: "#bfffe9",
    NON_AMMESSA: "#f5d0d6",
    ACCETTATA: "#6aebbd",
    NON_ACCETTATA: "#eba4af",
    FINANZIATA: "#006642",
    NON_FINANZIATA: "#e07b8b",
    ANNULLATA: "#d65669",
    RINUNCIATA: "#cc334a",
    REVOCATA: "#b32d41",
    SCADUTA: "#992637",
    RITIRATA: "#80202e"
};
