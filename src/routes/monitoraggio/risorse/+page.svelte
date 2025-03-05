<script>
	import Areachart from '$lib/c/charts/areachart.svelte';
	import Barchart from '$lib/c/charts/barchart.svelte';
	import Cite from '$lib/c/cite.svelte';
	import Scorecard from '$lib/c/scorecard.svelte';
	import { euro, percentuale, setscroll } from '$lib/js/shared.js';
	import { onMount } from 'svelte';
	import moment from 'moment/min/moment-with-locales';
	moment.locale('it');

	export let data;

	let selectedMisura = '';
	$: filteredMisure = data.misure.filter((m) =>
		selectedMisura === '' ? true : m.Id === selectedMisura
	);

	$: valore = filteredMisure.reduce((acc, c) => acc + c.outfunds__Total_Program_Amount__c, 0);

	$: filteredFinanziate = data.finanziate.filter((f) => {
		if (selectedMisura === '') {
			return true;
		} else {
			if (
				(f.misura1 && f.misura1 === selectedMisura) ||
				(f.misura2 && f.misura2 === selectedMisura) ||
				f.misura === selectedMisura
			) {
				return true;
			} else {
				return false;
			}
		}
	});

	$: filteredDaContrattualizzare = data.dacontrattualizzare.filter((f) => {
		if (selectedMisura === '') {
			return true;
		} else {
			if (
				(f.misura1 && f.misura1 === selectedMisura) ||
				(f.misura2 && f.misura2 === selectedMisura) ||
				f.misura === selectedMisura
			) {
				return true;
			} else {
				return false;
			}
		}
	});

	$: filteredInRealizzazione = data.inrealizzazione.filter((f) => {
		if (selectedMisura === '') {
			return true;
		} else {
			if (
				(f.misura1 && f.misura1 === selectedMisura) ||
				(f.misura2 && f.misura2 === selectedMisura) ||
				f.misura === selectedMisura
			) {
				return true;
			} else {
				return false;
			}
		}
	});

	$: filteredInRevisione = data.inrevisione.filter((f) => {
		if (selectedMisura === '') {
			return true;
		} else {
			if (
				(f.misura1 && f.misura1 === selectedMisura) ||
				(f.misura2 && f.misura2 === selectedMisura) ||
				f.misura === selectedMisura
			) {
				return true;
			} else {
				return false;
			}
		}
	});

	$: filteredInVerificaTecnica = data.inverificatecnica.filter((f) => {
		if (selectedMisura === '') {
			return true;
		} else {
			if (
				(f.misura1 && f.misura1 === selectedMisura) ||
				(f.misura2 && f.misura2 === selectedMisura) ||
				f.misura === selectedMisura
			) {
				return true;
			} else {
				return false;
			}
		}
	});

	$: filteredInVerificaFormale = data.inverificaformale.filter((f) => {
		if (selectedMisura === '') {
			return true;
		} else {
			if (
				(f.misura1 && f.misura1 === selectedMisura) ||
				(f.misura2 && f.misura2 === selectedMisura) ||
				f.misura === selectedMisura
			) {
				return true;
			} else {
				return false;
			}
		}
	});

	$: filteredInLiquidazione = data.inliquidazione.filter((f) => {
		if (selectedMisura === '') {
			return true;
		} else {
			if (
				(f.misura1 && f.misura1 === selectedMisura) ||
				(f.misura2 && f.misura2 === selectedMisura) ||
				f.misura === selectedMisura
			) {
				return true;
			} else {
				return false;
			}
		}
	});

	$: filteredLiquidate = data.liquidate.filter((f) => {
		if (selectedMisura === '') {
			return true;
		} else {
			if (
				(f.misura1 && f.misura1 === selectedMisura) ||
				(f.misura2 && f.misura2 === selectedMisura) ||
				f.misura === selectedMisura
			) {
				return true;
			} else {
				return false;
			}
		}
	});

	$: filteredRinunciate = data.rinunciate.filter((f) => {
		if (selectedMisura === '') {
			return true;
		} else {
			if (
				(f.misura1 && f.misura1 === selectedMisura) ||
				(f.misura2 && f.misura2 === selectedMisura) ||
				f.misura === selectedMisura
			) {
				return true;
			} else {
				return false;
			}
		}
	});

	$: filteredRinunciatePreContratto = data.rinunciatePreContratto.filter((f) => {
		if (selectedMisura === '') {
			return true;
		} else {
			if (
				(f.misura1 && f.misura1 === selectedMisura) ||
				(f.misura2 && f.misura2 === selectedMisura) ||
				f.misura === selectedMisura
			) {
				return true;
			} else {
				return false;
			}
		}
	});

	$: filteredRinunciatePreCompletamento = data.rinunciatePreCompletamento.filter((f) => {
		if (selectedMisura === '') {
			return true;
		} else {
			if (
				(f.misura1 && f.misura1 === selectedMisura) ||
				(f.misura2 && f.misura2 === selectedMisura) ||
				f.misura === selectedMisura
			) {
				return true;
			} else {
				return false;
			}
		}
	});

	$: filteredRinunciatePostCompletamento = data.rinunciatePostCompletamento.filter((f) => {
		if (selectedMisura === '') {
			return true;
		} else {
			if (
				(f.misura1 && f.misura1 === selectedMisura) ||
				(f.misura2 && f.misura2 === selectedMisura) ||
				f.misura === selectedMisura
			) {
				return true;
			} else {
				return false;
			}
		}
	});

	$: filteredRevocate = data.revocate.filter((f) => {
		if (selectedMisura === '') {
			return true;
		} else {
			if (
				(f.misura1 && f.misura1 === selectedMisura) ||
				(f.misura2 && f.misura2 === selectedMisura) ||
				f.misura === selectedMisura
			) {
				return true;
			} else {
				return false;
			}
		}
	});

	$: startDate = new Date(
		Math.min(...filteredMisure.map((m) => new Date(m.outfunds__Start_Date__c)))
	);

	let endDate = new Date();
	$: dates = calcolaRange(startDate, endDate);

	function calcolaRange(s, e) {
		const d = [];
		let current = new Date(s.getFullYear(), s.getMonth(), 1);
		current.setHours(0);
		current.setMinutes(0);
		current.setSeconds(0);
		current.setMilliseconds(0);
		while (current < e) {
			let lastDayOfMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0);
			lastDayOfMonth.setHours(23);
			lastDayOfMonth.setMinutes(59);
			lastDayOfMonth.setSeconds(59);
			lastDayOfMonth.setMilliseconds(999);
			d.push(lastDayOfMonth);
			current.setDate(lastDayOfMonth.getDate() + 1);
			current.setHours(0);
			current.setMinutes(0);
			current.setSeconds(0);
			current.setMilliseconds(0);
		}
		return d;
	}

	$: calcolaTotaleFinanziate = () => {
		return filteredFinanziate.reduce(
			(acc, c) =>
				acc +
				(selectedMisura === ''
					? c.valore
					: selectedMisura === c.misura1
						? c.valorem1
						: selectedMisura === c.misura2
							? c.valorem2
							: selectedMisura === c.misura
								? c.valore
								: 0),
			0
		);
	};
	$: totaleFinanziate = calcolaTotaleFinanziate();

	$: calcolaTotaleRinunciate = () => {
		return filteredRinunciate.reduce(
			(acc, c) =>
				acc +
				(selectedMisura === ''
					? c.valore
					: selectedMisura === c.misura1
						? c.valorem1
						: selectedMisura === c.misura2
							? c.valorem2
							: selectedMisura === c.misura
								? c.valore
								: 0),
			0
		);
	};
	$: totaleRinunciate = calcolaTotaleRinunciate();

	$: calcolaTotaleRevocate = () => {
		return filteredRevocate.reduce(
			(acc, c) =>
				acc +
				(selectedMisura === ''
					? c.valore
					: selectedMisura === c.misura1
						? c.valorem1
						: selectedMisura === c.misura2
							? c.valorem2
							: selectedMisura === c.misura
								? c.valore
								: 0),
			0
		);
	};
	$: totaleRevocate = calcolaTotaleRevocate();

	$: calcoladatiResiduo = () => {
		const res = [['Mese', 'Residuo']];
		let residuo = valore;
		dates.forEach((d) => {
			const valoreFinanziateMese = filteredFinanziate
				.filter((f) => d.getFullYear() === f.anno && d.getMonth() + 1 === f.mese)
				.reduce(
					(acc, c) =>
						acc +
						(selectedMisura === ''
							? c.valore
							: selectedMisura === c.misura1
								? c.valorem1
								: selectedMisura === c.misura2
									? c.valorem2
									: selectedMisura === c.misura
										? c.valore
										: 0),
					0
				);
			const valoreRinunciatoMese = filteredRinunciate
				.filter((f) => d.getFullYear() === f.anno && d.getMonth() + 1 === f.mese)
				.reduce(
					(acc, c) =>
						acc +
						(selectedMisura === ''
							? c.valore
							: selectedMisura === c.misura1
								? c.valorem1
								: selectedMisura === c.misura2
									? c.valorem2
									: selectedMisura === c.misura
										? c.valore
										: 0),
					0
				);
			const valoreRevocateMese = filteredRevocate
				.filter((f) => d.getFullYear() === f.anno && d.getMonth() + 1 === f.mese)
				.reduce(
					(acc, c) =>
						acc +
						(selectedMisura === ''
							? c.valore
							: selectedMisura === c.misura1
								? c.valorem1
								: selectedMisura === c.misura2
									? c.valorem2
									: selectedMisura === c.misura
										? c.valore
										: 0),
					0
				);
			residuo = residuo - valoreFinanziateMese + valoreRinunciatoMese + valoreRevocateMese;
			res.push([d, residuo]);
		});
		return res;
	};

	$: datiResiduo = calcoladatiResiduo();

	$: calcoladatiFinanziate = () => {
		const res = [['Mese', 'Finanziate']];
		let finanziate = 0;
		dates.forEach((d) => {
			const valoreFinanziateMese = filteredFinanziate
				.filter((f) => d.getFullYear() === f.anno && d.getMonth() + 1 === f.mese)
				.reduce(
					(acc, c) =>
						acc +
						(selectedMisura === ''
							? c.valore
							: selectedMisura === c.misura1
								? c.valorem1
								: selectedMisura === c.misura2
									? c.valorem2
									: selectedMisura === c.misura
										? c.valore
										: 0),
					0
				);
			const valoreRinunciatoMese = filteredRinunciate
				.filter((f) => d.getFullYear() === f.anno && d.getMonth() + 1 === f.mese)
				.reduce(
					(acc, c) =>
						acc +
						(selectedMisura === ''
							? c.valore
							: selectedMisura === c.misura1
								? c.valorem1
								: selectedMisura === c.misura2
									? c.valorem2
									: selectedMisura === c.misura
										? c.valore
										: 0),
					0
				);
			const valoreRevocateMese = filteredRevocate
				.filter((f) => d.getFullYear() === f.anno && d.getMonth() + 1 === f.mese)
				.reduce(
					(acc, c) =>
						acc +
						(selectedMisura === ''
							? c.valore
							: selectedMisura === c.misura1
								? c.valorem1
								: selectedMisura === c.misura2
									? c.valorem2
									: selectedMisura === c.misura
										? c.valore
										: 0),
					0
				);
			finanziate = finanziate + valoreFinanziateMese - valoreRinunciatoMese - valoreRevocateMese;
			res.push([d, finanziate]);
		});
		return res;
	};

	$: datiFinanziate = calcoladatiFinanziate();

	$: calcoladatiRinunciateRevocate = () => {
		const res = [['Mese', 'Rinunciate o revocate']];
		let rinunciaterevocate = 0;
		dates.forEach((d) => {
			const valoreRinunciatoMese = filteredRinunciate
				.filter((f) => d.getFullYear() === f.anno && d.getMonth() + 1 === f.mese)
				.reduce(
					(acc, c) =>
						acc +
						(selectedMisura === ''
							? c.valore
							: selectedMisura === c.misura1
								? c.valorem1
								: selectedMisura === c.misura2
									? c.valorem2
									: selectedMisura === c.misura
										? c.valore
										: 0),
					0
				);
			const valoreRevocateMese = filteredRevocate
				.filter((f) => d.getFullYear() === f.anno && d.getMonth() + 1 === f.mese)
				.reduce(
					(acc, c) =>
						acc +
						(selectedMisura === ''
							? c.valore
							: selectedMisura === c.misura1
								? c.valorem1
								: selectedMisura === c.misura2
									? c.valorem2
									: selectedMisura === c.misura
										? c.valore
										: 0),
					0
				);
			rinunciaterevocate = rinunciaterevocate + valoreRinunciatoMese + valoreRevocateMese;
			res.push([d, rinunciaterevocate]);
		});
		return res;
	};

	$: datiRinunciateRevocate = calcoladatiRinunciateRevocate();

	$: calcoladatiDettaglioFinanziate = () => {
		const res = [
			[
				'Mese',
				'Da contrattualizzare',
				'In realizzazione',
				'In revisione',
				'In verifica tecnica',
				'In verifica formale',
				'In liquidazione',
				'Liquidate'
			]
		];
		let dacontrattualizzare = 0,
			inrealizzazione = 0,
			inrevisione = 0,
			inverificatecnica = 0,
			inverificaformale = 0,
			inliquidazione = 0,
			liquidate = 0;
		dates.forEach((d) => {
			const valoredacontrattualizzare = filteredDaContrattualizzare
				.filter((f) => d.getFullYear() === f.anno && d.getMonth() + 1 === f.mese)
				.reduce(
					(acc, c) =>
						acc +
						(selectedMisura === ''
							? c.valore
							: selectedMisura === c.misura1
								? c.valorem1
								: selectedMisura === c.misura2
									? c.valorem2
									: selectedMisura === c.misura
										? c.valore
										: 0),
					0
				);
			const valoreinrealizzazione = filteredInRealizzazione
				.filter((f) => d.getFullYear() === f.anno && d.getMonth() + 1 === f.mese)
				.reduce(
					(acc, c) =>
						acc +
						(selectedMisura === ''
							? c.valore
							: selectedMisura === c.misura1
								? c.valorem1
								: selectedMisura === c.misura2
									? c.valorem2
									: selectedMisura === c.misura
										? c.valore
										: 0),
					0
				);
			const valoreinrevisione = filteredInRevisione
				.filter((f) => d.getFullYear() === f.anno && d.getMonth() + 1 === f.mese)
				.reduce(
					(acc, c) =>
						acc +
						(selectedMisura === ''
							? c.valore
							: selectedMisura === c.misura1
								? c.valorem1
								: selectedMisura === c.misura2
									? c.valorem2
									: selectedMisura === c.misura
										? c.valore
										: 0),
					0
				);
			const valoreinverificatecnica = filteredInVerificaTecnica
				.filter((f) => d.getFullYear() === f.anno && d.getMonth() + 1 === f.mese)
				.reduce(
					(acc, c) =>
						acc +
						(selectedMisura === ''
							? c.valore
							: selectedMisura === c.misura1
								? c.valorem1
								: selectedMisura === c.misura2
									? c.valorem2
									: selectedMisura === c.misura
										? c.valore
										: 0),
					0
				);
			const valoreinverificaformale = filteredInVerificaFormale
				.filter((f) => d.getFullYear() === f.anno && d.getMonth() + 1 === f.mese)
				.reduce(
					(acc, c) =>
						acc +
						(selectedMisura === ''
							? c.valore
							: selectedMisura === c.misura1
								? c.valorem1
								: selectedMisura === c.misura2
									? c.valorem2
									: selectedMisura === c.misura
										? c.valore
										: 0),
					0
				);
			const valoreinliquidazione = filteredInLiquidazione
				.filter((f) => d.getFullYear() === f.anno && d.getMonth() + 1 === f.mese)
				.reduce(
					(acc, c) =>
						acc +
						(selectedMisura === ''
							? c.valore
							: selectedMisura === c.misura1
								? c.valorem1
								: selectedMisura === c.misura2
									? c.valorem2
									: selectedMisura === c.misura
										? c.valore
										: 0),
					0
				);
			const valoreliquidate = filteredLiquidate
				.filter((f) => d.getFullYear() === f.anno && d.getMonth() + 1 === f.mese)
				.reduce(
					(acc, c) =>
						acc +
						(selectedMisura === ''
							? c.valore
							: selectedMisura === c.misura1
								? c.valorem1
								: selectedMisura === c.misura2
									? c.valorem2
									: selectedMisura === c.misura
										? c.valore
										: 0),
					0
				);
			dacontrattualizzare = dacontrattualizzare + valoredacontrattualizzare;
			inrealizzazione = inrealizzazione + valoreinrealizzazione;
			inrevisione = inrevisione + valoreinrevisione;
			inverificatecnica = inverificatecnica + valoreinverificatecnica;
			inverificaformale = inverificaformale + valoreinverificaformale;
			inliquidazione = inliquidazione + valoreinliquidazione;
			liquidate = liquidate + valoreliquidate;
			res.push([
				d,
				dacontrattualizzare,
				inrealizzazione,
				inrevisione,
				inverificatecnica,
				inverificaformale,
				inliquidazione,
				liquidate
			]);
		});
		return res;
	};

	$: datiDettaglioFinanziate = calcoladatiDettaglioFinanziate();

	$: calcoladatiDettaglioRinunciate = () => {
		const res = [
			[
				'Mese',
				'Rinunciate prima della contr.',
				'Rinunciate prima del completamento',
				'Rinunciate dopo il completamento',
				'Revocate'
			]
		];
		let rinunciateprecontr = 0,
			rinunciateprecompl = 0,
			rinunciatepostcompl = 0,
			revocate = 0;
		dates.forEach((d) => {
			const valorerinunciateprecontratto = filteredRinunciatePreContratto
				.filter((f) => d.getFullYear() === f.anno && d.getMonth() + 1 === f.mese)
				.reduce(
					(acc, c) =>
						acc +
						(selectedMisura === ''
							? c.valore
							: selectedMisura === c.misura1
								? c.valorem1
								: selectedMisura === c.misura2
									? c.valorem2
									: selectedMisura === c.misura
										? c.valore
										: 0),
					0
				);
			const valorerinunciateprecompletamento = filteredRinunciatePreCompletamento
				.filter((f) => d.getFullYear() === f.anno && d.getMonth() + 1 === f.mese)
				.reduce(
					(acc, c) =>
						acc +
						(selectedMisura === ''
							? c.valore
							: selectedMisura === c.misura1
								? c.valorem1
								: selectedMisura === c.misura2
									? c.valorem2
									: selectedMisura === c.misura
										? c.valore
										: 0),
					0
				);
			const valorerinunciatepostcompletamento = filteredRinunciatePostCompletamento
				.filter((f) => d.getFullYear() === f.anno && d.getMonth() + 1 === f.mese)
				.reduce(
					(acc, c) =>
						acc +
						(selectedMisura === ''
							? c.valore
							: selectedMisura === c.misura1
								? c.valorem1
								: selectedMisura === c.misura2
									? c.valorem2
									: selectedMisura === c.misura
										? c.valore
										: 0),
					0
				);
			const valorerevocate = filteredRevocate
				.filter((f) => d.getFullYear() === f.anno && d.getMonth() + 1 === f.mese)
				.reduce(
					(acc, c) =>
						acc +
						(selectedMisura === ''
							? c.valore
							: selectedMisura === c.misura1
								? c.valorem1
								: selectedMisura === c.misura2
									? c.valorem2
									: selectedMisura === c.misura
										? c.valore
										: 0),
					0
				);

			rinunciateprecontr = rinunciateprecontr + valorerinunciateprecontratto;
			rinunciateprecompl = rinunciateprecompl + valorerinunciateprecompletamento;
			rinunciatepostcompl = rinunciatepostcompl + valorerinunciatepostcompletamento;
			revocate = revocate + valorerevocate;

			res.push([d, rinunciateprecontr, rinunciateprecompl, rinunciatepostcompl, revocate]);
		});
		return res;
	};

	$: datiDettaglioRinunciate = calcoladatiDettaglioRinunciate();

	$: calcoladatiTotaleDettaglioFinanziate = () => {
		const res = [['Stato', 'Valore', { role: 'style' }, { role: 'annotation' }]];

		const valoredacontrattualizzare = filteredDaContrattualizzare.reduce(
			(acc, c) =>
				acc +
				(selectedMisura === ''
					? c.valore
					: selectedMisura === c.misura1
						? c.valorem1
						: selectedMisura === c.misura2
							? c.valorem2
							: selectedMisura === c.misura
								? c.valore
								: 0),
			0
		);
		const valoreinrealizzazione = filteredInRealizzazione.reduce(
			(acc, c) =>
				acc +
				(selectedMisura === ''
					? c.valore
					: selectedMisura === c.misura1
						? c.valorem1
						: selectedMisura === c.misura2
							? c.valorem2
							: selectedMisura === c.misura
								? c.valore
								: 0),
			0
		);
		const valoreinrevisione = filteredInRevisione.reduce(
			(acc, c) =>
				acc +
				(selectedMisura === ''
					? c.valore
					: selectedMisura === c.misura1
						? c.valorem1
						: selectedMisura === c.misura2
							? c.valorem2
							: selectedMisura === c.misura
								? c.valore
								: 0),
			0
		);
		const valoreinverificatecnica = filteredInVerificaTecnica.reduce(
			(acc, c) =>
				acc +
				(selectedMisura === ''
					? c.valore
					: selectedMisura === c.misura1
						? c.valorem1
						: selectedMisura === c.misura2
							? c.valorem2
							: selectedMisura === c.misura
								? c.valore
								: 0),
			0
		);
		const valoreinverificaformale = filteredInVerificaFormale.reduce(
			(acc, c) =>
				acc +
				(selectedMisura === ''
					? c.valore
					: selectedMisura === c.misura1
						? c.valorem1
						: selectedMisura === c.misura2
							? c.valorem2
							: selectedMisura === c.misura
								? c.valore
								: 0),
			0
		);
		const valoreinliquidazione = filteredInLiquidazione.reduce(
			(acc, c) =>
				acc +
				(selectedMisura === ''
					? c.valore
					: selectedMisura === c.misura1
						? c.valorem1
						: selectedMisura === c.misura2
							? c.valorem2
							: selectedMisura === c.misura
								? c.valore
								: 0),
			0
		);
		const valoreliquidate = filteredLiquidate.reduce(
			(acc, c) =>
				acc +
				(selectedMisura === ''
					? c.valore
					: selectedMisura === c.misura1
						? c.valorem1
						: selectedMisura === c.misura2
							? c.valorem2
							: selectedMisura === c.misura
								? c.valore
								: 0),
			0
		);

		const tot =
			valoredacontrattualizzare +
			valoreinrealizzazione +
			valoreinrevisione +
			valoreinverificatecnica +
			valoreinverificaformale +
			valoreinliquidazione +
			valoreliquidate;
		const colors = ['#48c78e', '#296fa8', '#296fa8', '#f14668', '#cc0f35', '#48c78e', '#257953'];
		res.push([
			'Da contrattualizzare',
			valoredacontrattualizzare,
			'color: ' + colors[0],
			percentuale(valoredacontrattualizzare / tot)
		]);
		res.push([
			'In realizzazione',
			valoreinrealizzazione,
			'color: ' + colors[0],
			percentuale(valoreinrealizzazione / tot)
		]);
		res.push([
			'In revisione',
			valoreinrevisione,
			'color: ' + colors[0],
			percentuale(valoreinrevisione / tot)
		]);
		res.push([
			'In verifica tecnica',
			valoreinverificatecnica,
			'color: ' + colors[0],
			percentuale(valoreinverificatecnica / tot)
		]);
		res.push([
			'In verifica formale',
			valoreinverificaformale,
			'color: ' + colors[0],
			percentuale(valoreinverificaformale / tot)
		]);
		res.push([
			'In liquidazione',
			valoreinliquidazione,
			'color: ' + colors[0],
			percentuale(valoreinliquidazione / tot)
		]);
		res.push([
			'Liquidate',
			valoreliquidate,
			'color: ' + colors[0],
			percentuale(valoreliquidate / tot)
		]);
		return res;
	};

	$: datiTotaleDettaglioFinanziate = calcoladatiTotaleDettaglioFinanziate();

	$: calcoladatiTotaleDettaglioRinunciateRevocate = () => {
		const res = [['Stato', 'Valore', { role: 'style' }, { role: 'annotation' }]];

		const valorerinunciateprecontratto = filteredRinunciatePreContratto.reduce(
			(acc, c) =>
				acc +
				(selectedMisura === ''
					? c.valore
					: selectedMisura === c.misura1
						? c.valorem1
						: selectedMisura === c.misura2
							? c.valorem2
							: selectedMisura === c.misura
								? c.valore
								: 0),
			0
		);
		const valorerinunciateprecompletamento = filteredRinunciatePreCompletamento.reduce(
			(acc, c) =>
				acc +
				(selectedMisura === ''
					? c.valore
					: selectedMisura === c.misura1
						? c.valorem1
						: selectedMisura === c.misura2
							? c.valorem2
							: selectedMisura === c.misura
								? c.valore
								: 0),
			0
		);
		const valorerinunciatepostcompletamento = filteredRinunciatePostCompletamento.reduce(
			(acc, c) =>
				acc +
				(selectedMisura === ''
					? c.valore
					: selectedMisura === c.misura1
						? c.valorem1
						: selectedMisura === c.misura2
							? c.valorem2
							: selectedMisura === c.misura
								? c.valore
								: 0),
			0
		);
		const valorerevocate = filteredRevocate.reduce(
			(acc, c) =>
				acc +
				(selectedMisura === ''
					? c.valore
					: selectedMisura === c.misura1
						? c.valorem1
						: selectedMisura === c.misura2
							? c.valorem2
							: selectedMisura === c.misura
								? c.valore
								: 0),
			0
		);

		const tot =
			valorerinunciateprecontratto +
			valorerinunciateprecompletamento +
			valorerinunciatepostcompletamento +
			valorerevocate;
		const colors = ['#f14668', '#f14668', '#f14668', '#cc0f35'];
		res.push([
			'Rinunciate prima della contr.',
			valorerinunciateprecontratto,
			'color: ' + colors[0],
			percentuale(valorerinunciateprecontratto / tot)
		]);
		res.push([
			'Rinunciate prima del completamento',
			valorerinunciateprecompletamento,
			'color: ' + colors[0],
			percentuale(valorerinunciateprecompletamento / tot)
		]);
		res.push([
			'Rinunciate dopo il completamento',
			valorerinunciatepostcompletamento,
			'color: ' + colors[0],
			percentuale(valorerinunciatepostcompletamento / tot)
		]);
		res.push([
			'Revocate',
			valorerevocate,
			'color: ' + colors[0],
			percentuale(valorerevocate / tot)
		]);

		return res;
	};

	$: datiTotaleDettaglioRinunciateRevocate = calcoladatiTotaleDettaglioRinunciateRevocate();

	onMount(async () => {
		await setscroll();
	});
