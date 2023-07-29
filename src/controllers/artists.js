const db = require("../db");

const createArtist = async (req, res) => {
  const { name, genre } = req.body;
  try {
    const {
      rows: [newArtist],
    } = await db.query(
      "INSERT INTO artists (name, genre) VALUES ($1, $2) RETURNING *",
      [name, genre]
    );
    return res.status(201).json(newArtist);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const readArtists = async (req, res) => {
  const { rows } = await db.query("SELECT * FROM artists ORDER BY id ASC");
  return res.status(200).json(rows);
};

const readArtist = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      rows: [artist],
    } = await db.query("SELECT * FROM artists WHERE id = $1", [id]);
    if (!artist) {
      return res.status(404).json({ message: `artist ${id} does not exist` });
    }
    return res.status(200).json(artist);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const updateArtist = async (req, res) => {
  const { id } = req.params;
  const { name, genre } = req.body;
  try {
    const {
      rows: [updatedArtist],
    } = await db.query(
      "UPDATE artists SET name = $1, genre = $2 WHERE id = $3 RETURNING *",
      [name, genre, id]
    );
    if (!updatedArtist) {
      return res.status(404).json({ message: `artist ${id} does not exist` });
    }
    return res.status(200).json(updatedArtist);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const deleteArtist = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      rows: [deletedArtist],
    } = await db.query("DELETE FROM artists WHERE id = $1 RETURNING *", [id]);
    if (!deletedArtist) {
      return res.status(404).json({ message: `artist ${id} does not exist` });
    }
    return res.status(200).json(deletedArtist);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};


module.exports = { createArtist, readArtists, readArtist, updateArtist, deleteArtist };
