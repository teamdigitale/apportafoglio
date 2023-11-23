<script>
    export let showOnPx = 150;
    let hidden = true;

    function goTop() {
        //document.body.scrollIntoView();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }

    function scrollContainer() {
        return document.documentElement || document.body;
    }

    function handleOnScroll() {
        if (!scrollContainer()) {
            return;
        }

        if (scrollContainer().scrollTop > showOnPx) {
            hidden = false;
        } else {
            hidden = true;
        }
    }
</script>

<svelte:window on:scroll={handleOnScroll} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="back-to-top" on:click={goTop} class:hidden>
    <button class="button is-small is-primary">
        <span class="icon">
            <i class="fas fa-arrow-up fa-lg" />
        </span>
    </button>
</div>

<style>
    .back-to-top {
        opacity: 1;
        transition: opacity 0.5s, visibility 0.5s;
        position: fixed;
        z-index: 99;
        right: 1rem;
        user-select: none;
        bottom: 1rem;
    }

    .back-to-top.hidden {
        opacity: 0;
        visibility: hidden;
    }
</style>
