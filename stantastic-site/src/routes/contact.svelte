<script>
    import { currentLanguage } from '$lib/stores.js';

    let userEmail = undefined;
    let userMessage = undefined;
    let sendingEmail = false;
    let sentEmail = false;

    async function submitContactForm(){
        if(!sentEmail){
            if(userEmail && userMessage){
                try{
                    sendingEmail = true;
                    const res = await fetch('https://formspree.io/f/xeqnjlva', {
                        method: 'POST',
                        mode: 'no-cors',
                        body: JSON.stringify({
                            _replyto: userEmail,
                            message: userMessage,
                        })
                    });
                    sendingEmail = false;

                    if(res.status === 0){
                        sentEmail = true;
                        console.log('email sent');
                    }
                }catch(error){
                    console.log('failed? ', error);
                }
            }else{
                console.log('email or message incorrect');
            }
        }else{
            console.log('already sent email');
        }
    }
</script>

<svelte:head>
	<title>Contact</title>
</svelte:head>

<section class="section-base" id="about">
    <div class="section-header">
        <h1>Contact</h1>
        <div class="title-divider"></div>
    </div>
    <div class="section-content">
        <div class="section-text">
            {#if $currentLanguage == 'en'}
                <p>My inbox is always open, whether you have any questions or just want to say hi. Fill in the form below to send me an e-mail.</p>
            {:else if $currentLanguage == 'nl'}
                <p>Mijn inbox is altijd open als je een vraag hebt of gewoon even hallo wilt zeggen. Vul het formulier hieronder in om me een e-mail te sturen.</p>
            {/if}

        <!-- modify this form HTML and place wherever you want your form -->
        <form on:submit|preventDefault="{submitContactForm}">
            <label>
                Your email:
                <input type="email" bind:value={userEmail}>
            </label>
            <label>
                Your message:
                <textarea bind:value={userMessage}></textarea>
            </label>
            <button type="submit" disabled={sendingEmail}>Send</button>
        </form>

            <p>Stan Jaworski</p>
            <p>staneh@live.nl</p>
            <p>06-37611847</p>
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