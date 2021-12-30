import mongoose from "mongoose";
import passport from "passport";
import LocalStrategy from "passport-local";
import {User} from "../models"
import { Request } from "express";

passport.serializeUser((user, done) => {
    // @ts-ignore
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    // @ts-ignore
    User.findById(id, (err, user) => {
        done(err, user);
    })
})

passport.use(new LocalStrategy.Strategy(
    function(username, password, done) {
        // @ts-ignore
        User.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          // @ts-ignore
          user.comparePassword(password, (err, isMatch) => {
            if (err) { return done(err); }
            if (isMatch) {
              return done(null, user);
            }
            return done(null, false);
          });
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