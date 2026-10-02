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
                <p>Hello! I'm Stan, a software developer. I currently work at SparkTSL, a company that specializes in solutions for healthcare providers and consumers, where I work as a fullstack developer.</p>
                <p>These days I also work a lot with AI. Using tools like Semantic Kernel, I build applications that connect language models to existing software and data.</p>
                <p>Next to my job, I'm open to smaller freelance projects in my spare time. Think apps and websites, but also integrations between systems, web hosting, DevOps and other software-related work. The only exception is healthcare projects, since that's what I already work on every day ;-) Have an idea or need some help? Feel free to <a href="/contact">get in touch</a>!</p>
                <p>Here are a few technologies I have been working with:</p>
            {:else if $currentLanguage == 'nl'}
                <p>Hallo! Ik ben Stan, een software developer. Momenteel werk ik bij SparkTSL, een bedrijf dat zich specialiseert in oplossingen voor healthcare providers en consumers. Daar ben ik aan de slag als fullstack developer.</p>
                <p>Tegenwoordig werk ik ook veel met AI. Met tools zoals Semantic Kernel bouw ik toepassingen die taalmodellen koppelen aan bestaande software en data.</p>
                <p>Naast mijn baan sta ik open voor kleinere freelance projecten in mijn vrije tijd. Denk aan apps en websites, maar ook aan koppelingen tussen systemen, webhosting, DevOps en ander softwarewerk. Alleen zorg-opdrachten neem ik niet aan, want daar werk ik dagelijks al mee ;-) Heb je een idee of kun je hulp gebruiken? Neem gerust <a href="/contact">contact</a> op!</p>
                <p>Hier zijn wat technologieën waarmee ik werk:</p>
            {/if}
            <ul>
                <li>AI / Semantic Kernel</li>
                <li>Svelte</li>
                <li>Objective C / iOS</li>
                <li>C# / .NET Core</li>
                <li>Java</li>
                <li>Kotlin</li>
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