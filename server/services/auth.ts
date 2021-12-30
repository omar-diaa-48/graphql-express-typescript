import mongoose from "mongoose";
import passport from "passport";
import LocalStrategy from "passport-local";
import {User} from "../models"
import { Request } from "express";

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

function signup(email:string, username:string, password:string, req:Request) {
    const user = new User({ email, password, username });

    if (!email || !password || !username) { throw new Error('You must provide an email, username and password.'); }

    return User.findOne(
        {
            $or:[{email}, {password}]
        }
        )
        .then(existingUser => {
        if (existingUser) { throw new Error('Email or username in use'); }
        return user.save();
        })
        .then(user => {
        return new Promise((resolve, reject) => {
            req.logIn(user, (err) => {
            if (err) { reject(err); }
            resolve(user);
            });
        });
        });
}

function login(username:string, password:string, req:Request) {
    return new Promise((resolve, reject) => {
      passport.authenticate('local', (err, user) => {
        if (!user) { reject('Invalid credentials.') }
  
        req.login(user, () => resolve(user));
      })({ body: { username, password } });
    });
}

export {
    signup,
    login
}