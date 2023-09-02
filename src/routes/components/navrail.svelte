<script lang="ts">
  import { page } from '$app/stores';
  
</script>

<nav class="navrail">
  <a href="/" class="navrail-button { $page.url.pathname === '/' ? 'active' : '' }" aria-label="Home" id="home">
      <span class="icon material-symbols-outlined">
        home
        <md-ripple for="home"></md-ripple>
        <md-focus-ring for="home"></md-focus-ring>
      </span>
      <div class="text label-medium">Home</div>
  </a>
  <a href="/items" class="navrail-button { $page.url.pathname.includes('/items') ? 'active' : '' }" aria-label="Collections" id="collections">
      <span class="icon material-symbols-outlined">
        Collections
        <md-ripple for="collections"></md-ripple>
        <md-focus-ring for="collections"></md-focus-ring>
      </span>
      <div class="text label-medium">Items</div>
    </a>
    <a href="/" class="navrail-button" aria-label="Develop" id="develop">
      <span class="icon material-symbols-outlined">
        code
        <md-ripple for="develop"></md-ripple>
        <md-focus-ring for="develop"></md-focus-ring>
      </span>
      <div class="text label-medium">Develop</div>
    </a>
    <a href="/" class="navrail-button" aria-label="Contribute" id="contribute">
      <span class="icon material-symbols-outlined">
        add_circle
        <md-ripple for="contribute"></md-ripple>
        <md-focus-ring for="contribute"></md-focus-ring>
      </span>
      <div class="text label-medium">Contribute
        <!-- <md-ripple></md-ripple> -->
      </div>
    </a>
    <a href="/contact" class="navrail-button { $page.url.pathname === '/contact' ? 'active' : '' }" aria-label="Contact" id="contact">
      <span class="icon material-symbols-outlined">
        Mail
        <md-ripple for="contact"></md-ripple>
        <md-focus-ring for="contact"></md-focus-ring>
      </span>
      <div class="text label-medium">Contact</div>
    </a>
</nav>
<div class="navrail-filler"></div>

<style lang="scss">
  .navrail {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      gap: 20px;
      flex: 88px 0 0;
      width: 88px;
      box-sizing: border-box;
      padding: 25px 0;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2;

      .navrail-button {
          all: unset;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          position: relative;
          font-size: 12px;
          font-weight: 600;

          --md-ripple-hover-opacity: 0;

          .icon {
          border-radius: 20px;
          width: 52px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-emphasized) background-color;
          position: relative;
          }
          .text {font-weight: var(--semibold-weight)}

          @media (pointer: fine) {
          &:hover {
              .icon {
              background-color: var(--md-sys-color-secondary-container);
              }
              .text {
              font-weight: var(--bold-weight);
              }
          }
          }
          &.active .icon {background-color: var(--md-sys-color-secondary-container);}
          // &:focus-visible .icon {
          // animation: var(--md-sys-motion-duration-long4) var(--md-sys-motion-easing-emphasized-decelerate) outline-animation forwards;
          // @keyframes outline-animation {
          //   0% {outline: 0px solid var(--md-sys-color-primary)}
          //   25% {outline: 8px solid var(--md-sys-color-primary)}
          //   100% {outline: 3px solid var(--md-sys-color-primary)}
          // }
          // }
      }
  }
  .navrail-filler {
      flex: 88px 0 0;
      width: 88px;
  }

  @media (max-width: 560px) { // mobile-width
    .navrail-filler {
      display: none;
    }
    .navrail {
      top: inherit;
      bottom: 0;
      height: 80px;
      flex-flow: row nowrap;
      width: 100%;
      justify-content: space-evenly;
      background: var(--md-sys-color-surface-container);
      gap: 0px;
      view-transition-name: navrail;
    }
  }
</style>

