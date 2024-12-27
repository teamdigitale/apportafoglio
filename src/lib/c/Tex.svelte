<script>
    import katex from 'katex';
import { onMount } from "svelte";

    export let f;
    export let id;
    onMount(async () => {
		katex.renderToString("c = \\pm\\sqrt{a^2 + b^2}", {
                    throwOnError: false
                })
	});
</script>


<span {id}>

</span>