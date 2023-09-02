<script lang="ts">
    let name: string, subject: string, message: string;

    const updateName = (e) => {name = e.target.value; message = message + '%0D%0A' + name}
    const updateSubject = (e) => {subject = e.target.value;}
    const updateMessage = (e) => {message = e.target.value + '%0D%0A' + name}
</script>

<svelte:head>
    <title>Contact - Svelte Material</title>
</svelte:head>

<div class="page-container">
    <div class="wrapper">
        <div class="top-bar">
            <h1>Contact Me</h1>
            <md-icon-button href="/"><md-icon class="material-symbols-outlined">close</md-icon></md-icon-button>
        </div>
        <div class="text-field-flex-container">
            <!-- <div class="text-field-flex-section"> -->
            <!-- </div> -->
            <md-outlined-text-field label="Name" type="text" on:input={updateName}></md-outlined-text-field>
            <md-outlined-text-field label="Subject" type="text" on:input={updateSubject}></md-outlined-text-field>
            <md-outlined-text-field class="textarea" label="Your message here..." type="textarea" on:input={updateMessage}></md-outlined-text-field>
            <md-filled-button class="demo-mail-button" href="mailto:raytariq93@gmail.com?subject={subject}&body={message}" target="_blank">
                <md-icon slot="icon" class="material-symbols-outlined">mail</md-icon>
                Send Mail
            </md-filled-button>
        </div>
    </div>
</div>

<style lang="scss">
    .wrapper {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        min-width: 400px;

        @media (max-width: 560px) { // mobile-width 
            box-sizing: border-box;
            padding: 0 10px;
            min-width: 100%;
        }

        .top-bar {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
    md-outlined-text-field {width: 100%}
    .text-field-flex-container {
        display: flex;
        flex-flow: column nowrap;
        align-items: flex-end;
        width: 100%;
        gap: 10px;

        // .text-field-flex-section {
        //     display: flex;
        //     gap: 10px;
        // }
        .textarea {
            min-height: 125px;
            resize: vertical;
        }
        .demo-mail-button {
            width: fit-content;
            .material-symbols-outlined {
                font-size: 17px;
            }
        }
    }
</style>