</script>

<div class="container my-4">
	<h1>Board risorse</h1>
	<Cite
		text="Le misure dei vostri processi sono i vostri obiettivi per la qualità."
		author="Christopher Paris"
	/>
</div>

<div class="container">
	<div class="row">
		<div class="col-12 col-lg-2">
			<div data-bs-toggle="sticky" data-bs-stackable="true">
				<nav
					class="navbar it-navscroll-wrapper navbar-expand-lg it-bottom-navscroll it-right-side"
					data-bs-navscroll
				>
					<button
						class="custom-navbar-toggler"
						type="button"
						aria-controls="navbarNavProgress"
						aria-expanded="false"
						aria-label="Toggle navigation"
						data-bs-toggle="navbarcollapsible"
						data-bs-target="#navbarNavProgress"
					>
						<span class="it-list"></span>1. Riepilogo
					</button>
					<div class="progress custom-navbar-progressbar">
						<div
							class="progress-bar it-navscroll-progressbar"
							role="progressbar"
							aria-valuenow="0"
							aria-valuemin="0"
							aria-valuemax="100"
						></div>
					</div>
					<div class="navbar-collapsable" id="navbarNavProgress">
						<div class="overlay"></div>
						<button type="button" class="it-back-button btn w-100 text-start">
							<svg class="icon icon-sm icon-primary align-top"
								><use
									href="/svg/sprites.svg#it-chevron-left"
									xlink:href="/svg/sprites.svg#it-chevron-left"
								></use></svg
							>
							<span>Indietro</span>
						</button>
						<div class="menu-wrapper">
							<div class="link-list-wrapper">
								<h3>sezioni</h3>
								<div class="progress">
									<div
										class="progress-bar it-navscroll-progressbar"
										role="progressbar"
										aria-valuenow="0"
										aria-valuemin="0"
										aria-valuemax="100"
									></div>
								</div>
								<ul class="link-list">
									<li class="nav-item">
										<a class="nav-link active" href="#riepilogo">
											<span>1. Riepilogo </span>
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link active" href="#consumodellerisorse">
											<span>2. Consumo delle risorse </span>
										</a>
										<ul class="link-list">
											<li class="nav-link">
												<a class="nav-link" href="#risorsefinanziate">
													<span>2.1 Risorse finanziate </span>
												</a>
												<ul class="tertiary link-list">
													<li class="nav-link">
														<a class="nav-link" href="#dettagliorisorsefinanziate">
															<span>2.1.1 Dettaglio risorse finanziate </span>
														</a>
													</li>
												</ul>
											</li>
											<li class="nav-link">
												<a class="nav-link" href="#risorserinunciateorevocate">
													<span>2.2 Risorse rinunciate o revocate </span>
												</a>
												<ul class="tertiary link-list">
													<li class="nav-link">
														<a class="nav-link" href="#dettagliorisorserinunciate">
															<span>2.2.1 Dettaglio risorse rinunciate o revocate </span>
														</a>
													</li>
												</ul>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</div>
		<div class="col-12 col-lg-10 it-page-sections-container">
			<div class="it-page-section my-5" id="riepilogo">
				<h4>Riepilogo</h4>
			</div>
			<div class="sticky-top bg-white">
				<div class="row">
					<div class="col-12 col-lg-12 my-4">
						<div class="select-wrapper">
							<label for="filterMisura">Misure</label>
							<select id="filterMisura" name="filterMisura" bind:value={selectedMisura}>
								<option value="">Tutte le misure</option>
								{#each data.misure as m}
									<option value={m.Id}>{m.Name}</option>
								{/each}
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="it-page-section my-5" id="riepilogo">
				<div class="row">
					<div class="col-12 col-lg-4 my-4">
						<Scorecard
							title={euro(valore)}
							text="Dotazione finanziaria"
							bgcolor="primary"
							textcolor="white"
						/>
					</div>
					<div class="col-12 col-lg-4 my-4">
						<Scorecard
							title={euro(totaleFinanziate)}
							text="Finanziati"
							bgcolor="success"
							textcolor="white"
						/>
					</div>
					<div class="col-12 col-lg-4 my-4">
						<Scorecard
							title={euro(totaleRinunciate + totaleRevocate)}
							text="Rinunciati o revocati"
							bgcolor="danger"
							textcolor="white"
						/>
					</div>
				</div>
			</div>
			<div class="it-page-section my-5" id="consumodellerisorse">
				<h4>Consumo delle risorse</h4>
				<p>
					Il grafico mostra l'andamento del consumo delle risorse, secondo i criteri impostati nei
					filtri e mostra, in maniera cumulativa nel tempo, tenendo conto sia dei finanziamenti sia
					delle rinunce (o revoche).
				</p>
				<div class="my-5">
					<Areachart
						id="consumo"
						title="Consumo delle risorse"
						colors={['#3e8ed0']}
						values={datiResiduo}
					/>
				</div>
			</div>
			<div class="it-page-section my-5" id="risorsefinanziate">
				<h5>Risorse finanziate</h5>
				<p>
					Il grafico mostra l'andamento delle risorse finanziate, secondo i criteri impostati nei
					filtri, in maniera cumulativa nel tempo.
				</p>
				<div class="my-5">
					<Areachart
						stacked={true}
						id="finanziate"
						title="Finanziate"
						colors={['#48c78e']}
						values={datiFinanziate}
					/>
				</div>
			</div>
			<div class="it-page-section my-5" id="dettagliorisorsefinanziate">
				<h6>Dettaglio delle risorse finanziate</h6>
				<p>Il grafico mostra la ripartizione attuale delle risorse finanziate</p>
				<div class="my-5">
					<Barchart
						id="dettaglio-totale-finanziate"
						title="Ripartizione finanziate"
						titleColor="#3e8ed0"
						values={datiTotaleDettaglioFinanziate}
						direction="horizontal"
						colors={['#3e8ed0', '#296fa8', '#296fa8', '#f14668', '#cc0f35', '#48c78e', '#257953']}
					></Barchart>
				</div>
			</div>
			<div class="it-page-section my-5" id="risorserinunciateorevocate">
				<h5>Risorse rinunciate o revocate</h5>
				<p>
					Il grafico mostra l'andamento delle risorse rinunciate o revocate, secondo i criteri
					impostati nei filtri, in maniera cumulativa nel tempo.
				</p>
				<div class="my-5">
					<Areachart
						id="rinunciaterevocate"
						title="Rinunciate o revocate"
						colors={['#f14668']}
						values={datiRinunciateRevocate}
					/>
				</div>
			</div>

			<div class="it-page-section my-5" id="dettagliorisorserinunciate">
				<h6>Dettaglio delle risorse rinunciate (o revocate)</h6>
				<p>Il grafico mostra la ripartizione attuale delle risorse rinunciate o revocate</p>
				<div class="my-5">
					<Barchart
						id="dettaglio-totale-rinunciate"
						title="Ripartizione rinunciate e revocate"
						titleColor="#f14668"
						values={datiTotaleDettaglioRinunciateRevocate}
						direction="horizontal"
						colors={['#f14668', '#cc0f35', '#f14668', '#cc0f35']}
					></Barchart>
				</div>
			</div>
		</div>
	</div>
</div>
