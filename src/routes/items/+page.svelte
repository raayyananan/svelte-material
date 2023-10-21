<script lang="ts">
    export let data;

    function setViewTransitionName(id: string) {
        const elem = document.querySelector(`#${id}`) as HTMLElement;
        elem.style.setProperty('view-transition-name', 'thumbnail-image');
    }
</script>

<svelte:head>
    <title>Items - Svelte Material</title>
</svelte:head>

<div class="gallery-grid">
    <div class="top-bar">
        <h1 class="display-large bold-weight">Your Collections</h1>
    </div>
    {#each data.images as {name, slug, url}}
        <a href="/items/{slug}" data-sveltekit-noscroll id={slug} class="gallery-grid-item" on:click={() => {setViewTransitionName(slug)}}>
            <img src="{url}" alt="{name}">
            <md-ripple></md-ripple>
        </a>
    {/each}
</div>

<style lang="scss">
    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        box-sizing: border-box;
        padding: 20px;
        gap: 20px;
        height: fit-content;

        .top-bar {
            grid-column: span 4;
            box-sizing: border-box;
            padding: 38px 0 48px 0px;
        }

        .gallery-grid-item {
            border-radius: 16px;
            position: relative;
            overflow: hidden;
            --md-ripple-hover-opacity: 0.03;

            &:focus-visible {
                outline: none;
                img {
                    outline: 0px solid var(--md-sys-color-secondary);
                    outline-offset: 2px;
                    animation: outline-ripple var(--md-sys-motion-easing-emphasized) 600ms forwards;
                    @keyframes outline-ripple {
                        0% {outline-width: 0px}
                        25% {outline-width: 8px}
                        100% {outline-width: 3px}
                    }
                }
            }
            // &:hover {
            //     img {scale: 1.025}
            // }
            img {
                width: 100%;
                aspect-ratio: 4/3;
                object-fit: cover;
                border-radius: 16px;
                // transition: scale var(--md-sys-motion-duration-long4) var(--md-sys-motion-easing-emphasized-decelerate);
            }
        }

        @media (max-width: 560px) { // mobile-width
            grid-template-columns: 1fr 1fr;
            padding: 10px 10px 98px 10px;
            gap: 10px;

            .top-bar {grid-column: span 2}
        }

        @media (max-width: 972px) { // mobile-width
            grid-template-columns: 1fr 1fr 1fr;
            padding: 10px 10px 98px 10px;
            gap: 10px;

            .top-bar {grid-column: span 3}
        }
    }    
</style>