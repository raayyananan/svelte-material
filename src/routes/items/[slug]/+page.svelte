<script lang="ts">
    export let data;

    function handleBack(e) {
        history.back();
    }

    let favourite = false;
    function switchFavourite() {
        favourite = !favourite;
    }
</script>

<svelte:head>
    <title>{data.image.title}</title>
</svelte:head>

<div class="page-container">
    <div class="image-detail-container">
        <md-text-button class="fit-width-button" on:click={handleBack} on:keyup={() => {}} role="link" aria-label="Go back" tabindex=0>
            Back
            <md-icon slot="icon" class="material-symbols-outlined">arrow_back</md-icon>
        </md-text-button>
        <button class="image-wrapper" on:click={switchFavourite} on:keyup={() => {}} role="link" aria-label="Go back" tabindex=0>
            <img id="image" src="{data.image.url}" alt="{data.image.title}" style="view-transition-name: thumbnail-image">
            <div id="circle">
                {#if favourite}
                <md-icon class="material-symbols-outlined">heart_check</md-icon>
                {:else}
                <md-icon class="material-symbols-outlined">favorite</md-icon>
                {/if}
            </div>
            <md-ripple></md-ripple>
        </button>
        <div class="heading-line">
            <h1 class="headline-large bold-weight" id="name">{data.image.title}</h1> 
            <md-filled-tonal-icon-button on:click={switchFavourite} on:keyup={() => {}} role="link" aria-label="Go back" tabindex=0>                
                {#if favourite}
                <md-icon class="material-symbols-outlined">heart_check</md-icon>
                {:else}
                <md-icon class="material-symbols-outlined">favorite</md-icon>
                {/if}
            </md-filled-tonal-icon-button>
        </div>
        <p>{data.image.description}</p>
    </div>
</div>

<style lang="scss">
    .image-detail-container {
        display: flex;
        flex-flow: column nowrap;
        gap: 10px;
        width: 50%;

        @media (max-width: 560px) { // mobile-width
            width: 100%;
            box-sizing: border-box;
            padding: 10px;

            .heading-line h1 {
                max-width: 85%;
            }
        }
        .heading-line {
            display: flex;
            justify-content: space-between;
            align-items: center;

            md-filled-tonal-icon-button {
                flex-shrink: 0;
            }
        }
        .image-wrapper {
            all: unset;
            position: relative;
            width: fit-content;
            max-width: min(400px, 100%);
            cursor: pointer;
            #circle {
                position: absolute;
                top: 50%;
                right: 0;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background: var(--md-sys-color-primary);
                color: var(--md-sys-color-on-primary);
                translate: 0 -0%;
                transition: var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized);
                z-index: 0;
                display: flex;
                align-items: center;
                justify-content: center;

                .material-symbols-outlined {
                    // transition: var(--md-sys-motion-duration-long2) cubic-bezier(0.175, 0.885, 0.32, 1.375);
                    transition: var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized);
                    rotate: -90deg;
                }
            }
            img {
                position: relative;
                z-index: 1;
                transition: var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized);
            }
            md-ripple {
                --md-ripple-hover-color: rgba(0,0,0,0);
                // --md-ripple-pressed-opacity: 0.2;
                border-radius: 16px;
                transition: var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized);
                z-index: 2;
            }
            @media (pointer: fine) {
                &:hover {
                img, md-ripple {
                    rotate: -5deg;
                    translate: -15px -5px;
                }
                #circle {
                    translate: 24% -60%;
                    rotate: 45deg;
                    transform-origin: bottom;

                    .material-symbols-outlined {
                        rotate: 0deg;
                    }
                }
            }
            }
            &:active {
                #circle {
                    transition: var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-emphasized);
                    box-shadow: 0 0 16px rgba(255, 255, 255, 0.4);
                    scale: 0.9;

                    .material-symbols-outlined {
                        transition: var(--md-sys-motion-duration-short2) var(--md-sys-motion-easing-emphasized);
                        scale: 1.1;
                        rotate: -45deg;
                    }
                }
                img, md-ripple {
                    scale: 0.99;
                }
            }
        }
        img {
            max-width: min(400px, 100%);
            aspect-ratio: 4/3;
            object-fit: cover;
            border-radius: 16px;
        }
        p {
            margin: 0;
            max-width: 85%;
        }
        md-filled-tonal-icon-button md-icon, #circle md-icon {
            animation: scale-up var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-emphasized-decelerate);
            @keyframes scale-up {
                0% {opacity: 0; scale: 0;}
                100% {opacity: 1; scale: 1;}
            }
        }
    }
</style>