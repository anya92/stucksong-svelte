const passport = require("passport");

exports.login = passport.authenticate("spotify", {
  scope: [
    "user-top-read",
    "playlist-modify-public",
    "user-read-currently-playing"
  ]
});

exports.loginCallback = (req, res, next) => {
  passport.authenticate("spotify", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect("/");

    req.logIn(user, err => {
      if (err) return next(err);

      // return res.redirect(req.session.returnTo || '/')
      return res.redirect("/");
    });
  })(req, res, next);
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  // req.session.returnTo = req.originalUrl
  res.redirect("/auth/spotify");
};

exports.getUser = (req, res) => {
  res.send(req.user);
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
