<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import SchedaDomanda from './SchedaDomanda.svelte';
	import map_quest from './map_quest.json';



	export let data;

	let survey = data.survey;

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

	const contieneControlli = (p) => {};
</script>

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
						<span class="it-list"></span>1. Menu
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
									{#each survey.pages.filter((x) => x.title !== 'ANAGRAFICA' && x.title !== 'GOVERNANCE E INNOVAZIONE') as p}
										<li class="nav-item">
											<a class="nav-link active" href="#heading-{p.id}">
												<span>{p.title}</span>
											</a>
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</div>

		<div class="col-12 col-lg-10 it-page-sections-container">
            <h2>Criteri di alert e warning</h2>
            <p>Nelle sezioni seguenti vengono riportate le domande per le quali vengono fatti controlli di alert o warning, indicandone la logica.</p>
			{#each survey.pages.filter((x) => x.title !== 'ANAGRAFICA' && x.title !== 'GOVERNANCE E INNOVAZIONE') as p}
				<h5 id="heading-{p.id}">{p.title}</h5>
				{#each survey.questions.filter((x) => x.page_number === p.id) as q}
					<SchedaDomanda {q} questdef={map_quest.data.find((x) => x.id === q.id)} />
				{/each}
				<div class="domanda-item"></div>
			{/each}
		</div>
	</div>
</div>
