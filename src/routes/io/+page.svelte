<script>
  import Header from "$lib/c/ui/header.svelte";
  import Auth2026 from "../../c/auth2026.svelte";
  export let data;

</script>

<Header title="io" quote="Chi conosce gli altri è sapiente; chi conosce sé stesso è illuminato." author="Lao Tzu" />

<section class="section is-12">
  <div class="columns is-multiline is-mobile">
    <div class="column is-half">
      <Auth2026
        tipoutente="standard"
        utenteSF={data.utentestandard && data.utentestandard.sfuser
          ? data.utentestandard.sfuser
          : null}
        logged={data.loggedstandard}
        errorMessageStandard={data.loginerrorstandard &&
        data.loginerrorstandard.length > 0
          ? data.loginerrorstandard
          : ""}
      />
    </div>
    <div class="column is-half">
      <Auth2026
        tipoutente="asseveratore"
        utenteSF={data.utenteasseveratore && data.utenteasseveratore.sfuser
          ? data.utenteasseveratore.sfuser
          : null}
        logged={data.loggedasseveratore}
        errorMessageAsseveratore={data.loginerrorasseveratore &&
        data.loginerrorasseveratore.length > 0
          ? data.loginerrorasseveratore
          : ""}
      />
    </div>
  </div>
</section>
