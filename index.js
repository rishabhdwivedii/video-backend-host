const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const appRouter = require("./routes/router");
require("dotenv").config();

const app = express();
app.use(
  cors()
);
app.use(express.json());

app.use("/", appRouter);

async function startServer() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "videos",
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

startServer();

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running");
});

module.exports = app;
