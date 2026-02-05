const Message = require("../models/Message");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinPrivateRoom", (roomId) => {
      socket.join(roomId);
      console.log("Joined private room:", roomId);
    });

    socket.on("sendPrivateMessage", async (data) => {
      const message = await Message.create({
        sender: data.senderId,
        receiver: data.receiverId,
        roomId: data.roomId,
        content: data.content || "",
        fileUrl: data.fileUrl || ""
      });

      io.to(data.roomId).emit("receivePrivateMessage", message);
    });
  });
};
