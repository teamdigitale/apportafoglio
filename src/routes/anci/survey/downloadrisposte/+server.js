import risposte from '../survey_anci.json';
import { redirect } from '@sveltejs/kit';
import jsforce from 'jsforce';
import * as d3 from 'd3';
import moment from 'moment/min/moment-with-locales';
moment.locale('it');


export async function GET({ params, locals }) {

    const connection = locals.user.connectionStandard;

    if (connection) {
        let conn = new jsforce.Connection({
            instanceUrl: "https://padigitale2026.my.salesforce.com",
            accessToken: connection
        });
        if (conn) {
            const d = risposte.data.filter(x => x.surveyanci.completato).map(x =>
            ({
                area: x.pa2026.area,
                regione: x.pa2026.regione,
                comune: x.nome,
                tipo: x.surveyanci.tipo,
                data_invio_risposta: x.surveyanci.data_invio,
            })
            );

            const file = d3.dsvFormat(";").format(d);
             //d3.csvFormat(d);

            

            return new Response(
                file,
                {
                    status: 200,
                    headers: {
                        'Content-Type': 'text',
                        'Content-Disposition':
                            `attachment; filename*=UTF-8''` + 'risposte_survey_anci_' + moment().format("YYYYMMDD") + `.csv`,
                    },
                }
            );
        } else {
            throw redirect(303, '/users');
        }
    } else {
        throw redirect(303, '/users');
    }
}