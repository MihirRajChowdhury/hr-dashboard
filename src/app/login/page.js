"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", { email, password, redirect: true, callbackUrl: "/" });
    if (res?.error) setError("Invalid credentials");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-center mb-2">HR Dashboard Login</h1>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
          required
        />

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
          Sign In
        </button>

        <div className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
          <p>Demo Credentials:</p>
          <p><strong>Email:</strong> admin@demo.com</p>
          <p><strong>Password:</strong> password123</p>
        </div>
      </form>
    </main>
  );
}
