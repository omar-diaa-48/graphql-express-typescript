import express from "express";
import mongoose from "mongoose";

const app = express()

const MONGO_URI = 'mongodb://127.0.0.1:27017/graphql-demo';

mongoose.connect(MONGO_URI)

mongoose.connection
    .once('open', () => console.log("Connected to mongodb"))
    .on('error', (error) => console.log("Error on connecting to mongodb", error))

export default app;