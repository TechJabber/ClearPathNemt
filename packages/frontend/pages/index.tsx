import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Clear Path NEMT
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Non-Emergency Medical Transportation Services
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 inline-block">
          <p className="text-gray-700">
            Welcome to Clear Path. Development server is running successfully!
          </p>
        </div>
      </main>
    </div>
  );
}
