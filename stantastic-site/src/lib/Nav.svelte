<script>
    import { goto } from '$app/navigation';
    import { expoOut } from 'svelte/easing';
    import { onMount } from 'svelte';

    $: innerWidth = 0;
    $: pageName = pages.filter(i => i.route == page.path)[0].name;
    
    let showDropdown = false;
    let loaded = false;
    export let page = undefined;

    let pages = [
        {name: 'Home', route: '/'},
        {name: 'About', route: '/about'},
        {name: 'Portfolio', route: '/portfolio'},
        {name: 'Contact', route: '/contact'}
    ]

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

    onMount(async () => {
        loaded = true;
    });
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
                    {#each pages as page}
                        <li><a href="{page.route}" style="{pageName == page.name ? 'cursor: default; color: #7b7b8f;' : ''}">{page.name}</a></li>
                    {/each}
                </ul>
            </div>
        {/if}
        {#if innerWidth > 627}
            <div class="nav-spotlight">
                <a href="https://www.linkedin.com/in/stan-jaworski-5138731a2/" target="_blank"><i class="fa-brands fa-linkedin social-icon"></i></a>
                <a href="https://github.com/mrstaneh" target="_blank"><i class="fa-brands fa-github social-icon"></i></a>
            </div>
        {/if}
        {#if innerWidth < 490}
            <div class="nav-small-button" on:click={onNavDropdownClick}>
                <span class="nav-currentpage-text">{pageName}</span>
                <i class="fa-solid fa-angle-down"></i>
            </div>
        {/if}
    </div>

    {#if showDropdown && innerWidth < 490}
        <div class="nav-dropdown-backdrop" on:click={onNavDropdownClick}></div>
        <div class="nav-dropdown-menu" in:dropdownin="{{duration: 250}}" out:dropdownout="{{duration: 100}}">
            <ul>
                {#each pages as page, i}
                    <li class="nav-dropdown-item-{i}" on:click={() => {onItemClick(page.route)}} style="{pageName == page.name ? 'cursor: default;' : ''}"><a href="{page.route}" style="{pageName == page.name ? 'cursor: default; color: #7b7b8f;' : ''}">{page.name}</a></li>
                {/each}
            </ul>
            <div class="nav-dropdown-icons">
                <a href="https://www.linkedin.com/in/stan-jaworski-5138731a2/" on:click={onNavDropdownClick} target="_blank"><i class="fa-brands fa-linkedin social-icon dropdown-icon-image"></i></a>
                <a href="https://github.com/mrstaneh" on:click={onNavDropdownClick} target="_blank"><i class="fa-brands fa-github social-icon dropdown-icon-image"></i></a>
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
        -webkit-tap-highlight-color: transparent;
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

    .nav-pages ul li a{
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
        padding-right: 22px;
    }

    .fa-angle-down{
        color: #4A4A55;
        font-size: 26px;
    }

    .nav-small-button{
        cursor: pointer;
        -webkit-tap-highlight-color: rgba(74, 74, 85, .2);
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
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .nav-dropdown-backdrop{
        position: absolute;
        height: calc(100% - 60px);
        width: 100%;
        z-index: 998;
    }

    .nav-dropdown-menu{
        position: absolute;
        display: flex;
        flex-direction: column;
        background-color: white;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2);
        border: 1px solid #4A4A55;
        border-radius: 4px;
        margin-top: 5px;
        right: 5px;
        width: 40%;
        z-index: 999;
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
        font-size: 36px;
        margin-right: 8px;
        margin-left: 8px;
    }
</style>