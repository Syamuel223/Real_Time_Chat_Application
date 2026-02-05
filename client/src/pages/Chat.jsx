import React, { useState } from "react";
import PrivateSidebar from "../components/PrivateSidebar";
import PrivateChatBox from "../components/PrivateChatBox";

export default function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* LEFT SIDEBAR */}
      <div style={{ width: "300px" }}>
        <PrivateSidebar setSelectedUser={setSelectedUser} />
      </div>

      {/* RIGHT CHAT AREA */}
      <div style={{ flex: 1 }}>
        <PrivateChatBox selectedUser={selectedUser} />
      </div>
    </div>
  );
}
