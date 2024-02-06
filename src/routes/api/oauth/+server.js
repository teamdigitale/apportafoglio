
import jsforce from 'jsforce';
import { redirect } from '@sveltejs/kit';
import { CID } from '$env/static/private';
import { CS } from '$env/static/private';
import { CBURI } from '$env/static/private';

export async function GET({ params,locals }) {
    const oa = new jsforce.OAuth2({
        clientId : CID,
        clientSecret : CS,
        redirectUri : CBURI
      });

      return Response.redirect(oa.getAuthorizationUrl({ scope: 'full' }));
}
