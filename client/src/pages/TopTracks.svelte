<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { link } from "svelte-spa-router";

  import {
    loading,
    items,
    error,
    hasMore,
    fetchTopTracks
  } from "../store/topTracks.js";
  import InfiniteScrolling from "../components/InfiniteScrolling";
  import TopNav from "../components/TopNav";
  import Error from "../components/Error";
  import Card from "../components/Card";
  import Loading from "../components/Loading";

  let loadMore = () => {
    fetchTopTracks(10, $items.length);
  };
  let rootElement = document.getElementById("top-tracks-area");

  onMount(() => {
    if (!$items.length) {
      fetchTopTracks();
    }

    window.scrollTo(0, 0);
  });
</script>

<style type="text/scss">
  #top-tracks-area {
    display: grid;
    grid-gap: 20px;
    padding: 10px 20px;
    max-width: 400px;
    margin: 0 auto;

    @media all and (min-width: 600px) {
      max-width: 600px;
    }
  }
</style>

<div in:fade={{ duration: 500 }}>
  <TopNav>Top Tracks</TopNav>

  <h1 style="padding: 10px 20px; font-size: .9rem; font-weight: 300;">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed rem obcaecati
    dolorum, nemo repudiandae doloribus nostrum veritatis est excepturi nam.
  </h1>

  <InfiniteScrolling
    {loadMore}
    loading={$loading}
    hasMore={$hasMore}
    {rootElement}>
    <div id="top-tracks-area">
      {#each $items as track, i}
        <Card position={i + 1}>
          <img
            slot="image"
            src={track.album.images[0].url}
            alt={track.album.name} />

          <span slot="title">{track.name}</span>
          <span slot="subtitle">
            {track.artists.map(artist => artist.name).join(', ')}
          </span>
          <span slot="text">{track.album.name}</span>

          <a slot="link" href={track.uri}>
            <i class="fas fa-play-circle" />
          </a>
        </Card>
      {/each}
    </div>

  </InfiniteScrolling>
  {#if $loading}
    <Loading />
  {/if}

  {#if $error}
    <Error />
  {/if}
</div>
