
import { dev } from '$app/environment';


/** @type {import('./$types').RequestHandler} */
export async function GET({ request,cookies,params }) {
    const {runas} =  await request.json();
    //console.log(runas);
    cookies.set('runas', params.idu, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: !dev,
        maxAge: 60 * 60 * 24 * 1
    });

	return new Response(String("OK"));
}

