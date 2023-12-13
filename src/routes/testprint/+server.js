import pdf from 'pdfjs';

/** @type {import('../$types').RequestHandler} */
export async function GET({ params, locals }) {
    const lorem =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum id fugiunt, re eadem quae Peripatetici, verba. Tenesne igitur, inquam, Hieronymus Rhodius quid dicat esse summum bonum, quo putet omnia referri oportere? Quia nec honesto quic quam honestius nec turpi turpius.';
    const doc = new pdf.Document({
        padding: 10
    });

    //doc.pipe(fs.createWriteStream('/1aaaosssutput.pdf'));


    const header = doc
        .header()
        .table({ widths: [null],borderWidth: 1, padding: 0.2 * pdf.cm })
        .row();

    header
        .cell()
        .text({ textAlign: 'right' })
        .add(
            'Dipartimento per la Trasformazione Digitale',
            { color: 0x0066cc }
        );

    doc.footer().pageNumber(
        function (curr, total) {
            return 'pagina '+curr + ' di ' + total;
        },
        { textAlign: 'center' }
    );

    const cell = doc.cell({ paddingBottom: 0.5 * pdf.cm });
    cell.text('Overview Generale Asseverazioni', { fontSize: 16, textAlign: 'center', color: 0x0066cc });
    

    const table = doc.table({
        widths: [1.5 * pdf.cm, 1.5 * pdf.cm, null, 2 * pdf.cm, 2.5 * pdf.cm],
        borderHorizontalWidths: function (i) {
            return i < 2 ? 1 : 0.1;
        },
        padding: 5,
    });

    const tr = table.header({
        borderBottomWidth: 1.5,
    });
    tr.cell('#');
    tr.cell('Unit');
    tr.cell('Subject');
    tr.cell('Price', { textAlign: 'right' });
    tr.cell('Total', { textAlign: 'right' });

    function addRow(qty, name, desc, price) {
        const tr = table.row();
        tr.cell(qty.toString());
        tr.cell('pc.');

        const article = tr.cell().text();
        article
            .add(name, {})
            .br()
            .add(desc, { fontSize: 11, textAlign: 'justify' });

        tr.cell(price.toFixed(2) + ' €', { textAlign: 'right' });
        tr.cell((price * qty).toFixed(2) + ' €', { textAlign: 'right' });
    }

    addRow(2, 'Article A', lorem, 500);
    addRow(1, 'Article B', lorem, 250);
    addRow(2, 'Article C', lorem, 330);
    addRow(3, 'Article D', lorem, 1220);
    addRow(2, 'Article E', lorem, 120);
    addRow(5, 'Article F', lorem, 50);
    addRow(2, 'Article E', lorem, 120);
    addRow(5, 'Article F', lorem, 50);
    addRow(2, 'Article E', lorem, 120);
    addRow(5, 'Article F', lorem, 50);

    //await doc.end()

    const buf = await doc.asBuffer();
    const blob = new Blob([buf], { type: 'application/pdf' });
    return new Response(
        blob,
        {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition':
                    `attachment; filename*=UTF-8''test.pdf`,
            },
        }
    );
    

}
