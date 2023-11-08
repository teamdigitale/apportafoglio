
import { getUserBySessionid} from '../../logic/userdb';
import { caricaEnti } from '../../logic/enti'
import jsforce from 'jsforce';
import viewas from '$lib/preferences';
import { enti } from '../../stores/globaldata'
import { get } from 'svelte/store';


export async function load({ cookies }) {
    let entistandard = [];
    let entiasseveratore = [];
    let tipologieEntiStandard = [];
    let tipologieEntiAsseveratore = [];
    const cookiesfuidstd = cookies.get('session_id_std');
    let utentestandard;
    if (cookiesfuidstd) {
        utentestandard = getUserBySessionid(cookiesfuidstd, 'standard');
        if (utentestandard == null) {
            cookies.delete('session_id_std');
        } else {
            let conn = new jsforce.Connection({
                loginUrl: "https://login.salesforce.com"
            });
            await conn.login(utentestandard.email, utentestandard.password+utentestandard.token);
            const p = get(viewas);
            entistandard = await caricaEnti(conn,utentestandard.idutentesf,p,'');
            tipologieEntiStandard =Object.values(
                entistandard.reduce((a, { Tipologia_Ente__c }) => {
                    a[Tipologia_Ente__c] = a[Tipologia_Ente__c] || {
                        Tipologia_Ente__c,
                        count: 0,
                    };
                    a[Tipologia_Ente__c].count++;
                    return a;
                }, Object.create(null))
            ).sort(function (a, b) {
                return b.count - a.count;
            });
        }
    }
    const cookiesfuidass = cookies.get('session_id_ass');
    if (cookiesfuidass) {
        const utenteasseveratore = getUserBySessionid(cookiesfuidass, 'asseveratore');
        if (utenteasseveratore == null) {
            cookies.delete('session_id_ass');
        } else {
            let conn = new jsforce.Connection({
                loginUrl: "https://login.salesforce.com"
            });
            await conn.login(utenteasseveratore.email, utenteasseveratore.password+utenteasseveratore.token);
            entiasseveratore = await caricaEnti(conn,utenteasseveratore.idutentesf,'',utenteasseveratore.qualifica);
            tipologieEntiAsseveratore =Object.values(
                entiasseveratore.reduce((a, { Tipologia_Ente__c }) => {
                    a[Tipologia_Ente__c] = a[Tipologia_Ente__c] || {
                        Tipologia_Ente__c,
                        count: 0,
                    };
                    a[Tipologia_Ente__c].count++;
                    return a;
                }, Object.create(null))
            ).sort(function (a, b) {
                return b.count - a.count;
            });
        }
    }
    return {
        entistandard: get(enti),
        entiasseveratore: entiasseveratore,
        tipologieEntiStandard: tipologieEntiStandard,
        tipologieEntiAsseveratore: tipologieEntiAsseveratore,
        qualificaStandard: utentestandard.sfuser.Title
    };
  }