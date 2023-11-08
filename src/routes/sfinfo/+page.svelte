<script>
    import Header from '$lib/c/ui/header.svelte';

    export let data;

</script>

<Header title="resources" quote="" author="" />

<a href="/sfinfo/objects">objects</a>

<section class="section is-12 px-0">
    <table class="table is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
            <tr>
                <th>#</th>
                <th>key</th>
                <th>value</th>
            </tr>
        </thead>
        <tbody>
            {#each Object.keys(data.resources) as key,index}
                <tr>
                    <td>{index}</td>
                    <td>{key}</td>
                    <td>{data.resources[key]}</td>
                    <!--
                    <td><a href="/candidatura/{data.candidature.filter(c=>c.Id===t.WhatId)[0].Id}" target="_blank"><span class="icon"><i class="fas fa-glasses">&nbsp</i></span></a></td>
                    -->
                </tr>
            {/each}
        </tbody>
    </table>
</section>
