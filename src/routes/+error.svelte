<script>
    import { page } from "$app/stores";
    import MediaQuery from "$lib/c/ui/MediaQuery.svelte";
</script>

<div class="bg-overlay"></div>
<video autoplay muted loop id="myVideo">
    <MediaQuery query="(max-width: 768px)" let:matches>
        {#if !matches}
            <source src="/404mobile.mp4" type="video/mp4" />
        {:else}
            <source src="/404.mp4" type="video/mp4" />
        {/if}
    </MediaQuery>
</video>
<div class="content has-text-centered">
    <p>
        <span class="icon is-size-1 has-text-danger mx-5">
            <i class="fas fa-user-graduate" />
        </span>
    </p>
    <p>Ooooooopps</p>
    <p>Qualcosa non è andato a buon fine</p>
    <p>{$page.status}: {$page.error.message}</p>
</div>

<style>
    #myVideo {
        position: fixed;
        right: 0;
        bottom: 0;
        min-width: 100%;
        min-height: 100%;
    }

    .content {
        margin: 0;
        position: absolute;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.5);
        color: #f1f1f1;
        width: 100%;
        padding: 20px;
        z-index: 10;
    }

    .bg-overlay {
        background-color: #0066cc66;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        z-index: 1;
    }
</style>
