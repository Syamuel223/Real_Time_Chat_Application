import React, { useEffect, useState } from "react";
import socket from "../services/socket";
import API from "../services/api";
import Message from "./Message";


export default function ChatBox({ room}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  /* ================= SOCKET SETUP ================= */
  useEffect(() => {
  socket.emit("joinRoom", room);

  socket.on("receiveMessage", (msg) => {
    if (msg.chat === room) {
      setMessages((prev) => [...prev, msg]);
    }
  });

  return () => {
    socket.off("receiveMessage");
  };
}, [room]);


  /* ================= SEND TEXT MESSAGE ================= */
  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("sendMessage", {
      content: message,
      chat: room
    });

    setMessage("");
  };

  /* ================= FILE / IMAGE UPLOAD ================= */
  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      socket.emit("sendMessage", {
        content: "",
        fileUrl: res.data.fileUrl,
        chat: room
      });
    } catch (err) {
      console.error("File upload failed", err);
      alert("File upload failed");
    }
  };

  /* ================= UI ================= */

  return (
  <div className="chat-box">
    <div className="messages">
      {messages.map((m, i) => (
        <Message key={i} message={m} />
      ))}
    </div>

    <div className="input-bar">
      <input
        type="text"
        value={message}
        placeholder={`Message #${room}`}
        onChange={(e) => setMessage(e.target.value)}
      />

      <input type="file" onChange={uploadFile} />

      <button onClick={sendMessage}>Send</button>
    </div>
  </div>
);

return (
  <div className="chat-box">
    <div className="messages">
      {messages.map((m, i) => (
        <Message key={i} message={m} />
      ))}
    </div>

    <div className="input-bar">
      <input
        type="text"
        value={message}
        placeholder={`Message #${room}`}
        onChange={(e) => setMessage(e.target.value)}
      />

      <input type="file" onChange={uploadFile} />

      <button onClick={sendMessage}>Send</button>
    </div>
  </div>
);


  
}
