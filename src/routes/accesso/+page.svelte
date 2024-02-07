<script>
	import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

	export let data;


    
    onMount(() => {
        goto('/users',{invalidateAll: true});
    });
	
</script>

<div class="container my-4 text-center">
logged in, please wait a moment...
</div>
