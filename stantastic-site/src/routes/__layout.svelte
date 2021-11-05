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
        display: flex;
        overflow-x: hidden;

        justify-content: center;
        align-content: center;
        text-align: center;

        padding: 0px 5%;
    }
</style>