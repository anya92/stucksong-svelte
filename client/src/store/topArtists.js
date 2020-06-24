import { writable } from "svelte/store";
import axios from "axios";

export const items = writable([]);
export const loading = writable(false);
export const error = writable(false);
export const hasMore = writable(true);

export const fetchTopArtists = async (limit = 10, offset = 0) => {
  try {
    loading.set(true);

    const response = await axios.get(
      `/api/top_artists?limit=${limit}&offset=${offset}`
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
