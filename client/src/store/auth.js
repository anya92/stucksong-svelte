import { readable } from "svelte/store";
import axios from "axios";

const initialValue = {
  loading: false,
  data: null,
  error: false,
};

export const userLoggedIn = readable(initialValue, async (set) => {
  try {
    set({ loading: true });
    const response = await axios.get("/auth/me");
    console.log(response);
    if (response.data) {
      set({ loading: false, data: response.data, error: false });
    } else {
      set({ loading: false, data: null, error: false });
    }
  } catch (err) {
    console.log("fetching user error:", err);
    set({ loading: false, data: null, error: true });
  }
  return function stop() {};
});
