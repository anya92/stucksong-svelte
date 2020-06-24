<script>
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
</script>

<style type="text/scss">
  .bottom-nav {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 80px;
    background: #fff;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(5, 1fr);
    padding: 10px;
    z-index: 10;
    -webkit-filter: drop-shadow(0 0.5em 1em var(--primary-color-light-2));
    filter: drop-shadow(0 0.5em 1em var(--primary-color-light-2));
    border-radius: 20px 20px 0 0;
  }

  .bottom-nav__item {
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      position: relative;
      width: 100%;
      font-size: 1.2rem;
      text-decoration: none;
      color: #ccc;
    }

    a:focus,
    a:hover,
    a:active {
      box-shadow: none;
      background: inherit;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-tap-highlight-color: transparent;
    }

    :global(a.active) {
      transform: scale(1.2);
      color: var(--primary-color) !important;
    }
  }
</style>

<div class="bottom-nav">
  <div class="bottom-nav__item">
    <div class="bottom-nav__item__icon">
      <a href="/top-tracks" use:link use:active>
        <i class="fas fa-compact-disc" />
      </a>
    </div>
  </div>
  <div class="bottom-nav__item">
    <div class="bottom-nav__item__icon">
      <a href="/top-artists" use:link use:active>
        <i class="fas fa-microphone-alt" />
      </a>
    </div>
  </div>
  <div class="bottom-nav__item bottom-nav__item--main">
    <div class="bottom-nav__item__icon">
      <a href="/" use:link use:active>
        <i class="fas fa-home" />
      </a>
    </div>
  </div>
  <div class="bottom-nav__item">
    <div class="bottom-nav__item__icon">
      <a href="/playlists" use:link use:active>
        <i class="fas fa-play-circle" />
      </a>
    </div>
  </div>
  <div class="bottom-nav__item">
    <div class="bottom-nav__item__icon">
      <a href="/account" use:link use:active>
        <i class="fas fa-user" />
      </a>
    </div>
  </div>
</div>
