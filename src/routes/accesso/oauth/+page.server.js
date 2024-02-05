import jsforce from 'jsforce';
import { redirect } from '@sveltejs/kit';
import { CID } from '$env/static/private';
import { CS } from '$env/static/private';
import { CBURI } from '$env/static/private';

export function load({ cookies, locals }) {
    const oa = new jsforce.OAuth2({
        clientId : CID,
        clientSecret : CS,
        redirectUri : CBURI
      });
    
    throw redirect(303, oa.getAuthorizationUrl({ scope: 'full' }));
    return {

    }
}

