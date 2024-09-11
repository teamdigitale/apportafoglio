import u from './abilitazioni.json';



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

export const nFormatter = (num, digits) => {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
    const item = lookup.findLast(item => num >= item.value);
    return item ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol) : "0";
}

function intlFormat(num) {
    return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
}
export const makeFriendly = (num) => {
    if (num >= 1000000)
        return intlFormat(num / 1000000) + 'M';
    if (num >= 1000)
        return intlFormat(num / 1000) + 'k';
    return intlFormat(num);
};

export const percentuale = (v) => {
    const option = {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    };
    const formatter = new Intl.NumberFormat("it-IT", option);
    return formatter.format(v);
}

export const formatBytes = (bytes, decimals = 2) => {
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

export const getQuarter = (d) => {
    d = d || new Date();
    let m = Math.floor(d.getMonth() / 3) + 1;
    let qm = m > 4 ? m - 4 : m;
    let qy = d.getFullYear();
    return 'Q'+qm+'-' + qy;
}

export const getFirstDayOfQuarter = (q) =>{
    let m = q.substring(1,2);
    let year = q.substring(3);
    let month = 0;
    if(m==='1'){
        month = 0;
    }else if(m==='2'){
        month = 3;
    }else if (m==='3'){
        month = 6;
    }else {
        month = 9;
    }
    return new Date(year,month,1);
}

export const addDays = (d, n) => {
    
    let res = new Date(new Date(d).setDate(d.getDate() + n));
    if (d) {
        return res;
    } else { return null }
}

export const  monthDiff = (date1, date2) => {
    let diffYears = date2.getFullYear() - date1.getFullYear();
    let diffMonths = date2.getMonth() - date1.getMonth();
    let diffDays = date2.getDate() - date1.getDate();
    
    let months = (diffYears * 12 + diffMonths);
    if (diffDays > 0) {
      months += '.' + diffDays;
    } else if (diffDays < 0) {
      months--;
      months += '.' + (new Date(date2.getFullYear(), date2.getMonth(), 0).getDate() + diffDays);
    }
    return months;
}

export const  quartersDiff = (q1, q2) => {
    let date1 = getFirstDayOfQuarter(q1);
    let date2 = getFirstDayOfQuarter(q2);
    let diffYears = date2.getFullYear() - date1.getFullYear();
    let diffMonths = date2.getMonth() - date1.getMonth();
    let diffDays = date2.getDate() - date1.getDate();
    
    let months = (diffYears * 12 + diffMonths);
    if (diffDays > 0) {
      months += '.' + diffDays;
    } else if (diffDays < 0) {
      months--;
      months += '.' + (new Date(date2.getFullYear(), date2.getMonth(), 0).getDate() + diffDays);
    }
    return Math.floor(months/3);
}

export const mapTipologiaEnte = (misura,t)=>{
    if(misura==='1.2 Abilitazione e facilitazione migrazione al Cloud'||misura==='1.4.1 Esperienza del cittadino nei servizi pubblici'){
        if(t==='Comuni'||t==='Scuole'){
            return t;
        }else{
            return 'Altre tipologie';
        }
    }else{
        return 'Tutte le tipologie';
    }
}


export const areaManager = (idsf) =>{
    if(idsf){
        const authuser = u.users.find(x => x.id === idsf);
        if(authuser){
            
            if(authuser.roles&&authuser.roles.indexOf("areamanager")!==-1){
                return authuser;
            }
        }
    }
    return undefined;
}

export const ruolo = (idsf) =>{
    if(idsf){
        const authuser = u.users.find(x => x.id === idsf);
        if(authuser){
            
            if(authuser.roles&&authuser.roles.indexOf("areamanager")!==-1){
                return 'Area Manager';
            }
        }
    }
    return 'AcM / TIM';
}

export const nomeUtente = (idsf) =>{
    if(idsf){
        const authuser = u.users.find(x => x.id === idsf);
        if(authuser){
            return authuser.name;
        }
    }
    return 'Non assegnato';
}

export const dangerColor = '#cc334d';
export const warningColor = '#995c00';
export const successColor = '#008055';
export const primaryColor = '#0066cc';
export const secondaryColor = '#5d7083';