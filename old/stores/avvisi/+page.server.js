export const load = async ({ fetch }) => {
    const res = await fetch('https://raw.githubusercontent.com/teamdigitale/padigitale2026-opendata/main/data/avvisi.json');
    const data = await res.json();
    for(let z = 0; z<data.length; z++){
        data[z].beneficiari = data[z].soggetti_destinatari.split(';');
    }
    return {avvisi: data};
  }