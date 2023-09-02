<script lang="ts">
    import '@material/web/iconbutton/icon-button';
    import '@material/web/iconbutton/filled-tonal-icon-button';
    import '@material/web/button/text-button';
    import '@material/web/button/filled-button';
    import '@material/web/textfield/outlined-text-field.js';
    import './app.scss';
    import '../css/theme.css';
    
    import Navrail from './components/navrail.svelte';
    import { onNavigate } from '$app/navigation';

    onNavigate((navigation) => {
        if (!document.startViewTransition) return;

        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            })
        })
        
    })
</script>

<main class="container">
    <Navrail />

    <slot />
</main>

<style lang="scss">
    .container {
        display: flex;
        width: 100%;
        height: 100%;
    }
</style>