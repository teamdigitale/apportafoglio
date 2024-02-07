import jsforce from 'jsforce';
import { CID } from '$env/static/private';
import { CS } from '$env/static/private';
import { CBURI } from '$env/static/private';

export async function load({ cookies, url, locals }) {
    const code = url.searchParams.get('code');
    if (code && code !== '') {
        const oa = new jsforce.OAuth2({
            clientId: CID,
            clientSecret: CS,
            redirectUri: CBURI
        });
        const conn = new jsforce.Connection({ oauth2: oa });
        await conn.authorize(code);
        const connectionToken = conn.accessToken;
        if (connectionToken) {
            cookies.set('session_id_std', connectionToken, {
                path: '/',
                sameSite: 'strict',
                secure: true,
                maxAge: 60 * 60 * 24 * 1
            });
        }

    }
    return {};
}

