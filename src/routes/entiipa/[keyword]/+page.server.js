const searchurl = 'https://indicepa.gov.it/ipa-dati/api/3/action/datastore_search?resource_id=d09adf99-dc10-4349-8c53-27b1e5aa97b6&limit=1000&q=';
const categorieurl = 'https://indicepa.gov.it/ipa-dati/api/3/action/datastore_search?resource_id=84ebb2e7-0e61-427b-a1dd-ab8bb2a84f07&limit=99999';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const entif = fetch(searchurl + params.keyword);
	const categorief = fetch(categorieurl);
	const valuesf = await Promise.all([entif, categorief]);
	const enti = valuesf[0].json();
	const categorie = valuesf[1].json();
	const values = await Promise.all([enti, categorie]);
	return {
		enti: values[0].result,
		categorie: values[1].result,
		keyword: params.keyword
	}




}


