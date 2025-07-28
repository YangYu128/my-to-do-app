'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-emerald-400 p-4">
      <div className="bg-white shadow-lg rounded-3xl p-10 w-full max-w-md text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to ToDo App</h1>
        <p className="text-gray-600">Please log in or sign up to continue</p>

        <div className="flex flex-col gap-4">
          <Link href="/login">
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
