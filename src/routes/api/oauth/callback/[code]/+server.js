
import jsforce from 'jsforce';
import { redirect } from '@sveltejs/kit';

export async function GET({ params,locals }) {
  const oa = new jsforce.OAuth2({
    clientId : CID,
    clientSecret : CS,
    redirectUri : CBURI
  });
const conn = new jsforce.Connection({ oauth2: oa });

    await conn.authorize(params.code);
    const connectionToken = conn.accessToken;

    return new Response(
      connectionToken,
      {
          status: 200,
          
      }
  );
}
