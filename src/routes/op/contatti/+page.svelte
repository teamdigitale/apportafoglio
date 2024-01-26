<script>
	// @ts-nocheck

	import Cite from '$lib/c/cite.svelte';
	import { euro } from '$lib/js/shared';

	import { onMount } from 'svelte';
	import moment from 'moment/min/moment-with-locales';
	import Stackedbar from '$lib/c/charts/stackedbar.svelte';
	import Pagination from '$lib/c/pagination.svelte';
	moment.locale('it');

	export let data;
	let cperpage;
	let cp = 0;

	/**
	 * @param {Date} startDate
	 * @param {Date} endDate
	 */
	function getDatesBetween(startDate, endDate) {
		let currentDate = moment(startDate).clone().startOf('day');
		const dates = [];
		while (currentDate <= endDate) {
			dates.push(moment(new Date(currentDate)).clone().startOf('day'));
			currentDate = currentDate.add(1, 'd');
		}
		return dates;
	}

	const rangeOptions = [
		'Questo mese',
		'Dal mese scorso',
		'Questo quarter',
		'Questo anno',
		'Sempre'
	];
	let range = rangeOptions[0];

	$: rangeMin =
		range === 'Questo mese'
			? moment().startOf('month').toDate()
			: range === 'Dal mese scorso'
				? moment().startOf('month').subtract(1, 'months').toDate()
				: range === 'Questo quarter'
					? moment().startOf('quarter').toDate()
					: range === 'Questo anno'
						? moment().startOf('year').toDate()
						: moment().startOf('year').subtract(3, 'months').toDate();

	$: rangeMax = moment().toDate();

	$: dates = getDatesBetween(rangeMin, rangeMax);

	$: filteredContatti = data.contatti.filter(function (c) {
		return moment(c.CreatedDate).isAfter(moment(rangeMin));
	});

	$: result = [[]];

	$: cdataforchart = () => {
		cp = 0;
		// @ts-ignore
		result = [['Data', 'Numero contatti']];
		dates.forEach((d) => {
			result.push([
				moment(d).format('DD/MM/YYYY'),
				filteredContatti.filter(
					(c) =>
						moment(c.CreatedDate).startOf('day').toDate().getDate() ===
						moment(d).startOf('day').toDate().getDate()
				).length
			]);
		});
	};

	let topten = data.contatti
		.reduce((b, a) => {
			let index = b.findIndex((j) => j.ente === a.Account.Name);
			if (index > -1) b[index].count++;
			else b.push({ ente: a.Account.Name, count: 1 });
			return b;
		}, [])
		.sort((a, b) => {
			return Number(a.count) < Number(b.count) ? 1 : Number(a.count) > Number(b.count) ? -1 : 0;
		})
		.filter((x, index) => index < 10);

	let worstten = data.contatti
		.reduce((b, a) => {
			let index = b.findIndex((j) => j.ente === a.Account.Name);
			if (index > -1) b[index].count++;
			else b.push({ ente: a.Account.Name, count: 1 });
			return b;
		}, [])
		.sort((a, b) => {
			return Number(a.count) < Number(b.count) ? -1 : Number(a.count) > Number(b.count) ? 1 : 0;
		})
		.filter((x, index) => index < 10);

	let getTopTen = () => {
		const result = [['Ente', 'Numero contatti']];
		topten.forEach((e) => {
			result.push([e.ente, e.count]);
		});
		return result;
	};

	function getWorstTen() {
		const result = [['Ente', 'Numero contatti']];
		worstten.forEach((e) => {
			result.push([e.ente, e.count]);
		});
		return result;
	}

	onMount(async () => {
		await setscroll();
		cdataforchart();
	});

	const setscroll = async () => {
		var navscrollElement = document.querySelector('.it-navscroll-wrapper');
		var navscroll = bootstrap.NavScroll.getOrCreateInstance(navscrollElement);
		navscroll.setScrollPadding(function () {
			var header = document.querySelector('.it-header-wrapper');
			return header.offsetHeight + 10;
		});
	};
</script>

<div class="container my-4">
	<h1>Contatti</h1>
	<Cite
		text="Un manager con il cellulare entrò in una cabina telefonica e pianse di nostalgia."
		author="Federico Bini"
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
										<a class="nav-link active" href="#topten">
											<span>2. I più contattati </span>
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link active" href="#worstten">
											<span>3. I meno contattati </span>
										</a>
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
				<p>
					In questa sezione puoi consultare i contatti con gli Enti che hai registrato. Puoi vedere
					i contatti anche in base ad un periodo temporale a tua scelta.
				</p>
				<div class="row">
					<div class="col-12 col-lg-8 my-4">
						<div class="select-wrapper">
							<label for="filterRange">Periodo</label>
							<select
								id="filterRange"
								name="filterRange"
								bind:value={range}
								on:change={cdataforchart}
							>
								{#each rangeOptions as a}
									<option value={a}>{a}</option>
								{/each}
							</select>
						</div>
					</div>
					<div class="col-12 col-lg-4 my-4">
						{moment(rangeMin).format('DD/MM/YYYY')} - {moment(rangeMax).format('DD/MM/YYYY')}
					</div>
				</div>
				<div class="row">
					<div class="col-12 col-lg-12 my-4">
						<Stackedbar values={result} id="contatti" direction="vertical" />
					</div>
				</div>
				<div class="row">
					<div class="col-12 col-lg-12 my-4">
						<div class="table-responsive">
							<table class="table table-hover table-sm caption-top align-middle">
								<caption>Contatti risultanti in base al periodo impostato</caption>
								<thead>
									<tr>
										<th>Data</th>
										<th>Ente</th>
										<th>Tipo</th>
										<th>Oggetto</th>
										<th>Descrizione</th>
									</tr>
								</thead>
								<tbody>
									{#if cperpage}
										{#each cperpage as d}
											<tr>
												<td><small>{moment(d.CreatedDate).format('DD/MM/YYYY')}</small></td>
												<td><small>{d.Account.Name}</small></td>
												<td>
													<svg class="icon icon-xs"
														><use
															href="/svg/sprites.svg#it-{d.Tipo === 'Contatto diretto'
																? 'telephone'
																: 'calendar'}"
														></use></svg
													>
												</td>
												<td><small>{d.Subject ? d.Subject : 'n.d.'}</small></td>
												<td><small>{d.Description ? d.Description : 'n.d.'}</small></td>
											</tr>
										{/each}
									{/if}
								</tbody>
								<tfoot>
									<tr>
										<th colspan="8"
											><Pagination
												rows={filteredContatti}
												bind:cp
												perPage={10}
												bind:trimmedRows={cperpage}
											/></th
										>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div class="it-page-section my-5" id="topten">
				<h4>I dieci più contattati di sempre</h4>
				<ol>
					{#each getTopTen() as a, index}
						{#if index > 0}
							<li>{a[0]}: <strong>{a[1]}</strong></li>
						{/if}
					{/each}
				</ol>
			</div>
			<div class="it-page-section my-5" id="worstten">
				<h4>I dieci meno contattati di sempre</h4>
				<ol>
					{#each getWorstTen() as a, index}
						{#if index > 0}
							<li>{a[0]}: <strong>{a[1]}</strong></li>
						{/if}
					{/each}
				</ol>
			</div>
		</div>
	</div>
</div>
