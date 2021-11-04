<script>
    import Nav from "$lib/Nav.svelte";
    import { onMount } from 'svelte';

    let loading = false;

    onMount(async () => {
        loading = true;
    })
</script>

{#if loading}
    <Nav/>

    <main>
        <slot />
    </main>
{/if}

<style>
    main{
        position: relative;
        margin: 0 auto;
        overflow-x: hidden;
    }
</style>