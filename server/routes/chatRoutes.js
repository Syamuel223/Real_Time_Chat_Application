const express = require("express");
const Chat = require("../models/Chat");
const router = express.Router();

router.post("/create", async (req, res) => {
  const chat = await Chat.create({
    name: req.body.name,
    users: req.body.users || []
  });
  res.json(chat);
});

router.get("/", async (req, res) => {
  const chats = await Chat.find();
  res.json(chats);
});

module.exports = router;
