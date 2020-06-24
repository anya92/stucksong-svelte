<script>
  import { link } from "svelte-spa-router";
</script>

<style type="text/scss">
  .top-nav {
    padding: 20px 10px;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 500;

    a {
      text-decoration: none;
      margin-right: 20px;
      font-size: 1.4rem;
      padding: 0 10px;
    }
  }
</style>

<div class="top-nav">
  <a href="/" use:link>
    <i class="fas fa-chevron-left" />
  </a>
  <slot />
</div>
