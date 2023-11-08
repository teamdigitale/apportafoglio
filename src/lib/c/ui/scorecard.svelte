<script>

    export let score = '';
    export let label = '';
    export let color = '';

</script>


<div class="card has-background-{color!==''?color:'grey-light'} mx-3 my-3">
    <div class="card-content has-text-centered">
        <p class="title">
            {score}
        </p>
        <p class="subtitle">
            {label}
        </p>
    </div>
</div>
