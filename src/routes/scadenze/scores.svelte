<script>

    export let score = '';
    export let color = '';

</script>


<div class="card has-background-{color!==''?color:'grey-light'} mx-1 my-1 bm--card-equal-height point">
    <div class="card-content has-text-centered">
        <p class="title my-0">
            {score}
        </p>

        <slot></slot>
    </div>
</div>

<style>
    .bm--card-equal-height {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .point{cursor: pointer;}
</style>
