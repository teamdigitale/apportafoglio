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


export const statusProgettoIndex = {
    DA_AVVIARE: 1,
    AVVIATO: 2,
    COMPLETATO: 3,
    IN_VERIFICA_TECNICA: 4,
    IN_VERIFICA_FORMALE: 5,
    IN_LIQUIDAZIONE: 6,
    LIQUIDATO: 7
};

export const statusProgettoColor = {
    DA_AVVIARE: "#dce9f5",
    AVVIATO: "#93c4f5",
    COMPLETATO: "#06c",
    IN_VERIFICA_TECNICA: "#f5ce93",
    IN_VERIFICA_FORMALE: "#d68d20",
    IN_LIQUIDAZIONE: "#12b57c",
    LIQUIDATO: "#278262"
};




const orderedTipologie = [["ALTRI ENTI", 130],
["SCUOLE", 90],
["COMUNI", 50],
["PROVINCE", 40],
["ISTITUTI DI RICERCA E AFAM", 100],
["PA CENTRALI", 10],
["AZIENDE PUBBLICHE DI SERVIZI ALLA PERSONA", 110],
["ASL", 60],
["UNIVERSITÀ", 80],
["ENTI REGIONALI", 20],
["ISTITUTI ZOOPROFILATTICI SPERIMENTALI", 70],
["AOO", 120],
["PROVINCE AUTONOME", 30]];

export const orderEnti = (a,b) => {
    return (orderedTipologie.find(ot => ot[0]===a.toUpperCase())[1]-orderedTipologie.find(ot => ot[0]===b.toUpperCase())[1]);
}
