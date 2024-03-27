export let tipologieOrder = [
    {
        "ordine": 100,
        "tipologia": "Comuni"
    },
    {
        "ordine": 110,
        "tipologia": "Scuole"
    },
    {
        "ordine": 120,
        "tipologia": "ASL"
    },
    {
        "ordine": 130,
        "tipologia": "Altri Enti"
    }
];

export let clusterOrder = [
    {
        "ordine": 100,
        "cluster": "<=500 posti letto"
    },
    {
        "ordine": 110,
        "cluster": "500< posti letto <=1000"
    },
    {
        "ordine": 120,
        "cluster": ">1000 posti letto"
    },
    {
        "ordine": 130,
        "cluster": "<=0.5mln as"
    },
    {
        "ordine": 140,
        "cluster": "0.5mln< as <=1mln"
    },
    {
        "ordine": 150,
        "cluster": ">1mln as"
    },
    {
        "ordine": 200,
        "cluster": "<=2.500 ab"
    },
    {
        "ordine": 210,
        "cluster": "2.500< ab <=5.000"
    },
    {
        "ordine": 220,
        "cluster": "5.000< ab <=20.000"
    },
    {
        "ordine": 230,
        "cluster": "20.000< ab <=50.000"
    },
    {
        "ordine": 240,
        "cluster": "50.000< ab <=100.000"
    },
    {
        "ordine": 250,
        "cluster": "100.000< ab <=250.000"
    },
    {
        "ordine": 260,
        "cluster": "ab >250.000"
    },
    {
        "ordine": 300,
        "cluster": "Scuole primo e secondo grado"
    },
    {
        "ordine": 310,
        "cluster": "Altre scuole"
    },
    {
        "ordine": 400,
        "cluster": "Unico"
    }
];


export const listino = [
    {
        beneficiari: 'Comuni',
        cluster: '<=2.500 ab',
        canone: 28902,
        servizi: [
            {
                unita: 'Servizio',
                valore: 12755,
                unita_minime: 1,
                unita_massime: 4
            }
        ]
    },
    {
        beneficiari: 'Comuni',
        cluster: '2.500< ab <=5.000',
        canone: 28902,
        servizi: [
            {
                unita: 'Servizio',
                valore: 12755,
                unita_minime: 1,
                unita_massime: 4
            }
        ]
    },
    {
        beneficiari: 'Comuni',
        cluster: '5.000< ab <=20.000',
        canone: 51654,
        servizi: [
            {
                unita: 'Servizio',
                valore: 25895,
                unita_minime: 1,
                unita_massime: 4
            }
        ]
    },
    {
        beneficiari: 'Comuni',
        cluster: '20.000< ab <=50.000',
        canone: 87682,
        servizi: [
            {
                unita: 'Servizio',
                valore: 38650,
                unita_minime: 1,
                unita_massime: 5
            }
        ]
    },
    {
        beneficiari: 'Comuni',
        cluster: '50.000< ab <=100.000',
        canone: 96260,
        servizi: [
            {
                unita: 'Servizio',
                valore: 38650,
                unita_minime: 1,
                unita_massime: 6
            }
        ]
    },
    {
        beneficiari: 'Comuni',
        cluster: '100.000< ab <=250.000',
        canone: 162545,
        servizi: [
            {
                unita: 'Servizio',
                valore: 58963,
                unita_minime: 1,
                unita_massime: 6
            }
        ]
    },
    {
        beneficiari: 'Comuni',
        cluster: 'ab >250.000',
        canone: 500243,
        servizi: [
            {
                unita: 'Servizio',
                valore: 77684,
                unita_minime: 1,
                unita_massime: 10
            }
        ]
    },
    {
        beneficiari: 'Scuole',
        cluster: 'Scuole primo e secondo grado',
        canone: 7301,
        servizi: [
            {
                unita: 'Servizio',
                valore: 0,
                unita_minime: 0,
                unita_massime: 0
            }
        ]
    },
    {
        beneficiari: 'Scuole',
        cluster: 'Altre scuole',
        canone: 7301,
        servizi: [
            {
                unita: 'Servizio',
                valore: 0,
                unita_minime: 0,
                unita_massime: 0
            }
        ]
    }
];

export const target = [
    {
        quarter: 'Q4-2024',
        giorno: '2024-09-30',
        valore: 6508,
        buffer: 100,
        quarter_prec: 'Q2-2024',
        targetPerTipologia: { Comuni: 6900, Scuole: 6000, 'Altre tipologie': 8 }
    },
    {
        quarter: 'Q2-2026',
        giorno: '2026-06-30',
        valore: 13015,
        buffer: 100,
        quarter_prec: 'Q1-2026',
        targetPerTipologia: { Comuni: 6600, Scuole: 6750, 'Altre tipologie': 8 }
    }
];