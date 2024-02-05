import u from './abilitazioni.json';
import jsforce from 'jsforce';

export function oauth(){
    return new jsforce.OAuth2({
        // you can change loginUrl to connect to sandbox or prerelease env.
        // loginUrl : 'https://test.salesforce.com',
        clientId : '3MVG9t0sl2P.pByoiApgQeo61aw3IH4Wkc_O4BBFB5Amqa1gR.lUMSJrFVmNaappIOmFzHa6y_DO7swKu451j',
        clientSecret : '82F3117A2A132A066FC91BAA885DAFDFC66BB858C27B83630504821B80900FE5',
        redirectUri : 'https://apportafoglio.vercel.app/accesso'
      });
      //
      // Get authorization url and redirect to it.
      //

}

export function checkAbilitazione(id, role) {
    const authuser = u.users.filter(x => x.id === id);
    if (authuser.length > 0) {
        if (authuser[0].roles.indexOf(role) > -1) {
            return true;
        }
    }
    return false;
}

export function euro(v) {
    return Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
    }).format(v);
}

export const formatDate = (v) => {
    return new Intl.DateTimeFormat('it-IT').format(v);
}

export const formatNumber = (v) => {
    return new Intl.NumberFormat('it-IT').format(
        v
    )
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

export const  formatBytes = (bytes, decimals = 2) =>{
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export async function caricaAvvisi(conn) {
    const records = [];
    let soqlavvisi = `select Id, OwnerId, IsDeleted, Name, RecordTypeId, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, outfunds__Description__c, outfunds__End_Date__c, outfunds__Funding_Program_Manager__c, outfunds__Parent_Funding_Program__c, outfunds__Start_Date__c, outfunds__Status__c, outfunds__Top_Level__c, outfunds__Total_Program_Amount__c, Budget_Impegnato__c, Cluster_Regioni__c, Cluster_Scuole__c, Pacchetto__c, Parent_amount__c, Platea_potenziale__c, Oggetto_Avviso__c, Budget_Impegnato_Altro__c, Budget_Impegnato_Sud__c, InPreview__c, Program_Amount_Altro__c, Program_Amount_Sud__c, Quota_Sud__c, Fondi_disponibili_Altro__c, Fondi_disponibili_Sud__c, Fondi_disponibili__c, ID_Template__c, Codice_Controllo__c, Decode_Tipologia_Ente__c, Numero_Progressivo_Candidatura__c, Numero_Progressivo_Finestra__c, Numero_Progressivo__c, Stato_Formula__c, Nome_Progetto__c, Fondi_disponibili_Padre_1__c, Fondi_disponibili_Padre_2__c, Misura_Padre_1__c, Misura_Padre_2__c, Total_Program_Amount_Padre_1__c, Total_Program_Amount_Padre_2__c  from outfunds__Funding_Program__c where outfunds__Parent_Funding_Program__c != '' and (outfunds__Status__c='TERMINATO' or outfunds__Status__c='PUBBLICATO') order by outfunds__End_Date__c  desc`;
    let result_ = await conn.query(soqlavvisi);
    records.push(...result_.records);
    let more = !result_.done;
    while (more) {
        if (result_.nextRecordsUrl) {
            result_ = await conn.queryMore(result_.nextRecordsUrl);
            records.push(...result_.records);
            more = !result_.done;
        }
    }
    const res = await fetch('https://raw.githubusercontent.com/teamdigitale/padigitale2026-opendata/main/data/avvisi.json');
    const data = await res.json();
    for (let z = 0; z < data.length; z++) {
        data[z].beneficiari = data[z].soggetti_destinatari.toUpperCase().split(';');
    }

    records.forEach((a) => {
        a.Name = a.Name.replaceAll('"', "'").replaceAll('”', "'");
        if (data.filter(d => d.titolo.startsWith(a.Name))[0]) {
            a.beneficiari = data.filter(d => d.titolo.startsWith(a.Name))[0].beneficiari
        }
    }
    );
    return records;
}