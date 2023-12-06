<script>
    export let background = "info";
    export let title = "";
</script>

<article class="message is-{background}">
    <div class="message-header">
        <p>{title}</p>
    </div>
    <div class="message-body">
        <div class="columns">
            <div class="column is-narrow">
                <p class="title">
                    <slot name="score" />
                </p>
                <p class="subtitle">
                    <slot name="scoredescription" />
                </p>
            </div>
        </div>
    </div>
</article>
