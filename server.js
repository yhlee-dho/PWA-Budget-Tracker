const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const mongojs = require("mongojs");

const PORT = process.env.PORT || 5432;

const app = express();

app.use(morgan("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const databaseURL = process.env.MONGODB_URI || "PWA-BudgetTracker";
const collections = ["transactions"]

const db = mongojs(databaseURL, collections)

db.on("error", error => {
  console.log(`db error: ${error}`)
});

// routes here
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});