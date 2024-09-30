<script>
    import Nav from "$lib/Nav.svelte";
    import PageTransitions from "$lib/PageTransitions.svelte";
    import { onMount } from 'svelte';
    import { getStores } from '$app/stores';

    const { page } = getStores();

    let loaded = false;

    onMount(async () => {
        loaded = true;
    })
</script>

{#if loaded}
    <head>
        <meta http-equiv="Content-Security-Policy" content="default-src 'unsafe-inline' https://stanjaworski.nl/ https://*.googleapis.com/ https://*.gstatic.com/ https://*.fontawesome.com/; connect-src 'self' https://*.fontawesome.com/;" />
    </head>
    <Nav page={$page}/>
    <PageTransitions refresh={$page.url.pathname}>
        <main>
            <slot/>
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