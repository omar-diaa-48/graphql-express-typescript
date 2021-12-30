import mongoose from "mongoose";
import passport from "passport";
import LocalStrategy from "passport-local";
import {User} from "../models"

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
})

passport.use(new LocalStrategy.Strategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (!user.comparePassword(password)) { return done(null, false); }
          return done(null, user);
        });
      }
))