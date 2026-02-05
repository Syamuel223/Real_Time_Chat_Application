// server/server.js
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const socketIo = require("socket.io");
const cors = require("cors");
const path = require("path");

const socketHandler = require("./socket/socket");

const app = express();

/* =======================
   MIDDLEWARE
======================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   STATIC FILES (UPLOADS)
======================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =======================
   ROUTES
======================= */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

/* =======================
   DATABASE
======================= */
mongoose
  .connect("mongodb://127.0.0.1:27017/chatapp")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

/* =======================
   SOCKET.IO
======================= */
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

socketHandler(io);

/* =======================
   SERVER START
======================= */
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
