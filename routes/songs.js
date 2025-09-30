const express = require("express");
const router = express.Router();
const fs = require("fs-extra");
const path = require("path");

const songsPath = path.join(__dirname, "../data/songs.json");

router.get("/", async (req, res) => {
  try {
    const songs = await fs.readJson(songsPath);
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la lecture des chansons." });
  }
});

module.exports = router;
