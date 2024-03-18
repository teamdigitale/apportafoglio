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
        canone: 6000,
        servizi: [
            {
                unita: 'Trasferimento servizio',
                valore: 1528.0,
                unita_minime: 7,
                unita_massime: 9
            },
            {
                unita: 'Aggiornamento servizio',
                valore: 4603.0,
                unita_minime: 7,
                unita_massime: 9
            }
        ]
    },
    {
        beneficiari: 'Comuni',
        cluster: '2.500< ab <=5.000',
        canone: 12000,
        servizi: [
            {
                unita: 'Trasferimento servizio',
                valore: 2352.0,
                unita_minime: 10,
                unita_massime: 13
            },
            {
                unita: 'Aggiornamento servizio',
                valore: 5069.0,
                unita_minime: 10,
                unita_massime: 13
            }
        ]
    },
    {
        beneficiari: 'Comuni',
        cluster: '5.000< ab <=20.000',
        canone: 25000,
        servizi: [
            {
                unita: 'Trasferimento servizio',
                valore: 4146.0,
                unita_minime: 11,
                unita_massime: 14
            },
            {
                unita: 'Aggiornamento servizio',
                valore: 6928.0,
                unita_minime: 11,
                unita_massime: 14
            }
        ]
    },
    {
        beneficiari: 'Comuni',
        cluster: '20.000< ab <=50.000',
        canone: 50000,
        servizi: [
            {
                unita: 'Trasferimento servizio',
                valore: 9143.0,
                unita_minime: 11,
                unita_massime: 14
            },
            {
                unita: 'Aggiornamento servizio',
                valore: 14437.0,
                unita_minime: 11,
                unita_massime: 14
            }
        ]
    },
    {
        beneficiari: 'Comuni',
        cluster: '50.000< ab <=100.000',
        canone: 120000,
        servizi: [
            {
                unita: 'Trasferimento servizio',
                valore: 14254.0,
                unita_minime: 14,
                unita_massime: 18
            },
            {
                unita: 'Aggiornamento servizio',
                valore: 16618.0,
                unita_minime: 14,
                unita_massime: 18
            }
        ]
    },
    {
        beneficiari: 'Comuni',
        cluster: '100.000< ab <=250.000',
        canone: 450000,
        servizi: [
            {
                unita: 'Trasferimento servizio',
                valore: 15394.0,
                unita_minime: 17,
                unita_massime: 21
            },
            {
                unita: 'Aggiornamento servizio',
                valore: 27694.0,
                unita_minime: 17,
                unita_massime: 21
            }
        ]
    },
    {
        beneficiari: 'Comuni',
        cluster: 'ab >250.000',
        canone: 3500000,
        servizi: [
            {
                unita: 'Trasferimento servizio',
                valore: 46634.0,
                unita_minime: 17,
                unita_massime: 21
            },
            {
                unita: 'Aggiornamento servizio',
                valore: 75816.0,
                unita_minime: 17,
                unita_massime: 21
            }
        ]
    },
    {
        beneficiari: 'Scuole',
        cluster: 'Scuole primo e secondo grado',
        canone: 0,
        servizi: [
            {
                unita: 'Trasferimento servizio',
                valore: 553.0,
                unita_minime: 1,
                unita_massime: 23
            },
            {
                unita: 'Aggiornamento servizio',
                valore: 553.0,
                unita_minime: 1,
                unita_massime: 23
            }
        ]
    },
    {
        beneficiari: 'Scuole',
        cluster: 'Altre scuole',
        canone: 0,
        servizi: [
            {
                unita: 'Trasferimento servizio',
                valore: 553.0,
                unita_minime: 1,
                unita_massime: 23
            },
            {
                unita: 'Aggiornamento servizio',
                valore: 553.0,
                unita_minime: 1,
                unita_massime: 23
            }
        ]
    },
    {
        beneficiari: 'ASL',
        cluster: '<=500 posti letto',
        canone: 0,
        servizi: [
            {
                unita: 'Servizio ordinario',
                valore: 19628.0,
                unita_minime: 3,
                unita_massime: 15
            },
            {
                unita: 'Servizio critico',
                valore: 25517.0,
                unita_minime: 3,
                unita_massime: 26
            }
        ]
    },
    {
        beneficiari: 'ASL',
        cluster: '500< posti letto <=1000',
        canone: 0,
        servizi: [
            {
                unita: 'Servizio ordinario',
                valore: 58885.0,
                unita_minime: 3,
                unita_massime: 15
            },
            {
                unita: 'Servizio critico',
                valore: 76550.0,
                unita_minime: 3,
                unita_massime: 26
            }
        ]
    },
    {
        beneficiari: 'ASL',
        cluster: '>1000 posti letto',
        canone: 0,
        servizi: [
            {
                unita: 'Servizio ordinario',
                valore: 94215.0,
                unita_minime: 3,
                unita_massime: 15
            },
            {
                unita: 'Servizio critico',
                valore: 122480.0,
                unita_minime: 3,
                unita_massime: 26
            }
        ]
    },
    {
        beneficiari: 'ASL',
        cluster: '<=0.5mln as',
        canone: 0,
        servizi: [
            {
                unita: 'Servizio ordinario',
                valore: 34050.0,
                unita_minime: 3,
                unita_massime: 15
            },
            {
                unita: 'Servizio critico',
                valore: 44265.0,
                unita_minime: 3,
                unita_massime: 26
            }
        ]
    },
    {
        beneficiari: 'ASL',
        cluster: '0.5mln< as <=1mln',
        canone: 0,
        servizi: [
            {
                unita: 'Servizio ordinario',
                valore: 102150.0,
                unita_minime: 3,
                unita_massime: 15
            },
            {
                unita: 'Servizio critico',
                valore: 132795.0,
                unita_minime: 3,
                unita_massime: 26
            }
        ]
    },
    {
        beneficiari: 'ASL',
        cluster: '>1mln as',
        canone: 0,
        servizi: [
            {
                unita: 'Servizio ordinario',
                valore: 163440.0,
                unita_minime: 3,
                unita_massime: 15
            },
            {
                unita: 'Servizio critico',
                valore: 212472.0,
                unita_minime: 3,
                unita_massime: 26
            }
        ]
    }
];

export const target = [
    {
        quarter: 'Q3-2024',
        giorno: '2024-09-30',
        valore: 4083,
        buffer: 100,
        quarter_prec: 'Q2-2024',
        targetPerTipologia: { Comuni: 6900, Scuole: 6000, 'Altre tipologie': 67 }
    },
    {
        quarter: 'Q2-2026',
        giorno: '2026-06-30',
        valore: 12464,
        buffer: 100,
        quarter_prec: 'Q1-2026',
        targetPerTipologia: { Comuni: 6900, Scuole: 6000, 'Altre tipologie': 67 }
    }
];