const express = require("express");
const artists = require("./routes/artists");

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.use("/artists", artists);

module.exports = app;
