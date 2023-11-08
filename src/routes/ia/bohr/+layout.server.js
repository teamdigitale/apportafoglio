import jsforce from 'jsforce';

export async function load({ cookies }) {
    
    const scenari = [
        {id: 'stimadatacontrattualizzazione',
        nome: 'Stima data contrattualizzazione',
        url: '/ia/bohr/datacontrattualizzazione'},
        {id: 'stimadatacompletamento',
        nome: 'Stima data completamento',
        url: '/ia/bohr/datacompletamento'}];

    return {
        scenari: scenari
    };
}
