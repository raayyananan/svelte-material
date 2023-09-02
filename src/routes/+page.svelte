<script lang="ts">
    import { onMount } from "svelte";
    import {SquigglySlider} from "./components/squiggly-slider";
    
    onMount(() => {
        window.customElements.define('squiggly-slider', SquigglySlider);
    })
</script>

<svelte:head>
    <title>Svelte Material</title>
</svelte:head>

<div class="page-container">
    <div>
        <h1>Welcome to SvelteKit</h1>
        <!-- <squiggly-slider></squiggly-slider> -->
    </div>
</div>

<style lang="scss">
    squiggly-slider {
        width: 100%;
    }
</style>