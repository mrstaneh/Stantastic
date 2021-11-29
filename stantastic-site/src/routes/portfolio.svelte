<script>
    import { currentLanguage } from '$lib/stores.js';
</script>

<svelte:head>
	<title>Portfolio</title>
</svelte:head>

<section class="section-base" id="about">
    <div class="section-header">
        <h1>Portfolio</h1>
        <div class="title-divider"></div>
    </div>
    <div class="section-content">
        <div class="section-text">
            {#if $currentLanguage == 'en'}
                <p>Hello! My name is Stan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt at metus sit amet pulvinar. Proin feugiat consequat orci, ut bibendum velit venenatis et. Sed semper iaculis sem eget volutpat.</p>
                <p>Nam tortor lorem, accumsan vitae diam at, rutrum interdum ex. Praesent auctor sollicitudin malesuada. Sed ac sem augue. Donec porta pretium massa, at ultricies dolor rhoncus a.</p>
                <p>Ut finibus eget erat ut elementum. Quisque bibendum dignissim nisi, quis gravida nisl egestas ac. Etiam dictum, tortor vitae commodo rhoncus, leo mauris ultricies urna.</p>
            {:else if $currentLanguage == 'nl'}
                <p>Hallo! Mijn naam is Stan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt at metus sit amet pulvinar. Proin feugiat consequat orci, ut bibendum velit venenatis et. Sed semper iaculis sem eget volutpat.</p>
                <p>Nam tortor lorem, accumsan vitae diam at, rutrum interdum ex. Praesent auctor sollicitudin malesuada. Sed ac sem augue. Donec porta pretium massa, at ultricies dolor rhoncus a.</p>
                <p>Ut finibus eget erat ut elementum. Quisque bibendum dignissim nisi, quis gravida nisl egestas ac. Etiam dictum, tortor vitae commodo rhoncus, leo mauris ultricies urna.</p>
            {/if}
        </div>
    </div>
</section>

<style>
    .title-divider{
        padding-top: 20px;
        margin-right: 36px;
        height: 100%;
        width: 100%;
        border-bottom: 1px solid black;
    }

    .section-header{
        display: flex;
    }

    .section-header h1{
        width: 180px;
        margin-block-start: 0em;
        margin-block-end: 0em;
    }

    .section-content{
        display: flex;
    }

    .section-text{
        float: left;
    }

    .section-text p{
        text-align: left;
        font-size: 18px;
    }

    p, h1{
        font-family: 'Titillium Web', sans-serif;
        color: black;
    }
</style>