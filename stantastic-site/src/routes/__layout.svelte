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
    <Nav page={$page}/>
    <PageTransitions refresh={$page.path}>
        <main>
            <slot />
        </main>
    </PageTransitions>
{/if}

<style>
    main{
        position: absolute;
        margin: 0 auto;
        overflow-x: hidden;
        width: 100%;
    }
</style>