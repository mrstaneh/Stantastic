<script>
    import { fade } from 'svelte/transition';

    let { refresh = '', children } = $props();
</script>

{#key refresh}
    <div in:fade='{{ y: -50, duration: 250 }}'>
        {@render children()}
    </div>
{/key}