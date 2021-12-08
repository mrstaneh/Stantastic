<script>
    import { currentLanguage } from '$lib/stores.js';
</script>

<svelte:head>
	<title>Portfolio - Stantastic</title>
</svelte:head>

<section class="section-base" id="about">
    <div class="section-header">
        <h1>Portfolio</h1>
        <div class="title-divider"></div>
    </div>
    <div class="section-content">
        <div class="section-text">
            <div class="project-list">
                <div class="project">
                        <div class="image-container">
                            <a href="https://boulderarchive.com/" target="_blank">
                                <img src="boulderarchive.jpg" alt="Boulder Archive">
                            </a>
                        </div>
                    <div class="info-container">
                        <div class="project-subtitle">
                            <p>
                                {#if $currentLanguage == 'en'}
                                    Own Project
                                {:else if $currentLanguage == 'nl'}
                                    Eigen Project
                                {/if}
                            </p>
                        </div>
                        <div class="project-title">
                            <h1><a href="https://boulderarchive.com/" target="_blank">Boulder Archive</a></h1>
                        </div>
                        <div class="project-info">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt at metus sit amet pulvinar.</p>
                        </div>
                        <div class="project-tools">
                            <ul class="tools-list">
                                <li>Svelte</li>
                                <li>Sapper</li>
                                <li>.NET Core</li>
                                <li>AWS</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .project{
        display: flex;
        margin-top: 1em;
        padding-left: 1em;
        padding-right: 1.8em;
    }

    .image-container{
        display: flex;
        width: 75%;
        height: 100%;
        border-radius: 8px;
        mix-blend-mode: multiply;
        background-color: grey;
    }

    .image-container:hover{
        cursor: pointer;
        background-color: transparent
    }

    .project-subtitle p{
        margin: 0.5em 0em -0.2em 0em;
    }

    .project-title h1{
        margin-top: 0;
        margin-bottom: 0.5em;
        font-size: 30px;
    }

    .image-container:hover{
        background-color: transparent;
    }

    .project img{
        opacity: 0.90;
        vertical-align: top;
        width: 100%;
        filter: contrast(1) brightness(50%);
        border-radius: 8px;
    }

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

    .info-container{
        display: flex;
        flex-direction: column;
        width: 50%;
        text-align: right;
        justify-content: center;
    }

    .info-container p{
        text-align: right;
    }

    .project-info{
        position: relative;
        left: -70%;
        width: 160%;
        float: right;
        border: 1px solid #7b7b8f;
        background-color: #d8dde0;
        border-radius: 4px;
        padding: 1em;
    }

    .project-info p{
        margin: 0;
        text-align: left;
    }

    .tools-list{
        list-style: none;
    }

    li{
        display: inline;
        border: 1px solid #7b7b8f;
        border-radius: 4px;
        padding: 0px 6px 0px 6px;
        background-color: #d8dde0;
    }
</style>