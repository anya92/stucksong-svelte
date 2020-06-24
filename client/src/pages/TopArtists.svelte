<script>
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";
  import { fade } from "svelte/transition";

  import {
    items,
    loading,
    error,
    hasMore,
    fetchTopArtists
  } from "../store/topArtists.js";

  import InfiniteScrolling from "../components/InfiniteScrolling";
  import TopNav from "../components/TopNav";
  import Card from "../components/Card";
  import Loading from "../components/Loading";
  import Error from "../components/Error";

  let loadMore = () => {
    fetchTopArtists(10, $items.length);
  };
  let rootElement = document.getElementById("top-artists-area");

  onMount(() => {
    if (!$items.length) {
      fetchTopArtists();
    }

    window.scrollTo(0, 0);
  });
</script>

<style type="text/scss">
  #top-artists-area {
    display: grid;
    grid-gap: 25px;
    margin: 0 auto;
    padding: 10px 20px;

    @media all and (min-width: 600px) {
      max-width: 600px;
    }
  }
</style>

<div in:fade={{ duration: 500 }}>
  <TopNav>Top Artists</TopNav>

  <h1 style="padding: 10px 20px; font-size: .9rem; font-weight: 300;">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed rem obcaecati
    dolorum, nemo repudiandae doloribus nostrum veritatis est excepturi nam.
  </h1>

  <InfiniteScrolling
    {loadMore}
    loading={$loading}
    hasMore={$hasMore}
    {rootElement}>
    <div id="top-artists-area">
      {#if $items.length}
        {#each $items as artist, i}
          <Card position={i + 1}>
            <img slot="image" src={artist.images[0].url} alt={artist.name} />

            <span slot="title">{artist.name}</span>
            <span slot="text">
              <div>{artist.genres.slice(0, 4).join(', ')}</div>
            </span>

            <a slot="link" href={`/artist/${artist.id}`} use:link>
              <i class="fas fa-angle-double-right" />
            </a>
          </Card>
        {/each}
      {/if}
    </div>
  </InfiniteScrolling>

  {#if $loading}
    <Loading />
  {/if}
  {#if $error}
    <Error />
  {/if}
</div>
