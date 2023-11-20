export async function load() {
    const resavvisi = await fetch('https://raw.githubusercontent.com/teamdigitale/padigitale2026-opendata/main/data/avvisi.json');
    const dataavvisi = await resavvisi.json();
    
    const resfinanziatecomuni = await fetch('https://raw.githubusercontent.com/teamdigitale/padigitale2026-opendata/main/data/candidature_comuni_finanziate.json');
    const datafinanziatecomuni = await resfinanziatecomuni.json();
    
    const resfinanziatescuole = await fetch('https://raw.githubusercontent.com/teamdigitale/padigitale2026-opendata/main/data/candidature_scuole_finanziate.json');
    const datafinanziatescuole = await resfinanziatescuole.json();

    const resfinanziatealtri = await fetch('https://raw.githubusercontent.com/teamdigitale/padigitale2026-opendata/main/data/candidature_altrienti_finanziate.json');
    const datafinanziatealtri = await resfinanziatealtri.json();

    let cc = datafinanziatecomuni.concat(datafinanziatescuole).concat(datafinanziatealtri);

    cc.forEach(c => {
        c.avviso = dataavvisi.filter(a=>a.titolo===c.avviso)[0];
    });

    return {
        avvisi: dataavvisi,
        finanziate: cc
    }
}