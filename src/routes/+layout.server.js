export async function load({ locals, cookies }) {
    return {
        loggedstandard: locals.user.loggedstandard,
        utentestandard: locals.user.utentestandard,
        loggedasseveratore: locals.user.loggedasseveratore,
        utenteasseveratore: locals.user.utenteasseveratore,
    }
}