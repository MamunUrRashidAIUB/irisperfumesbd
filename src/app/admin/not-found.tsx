// Not Found component - Shows when admin page is not found
// This is a Next.js special file for 404 errors

import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-indigo-600">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2">The admin page you're looking for doesn't exist.</p>
        <div className="mt-6 flex gap-4 justify-center">
          <Link 
            href="/admin/dashboard" 
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            Go to Dashboard
          </Link>
          <Link 
            href="/admin" 
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
