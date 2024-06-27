<script>
	import { areaManager } from '$lib/js/shared';
	import GeoViewer from './geo/GeoViewer.svelte';

	// @ts-nocheck

	export let utente;
	export let tipo;
</script>

<div class="row my-8">
	<div class="col-12 col-lg-12">
		<!--start card-->
		<div class="card-wrapper card-space">
			<div class="card rounded shadow border-bottom-card">
				<div class="card-body">
					<div class="row">
						<div class="col-12 col-lg-6">
							<div class="head-tags">
								<p class="card-tag">
									{tipo}
								</p>
							</div>
							<div class="avatar-wrapper avatar-extra-text">
								<div class="avatar size-xxl">
									<img
										src={'/api/img/' + encodeURIComponent(utente.FullPhotoUrl)}
										alt={utente.Name}
										aria-hidden="true"
									/>
								</div>
								<div class="extra-text">
									<h4>{utente.Name}</h4>
									<h6>{utente.Title ? utente.Title : ''}</h6>
								</div>
							</div>
						</div>
						{#if areaManager(utente.idsf)}
						<div class="col-12 col-lg-6">
						
							<GeoViewer selectedArea={areaManager(utente.idsf).area} selectedRegion=""  />
						
						
						</div>
						{/if}
					</div>
					<div class="it-card-footer">
						<button class="btn btn-info btn-xs btn-icon ms-1">
							<span>Fammi uscire</span>
							<svg class="icon icon-white ms-1"><use href="/svg/sprites.svg#it-logout"></use></svg>
						</button>
					</div>
				</div>
			</div>
		</div>
		<!--end card-->
	</div>
</div>

<style>

</style>
