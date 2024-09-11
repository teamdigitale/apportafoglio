export async function load() {
    const resavvisi = await fetch('https://raw.githubusercontent.com/teamdigitale/padigitale2026-opendata/main/data/avvisi.json');
    const dataavvisi = await resavvisi.json();
    
    
    const avvisi = dataavvisi.map((f) => ({
        misura: f.misura,
        avviso: f.titolo,
        stato: f.stato,
        apertura: new Date(f.data_inizio_bando),
        chiusura: new Date(f.data_fine_bando), 
        valore: f.totale_importo_stanziato,
        beneficiari: f.soggetti_destinatari
      }));

    return {
        avvisi: avvisi
    }
}