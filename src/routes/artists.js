const express = require("express");
const { createArtist } = require("../controllers/artists");

const router = express.Router();
router.post("/", createArtist);
module.exports = router;
