<script>
	export let rilevanza = 'alta';
	export let label = 'Molto rilevante';
	export let value = 'wduigwdguiuwdgio wdoih wdiowd owd hiwidhwd wdh';

	const d_bassa =
		'M 21.621,16.965 17.5,21.09 V 10.5 c 0,-0.553 -0.447,-1 -1,-1 -0.552,0 -1,0.447 -1,1 v 10.59 l -4.121,-4.125 c -0.391,-0.391 -1.024,-0.391 -1.414,0 -0.391,0.39 -0.391,1.025 0,1.415 l 5.656,5.66 c 0.24,0.24 0.568,0.31 0.879,0.25 0.311,0.06 0.639,-0.01 0.879,-0.25 l 5.656,-5.66 c 0.391,-0.39 0.391,-1.025 0,-1.415 -0.389,-0.391 -1.023,-0.391 -1.414,0 z';
	const d_normale =
		'm 16.039062,12.462921 -6.5742182,0.101563 c -0.3909997,0.389999 -0.3909997,1.024062 0,1.414062 h 1.4140622 3.232422 3.429688 3.580078 1.414062 c 0.391,-0.39 0.391,-1.024063 0,-1.414062 z m 0,5.558594 -6.5742182,0.101562 c -0.3909991,0.39 -0.3909991,1.024063 0,1.414063 h 1.4140622 3.232422 3.429688 3.580078 1.414062 c 0.391,-0.39 0.391,-1.024063 0,-1.414063 z';
	const d_alta =
		'm 21.621,16.844061 -4.121,-4.125 v 10.59 c 0,0.553 -0.447,1 -1,1 -0.552,0 -1,-0.447 -1,-1 v -10.59 l -4.121,4.125 c -0.391,0.391 -1.024,0.391 -1.414,0 -0.391,-0.39 -0.391,-1.025 0,-1.415 l 5.656,-5.6600005 c 0.24,-0.24 0.568,-0.31 0.879,-0.25 0.311,-0.06 0.639,0.01 0.879,0.25 l 5.656,5.6600005 c 0.391,0.39 0.391,1.025 0,1.415 -0.389,0.391 -1.023,0.391 -1.414,0 z';
</script>

<div class="callout callout-highlight my-2" class:alta={rilevanza==='alta'} class:bassa={rilevanza==='bassa'} class:normale={rilevanza==='normale'}>
	<div class="callout-title">
		<span class="visually-hidden">Confermato</span>
		<span>{value}</span>
	</div>
	<p>
		<svg class="icon">
			<g>
				<g fill="#0066cc">
					<path
						fill={rilevanza === 'alta' ? '#008055' : rilevanza === 'bassa' ? '#5d7083' : '#0066cc'}
						stroke={rilevanza === 'alta'
							? '#008055'
							: rilevanza === 'bassa'
								? '#5d7083'
								: '#0066cc'}
						d={rilevanza === 'alta' ? d_alta : rilevanza === 'bassa' ? d_bassa : d_normale}
						id="arrow-down-square"
					>
					</path>
				</g>
			</g>
		</svg>{label}
	</p>
</div>

<style>
	.callout p {
		font-family: 'Titillium Web';
		font-size: 1rem;
		color: #30475f;
	}

	.callout.callout-highlight {
		border: none;
        border: 1px solid #5d7083;
		border-left: 5px solid #5d7083;
		border-radius: 0;
		padding: 0.1rem 1rem;
	}

	.callout.callout-highlight .callout-title {
		margin-bottom: 0rem;
		font-size: 1rem;
	}

    .alta {
        border-left-color: #008055 !important;
    }

    .bassa {
        border-left-color: #5d7083 !important;
    }

    .normale {
        border-left-color: #0066cc !important;
    }


</style>
