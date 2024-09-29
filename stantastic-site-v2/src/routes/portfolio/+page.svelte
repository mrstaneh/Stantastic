<script>
    import { currentLanguage } from '$lib/stores.js';
</script>

<svelte:head>
	<title>Portfolio - Stan Jaworski</title>
</svelte:head>

<section class="section-base" id="about">
    <div class="section-header">
        <h1>Portfolio</h1>
        <div class="title-divider"></div>
    </div>
    <div class="section-content">
        <div class="section-text">
            {#if $currentLanguage == 'en'}
            <p>Nam tortor lorem, accumsan vitae diam at, rutrum interdum ex. Praesent auctor sollicitudin malesuada. Sed ac sem augue. Donec porta pretium massa, at ultricies dolor rhoncus a.</p>
            <p>Ut finibus eget erat ut elementum. Quisque bibendum dignissim nisi, quis gravida nisl egestas ac. Etiam dictum, tortor vitae commodo rhoncus, leo mauris ultricies urna.</p>
            <p>Here are a few technologies I have been working with:</p>
        {:else if $currentLanguage == 'nl'}
            <p>Nam tortor lorem, accumsan vitae diam at, rutrum interdum ex. Praesent auctor sollicitudin malesuada. Sed ac sem augue. Donec porta pretium massa, at ultricies dolor rhoncus a.</p>
            <p>Ut finibus eget erat ut elementum. Quisque bibendum dignissim nisi, quis gravida nisl egestas ac. Etiam dictum, tortor vitae commodo rhoncus, leo mauris ultricies urna.</p>
            <p>Hier zijn wat technologiën waar ik mee aan het werken ben:</p>
        {/if}
        </div>
    </div>
</section>

<style>

</style>