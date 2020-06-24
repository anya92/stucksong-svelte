const axios = require("axios");
const mongoose = require("mongoose");

const User = mongoose.model("User");

const API_BASE_URL = "https://api.spotify.com/v1";

const refreshTokens = async user => {
  const { data } = await axios({
    url: "https://accounts.spotify.com/api/token",
    method: "post",
    params: {
      grant_type: "refresh_token",
      refresh_token: user.refresh_token
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    auth: {
      username: process.env.CLIENT_ID,
      password: process.env.CLIENT_SECRET
    }
  });

  const expirationTime = new Date().getTime() + data.expires_in * 1000;

  await User.findByIdAndUpdate(
    user.id,
    {
      access_token: data.access_token,
      expiration_time: expirationTime
    },
    { new: true }
  );
};

exports.checkAccessToken = async (req, res, next) => {
  const tokenExpirationTime = req.user.expiration_time;

  if (new Date().getTime() > tokenExpirationTime) {
    console.log("access_token expired");
    try {
      await refreshTokens(req.user);
    } catch (error) {
      return next(error);
    }
  }
  return next();
};

exports.getTopTracks = async (req, res) => {
  const user = await User.findById(req.user.id);

  const limit = req.query.limit || 10;
  const offset = req.query.offset || 0;

  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/me/top/tracks?limit=${limit}&offset=${offset}&time_range=short_term`,
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`
        }
      }
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTopArtists = async (req, res) => {
  const user = await User.findById(req.user.id);

  const limit = req.query.limit || 10;
  const offset = req.query.offset || 0;

  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/me/top/artists?limit=${limit}&offset=${offset}&time_range=short_term`,
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`
        }
      }
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getArtistInfo = async (req, res) => {
  const user = await User.findById(req.user.id);

  const id = req.params.id;

  const headers = {
    Authorization: `Bearer ${user.access_token}`
  };

  try {
    const urls = [
      `${API_BASE_URL}/artists/${id}`,
      `${API_BASE_URL}/artists/${id}/top-tracks?country=from_token`,
      `${API_BASE_URL}/artists/${id}/related-artists`
    ];
    const artistPromises = urls.map(url => axios.get(url, { headers }));

    const [
      { data: artistInfo },
      { data: artistTopTracks },
      { data: artistRelated }
    ] = await Promise.all(artistPromises);

    res.status(200).json({
      ...artistInfo,
      ...artistTopTracks,
      artists_related: artistRelated.artists
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createPlaylist = async (req, res) => {
  const user = await User.findById(req.user.id);

  const name = req.query.name || `${user.username}'s Top Tracks`;
  const description = req.query.description || "";
  const numberOfTracks = req.query.numberOfTracks || 50;

  try {
    // create a new playlist
    const {
      data: { id: playlistId }
    } = await axios({
      url: `${API_BASE_URL}/users/${user.spotifyId}/playlists`,
      method: "post",
      data: {
        name,
        description
      },
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        "Content-Type": "application/json"
      }
    });

    // get user's top tracks
    const {
      data: { total, items: tracks }
    } = await axios.get(
      `${API_BASE_URL}/me/top/tracks?limit=${numberOfTracks}&time_range=short_term`,
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`
        }
      }
    );

    if (total > 0) {
      // add tracks to the playlist
      const uris = tracks.map(track => track.uri);

      await axios({
        url: `${API_BASE_URL}/users/${user.spotifyId}/playlists/${playlistId}/tracks`,
        method: "post",
        data: {
          uris
        },
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          "Content-Type": "application/json"
        }
      });
    }

    // get playlist's data
    const { data: playlistInfo } = await axios({
      url: `${API_BASE_URL}/playlists/${playlistId}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${user.access_token}`
      }
    });

    // store playlist's id in db
    await User.findByIdAndUpdate(
      user.id,
      {
        $push: { playlistIds: playlistId }
      },
      { new: true }
    );

    res.status(200).json(playlistInfo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPlaylists = async (req, res) => {
  const user = await User.findById(req.user.id);
  const { playlistIds } = user;

  try {
    const playlistPromises = playlistIds.map(id =>
      axios.get(`${API_BASE_URL}/playlists/${id}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`
        }
      })
    );

    const playlistsResponse = await Promise.all(playlistPromises);
    const data = playlistsResponse.map(res => res.data);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
