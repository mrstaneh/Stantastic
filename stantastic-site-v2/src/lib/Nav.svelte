<script>
    import { goto } from '$app/navigation';
    import { expoOut } from 'svelte/easing';
    import { onMount, beforeUpdate } from 'svelte';
    import { currentLanguage } from './stores.js';
    
    let showDropdown = false;
    let loaded = false;
    export let page = undefined;

    let pages = [
        {name: 'Home', route: '/'},
        {name: $currentLanguage == 'en' ? 'About' : 'Over mij', route: '/about'},
        {name: 'Contact', route: '/contact'}
    ];

    let pageName = '';

    function onNavDropdownClick(){
        showDropdown = !showDropdown;
    }

    function onItemClick(route){
        if(route != pages.filter(i => i.name == pageName)[0].route){
            goto(route);
            showDropdown = false;
        }
    }

    function dropdownin(node, {duration}) {
		return {
            duration,
			css: t => {
                const eased = expoOut(t);

				return `
                    transform: scaleX(${eased});
                    transform-origin: center top;
                `
			}
		}
    };

    function dropdownout(node, {duration}) {
		return {
            duration,
			css: t => {
                const eased = expoOut(t);

				return `
                    transform: scaleX(${eased});
                    transform-origin: top center;
                `
			}
		}
    };

    function changeLang(){
        if($currentLanguage == 'en'){
            currentLanguage.set('nl');

            pages = [
                {name: 'Home', route: '/'},
                {name: 'Over mij', route: '/about'},
                {name: 'Contact', route: '/contact'}
            ];

            localStorage.setItem('lang', 'nl');
        }else{
            currentLanguage.set('en');

            pages = [
                {name: 'Home', route: '/'},
                {name: 'About', route: '/about'},
                {name: 'Contact', route: '/contact'}
            ];

            localStorage.setItem('lang', 'en');
        }
    }

    beforeUpdate(() => {
        switch(page.url.pathname){
            case '/':
                pageName = 'Home';
                break;
            case '/about':
                if($currentLanguage == 'en'){
                    pageName = 'About';
                }else{
                    pageName = 'Over mij';
                }
                break;
            case '/portfolio':
                pageName = 'Portfolio';
                break;
            case '/contact':
                pageName = 'Contact';
                break;
        }
    });

    onMount(async () => {
        loaded = true;

        if(localStorage.getItem('lang') != null && localStorage.getItem('lang') != undefined){
            if(localStorage.getItem('lang') == 'en'){
                currentLanguage.set('en');

                pages = [
                    {name: 'Home', route: '/'},
                    {name: 'About', route: '/about'},
                    {name: 'Contact', route: '/contact'}
                ];
            }else{
                currentLanguage.set('nl');

                pages = [
                    {name: 'Home', route: '/'},
                    {name: 'Over mij', route: '/about'},
                    {name: 'Contact', route: '/contact'}
                ];
            }
        }
    });
</script>

