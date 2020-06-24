const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  spotifyId: String,
  username: String,
  photo: String,
  playlistIds: {
    type: [String],
    default: []
  },
  access_token: String,
  refresh_token: String,
  expiration_time: Number
})

mongoose.model('User', userSchema)
