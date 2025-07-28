'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ use this for App Router

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });


      if (res.ok) {
        const data = await res.json();

        //  Store token so it can be used in future API requests
        localStorage.setItem('token', data.token);

        console.log('Login successful:', data);
        router.push('/todolist');
      } else {
        const err = await res.json();
        alert(err.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-600 to-green-400 p-4">
      <form onSubmit={handleLogin} className="flex flex-col bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4 font-solid text-center text-black">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="mb-3 px-3 py-2 border rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-3 px-3 py-2 border rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}
