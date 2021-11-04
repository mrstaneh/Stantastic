<script>
    import { fade } from 'svelte/transition';
    export let refresh = '';
</script>
  
{#key refresh}
    <div in:fade='{{ y: -50, duration: 250 }}'>
        <slot/>
    </div>
{/key}