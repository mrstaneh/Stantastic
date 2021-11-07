<script>
	import { currentLanguage } from '$lib/stores.js';
	import { fade } from 'svelte/transition';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="home-banner">
	<h1>Stan</h1><h1 class="h1-p2">tastic</h1>
	{#if $currentLanguage == 'en'}
		<p class="subtitle" in:fade={{duration: 250}} >
			Tailor-made websites
		</p>
	{:else if $currentLanguage == 'nl'}
		<p class="subtitle" in:fade={{duration: 250}} >
			Op maat gemaakte websites
		</p>
	{/if}
</div>

<style>
	.home-banner{
		margin-top: 5%;
	}

	p, h1{
		font-family: 'Titillium Web', sans-serif;
	}

    h1{
		display: inline;
        color: #4A4A55;
		font-size: 80px;
    }

	.h1-p2{
		color: #EF8320;
	}

	.subtitle{
		font-size: 18px;
		margin-top: 0px;
	}
</style>