<script>
	import { formatNumber } from "$lib/js/shared";


export let censimento;

</script>

<div class="my-4">
    <p class="text-primary text-center">
        <svg class="icon icon-primary"><use href="/svg/sprites.svg#it-info-circle"></use></svg><b>
            Popolazione residente
        </b>
    </p>
        <div class="callout callout-primary callout-highlight my-2 primary-bg-a1 rounded px-4 py-2">
            {formatNumber(censimento.totale)} abitanti
        </div>
</div>

