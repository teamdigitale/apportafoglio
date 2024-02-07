import jsforce from 'jsforce';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies, url, locals }) {

}


export const actions = {
    loginstandard: async ({ request, cookies }) => {

        const data = await request.formData();
        const email = '' + data.get('emailstandard');
        const password = '' + data.get('passwordstandard');
        const token = '' + data.get('tokenstandard');

        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        try {
            await conn.login(email, password + token);
            const connectionToken = conn.accessToken;
            cookies.set('session_id_std', connectionToken, {
                path: '/',
                sameSite: 'strict',
                secure: true,
                maxAge: 60 * 60 * 24 * 1
            });




        } catch (err) {
            console.log(err.message);
        }
        throw redirect(303, '/users');
    },
    logoutstandard: async ({ cookies }) => {
        cookies.delete('session_id_std', { path: '/' });
        throw redirect(303, '/users');
    },
    loginasseveratore: async ({ request, cookies }) => {

        const data = await request.formData();
        const email = '' + data.get('emailasseveratore');
        const password = '' + data.get('passwordasseveratore');
        const token = '' + data.get('tokenasseveratore');

        let conn = new jsforce.Connection({
            loginUrl: "https://login.salesforce.com"
        });
        try {
            await conn.login(email, password + token);
            const connectionToken = conn.accessToken;
            cookies.set('session_id_ass', connectionToken, {
                path: '/',
                sameSite: 'strict',
                secure: true,
                maxAge: 60 * 60 * 24 * 1
            });

        } catch (err) {
            console.log(err.message);
        }
        throw redirect(303, '/users');
    },
    logoutasseveratore: async ({ cookies }) => {
        cookies.delete('session_id_ass', { path: '/' });
        throw redirect(303, '/users');
    }
};
