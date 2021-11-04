<script>
    $: innerWidth = 0;
</script>

<svelte:head>
	<title>Portfolio</title>
</svelte:head>

<svelte:window bind:innerWidth />

<section id="about">
    <div class="about-title">
        <h1>Portfolio</h1>
        <div class="title-divider"></div>
    </div>
    <div class="about-content">
        <div class="about-text">
            <p>Hallo! Mijn naam is Stan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt at metus sit amet pulvinar. Proin feugiat consequat orci, ut bibendum velit venenatis et. Sed semper iaculis sem eget volutpat.</p>
            <p>Nam tortor lorem, accumsan vitae diam at, rutrum interdum ex. Praesent auctor sollicitudin malesuada. Sed ac sem augue. Donec porta pretium massa, at ultricies dolor rhoncus a.</p>
            <p>Ut finibus eget erat ut elementum. Quisque bibendum dignissim nisi, quis gravida nisl egestas ac. Etiam dictum, tortor vitae commodo rhoncus, leo mauris ultricies urna.</p>
        </div>
    </div>
</section>

<style>
    .profile-picture{
        width: 256px;
        height: 256px;
        border-radius: 128px;
        margin-left: 36px;
    }

    #about{
        margin-top: 5%;
        max-width: 900px;
    }

    ul{
        display: grid;
        grid-template-columns: repeat(2, minmax(210px, 210px));
        list-style: none;
        padding: 0;
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
        margin-left: -1.3em; /* same as padding-left set on li */
        width: 1.3em; /* same as padding-left set on li */
    }

    .title-divider{
        padding-top: 40px;
        margin-right: 36px;
        height: 100%;
        width: 100%;
        border-bottom: 1px solid black;
    }

    .about-title{
        display: flex;
    }

    .about-title h1{
        width: 180px;
    }

    .about-content{
        display: flex;
    }

    .about-text{
        float: left;
    }

    .about-text p{
        text-align: left;
        font-size: 18px;
    }

    p, li, h1{
        font-family: 'Titillium Web', sans-serif;
        color: black;
    }
</style>