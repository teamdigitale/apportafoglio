<script>
  import { navigating } from "$app/stores";
  export let data;
  let menuActive = false;
  import { page } from "$app/stores";
  import BackToTop from "$lib/c/ui/BackToTop.svelte";
  $: loggedstandard = data.loggedstandard;
  $: loggedasseveratore = data.loggedasseveratore;

  
</script>

<nav class="navbar is-fixed-top" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item is-link" href="/">
      <figure class="image is-28x28 mx-2">
        <img src="/site-logo.svg" alt="logo" />
      </figure>
      <h1 class="title has-text-info">APPortafoglio</h1>
    </a>

    <!-- svelte-ignore a11y-interactive-supports-focus -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-missing-attribute -->
    <a
      role="button"
      class="navbar-burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbar"
      on:click={() => (menuActive = !menuActive)}

    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </a>
  </div>

  <div id="navbar" class="navbar-menu {menuActive ? 'is-active' : ''}">
    <div class="navbar-start"  data-sveltekit-preload-data="off">
      <a
        class="navbar-item {$page.url.pathname === '/io'
          ? 'has-text-link'
          : 'has-text-grey'}"
        href="/io"
        aria-current={$page.url.pathname === "/io"}
        on:click={() => (menuActive = !menuActive)}
      >
        <span class="icon">
          <i class="fas fa-user" aria-hidden="true" />
        </span>&nbsp;io
      </a>
      <a
        class="navbar-item {$page.url.pathname === '/opendata'
          ? 'has-text-link'
          : 'has-text-grey'}"
        href="/opendata"
        aria-current={$page.url.pathname === "/opendata"}
        on:click={() => (menuActive = !menuActive)}
      >
        <span class="icon">
          <i class="fas fa-database" aria-hidden="true" />
        </span>&nbsp;open data
      </a>
      <a
      class="navbar-item {$page.url.pathname === '/entiipa'
        ? 'has-text-link'
        : 'has-text-grey'}"
      href="/entiipa"
      aria-current={$page.url.pathname === "/entiipa"}
      on:click={() => (menuActive = !menuActive)}
    >
      <span class="icon">
        <i class="fas fa-building" aria-hidden="true" />
      </span>&nbsp;IPA
    </a>
      {#if loggedasseveratore || loggedstandard}
        <div class="navbar-item has-dropdown is-hoverable"  data-sveltekit-preload-data="off">
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a class="navbar-link" href="javascript:void(0)"> consulta </a>

          <div class="navbar-dropdown"  data-sveltekit-preload-data="off">
            <a
              class="navbar-item {$page.url.pathname === '/plain/misure'
                ? 'has-text-info'
                : 'has-text-grey'}"
              href="/plain/misure"
              aria-current={$page.url.pathname === "/plain/misure"}
              on:click={() => (menuActive = !menuActive)}
              ><span class="icon">
                <i class="fas fa-euro-sign" aria-hidden="true" />
              </span>&nbsp;misure
            </a>
            <a
              class="navbar-item {$page.url.pathname === '/plain/avvisi'
                ? 'has-text-info'
                : 'has-text-grey'}"
              href="/plain/avvisi"
              aria-current={$page.url.pathname === "/plain/avvisi"}
              on:click={() => (menuActive = !menuActive)}
              ><span class="icon">
                <i class="fas fa-bullhorn" aria-hidden="true" />
              </span>&nbsp;avvisi
            </a>
            <a
              class="navbar-item {$page.url.pathname === '/plain/enti'
                ? 'has-text-info'
                : 'has-text-grey'}"
              href="/plain/enti"
              aria-current={$page.url.pathname === "/plain/enti"}
              on:click={() => (menuActive = !menuActive)}
              ><span class="icon">
                <i class="fas fa-building" aria-hidden="true" />
              </span>&nbsp;enti
            </a>
            <a
              class="navbar-item {$page.url.pathname === '/plain/referenti'
                ? 'has-text-info'
                : 'has-text-grey'}"
              href="/plain/referenti"
              aria-current={$page.url.pathname === "/plain/referenti"}
              on:click={() => (menuActive = !menuActive)}
              ><span class="icon">
                <i class="fas fa-address-book" aria-hidden="true" />
              </span>&nbsp;referenti
            </a>
            {#if !data.boardauth}
            <a
              class="navbar-item {$page.url.pathname === '/contatti'
                ? 'has-text-info'
                : 'has-text-grey'}"
              href="/contatti"
              aria-current={$page.url.pathname === "/contatti"}
              on:click={() => (menuActive = !menuActive)}
              ><span class="icon">
                <i class="fas fa-phone" aria-hidden="true" />
              </span>&nbsp;contatti
            </a>
            <a
              class="navbar-item {$page.url.pathname === '/scadenze'
                ? 'has-text-info'
                : 'has-text-grey'}"
              href="/scadenze"
              aria-current={$page.url.pathname === "/scadenze"}
              on:click={() => (menuActive = !menuActive)}
              ><span class="icon">
                <i class="fas fa-calendar-days" aria-hidden="true" />
              </span>&nbsp;scadenze
            </a>
            {/if}
          </div>
        </div>
      {/if}
      {#if loggedstandard  && ! data.boardauth}
        <div class="navbar-item has-dropdown is-hoverable"  data-sveltekit-preload-data="off">
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a class="navbar-link" href="javascript:void(0)"> opera </a>

          <div class="navbar-dropdown"  data-sveltekit-preload-data="off">
            <a
              class="navbar-item {$page.url.pathname === '/lavorastd/misura'
                ? 'has-text-info'
                : 'has-text-grey'}"
              href="/lavorastd/misura"
              aria-current={$page.url.pathname === "/lavorastd/misura"}
              on:click={() => (menuActive = !menuActive)}
              ><span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true" />
              </span>&nbsp;dall'alto (per misura)
            </a>
            <a
              class="navbar-item {$page.url.pathname === '/lavorastd/ente'
                ? 'has-text-info'
                : 'has-text-grey'}"
              href="/lavorastd/ente"
              aria-current={$page.url.pathname === "/lavorastd/ente"}
              on:click={() => (menuActive = !menuActive)}
              ><span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true" />
              </span>&nbsp;a media quota (per ente)
            </a>
            <a
              class="navbar-item {$page.url.pathname === '/lavorastd/fornitori'
                ? 'has-text-info'
                : 'has-text-grey'}"
              href="/lavorastd/fornitori"
              aria-current={$page.url.pathname === "/lavorastd/fornitori"}
              on:click={() => (menuActive = !menuActive)}
              ><span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true" />
              </span>&nbsp;dal basso (per fornitore)
            </a>

            <a
              class="navbar-item {$page.url.pathname === '/lavorastd/servizi'
                ? 'has-text-info'
                : 'has-text-grey'}"
              href="/lavorastd/servizi"
              aria-current={$page.url.pathname === "/lavorastd/servizi"}
              on:click={() => (menuActive = !menuActive)}
              ><span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true" />
              </span>&nbsp;nel dettaglio (per servizio)
            </a>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable"  data-sveltekit-preload-data="off">
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a class="navbar-link" href="javascript:void(0)"> qualità </a>

          <div class="navbar-dropdown"  data-sveltekit-preload-data="off">
            <a
              class="navbar-item {$page.url.pathname ===
              '/lavorastd/asseverazioni'
                ? 'has-text-info'
                : 'has-text-grey'}"
              href="/lavorastd/asseverazioni"
              aria-current={$page.url.pathname === "/lavorastd/asseverazioni"}
              on:click={() => (menuActive = !menuActive)}
              ><span class="icon">
                <i class="fas fa-certificate" aria-hidden="true" />
              </span>&nbsp;asseverazioni
            </a>
          </div>
        </div>
        <!--
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" href="javascript:void(0)"> campagne </a>

          <div class="navbar-dropdown">
            <a
              class="navbar-item {$page.url.pathname === '/campagne/appio'
                ? 'has-text-info'
                : 'has-text-grey'}"
              href="/campagne/appio"
              aria-current={$page.url.pathname === "/campagne/appio"}
              on:click={() => (menuActive = !menuActive)}
              ><span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true" />
              </span>&nbsp;qualità app IO
            </a>
            <a
              class="navbar-item {$page.url.pathname === '/campagne/145'
                ? 'has-text-info'
                : 'has-text-grey'}"
              href="/campagne/145"
              aria-current={$page.url.pathname === "/campagne/145"}
              on:click={() => (menuActive = !menuActive)}
              ><span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true" />
              </span>&nbsp;target 1.4.5 dic 2023
            </a>
          </div>
        </div>
      -->
       
      {/if}
      {#if loggedasseveratore}
        <a
          class="navbar-item {$page.url.pathname === '/asseveratore/quadro'
            ? 'has-text-info'
            : 'has-text-grey'}"
          href="/asseveratore/quadro"
          aria-current={$page.url.pathname === "/asseveratore/quadro"}
          on:click={() => (menuActive = !menuActive)}
          ><span class="icon">
            <i class="fas fa-stamp" aria-hidden="true" />
          </span>&nbsp;quadro asseverazioni
        </a>
      {/if}
      {#if data.boardauth}
      <div class="navbar-item has-dropdown is-hoverable"  data-sveltekit-preload-data="off">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a class="navbar-link" href="javascript:void(0)"> boards </a>

        <div class="navbar-dropdown"  data-sveltekit-preload-data="off">
          <a
            class="navbar-item {$page.url.pathname === '/boards/boardrisorse'
              ? 'has-text-info'
              : 'has-text-grey'}"
            href="/boards/boardrisorse"
            aria-current={$page.url.pathname === "/boards/boardrisorse"}
            on:click={() => (menuActive = !menuActive)}
            ><span class="icon">
              <i class="fas fa-chart-simple" aria-hidden="true" />
            </span>&nbsp;board risorse
          </a>
          <a
            class="navbar-item {$page.url.pathname === '/boards/boardasseverazioniconcluse'
              ? 'has-text-info'
              : 'has-text-grey'}"
            href="/boards/boardasseverazioniconcluse"
            aria-current={$page.url.pathname === "/boards/boardasseverazioniconcluse"}
            on:click={() => (menuActive = !menuActive)}
            ><span class="icon">
              <i class="fas fa-medal" aria-hidden="true" />
            </span>&nbsp;board asseverazioni
          </a>
        </div>
      </div>
      {/if}
    </div>

 
  </div>
</nav>

  {#if $navigating}
    <section class="hero is-primary">
      <div class="hero-body">
        <p class="title">
          caricamento in corso, attendi 
        </p>
        <p class="subtitle">
          <progress class="progress is-large is-info" max="100">60%</progress>
        </p>
      </div>
    </section>
  {:else}
    <slot />
  {/if}


<BackToTop />

<style>
  .content.is-vcentered {
    display: flex;
    flex-wrap: wrap;
    align-content: center; /* used this for multiple child */
    align-items: center; /* if an only child */
    height: 100vh;
  }
</style>
