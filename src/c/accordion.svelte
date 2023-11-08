<script>
    export let open = false;
    import { slide } from "svelte/transition";
    const handleClick = () => (open = !open);
</script>

<div class="notification has-background-grey-lighter">
    <button class="button" on:click={handleClick}>
        <span>{open ? "Chiudi" : "Apri"}</span>
    </button>
    {#if open}
        <div class="details" transition:slide>
            <slot name="details" />
        </div>
    {/if}
</div>
