import React, { useEffect, useState } from "react";
import socket from "../services/socket";
import API from "../services/api";

export default function PrivateChatBox({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const myId = localStorage.getItem("userId");

  // ✅ ALWAYS define hooks first
  useEffect(() => {
    if (!selectedUser || !myId) return;

    const roomId = [myId, selectedUser._id].sort().join("_");

    // Load chat history
    API.get(`/messages/${roomId}`)
      .then((res) => setMessages(res.data))
      .catch(() => setMessages([]));

    // Join socket room
    socket.emit("joinPrivateRoom", roomId);

    // Listen for new messages
    socket.on("receivePrivateMessage", (msg) => {
      if (msg.roomId === roomId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("receivePrivateMessage");
    };
  }, [selectedUser, myId]);

  // 🛑 UI conditions AFTER hooks
  if (!myId) {
    return <div style={{ padding: 20 }}>Please login again</div>;
  }

  if (!selectedUser) {
    return <div style={{ padding: 20 }}>Select a chat</div>;
  }

  const roomId = [myId, selectedUser._id].sort().join("_");

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendPrivateMessage", {
      senderId: myId,
      receiverId: selectedUser._id,
      roomId,
      content: text
    });

    setText("");
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: 10, borderBottom: "1px solid #ddd" }}>
        <strong>{selectedUser.username}</strong>
      </div>

      {/* Messages */}
<div style={{ flex: 1, padding: 10, overflowY: "auto" }}>
  {messages.map((m, i) => {
    const isMine = m.sender === myId;
    const isImage =
      m.fileUrl &&
      m.fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i);

    return (
      <div
        key={i}
        style={{
          textAlign: isMine ? "right" : "left",
          marginBottom: 10
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: 8,
            borderRadius: 10,
            background: isMine ? "#DCF8C6" : "#eee",
            maxWidth: "60%"
          }}
        >
          {/* TEXT */}
          {m.content && <div>{m.content}</div>}

          {/* IMAGE */}
          {isImage && (
            <img
              src={`http://localhost:5000${m.fileUrl}`}
              alt="sent"
              style={{
                maxWidth: "200px",
                borderRadius: 8,
                marginTop: 5
              }}
            />
          )}

          {/* FILE (non-image) */}
          {m.fileUrl && !isImage && (
            <a
              href={`http://localhost:5000${m.fileUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              📎 Download File
            </a>
          )}
        </div>
      </div>
    );
  })}
</div>

      {/* Input */}
      <div
  style={{
    padding: 10,
    borderTop: "1px solid #ddd",
    display: "flex",
    gap: "8px"
  }}
>
  <input
    type="text"
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Type a message"
    style={{ flex: 1 }}
  />

  <input
    type="file"
    onChange={async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      const res = await API.post("/upload", formData);
      const fileUrl = res.data.fileUrl;

      socket.emit("sendPrivateMessage", {
        senderId: myId,
        receiverId: selectedUser._id,
        roomId,
        content: "",
        fileUrl
      });
    }}
  />

  <button onClick={sendMessage}>Send</button>
</div>

      
    </div>
  );
}