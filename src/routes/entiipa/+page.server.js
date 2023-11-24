const searchurl = 'https://indicepa.gov.it/ipa-dati/api/3/action/datastore_search?resource_id=d09adf99-dc10-4349-8c53-27b1e5aa97b6&q=';

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
	return { keyword: params.keyword };
}


