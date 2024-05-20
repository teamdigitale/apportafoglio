<script>
	// @ts-nocheck
	import Cite from '$lib/c/cite.svelte';
	import { onMount } from 'svelte';
	import moment from 'moment/min/moment-with-locales';
	moment.locale('it');

	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/day-grid';

	export let data;

	let events = data.calendario.map((x) => ({
		id: x.Id,
		allDay: true,
		title: 'Assessment ' + x.ANA_Ente__c,
		start: new Date(x.ANA_Data_Assessment__c),
		end: new Date(x.ANA_Data_Assessment__c)
	}));

	let plugins = [TimeGrid];
	let options = {
		view: 'dayGridMonth',
		buttonText: {
			close: 'Close',
			dayGridMonth: 'month',
			listDay: 'list',
			listMonth: 'list',
			listWeek: 'list',
			listYear: 'list',
			resourceTimeGridDay: 'day',
			resourceTimeGridWeek: 'week',
			timeGridDay: 'day',
			timeGridWeek: 'week',
			today: 'oggi'
		},
		firstDay: 1,
		nowIndicator: true,
		events: events
	};

	onMount(async () => {
		await setscroll();
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
	<h1>Assessment</h1>
	<Cite text="Chi non accetta consiglio non può essere aiutato." author="Benjamin Franklin" />
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
						<span class="it-list"></span>1. Calendario
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
										<a class="nav-link active" href="#calendario">
											<span>1. Calendario </span>
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
			<div class="it-page-section my-5" id="calendario">
				<h4>Calendario</h4>
				<p>In questa sezione...</p>

				<div class="row">
					<div class="col-12 col-lg-12 my-4">
						<Calendar {plugins} {options} />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	h4.ec-event-title {
		font-size: 0.75rem;
		line-height: 0.8rem;
		color: brown;
	}
</style>
