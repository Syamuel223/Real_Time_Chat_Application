import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function PrivateSidebar({ setSelectedUser }) {
  const [users, setUsers] = useState([]);
  const myId = localStorage.getItem("userId");

  useEffect(() => {
    API.get("/auth/users")
      .then((res) => {
        // exclude self
        setUsers(res.data.filter((u) => u._id !== myId));
      })
      .catch((err) => {
        console.error("Failed to load users", err);
      });
  }, []);

  return (
    <div style={{ width: "300px", borderRight: "1px solid #ddd", padding: "10px" }}>
      <h3>Chats</h3>

      {users.length === 0 && <p>No users found</p>}

      {users.map((user) => (
        <div
          key={user._id}
          style={{
            padding: "10px",
            cursor: "pointer",
            borderBottom: "1px solid #eee"
          }}
          onClick={() => setSelectedUser(user)}
        >
          {user.username}
        </div>
      ))}
    </div>
  );
}
