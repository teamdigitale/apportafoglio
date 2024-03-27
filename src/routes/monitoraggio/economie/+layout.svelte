<script>

	import Cite from "$lib/c/cite.svelte";
    export let data;
    let selectedMisura = data.selectedMisura;

	import { onMount } from 'svelte';
	import { goto } from "$app/navigation";

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

	const changeMisura = () => {
		if(selectedMisura==='1.4.1 Esperienza del cittadino nei servizi pubblici'){
			goto('/monitoraggio/economie/141/');
		}else if (selectedMisura==='1.3.1 Piattaforma Digitale Nazionale Dati'){
			goto('/monitoraggio/economie/131/');
		}
		else{
			goto('/monitoraggio/economie/12/');
		}
	}

</script>

{selectedMisura}
<div class="container my-4">
	<h1>Economie misure</h1>
	<Cite
		text="Chi misura il suo stato non sarà mai mendico."
		author="Giulio Cesare Croce"
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
						<span class="it-list"></span>1. Misura
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
										<a class="nav-link active" href="#misure">
											<span>1. Misura </span>
										</a>
										<a class="nav-link active" href="#riepilogo">
											<span>2. Riepilogo </span>
										</a>
										<a class="nav-link active" href="#potenziali">
											<span>3. Potenziali </span>
										</a>
										<a class="nav-link active" href="#stima">
											<span>4. Stima </span>
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
            <div class="it-page-section my-5" id="misure">
                <h4>Misura {selectedMisura}</h4>
                <div class="col-12 col-lg-12 my-4">
                    <div class="select-wrapper">
                        <label for="filterMisura">Misure</label>
                        <select id="filterMisura" name="filterMisura" bind:value={selectedMisura} on:change={changeMisura}>
                            <option value="" >Tutte le misure</option>
                            {#each data.misure as m}
                                <option value={m.Name}>{m.Name}</option>
                            {/each}
                        </select>
                    </div>
                </div>
            </div>
			<slot />
		</div>
	</div>
</div>