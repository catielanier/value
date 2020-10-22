"use strict";

// Imports and defs
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const router = express();

// Middleware
const { MONGODB_URI, PORT } = require("./_utils/constants");
const middleWare = require("./_middleware");
const { applyMiddleware } = require("./_utils");

applyMiddleware(middleWare, router);

// Routes

// Setup server
const server = http.createServer(router);

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
