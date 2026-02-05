import React from "react";

export default function Sidebar({ setRoom }) {
  const rooms = ["global", "tech", "random"];

  return (
    <div className="sidebar">
      <h3>Rooms</h3>
      {rooms.map((room) => (
        <p key={room} onClick={() => setRoom(room)}>
          #{room}
        </p>
      ))}
    </div>
  );
}
