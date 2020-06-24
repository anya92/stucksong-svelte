<script>
  import { onDestroy } from "svelte";
  import { link } from "svelte-spa-router";
  import { slide, fade } from "svelte/transition";

  import { userLoggedIn } from "../store/auth.js";

  import BottomNav from "../components/BottomNav.svelte";

  let user = {};

  const unsubscribe = userLoggedIn.subscribe(value => {
    user = value.data;
  });

  onDestroy(unsubscribe);
</script>

<style type="text/scss">
  .container {
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
    height: calc(100vh - 80px);
    display: flex;
    align-items: center;
  }
  h1 {
    font-size: 2rem;
    font-weight: 900;
  }
</style>

<div class="container">
  <div
    style="width: 100%;display: grid; grid-gap: 20px; grid-template-columns: 1fr
    70px; align-items: center;"
    in:slide={{ duration: 800 }}>
    <h1>
      Hello,
      <br />
      {user.username}
    </h1>

    <!-- <img src={user.photo} alt="user photo" /> -->
  </div>
</div>
