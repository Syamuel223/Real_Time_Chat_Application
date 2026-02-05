import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // ✅ STOP page refresh

    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      console.log("Login response:", res.data); // ✅ debug

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      navigate("/chat");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert("Login failed. Check credentials.");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
