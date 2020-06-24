const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy
const mongoose = require('mongoose')

const User = mongoose.model('User')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    })
    .catch(error => done(error))
})

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/spotify/callback',
      proxy: true
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      User.findOne({ spotifyId: profile.id }).then(existingUser => {
        if (existingUser) {
          // user is already in database
          done(null, existingUser, { refreshToken, accessToken })
        } else {
          // save new user
          const expirationTime = new Date().getTime() + expires_in * 1000

          new User({
            spotifyId: profile.id,
            username: profile.displayName || profile.username,
            photo: profile.photos[0],
            access_token: accessToken,
            refresh_token: refreshToken,
            expiration_time: expirationTime
          })
            .save()
            .then(user => done(null, user, { refreshToken, accessToken }))
        }
      })
    }
  )
)
