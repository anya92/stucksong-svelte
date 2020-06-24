import { writable } from "svelte/store";
import axios from "axios";

const initialValues = {
  "06vRrrjT3DBRkhBlXoBdYj": {
    external_urls: {
      spotify: "https://open.spotify.com/artist/06vRrrjT3DBRkhBlXoBdYj",
    },
    followers: {
      href: null,
      total: 52381,
    },
    genres: ["pop"],
    href: "https://api.spotify.com/v1/artists/06vRrrjT3DBRkhBlXoBdYj",
    id: "06vRrrjT3DBRkhBlXoBdYj",
    images: [
      {
        height: 640,
        url: "https://i.scdn.co/image/dba4e2eff53a63bb07050f41212284890bf7a31a",
        width: 640,
      },
      {
        height: 320,
        url: "https://i.scdn.co/image/17175727761f383fbc3698a08ef54186d6c91295",
        width: 320,
      },
      {
        height: 160,
        url: "https://i.scdn.co/image/02d2dc2d077b811f34af6057df5b76d9ae500d35",
        width: 160,
      },
    ],
    name: "Lauren Sanderson",
    popularity: 56,
    type: "artist",
    uri: "spotify:artist:06vRrrjT3DBRkhBlXoBdYj",
  },
};

export const data = writable({});
export const loading = writable(false);
export const error = writable(false);

export const fetchArtist = async (id) => {
  try {
    loading.set(true);

    const response = await axios.get(`/api/artist/${id}`);

    loading.set(false);
    data.update((value) => ({
      ...value,
      [response.data.id]: response.data,
    }));
  } catch (err) {
    loading.set(false);
    error.set(true);
  }
};
