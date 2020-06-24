const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const path = require("path");

const app = express();

require("dotenv").config({ path: ".env" });

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

require("./models/User");
require("./passport");

app
  .use(morgan("tiny"))
  .use(cors())
  .use(cookieParser())
  .use(
    session({
      secret: process.env.SECRET,
      key: process.env.KEY,
      cookie: { maxAge: 14 * 24 * 60 * 60 * 1000 }, // 14 days
      saveUninitialized: true,
      resave: true,
      store: new MongoStore({
        mongooseConnection: mongoose.connection
      })
    })
  )
  .use(passport.initialize())
  .use(passport.session());

const router = require("./routes");
app.use(router);

app.use(express.static(path.join(__dirname, "client/public")));

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(__dirname, "client/public/index.html");
  });
}

module.exports = app;
