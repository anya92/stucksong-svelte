<script>
  import { onDestroy } from "svelte";
  import Router from "svelte-spa-router";

  import { userLoggedIn } from "./store/auth.js";

  import Login from "./pages/Login.svelte";
  import Home from "./pages/Home.svelte";
  import TopTracks from "./pages/TopTracks.svelte";
  import TopArtists from "./pages/TopArtists.svelte";
  import Artist from "./pages/Artist.svelte";
  import Playlists from "./pages/Playlists.svelte";
  import Account from "./pages/Account";
  import Loading from "./components/Loading";
  import BottomNav from "./components/BottomNav.svelte";

  let loading = false,
    error = false,
    isLoggedIn = false;

  const unsubscribe = userLoggedIn.subscribe(value => {
    loading = value.loading;
    error = value.error;
    isLoggedIn = !!value.data;
  });

  onDestroy(unsubscribe);

  const routes = {
    "/top-tracks": TopTracks,
    "/top-artists": TopArtists,
    "/artist/:id": Artist,
    "/playlists": Playlists,
    "/account": Account,
    "/": Home
  };
</script>

<style>
  main {
    min-height: 100vh;
    background-color: var(--background-color);
  }
  footer {
    padding: 20px;
  }
</style>

<main>
  {#if loading}
    <Loading />
  {:else if error}
    <p>Sorry, error</p>
  {:else if !isLoggedIn}
    <Login />
  {:else}
    <div style="padding-bottom: 40px;">
      <Router {routes} />
    </div>
    <BottomNav />
  {/if}
  <footer />
</main>
