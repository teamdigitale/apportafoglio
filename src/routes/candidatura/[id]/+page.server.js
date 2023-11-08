import jsforce from 'jsforce';
import moment from "moment/min/moment-with-locales";
moment.locale("it");
import { loadCandidatura, loadComunicazioni, loadFileCorrelati, loadRichiesteVariazione, loadServiziRichiesta, loadSoggettoRealizzatore, loadStoriaCandidatura } from '../../../logic/candidaturadetail';

import { getUtenteAsseveratore, getUtenteStandard } from '../../../logic/userdb';

export async function load({ cookies, params }) {
    let cs = [];
    let ch = [];
    let comm = [];
    let sr = [];
    let soggettiRealizzatori = [];
    let contratti = [];
    let filesCandidatura = [];
    let rv = [];
    const ustd = getUtenteStandard(cookies);
    const uass = getUtenteAsseveratore(cookies);

    let idc = params.id;
    let u = ustd;
    let ass = params.id.split("°");
    console.log(ass);
    if(ass&&ass.length==2){
        idc = ass[0];
        u = uass;
    }

    if (u) {
        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        await conn.login(u.email, u.password + u.token);
        cs = cs.concat(await loadCandidatura(conn, idc));
        ch = ch.concat(await loadStoriaCandidatura(conn, idc));
        comm = comm.concat(await loadComunicazioni(conn, idc));
        sr = sr.concat(await loadServiziRichiesta(conn, idc));
        soggettiRealizzatori = soggettiRealizzatori.concat(await loadSoggettoRealizzatore(conn, idc));
        rv = rv.concat(await loadRichiesteVariazione(conn, idc));
        let cc =
            Object.values(
                soggettiRealizzatori.reduce((a, { Contract__c }) => {
                    a[Contract__c] = a[Contract__c] || {
                        Contract__c,
                        count: 0,
                    };
                    a[Contract__c].count++;
                    return a;
                }, Object.create(null))
            )
                .map((x) => x.Contract__c);

        console.log("cc" + cc.length);

        if (cc.length > 0) {
            console.log(cc.length);
            let instr = "";

            /*
            cc.filter(c=> c).forEach((c,index)=>{
                instr = instr + "'" + c + "'";
                if(index!=cc.filter(c=> c).length){
                    instr = "," + instr;
                }
            })

            for (let z = 0; z < cc.length; z++) {
                if (cc[z]) {

                    instr = instr + "'" + cc[z] + "'";
                    if (z > 0 && z <= (cc.length - 1)) {
                        instr = "," + instr;
                    }

                }
            }*/

            instr = "('" + cc.join("','")+ "')";
            console.log("Caricamento contratti " + instr);
            if (instr !== '()') {
                contratti = contratti.concat(await loadFileCorrelati(conn, instr));
            }
        }


        filesCandidatura = filesCandidatura.concat(await (loadFileCorrelati(conn, "('" + idc + "')")));

        soggettiRealizzatori.forEach(x => { x.contratti = contratti.filter(y => y.LinkedEntityId === x.Contract__c) }
        );


        await conn.logout();
    }




    let fornitori =
        Object.values(
            soggettiRealizzatori.reduce((a, { Denominazione_Soggetto_Realizzatore__c }) => {
                a[Denominazione_Soggetto_Realizzatore__c] = a[Denominazione_Soggetto_Realizzatore__c] || {
                    Denominazione_Soggetto_Realizzatore__c,
                    count: 0,
                };
                a[Denominazione_Soggetto_Realizzatore__c].count++;
                return a;
            }, Object.create(null))
        )
            .map((x) => x.Denominazione_Soggetto_Realizzatore__c)
            .sort()
        ;


    filesCandidatura.forEach(f => {
        if (!f.ContentDocument.Title.includes('Report scansione')) {
            ch.push({ ContentDocumentId: f.ContentDocumentId, Field: 'FILE', CreatedDate: f.ContentDocument.LastModifiedDate, title: "E' stato caricato un file", subtitle: f.ContentDocument.Title, NomeFile: f.ContentDocument.Title, Actor: "E" })
        } else if (f.ContentDocument.Title.includes('scansione asseverata')) {
            ch.push({ ContentDocumentId: f.ContentDocumentId, Field: 'FILE', CreatedDate: f.ContentDocument.LastModifiedDate, title: "E' stato caricata una scansione del sito", subtitle: f.ContentDocument.Title, NomeFile: f.ContentDocument.Title, Actor: "D" })
        }
    });

    comm.forEach(m => {
        ch.push({ Field: 'COMUNICAZIONE', CreatedDate: m.CreatedDate, title: "E' stata inviata una comunicazione", subtitle: moment(m.CreatedDate).format("DD/MM/YYYY - HH:mm:ss"), NewValue: m.Quesito__c, Actor: "D", icon: 'envelope' })
    });

    rv.forEach(v => {
        if (v.Subject === 'Richiesta Variazione Cronoprogramma') {
            ch.push({ type: 'primary', Field: 'VARIAZIONE', CreatedDate: v.CreatedDate, title: "E' stata richiesta una variazione cronoprogramma per la fase " + v.Fase_Cronoprogramma__c, subtitle: "Scadenza inziale: " + moment(v.Data_scadenza_iniziale__c).format("DD/MM/YYYY") + " - Giorni richiesti: " + v.Giorni_richiesti__c, Actor: "E" })
        } else if (v.Subject === "Proroga d'ufficio Variazione Cronoprogramma") {
            ch.push({ type: 'primary', Field: 'VARIAZIONE', CreatedDate: v.CreatedDate, title: "E' stata concessa una proroga d'ufficio per la fase " + v.Fase_Cronoprogramma__c, subtitle: "Scadenza inziale: " + moment(v.Data_scadenza_iniziale__c).format("DD/MM/YYYY") + " - Giorni concessi: " + v.Giorni_richiesti__c, Actor: "D" })
        }
    }
    );

    ch = ch.filter(c=> c.OldValue!='Non Verificato');
    ch = ch.filter(c=> c.NewValue!='Non Verificato');

    ch = ch.sort(function (a, b) { return new Date(b.CreatedDate) - new Date(a.CreatedDate) });

    ch.forEach(h => {
        if (!h.type) h.type = 'info';
        if (h.Field === 'created') { h.Actor = "E"; h.title = 'La candidatura è stata creata'; h.subtitle = 'Stato della candidatura: PREBOZZA' }
        else if (h.Field === 'outfunds__Status__c' && h.OldValue === 'PREBOZZA') { h.Actor = "E"; h.title = 'La candidatura è stata salvata'; h.subtitle = 'Stato della candidatura: BOZZA' }
        else if (h.Field === 'outfunds__Status__c' && h.OldValue === 'BOZZA') { h.Actor = "E"; h.title = 'La candidatura è stata completata'; h.subtitle = 'Stato della candidatura: CONCLUSA' }
        else if (h.Field === 'outfunds__Status__c' && h.OldValue === 'CONCLUSA' && h.NewValue === 'BOZZA') { h.Actor = "E"; h.title = 'La candidatura è stata riportata in lavorazione'; h.subtitle = 'Stato della candidatura: BOZZA' }
        else if (h.Field === 'outfunds__Status__c' && h.OldValue === 'CONCLUSA' && h.NewValue === 'IN VERIFICA') { h.Actor = "E"; h.title = 'La candidatura è stata inviata'; h.subtitle = 'Stato della candidatura: IN VERIFICA' }
        else if (h.Field === 'outfunds__Status__c' && h.OldValue === 'IN VERIFICA' && h.NewValue === 'AMMESSA') { h.type = 'primary'; h.Actor = "D"; h.title = 'La candidatura è stata ammessa'; h.subtitle = 'Stato della candidatura: AMMESSA' }
        else if (h.Field === 'outfunds__Status__c' && h.OldValue === 'AMMESSA' && h.NewValue === 'ACCETTATA') { h.type = 'primary'; h.Actor = "E"; h.title = 'Il CUP è stato inserito'; h.subtitle = 'Stato della candidatura: ACCETTATA' }
        else if (h.Field === 'outfunds__Status__c' && h.OldValue === 'ACCETTATA' && h.NewValue === 'FINANZIATA') { h.type = 'primary'; h.Actor = "D"; h.title = 'La candidatura è stata finanziata'; h.subtitle = 'Stato della candidatura: FINANZIATA' }
        else if (h.Field === 'Stato_Progetto__c' && h.OldValue === 'DA AVVIARE' && h.NewValue === 'AVVIATO') { h.Actor = "E"; h.title = 'Il progetto è stato avviato'; h.subtitle = 'Stato del progetto: AVVIATO' }
        else if (h.Field === 'Stato_Progetto__c' && h.NewValue === 'DA AVVIARE') { h.Actor = "E"; h.title = 'Il progetto deve essere avviato'; h.subtitle = 'Stato del progetto: DA AVVIARE' }
        else if (h.Field === 'Stato_Progetto__c' && h.OldValue === 'AVVIATO' && h.NewValue === 'IN VERIFICA') { h.Actor = "E"; h.title = 'Il progetto è stato completato'; h.subtitle = 'Stato del progetto: IN VERIFICA' }
        else if (h.Field === 'Stato_Progetto__c' && h.OldValue === 'IN VERIFICA' && h.NewValue === 'AVVIATO') { h.Actor = "D"; h.title = 'Il progetto non ha superato la verifica'; h.subtitle = 'Stato del progetto: AVVIATO' }
        else if (h.Field === 'Stato_Progetto__c' && h.OldValue === 'IN VERIFICA' && h.NewValue === 'IN LIQUIDAZIONE') { h.Actor = "E"; h.title = 'Il progetto è passato ai controlli formali'; h.subtitle = 'Stato del progetto: IN LIQUIDAZIONE' }
        else if (h.Field === 'Stato_Progetto__c' && h.OldValue === 'IN LIQUIDAZIONE' && h.NewValue === 'LIQUIDATO') { h.type = 'primary'; h.Actor = "D"; h.title = 'Il progetto ha superato controlli formali'; h.subtitle = 'Stato del progetto: LIQUIDATO' }
        else if (h.Field === 'Stato_Progetto__c' && h.OldValue === 'IN VERIFICA' && h.NewValue === 'COMPLETATO') { h.type = 'primary'; h.Actor = "D"; h.title = 'Il progetto ha superato la verifica'; h.subtitle = 'Stato del progetto: COMPLETATO' }
        else if (h.Field === 'Stato_Progetto__c' && h.OldValue === 'COMPLETATO' && h.NewValue === 'IN VERIFICA') { h.Actor = "E"; h.title = 'Il progetto è passato in verifica'; h.subtitle = 'Stato del progetto: IN VERIFICA' }
        else if (h.Field === 'Stato_Progetto__c' && h.NewValue === 'RINUNCIATO') { h.type = 'danger'; h.Actor = "E"; h.title = 'Il progetto è stato rinunciato'; h.subtitle = 'Stato del progetto: RINUNCIATO' }
        else if (h.Field === 'outfunds__Status__c' && h.NewValue === 'RINUNCIATA') { h.type = 'danger'; h.Actor = "E"; h.title = 'La candidatura è stata rinunciata'; h.subtitle = 'Stato della candidatura: RINUNCIATA' }
        //else if (h.Field === 'COMUNICAZIONE') { h.title = 'Inviata comunicazione'; h.subtitle = h.NewValue; h.Actor = "D"; }
        else { }
        if (!h.icon) {
            switch (h.type) {
                case 'info':
                    h.icon = 'info'
                    break;
                case 'primary':
                    h.icon = 'check'
                    break;
                case 'danger':
                    h.icon = 'stop'
                    break;
                default:
                    h.icon = 'info'
            }
        }
    }
    );

    const chg = groupByDate(ch);


    return {
        c: cs[0],
        ch: ch,
        sr: sr,
        fornitori: fornitori,
        soggettiRealizzatori: soggettiRealizzatori,
        filesCandidatura: filesCandidatura,
        rv: rv,
        chgrouped: chg
    };
}

function groupByDate(data) {
    var o;
    var other = {};
    data.forEach((x) => {
        o = moment(x.CreatedDate).format("DD/MM/YYYY") + ":" + x.Actor;
        if (!(o in other)) {
            other[o] = [];
        }
        other[o].push(x);
    });
    return other;
}

function removeTime(date = new Date()) {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );
}


