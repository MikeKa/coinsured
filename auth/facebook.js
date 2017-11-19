var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/User');
var fbCallback = config.get('fbCallback');

passport.serializeUser(function (user, fn) {
    fn(null, user);
  });

  passport.deserializeUser(function (id, fn) {
    User.findOne({_id: id.doc._id}, function (err, user) {
      fn(err, user);
    });
  });

passport.use(new FacebookStrategy({
    clientID: "1678353565572538",
    clientSecret: "1595499877f492bfafd6d9abed846e47",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({name: profile.displayName}, {name: profile.displayName,userid: profile.id}, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

module.exports = passport;