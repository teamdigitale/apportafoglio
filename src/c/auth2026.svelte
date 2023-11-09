<script>
    export let tipoutente = "";
    export let logged = false;
    export let errorMessageStandard = "";
    export let errorMessageAsseveratore = "";
    export let utenteSF;

    let email = "";
    let password = "";
    let token = "";

    $: emailValid = email && email.trim().length > 0;
    $: passwordValid = password && password.trim().length > 3;
    $: tokenValid = token && token.trim().length > 3;
    $: submitValid = logged ? true : emailValid && passwordValid && tokenValid;

    let hidemessage = () => {
        errorMessageStandard = "";
        errorMessageAsseveratore = "";
    };
</script>

<form method="POST" action={logged ? "?/logout" : "?/login"}>
    <input type="hidden" bind:value={tipoutente} name="tipoutente" />
    <div class="card has-background-grey-lighter">
        <header class="card-header has-background-primary">
            <h1 class="card-header-title">
                <p class="title">utente {tipoutente}</p>
            </h1>
        </header>
        <div class="card-content">
            <div class="content">
                {#if logged && utenteSF}
                    <div class="columns">
                        <div
                            class="column is-one-third has-text-weight-bold"
                        >
                            username:
                        </div>
                        <div class="column">{utenteSF.Username}</div>
                    </div>
                    <div class="columns">
                        <div
                            class="column is-one-third has-text-weight-bold"
                        >
                            nome:
                        </div>
                        <div class="column">{utenteSF.Name}</div>
                    </div>
                    <div class="columns">
                        <div
                            class="column is-one-third has-text-weight-bold"
                        >
                            email:
                        </div>
                        <div class="column">{utenteSF.Email}</div>
                    </div>
                    <div class="columns">
                        <div
                            class="column is-one-third has-text-weight-bold"
                        >
                            qualifica:
                        </div>
                        <div class="column">{utenteSF.Title}</div>
                    </div>
                {:else}
                    <div class="field">
                        <label class="label" for={"email" + tipoutente}
                            >email</label
                        >
                        <div class="control has-icons-left">
                            <input
                                autocomplete="on"
                                id={"email" + tipoutente}
                                name="email"
                                class="input {emailValid
                                    ? 'is-success'
                                    : 'is-danger'}"
                                type="text"
                                placeholder="email usata per accedere a pa2026"
                                bind:value={email}
                            />
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope" />
                            </span>
                        </div>
                        {#if emailValid}
                            <p class="help is-success">email valida</p>
                        {:else}
                            <p class="help is-danger">email non valida</p>
                        {/if}
                    </div>

                    <div class="field">
                        <label class="label" for={"password" + tipoutente}
                            >password</label
                        >
                        <div class="control has-icons-left">
                            <input
                                autocomplete="on"
                                id={"password" + tipoutente}
                                name="password"
                                class="input {passwordValid
                                    ? 'is-success'
                                    : 'is-danger'}"
                                type="password"
                                placeholder="password usata per accedere a pa2026"
                                bind:value={password}
                            />
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock" />
                            </span>
                        </div>
                        {#if passwordValid}
                            <p class="help is-success">password valida</p>
                        {:else}
                            <p class="help is-danger">password non valida</p>
                        {/if}
                    </div>

                    <div class="field">
                        <label class="label" for={"token" + tipoutente}
                            >token</label
                        >
                        <div class="control has-icons-left">
                            <input
                                autocomplete="on"
                                id={"token" + tipoutente}
                                name="token"
                                class="input {tokenValid
                                    ? 'is-success'
                                    : 'is-danger'}"
                                type="password"
                                placeholder="token recuperato da pa2026"
                                bind:value={token}
                            />
                            <span class="icon is-small is-left">
                                <i class="fas fa-key" />
                            </span>
                        </div>
                        {#if tokenValid}
                            <p class="help is-success">token valido</p>
                        {:else}
                            <p class="help is-danger">token non valido</p>
                        {/if}
                    </div>
                {/if}
            </div>
            <div class="field">
                <div class="control">
                    <button class="button is-link" disabled={!submitValid}
                        >{logged && utenteSF ? "disconnettiti" : "connettiti"}</button
                    >
                </div>
            </div>
        </div>
        {#if tipoutente == "standard" && errorMessageStandard && errorMessageStandard.length > 0}
            <div class="field">
                <article class="message is-danger">
                    <div class="message-header">
                        <p>errore</p>
                        <button
                            class="delete"
                            aria-label="delete"
                            on:click={hidemessage}
                        />
                    </div>
                    <div class="message-body">
                        {errorMessageStandard}
                    </div>
                </article>
            </div>
        {/if}
        {#if tipoutente != "standard" && errorMessageAsseveratore && errorMessageAsseveratore.length > 0}
            <div class="field">
                <article class="message is-danger">
                    <div class="message-header">
                        <p>errore</p>
                        <button
                            class="delete"
                            aria-label="delete"
                            on:click={hidemessage}
                        />
                    </div>
                    <div class="message-body">
                        {errorMessageAsseveratore}
                    </div>
                </article>
            </div>
        {/if}

    </div>
</form>
