<script>
    import { currentLanguage } from '$lib/stores.js';
</script>

<svelte:head>
	<title>{$currentLanguage == 'en' ? 'About' : 'Over mij'} - Stantastic</title>
</svelte:head>

<section class="section-base" id="about">
    <div class="section-header">
        <h1>{$currentLanguage == 'en' ? 'About' : 'Over mij'}</h1>
        <div class="title-divider"></div>
    </div>
    <div class="section-content">
        <div class="section-text">
            {#if $currentLanguage == 'en'}
                <p>Hello! My name is Stan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt at metus sit amet pulvinar. Proin feugiat consequat orci, ut bibendum velit venenatis et. Sed semper iaculis sem eget volutpat.</p>
                <p>Nam tortor lorem, accumsan vitae diam at, rutrum interdum ex. Praesent auctor sollicitudin malesuada. Sed ac sem augue. Donec porta pretium massa, at ultricies dolor rhoncus a.</p>
                <p>Ut finibus eget erat ut elementum. Quisque bibendum dignissim nisi, quis gravida nisl egestas ac. Etiam dictum, tortor vitae commodo rhoncus, leo mauris ultricies urna.</p>
                <p>Here are a few technologies I have been working with:</p>
            {:else if $currentLanguage == 'nl'}
                <p>Hallo! Ik ben Stan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt at metus sit amet pulvinar. Proin feugiat consequat orci, ut bibendum velit venenatis et. Sed semper iaculis sem eget volutpat.</p>
                <p>Nam tortor lorem, accumsan vitae diam at, rutrum interdum ex. Praesent auctor sollicitudin malesuada. Sed ac sem augue. Donec porta pretium massa, at ultricies dolor rhoncus a.</p>
                <p>Ut finibus eget erat ut elementum. Quisque bibendum dignissim nisi, quis gravida nisl egestas ac. Etiam dictum, tortor vitae commodo rhoncus, leo mauris ultricies urna.</p>
                <p>Hier zijn wat technologiën waarmee ik aan het werken ben:</p>
            {/if}
            <ul>
                <li>Svelte</li>
                <li>Objective C / iOS</li>
                <li>C# / .NET Framework</li>
                <li>Java</li>
                <li>Python</li>
                <li>Swift</li>
            </ul>
            <img class="profile-picture-content" src="stan.jpeg" alt="Stan Jaworski"/>
        </div>
        <img class="profile-picture" src="stan.jpeg" alt="Stan Jaworski" style="margin-left: 36px;"/>
    </div>
</section>

<style>
    .profile-picture, .profile-picture-content{
        width: 256px;
        height: 256px;
        border-radius: 128px;
    }

    ul{
        display: grid;
        grid-template-columns: repeat(2, minmax(210px, 210px));
        list-style: none;
        padding: 0;
    }

    @media(min-width: 788px){
        .profile-picture-content{
            display: none;
        }
    }

    @media(max-width: 787px){
        .profile-picture{
            display: none;
        }
    }

    @media(max-width: 489px){
        ul{
            grid-template-columns: repeat(2, minmax(50%, 50%));
        }
    }

    @media(max-width: 363px){
        ul{
            grid-template-columns: 100%;
        }
    }

    ul li{
        text-align: left;
        padding-left: 1.3em;
        font-size: 18px;
    }

    ul li:before{
        content: "\f0da";
        font-family: FontAwesome;
        display: inline-block;
        margin-left: -1.3em;
        width: 1.3em;
    }
</style>