<div class="nav">
    <div class="nav-title">
        <a href="/">Stan</a><a href="/" style="color: #EF8320;">Jaworski</a>
    </div>
    <div class="nav-pages">
        <ul>
            {#each pages as page}
                <li><a href="{page.route}" style="{pageName == page.name ? 'cursor: default; color: #7b7b8f;' : ''} white-space: nowrap;">{page.name}</a></li>
            {/each}
        </ul>
    </div>
    <div class="nav-spotlight">
        <img class="lang-icon" src="{$currentLanguage == 'en' ? 'gb.svg' : $currentLanguage == 'nl' ? 'nl.svg' : 'gb.svg'}" alt="{$currentLanguage == 'en' ? 'English' : $currentLanguage == 'nl' ? 'Dutch' : 'English'}" on:click={changeLang}/>
        <a href="https://www.linkedin.com/in/stan-jaworski-5138731a2/" target="_blank"><i class="fa-brands fa-linkedin social-icon"></i></a>
        <a href="https://github.com/mrstaneh" target="_blank"><i class="fa-brands fa-github social-icon"></i></a>
    </div>
    <div class="nav-small-button" on:click={onNavDropdownClick}>
        <span class="nav-currentpage-text">{pageName}</span>
        {#if !showDropdown}
            <i class="fa-solid fa-angle-down" in:dropdownout="{{duration: 500}}"></i>
        {:else}
            <i class="fa-solid fa-angle-up" in:dropdownout="{{duration: 500}}"></i>
        {/if}
    </div>
</div>

{#if showDropdown}
    <div class="nav-dropdown-backdrop" on:click={onNavDropdownClick}></div>
    <div class="nav-dropdown-menu" in:dropdownin="{{duration: 250}}" out:dropdownout="{{duration: 100}}">
        <ul>
            {#each pages as page, i}
                <li class="nav-dropdown-item-{i}" on:click={() => {onItemClick(page.route)}} style="{pageName == page.name ? 'cursor: default;' : ''}"><a href="{page.route}" style="{pageName == page.name ? 'cursor: default; color: #7b7b8f;' : ''}">{page.name}</a></li>
            {/each}
        </ul>
        <div class="nav-dropdown-icons">
            <img class="lang-icon dropdown-lang-icon-image" src="{$currentLanguage == 'en' ? 'gb.svg' : $currentLanguage == 'nl' ? 'nl.svg' : 'gb.svg'}" alt="{$currentLanguage == 'en' ? 'English' : $currentLanguage == 'nl' ? 'Dutch' : 'English'}" on:click={changeLang}/>
            <a href="https://www.linkedin.com/in/stan-jaworski-5138731a2/" on:click={onNavDropdownClick} target="_blank"><i class="fa-brands fa-linkedin social-icon dropdown-icon-image"></i></a>
            <a href="https://github.com/mrstaneh" on:click={onNavDropdownClick} target="_blank"><i class="fa-brands fa-github social-icon dropdown-icon-image dropdown-icon-github"></i></a>
        </div>
    </div>
{/if}

<style>
    .nav{
        position:sticky;
        top: 0;
        left: 0;
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
        padding-bottom: 3px;
        margin-right: 22px;
    }

    /*.nav-title img{
        width: 48px;
        height: 48px;
        margin-right: 8px;
    }*/

    .nav-title a{
        font-family: 'Titillium Web', sans-serif;
        font-weight: 600;
        font-size: 36px;
        color: #4A4A55;
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
    }

    .nav-pages{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .nav-pages ul{
        padding-inline-start: 0;
        display: flex;
        list-style: none;
    }

    .nav-pages ul li a{
        text-decoration: none;
        margin-right: 1em;
        font-family: 'Titillium Web', sans-serif;
        font-weight: 600;
        color: #4A4A55;
        font-size: 18px;
    }

    li a:hover{
        color: rgb(105, 105, 121);
    }

    .nav-spotlight{
        margin-left: 68px;
        display: flex;
        align-items: center;
        justify-content: end;
    }

    @media(max-width: 662px){
        .nav-pages{
            display: none;
        }

        .nav-spotlight{
            display: none;
        }
    }

    .lang-icon{
        width: 20px;
        height: 20px;
        margin-right: 11px;
        border: 2px solid #4A4A55;
        border-radius: 100%;
        box-shadow: inset 0 0 0 5px #4A4A55;

        -webkit-tap-highlight-color: rgba(74, 74, 85, .2);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .dropdown-lang-icon-image{
        width: 28px;
        height: 28px;
    }

    .lang-icon:hover{
        cursor: pointer;
        filter: saturate(1.2);
        border-color: rgb(105, 105, 121);
    }

    .fa-linkedin{
        margin-right: 11px;
        font-size: 27px;
    }

    .fa-github{
        margin-right: 22px;
        font-size: 25px;
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
        padding-right: 22px;
    }

    .fa-angle-down, .fa-angle-up{
        color: #4A4A55;
        font-size: 26px;
    }

    .nav-small-button{
        cursor: pointer;
        -webkit-tap-highlight-color: rgba(74, 74, 85, .2);
    }

    @media(min-width: 663px){
        .nav-small-button{
            display: none;
        }
    }

    .nav-small-button:hover .nav-currentpage-text{
        color: rgb(105, 105, 121);
    }

    .nav-small-button:hover .fa-angle-down{
        color: rgb(105, 105, 121);
    }

    .nav-currentpage-text{
        font-family: 'Titillium Web', sans-serif;
        font-weight: 600;
        color: #4A4A55;
        font-size: 18px;
        margin-right: 8px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .nav-dropdown-backdrop{
        position: fixed;
        height: calc(100% - 60px);
        width: 100%;
        z-index: 998;
    }

    .nav-dropdown-menu{
        position: fixed;
        display: flex;
        flex-direction: column;
        background-color: white;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2);
        border: 1px solid #4A4A55;
        border-radius: 4px;
        margin-top: 5px;
        right: 5px;
        width: 30%;
        z-index: 999;
    }

    @media(max-width: 663px){
        .nav-dropdown-menu{
            width: 35%;
        }
    }

    @media(max-width: 500px){
        .nav-dropdown-menu{
            width: 40%;
        }
    }

    @media(max-width: 400px){
        .nav-dropdown-menu{
            width: 50%;
        }
    }

    .nav-dropdown-menu ul{
        padding-inline-start: 0;
        list-style: none;
        margin-block-start: 0.5em;
        margin-block-end: 0.5em;
    }

    .nav-dropdown-menu ul li{
        text-align: center;
        cursor: pointer;
        -webkit-tap-highlight-color: rgba(74, 74, 85, .2);
    }

    .nav-dropdown-menu ul li:hover a{
        color: rgb(105, 105, 121);
    }

    .nav-dropdown-menu ul li a {
        text-decoration: none;
        font-family: 'Titillium Web', sans-serif;
        font-weight: 600;
        color: #4A4A55;
        font-size: 24px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .nav-dropdown-menu ul li a:hover {
        color: rgb(105, 105, 121);
    }

    .nav-dropdown-icons{
        border-top: 1px solid #4A4A55;
        padding-top: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 8px;
    }

    .dropdown-icon-image{
        font-size: 35px;
        margin-right: 8px;
        margin-left: 8px;
    }

    .dropdown-icon-github{
        margin-right: 0px;
    }

    @media(min-width: 662px){
        .nav-dropdown-backdrop{
            display: none;
        }

        .nav-dropdown-menu{
            display: none;
        }
    }

</style>