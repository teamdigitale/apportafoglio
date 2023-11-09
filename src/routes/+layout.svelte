<script>
  import "../app.scss";
  import { invalidateAll } from "$app/navigation";
  import { navigating } from "$app/stores";
  export let data;
  let menuActive = false;
  import { page } from "$app/stores";
  export let loggedstandard = data.loggedstandard;
  export let loggedasseveratore = data.loggedasseveratore;

  let runas = data.runas;
  let visible = true;
  async function ra() {
    const response = await fetch("/api/runas", {
      method: "POST",
      body: JSON.stringify({ runas }),
      headers: {
        "content-type": "application/json",
      },
    });
    visible = false;
    await invalidateAll().then((a) => (visible = true));
  }
</script>

<nav class="navbar" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item is-link" href="/">
      <figure class="image is-28x28 mx-2">
        <img src="/site-logo.svg" alt="logo">
      </figure>
      <h1 class="title has-text-info">APPortafoglio</h1>
    </a>

    <!-- svelte-ignore a11y-interactive-supports-focus -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-missing-attribute -->
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar" on:click="{() => (menuActive = !menuActive)}">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbar" class="navbar-menu {menuActive ? 'is-active' : ''}">
    <div class="navbar-start">
      <a class="navbar-item {$page.url.pathname === '/io'
          ? 'has-text-link'
          : 'has-text-grey'}" href="/io" aria-current="{$page.url.pathname==='/io'}">
        <span class="icon">
          <i class="fas fa-user" aria-hidden="true"></i>
        </span>&nbsp;io
      </a>
      <a class="navbar-item {$page.url.pathname === '/opendata'
        ? 'has-text-link'
        : 'has-text-grey'}" href="/opendata" aria-current="{$page.url.pathname==='/opendata'}">
      <span class="icon">
        <i class="fas fa-database" aria-hidden="true"></i>
      </span>&nbsp;open data
    </a>
      {#if loggedasseveratore || loggedstandard}
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" href="javascript:void(0)"> consulta </a>

          <div class="navbar-dropdown">
            <a class="navbar-item {$page.url.pathname === '/plain/misure'
                ? 'has-text-info'
                : 'has-text-grey'}" href="/plain/misure" aria-current="{$page.url.pathname==='/plain/misure'}"><span class="icon">
                <i class="fas fa-euro-sign" aria-hidden="true"></i>
              </span>&nbsp;misure
            </a>
            <a class="navbar-item {$page.url.pathname === '/plain/avvisi'
                ? 'has-text-info'
                : 'has-text-grey'}" href="/plain/avvisi" aria-current="{$page.url.pathname==='/plain/avvisi'}"><span class="icon">
                <i class="fas fa-bullhorn" aria-hidden="true"></i>
              </span>&nbsp;avvisi
            </a>
            <a class="navbar-item {$page.url.pathname === '/plain/enti'
                ? 'has-text-info'
                : 'has-text-grey'}" href="/plain/enti" aria-current="{$page.url.pathname==='/plain/enti'}"><span class="icon">
                <i class="fas fa-building" aria-hidden="true"></i>
              </span>&nbsp;enti
            </a>
            <a class="navbar-item {$page.url.pathname === '/plain/referenti'
                ? 'has-text-info'
                : 'has-text-grey'}" href="/plain/referenti" aria-current="{$page.url.pathname==='/plain/referenti'}"><span class="icon">
                <i class="fas fa-address-book" aria-hidden="true"></i>
              </span>&nbsp;referenti
            </a>
            <a class="navbar-item {$page.url.pathname === '/contatti'
              ? 'has-text-info'
              : 'has-text-grey'}" href="/contatti" aria-current="{$page.url.pathname==='/contatti'}"><span class="icon">
              <i class="fas fa-phone" aria-hidden="true"></i>
            </span>&nbsp;contatti
            </a>
          </div>
        </div>
      {/if}
      {#if loggedstandard}
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" href="javascript:void(0)"> opera </a>

          <div class="navbar-dropdown">
            <a class="navbar-item {$page.url.pathname === '/lavorastd/misura'
                ? 'has-text-info'
                : 'has-text-grey'}" href="/lavorastd/misura" aria-current="{$page.url.pathname==='/lavorastd/misura'}"><span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>&nbsp;dall'alto (per misura)
            </a>
            <a class="navbar-item {$page.url.pathname === '/lavorastd/ente'
                ? 'has-text-info'
                : 'has-text-grey'}" href="/lavorastd/ente" aria-current="{$page.url.pathname==='/lavorastd/ente'}"><span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>&nbsp;a media quota (per ente)
            </a>
            <a class="navbar-item {$page.url.pathname === '/lavorastd/fornitori'
              ? 'has-text-info'
              : 'has-text-grey'}" href="/lavorastd/fornitori" aria-current="{$page.url.pathname==='/lavorastd/fornitori'}"><span class="icon">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>&nbsp;dal basso (per fornitore)
          </a>

          <a class="navbar-item {$page.url.pathname === '/lavorastd/servizi'
            ? 'has-text-info'
            : 'has-text-grey'}" href="/lavorastd/servizi" aria-current="{$page.url.pathname==='/lavorastd/servizi'}"><span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>&nbsp;nel dettaglio (per servizio)
        </a>
            
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" href="javascript:void(0)"> qualità </a>

          <div class="navbar-dropdown">
            <a class="navbar-item {$page.url.pathname === '/lavorastd/asseverazioni'
                ? 'has-text-info'
                : 'has-text-grey'}" href="/lavorastd/asseverazioni" aria-current="{$page.url.pathname==='/lavorastd/asseverazioni'}"><span class="icon">
                <i class="fas fa-certificate" aria-hidden="true"></i>
              </span>&nbsp;asseverazioni
            </a>
           
            
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" href="javascript:void(0)"> campagne </a>

          <div class="navbar-dropdown">
            <a class="navbar-item {$page.url.pathname === '/campagne/appio'
                ? 'has-text-info'
                : 'has-text-grey'}" href="/campagne/appio" aria-current="{$page.url.pathname==='/campagne/appio'}"><span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>&nbsp;qualità app IO
            </a>
            <a class="navbar-item {$page.url.pathname === '/campagne/145'
              ? 'has-text-info'
              : 'has-text-grey'}" href="/campagne/145" aria-current="{$page.url.pathname==='/campagne/145'}"><span class="icon">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>&nbsp;target 1.4.5 dic 2023
          </a>
            
          </div>
        </div>
        <!--
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" href="javascript:void(0)"> intelligenza artificiale </a>

          <div class="navbar-dropdown">
            <a
              class="navbar-item {$page.url.pathname === '/ia/bohr'
                ? 'has-text-info'
                : 'has-text-grey'}"
              href="/ia/bohr"
              aria-current={$page.url.pathname === "/ia/bohr"}
              ><span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true" />
              </span>&nbsp;Bohr consiglia
            </a>
            
          </div>
        </div>
        -->
      {/if}
      {#if loggedasseveratore}
        <a class="navbar-item {$page.url.pathname === '/asseveratore/quadro'
            ? 'has-text-info'
            : 'has-text-grey'}" href="/asseveratore/quadro" aria-current="{$page.url.pathname==='/asseveratore/quadro'}"><span class="icon">
            <i class="fas fa-stamp" aria-hidden="true"></i>
          </span>&nbsp;quadro asseverazioni
        </a>
      {/if}
    </div>

    <!--
    <div class="navbar-end">
      <div class="field">
        <div class="control has-icons-left">
          <div class="select is-primary" id="idfiltermisure">
            <form method="POST" action="/api/runas">
              <select name="runas" bind:value={runas} on:change={() => ra()}>
                <option value="">Utente loggato</option>
                <option value="0057Q00000729pMQAQ">Cludio Scarpa</option>
                <option value="0057Q0000072YrZQAU">Angelo Capodieci</option>
                <option value="0057Q000005UXtlQAG">Giovanni Pergola</option>
                <option value="0057Q0000070qelQAA">Marco Virno</option>
              </select>
            </form>
          </div>
          <div class="icon is-small is-left">
            <i class="fas fa-user" />
          </div>
        </div>
      </div>
    </div>
  -->
  </div>
</nav>
{#if visible}
  {#if $navigating}
    <section class="hero is-primary">
      <div class="hero-body">
        <p class="title">
          Caricamento in corso di <span class="has-text-weight-light is-italic">{$navigating.to.url.pathname}</span>
        </p>
        <p class="subtitle">
          <progress class="progress is-large is-info" max="100">60%</progress>
        </p>
      </div>
    </section>
  {:else}
    <slot></slot>
  {/if}
{:else}
<div class="content is-vcentered has-text-centered">
<p class="title is-vcentered has-text-centered">Refreshing data...</p>
<progress class="progress is-large is-warning" max="100">60%</progress>

</div>
{/if}
<!--
<footer class="footer">
  <div class="content has-text-centered">
    <p>
      <strong>altpa2026</strong> by Fausto Mancini
    </p>
  </div>
</footer>
-->
<style>

.content.is-vcentered {
  display: flex;
  flex-wrap: wrap;
  align-content: center; /* used this for multiple child */
  align-items: center; /* if an only child */
  height: 100vh;
}
</style>