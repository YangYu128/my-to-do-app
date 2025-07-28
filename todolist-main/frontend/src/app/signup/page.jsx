'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/redux/authSlice';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        dispatch(loginSuccess({ name: data.user.name, email: data.user.email }));
        router.push('/');
      } else {
        const err = await res.json();
        alert(err.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-200">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Sign Up</h2>

        <input
          type="text"
          className="w-full p-2 mb-4 border rounded text-black"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          type="email"
          className="w-full p-2 mb-4 border rounded text-black"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full p-2 mb-4 border rounded text-black"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600">
          Sign Up
        </button>
      </form>
    </div>
  );
}
