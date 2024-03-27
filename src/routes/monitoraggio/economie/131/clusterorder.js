export let tipologieOrder = [
    {
        "ordine": 100,
        "tipologia": "Comuni"
    },
    {
        "ordine": 105,
        "tipologia": "Enti regionali"
    },
    {
        "ordine": 107,
        "tipologia": "Università"
    },
    {
        "ordine": 108,
        "tipologia": "Istituti di ricerca e AFAM"
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
    ,
    {
        "ordine": 500,
        "cluster": "<=1000 iscritti"
    }

    ,
    {
        "ordine": 510,
        "cluster": "1000< iscritti <=10000"
    }

    ,
    {
        "ordine": 520,
        "cluster": "10000< iscritti <=20000"
    }

    ,
    {
        "ordine": 530,
        "cluster": "20000< iscritti <= 40000"
    }

    ,
    {
        "ordine": 530,
        "cluster": ">40000 iscritti"
    }




];


export const listino = [
    {
        beneficiari: 'Comuni',
        cluster: '<=2.500 ab',
        canone: 10171.75,
        servizi: [
            {
                unita: 'Servizio',
                valore: 0,
                unita_minime: 1,
                unita_massime: 5
            }
        ]
    },
    {
        beneficiari: 'Comuni',
        cluster: '2.500< ab <=5.000',
        canone: 10171.75,
        servizi: [
            {
                unita: 'Servizio',
                valore: 12755,
                unita_minime: 1,
                unita_massime: 5
            }
        ]
    },
    {
        beneficiari: 'Comuni',
        cluster: '5.000< ab <=20.000',
        canone: 203434.50,
        servizi: [
            {
                unita: 'Servizio',
                valore: 0,
                unita_minime: 2,
                unita_massime: 5
            }
        ]
    },
    {
        beneficiari: 'Comuni',
        cluster: '20.000< ab <=50.000',
        canone: 30515.25,
        servizi: [
            {
                unita: 'Servizio',
                valore: 0,
                unita_minime: 3,
                unita_massime: 5
            }
        ]
    },
    {
        beneficiari: 'Comuni',
        cluster: '50.000< ab <=100.000',
        canone: 162748,
        servizi: [
            {
                unita: 'Servizio',
                valore: 0,
                unita_minime: 4,
                unita_massime: 10
            }
        ]
    },
    {
        beneficiari: 'Comuni',
        cluster: '100.000< ab <=250.000',
        canone: 203435,
        servizi: [
            {
                unita: 'Servizio',
                valore: 0,
                unita_minime: 5,
                unita_massime: 10
            }
        ]
    },
    {
        beneficiari: 'Comuni',
        cluster: 'ab >250.000',
        canone: 474775.20,
        servizi: [
            {
                unita: 'Servizio',
                valore: 0,
                unita_minime: 6,
                unita_massime: 12
            }
        ]
    },
    {
        beneficiari: 'Enti regionali',
        cluster: 'Unico',
        canone: 0,
        servizi: [
            {
                unita: 'Pacchetto S',
                valore: 791292,
                unita_minime: 1,
                unita_massime: 1
            },
            {
                unita: 'Pacchetto M',
                valore: 1582584,
                unita_minime: 1,
                unita_massime: 1
            },
            {
                unita: 'Pacchetto L',
                valore: 2373876,
                unita_minime: 1,
                unita_massime: 1
            }
        ]
    },
    {
        beneficiari: 'Università',
        cluster: '<=1000 iscritti',
        canone: 71885.45,
        servizi: [
            {
                unita: 'Servizio',
                valore: 0,
                unita_minime: 7,
                unita_massime: 999999
            }
        ]
    },
    {
        beneficiari: 'Università',
        cluster: '1000< iscritti <=10000',
        canone: 82154.8,
        servizi: [
            {
                unita: 'Servizio',
                valore: 0,
                unita_minime: 8,
                unita_massime: 999999
            }
        ]
    },
    {
        beneficiari: 'Università',
        cluster: '10000< iscritti <=20000',
        canone: 321958,
        servizi: [
            {
                unita: 'Servizio',
                valore: 0,
                unita_minime: 8,
                unita_massime: 999999
            }
        ]
    },
    {
        beneficiari: 'Università',
        cluster: '20000< iscritti <= 40000',
        canone: 362202.75,
        servizi: [
            {
                unita: 'Servizio',
                valore: 0,
                unita_minime: 9,
                unita_massime: 999999
            }
        ]
    },
    {
        beneficiari: 'Università',
        cluster: '>40000 iscritti',
        canone: 704421.9,
        servizi: [
            {
                unita: 'Servizio',
                valore: 0,
                unita_minime: 9,
                unita_massime: 999999
            }
        ]
    }


    ,
    {
        beneficiari: 'Istituti di ricerca e AFAM',
        cluster: '<=1000 iscritti',
        canone: 71885.45,
        servizi: [
            {
                unita: 'Servizio',
                valore: 0,
                unita_minime: 7,
                unita_massime: 999999
            }
        ]
    },
    {
        beneficiari: 'Istituti di ricerca e AFAM',
        cluster: '1000< iscritti <=10000',
        canone: 82154.8,
        servizi: [
            {
                unita: 'Servizio',
                valore: 0,
                unita_minime: 8,
                unita_massime: 999999
            }
        ]
    },
    {
        beneficiari: 'Istituti di ricerca e AFAM',
        cluster: '10000< iscritti <=20000',
        canone: 321958,
        servizi: [
            {
                unita: 'Servizio',
                valore: 0,
                unita_minime: 8,
                unita_massime: 999999
            }
        ]
    },
    {
        beneficiari: 'Istituti di ricerca e AFAM',
        cluster: '20000< iscritti <= 40000',
        canone: 362202.75,
        servizi: [
            {
                unita: 'Servizio',
                valore: 0,
                unita_minime: 9,
                unita_massime: 999999
            }
        ]
    },
    {
        beneficiari: 'Istituti di ricerca e AFAM',
        cluster: '>40000 iscritti',
        canone: 704421.9,
        servizi: [
            {
                unita: 'Servizio',
                valore: 0,
                unita_minime: 9,
                unita_massime: 999999
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