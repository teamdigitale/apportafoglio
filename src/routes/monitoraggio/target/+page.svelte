<script>
	import Cite from '$lib/c/cite.svelte';

	export let data;


	import { onMount } from 'svelte';
	import Target1_2 from './target1_2.svelte';
	import Target1_4_1 from './target1_4_1.svelte';

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
	<h1>Board target</h1>
	<Cite
		text="Se vuoi una vita felice devi dedicarla a un obiettivo, non a delle persone o a delle cose."
		author="Albert Einstein"
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
						<span class="it-list"></span>1. Monitoraggio target
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
											<span>Monitoraggio target </span>
										</a>
										<ul class="link-list">
											<li class="nav-link">
												<a class="nav-link" href="#target1_2">
													<span>Target 1.2 </span>
												</a>
											</li>
											<li class="nav-link">
												<a class="nav-link" href="#target1_4_1">
													<span>Target 1.4.1</span>
												</a>
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
				<h4>Monitoraggio dei target</h4>
				
			</div>
			<div class="it-page-section my-5" id="target1_2">
				<h5>Target 1.2</h5>
				<p>
					Nam dapibus libero vitae nunc placerat pretium. Praesent sed suscipit augue. Integer
					ultrices interdum consequat. Phasellus nisl lacus, bibendum quis consectetur a,
					ullamcorper non ipsum.
				</p>
				<div class="col-12 col-lg-10 it-page-sections-container">
					<Target1_2
						target={data.t.targets.filter((t) => t.id === 'targetM1C1_139')[0]}
						values={data.targetM1C1_139}
					/>
					<Target1_2
						target={data.t.targets.filter((t) => t.id === 'targetM1C1_147')[0]}
						values={data.targetM1C1_147}
					/>
				</div>
			</div>
			<div class="it-page-section my-5" id="target1_4_1">
				<h5>Target 1.4.1</h5>
				<p>
					Nam dapibus libero vitae nunc placerat pretium. Praesent sed suscipit augue. Integer
					ultrices interdum consequat. Phasellus nisl lacus, bibendum quis consectetur a,
					ullamcorper non ipsum.
				</p>
				<div class="col-12 col-lg-10 it-page-sections-container">
					<Target1_4_1
						target={data.t.targets.filter((t) => t.id === 'targetM1C1_140')[0]}
						values={data.targetM1C1_140}
						platea={data.platee.filter(p => p.tipologia_ente==='Comuni' ||p.tipologia_ente==='Scuole')}
					/>
					<Target1_4_1
						target={data.t.targets.filter((t) => t.id === 'targetM1C1_148')[0]}
						values={data.targetM1C1_148}
						platea={data.platee.filter(p => p.tipologia_ente==='Comuni' ||p.tipologia_ente==='Scuole')}
					/>
				</div>
			</div>
		</div>
		
	</div>
</div>
