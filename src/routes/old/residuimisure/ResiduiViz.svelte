<script>
	// @ts-nocheck
	import * as Plot from '@observablehq/plot';
	import * as d3 from 'd3';
	import ObservablePlot from '$lib/c/observable/ObservablePlot.svelte';
	import { dangerColor, euro, primaryColor, secondaryColor } from '$lib/js/shared';

	export let values;
	export let misura;
	export let id;

	$: f_dataforchart = () => {
		const res = [];
		values.forEach((d) => {
			const m = d.misura;
			if (m === misura) {
				d.movimenti.forEach((mov) => {
					if (mov.avviso !== '') {
						res.push({ ...mov, misura: m });
					}
				});
			}
		});
		return res;
	};

	$: dataforchart = f_dataforchart();

	const barfill = (i) => {
		if (i.label ==='Allocazione importo avviso') {
            if(i.stato==='PUBBLICATO'){
			    return 'DodgerBlue';
            }else{
                return 'Grey';
            }
		} else {
			if (i.label === 'Svincolo rinunce decretate') {
				return 'Tomato';
			} else if  (i.label === 'Svincolo revoche definitive') {
                return 'Orange'
            }
            else {
				return 'LimeGreen';
			}
		}
	};
</script>

<div {id} class="tw">
	<div class="row">
        <div class="col-12 col-lg-12">
            <div class="my-2">
                <div class="table-responsive myt">
                    <table class="table table-sm">
                        <tbody>
                            <tr>
                                <td style="background-color: grey;"></td>
                                <td>Allocazione importo avviso chiuso</td>
                                <td style="background-color: DodgerBlue;"></td>
                                <td>Allocazione importo avviso aperto</td>
                                <td style="background-color: Tomato;"></td>
                                <td>Svincolo rinunce decretate</td>
                                <td style="background-color: Orange;"></td>
                                <td>Svincolo revoche definitive</td>
                                <td style="background-color: LimeGreen;"></td>
                                <td>Svincolo residuo avviso</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
		<div class="col-12 col-lg-12">
			<ObservablePlot
				options={{
					marginLeft: 450,
					x: {
						label: 'Importi',
						tickFormat: (d) => euro(d),
						ticks: 4,
						nice: false,
					},
					y: {
						label: 'Avvisi',
						domain: d3.sort(dataforchart, (d) => -d.outfunds__Start_Date__c).map((d) => d.avviso)
					},
					marks: [
						Plot.barX(dataforchart, {
							x: 'importo',
							y: 'avviso',
							sort: (d) => new Date(d.outfunds__Start_Date__c),
							fill: (d) => barfill(d),
							fillOpacity: 0.7,
							stroke: (d) => barfill(d),
							strokeOpacity: 1,
							strokeWidth: 0,
							inset: 0.7,
							title: (d) => d.label + ': ' + euro(d.importo)
						}),
						Plot.ruleX([0])
					]
				}}
			/>
		</div>
	</div>
</div>

<style>
    .tw  {font-family: 'Titillium Web';}
    .myt td {font-size: 0.75rem;}
</style>