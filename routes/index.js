const express = require('express')

const controllers = require('../controllers')

const router = express.Router()

// auth routes
router
  .get('/auth/spotify', controllers.auth.login)
  .get('/auth/spotify/callback', controllers.auth.loginCallback)
  .get('/auth/me', controllers.auth.getUser)
  .get('/auth/logout', controllers.auth.logout)

// API routes
router
  .get(
    '/api/top_tracks',
    controllers.auth.isLoggedIn,
    controllers.api.checkAccessToken,
    controllers.api.getTopTracks
  )
  .get(
    '/api/top_artists',
    controllers.auth.isLoggedIn,
    controllers.api.checkAccessToken,
    controllers.api.getTopArtists
  )
  .get(
    '/api/artist/:id',
    controllers.auth.isLoggedIn,
    controllers.api.checkAccessToken,
    controllers.api.getArtistInfo
  )
  .get(
    '/api/create_playlist',
    controllers.auth.isLoggedIn,
    controllers.api.checkAccessToken,
    controllers.api.createPlaylist
  )
  .get(
    '/api/playlists',
    controllers.auth.isLoggedIn,
    controllers.api.checkAccessToken,
    controllers.api.getPlaylists
  )

module.exports = router
