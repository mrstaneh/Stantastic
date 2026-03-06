<script>
    import Nav from "$lib/Nav.svelte";
    import PageTransitions from "$lib/PageTransitions.svelte";
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    let { children } = $props();

    let loaded = $state(false);

    onMount(async () => {
        loaded = true;
    })
</script>

{#if loaded}
    <Nav page={$page}/>
    <PageTransitions refresh={$page.url.pathname}>
        <main>
            {@render children()}
        </main>
    </PageTransitions>
{/if}

<style>
    main{
        display: flex;
        overflow-x: hidden;

        justify-content: center;
        align-content: center;
        text-align: center;

        padding: 0px 5%;
    }
</style>