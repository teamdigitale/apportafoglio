import jsforce from "jsforce";
import { p as promiseQuery } from "../../../../chunks/index2.js";
import { r as redirect } from "../../../../chunks/index.js";
const targets = [
  {
    id: "targetM1C1_139",
    misura: "1.2 Abilitazione e facilitazione migrazione al Cloud",
    tipologia_enti: [
      {
        tipo: "Comuni"
      },
      {
        tipo: "Scuole"
      },
      {
        tipo: "ASL"
      },
      {
        tipo: "AO"
      }
    ],
    valore_obiettivo: 4083,
    um_obiettivo: "numero",
    trimestre: "2024-Q3",
    data: "2024-09-30",
    descrizione: "Conteggio delle candidature 1.2 asseverate positivamente."
  },
  {
    id: "targetM1C1_147",
    misura: "1.2 Abilitazione e facilitazione migrazione al Cloud",
    tipologia_enti: [
      {
        tipo: "Comuni"
      },
      {
        tipo: "Scuole"
      },
      {
        tipo: "ASL"
      },
      {
        tipo: "AO"
      }
    ],
    valore_obiettivo: 12464,
    um_obiettivo: "numero",
    trimestre: "2026-Q2",
    data: "2026-06-30",
    descrizione: "Conteggio delle candidature 1.2 asseverate positivamente."
  },
  {
    id: "targetM1C1_140",
    misura: "1.4.1",
    tipologia_enti: [
      {
        tipo: "Comuni"
      },
      {
        tipo: "Scuole"
      }
    ],
    valore_obiettivo: 40,
    um_obiettivo: "percentuale",
    trimestre: "2024-Q4",
    data: "2024-12-31",
    descrizione: "Conteggio delle candidature 1.4.1 asseverate positivamente rispetto alla platea."
  },
  {
    id: "targetM1C1_148",
    misura: "1.4.1",
    tipologia_enti: [
      {
        tipo: "Comuni"
      },
      {
        tipo: "Scuole"
      }
    ],
    valore_obiettivo: 80,
    um_obiettivo: "percentuale",
    trimestre: "2026-Q2",
    data: "2026-06-30",
    descrizione: "Conteggio delle candidature 1.4.1 asseverate positivamente rispetto alla platea."
  },
  {
    misura: "1.4.3 - AppIO",
    tipologia_enti: [
      {
        tipo: "Comuni"
      },
      {
        tipo: "Scuole"
      },
      {
        tipo: "Enti regionali"
      },
      {
        tipo: "Università"
      },
      {
        tipo: "Istituti di ricerca e AFAM"
      }
    ],
    valore_obiettivo: 7e3,
    um_obiettivo: "numero",
    trimestre: "2023-Q4",
    data: "2023-12-31",
    descrizione: "ConteggiodegliEntichehannoattivatotuttiiloroserviziAppIOdopoil31/3/2021.Sediversidascuole,        sonodaconteggiaresolosehannoalmenounacandidaturaAppIOinstato'FINANZIATA'.Obiettivodaraggiungere: 4300.Corrispondealtargettotale(7000)menolabaseline(2700)costituitadagliEntichehannoanchesolounservizioattivatoprimadel1/4/2021.ConteggiodeiserviziattivatidagliEntiinbaselineedainuoviEnticonsideratisecondoicriterideltargetprecedente.Obiettivodaraggiungere: 10438.Corrispondeaiserviziattivatial1/4/21(8698)maggioratodel20%."
  },
  {
    misura: "1.4.3 - AppIO",
    tipologia_enti: [
      {
        tipo: "Comuni"
      },
      {
        tipo: "Scuole"
      },
      {
        tipo: "Enti regionali"
      },
      {
        tipo: "Università"
      },
      {
        tipo: "Istituti di ricerca e AFAM"
      }
    ],
    valore_obiettivo: 14100,
    um_obiettivo: "numero",
    trimestre: "2026-Q2",
    data: "2026-06-30",
    descrizione: "ConteggiodegliEntichehannoattivatotuttiiloroserviziAppIOdopoil31/3/2021.Sediversidascuole,        sonodaconteggiaresolosehannoalmenounacandidaturaAppIOinstato FINANZIATA.Obiettivodaraggiungere: 11400.Corrispondealtargettotale(14100)menolabaseline(2700)costituitadagliEntichehannoanchesolounservizioattivatoprimadel1/4/2021.ConteggiodeiserviziattivatidagliEntiinbaselineedainuoviEnticonsideratisecondoicriterideltargetprecedente.Obiettivodaraggiungere: 349360.Corrispondeallasommadeicalcoliprevistiperlemediecategoriali: 35serviziper7904Comuni+15serviziper21Entiregionali+15serviziper211ASL+8serviziper8365Scuole+8serviziper71Università+8serviziper219IstitutidiricercaeAFAM."
  },
  {
    misura: "1.4.3 - pagoPA",
    tipologia_enti: [
      {
        tipo: "Comuni"
      },
      {
        tipo: "Scuole"
      },
      {
        tipo: "Enti regionali"
      },
      {
        tipo: "Università"
      },
      {
        tipo: "Istituti di ricerca e AFAM"
      }
    ],
    valore_obiettivo: 11450,
    um_obiettivo: "numero",
    trimestre: "2023-Q4",
    data: "2023-12-31",
    descrizione: "ConteggiodegliEntichehannoattivatotuttiiloroserviziPagoPAdopoil31/3/2021.Sediversidascuole,        sonodaconteggiaresolosehannoalmenounacandidaturaAppIOinstatoFINANZIATA.Obiettivodaraggiungere: 2450.Corrispondealtargettotale(11450)menolabaseline(9000)costituitadagliEntichehannoanchesolounservizioattivatoprimadel1/4/2021.ConteggiodeiserviziattivatidagliEntiinbaselineedainuoviEnticonsideratisecondoicriterideltargetprecedente.Obiettivodaraggiungere: 30658.Corrispondeaiserviziattivatial1/4/21(25548)maggioratodel20%."
  },
  {
    misura: "1.4.3 - pagoPA",
    tipologia_enti: [
      {
        tipo: "Comuni"
      },
      {
        tipo: "Scuole"
      },
      {
        tipo: "Enti regionali"
      },
      {
        tipo: "Università"
      },
      {
        tipo: "Istituti di ricerca e AFAM"
      }
    ],
    valore_obiettivo: 14100,
    um_obiettivo: "numero",
    trimestre: "2026-Q3",
    data: "2026-06-30",
    descrizione: "ConteggiodegliEntichehannoattivatotuttiiloroserviziPagoPAdopoil31/3/2021.Sediversidascuole,        sonodaconteggiaresolosehannoalmenounacandidaturaAppIOinstatoFINANZIATA.Obiettivodaraggiungere: 5100.Corrispondealtargettotale(14100)menolabaseline(9000)costituitadagliEntichehannoanchesolounservizioattivatoprimadel1/4/2021.ConteggiodeiserviziattivatidagliEntiinbaselineedainuoviEnticonsideratisecondoicriterideltargetprecedente.Obiettivodaraggiungere: 349360.Corrispondeallasommadeicalcoliprevistiperlemediecategoriali: 35serviziper7904Comuni+15serviziper21Entiregionali+15serviziper211ASL+8serviziper8365Scuole+8serviziper71Università+8serviziper219IstitutidiricercaeAFAM."
  },
  {
    misura: "1.4.4",
    tipologia_enti: [
      {
        tipo: "Tutti"
      }
    ],
    valore_obiettivo: 16500,
    um_obiettivo: "numero",
    trimestre: "2026-Q1",
    data: "2026-03-31",
    descrizione: "ConteggiodegliEnticonattivazioneavvenutadiSPIDe/oCIE.Obiettivodaraggiungere: 16500."
  },
  {
    misura: "1.4.5",
    tipologia_enti: [
      {
        tipo: "Comuni"
      },
      {
        tipo: "PA Centrali"
      }
    ],
    valore_obiettivo: 800,
    um_obiettivo: "numero",
    trimestre: "2023-Q4",
    data: "2023-12-31",
    descrizione: "ConteggiodegliEntichehannoattivatoalmenounservizio1.4.5echehannocandidatura1.4.5instatoFINANZIATA."
  },
  {
    misura: "1.4.5",
    tipologia_enti: [
      {
        tipo: "Comuni"
      },
      {
        tipo: "PA Centrali"
      }
    ],
    valore_obiettivo: 6400,
    um_obiettivo: "numero",
    trimestre: "2026-Q2",
    data: "2026-06-30",
    descrizione: "ConteggiodegliEntichehannoattivatoalmenounservizio1.4.5echehannocandidatura1.4.5instatoFINANZIATA."
  },
  {
    misura: "1.3.1",
    tipologia_enti: [
      {
        tipo: "Comuni"
      },
      {
        tipo: "Scuole"
      },
      {
        tipo: "Enti regionali"
      },
      {
        tipo: "Università"
      },
      {
        tipo: "Istituti di ricerca e AFAM"
      }
    ],
    valore_obiettivo: 400,
    um_obiettivo: "numero",
    trimestre: "2024-Q4",
    data: "2024-12-31",
    descrizione: "Conteggiodeiservizi1.3.1(ovveroAPI)inseritiincandidatureasseveratepositivamente."
  },
  {
    misura: "1.3.1",
    tipologia_enti: [
      {
        tipo: "Comuni"
      },
      {
        tipo: "Scuole"
      },
      {
        tipo: "Enti regionali"
      },
      {
        tipo: "Università"
      },
      {
        tipo: "Istituti di ricerca e AFAM"
      }
    ],
    valore_obiettivo: 1e3,
    um_obiettivo: "numero",
    trimestre: "2026-Q2",
    data: "2026-06-30",
    descrizione: "Conteggiodeiservizi1.3.1(ovveroAPI)inseritiincandidatureasseveratepositivamente."
  }
];
const t = {
  targets
};
const MAX_FETCH = 1e6;
async function load({ locals }) {
  const connstandard = locals.user.connectionStandard;
  const connection = connstandard;
  if (connection) {
    const conn = new jsforce.Connection({
      instanceUrl: "https://padigitale2026.my.salesforce.com",
      accessToken: connection
    });
    let platee = await promiseQuery(conn, `select count(id) c, 
        Regione__c, Tipologia_Istat__c, Tipologia_Istat_eccezioni__c 
        from Account
        where Tipologia_Istat__c != ''
        group by Regione__c, Tipologia_Istat__c, Tipologia_Istat_eccezioni__c`, MAX_FETCH);
    platee = platee.map(
      (x) => {
        return { area: mapArea(x.Regione__c), regione: x.Regione__c, tipologia_ente: mapTipologiaEnte(x.Tipologia_Istat__c, x.Tipologia_Istat_eccezioni__c), c: x.c };
      }
    );
    platee = platee.reduce((r, { area, regione, tipologia_ente, c }) => {
      let temp = r.find((o) => o.area === area && o.regione === regione && o.tipologia_ente === tipologia_ente);
      if (temp) {
        temp.c += c;
      } else {
        r.push({ area, regione, tipologia_ente, c });
      }
      return r;
    }, []);
    const qtargetM1C1_139 = promiseQuery(conn, `select count(id) c, 
        outfunds__Applying_Organization__r.Regione__c, outfunds__Applying_Organization__r.Tipologia_Istat__c, outfunds__Applying_Organization__r.Tipologia_Istat_eccezioni__c 
        from outfunds__Funding_Request__c 
        where outfunds__Applying_Organization__r.Tipologia_Istat__c != ''
        and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '1.2 Abilitazione e facilitazione migrazione al Cloud'
        and outfunds__Status__c = 'FINANZIATA' and Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and Data_asseverazione_tecnica__c <= 2024-09-30T23:59:59Z
        group by outfunds__Applying_Organization__r.Regione__c, outfunds__Applying_Organization__r.Tipologia_Istat__c, outfunds__Applying_Organization__r.Tipologia_Istat_eccezioni__c`, MAX_FETCH);
    const qtargetM1C1_147 = promiseQuery(conn, `select count(id) c, 
        outfunds__Applying_Organization__r.Regione__c, outfunds__Applying_Organization__r.Tipologia_Istat__c, outfunds__Applying_Organization__r.Tipologia_Istat_eccezioni__c 
        from outfunds__Funding_Request__c 
        where outfunds__Applying_Organization__r.Tipologia_Istat__c != ''
        and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '1.2 Abilitazione e facilitazione migrazione al Cloud'
        and outfunds__Status__c = 'FINANZIATA' and Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and Data_asseverazione_tecnica__c <= 2026-06-30T23:59:59Z
        group by outfunds__Applying_Organization__r.Regione__c, outfunds__Applying_Organization__r.Tipologia_Istat__c, outfunds__Applying_Organization__r.Tipologia_Istat_eccezioni__c`, MAX_FETCH);
    const qtargetM1C1_140 = promiseQuery(conn, `select count(id) c, 
        outfunds__Applying_Organization__r.Regione__c, outfunds__Applying_Organization__r.Tipologia_Istat__c, outfunds__Applying_Organization__r.Tipologia_Istat_eccezioni__c 
        from outfunds__Funding_Request__c 
        where outfunds__Applying_Organization__r.Tipologia_Istat__c != ''
        and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '1.4.1 Esperienza del cittadino nei servizi pubblici'
        and outfunds__Status__c = 'FINANZIATA' and Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and Data_asseverazione_tecnica__c <= 2024-12-31T23:59:59Z
        group by outfunds__Applying_Organization__r.Regione__c, outfunds__Applying_Organization__r.Tipologia_Istat__c, outfunds__Applying_Organization__r.Tipologia_Istat_eccezioni__c`, MAX_FETCH);
    const qtargetM1C1_148 = promiseQuery(conn, `select count(id) c, 
        outfunds__Applying_Organization__r.Regione__c, outfunds__Applying_Organization__r.Tipologia_Istat__c, outfunds__Applying_Organization__r.Tipologia_Istat_eccezioni__c 
        from outfunds__Funding_Request__c 
        where outfunds__Applying_Organization__r.Tipologia_Istat__c != ''
        and outfunds__FundingProgram__r.outfunds__Parent_Funding_Program__r.Name = '1.4.1 Esperienza del cittadino nei servizi pubblici'
        and outfunds__Status__c = 'FINANZIATA' and Ultimo_Esito_Conformit_Tecnica__c = 'Positivo' and Data_asseverazione_tecnica__c <= 2026-06-30T23:59:59Z
        group by outfunds__Applying_Organization__r.Regione__c, outfunds__Applying_Organization__r.Tipologia_Istat__c, outfunds__Applying_Organization__r.Tipologia_Istat_eccezioni__c`, MAX_FETCH);
    const all = Promise.all([qtargetM1C1_139, qtargetM1C1_147, qtargetM1C1_140, qtargetM1C1_148]);
    const values = await all;
    for (let z = 0; z < values.length; z++) {
      values[z] = values[z].map(
        (x) => {
          return { area: mapArea(x.Regione__c), regione: x.Regione__c, tipologia_ente: mapTipologiaEnte(x.Tipologia_Istat__c, x.Tipologia_Istat_eccezioni__c), c: x.c };
        }
      );
      values[z] = values[z].reduce((r, { area, regione, tipologia_ente, c }) => {
        let temp = r.find((o) => o.area === area && o.regione === regione && o.tipologia_ente === tipologia_ente);
        if (temp) {
          temp.c += c;
        } else {
          r.push({ area, regione, tipologia_ente, c });
        }
        return r;
      }, []);
    }
    let targetM1C1_139 = values[0];
    let targetM1C1_147 = values[1];
    let targetM1C1_140 = values[2];
    let targetM1C1_148 = values[3];
    targetM1C1_139 = targetM1C1_139.filter((x) => x.tipologia_ente === "Comuni" || x.tipologia_ente === "Scuole" || x.tipologia_ente === "ASL");
    targetM1C1_139 = targetM1C1_147.filter((x) => x.tipologia_ente === "Comuni" || x.tipologia_ente === "Scuole" || x.tipologia_ente === "ASL");
    targetM1C1_140 = targetM1C1_140.filter((x) => x.tipologia_ente === "Comuni" || x.tipologia_ente === "Scuole");
    targetM1C1_148 = targetM1C1_148.filter((x) => x.tipologia_ente === "Comuni" || x.tipologia_ente === "Scuole");
    return {
      t,
      platee,
      targetM1C1_139,
      targetM1C1_147,
      targetM1C1_140,
      targetM1C1_148
    };
  } else {
    throw redirect(303, "/accesso");
  }
}
function mapArea(regione) {
  if (regione) {
    if (regione === "Abruzzo" || regione === "Basilicata" || regione === "Molise" || regione === "Puglia") {
      return "SUD EST";
    } else if (regione === "Campania" || regione === "Sicilia" || regione === "Calabria") {
      return "SUD OVEST";
    } else if (regione === "Lombardia") {
      return "LOMBARDIA";
    } else if (regione === "Emilia-Romagna" || regione === "Veneto" || regione === "Friuli-Venezia Giulia" || regione === "Trentino-Alto Adige/Südtirol") {
      return "NORD EST";
    } else if (regione === "Liguria" || regione === "Piemonte" || regione === "Valle d'Aosta/Vallée d'Aoste") {
      return "NORD OVEST";
    } else if (regione === "Lazio" || regione === "Toscana" || regione === "Umbria" || regione === "Marche" || regione === "Sardegna") {
      return "CENTRO";
    }
  }
}
function mapTipologiaEnte(ti, tie) {
  let t2 = tie ? tie : ti;
  if (t2.toUpperCase() === "Comune".toUpperCase())
    t2 = "Comuni";
  else if (t2.toUpperCase() === "Agenzie Regionali Sanitarie".toUpperCase())
    t2 = "ASL";
  else if (t2.toUpperCase() === "Aziende Sanitarie Locali".toUpperCase())
    t2 = "ASL";
  else if (t2.toUpperCase() === "Aziende Ospedaliere, Aziende Ospedaliere Universitarie, Policlinici e Istituti di Ricovero e Cura a Carattere Scientifico Pubblici".toUpperCase())
    t2 = "ASL";
  else if (t2.toUpperCase() === "REGIONI".toUpperCase())
    t2 = "Enti regionali";
  else if (t2.toUpperCase() === "Trentino Alto Adige".toUpperCase())
    t2 = "Enti regionali";
  else if (t2.toUpperCase() === "PROVINCE AUTONOME".toUpperCase())
    t2 = "PROVINCE AUTONOME";
  else if (t2.toUpperCase() === "Aziende Pubbliche di Servizi alla Persona".toUpperCase())
    t2 = "Aziende Pubbliche di Servizi alla Persona";
  else if (t2.toUpperCase() === "Istituzioni per l’Alta Formazione Artistica, Musicale e Coreutica - AFAM".toUpperCase())
    t2 = "Istituti di ricerca e AFAM";
  else if (t2.toUpperCase() === "Enti e Istituzioni di Ricerca Pubblici".toUpperCase())
    t2 = "Istituti di ricerca e AFAM";
  else if (t2.toUpperCase() === "Agenzie, Enti e Consorzi Pubblici per il Diritto allo Studio Universitario".toUpperCase())
    t2 = "Istituti di ricerca e AFAM";
  else if (t2.toUpperCase() === "Consorzi Interuniversitari di Ricerca".toUpperCase())
    t2 = "Istituti di ricerca e AFAM";
  else if (t2.toUpperCase() === "Agenzie Fiscali".toUpperCase())
    t2 = "PA Centrali";
  else if (t2.toUpperCase() === "Autorita' Amministrative Indipendenti".toUpperCase())
    t2 = "PA Centrali";
  else if (t2.toUpperCase() === "Forze di Polizia ad Ordinamento Civile e Militare per la Tutela dell'Ordine e della Sicurezza Pubblica".toUpperCase())
    t2 = "PA Centrali";
  else if (t2.toUpperCase() === "PA Centrali".toUpperCase())
    t2 = "PA Centrali";
  else if (t2.toUpperCase() === "PROVINCE E CITTA’ METROPOLITANE".toUpperCase())
    t2 = "PROVINCE";
  else if (t2.toUpperCase() === "Organi Costituzionali e di Rilievo Costituzionale".toUpperCase())
    t2 = "PA Centrali";
  else if (t2.toUpperCase() === "Enti di Previdenza ed Assistenza Sociale in Conto Economico Consolidato pubblici".toUpperCase())
    t2 = "PA Centrali";
  else if (t2.toUpperCase() === "Presidenza del Consiglio dei Ministri, Ministeri e Avvocatura dello Stato".toUpperCase())
    t2 = "PA Centrali";
  else if (t2.toUpperCase() === "Pubbliche Amministrazioni".toUpperCase())
    t2 = "PA Centrali";
  else if (t2.toUpperCase() === "Universita' e Istituti di Istruzione Universitaria Pubblici".toUpperCase())
    t2 = "Università";
  else if (t2.toUpperCase() === "Citta' Metropolitane".toUpperCase())
    t2 = "PROVINCE";
  else if (t2.toUpperCase() === "Istituti Zooprofilattici Sperimentali".toUpperCase())
    t2 = "Istituti Zooprofilattici Sperimentali";
  else if (t2.toUpperCase() === "Istituti di Istruzione Statale di Ogni Ordine e Grado".toUpperCase())
    t2 = "Scuole";
  else if (t2.toUpperCase() === "Aree Organizzative Omogenee".toUpperCase())
    t2 = "AOO ";
  else
    t2 = "Altri Enti";
  return t2;
}
export {
  load
};
