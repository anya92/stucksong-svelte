<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { loading, items, error, fetchPlaylists } from "../store/playlists";

  import TopNav from "../components/TopNav";
  import Loading from "../components/Loading";
  import Error from "../components/Error";

  onMount(() => {
    if (!$items.length) {
      fetchPlaylists();
    }
  });
</script>

<style type="text/scss">
  #playlists-grid {
    display: grid;
    grid-gap: 15px;
    padding: 10px 20px;
  }
  .playlist-item {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 80px auto;
    box-shadow: var(--primary-color-light) 0 0.5em 1em 0;
    border-radius: 10px;
    padding: 10px;
    border: 1px solid var(--primary-color-light);
    &__cover {
      img {
        width: 100%;
        object-fit: cover;
        border-radius: 10px;

        box-shadow: var(--primary-color-light-2) 0 0.5em 1em 0;
      }
    }
  }
</style>

<TopNav>Playlists</TopNav>

<h1 style="padding: 10px 20px; font-size: .9rem; font-weight: 300;">
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed rem obcaecati
  dolorum, nemo repudiandae doloribus nostrum veritatis est excepturi nam.
</h1>

{#if $loading}
  <Loading />
{:else if $error}
  <Error />
{:else if !$items.length}
  <div>You haven't created any playlists yet.</div>
{:else}
  <div id="playlists-grid" in:fade={{ duration: 500 }}>
    {#each $items as playlist}
      <div class="playlist-item">
        <div class="playlist-item__cover">
          <img src={playlist.images[1].url} alt="" />
        </div>
        <div style="font-weight: 500;">{playlist.name}</div>
      </div>
    {/each}
  </div>
{/if}
