"use client"

import { useState } from "react"

export default function Login() {
  const [pass, setPass] = useState("");

  async function handleLogin() {
    const res = await fetch("/api/admin-login", {
      method: "POST",
      body: JSON.stringify({ pass }),
    });

    if (res.ok) window.location.href = "/admin";
  }

  return (
    <div>
      <input type="password" onChange={e => setPass(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
