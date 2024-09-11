<script>
	// @ts-nocheck

	import * as Plot from '@observablehq/plot';
	import * as d3 from 'd3';
	import ObservablePlot from '$lib/c/observable/ObservablePlot.svelte';
	import { formatNumber, percentuale } from '$lib/js/shared.js';
	import { tick } from 'svelte';

    export let s;
	export let codice;
    export let colors;
    export let barHehight=60;
    export let showzero=true;
    export let xlabelappend = '';
    export let marginBottom = 60;
    export let marginLeft = 120;
    export let splity = 10;
    let domanda = s.domande.find(
			(x) => x.codice === codice
		);
        

    let xlabels = showzero?[[0,"a"]]:[];
    let dati = [];
    let ticks = [];
    let step = showzero?100/domanda.options.length:domanda.options.length-1;
    let v = 0;
    if(domanda){
    for (let index = 0; index < domanda.options.length; index++) {
        if(showzero){
        v = v+step;
        }
        ticks.push(v);
        xlabels.push([v,domanda.options[index]]);
        if(!showzero){
        v = v+step;
        }
    }
    for (let index = 0; index < domanda.risposte.length; index++) {
        v = v+step;
        dati.push([domanda.risposte[index][0],xlabels.find(l => l[1]===domanda.risposte[index][1])[0],colors[xlabels.findIndex(l => l[1]===domanda.risposte[index][1])]]);
    }
}
	const margin = 40;
    let width;

  

    

    const splitText = (t,tl) => {
		
		if (t) {

			const words = t.split(' ');
			
			if (words.length === 1) {
				
				return t;
			}
			const res = [];
			let s = '';
			words.forEach((w) => {
				s = s + ' ' + w;
				if (s.length > tl) {
					res.push(s);
					s = '';
				}
			});
			if (s !== '') res.push(s);
			
			return res.join('\n');
		} else {
			return '';
		}
	};

</script>

{#if s.domande.find((x) => x.codice === codice)}

<div class="callout callout-highlight note my-4">
	<div class="callout-title">
		<svg class="icon"><use href="/svg/sprites.svg#it-help-circle"></use></svg>{domanda.codice}
		{domanda.domanda}
	</div>
    <div bind:clientWidth={width}>
        <ObservablePlot
            options={{
                label: null,
                marginLeft: marginLeft,
                marginRight: 60,
                marginBottom: marginBottom,
                height: barHehight*domanda.risposte.length,
                x: {label: null, tickFormat: (d) => splitText(xlabels.find(x => x[0]===d)[1],8)+xlabelappend, ticks: ticks, domain:[0,100], nice:true},
                y: {label: null, tickFormat: (d) => splitText(d,splity)},
                color: {legend: false},
                marks: [
                  Plot.barX(dati, {y: (d) => d[0], x: 100, inset: 0, fill: "lightgrey", fillOpacity:0.5}),
                  Plot.barX(dati, {y: (d) => d[0], x: (d) => d[1], inset: 2, fill: (d) => d[2], fillOpacity: 1,}),
                  Plot.gridX({stroke: "white", strokeOpacity: 1, strokeWidth:2, ticks: ticks}),
                  Plot.ruleX([0])
                ]
              }}
        />
    </div>
</div>

{/if}

<style>
	.callout {
		max-width: none !important;
	}


    .callout-title {
		font-size: 1rem;
		font-family: 'Titillium Web';
	}

    .callout p{
		font-size: 1rem;
		font-family: 'Titillium Web';
	}

	.callout ul{
		font-size: 1rem;
		font-family: 'Titillium Web';
	}

    .callout svg{
		font-size: 0.9rem;
	}

</style>