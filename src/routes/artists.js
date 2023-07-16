const express = require("express");
const {
  readArtists,
  readArtist,
  createArtist,
  updateArtist,
  deleteArtist,
} = require("../controllers/artists");

const router = express.Router();
router.post("/", createArtist);
router.get("/", readArtists);
router.get("/:id", readArtist);
router.put("/:id", updateArtist);
router.delete("/:id", deleteArtist);
module.exports = router;
