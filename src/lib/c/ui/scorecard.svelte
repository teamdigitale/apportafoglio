<script>

    export let score = '';
    export let label = '';
    export let color = '';

</script>


<div class="card has-background-{color!==''?color:'grey-light'} mx-1 my-1 bm--card-equal-height">
    <div class="card-content has-text-centered">
        <p class="title">
            {score}
        </p>
        <p class="subtitle">
            {label}
        </p>
    </div>
</div>

<style>
    .bm--card-equal-height {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

</style>
