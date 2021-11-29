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
                <div class="form-input">
                    <label for="userEmailInput">Your email</label>
                    <input type="email" id="userEmailInput" bind:value={userEmail}>
                </div>
                <div class="form-input">
                    <label for="userMessageInput">Your message</label>
                    <textarea id="userMessageInput" bind:value={userMessage} rows="5"></textarea>
                </div>
                <button id="userEmailSubmit" type="submit" disabled={sendingEmail}>Submit {#if sendingEmail}<i class="loader fa-solid fa-cog fa-spin"></i>{/if}</button>
            </form>
        </div>
    </div>
</section>

<style>
    form{
        width: 100%;
    }

    .loader{
        margin-left: 4px;
        font-size: 16px;
    }

    label{
        font-size: 16px;
        font-weight: 600;
    }

    input, textarea{
        outline: 1px solid transparent;
    }

    input:focus, textarea:focus{
        outline: 1px solid #7b7b8f;
        transition-duration: 200ms;
    }

    input[type=email], textarea{
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        margin-top: 6px;
        margin-bottom: 6px;
        font-family: 'Titillium Web', sans-serif;
        font-size: 16px;
        color: black;
    }

    button[type=submit]{
        display: block;
        padding: 12px 20px;
        width: 140px;
        background-color: #FFFFFF;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        font-family: 'Titillium Web', sans-serif;
        color: black;
        cursor: pointer;
    }

    button[type=submit]:disabled{
        background: #f2f2f2;
        cursor:default;
    }

    button[type=submit]:not(:disabled):hover{
        background-color: #f2f2f2;
    }

    .form-input{
        text-align: start;
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

    label, p, h1{
        font-family: 'Titillium Web', sans-serif;
        color: black;
    }
</style>