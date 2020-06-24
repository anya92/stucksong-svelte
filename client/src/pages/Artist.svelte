<script>
  import { onMount } from "svelte";
  import { data, loading, error, fetchArtist } from "../store/artist.js";

  export let params = {};

  onMount(() => {
    if (!$data[params.id]) {
      fetchArtist(params.id);
    }

    window.scrollTo(0, 0);
  });
</script>

{#if $loading}
  <div>Loading...</div>
{:else if !!$data[params.id]}
  <p>{$data[params.id].name}</p>
  <img src={$data[params.id].images[0].url} alt={$data[params.id].name} />
{/if}
