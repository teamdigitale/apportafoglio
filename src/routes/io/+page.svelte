<script>
  import Header from "$lib/c/ui/header.svelte";
  import Auth2026 from "./auth2026.svelte";
  export let data;
  export let form;

  console.log(data);

  $: ustd = data.utentestandard;
  $: uass = data.utenteasseveratore;

</script>

<Header
  title="io"
  quote="Chi conosce gli altri è sapiente; chi conosce sé stesso è illuminato."
  author="Lao Tzu"
/>

<section class="section is-12">
  <div class="columns is-multiline">
    <div class="column is-half">
      <Auth2026
        tipoutente="standard"
        utenteSF={ustd}
        logged={data.loggedstandard}
        errorMessageStandard={form?.loginerrorstandard &&
        form?.loginerrorstandard.length > 0
          ? form?.loginerrorstandard
          : ""}
      />
    </div>
    <div class="column is-half">
      <Auth2026
        tipoutente="asseveratore"
        utenteSF={uass}
        logged={data.loggedasseveratore}
        errorMessageAsseveratore={form?.loginerrorasseveratore &&
        form?.loginerrorasseveratore.length > 0
          ? form?.loginerrorasseveratore
          : ""}
      />
    </div>
  </div>
</section>
