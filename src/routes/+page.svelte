<script lang="ts">
    // import { onMount } from "svelte";
    // onMount(async () => {
    //     const {SquigglySlider} = await import("./components/squiggly-slider");
    //     window.customElements.define('squiggly-slider', SquigglySlider);
    // })
</script>

<svelte:head>
    <title>Svelte Material</title>
</svelte:head>

<div class="page-container">
    <h1>Welcome to SvelteKit</h1>
    <squiggly-slider></squiggly-slider>
</div>

<style lang="scss">
    // squiggly-slider {
    // }
</style>