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
            <div class="card-container">
                <p>hoi</p>
            </div>
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
</style>