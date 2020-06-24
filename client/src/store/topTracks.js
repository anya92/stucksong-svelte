import { writable } from "svelte/store";
import axios from "axios";

export const items = writable([], () => {
  console.log("got a subscriber");
  return () => console.log("no more subscribers");
});

export const loading = writable(false);
export const error = writable(false);
export const hasMore = writable(true);

export const fetchTopTracks = async (limit = 10, offset = 0) => {
  try {
    loading.set(true);

    const response = await axios.get(
      `/api/top_tracks?limit=${limit}&offset=${offset}`
    );

    loading.set(false);
    items.update((value) => [...value, ...response.data.items]);

    if (!response.data.next) {
      hasMore.set(false);
    }
  } catch (err) {
    loading.set(false);
    error.set(true);
  }
};
