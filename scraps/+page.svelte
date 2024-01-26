<div class="container my-4">
	<h1>Lorem Ipsum</h1>
	<p>
		Ab illo tempore, ab est sed immemorabili.<br />
		Ullamco laboris nisi ut aliquid ex ea commodi consequat.<br />
		Quis aute iure reprehenderit in voluptate velit esse.<br />
		Petierunt uti sibi concilium totius Galliae in diem certam indicere.
	</p>
	<p>Pellentesque habitant morbi tristique senectus et netus.</p>
	<h2>Esempio di Card</h2>
	<div class="my-5">
		<div class="container">
			<div class="row">
				<div class="col-12 col-md-6 col-lg-4">
					<!--start card-->
					<div class="card-wrapper card-space">
						<div class="card card-bg card-big">
							<div class="card-body">
								<div class="top-icon">
									<svg class="icon">
										<use href="/svg/sprites.svg#it-card"></use>
									</svg>
								</div>
								<h3 class="card-title h5">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor…
								</h3>
								<p class="card-text">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua.
								</p>
								<a class="read-more" href="#">
									<span class="text">Leggi di più</span>
									<span class="visually-hidden"
										>su Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
										tempor…</span
									>
									<svg class="icon">
										<use href="/svg/sprites.svg#it-arrow-right"></use>
									</svg>
								</a>
							</div>
						</div>
					</div>
					<!--end card-->
				</div>
			</div>
		</div>
	</div>
	<h2>Esempio di Form</h2>
	<div class="my-5">
		<div class="row">
			<div class="form-group col-md-6">
				<label for="inputEmail4" class="active">Email</label>
				<input
					type="email"
					class="form-control"
					id="inputEmail4"
					placeholder="inserisci il tuo indirizzo email"
				/>
			</div>
			<div class="form-group col-md-6">
				<label for="exampleInputPassword" class="active">Password</label>
				<input
					type="password"
					data-bs-input
					class="form-control input-password"
					id="exampleInputPassword"
					placeholder="inserisci la tua password"
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
		<div class="row">
			<div class="form-group col">
				<label for="inputAddress" class="active">Indirizzo</label>
				<input type="text" class="form-control" id="inputAddress" placeholder="Via Roma, 1" />
			</div>
		</div>
		<div class="row">
			<div class="form-group col-md-6">
				<label for="inputCity">Comune</label>
				<input type="text" class="form-control" id="inputCity" />
			</div>
			<div class="form-group col-md-2">
				<label for="inputCAP">CAP</label>
				<input type="text" class="form-control" id="inputCAP" />
			</div>
			<div class="form-group col-md-4">
				<div class="select-wrapper">
					<label for="selectID">Provincia</label>
					<select id="selectID">
						<option value="Value 1">Opzione 1</option>
						<option value="Value 2">Opzione 2</option>
						<option value="Value 3">Opzione 3</option>
						<option value="Value 4">Opzione 4</option>
						<option value="Value 5">Opzione 5</option>
					</select>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="form-group col-12 col-md-6">
				<div class="form-check">
					<div class="toggles">
						<label for="toggleEsempio1a">
							Label dell'interruttore 1
							<input type="checkbox" id="toggleEsempio1a" />
							<span class="lever"></span>
						</label>
					</div>
				</div>
			</div>
		</div>
		<div class="row mt-4">
			<div class="form-group col text-center">
				<button type="button" class="btn btn-outline-primary">Annulla</button>
				<button type="submit" class="btn btn-primary">Conferma</button>
			</div>
		</div>
	</div>
</div>
