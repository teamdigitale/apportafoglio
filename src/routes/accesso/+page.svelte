<script>
	import Usercard from '$lib/c/usercard.svelte';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	
	onMount(async () => {

		if (data.refresh) {
			setTimeout(function() {invalidate("/accesso")}, 1000);
			
		}
	});
	
	
</script>

<div class="container my-4 text-center">
	{#if data.sessionerror}
		{data.sessionerror}
	{/if}

	{#if !data.loggedstandard}
		<!--
	<form method="POST" action="?/loginstandard">
		<h2>Utente principale</h2>
		<div class="my-5">
			<div class="row">
				<div class="form-group col-md-4">
					<label for="emailstandard" class="active">Email</label>
					<input
						type="email"
						class="form-control"
						id="emailstandard"
						name="emailstandard"
						placeholder="inserisci il tuo indirizzo email"
						value=""
					/>
				</div>
				<div class="form-group col-md-4">
					<label for="passwordstandard" class="active">Password</label>
					<input
						type="password"
						data-bs-input
						class="form-control input-password"
						id="passwordstandard"
						name="passwordstandard"
						placeholder="inserisci la tua password"
						value=""
					/>
					<span class="password-icon" aria-hidden="true">
						<svg class="password-icon-visible icon icon-sm">
							<use href="/svg/sprites.svg#it-password-visible"></use>
						</svg>
						<svg class="password-icon-invisible icon icon-sm d-none">
							<use href="/svg/sprites.svg#it-password-invisible"></use>
						</svg>
					</span>
				</div>
				<div class="form-group col-md-4">
					<label for="tokenstandard" class="active">Token</label>
					<input
						type="password"
						data-bs-input
						class="form-control input-password"
						id="tokenstandard"
						name="tokenstandard"
						placeholder="inserisci il tuo token"
						value=""
					/>
					<span class="password-icon" aria-hidden="true">
						<svg class="password-icon-visible icon icon-sm">
							<use href="/svg/sprites.svg#it-password-visible"></use>
						</svg>
						<svg class="password-icon-invisible icon icon-sm d-none">
							<use href="/svg/sprites.svg#it-password-invisible"></use>
						</svg>
					</span>
				</div>
			</div>

			<div class="row mt-4">
				<div class="form-group col text-center">
					<button type="button" class="btn btn-outline-primary">Ho cambiato idea</button>
					<button type="submit" class="btn btn-primary">Confermo i dati</button>
				</div>
			</div>
		</div>
	</form>
	-->

		<p>
			<a href="/api/oauth/" class="text-decoration-none fw-bold" data-sveltekit-preload-data="off">
				<figure class="figure">
					<img
						src="/salesforce.com_logo.svg"
						class="figure-img img-fluid rounded"
						alt="Logo di salesforce"
					/>
					<figcaption class="figure-caption text-end">
						Accedi con le tue credenziali SalesForce
					</figcaption>
				</figure>
				<br />Accedi
				<span class="mx-3"
					><svg class="icon icon-primary icon-sm align-middle"
						><use href="/svg/sprites.svg#it-external-link"></use></svg
					></span
				></a
			>
		</p>
	{:else}
		<form method="POST" action="?/logoutstandard">
			<Usercard utente={data.utentestandard} tipo="primario" />
		</form>
	{/if}

	<!--
{#if !data.loggedasseveratore}
	<form method="POST" action="?/loginasseveratore">
		<h2>Utente asseveratore</h2>
		<div class="my-5">
			<div class="row">
				<div class="form-group col-md-4">
					<label for="emailasseveratore" class="active">Email</label>
					<input
						type="email"
						class="form-control"
						id="emailasseveratore"
						name="emailasseveratore"
						placeholder="inserisci il tuo indirizzo email"
						value=""
					/>
				</div>
				<div class="form-group col-md-4">
					<label for="passwordasseveratore" class="active">Password</label>
					<input
						type="password"
						data-bs-input
						class="form-control input-password"
						id="passwordasseveratore"
						name="passwordasseveratore"
						placeholder="inserisci la tua password"
						value=""
					/>
					<span class="password-icon" aria-hidden="true">
						<svg class="password-icon-visible icon icon-sm">
							<use href="/svg/sprites.svg#it-password-visible"></use>
						</svg>
						<svg class="password-icon-invisible icon icon-sm d-none">
							<use href="/svg/sprites.svg#it-password-invisible"></use>
						</svg>
					</span>
				</div>
				<div class="form-group col-md-4">
					<label for="tokenasseveratore" class="active">Token</label>
					<input
						type="password"
						data-bs-input
						class="form-control input-password"
						id="tokenasseveratore"
						name="tokenasseveratore"
						placeholder="inserisci il tuo token"
						value=""
					/>
					<span class="password-icon" aria-hidden="true">
						<svg class="password-icon-visible icon icon-sm">
							<use href="/svg/sprites.svg#it-password-visible"></use>
						</svg>
						<svg class="password-icon-invisible icon icon-sm d-none">
							<use href="/svg/sprites.svg#it-password-invisible"></use>
						</svg>
					</span>
				</div>
			</div>

			<div class="row mt-4">
				<div class="form-group col text-center">
					<button type="button" class="btn btn-outline-primary">Ho cambiato idea</button>
					<button type="submit" class="btn btn-primary">Confermo i dati</button>
				</div>
			</div>
		</div>
	</form>
{:else}
	<form method="POST" action="?/logoutasseveratore">
        <Usercard utente={data.utenteasseveratore} tipo="asseveratore" />
	</form>
{/if}
-->
</div>
