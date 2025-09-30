const express = require("express");
const fs = require("fs-extra");
const router = express.Router();
const filePath = "./data/songs.json";

router.get("/", async (req, res) => {
  const songs = await fs.readJson(filePath);
  res.json(songs);
});

router.post("/", async (req, res) => {
  const songs = await fs.readJson(filePath);
  const newSong = { id: Date.now(), ...req.body };
  songs.push(newSong);
  await fs.writeJson(filePath, songs);
  res.status(201).json(newSong);
});

router.put("/:id", async (req, res) => {
  const songs = await fs.readJson(filePath);
  const index = songs.findIndex(s => s.id == req.params.id);
  if (index === -1) return res.status(404).send("Chanson introuvable");
  songs[index] = { ...songs[index], ...req.body };
  await fs.writeJson(filePath, songs);
  res.json(songs[index]);
});

router.delete("/:id", async (req, res) => {
  let songs = await fs.readJson(filePath);
  songs = songs.filter(s => s.id != req.params.id);
  await fs.writeJson(filePath, songs);
  res.status(204).send();
});

module.exports = router;