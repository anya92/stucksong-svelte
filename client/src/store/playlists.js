import { writable } from "svelte/store";
import axios from "axios";

export const loading = writable(false);
export const items = writable([]);
export const error = writable(false);

export const fetchPlaylists = async () => {
  try {
    loading.set(true);

    const response = await axios("/api/playlists"); // FIXME:
    console.log(response);

    loading.set(false);
    items.update((value) => [...value, ...response.data]);
  } catch (err) {
    loading.set(false);
    error.set(true);
  }
};
