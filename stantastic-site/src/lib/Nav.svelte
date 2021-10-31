<script>
    import { getStores } from '$app/stores';
    const { page } = getStores();

    $: innerWidth = 0;
    
    let pageName = undefined;

    page.subscribe(({path}) => {
        switch(path){
            case '/':
                pageName = 'Home';
                break;
            case '/about':
                pageName = 'About';
                break;
            case '/portfolio':
                pageName = 'Portfolio';
                break;
            case '/contact':
                pageName = 'Contact';
                break;
        }
    })
</script>

<svelte:window bind:innerWidth />

<div class="nav">
    <div class="nav-title">
        {#if innerWidth > 546}
            <img src="android-chrome-512x512.png" alt="logo"/>
        {/if}
        {#if innerWidth < 490 && innerWidth > 363}
            <img src="android-chrome-512x512.png" alt="logo"/>
        {/if}
        <a href="/">Stantastic</a>
    </div>
    {#if innerWidth > 489}
        <div class="nav-pages">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/portfolio">Portfolio</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </div>
    {/if}
    {#if innerWidth > 627}
        <div class="nav-spotlight">
            <a href="https://www.linkedin.com/in/stan-jaworski-5138731a2/"><i class="fa-brands fa-linkedin social-icon"></i></a>
            <a href="https://github.com/mrstaneh"><i class="fa-brands fa-github social-icon"></i></a>
        </div>
    {/if}
    {#if innerWidth < 490}
        <div class="nav-small-button">
            <span class="nav-currentpage-text">{pageName}</span>
            <i class="fa-solid fa-angle-down"></i>
        </div>
    {/if}
</div>

{innerWidth}

<style>
    .nav{
        display: flex;
        background-color: white;
        width: 100%;
        height: 60px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2);
    }

    .nav-title{
        display: flex;
        align-items: center;
        margin-left: 22px;
        margin-bottom: 3px;
        margin-right: 22px;
    }

    .nav-title img{
        width: 48px;
        height: 48px;
        margin-right: 8px;
    }

    .nav-title a{
        font-family: 'Titillium Web', sans-serif;
        font-size: 36px;
        color: #4A4A55;
        text-decoration: none;
    }

    .nav-pages{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: end;
    }

    .nav-pages ul{
        padding-inline-start: 0;
        display: flex;
        list-style: none;
    }

    li a{
        text-decoration: none;
        margin-right: 1em;
        font-family: 'Titillium Web', sans-serif;
        color: #4A4A55;
        font-size: 18px;
    }

    li a:hover{
        color: rgb(105, 105, 121);
    }

    .nav-spotlight{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: end;
    }

    .fa-linkedin{
        margin-right: 11px;
        font-size: 27px;
    }

    .fa-github{
        margin-right: 22px;
        font-size: 26px;
    }

    .social-icon{
        color: #4A4A55;
    }

    .social-icon:hover{
        color: rgb(105, 105, 121);
        cursor: pointer;
    }

    .nav-small-button{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: end;
        margin-right: 22px;
    }

    .fa-angle-down{
        color: #4A4A55;
        font-size: 26px;
    }

    .nav-small-button{
        cursor: pointer;
    }

    .nav-small-button:hover .nav-currentpage-text{
        color: rgb(105, 105, 121);
    }

    .nav-small-button:hover .fa-angle-down{
        color: rgb(105, 105, 121);
    }

    .nav-currentpage-text{
        font-family: 'Titillium Web', sans-serif;
        color: #4A4A55;
        font-size: 18px;
        margin-right: 8px;
    }
</style>