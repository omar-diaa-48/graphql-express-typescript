import express from "express";
import mongoose from "mongoose";
import {graphqlHTTP} from 'express-graphql';
import schema from "./schema/schema";
import passport from "passport";
import session from "express-session";


const app = express()

const MONGO_URI = 'mongodb://127.0.0.1:27017/graphql-demo';

mongoose.connect(MONGO_URI)

mongoose.connection
    .once('open', () => console.log("Connected to mongodb"))
    .on('error', (error) => console.log("Error on connecting to mongodb", error))

app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'tm4yz9qw',
    cookie:{
        secure:true
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}))

export default app;