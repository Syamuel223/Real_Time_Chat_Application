const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Get private chat messages
router.get("/:roomId", async (req, res) => {
  try {
    const messages = await Message.find({ roomId: req.params.roomId })
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to load messages" });
  }
});

module.exports = router;
